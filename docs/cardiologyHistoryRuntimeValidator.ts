/**
 * Runtime validator for rendered SONIC cardiology History hints.
 * This is a QA aid, not a clinical-signoff engine. It detects structural defects,
 * high-confidence contradictions and repeated boilerplate for manual review.
 */
export type RuntimeHistoryHint = { sourceId?: string; label?: string; content?: string };
export type RuntimeHistoryStage = { type?: string; hints?: RuntimeHistoryHint[] };
export type RuntimeCardiologyCase = { id: string; title?: string; diagnosis?: string | { id?: string; name?: string }; stages?: RuntimeHistoryStage[] };
export type RuntimeHistoryIssue = {
  severity: "error" | "warning" | "review";
  code: string;
  caseId: string;
  questionId?: string;
  message: string;
  answer?: string;
};

const qid = (n: number) => `cardio-hist-${String(n).padStart(3, "0")}`;
const norm = (s: string) => s.replace(/[\u200c\s]+/g, " ").trim();
const getHistory = (c: RuntimeCardiologyCase) => c.stages?.find((s) => s.type === "history")?.hints ?? [];
const getAnswer = (hints: RuntimeHistoryHint[], n: number) => hints.find((h) => h.sourceId === qid(n))?.content?.trim() ?? "";
const isNegative = (s: string) => /^(نه|خیر|اصلاً|هیچ‌وقت|هیچ وقت|ندارم|نداشته‌ام|نداشتم|غش یا نزدیک‌غش نداشته‌ام)/.test(norm(s));
const isExplicitNotApplicable = (s: string) => /مطرح نیست|قابل توصیف نیست|ندارم که|نداشته‌ام،|چون .*ندارم|چون .*نداشته/.test(s);
const looksPositive = (s: string) => {
  if (isExplicitNotApplicable(s) || /ندارم|نداشته|نیست|نمی‌شود|نمی‌کنم|بدون |رد می‌کنم/.test(s)) return false;
  return /بله|دارم|داشته‌ام|شروع می‌شود|شروع شد|همراه تپش|حمله.*(طول می‌کشد|شروع)|نامنظم|منظم|چند دقیقه|چند ساعت|با استرس|قهوه/.test(s);
};

export function validateRenderedCardiologyHistory(cases: RuntimeCardiologyCase[]): RuntimeHistoryIssue[] {
  const issues: RuntimeHistoryIssue[] = [];
  if (cases.length !== 50) issues.push({severity:"error", code:"CASE_COUNT", caseId:"BANK", message:`Expected 50 cases; found ${cases.length}.`});
  const seenCaseIds = new Set<string>();
  const answerFrequency = new Map<string, Map<string, number>>();

  for (const c of cases) {
    if (seenCaseIds.has(c.id)) issues.push({severity:"error", code:"DUPLICATE_CASE_ID", caseId:c.id, message:"Duplicate case ID."});
    seenCaseIds.add(c.id);
    const hints = getHistory(c);
    if (hints.length !== 40) issues.push({severity:"error", code:"HISTORY_COUNT", caseId:c.id, message:`Expected 40 History answers; found ${hints.length}.`});
    const ids = hints.map(h => h.sourceId ?? "");
    if (new Set(ids).size !== ids.length) issues.push({severity:"error", code:"DUPLICATE_QUESTION_ID", caseId:c.id, message:"Duplicate History question IDs."});
    for (let n=1;n<=40;n++) {
      const id=qid(n); const h=hints.find(x=>x.sourceId===id);
      if (!h) { issues.push({severity:"error",code:"MISSING_QUESTION",caseId:c.id,questionId:id,message:"Missing answer for fixed History question."}); continue; }
      if (!h.content?.trim()) issues.push({severity:"error",code:"EMPTY_ANSWER",caseId:c.id,questionId:id,message:"Answer is empty."});
      if (h.label && !norm(h.label).includes(norm(""))) { /* label presence is intentionally not a content test */ }
      const answer=norm(h.content ?? "");
      if (!answerFrequency.has(id)) answerFrequency.set(id,new Map());
      const f=answerFrequency.get(id)!; f.set(answer,(f.get(answer)??0)+1);
    }
    const a=(n:number)=>getAnswer(hints,n);
    // Pain-specific follow-ups cannot describe pain when the patient explicitly denies any chest pain.
    if (isNegative(a(2)) && /درد .*ندارم|درد یا ناراحتی مشخصی .*نداشته/.test(a(2))) {
      for (const n of [11,12,13,14,15,16,17,18,19]) {
        const ans=a(n);
        if (looksPositive(ans) && !isExplicitNotApplicable(ans)) issues.push({severity:"error",code:"PAIN_DEPENDENCY_CONTRADICTION",caseId:c.id,questionId:qid(n),message:"Chest pain is denied but a pain-specific follow-up appears affirmative.",answer:ans});
      }
    }
    if (isNegative(a(3)) && looksPositive(a(22))) issues.push({severity:"error",code:"DYSPNEA_CONTRADICTION",caseId:c.id,questionId:qid(22),message:"General dyspnea is denied but exertional dyspnea is affirmative.",answer:a(22)});
    if (/تپش قلب.*نداشته|تپش قلب.*ندارم|نه، تپش قلب/.test(a(4))) {
      for (const n of [28,29,30,31,32]) {
        const ans=a(n);
        if (looksPositive(ans) && !isExplicitNotApplicable(ans)) issues.push({severity:"error",code:"PALPITATION_DEPENDENCY_CONTRADICTION",caseId:c.id,questionId:qid(n),message:"Palpitations are denied but a palpitation-specific detail appears affirmative.",answer:ans});
      }
    }
    if (/^(نه|خیر)[،؛ ]/.test(a(5)) || /^غش: (نه|نداشته)[;؛,]\s*نزدیک‌غش: (نه|نداشته)/.test(a(5))) {
      for (const n of [33,34]) {
        const ans=a(n);
        if (looksPositive(ans) && !isExplicitNotApplicable(ans)) issues.push({severity:"error",code:"SYNCOPE_DEPENDENCY_CONTRADICTION",caseId:c.id,questionId:qid(n),message:"Syncope/presyncope is denied but event context or prodrome/recovery appears affirmative.",answer:ans});
      }
    }
    // These are content-quality flags rather than automatic proof of error.
    if (/ثبت نشده|مشخص نشده|نمی‌توانم با اطمینان بگویم/.test(a(9))) issues.push({severity:"review",code:"ONSET_MODE_UNDOCUMENTED",caseId:c.id,questionId:qid(9),message:"Onset timing is documented but sudden-vs-gradual mode is not; source profile needs review.",answer:a(9)});
    const q35Label = hints.find((h) => h.sourceId === qid(35))?.label ?? "";
    if (/فشارخون|دیابت|چربی خون|بیماری کلیوی|تیروئید/.test(a(35)) && !/فشارخون|دیابت|چربی خون|بیماری کلیوی|تیروئید/.test(q35Label)) {
      issues.push({severity:"error",code:"QUESTION_ANSWER_SCOPE_MISMATCH",caseId:c.id,questionId:qid(35),message:"Answer includes systemic comorbidities that are not asked in the current wording of question 035; the approved wording and q035/q040 split have drifted.",answer:a(35)});
    }
    if (/اطلاعاتی درباره حساسیت دارویی .*ثبت نشده/.test(a(38))) issues.push({severity:"review",code:"ALLERGY_HISTORY_MISSING",caseId:c.id,questionId:qid(38),message:"Allergy history is missing from source profile; do not treat as negative."});
    if (/ویپ: اطلاعات ثبت نشده/.test(a(40))) issues.push({severity:"review",code:"VAPE_HISTORY_MISSING",caseId:c.id,questionId:qid(40),message:"Vaping history is missing from source profile; do not treat as negative."});
    // Prior target diagnosis in history may be valid for follow-up cases, but leaks blind diagnosis cases.
    const targetTerms = typeof c.diagnosis === "string" ? [c.diagnosis] : [c.diagnosis?.id, c.diagnosis?.name, c.title].filter((x): x is string => Boolean(x));
    if (targetTerms.some((term) => term && a(35).toLowerCase().includes(term.toLowerCase()))) issues.push({severity:"review",code:"TARGET_DIAGNOSIS_LEAKAGE",caseId:c.id,questionId:qid(35),message:"Past-history answer contains the target diagnosis/title; decide whether this is a follow-up or blind diagnostic case."});
  }
  for (const [questionId, freq] of answerFrequency.entries()) {
    const repeated = [...freq.entries()].sort((a,b)=>b[1]-a[1])[0];
    if (repeated && repeated[1] >= Math.ceil(cases.length*0.8)) {
      issues.push({severity:"warning",code:"HIGH_ANSWER_REUSE",caseId:"BANK",questionId,message:`Same rendered answer appears in ${repeated[1]}/${cases.length} cases; verify whether this reflects real shared negatives or generic boilerplate.`,answer:repeated[0]});
    }
  }
  return issues;
}
