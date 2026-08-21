import { ArrowUpRight } from "lucide-react";

interface Project {
  name: string;
  description: string;
  tags: string[];
  href: string;
  accent?: string;
}

const projects: Project[] = [
  {
    name: "Kioku",
    description:
      "A desktop AniList manager for keeping track of anime and manga.",
    tags: ["React", "Tauri", "Rust", "AniList"],
    href: "https://github.com/vorlie/kioku",
    accent: "#d27b7b",
  },
  {
    name: "AniPlay",
    description:
      "A local media player and library built around anime.",
    tags: ["Electron", "React", "Node", "ffmpeg"],
    href: "https://github.com/vorlie/aniplayv2",
    accent: "#5da9e9",
  },
  {
    name: "ani-cli-rs",
    description:
      "A cross-platform Rust port of ani-cli with two independent Anikoto catalogs and native MegaPlay/KotoCDN playback..",
    tags: ["Rust", "cli", "cross-platform"],
    href: "https://github.com/vorlie/ani-cli-rs",
    accent: "#d99a5b",
  },
];

export default function FeaturedProjects() {
  return (
    <section className="featured-projects">
      <header className="featured-projects__header">
        <div>
          <span className="section-eyebrow">WORK & EXPERIMENTS</span>

          <h2>Featured projects</h2>

          <p>
            A few things I've built, maintained, or spent
            an unreasonable amount of time tinkering with.
          </p>
        </div>

        <a
          href="/projects"
          className="featured-projects__link"
        >
          View all
          <ArrowUpRight size={15} />
        </a>
      </header>

      <div className="featured-projects__grid">
        {projects.map((project) => (
          <a
            key={project.name}
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="home-project-card"
            style={{
              "--project-accent": project.accent,
            } as React.CSSProperties}
          >
            <div className="home-project-card__top">
              <span className="home-project-card__indicator" />

              <ArrowUpRight
                size={18}
                className="home-project-card__arrow"
              />
            </div>

            <div className="home-project-card__content">
              <h3>{project.name}</h3>

              <p>{project.description}</p>
            </div>

            <div className="home-project-card__tags">
              {project.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}