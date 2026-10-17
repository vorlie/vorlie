import { MotionProject } from "../../../types/motion";
import MotionCard from "./MotionCard";

interface RelatedProjectsProps {
  projects: MotionProject[];
}

export default function RelatedProjects({ projects }: RelatedProjectsProps) {
  if (projects.length === 0) {
    return null;
  }

  return (
    <section className="motion-section">
      <h2 className="motion-section__title">More visualizers</h2>

      <div className="motion-grid">
        {projects.map((project) => (
          <MotionCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}
