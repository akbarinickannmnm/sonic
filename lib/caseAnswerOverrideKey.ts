export function caseAnswerOverrideKey(
  caseId: string,
  stageType: "history" | "physical-exam" | "investigation",
  itemKey: string,
) {
  return `${caseId}::${stageType}::${itemKey}`;
}
