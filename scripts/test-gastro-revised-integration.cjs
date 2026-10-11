const fs = require("node:fs");
const path = require("node:path");
const root = path.resolve(__dirname, "..");
const historyPath = path.join(root, "docs/gastro-audit/gastroenterology_history_scientifically_revised.json");
const physicalPath = path.join(root, "docs/gastro-audit/gastroenterology_physical_investigation_scientifically_revised.json");
const history = JSON.parse(fs.readFileSync(historyPath, "utf8"));
const physical = JSON.parse(fs.readFileSync(physicalPath, "utf8"));
const assert = (condition, message) => { if (!condition) throw new Error(message); };
assert(history.length === 53, `Expected 53 history cases, got ${history.length}`);
assert(physical.cases.length === 53, `Expected 53 physical/investigation cases, got ${physical.cases.length}`);
const historyIds = new Set(history.map(x => x.diagnosisId));
const physicalIds = new Set(physical.cases.map(x => x.diagnosisId));
assert(historyIds.size === 53 && physicalIds.size === 53, "Duplicate diagnosis IDs in revised bank");
assert([...historyIds].every(id => physicalIds.has(id)), "History and physical/investigation case IDs differ");
for (const c of history) {
  assert(c.history.length === 50, `${c.diagnosisId}: expected 50 history answers`);
  assert(new Set(c.history.map(x => x.questionId)).size === 50, `${c.diagnosisId}: duplicate history question IDs`);
  assert(c.history.every(x => typeof x.answer === "string" && x.answer.trim()), `${c.diagnosisId}: blank history answer`);
}
for (const c of physical.cases) {
  assert(c.physicalExam.length === 12, `${c.diagnosisId}: expected 12 physical exam answers`);
  assert(c.investigations.length === 10, `${c.diagnosisId}: expected 10 investigation categories`);
  assert(new Set(c.physicalExam.map(x => x.id)).size === 12, `${c.diagnosisId}: duplicate physical exam IDs`);
  assert(new Set(c.investigations.map(x => x.id)).size === 10, `${c.diagnosisId}: duplicate investigation IDs`);
  assert(c.physicalExam.every(x => typeof x.answer === "string" && x.answer.trim()), `${c.diagnosisId}: blank physical exam answer`);
  assert(c.investigations.every(x => Array.isArray(x.answer) && x.answer.length && x.answer.every(y => y.label?.trim() && y.value?.trim())), `${c.diagnosisId}: missing investigation findings`);
}
console.log("PASS: 53 cases; 2,650 history answers; 636 physical-exam answers; 530 investigation categories; no missing/duplicate IDs or blank answers.");
