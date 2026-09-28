import type { Case } from "../types/case";
import { pulmonologyCases } from "./pulmonologyCases";
import { cardiologyCases } from "./cardiologyCases";
import { nephrologyCases } from "./nephrologyCases";
import { gastroenterologyCases } from "./gastroenterologyCases";
import { endocrinologyCases } from "./endocrinologyCases";
import { hematologyOncologyCases } from "./hematologyOncologyCases";
import { validateCase } from "../lib/caseValidator";
import { caseAnswerOverrides } from "./caseAnswerOverrides";
import { caseAnswerOverrideKey } from "../lib/caseAnswerOverrideKey";

const allDefaultCases = [...pulmonologyCases, ...cardiologyCases, ...nephrologyCases, ...gastroenterologyCases, ...endocrinologyCases, ...hematologyOncologyCases];

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

function applyAnswerOverrides(caseData: Case): Case {
  return {
    ...caseData,
    stages: caseData.stages.map((stage) => {
      if (stage.type === "history" || stage.type === "physical-exam") {
        return {
          ...stage,
          hints: stage.hints.map((item) => {
            const key = caseAnswerOverrideKey(caseData.id, stage.type, item.id);
            const override = caseAnswerOverrides[key];
            return override === undefined ? item : { ...item, content: override };
          }),
        };
      }

      return {
        ...stage,
        investigations: stage.investigations.map((investigation) => ({
          ...investigation,
          findings: investigation.findings.map((finding) => {
            const itemKey = `${investigation.id}::${finding.label}`;
            const key = caseAnswerOverrideKey(caseData.id, stage.type, itemKey);
            const override = caseAnswerOverrides[key];
            return override === undefined ? finding : { ...finding, value: override };
          }),
        })),
      };
    }),
  };
}

export const masterCaseBank: Case[] = allDefaultCases.map(applyAnswerOverrides);

// Backward-compatible export used throughout the current app.
export const cases: Case[] = masterCaseBank;
