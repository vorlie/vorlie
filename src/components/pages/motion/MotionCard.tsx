import { Link } from "react-router-dom";
import { ArrowUpRight, Play } from "lucide-react";

import { MotionProject } from "../../../types/motion";
import { aspectStyle } from "./motionUtils";

interface MotionCardProps {
  project: MotionProject;
  featured?: boolean;
}

export default function MotionCard({ project, featured = false }: MotionCardProps) {
  const Heading = featured ? "h2" : "h3";

  return (
    <Link
      to={`/motion/${project.slug}`}
      className={`motion-card${featured ? " motion-card--featured" : ""}`}
      // Grid thumbnails stay 16:9; only the featured card follows the project's ratio.
      style={featured ? aspectStyle(project) : undefined}
    >
      <div className="motion-card__media">
        {project.poster ? (
          <img
            src={project.poster}
            alt=""
            loading={featured ? "eager" : "lazy"}
            decoding="async"
          />
        ) : (
          <span className="motion-card__placeholder" aria-hidden="true">
            <Play size={featured ? 26 : 20} fill="currentColor" />
          </span>
        )}
      </div>

      <div className="motion-card__body">
        <div className="motion-card__text">
          <span className="motion-eyebrow">
            {project.category}
            {project.year ? ` · ${project.year}` : ""}
          </span>

          <Heading>{project.title}</Heading>

          <p>Music by {project.artist.name}</p>
        </div>

        <span className="motion-card__cta">
          View project
          <ArrowUpRight size={15} aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
