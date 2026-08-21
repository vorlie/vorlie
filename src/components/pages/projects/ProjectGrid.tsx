import ProjectCard from "./ProjectCard";
import { GitHubRepository } from "../../../types/github";

interface ProjectGridProps {
  projects: GitHubRepository[];
}

export default function ProjectGrid({ projects }: ProjectGridProps) {
  if (projects.length === 0) {
    return (
      <div className="projects-empty">
        <p>No projects found.</p>
      </div>
    );
  }

  return (
    <div className="project-grid">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}