import PracticeCoursePage from "../../../components/PracticeCoursePage";
import { nephrologyCases } from "../../../data/nephrologyCases";

export default function NephrologyPage() {
  return <PracticeCoursePage course="nephrology" cases={nephrologyCases} />;
}
