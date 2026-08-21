import "../styles/pages/about.css";

const interests = [
  "Desktop applications",
  "Web development",
  "Game tooling",
  "Media & music",
  "Anime",
  "UI & theming",
];

const languages = ["TypeScript", "JavaScript", "Rust", "Python", "SQL"];

const frontend = ["React", "Vite", "HTML", "CSS"];

const desktop = ["Electron", "Tauri"];

const tooling = ["Node.js", "SQLite", "GraphQL", "Git", "Linux"];

const currentProjects = [
  {
    name: "Kioku",
    description:
      "An AniList manager focused on making anime and manga management feel like a proper desktop application.",
    href: "/projects",
  },
  {
    name: "AniPlay",
    description:
      "A media player and download ecosystem for managing and watching anime locally.",
    href: "/projects",
  },
];

export default function About() {
  return (
    <div className="about">
      <header className="about__header">
        <span className="about__eyebrow">ABOUT ME</span>

        <h1 className="about__title">
          Hey, I'm <span>Charlie.</span>
        </h1>

        <p className="about__intro">
          I'm a self-taught developer from Poland who likes taking things apart,
          figuring out how they work, and then inevitably trying to build my own
          version of them.
        </p>
      </header>

      <section className="about__section">
        <div className="about__section-header">
          <span className="about__section-number">01</span>

          <div>
            <h2>What I do</h2>
            <p>I like building small, weird, and useful software.</p>
          </div>
        </div>

        <p className="about__text">
          I mostly work with TypeScript, React, Rust, Python, and Node.js, but
          I'm more interested in making things than sticking to a particular
          language or framework.
        </p>

        <p className="about__text">
          A lot of my projects start with a simple{" "}
          <em>"I wonder if I could make this myself."</em> and then somehow turn
          into several weeks of tinkering.
        </p>
      </section>

      <section className="about__section">
        <div className="about__section-header">
          <span className="about__section-number">02</span>

          <div>
            <h2>Things I like</h2>
            <p>A few of the things that tend to keep me busy.</p>
          </div>
        </div>

        <div className="about__interest-grid">
          {interests.map((interest) => (
            <div className="about__interest" key={interest}>
              <span>{interest}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="about__section">
        <div className="about__section-header">
          <span className="about__section-number">03</span>

          <div>
            <h2>Toolkit</h2>
            <p>The stuff I reach for most often.</p>
          </div>
        </div>

        <div className="about__toolkit">
          <ToolkitGroup title="Languages" items={languages} />
          <ToolkitGroup title="Frontend" items={frontend} />
          <ToolkitGroup title="Desktop" items={desktop} />
          <ToolkitGroup title="Tooling & infrastructure" items={tooling} />
        </div>
      </section>

      <section className="about__section">
        <div className="about__section-header">
          <span className="about__section-number">04</span>

          <div>
            <h2>Current projects</h2>
            <p>What I'm spending my time building.</p>
          </div>
        </div>

        <div className="about__projects">
          {currentProjects.map((project) => (
            <a
              className="about__project"
              href={project.href}
              key={project.name}
            >
              <div>
                <h3>{project.name}</h3>
                <p>{project.description}</p>
              </div>

              <span className="about__project-arrow">↗</span>
            </a>
          ))}
        </div>
      </section>

      <section className="about__section about__section--last">
        <div className="about__section-header">
          <span className="about__section-number">05</span>

          <div>
            <h2>Outside of coding</h2>
            <p>Because computers aren't the only thing I care about.</p>
          </div>
        </div>

        <p className="about__text">
          I'm into games, music, anime, and generally messing around with
          technology. I play games like osu! and spend a frankly unreasonable
          amount of time tinkering with software, mods, media servers, and
          desktop setups.
        </p>

        <p className="about__text">
          I also enjoy customizing things -- themes, interfaces, desktop
          environments, and basically anything where there's an opportunity to
          make something feel a little more mine.
        </p>
      </section>
    </div>
  );
}

interface ToolkitGroupProps {
  title: string;
  items: string[];
}

function ToolkitGroup({ title, items }: ToolkitGroupProps) {
  return (
    <div className="about__toolkit-group">
      <h3>{title}</h3>

      <div className="about__toolkit-items">
        {items.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
    </div>
  );
}
