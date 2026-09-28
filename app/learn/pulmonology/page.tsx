import LearnCoursePage from "../../../components/LearnCoursePage";
import type { Course } from "../../../types/case";

const course: Course = "pulmonology";

export default function Page() {
  return <LearnCoursePage course={course} />;
}
