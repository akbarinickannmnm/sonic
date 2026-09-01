import Link from "next/link";
import { notFound } from "next/navigation";
import CasePlayer from "../../../../components/CasePlayer";
import { cardiologyCases } from "../../../../data/cardiologyCases";

export function generateStaticParams() { return cardiologyCases.map((caseData) => ({ caseId: caseData.id })); }

export default async function CardiologyCasePage({ params }: { params: Promise<{ caseId: string }> }) {
  const { caseId } = await params;
  const caseData = cardiologyCases.find((item) => item.id === caseId);
  if (!caseData) notFound();
  return <div className="min-h-screen bg-slate-50"><div className="mx-auto w-full max-w-4xl px-4 pt-5"><Link href="/practice/cardiology" className="inline-flex rounded-lg px-2 py-1 text-sm font-medium text-slate-500 transition hover:bg-white hover:text-slate-900">← Back to Cardiology cases</Link></div><CasePlayer caseData={caseData} storageKey={`sonic:practice:cardiology:${caseData.id}`} /></div>;
}
