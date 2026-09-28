import { notFound } from "next/navigation";
import CaseReviewPage from "../../../../components/CaseReviewPage";
import { getMasterCaseBank } from "../../../../data/courseBanks";
import type { Course } from "../../../../types/case";

const course: Course = "gastroenterology";

export function generateStaticParams() {
  return getMasterCaseBank()
    .filter((item) => item.course === course)
    .map((item) => ({ caseId: item.id }));
}

export default async function Page({ params }: { params: Promise<{ caseId: string }> }) {
  const { caseId: encodedCaseId } = await params;
  const caseId = decodeURIComponent(encodedCaseId);
  const caseData = getMasterCaseBank().find((item) => item.course === course && item.id === caseId);

  if (!caseData) notFound();

  return <CaseReviewPage caseData={caseData} mode="learning" />;
}
