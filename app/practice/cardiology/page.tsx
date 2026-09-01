import PracticeCoursePage from "../../../components/PracticeCoursePage";
import { cardiologyCases } from "../../../data/cardiologyCases";

export default function CardiologyPage() {
  return <PracticeCoursePage course="cardiology" cases={cardiologyCases} />;
}
