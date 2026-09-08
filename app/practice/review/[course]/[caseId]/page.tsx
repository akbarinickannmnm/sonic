import { notFound } from "next/navigation";
import CaseReviewPage from "../../../../../components/CaseReviewPage";
import { getMasterCaseBank } from "../../../../../data/courseBanks";

export function generateStaticParams() {
  return getMasterCaseBank().map((item) => ({ course: item.course, caseId: item.id }));
}

export default async function ReviewRoute({ params }: { params: Promise<{ course: string; caseId: string }> }) {
  const { course, caseId } = await params;
  const caseData = getMasterCaseBank().find((item) => item.course === course && item.id === caseId);
  if (!caseData) notFound();
  return <CaseReviewPage caseData={caseData} />;
}
