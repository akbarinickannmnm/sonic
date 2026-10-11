const assert = require('node:assert/strict');
const { cardiologyCases } = require('../.phase5-build/data/cardiologyCases.js');
const { cardiologyQuestionBank } = require('../.phase5-build/data/cardiologyQuestionBank.js');
const getAnswer = (caseId, qid) => {
  const c = cardiologyCases.find(x => x.id === caseId);
  assert.ok(c, `missing case ${caseId}`);
  const stage = c.stages.find(x => x.type === 'history');
  assert.ok(stage, `missing history stage ${caseId}`);
  return stage.hints.find(x => x.sourceId === qid)?.content;
};
assert.equal(cardiologyCases.length, 50);
assert.equal(cardiologyQuestionBank.length, 40);
assert.equal(new Set(cardiologyQuestionBank.map(q => q.id)).size, 40);
for (const c of cardiologyCases) {
  const h = c.stages.find(x => x.type === 'history').hints;
  assert.equal(h.length, 40, `${c.id}: answer count`);
  assert.equal(new Set(h.map(x => x.sourceId)).size, 40, `${c.id}: duplicate IDs`);
  assert.equal(h.find(x => x.sourceId === 'cardio-hist-035').label, cardiologyQuestionBank.find(q => q.id === 'cardio-hist-035').text, `${c.id}: q035 label`);
  assert.equal(h.find(x => x.sourceId === 'cardio-hist-040').label, cardiologyQuestionBank.find(q => q.id === 'cardio-hist-040').text, `${c.id}: q040 label`);
}
for (let i=1;i<=5;i++) {
  const id=`cardio-${String(i).padStart(3,'0')}`;
  const stage=cardiologyCases.find(c=>c.id===id).stages.find(s=>s.type==='history');
  assert.ok(stage.hints.every(h=>h.content.trim().length>0), `${id}: empty answer`);
  const pain=stage.hints.find(h=>h.sourceId==='cardio-hist-002').content;
  if (/درد یا ناراحتی مشخصی در قفسه سینه ندارم|درد یا فشار مشخصی در قفسه سینه ندارم/.test(pain)) {
    for (let n=11;n<=19;n++) assert.match(stage.hints.find(h=>h.sourceId===`cardio-hist-${String(n).padStart(3,'0')}`).content, /درد قفسه سینه ندارم|دردی ندارم|محل درد مطرح نیست/, `${id}: pain branch q${n}`);
  }
}
assert.match(getAnswer('cardio-050','cardio-hist-003'), /ورزش/);
assert.match(getAnswer('cardio-050','cardio-hist-022'), /بله/);
assert.match(getAnswer('cardio-004','cardio-hist-028'), /ناگهانی شروع.*ناگهانی هم قطع/);
assert.doesNotMatch(getAnswer('cardio-004','cardio-hist-035'), /فیبریلاسیون دهلیزی تشخیص داده‌اند/);
assert.doesNotMatch(getAnswer('cardio-005','cardio-hist-035'), /SVT تشخیص داده‌اند/);
assert.match(getAnswer('cardio-004','cardio-hist-037'), /داروی روزانه‌ای مصرف نمی‌کنم/);
console.log('Phase 5 checks passed: 50 cases, 40 stable questions, question-label alignment, first-five pain consistency, cardio-050 dyspnea consistency, and no false prior AF/SVT disclosure.');
