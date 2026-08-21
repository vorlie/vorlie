import { FaGithub, FaStar, FaCodeBranch, FaExternalLinkAlt } from "react-icons/fa";
import { GitHubRepository } from "../../../types/github";

interface ProjectCardProps {
  project: GitHubRepository;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="project-card">
      <div className="project-card__top">
        <div className="project-card__icon">
          <FaGithub />
        </div>

        <div className="project-card__links">
          <a
            href={project.html_url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${project.name} on GitHub`}
          >
            <FaGithub />
          </a>

          {project.homepage && (
            <a
              href={project.homepage}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${project.name} website`}
            >
              <FaExternalLinkAlt />
            </a>
          )}
        </div>
      </div>

      <div className="project-card__body">
        <h2>{project.name}</h2>

        <p>
          {project.description || "No description provided."}
        </p>

        {project.topics.length > 0 && (
          <div className="project-card__topics">
            {project.topics.slice(0, 4).map((topic) => (
              <span key={topic}>{topic}</span>
            ))}
          </div>
        )}
      </div>

      <footer className="project-card__footer">
        <div className="project-card__language">
          {project.language && (
            <>
              <span className="project-card__language-dot" />
              {project.language}
            </>
          )}
        </div>

        <div className="project-card__stats">
          {project.stargazers_count > 0 && (
            <span>
              <FaStar />
              {project.stargazers_count}
            </span>
          )}

          {project.forks_count > 0 && (
            <span>
              <FaCodeBranch />
              {project.forks_count}
            </span>
          )}
        </div>
      </footer>
    </article>
  );
}