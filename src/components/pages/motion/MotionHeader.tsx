import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { MotionProject } from "../../../types/motion";
import { statusLabels } from "./motionUtils";

interface MotionHeaderProps {
  project: MotionProject;
}

export default function MotionHeader({ project }: MotionHeaderProps) {
  const { artist, track, status, year } = project;

  return (
    <header className="motion-header">
      <Link to="/motion" className="motion-back">
        <ArrowLeft size={14} aria-hidden="true" />
        Motion design
      </Link>

      <span className="motion-eyebrow">
        {project.category}
        {year ? ` · ${year}` : ""}
      </span>

      <h1>{project.title}</h1>

      <p className="motion-header__meta">
        <span>
          Music by{" "}
          {artist.url ? (
            <a
              href={artist.url}
              target="_blank"
              rel="noopener noreferrer"
              className="motion-link"
            >
              {artist.name}
            </a>
          ) : (
            artist.name
          )}
          {track.title ? ` — ${track.title}` : ""}
        </span>

        {status && <span className="motion-status">{statusLabels[status]}</span>}
      </p>
    </header>
  );
}
