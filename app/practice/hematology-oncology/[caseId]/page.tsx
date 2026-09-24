import { notFound } from "next/navigation";
import CasePlayer from "../../../../components/CasePlayer";
import { hematologyOncologyCases } from "../../../../data/hematologyOncologyCases";

type Props={params:Promise<{caseId:string}>;searchParams:Promise<{mode?:string;difficulty?:string;tags?:string}>};
export function generateStaticParams(){return hematologyOncologyCases.map(c=>({caseId:c.id}));}
export default async function HematologyOncologyCasePage({params,searchParams}:Props){const {caseId}=await params;const selection=await searchParams;const caseData=hematologyOncologyCases.find(c=>c.id===caseId);if(!caseData)notFound();const mode=["continue","unattempted","mistakes","start-over"].includes(selection.mode??"")?(selection.mode as "unattempted"|"mistakes"|"start-over"):"start-over";const difficulty=["easy","medium","hard","all"].includes(selection.difficulty??"")?(selection.difficulty as "easy"|"medium"|"hard"|"all"):"all";const tags=(selection.tags??"").split(",").filter(Boolean);const nextCaseOptions=hematologyOncologyCases.map(c=>({id:c.id,difficulty:c.difficulty,tags:c.tags}));return <div className="min-h-screen bg-slate-50"><CasePlayer caseData={caseData} storageKey={`sonic:practice:hematology-oncology:${caseData.id}`} nextCaseOptions={nextCaseOptions} practiceSelection={{mode,difficulty,tags}}/></div>}
