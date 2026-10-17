import { MotionProject } from "../../../types/motion";

interface ProjectDetailsProps {
  project: MotionProject;
}

function Tags({ items }: { items: string[] }) {
  return (
    <ul className="motion-tags">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export default function ProjectDetails({ project }: ProjectDetailsProps) {
  const { software, plugins, techniques, specs } = project;

  const rows: Array<{ label: string; value: React.ReactNode }> = [];

  if (software.length > 0) {
    rows.push({ label: "Software", value: <Tags items={software} /> });
  }

  if (plugins?.length) {
    rows.push({ label: "Plugins & effects", value: <Tags items={plugins} /> });
  }

  if (techniques?.length) {
    rows.push({ label: "Techniques", value: <Tags items={techniques} /> });
  }

  if (specs?.resolution) {
    rows.push({ label: "Resolution", value: specs.resolution });
  }

  if (specs?.frameRate) {
    rows.push({ label: "Frame rate", value: specs.frameRate });
  }

  if (specs?.duration) {
    rows.push({ label: "Duration", value: specs.duration });
  }

  if (rows.length === 0) {
    return null;
  }

  return (
    <section className="motion-section">
      <h2 className="motion-section__title">Details</h2>

      <dl className="motion-dl">
        {rows.map((row) => (
          <div key={row.label} className="motion-dl__row">
            <dt>{row.label}</dt>
            <dd>{row.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
