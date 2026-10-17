import { ExternalLink } from "lucide-react";

import { visualizerCreator } from "../../../data/motion";
import { MotionLink, MotionProject } from "../../../types/motion";

interface CreditsProps {
  project: MotionProject;
}

function ExternalAnchor({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="motion-link"
    >
      {children}
      <ExternalLink size={12} aria-hidden="true" />
      <span className="motion-sr-only"> (opens in a new tab)</span>
    </a>
  );
}

function Person({ person }: { person: MotionLink }) {
  return person.url ? (
    <ExternalAnchor href={person.url}>{person.name}</ExternalAnchor>
  ) : (
    <>{person.name}</>
  );
}

export default function Credits({ project }: CreditsProps) {
  const { artist, track, otherCredits } = project;

  return (
    <section className="motion-section">
      <h2 className="motion-section__title">Credits</h2>

      <div className="motion-credits">
        <div className="motion-credits__group">
          <h3>Music</h3>

          <dl className="motion-dl">
            <div className="motion-dl__row">
              <dt>Artist</dt>
              <dd>
                <Person person={artist} />
              </dd>
            </div>

            <div className="motion-dl__row">
              <dt>Original track</dt>
              <dd>
                <ExternalAnchor href={track.url}>
                  {track.title ?? "Listen to the original"}
                </ExternalAnchor>
              </dd>
            </div>
          </dl>
        </div>

        <div className="motion-credits__group">
          <h3>Visualizer</h3>

          <dl className="motion-dl">
            <div className="motion-dl__row">
              <dt>Created by</dt>
              <dd>
                <Person person={visualizerCreator} />
              </dd>
            </div>
          </dl>
        </div>

        {otherCredits && otherCredits.length > 0 && (
          <div className="motion-credits__group">
            <h3>Assets</h3>

            <dl className="motion-dl">
              {otherCredits.map((credit) => (
                <div key={credit.name} className="motion-dl__row">
                  <dt>{credit.role ?? "Credit"}</dt>
                  <dd>
                    <Person person={credit} />
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        )}
      </div>
    </section>
  );
}
