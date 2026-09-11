import type { Case } from "../types/case";
import { hematologyOncologyQuestionBank } from "../data/hematologyOncologyQuestionBank";
import { hematologyOncologyPhysicalExamBank } from "../data/hematologyOncologyPhysicalExamBank";
import { hematologyOncologyInvestigationBank } from "../data/hematologyOncologyInvestigationBank";

export function validateHematologyOncologyCases(cases:Case[]){
 const errors:{code:string;message:string;caseId:string}[]=[];
 const h=hematologyOncologyQuestionBank.map(x=>x.id), p=hematologyOncologyPhysicalExamBank.map(x=>x.id), i=hematologyOncologyInvestigationBank.map(x=>x.id);
 const dup=(xs:string[])=>xs.filter((x,j)=>xs.indexOf(x)!==j);
 for(const c of cases){
  const hs=c.stages.find(x=>x.type==="history"), ps=c.stages.find(x=>x.type==="physical-exam"), is=c.stages.find(x=>x.type==="investigation");
  if(!hs||hs.type!=="history") errors.push({code:"HISTORY_STAGE",message:"Missing history stage",caseId:c.id}); else {const ids=hs.hints.map(x=>x.sourceId??""); if(ids.length!==h.length) errors.push({code:"HISTORY_COUNT",message:`Expected ${h.length}, found ${ids.length}`,caseId:c.id}); for(const id of h) if(!ids.includes(id)) errors.push({code:"HISTORY_MISSING",message:`Missing ${id}`,caseId:c.id}); for(const d of dup(ids)) errors.push({code:"HISTORY_DUPLICATE",message:`Duplicate ${d}`,caseId:c.id}); for(const x of hs.hints) if(!x.content.trim()) errors.push({code:"HISTORY_EMPTY",message:`Empty ${x.sourceId??x.id}`,caseId:c.id});}
  if(!ps||ps.type!=="physical-exam") errors.push({code:"PE_STAGE",message:"Missing physical exam stage",caseId:c.id}); else {const ids=ps.hints.map(x=>x.sourceId??""); if(ids.length!==p.length) errors.push({code:"PE_COUNT",message:`Expected ${p.length}, found ${ids.length}`,caseId:c.id}); for(const id of p) if(!ids.includes(id)) errors.push({code:"PE_MISSING",message:`Missing ${id}`,caseId:c.id}); for(const d of dup(ids)) errors.push({code:"PE_DUPLICATE",message:`Duplicate ${d}`,caseId:c.id});}
  if(!is||is.type!=="investigation") errors.push({code:"INV_STAGE",message:"Missing investigation stage",caseId:c.id}); else {const ids=is.investigations.map(x=>x.sourceId??""); if(ids.length!==i.length) errors.push({code:"INV_COUNT",message:`Expected ${i.length}, found ${ids.length}`,caseId:c.id}); for(const id of i) if(!ids.includes(id)) errors.push({code:"INV_MISSING",message:`Missing ${id}`,caseId:c.id}); for(const x of is.investigations) if(!x.findings.length) errors.push({code:"INV_EMPTY",message:`Empty ${x.sourceId??x.id}`,caseId:c.id});}
  if(!c.candidateDiagnosisIds.includes(c.diagnosis.id)) errors.push({code:"DIAGNOSIS_POOL",message:"Diagnosis not in candidates",caseId:c.id});
  if(c.reviewQuestions.some(q=>q.options.length!==4)) errors.push({code:"REVIEW_OPTIONS",message:"Review questions must have 4 options",caseId:c.id});
 } return errors;
}
