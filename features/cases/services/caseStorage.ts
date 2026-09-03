import { validateCase } from "../../../lib/caseValidator";
import type { Case } from "../../../types/case";

const STORAGE_KEY = "sonic-cases";

function isValidStoredCase(value: unknown): value is Case {
  if (!value || typeof value !== "object") return false;

  const candidate = value as Partial<Case>;

  if (
    typeof candidate.id !== "string" ||
    typeof candidate.title !== "string" ||
    typeof candidate.course !== "string" ||
    typeof candidate.difficulty !== "string" ||
    !Array.isArray(candidate.tags) ||
    !Array.isArray(candidate.stages) ||
    !candidate.patient ||
    typeof candidate.patient !== "object" ||
    !Array.isArray(candidate.candidateDiagnosisIds) ||
    !Array.isArray(candidate.reviewQuestions)
  ) {
    return false;
  }

  return validateCase(candidate as Case).length === 0;
}

export function getCases(): Case[] {
  if (typeof window === "undefined") return [];

  const raw = localStorage.getItem(STORAGE_KEY);

  if (!raw) return [];

  try {
    const parsed: unknown = JSON.parse(raw);

    if (!Array.isArray(parsed)) return [];

    return parsed.filter(isValidStoredCase);
  } catch {
    return [];
  }
}

export function saveCases(cases: Case[]) {
  const validCases = cases.filter(
    (caseData) => validateCase(caseData).length === 0,
  );

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(validCases),
  );
}

export function saveCase(newCase: Case) {
  const errors = validateCase(newCase);

  if (errors.length > 0) {
    throw new Error(
      `Cannot save invalid case: ${errors
        .map((error) => `${error.field} — ${error.message}`)
        .join("; ")}`,
    );
  }

  const cases = getCases();
  const existingIndex = cases.findIndex(
    (caseData) => caseData.id === newCase.id,
  );

  if (existingIndex >= 0) {
    cases[existingIndex] = newCase;
  } else {
    cases.push(newCase);
  }

  saveCases(cases);
}

export function deleteCase(caseId: string) {
  saveCases(getCases().filter((caseData) => caseData.id !== caseId));
}

export function getCaseById(id: string) {
  return getCases().find((caseData) => caseData.id === id);
}
