import PracticeCoursePage from "../../../components/PracticeCoursePage";
import { pulmonologyCases } from "../../../data/pulmonologyCases";

export default function PulmonologyPage() {
  return <PracticeCoursePage course="pulmonology" cases={pulmonologyCases} />;
}
