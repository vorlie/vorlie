import { useEffect, useState } from "react";
import LanyardPresence from "../presence/LanyardPresence";
import { useLanyard } from "../../../context/LanyardContext";

const rotatingText = [
  "I build web stuff.",
  "I play osu! and listen to music.",
  "I like anime and tinkering.",
];


export default function Welcome() {
  const [textIndex, setTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [deleting, setDeleting] = useState(false);
  const { presence, connected } = useLanyard();

  useEffect(() => {
    const currentText = rotatingText[textIndex];

    const timer = window.setTimeout(
      () => {
        if (!deleting) {
          const next = currentText.slice(0, displayText.length + 1);

          setDisplayText(next);

          if (next === currentText) {
            window.setTimeout(() => setDeleting(true), 1800);
          }

          return;
        }

        const next = currentText.slice(0, displayText.length - 1);

        setDisplayText(next);

        if (next === "") {
          setDeleting(false);
          setTextIndex((index) => (index + 1) % rotatingText.length);
        }
      },
      deleting ? 45 : 100,
    );

    return () => window.clearTimeout(timer);
  }, [displayText, deleting, textIndex]);

  return (
    <section className="welcome">
      <div className="welcome__intro">
        <div className="welcome__eyebrow">Welcome</div>

        <h1 className="welcome__title">
          Hi, I'm <span>Vorlie.</span>
        </h1>

        <p className="welcome__rotating">
          {displayText}
          <span className="welcome__cursor">|</span>
        </p>

        <p className="welcome__description">
          I enjoy building small projects, experimenting with technology, and
          generally tinkering with things that interest me.
        </p>

        <div className="welcome__tags">
          <span>Self-taught developer</span>
          <span>Poland</span>
          <span>Building things</span>
        </div>

        <div className="welcome__actions">
          <a href="/projects" className="button button--primary">
            View projects
          </a>

          <a href="/about" className="button button--secondary">
            About me
          </a>
        </div>
      </div>

      <div className="welcome__presence">
        {presence ? (
          <LanyardPresence presence={presence} />
        ) : (
          <div className="welcome__presence-loading">
            <span className="welcome__loading-dot" />

            {connected
              ? "Waiting for Discord..."
              : "Connecting to Discord..."}
          </div>
        )}
      </div>
    </section>
  );
}
