import type { Diagnosis } from "../data/diseases";
import type { Case } from "../types/case";

function normalizeDiagnosis(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

export function isCorrectDiagnosis(
  input: string,
  correctDiagnosis: Diagnosis,
): boolean {
  const normalizedInput = normalizeDiagnosis(input);

  if (normalizedInput === normalizeDiagnosis(correctDiagnosis.name)) {
    return true;
  }

  return correctDiagnosis.synonyms.some(
    (synonym) => normalizeDiagnosis(synonym) === normalizedInput,
  );
}

/**
 * The active player currently owns gameplay state in CasePlayer.
 * Keep this small helper module for domain-level diagnosis logic.
 * The Case parameter is intentionally exported for future engine work.
 */
export type PlayableCase = Case;
