const assert = require('node:assert/strict');
const { cardiologyCases } = require('../.phase6-build/data/cardiologyCases.js');
const { cardiologyQuestionBank } = require('../.phase6-build/data/cardiologyQuestionBank.js');
const { cardiologyHistoryPhase3 } = require('../.phase6-build/data/cardiologyHistoryPhase3.js');
const { cardiologyPhysicalExamBank } = require('../.phase6-build/data/cardiologyPhysicalExamBank.js');
const { cardiologyInvestigationBank } = require('../.phase6-build/data/cardiologyInvestigationBank.js');
const { getCourseBank, getMasterCaseBank } = require('../.phase6-build/data/courseBanks.js');
const { validateRenderedCardiologyHistory } = require('../.phase6-build/docs/cardiologyHistoryRuntimeValidator.js');

const expectedCaseIds = Array.from({ length: 50 }, (_, i) => `cardio-${String(i + 1).padStart(3, '0')}`);
const expectedQuestionIds = Array.from({ length: 40 }, (_, i) => `cardio-hist-${String(i + 1).padStart(3, '0')}`);
assert.equal(cardiologyCases.length, 50, 'Cardiology source cases');
assert.deepEqual(cardiologyCases.map(c => c.id), expectedCaseIds, 'Stable case IDs/order');
assert.equal(cardiologyQuestionBank.length, 40, 'Fixed History question count');
assert.deepEqual(cardiologyQuestionBank.map(q => q.id), expectedQuestionIds, 'Stable History question IDs/order');
assert.equal(cardiologyPhysicalExamBank.length, 7, 'Fixed physical exam bank count');
assert.equal(cardiologyInvestigationBank.length, 7, 'Fixed investigation bank count');

for (const c of cardiologyCases) {
  const history = c.stages.find(s => s.type === 'history');
  const pe = c.stages.find(s => s.type === 'physical-exam');
  const inv = c.stages.find(s => s.type === 'investigation');
  assert.ok(history && pe && inv, `${c.id}: all stages exist`);
  assert.equal(history.hints.length, 40, `${c.id}: exactly 40 History answers`);
  assert.deepEqual(history.hints.map(h => h.sourceId), expectedQuestionIds, `${c.id}: exact question IDs/order`);
  assert.deepEqual(history.hints.map(h => h.label), cardiologyQuestionBank.map(q => q.text), `${c.id}: all question labels match`);
  assert.equal(pe.hints.length, 7, `${c.id}: exactly 7 PE items`);
  assert.deepEqual(pe.hints.map(h => h.sourceId), cardiologyPhysicalExamBank.map(x => x.id), `${c.id}: PE IDs/order`);
  assert.equal(inv.investigations.length, 7, `${c.id}: exactly 7 investigation items`);
  assert.deepEqual(inv.investigations.map(x => x.sourceId), cardiologyInvestigationBank.map(x => x.id), `${c.id}: investigation IDs/order`);
  for (const h of history.hints) assert.ok(h.content && h.content.trim(), `${c.id}/${h.sourceId}: non-empty answer`);
}

// Verify authored phase-3/5 records actually flow into the practice case objects.
for (const [caseId, answers] of Object.entries(cardiologyHistoryPhase3)) {
  const c = cardiologyCases.find(x => x.id === caseId);
  assert.ok(c, `${caseId}: authored case exists`);
  const history = c.stages.find(s => s.type === 'history');
  for (const [questionId, authored] of Object.entries(answers)) {
    const actual = history.hints.find(h => h.sourceId === questionId);
    assert.ok(actual, `${caseId}/${questionId}: authored question mapped`);
    assert.equal(actual.content, authored.patientAnswer, `${caseId}/${questionId}: authored answer reaches practice case`);
    assert.equal(actual.label, authored.question, `${caseId}/${questionId}: authored question text matches`);
  }
}

// Verify the learning bank is sourced from the same master case objects.
const master = getMasterCaseBank();
const masterCardiology = master.filter(c => c.course === 'cardiology');
assert.equal(masterCardiology.length, 50, 'Learning master bank has 50 cardiology cases');
const courseBank = getCourseBank('cardiology');
assert.equal(courseBank.history.length, 40, 'Learning history bank has 40 questions');
assert.equal(courseBank.physicalExam.length, 7, 'Learning physical exam bank has 7 items');
assert.equal(courseBank.investigations.length, 7, 'Learning investigation bank has 7 items');
for (const q of courseBank.history) {
  assert.equal(Object.keys(q.answersByCase).filter(id => id.startsWith('cardio-')).length, 50, `${q.id}: 50 case answers available to learning bank`);
  for (const c of masterCardiology) {
    const sourceAnswer = c.stages.find(s => s.type === 'history').hints.find(h => h.sourceId === q.id)?.content;
    assert.equal(q.answersByCase[c.id], sourceAnswer, `${q.id}/${c.id}: learning answer matches master case`);
  }
}

// Prevent recurrence of the category mix-up: electrolytes belong to laboratory, not CT/MRI.
const lab = cardiologyInvestigationBank.find(x => x.category === 'laboratory');
const ctMri = cardiologyInvestigationBank.find(x => x.category === 'ct-mri');
assert.ok(lab && /الکترولیت/.test(lab.description), 'Electrolytes listed under laboratory');
assert.ok(ctMri && !/الکترولیت/.test(`${ctMri.title} ${ctMri.description}`), 'No electrolytes in CT/MRI category');

const issues = validateRenderedCardiologyHistory(cardiologyCases);
const errors = issues.filter(x => x.severity === 'error');
assert.equal(errors.length, 0, `Runtime validator has no errors: ${JSON.stringify(errors.slice(0, 5))}`);
const counts = issues.reduce((a, x) => (a[x.severity] = (a[x.severity] || 0) + 1, a), {});
console.log(JSON.stringify({
  result: 'PASS',
  cases: cardiologyCases.length,
  historyQuestions: cardiologyQuestionBank.length,
  authoredCases: Object.keys(cardiologyHistoryPhase3).length,
  authoredAnswerRecords: Object.values(cardiologyHistoryPhase3).reduce((n, x) => n + Object.keys(x).length, 0),
  physicalExamItems: cardiologyPhysicalExamBank.length,
  investigationItems: cardiologyInvestigationBank.length,
  learningBankAnswersVerified: courseBank.history.length * 50,
  runtimeValidator: counts,
  fullNextBuild: 'NOT RUN: package.json and lockfile are absent from supplied archive'
}, null, 2));
