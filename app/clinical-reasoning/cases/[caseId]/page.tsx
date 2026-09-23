import Link from "next/link";
import { notFound } from "next/navigation";
import ClinicalReasoningCasePlayer from "../../../../components/ClinicalReasoningCasePlayer";
import { clinicalReasoningCases } from "../../../../data/clinicalReasoningCases";

export function generateStaticParams() {
  return clinicalReasoningCases.map((caseData) => ({ caseId: caseData.id }));
}

type Props = {
  params: Promise<{ caseId: string }>;
};

export default async function ClinicalReasoningCasePage({ params }: Props) {
  const { caseId } = await params;
  const caseData = clinicalReasoningCases.find((item) => item.id === caseId);

  if (!caseData) notFound();

  return (
    <main dir="rtl" className="min-h-screen bg-[#fbf8f2] px-5 py-8 text-slate-900">
      <div className="mx-auto max-w-[1120px]">
        <Link
          href="/clinical-reasoning/cases"
          className="inline-flex rounded-lg px-2 py-1 text-sm font-semibold text-slate-500 transition hover:bg-white hover:text-slate-900"
        >
          ← بازگشت به کیس‌ها
        </Link>

        <ClinicalReasoningCasePlayer caseData={caseData} />
      </div>
    </main>
  );
}
