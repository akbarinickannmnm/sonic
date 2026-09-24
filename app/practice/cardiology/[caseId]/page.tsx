import { notFound } from "next/navigation";
import CasePlayer from "../../../../components/CasePlayer";
import { cardiologyCases } from "../../../../data/cardiologyCases";

type Props = {
  params: Promise<{ caseId: string }>;
  searchParams: Promise<{ mode?: string; difficulty?: string; tags?: string }>;
};

export function generateStaticParams() {
  return cardiologyCases.map((caseData) => ({ caseId: caseData.id }));
}

export default async function CardiologyCasePage({ params, searchParams }: Props) {
  const { caseId } = await params;
  const selection = await searchParams;
  const caseData = cardiologyCases.find((item) => item.id === caseId);
  if (!caseData) notFound();

  const mode = ["unattempted", "mistakes", "start-over"].includes(selection.mode ?? "")
    ? (selection.mode as "unattempted" | "mistakes" | "start-over")
    : "start-over";
  const difficulty = ["easy", "medium", "hard", "all"].includes(selection.difficulty ?? "")
    ? (selection.difficulty as "easy" | "medium" | "hard" | "all")
    : "all";
  const tags = (selection.tags ?? "").split(",").filter(Boolean);
  const nextCaseOptions = cardiologyCases.map((item) => ({
    id: item.id,
    difficulty: item.difficulty,
    tags: item.tags,
  }));

  return (
    <div className="min-h-screen bg-slate-50">
<CasePlayer
        caseData={caseData}
        storageKey={`sonic:practice:cardiology:${caseData.id}`}
        nextCaseOptions={nextCaseOptions}
        practiceSelection={{ mode, difficulty, tags }}
      />
    </div>
  );
}
