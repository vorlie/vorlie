import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface CommitInfo {
  sha: string;
  message: string;
  authorName: string;
  authorUrl: string;
  commitUrl: string;
}

const TypewriterText = ({ texts }: { texts: string[] }) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const handleTyping = () => {
      const fullText = texts[currentIndex];

      if (isDeleting) {
        setDisplayText(fullText.substring(0, displayText.length - 1));
        setTypingSpeed(50);
      } else {
        setDisplayText(fullText.substring(0, displayText.length + 1));
        setTypingSpeed(150);
      }

      if (!isDeleting && displayText === fullText) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && displayText === "") {
        setIsDeleting(false);
        setCurrentIndex((prev) => (prev + 1) % texts.length);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentIndex, texts, typingSpeed]);

  return (
    <span className="inline-block min-w-[200px]">
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  );
};

export default function HeroSection() {
  const GITHUB_REPO = "vorlie/vorlie";

  const [commitInfo, setCommitInfo] = useState<CommitInfo | null>(null);
  const [commitError, setCommitError] = useState<string | null>(null);

  useEffect(() => {
    async function getCommitHash() {
      try {
        const response = await fetch(
          `https://api.github.com/repos/${GITHUB_REPO}/commits/v3`,
        );
        if (!response.ok) {
          throw new Error(
            `GitHub API Error: ${response.status} (${response.statusText})`,
          );
        }
        const data = await response.json();

        if (!data || !data.sha || !data.commit) {
          throw new Error("Invalid data received from GitHub API.");
        }

        setCommitInfo({
          sha: data.sha.substring(0, 7),
          message: data.commit.message.split("\n")[0],
          authorName: data.commit.author?.name || "Unknown Author",
          authorUrl: data.author?.html_url || "#",
          commitUrl: data.html_url || "#",
        });
        setCommitError(null);
      } catch (error: unknown) {
        console.error("Error fetching commit hash:", error);
        setCommitError(error instanceof Error ? error.message : "Failed to fetch commit info.");
        setCommitInfo(null);
      }
    }
    getCommitHash();
  }, [GITHUB_REPO]);

  return (
    <section id="hero" className="h-screen flex flex-col justify-center" aria-labelledby="hero-heading">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-8"
      >
        <div className="flex flex-col items-center text-center  mx-auto">
          <h1 id="hero-heading" className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-m3-on-surface leading-normal tracking-tight mb-4">
            Hi, I'm{" "}
            <div className="effect-neon origin-left">
              <span className="glow-layer" aria-hidden="true">
                Charlie
              </span>
              <span className="text-layer font-sakura font-normal">
                <span className="truncate" title="Charlie">
                  Charlie
                </span>
              </span>
            </div>
          </h1>

          <p className="text-xl sm:text-2xl font-semibold text-m3-on-surface-variant mb-6">
            <TypewriterText
              texts={[
                "I build web stuff.",
                "I play osu! and listen to music.",
                "I like anime and tinkering.",
              ]}
            />
          </p>

          <div className="flex gap-3 items-center mb-6">
            <a
              href="/dev"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-m3-primary text-m3-on-primary font-bold shadow-lg hover:shadow-xl transition-all"
            >
              View Projects
            </a>
            <a
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-m3-outline/10 text-m3-on-surface-variant font-semibold hover:bg-m3-on-surface/5 transition-all"
            >
              Read Blog
            </a>
          </div>

          <div className="max-w-3xl text-base sm:text-lg text-m3-on-surface-variant leading-relaxed font-medium">
            <p>
              I focus on thoughtful small projects - experiments, demos and
              useful tools. This site collects my tinkering: code, music,
              and game-related things I enjoy.
            </p>
            <div className="flex flex-wrap gap-2 mt-4 justify-center">
              {["games", "music", "anime"].map((tag) => (
                <span
                  key={tag}
                  className="text-m3-primary text-xs sm:text-sm font-black uppercase tracking-wider bg-m3-primary/10 px-3 py-1 rounded-lg border border-m3-primary/10"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-m3-outline/10 text-center text-m3-on-surface-variant text-sm font-medium">
          {commitInfo ? (
            <p>
              Last commit:{" "}
              <a
                href={commitInfo.commitUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-m3-primary transition-colors duration-200"
              >
                <code className="bg-m3-on-surface/5 px-2 py-0.5 rounded-md">
                  {commitInfo.sha}
                </code>
              </a>
              <span className="mx-2 opacity-50">&bull;</span>
              <span title={commitInfo.message} className="opacity-80">
                {commitInfo.message}
              </span>{" "}
              <span className="mx-2 opacity-50">&bull;</span> by
              <a
                href={commitInfo.authorUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-1 hover:text-m3-primary transition-colors duration-200"
              >
                {commitInfo.authorName}
              </a>
            </p>
          ) : commitError ? (
            <p className="text-red-400">
              Oops! Something went wrong: {commitError}
            </p>
          ) : (
            <p className="opacity-50">Loading commit info...</p>
          )}
          <p className="mt-4 opacity-50">
            © {new Date().getFullYear()} Charlie. All rights reserved.
          </p>
        </div>
      </motion.div>
    </section>
  );
}