import Link from "next/link";
import { notFound } from "next/navigation";
import CasePlayer from "../../../../components/CasePlayer";
import { gastroenterologyCases } from "../../../../data/gastroenterologyCases";

type Props={params:Promise<{caseId:string}>;searchParams:Promise<{mode?:string;difficulty?:string;tags?:string}>};
export function generateStaticParams(){return gastroenterologyCases.map(c=>({caseId:c.id}));}
export default async function GastroenterologyCasePage({params,searchParams}:Props){const {caseId}=await params;const selection=await searchParams;const caseData=gastroenterologyCases.find(c=>c.id===caseId);if(!caseData)notFound();const mode=["continue","unattempted","mistakes","start-over"].includes(selection.mode??"")?(selection.mode as "unattempted"|"mistakes"|"start-over"):"start-over";const difficulty=["easy","medium","hard","all"].includes(selection.difficulty??"")?(selection.difficulty as "easy"|"medium"|"hard"|"all"):"all";const tags=(selection.tags??"").split(",").filter(Boolean);const nextCaseOptions=gastroenterologyCases.map(c=>({id:c.id,difficulty:c.difficulty,tags:c.tags}));return <div className="min-h-screen bg-slate-50"><div className="mx-auto w-full max-w-4xl px-4 pt-5"><Link href="/practice/gastroenterology" className="inline-flex rounded-lg px-2 py-1 text-sm font-medium text-slate-500 hover:bg-white hover:text-slate-900">← بازگشت به کیس‌های گوارش</Link></div><CasePlayer caseData={caseData} storageKey={`sonic:practice:gastroenterology:${caseData.id}`} nextCaseOptions={nextCaseOptions} practiceSelection={{mode,difficulty,tags}}/></div>}
