import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import LanyardPresence from "../components/LanyardPresence";
import Projects from "../components/Projects";
import Buttons88x31 from "../components/Buttons88x31";
import SEO from "../components/SEO";
import GameAccs from "../components/GameAccs";

import { FaGithub, FaDiscord, FaSteam } from "react-icons/fa";

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

function Home() {
  const MY_DISCORD_ID = "614807913302851594";
  const GITHUB_REPO = "vorlie/vorlie";

  const [commitInfo, setCommitInfo] = useState<CommitInfo | null>(null);
  const [commitError, setCommitError] = useState<string | null>(null);

  useEffect(() => {
    async function getCommitHash() {
      try {
        const response = await fetch(
          `https://api.github.com/repos/${GITHUB_REPO}/commits/v2`,
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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.error("Error fetching commit hash:", error);
        setCommitError(error.message || "Failed to fetch commit info.");
        setCommitInfo(null);
      }
    }
    getCommitHash();
  }, [GITHUB_REPO]);

  return (
    <div className="min-h-screen text-m3-on-surface relative overflow-hidden animate-reveal">
      <SEO
        title="Home"
        description="My website with coding projects, tech stack, and interests in games, music, and anime."
        url="https://vorlie.pl/"
      />

      <div className="mx-auto relative z-10 px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-6 xl:grid-cols-[2fr_1fr]">
          <motion.section
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="m3-card p-6 sm:p-8 rounded-none border border-m3-outline/10 overflow-hidden group hover:border-m3-primary/20 transition-all duration-500"
          >
            <div className="relative z-10 w-full">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="min-w-0">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-m3-on-surface leading-normal tracking-tight mb-3">
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

                  <p className="text-lg sm:text-xl font-semibold text-m3-on-surface-variant mb-3">
                    <TypewriterText
                      texts={[
                        "I build web stuff.",
                        "I play osu! and listen to music.",
                        "I like anime and tinkering.",
                      ]}
                    />
                  </p>

                  <div className="flex gap-3 items-center mb-4">
                    <a
                      href="#projects"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-none bg-m3-primary text-m3-on-primary font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,0.12)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.1)] transition-colors"
                    >
                      View Projects
                    </a>
                    <a
                      href="/blog"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-none border border-m3-outline/10 text-m3-on-surface-variant font-semibold hover:bg-m3-on-surface/5 transition-colors"
                    >
                      Read Blog
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex gap-2 p-1 bg-m3-on-surface/5 rounded-none border border-m3-outline/10">
                    {[
                      {
                        Icon: FaGithub,
                        href: "https://github.com/vorlie",
                        label: "GitHub",
                      },
                      {
                        Icon: FaDiscord,
                        href: "https://discord.gg/yUueAFyAmN",
                        label: "Discord",
                      },
                      {
                        Icon: FaSteam,
                        href: "https://steamcommunity.com/id/s9suk3_41z3n/",
                        label: "Steam",
                      },
                    ].map(({ Icon, href, label }, i) => (
                      <a
                        key={i}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={label}
                        className="p-2 rounded-none text-m3-on-surface-variant transition-all duration-300 hover:bg-m3-primary hover:text-m3-on-primary"
                      >
                        <Icon size={18} />
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-4 text-base sm:text-lg text-m3-on-surface-variant leading-relaxed max-w-3xl font-medium">
                <p>
                  I focus on thoughtful small projects - experiments, demos and
                  useful tools. This site collects my tinkering: code, music,
                  and game-related things I enjoy.
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {["games", "music", "anime"].map((tag) => (
                    <span
                      key={tag}
                      className="text-m3-primary text-xs sm:text-sm font-black uppercase tracking-wider bg-m3-primary/10 px-3 py-1 rounded-none border border-m3-primary/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <GameAccs />
              </div>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="m3-card p-6 sm:p-8 rounded-none border border-m3-outline/10 overflow-hidden"
          >
            <LanyardPresence discordId={MY_DISCORD_ID} />
            <div className="hidden sm:block absolute -bottom-2 -right-2 w-48 h-48 pointer-events-none opacity-80 -z-0 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-700">
              <img
                src="/images/evernight_chibi.gif"
                alt="Chibi Mascot"
                className="w-full h-full object-contain drop-shadow-[0_0_20px_rgba(230,204,213,0.4)]"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>
          </motion.section>
        </div>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="grid gap-6 grid-cols-1 xl:grid-cols-[1.15fr_0.85fr] mt-6"
        >
          <div className="m3-card p-6 sm:p-8 rounded-none border border-m3-outline/10 min-w-0">
            <h2 className="text-xs font-black uppercase tracking-[0.2em] mb-4 text-m3-on-surface-variant/70">
              Webring
            </h2>
            <div className="mx-auto w-full max-w-md overflow-hidden rounded-none border border-m3-outline/10 bg-m3-surface-container">
              <div className="aspect-[12/5] w-full">
                <iframe
                  title="Webring widget"
                  src="https://ring.pre1ude.dev/ring?url=https://vorlie.pl&fgcolor=E4E1E6&bgcolor=434559"
                  className="w-full h-full rounded-none contrast-[1.1] grayscale-[0.2] hover:grayscale-0 transition-all duration-500"
                />
              </div>
            </div>
          </div>

          <div className="m3-card p-6 sm:p-8 rounded-none border border-m3-outline/10">
            <Buttons88x31 />
          </div>
        </motion.section>

        <motion.section
          id="projects"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-m3-surface-container/60 backdrop-blur-2xl border border-m3-outline/10 rounded-none shadow-[6px_6px_0px_0px_rgba(0,0,0,0.35)] p-6 sm:p-10 mt-8 mb-20 relative overflow-hidden"
        >
          <div className="flex flex-col items-center mb-10">
            <h2 className="text-4xl sm:text-5xl font-black text-m3-on-surface tracking-tighter mb-4">
              Featured Projects
            </h2>
            <div className="h-2 w-24 bg-gradient-to-r from-m3-primary to-m3-secondary rounded-sm shadow-sm shadow-m3-primary/20" />
            <p className="mt-6 text-m3-on-surface-variant max-w-xl text-center font-bold opacity-80 text-lg leading-relaxed">
              A curated collection of my experiments, from real-time shaders to
              modular desktop applications.
            </p>
          </div>
          <Projects />
        </motion.section>

        <footer className="mt-8 pb-32 border-m3-outline/10 text-center text-m3-on-surface-variant text-sm font-medium">
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
        </footer>
      </div>
    </div>
  );
}

export default Home;
