import ProjectPage from "../components/ProjectPage";
import { getProjectBySlug } from "../data/projectsData";

const data = getProjectBySlug("iotas-notepad")!;

export default function IotasNotepad() {
  return <ProjectPage data={data} />;
}
