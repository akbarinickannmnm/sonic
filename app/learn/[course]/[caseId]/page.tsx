import { notFound } from "next/navigation";
import CaseReviewPage from "../../../../components/CaseReviewPage";
import { getMasterCaseBank } from "../../../../data/courseBanks";
import type { Course } from "../../../../types/case";

const validCourses = new Set<Course>([
  "pulmonology",
  "cardiology",
  "nephrology",
  "gastroenterology",
  "endocrinology",
  "hematology-oncology",
  "neurology",
  "infectious-disease",
]);

export function generateStaticParams() {
  return getMasterCaseBank().map((item) => ({
    course: item.course,
    caseId: item.id,
  }));
}

export default async function LearnCaseReviewPage({ params }: { params: Promise<{ course: string; caseId: string }> }) {
  const { course: encodedCourse, caseId: encodedCaseId } = await params;
  const course = decodeURIComponent(encodedCourse) as Course;
  const caseId = decodeURIComponent(encodedCaseId);

  if (!validCourses.has(course)) notFound();

  const caseData = getMasterCaseBank().find((item) => item.course === course && item.id === caseId);
  if (!caseData) notFound();

  return <CaseReviewPage caseData={caseData} mode="learning" />;
}
