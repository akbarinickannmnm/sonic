import { diseases } from "../data/diseases";
import { pulmonologyQuestionBank, pulmonologyQuestionCategories } from "../data/pulmonologyQuestionBank";
import { pulmonologyPhysicalExamBank, physicalExamCategories } from "../data/pulmonologyPhysicalExamBank";
import { pulmonologyInvestigationBank, investigationCategories } from "../data/pulmonologyInvestigationBank";
import type { Case, Difficulty } from "../types/case";

export type PulmonologyValidationError = {
  caseId: string;
  field: string;
  message: string;
};

const EXPECTED_DIAGNOSIS_IDS = [
  "community-acquired-pneumonia", "asthma", "copd", "pulmonary-embolism", "pulmonary-tuberculosis",
  "covid-19-pneumonia", "pleural-effusion", "pneumothorax", "lung-cancer", "ards",
  "acute-bronchitis", "obstructive-sleep-apnea", "interstitial-lung-disease", "bronchiectasis", "aspiration-pneumonia",
  "sarcoidosis", "pulmonary-hypertension", "occupational-lung-disease", "hypersensitivity-pneumonitis", "idiopathic-pulmonary-fibrosis",
  "lung-abscess", "empyema", "cystic-fibrosis", "allergic-bronchopulmonary-aspergillosis", "non-tuberculous-mycobacterial-infection",
  "massive-hemoptysis", "acute-severe-asthma", "copd-exacerbation", "cor-pulmonale", "mediastinal-mass-syndrome",
  "silicosis", "asbestosis", "coal-workers-pneumoconiosis", "eosinophilic-pneumonia", "cryptogenic-organizing-pneumonia",
  "alpha-1-antitrypsin-deficiency", "pulmonary-alveolar-proteinosis", "diffuse-alveolar-hemorrhage", "pulmonary-langerhans-cell-histiocytosis", "lymphangioleiomyomatosis",
  "histoplasmosis", "coccidioidomycosis", "blastomycosis", "aspergillosis", "pulmonary-mucormycosis",
  "granulomatosis-with-polyangiitis", "eosinophilic-granulomatosis-with-polyangiitis", "goodpasture-syndrome", "pulmonary-manifestations-of-sle", "pulmonary-manifestations-of-rheumatoid-arthritis",
] as const;

const EXPECTED_DIFFICULTY_BY_INDEX: Difficulty[] = [
  ...Array(15).fill("easy" as const),
  ...Array(25).fill("medium" as const),
  ...Array(10).fill("hard" as const),
];

const EXPECTED_HISTORY_IDS = pulmonologyQuestionBank.map((q) => q.id);
const EXPECTED_HISTORY_CATEGORIES = pulmonologyQuestionBank.map((q) => q.category);
const PE_BANK = new Map(pulmonologyPhysicalExamBank.map((x) => [x.id, x]));
const INV_BANK = new Map(pulmonologyInvestigationBank.map((x) => [x.id, x]));
const DISEASE_IDS = new Set(diseases.map((d) => d.id));

const PERSIAN = /[\u0600-\u06FF]/;
const PLACEHOLDER_PATTERNS = [
  /TODO|TBD|placeholder|dummy|sample|lorem/i,
  /متناسب با بیماری/,
  /یافته(?:‌|\s)+اختصاصی(?:‌|\s)+بیماری/,
  /در حال بررسی است/,
  /اطلاعات کافی ندارم/,
];

function hasPlaceholder(text: string): boolean {
  return PLACEHOLDER_PATTERNS.some((pattern) => pattern.test(text));
}

function push(errors: PulmonologyValidationError[], caseId: string, field: string, message: string) {
  errors.push({ caseId, field, message });
}

export function validatePulmonologyCases(cases: Case[]): PulmonologyValidationError[] {
  const errors: PulmonologyValidationError[] = [];
  for (const category of [...pulmonologyQuestionCategories, ...physicalExamCategories, ...investigationCategories]) {
    if (!PERSIAN.test(category.label)) push(errors, "GLOBAL", `category:${category.id}`, "برچسب دسته باید فارسی باشد؛ اصطلاحات علمی مستقل مجازند.");
  }

  if (cases.length !== 50) {
    push(errors, "GLOBAL", "cases.length", `باید دقیقاً 50 کیس وجود داشته باشد؛ ${cases.length} کیس پیدا شد.`);
  }

  const ids = cases.map((c) => c.id);
  if (new Set(ids).size !== ids.length) {
    push(errors, "GLOBAL", "cases.id", "شناسه کیس‌ها تکراری است.");
  }

  const difficultyCount: Record<Difficulty, number> = { easy: 0, medium: 0, hard: 0 };

  cases.forEach((currentCase, index) => {
    const expectedId = `pulmo-${String(index + 1).padStart(3, "0")}`;
    const expectedDiagnosis = EXPECTED_DIAGNOSIS_IDS[index];
    const expectedDifficulty = EXPECTED_DIFFICULTY_BY_INDEX[index];
    const prefix = currentCase.id || `index-${index + 1}`;

    if (currentCase.id !== expectedId) push(errors, prefix, "id", `شناسه باید ${expectedId} باشد.`);
    if (currentCase.diagnosis.id !== expectedDiagnosis) push(errors, prefix, "diagnosis", `تشخیص باید ${expectedDiagnosis} باشد.`);
    if (!DISEASE_IDS.has(currentCase.diagnosis.id)) push(errors, prefix, "diagnosis", "شناسه تشخیص در data/diseases.ts وجود ندارد.");
    if (currentCase.difficulty !== expectedDifficulty) push(errors, prefix, "difficulty", `سطح باید ${expectedDifficulty} باشد.`);
    difficultyCount[currentCase.difficulty] = (difficultyCount[currentCase.difficulty] ?? 0) + 1;

    if (!currentCase.presentation || !PERSIAN.test(currentCase.presentation)) push(errors, prefix, "presentation", "شرح اولیه کیس باید فارسی باشد.");
    if (!currentCase.patient || currentCase.patient.age <= 0) push(errors, prefix, "patient", "مشخصات بیمار ناقص است.");

    if (currentCase.candidateDiagnosisIds.length !== 5) push(errors, prefix, "candidateDiagnosisIds", `باید 5 تشخیص کاندید وجود داشته باشد؛ ${currentCase.candidateDiagnosisIds.length} مورد است.`);
    if (new Set(currentCase.candidateDiagnosisIds).size !== currentCase.candidateDiagnosisIds.length) push(errors, prefix, "candidateDiagnosisIds", "تشخیص‌های کاندید تکراری هستند.");
    if (!currentCase.candidateDiagnosisIds.includes(currentCase.diagnosis.id)) push(errors, prefix, "candidateDiagnosisIds", "تشخیص نهایی باید در فهرست candidateDiagnosisIds باشد.");
    if (currentCase.candidateDiagnosisIds.some((id) => !DISEASE_IDS.has(id))) {
      push(errors, prefix, "candidateDiagnosisIds", "حداقل یک candidateDiagnosisId نامعتبر است.");
    }

    const stageTypes = currentCase.stages.map((stage) => stage.type);
    for (const type of ["history", "physical-exam", "investigation"] as const) {
      if (!stageTypes.includes(type)) push(errors, prefix, "stages", `Stage ${type} وجود ندارد.`);
    }

    const history = currentCase.stages.find((stage) => stage.type === "history");
    if (!history || history.type !== "history") {
      push(errors, prefix, "history", "History stage وجود ندارد.");
    } else {
      if (history.hints.length !== 40) push(errors, prefix, "history.length", `History باید دقیقاً 40 سؤال داشته باشد؛ ${history.hints.length} مورد است.`);
      const hIds = history.hints.map((hint) => hint.sourceId ?? hint.id.replace(/-answer$/, ""));
      if (hIds.length !== new Set(hIds).size) push(errors, prefix, "history.ids", "شناسه سؤال‌های History تکراری است.");
      if (hIds.join("|") !== EXPECTED_HISTORY_IDS.join("|")) push(errors, prefix, "history.ids", "همه کیس‌ها باید دقیقاً همان 40 شناسه سؤال را به همان ترتیب داشته باشند.");
      history.hints.forEach((hint, i) => {
        const sourceId = hint.sourceId ?? "";
        const sourceQuestion = pulmonologyQuestionBank.find((q) => q.id === sourceId);
        if (!sourceQuestion) push(errors, prefix, `history[${i}].sourceId`, `سؤال ${sourceId} در بانک سؤال وجود ندارد.`);
        if (!hint.content?.trim()) push(errors, prefix, `history[${i}].content`, "پاسخ خالی است.");
        if (hint.content && !PERSIAN.test(hint.content)) push(errors, prefix, `history[${i}].content`, "پاسخ باید عمدتاً فارسی و از زبان بیمار باشد.");
        if (hint.content && hasPlaceholder(hint.content)) push(errors, prefix, `history[${i}].content`, "پاسخ شامل متن placeholder یا پاسخ عمومی است.");
        if (sourceQuestion && hint.label !== sourceQuestion.text) push(errors, prefix, `history[${i}].label`, "متن سؤال از بانک اصلی منحرف شده است.");
      });
    }

    const pe = currentCase.stages.find((stage) => stage.type === "physical-exam");
    if (!pe || pe.type !== "physical-exam") {
      push(errors, prefix, "physicalExam", "Physical Exam stage وجود ندارد.");
    } else {
      if (pe.hints.length < 5 || pe.hints.length > 7) push(errors, prefix, "physicalExam.length", `معاینه باید 5 تا 7 یافته داشته باشد؛ ${pe.hints.length} مورد است.`);
      const seen = new Set<string>();
      pe.hints.forEach((hint, i) => {
        if (seen.has(hint.sourceId ?? hint.id)) push(errors, prefix, `physicalExam[${i}].id`, "شناسه معاینه تکراری است.");
        seen.add(hint.sourceId ?? hint.id);
        if (!hint.sourceId || !PE_BANK.has(hint.sourceId)) push(errors, prefix, `physicalExam[${i}].sourceId`, "sourceId معاینه در بانک وجود ندارد.");
        if (!hint.content?.trim()) push(errors, prefix, `physicalExam[${i}].content`, "یافته معاینه خالی است.");
        if (hint.content && hasPlaceholder(hint.content)) push(errors, prefix, `physicalExam[${i}].content`, "یافته معاینه عمومی/placeholder است.");
      });
    }

    const investigation = currentCase.stages.find((stage) => stage.type === "investigation");
    if (!investigation || investigation.type !== "investigation") {
      push(errors, prefix, "investigation", "Investigation stage وجود ندارد.");
    } else {
      if (investigation.investigations.length < 5 || investigation.investigations.length > 6) push(errors, prefix, "investigation.length", `Investigation باید 5 یا 6 مورد داشته باشد؛ ${investigation.investigations.length} مورد است.`);
      const seen = new Set<string>();
      investigation.investigations.forEach((inv, i) => {
        if (seen.has(inv.id)) push(errors, prefix, `investigation[${i}].id`, "شناسه Investigation تکراری است.");
        seen.add(inv.id);
        if (!inv.sourceId || !INV_BANK.has(inv.sourceId)) push(errors, prefix, `investigation[${i}].sourceId`, "sourceId آزمایش در بانک وجود ندارد.");
        if (!inv.name?.trim() || !inv.category?.trim()) push(errors, prefix, `investigation[${i}]`, "نام یا دسته آزمایش خالی است.");
        if (!inv.findings?.length || inv.findings.some((finding) => !finding.value?.trim())) push(errors, prefix, `investigation[${i}].findings`, "نتیجه آزمایش خالی است.");
        if (inv.findings.some((finding) => hasPlaceholder(finding.value))) push(errors, prefix, `investigation[${i}].findings`, "نتیجه آزمایش شامل متن placeholder یا عبارت عمومی است.");
        if (!["high", "low", "non-contributory"].includes(inv.relevance)) push(errors, prefix, `investigation[${i}].relevance`, "relevance نامعتبر است.");
      });
    }
  });

  if (difficultyCount.easy !== 15 || difficultyCount.medium !== 25 || difficultyCount.hard !== 10) {
    push(errors, "GLOBAL", "difficulty", `توزیع Difficulty باید 15/25/10 باشد؛ فعلی ${difficultyCount.easy}/${difficultyCount.medium}/${difficultyCount.hard} است.`);
  }

  return errors;
}

export function assertPulmonologyCasesValid(cases: Case[]): void {
  const errors = validatePulmonologyCases(cases);
  if (errors.length > 0) {
    throw new Error(`Pulmonology dataset validation failed with ${errors.length} error(s):\n${errors.map((e) => `[${e.caseId}] ${e.field}: ${e.message}`).join("\n")}`);
  }
}

// Backward-compatible alias for older imports.
export const validateClinicalCases = validatePulmonologyCases;
