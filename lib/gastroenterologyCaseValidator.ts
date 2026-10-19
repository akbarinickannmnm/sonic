import type { Case } from "../types/case";
import { gastroenterologyQuestionBank } from "../data/gastroenterologyQuestionBank";
import { gastroenterologyPhysicalExamBank } from "../data/gastroenterologyPhysicalExamBank";
import { gastroenterologyInvestigationBank } from "../data/gastroenterologyInvestigationBank";

export function validateGastroenterologyCases(cases: Case[]) {
  const errors: { code:string; message:string; caseId:string }[]=[];
  const hids=gastroenterologyQuestionBank.map(x=>x.id); const pids=new Set(gastroenterologyPhysicalExamBank.map(x=>x.id)); const iids=new Set(gastroenterologyInvestigationBank.map(x=>x.id));
  const duplicate=(xs:string[])=>xs.filter((x,i)=>xs.indexOf(x)!==i);
  const caseCodes=cases.map(c=>c.caseCode??"");
  const duplicateCaseCodes=new Set(duplicate(caseCodes.filter(Boolean)));
  for(const c of cases){
    if(!c.caseCode?.trim()) errors.push({code:"CASE_CODE_MISSING",message:"Gastroenterology case must have a stable case code.",caseId:c.id});
    else {
      if(!/^GI-\d{3}$/.test(c.caseCode)) errors.push({code:"CASE_CODE_FORMAT",message:`Invalid case code format: ${c.caseCode}. Expected GI-###.`,caseId:c.id});
      if(duplicateCaseCodes.has(c.caseCode)) errors.push({code:"CASE_CODE_DUPLICATE",message:`Duplicate case code ${c.caseCode}.`,caseId:c.id});
    }
    const h=c.stages.find(s=>s.type==="history"); const p=c.stages.find(s=>s.type==="physical-exam"); const inv=c.stages.find(s=>s.type==="investigation");
    if(!h || h.type!=="history") errors.push({code:"HISTORY_STAGE",message:"Missing history stage.",caseId:c.id}); else { const ids=h.hints.map(x=>x.sourceId??""); if(ids.length!==hids.length) errors.push({code:"HISTORY_COUNT",message:`Expected ${hids.length} history answers, found ${ids.length}.`,caseId:c.id}); for(const id of hids) if(!ids.includes(id)) errors.push({code:"HISTORY_MISSING",message:`Missing ${id}.`,caseId:c.id}); for(const id of duplicate(ids)) errors.push({code:"HISTORY_DUPLICATE",message:`Duplicate ${id}.`,caseId:c.id}); for(const x of h.hints) if(!x.content.trim()) errors.push({code:"HISTORY_EMPTY",message:`Empty answer ${x.sourceId??x.id}.`,caseId:c.id}); }
    if(!p || p.type!=="physical-exam") errors.push({code:"PE_STAGE",message:"Missing physical exam stage.",caseId:c.id}); else { const ids=p.hints.map(x=>x.sourceId??""); for(const id of pids) if(!ids.includes(id)) errors.push({code:"PE_MISSING",message:`Missing ${id}.`,caseId:c.id}); for(const id of duplicate(ids)) errors.push({code:"PE_DUPLICATE",message:`Duplicate ${id}.`,caseId:c.id}); }
    if(!inv || inv.type!=="investigation") errors.push({code:"INV_STAGE",message:"Missing investigation stage.",caseId:c.id}); else { const ids=inv.investigations.map(x=>x.sourceId??""); for(const id of iids) if(!ids.includes(id)) errors.push({code:"INV_MISSING",message:`Missing ${id}.`,caseId:c.id}); for(const id of duplicate(ids)) errors.push({code:"INV_DUPLICATE",message:`Duplicate ${id}.`,caseId:c.id}); }
    if(!c.candidateDiagnosisIds.includes(c.diagnosis.id)) errors.push({code:"DIAGNOSIS_POOL",message:"Correct diagnosis must be in candidates.",caseId:c.id});
  } return errors;
}
