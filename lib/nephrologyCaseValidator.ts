import type { Case } from "../types/case";
import { nephrologyQuestionBank } from "../data/nephrologyQuestionBank";
import { nephrologyPhysicalExamBank } from "../data/nephrologyPhysicalExamBank";
import { nephrologyInvestigationBank } from "../data/nephrologyInvestigationBank";

export type NephrologyValidationError = { code: string; message: string; caseId: string };

function duplicates(values: string[]) {
  const seen = new Set<string>();
  const dup = new Set<string>();
  for (const value of values) { if (seen.has(value)) dup.add(value); seen.add(value); }
  return [...dup];
}

export function validateNephrologyCases(cases: Case[]): NephrologyValidationError[] {
  const errors: NephrologyValidationError[] = [];
  const expectedHistory = nephrologyQuestionBank.map((q) => q.id);
  const expectedPE = new Set(nephrologyPhysicalExamBank.map((x) => x.id));
  const expectedInv = new Set(nephrologyInvestigationBank.map((x) => x.id));

  for (const c of cases) {
    if (c.course !== "nephrology") { errors.push({ code: "COURSE", message: "Case course must be nephrology.", caseId: c.id }); continue; }
    const history = c.stages.find((s) => s.type === "history");
    const pe = c.stages.find((s) => s.type === "physical-exam");
    const inv = c.stages.find((s) => s.type === "investigation");

    if (!history || history.type !== "history") errors.push({ code: "HISTORY_STAGE", message: "Missing history stage.", caseId: c.id });
    else {
      if (history.hints.length !== expectedHistory.length) errors.push({ code: "HISTORY_COUNT", message: `Expected ${expectedHistory.length} history answers, found ${history.hints.length}.`, caseId: c.id });
      const ids = history.hints.map((h) => h.sourceId ?? "");
      for (const id of expectedHistory) if (!ids.includes(id)) errors.push({ code: "HISTORY_MISSING", message: `Missing history question ${id}.`, caseId: c.id });
      for (const id of duplicates(ids)) errors.push({ code: "HISTORY_DUPLICATE", message: `Duplicate history sourceId ${id}.`, caseId: c.id });
      for (const hint of history.hints) if (!hint.content.trim()) errors.push({ code: "HISTORY_EMPTY", message: `Empty answer for ${hint.sourceId ?? hint.id}.`, caseId: c.id });
    }

    if (!pe || pe.type !== "physical-exam") errors.push({ code: "PE_STAGE", message: "Missing physical-exam stage.", caseId: c.id });
    else {
      const ids = pe.hints.map((h) => h.sourceId ?? "");
      for (const id of duplicates(ids)) errors.push({ code: "PE_DUPLICATE", message: `Duplicate physical exam sourceId ${id}.`, caseId: c.id });
      for (const id of ids) if (!expectedPE.has(id)) errors.push({ code: "PE_UNKNOWN", message: `Unknown physical exam sourceId ${id}.`, caseId: c.id });
    }

    if (!inv || inv.type !== "investigation") errors.push({ code: "INV_STAGE", message: "Missing investigation stage.", caseId: c.id });
    else {
      const ids = inv.investigations.map((x) => x.sourceId ?? "");
      for (const id of duplicates(ids)) errors.push({ code: "INV_DUPLICATE", message: `Duplicate investigation sourceId ${id}.`, caseId: c.id });
      for (const id of ids) if (!expectedInv.has(id)) errors.push({ code: "INV_UNKNOWN", message: `Unknown investigation sourceId ${id}.`, caseId: c.id });
    }

    if (!c.diagnosis.id || !c.candidateDiagnosisIds.includes(c.diagnosis.id)) errors.push({ code: "DIAGNOSIS_POOL", message: "Correct diagnosis must exist in candidate pool.", caseId: c.id });
  }
  return errors;
}
