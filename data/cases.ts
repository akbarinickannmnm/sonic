import type { Case } from "../types/case";
import { pulmonologyCases } from "./pulmonologyCases";
import { cardiologyCases } from "./cardiologyCases";
import { validateCase } from "../lib/caseValidator";

const allDefaultCases = [...pulmonologyCases, ...cardiologyCases];

const collectionErrors = allDefaultCases.flatMap((caseData) =>
  validateCase(caseData).map(
    (error) => `${caseData.id}: ${error.field} — ${error.message}`,
  ),
);

const caseIds = allDefaultCases.map((caseData) => caseData.id);
const duplicateCaseIds = [...new Set(caseIds.filter((id, index) => caseIds.indexOf(id) !== index))];

if (duplicateCaseIds.length > 0) {
  collectionErrors.push(
    `Duplicate case IDs: ${duplicateCaseIds.join(", ")}`,
  );
}

if (collectionErrors.length > 0) {
  throw new Error(
    `SONIC case data integrity check failed:\n${collectionErrors.join("\n")}`,
  );
}

export const cases: Case[] = allDefaultCases;
