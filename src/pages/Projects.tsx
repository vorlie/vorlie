import { useMemo, useState } from "react";

import ProjectGrid from "../components/pages/projects/ProjectGrid";
import { useGitHubRepos } from "../hooks/useGitHubRepos";

export default function Projects() {
  const { repositories, loading, error } = useGitHubRepos();

  const [language, setLanguage] = useState("all");

  const languages = useMemo(() => {
    const values = repositories
      .map((repo) => repo.language)
      .filter((value): value is string => Boolean(value));

    return [...new Set(values)].sort();
  }, [repositories]);

  const filteredProjects = useMemo(() => {
    if (language === "all") {
      return repositories;
    }

    return repositories.filter((repo) => repo.language === language);
  }, [repositories, language]);

  return (
    <div className="page projects-page">
      <header className="page-header">
        <div>
          <span className="page-header__eyebrow">
            GitHub
          </span>

          <h1>Projects</h1>

          <p>
            Things I've built, experimented with, and occasionally
            wondered why I started.
          </p>
        </div>

        <a
          href="https://github.com/vorlie"
          target="_blank"
          rel="noopener noreferrer"
          className="button button--secondary"
        >
          View GitHub
        </a>
      </header>

      {!loading && !error && languages.length > 0 && (
        <div className="project-filters">
          <button
            type="button"
            className={language === "all" ? "active" : ""}
            onClick={() => setLanguage("all")}
          >
            All
          </button>

          {languages.map((item) => (
            <button
              type="button"
              key={item}
              className={language === item ? "active" : ""}
              onClick={() => setLanguage(item)}
            >
              {item}
            </button>
          ))}
        </div>
      )}

      {loading && (
        <div className="projects-status">
          <span className="projects-status__dot" />
          Loading projects from GitHub...
        </div>
      )}

      {error && (
        <div className="projects-status projects-status--error">
          <strong>Couldn't load projects.</strong>
          <span>{error}</span>
        </div>
      )}

      {!loading && !error && (
        <ProjectGrid projects={filteredProjects} />
      )}
    </div>
  );
}