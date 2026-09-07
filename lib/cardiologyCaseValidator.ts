import type { Case } from "../types/case";
import { cardiologyQuestionBank, cardiologyQuestionCategories } from "../data/cardiologyQuestionBank";
import { cardiologyPhysicalExamBank } from "../data/cardiologyPhysicalExamBank";
import { cardiologyInvestigationBank } from "../data/cardiologyInvestigationBank";
import { diseases } from "../data/diseases";

export type CardiologyValidationError={code:string;message:string;caseId?:string};
const banned=["TODO","placeholder","lorem ipsum","to be determined","may be present","consistent with the leading diagnosis"];
const ids=cardiologyQuestionBank.map(q=>q.id);
export function validateCardiologyCases(cases:Case[]):CardiologyValidationError[]{
 const e:CardiologyValidationError[]=[];
 if(cases.length!==50)e.push({code:"CASE_COUNT",message:`Expected 50 cases, found ${cases.length}`});
 const expected=Array.from({length:50},(_,i)=>`cardio-${String(i+1).padStart(3,"0")}`);
 cases.forEach((c,i)=>{
  if(c.id!==expected[i])e.push({code:"CASE_ORDER",message:`Expected ${expected[i]}, found ${c.id}`,caseId:c.id});
  if(c.course!=="cardiology")e.push({code:"COURSE",message:"Case course must be cardiology",caseId:c.id});
  if(!c.diagnosis)e.push({code:"DIAGNOSIS",message:"Missing diagnosis",caseId:c.id});
  if(c.diagnosis && !diseases.some(d=>d.id===c.diagnosis.id))e.push({code:"DIAGNOSIS_ID",message:`Unknown diagnosis ${c.diagnosis.id}`,caseId:c.id});
  const hs=c.stages.find(s=>s.type==="history"); const pe=c.stages.find(s=>s.type==="physical-exam"); const inv=c.stages.find(s=>s.type==="investigation");
  if(!hs||hs.type!=="history")e.push({code:"HISTORY_STAGE",message:"Missing history stage",caseId:c.id});
  else {
   if(hs.hints.length!==cardiologyQuestionBank.length)e.push({code:"HISTORY_COUNT",message:`Expected ${cardiologyQuestionBank.length} history answers, found ${hs.hints.length}`,caseId:c.id});
   const qids=hs.hints.map(h=>h.sourceId); if(JSON.stringify(qids)!==JSON.stringify(ids))e.push({code:"HISTORY_IDS",message:"History question IDs/order do not match the bank",caseId:c.id});
   hs.hints.forEach(h=>{if(!h.content?.trim())e.push({code:"EMPTY_HISTORY",message:"Empty history answer",caseId:c.id}); if(banned.some(x=>h.content.toLowerCase().includes(x.toLowerCase())))e.push({code:"PLACEHOLDER",message:"Placeholder/generic text in history",caseId:c.id});});
  }
  if(!pe||pe.type!=="physical-exam")e.push({code:"PE_STAGE",message:"Missing physical exam stage",caseId:c.id});
  else { if(pe.hints.length<5||pe.hints.length>7)e.push({code:"PE_COUNT",message:`Physical exam must contain 5–7 items; found ${pe.hints.length}`,caseId:c.id}); pe.hints.forEach(h=>{if(!h.content?.trim())e.push({code:"EMPTY_PE",message:"Empty physical exam finding",caseId:c.id});}); }
  if(!inv||inv.type!=="investigation")e.push({code:"INV_STAGE",message:"Missing investigation stage",caseId:c.id});
  else { if(inv.investigations.length<5||inv.investigations.length>6)e.push({code:"INV_COUNT",message:`Investigation must contain 5–6 items; found ${inv.investigations.length}`,caseId:c.id}); inv.investigations.forEach(x=>{if(!x.name?.trim()||!x.findings?.length||x.findings.some(f=>!f.value?.trim()))e.push({code:"EMPTY_INV",message:"Incomplete investigation",caseId:c.id});}); }
 });
 const diff={easy:cases.filter(c=>c.difficulty==="easy").length,medium:cases.filter(c=>c.difficulty==="medium").length,hard:cases.filter(c=>c.difficulty==="hard").length};
 if(diff.easy!==15||diff.medium!==25||diff.hard!==10)e.push({code:"DIFFICULTY",message:`Difficulty must be 15/25/10; found ${diff.easy}/${diff.medium}/${diff.hard}`});
 return e;
}
export function assertCardiologyCasesValid(cases:Case[]){const errors=validateCardiologyCases(cases); if(errors.length) throw new Error("Cardiology case validation failed:\n"+errors.map(x=>`${x.code}${x.caseId?` [${x.caseId}]`:""}: ${x.message}`).join("\n"));}
