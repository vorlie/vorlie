import MotionCard from "../components/pages/motion/MotionCard";
import { motionProjects, sortMotionProjects } from "../data/motion";

export default function Motion() {
  const sorted = sortMotionProjects(motionProjects);
  const featured = sorted.find((project) => project.featured) ?? sorted[0];
  const others = sorted.filter((project) => project !== featured);

  return (
    <div className="page motion-page">
      <header className="motion-intro">
        <span className="motion-eyebrow">Portfolio</span>

        <h1>Motion design</h1>

        <p>Music visualizers and other motion work.</p>
      </header>

      {featured && (
        <section aria-label="Featured project">
          <MotionCard project={featured} featured />
        </section>
      )}

      <section className="motion-section" aria-labelledby="motion-more-title">
        <h2 id="motion-more-title" className="motion-section__title">
          More visualizers
        </h2>

        {others.length > 0 ? (
          <div className="motion-grid">
            {others.map((project) => (
              <MotionCard key={project.slug} project={project} />
            ))}
          </div>
        ) : (
          <p className="motion-note">More visualizers will be added here.</p>
        )}
      </section>
    </div>
  );
}
