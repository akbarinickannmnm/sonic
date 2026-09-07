import Link from "next/link";
import { notFound } from "next/navigation";
import CasePlayer from "../../../../components/CasePlayer";
import { pulmonologyCases } from "../../../../data/pulmonologyCases";

type Props = {
  params: Promise<{ caseId: string }>;
  searchParams: Promise<{ mode?: string; difficulty?: string; tags?: string }>;
};

export function generateStaticParams() {
  return pulmonologyCases.map((caseData) => ({ caseId: caseData.id }));
}

export default async function PulmonologyCasePage({ params, searchParams }: Props) {
  const { caseId } = await params;
  const selection = await searchParams;
  const caseData = pulmonologyCases.find((item) => item.id === caseId);

  if (!caseData) notFound();

  const mode = ["continue", "unattempted", "mistakes", "start-over"].includes(selection.mode ?? "")
    ? (selection.mode as "continue" | "unattempted" | "mistakes" | "start-over")
    : "start-over";
  const difficulty = ["easy", "medium", "hard", "all"].includes(selection.difficulty ?? "")
    ? (selection.difficulty as "easy" | "medium" | "hard" | "all")
    : "all";
  const tags = (selection.tags ?? "").split(",").filter(Boolean);
  const nextCaseOptions = pulmonologyCases.map((item) => ({
    id: item.id,
    difficulty: item.difficulty,
    tags: item.tags,
  }));

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto w-full max-w-4xl px-4 pt-5">
        <Link
          href="/practice/pulmonology"
          className="inline-flex rounded-lg px-2 py-1 text-sm font-medium text-slate-500 transition hover:bg-white hover:text-slate-900"
        >
          ← بازگشت به کیس‌های ریه
        </Link>
      </div>
      <CasePlayer
        caseData={caseData}
        storageKey={`sonic:practice:pulmonology:${caseData.id}`}
        nextCaseOptions={nextCaseOptions}
        practiceSelection={{ mode, difficulty, tags }}
      />
    </div>
  );
}
