/**
 * SONIC Cardiology History answer validator — Phase 2 prototype.
 * This validates structured authoring records before they are rendered as CaseHints.
 * It is intentionally not wired into production yet.
 */
export type HistoryAnswerStatus = "present" | "absent" | "unknown" | "not_applicable" | "mixed";

export type HistoryAnswerRecord = {
  questionId: string;
  status: HistoryAnswerStatus;
  patientAnswer: string;
  sourceFields: string[];
  reviewerNote?: string;
};

export type HistoryCaseAnswers = {
  caseId: string;
  answers: HistoryAnswerRecord[];
};

export type HistoryValidationIssue = {
  severity: "error" | "warning";
  code: string;
  caseId: string;
  questionId?: string;
  message: string;
};

export const CARDIOLOGY_HISTORY_QUESTION_IDS = Array.from(
  { length: 40 },
  (_, i) => `cardio-hist-${String(i + 1).padStart(3, "0")}`,
);

const indexOf = (answers: HistoryAnswerRecord[], id: string) =>
  answers.find((answer) => answer.questionId === id);

const assertKnown = (answers: HistoryAnswerRecord[], id: string) => indexOf(answers, id);

const saysPositive = (answer?: HistoryAnswerRecord): boolean => {
  if (!answer) return false;
  return answer.status === "present" || answer.status === "mixed";
};

const saysAbsent = (answer?: HistoryAnswerRecord): boolean => answer?.status === "absent";

export function validateHistoryCase(record: HistoryCaseAnswers): HistoryValidationIssue[] {
  const issues: HistoryValidationIssue[] = [];
  const answers = record.answers;
  const knownStatuses = new Set<HistoryAnswerStatus>([
    "present", "absent", "unknown", "not_applicable", "mixed",
  ]);

  if (answers.length !== 40) {
    issues.push({ severity: "error", code: "HISTORY_COUNT", caseId: record.caseId,
      message: `Expected 40 answers; found ${answers.length}.` });
  }

  const ids = answers.map((answer) => answer.questionId);
  const duplicates = ids.filter((id, i) => ids.indexOf(id) !== i);
  for (const id of new Set(duplicates)) {
    issues.push({ severity: "error", code: "DUPLICATE_QUESTION_ID", caseId: record.caseId,
      questionId: id, message: `Duplicate answer record for ${id}.` });
  }

  for (let i = 0; i < CARDIOLOGY_HISTORY_QUESTION_IDS.length; i++) {
    const expectedId = CARDIOLOGY_HISTORY_QUESTION_IDS[i];
    const answer = answers[i];
    if (!answer || answer.questionId !== expectedId) {
      issues.push({ severity: "error", code: "QUESTION_ORDER_OR_MISSING", caseId: record.caseId,
        questionId: expectedId, message: `Expected ${expectedId} at position ${i + 1}.` });
      continue;
    }
    if (!knownStatuses.has(answer.status)) {
      issues.push({ severity: "error", code: "INVALID_STATUS", caseId: record.caseId,
        questionId: expectedId, message: `Invalid answer status: ${String(answer.status)}.` });
    }
    if (!answer.patientAnswer.trim()) {
      issues.push({ severity: "error", code: "EMPTY_ANSWER", caseId: record.caseId,
        questionId: expectedId, message: "Patient-facing answer is empty." });
    }
    if (!answer.sourceFields.length) {
      issues.push({ severity: "error", code: "MISSING_EVIDENCE", caseId: record.caseId,
        questionId: expectedId, message: "Answer has no source fields/evidence." });
    }
    if (answer.status === "unknown" && /^(نه|خیر|بله|آره)[،.؛ ]/.test(answer.patientAnswer.trim())) {
      issues.push({ severity: "warning", code: "UNKNOWN_RENDERED_AS_CERTAIN", caseId: record.caseId,
        questionId: expectedId, message: "Unknown status appears to be rendered as a certain yes/no answer." });
    }
  }

  const q = (n: number) => assertKnown(answers, `cardio-hist-${String(n).padStart(3, "0")}`);
  const add = (code: string, questionId: string, message: string) => issues.push({
    severity: "error", code, caseId: record.caseId, questionId, message,
  });

  // Chest pain: if absent, pain-specific details cannot be positive.
  if (saysAbsent(q(2))) {
    for (const n of [11, 12, 13, 14, 15, 16, 17, 18, 19]) {
      const a = q(n);
      if (saysPositive(a)) add("PAIN_DEPENDENCY_CONTRADICTION", a!.questionId,
        `Chest pain is absent (question 002), but pain detail ${a!.questionId} is marked present/mixed.`);
      if (a && a.status !== "not_applicable" && a.status !== "unknown" && a.status !== "absent") {
        add("PAIN_DETAIL_REQUIRES_REVIEW", a.questionId,
          "With no chest pain, this detail should normally be not_applicable or explicitly explain a distinct historical episode.");
      }
    }
    if (saysPositive(q(21))) add("DYSPNEA_WITHOUT_CHEST_PAIN", q(21)!.questionId,
      "Question 021 reports dyspnea accompanying chest pain while question 002 says there is no chest pain.");
  }

  // Palpitations: event-specific attributes cannot be asserted when absent.
  if (saysAbsent(q(4))) {
    for (const n of [27, 28, 29, 30, 31, 32]) {
      const a = q(n);
      if (saysPositive(a)) add("PALPITATION_DEPENDENCY_CONTRADICTION", a!.questionId,
        `Palpitations are absent (question 004), but a palpitation-specific detail is marked present/mixed.`);
    }
  }

  // Syncope/presyncope: no event means no event-specific context or prodrome.
  if (saysAbsent(q(5))) {
    for (const n of [33, 34]) {
      const a = q(n);
      if (saysPositive(a)) add("SYNCOPE_DEPENDENCY_CONTRADICTION", a!.questionId,
        "No syncope/presyncope is reported, but an event-specific context/prodrome/recovery is asserted.");
    }
  }

  // Any dyspnea absent but exertional dyspnea present needs explicit reconciliation.
  if (saysAbsent(q(3)) && saysPositive(q(22))) {
    add("DYSPNEA_CONTRADICTION", q(22)!.questionId,
      "Any dyspnea is marked absent but exertional dyspnea is marked present.");
  }

  // No target-diagnosis leakage in past-history answer should be checked by a human reviewer;
  // string heuristics are deliberately not used as a substitute for clinical judgment.
  return issues;
}

export function validateHistoryBank(records: HistoryCaseAnswers[]): HistoryValidationIssue[] {
  const issues = records.flatMap(validateHistoryCase);
  if (records.length !== 50) {
    issues.unshift({ severity: "error", code: "CASE_COUNT", caseId: "BANK",
      message: `Expected 50 case records; found ${records.length}.` });
  }
  const caseIds = records.map((record) => record.caseId);
  if (new Set(caseIds).size !== caseIds.length) {
    issues.unshift({ severity: "error", code: "DUPLICATE_CASE_ID", caseId: "BANK",
      message: "Case IDs must be unique." });
  }
  return issues;
}
