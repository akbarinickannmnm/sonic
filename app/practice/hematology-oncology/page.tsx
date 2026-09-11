import { hematologyOncologyCases } from "../../../data/hematologyOncologyCases";
import PracticeCoursePage from "../../../components/PracticeCoursePage";

export default function HematologyOncologyPracticePage(){
  return <PracticeCoursePage course="hematology-oncology" cases={hematologyOncologyCases}/>;
}
