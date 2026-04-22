import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import LanyardPresence from "../components/LanyardPresence";
import Projects from "../components/Projects";
import Buttons88x31 from "../components/Buttons88x31";
import TicTacToe from "../components/TicTacToe";
import SEO from "../components/SEO";
import GameAccs from "../components/GameAccs";

import {
  FaGithub,
  FaDiscord,
  FaSteam,
  FaYoutube,
} from "react-icons/fa";

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

      <div className="max-w-full mx-auto relative z-10 px-4 py-8">
        <div className="flex flex-col gap-6">
          {/* Top Section: Hero & Status */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Hero Card */}
            <main className="lg:col-span-2">
              <motion.section 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="h-full flex flex-col justify-start m3-card p-6 sm:p-10 relative overflow-hidden group hover:border-m3-primary/20 transition-all duration-500"
              >
                <div className="relative z-10 w-full">
                  <h1 className="text-4xl sm:text-6xl font-black text-m3-on-surface leading-[1.1] mb-6 tracking-tighter">
                    Hello, I'm{" "}
                    <div className="effect-neon inline-block scale-90 sm:scale-100 origin-left">
                      <span className="glow-layer" aria-hidden="true">
                        Charlie
                      </span>
                      <span className="text-layer font-sakura">
                        <span className="truncate" title="Charlie">
                          Charlie
                        </span>
                      </span>
                    </div>
                    <span className="block text-2xl sm:text-3xl mt-3 text-m3-on-surface-variant font-bold opacity-90">
                      <TypewriterText
                        texts={[
                          "a friendly coder.",
                          "a web developer.",
                          "an osu! player.",
                          "a tech enthusiast.",
                        ]}
                      />
                    </span>
                  </h1>
                  
                  <div className="flex flex-wrap items-center gap-4 mb-8">
                    <p className="text-m3-primary text-xs font-black uppercase tracking-widest bg-m3-primary/10 px-4 py-2 rounded-full border border-m3-primary/20">
                      Haiii visitors1!!1!!!1
                    </p>
                    
                    {/* Social Icons */}
                    <div className="flex gap-2 p-1 bg-m3-on-surface/5 rounded-full border border-m3-outline/10">
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
                        {
                          Icon: FaYoutube,
                          href: "https://www.youtube.com/@vve1_",
                          label: "YouTube",
                        },
                      ].map(({ Icon, href, label }, index) => (
                        <a
                          key={index}
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          title={label}
                          className="p-2.5 rounded-full text-m3-on-surface-variant transition-all duration-300 hover:bg-m3-primary hover:text-m3-on-primary hover:scale-110 shadow-sm"
                        >
                          <Icon size={20} />
                        </a>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4 text-lg text-m3-on-surface-variant leading-relaxed max-w-xl font-medium">
                    <p>
                      I focus on writing code and building projects across
                      various technologies. I love anime, games, and music.
                    </p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {["games", "music", "anime"].map(tag => (
                        <span key={tag} className="text-m3-primary text-sm font-black uppercase tracking-wider bg-m3-primary/10 px-3 py-1 rounded-lg border border-m3-primary/10">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="p-4 bg-m3-on-surface/5 rounded-2xl border border-m3-outline/10">
                      <Buttons88x31 />
                    </div>
                    <div className="p-4 bg-m3-on-surface/5 rounded-2xl border border-m3-outline/10 text-center">
                      <GameAccs />
                    </div>
                  </div>
                </div>

                {/* Integrated Mascot */}
                <div className="hidden sm:block absolute -bottom-6 -right-6 w-56 h-56 pointer-events-none opacity-80 z-0 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-700">
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
            </main>

            {/* Sidebar: Status & TicTacToe */}
            <aside className="space-y-6">
              <motion.section 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="m3-card p-6 border-m3-primary/5 hover:border-m3-primary/20 transition-all duration-500"
              >
                <LanyardPresence discordId={MY_DISCORD_ID} />
              </motion.section>
              
              <motion.section 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="m3-card p-6"
              >
                <h2 className="text-xs font-black uppercase tracking-[0.2em] mb-4 text-m3-on-surface-variant/60">
                  Webring
                </h2>
                <div className="flex justify-center bg-m3-on-surface/5 rounded-2xl p-4 border border-m3-outline/5 hover:bg-m3-on-surface/10 transition-colors">
                  <iframe
                    src="https://ring.pre1ude.dev/ring?url=https://vorlie.pl&fgcolor=E4E1E6&bgcolor=434559"
                    width="230"
                    height="100"
                    frameBorder="0"
                    scrolling="no"
                    className="rounded-lg contrast-[1.1] grayscale-[0.2] hover:grayscale-0 transition-all duration-500"
                  ></iframe>
                </div>
              </motion.section>

              <motion.section 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="m3-card p-6"
              >
                <h2 className="text-xs font-black uppercase tracking-[0.2em] mb-4 text-m3-on-surface-variant/60">
                  Match Game
                </h2>
                <div className="bg-m3-on-surface/5 rounded-2xl p-4 border border-m3-outline/5">
                  <TicTacToe />
                </div>
              </motion.section>
            </aside>
          </div>
        </div>{" "}
        <motion.section
          id="projects"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-m3-surface-container/60 backdrop-blur-2xl border border-m3-outline/10 rounded-[48px] shadow-xl p-8 sm:p-12 mt-12 mb-20 relative overflow-hidden"
        >
          <div className="flex flex-col items-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-black text-m3-on-surface tracking-tighter mb-4">
              Featured Projects
            </h2>
            <div className="h-2 w-24 bg-gradient-to-r from-m3-primary to-m3-secondary rounded-full shadow-sm shadow-m3-primary/20" />
            <p className="mt-6 text-m3-on-surface-variant max-w-xl text-center font-bold opacity-80 text-lg leading-relaxed">
              A curated collection of my experiments, from real-time shaders to modular desktop applications.
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
