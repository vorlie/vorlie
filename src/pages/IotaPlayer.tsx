import ProjectPage from "../components/ProjectPage";
import { getProjectBySlug } from "../data/projectsData";

const data = getProjectBySlug("iota-player")!;

export default function IotaPlayer() {
  return <ProjectPage data={data} />;
}
