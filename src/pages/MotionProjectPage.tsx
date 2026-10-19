import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import BehindTheScenes from "../components/pages/motion/BehindTheScenes";
import Credits from "../components/pages/motion/Credits";
import MotionHeader from "../components/pages/motion/MotionHeader";
import ProjectDetails from "../components/pages/motion/ProjectDetails";
import RelatedProjects from "../components/pages/motion/RelatedProjects";
import VideoPlayer from "../components/pages/motion/VideoPlayer";
import {
  getMotionProject,
  motionProjects,
  sortMotionProjects,
} from "../data/motion";

export default function MotionProjectPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = getMotionProject(slug);

  // MainFrame scrolls its own container, so reset it when the project changes.
  useEffect(() => {
    document.querySelector(".main-frame__content")?.scrollTo({ top: 0 });
  }, [slug]);

  if (!project) {
    return (
      <div className="page motion-page">
        <div className="motion-state">
          <h1>Project not found</h1>

          <p>That visualizer doesn't exist or was moved.</p>

          <Link to="/motion" className="button button--primary">
            Back to motion design
          </Link>
        </div>
      </div>
    );
  }

  const related = sortMotionProjects(
    motionProjects.filter((item) => item.slug !== project.slug),
  ).slice(0, 3);

  return (
    <article className="page motion-project">
      <MotionHeader project={project} />

      <VideoPlayer key={project.slug} project={project} />

      <div className="motion-body">
        {(project.descriptionSections?.length ?? 0) > 0 ||
        (project.description?.length ?? 0) > 0 ? (
          <section className="motion-section">
            <h2 className="motion-section__title">About</h2>

            <div className="motion-prose">
              {project.descriptionSections?.length ? (
                project.descriptionSections.map((section, index) => (
                  <div
                    className="motion-prose__section"
                    key={`${section.title ?? "section"}-${index}`}
                  >
                    {section.title && <h3>{section.title}</h3>}

                    {section.paragraphs?.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}

                    {section.list && section.list.length > 0 && (
                      <ul>
                        {section.list.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))
              ) : (
                project.description?.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))
              )}
            </div>
          </section>
        ) : null}

        <ProjectDetails project={project} />
      </div>

      <BehindTheScenes images={project.behindTheScenes} />

      <Credits project={project} />

      <RelatedProjects projects={related} />
    </article>
  );
}
