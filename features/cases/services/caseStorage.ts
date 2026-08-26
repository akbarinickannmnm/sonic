import { Case } from "../../../types/case";

/*
 * Same key used across the rest of the app
 * (Case Library, Preview, Create/Edit Case).
 * Keep this in sync with:
 *   - app/admin/cases/page.tsx
 *   - app/admin/cases/preview/page.tsx
 *   - app/admin/cases/new/page.tsx
 */
const STORAGE_KEY = "sonic-cases";

export function getCases(): Case[] {
  if (typeof window === "undefined") return [];

  const raw = localStorage.getItem(STORAGE_KEY);

  if (!raw) return [];

  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveCases(cases: Case[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cases));
}

export function saveCase(newCase: Case) {
  const cases = getCases();

  const existingIndex = cases.findIndex(
    c => c.id === newCase.id
  );

  if (existingIndex >= 0) {
    cases[existingIndex] = newCase;
  } else {
    cases.push(newCase);
  }

  saveCases(cases);
}

export function deleteCase(caseId: string) {
  const cases = getCases().filter(
    c => c.id !== caseId
  );

  saveCases(cases);
}

export function getCaseById(id: string) {
  return getCases().find(
    c => c.id === id
  );
}