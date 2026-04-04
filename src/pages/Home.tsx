import { useState, useEffect } from "react";
import LanyardPresence from "../components/LanyardPresence";
import Projects from "../components/Projects";
import Buttons88x31 from "../components/Buttons88x31";
import TicTacToe from "../components/TicTacToe";
import SEO from "../components/SEO";
import GameAccs from "../components/GameAccs";

import {
  FaReact,
  FaPython,
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaJava,
  FaGithub,
  FaDiscord,
  FaSteam,
  FaYoutube,
} from "react-icons/fa";
import {
  SiTypescript,
  SiAstro,
  SiTailwindcss,
  SiCplusplus,
} from "react-icons/si";

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
    <div className="min-h-screen text-m3-on-surface">
      <SEO
        title="Home"
        description="My website with coding projects, tech stack, and interests in games, music, and anime."
        url="https://vorlie.pl/"
      />
      <div className="max-w-full mx-auto relative z-10 px-4 py-8">
        {" "}
        <div className="flex flex-col gap-6">
          {/* Top Section: Hero & Status */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Hero Card */}
            <main className="lg:col-span-2">
              <section className="h-full flex flex-col justify-start bg-m3-surface-container border border-m3-outline/10 rounded-[32px] shadow-sm p-8 relative overflow-hidden group">
                <div className="relative z-10 w-full">
                  <h1 className="text-4xl sm:text-5xl font-bold text-m3-on-surface leading-tight mb-4 tracking-tight">
                    Hello, I'm{" "}
                    <div className="effect-neon inline-block">
                      <span className="glow-layer" aria-hidden="true">
                        Charlie
                      </span>
                      <span className="text-layer font-sakura">
                        <span className="truncate" title="Charlie">
                          Charlie
                        </span>
                      </span>
                    </div>
                    <span className="block text-2xl sm:text-3xl mt-2 text-m3-on-surface-variant font-medium">
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
                  <p className="text-m3-primary text-sm mb-6 font-mono bg-m3-primary/10 inline-block px-4 py-1.5 rounded-full font-semibold">
                    Haiii visitors1!!1!!!1
                  </p>

                  {/* Social Icons */}
                  <div className="flex gap-3 mb-6">
                    {[
                      {
                        Icon: FaGithub,
                        href: "https://github.com/vorlie",
                        color: "hover:bg-m3-on-surface/10",
                      },
                      {
                        Icon: FaDiscord,
                        href: "https://discord.gg/yUueAFyAmN",
                        color: "hover:bg-m3-on-surface/10",
                      },
                      {
                        Icon: FaSteam,
                        href: "https://steamcommunity.com/id/s9suk3_41z3n/",
                        color: "hover:bg-m3-on-surface/10",
                      },
                      {
                        Icon: FaYoutube,
                        href: "https://www.youtube.com/@vve1_",
                        color: "hover:bg-m3-on-surface/10",
                      },
                    ].map(({ Icon, href, color }, index) => (
                      <a
                        key={index}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-3 rounded-full text-m3-on-surface-variant transition-all duration-300 transform hover:scale-110 ${color}`}
                      >
                        <Icon size={24} />
                      </a>
                    ))}
                  </div>

                  <div className="space-y-4 text-lg text-gray-300 leading-relaxed max-w-xl">
                    <p>
                      I focus on writing code and building projects across
                      various technologies. I love anime, games, and music.
                    </p>
                    <p>
                      I have an interest in{" "}
                      <span className="text-m3-primary font-bold bg-m3-primary/10 px-2 py-0.5 rounded-full border border-m3-primary/10">
                        games
                      </span>
                      ,
                      <span className="text-m3-primary font-bold bg-m3-primary/10 px-2 py-0.5 rounded-full border border-m3-primary/10">
                        {" "}
                        music
                      </span>
                      , and{" "}
                      <span className="text-m3-primary font-bold bg-m3-primary/10 px-2 py-0.5 rounded-full border border-m3-primary/10">
                        anime
                      </span>
                      .
                    </p>
                  </div>
                  <div className="mt-8">
                    <Buttons88x31 />
                  </div>
                  <div className="mt-8">
                    <GameAccs />
                  </div>
                </div>

                {/* Floating Mascot */}
                <div className="md:block absolute -bottom-4 -right-4 w-64 h-64 pointer-events-none opacity-90 z-0">
                  <img
                    src="/images/evernight_chibi.gif"
                    alt="Chibi Mascot"
                    className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(230,204,213,1)]"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </div>
              </section>
            </main>

            {/* Sidebar: Status & TicTacToe */}
            <aside className="space-y-6">
              <section className="bg-m3-surface-container border border-m3-outline/10 rounded-[32px] shadow-sm p-6">
                <div className="">
                  <LanyardPresence discordId={MY_DISCORD_ID} />
                </div>
              </section>
              <section className="bg-m3-surface-container border border-m3-outline/10 rounded-[32px] shadow-sm p-6">
                <h2 className="text-xl font-bold mb-4 text-m3-on-surface tracking-tight">
                  Webring
                </h2>
                <div className="flex justify-center">
                  <iframe
                    src="https://ring.pre1ude.dev/ring?url=https://vorlie.pl&fgcolor=E4E1E6&bgcolor=434559"
                    width="230"
                    height="100"
                    frameBorder="0"
                    scrolling="no"
                    className="rounded-lg"
                  ></iframe>
                </div>
              </section>

              <section className="bg-m3-surface-container border border-m3-outline/10 rounded-[32px] shadow-sm p-6">
                <h2 className="text-xl font-bold mb-4 text-m3-on-surface tracking-tight">
                  Tic Tac Toe
                </h2>
                <TicTacToe />
              </section>
            </aside>
          </div>

          {/* Technologies Section */}
          <section className="bg-m3-surface-container border border-m3-outline/10 rounded-[32px] shadow-sm p-8">
            <h2 className="text-2xl font-bold mb-6 text-m3-on-surface tracking-tight border-b border-m3-outline/10 pb-4">
              Technologies I Use
            </h2>
            <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {[
                {
                  Icon: SiTypescript,
                  color: "text-blue-400",
                  label: "TypeScript",
                },
                { Icon: FaPython, color: "text-yellow-400", label: "Python" },
                { Icon: FaHtml5, color: "text-orange-500", label: "HTML" },
                { Icon: FaCss3Alt, color: "text-blue-500", label: "CSS" },
                { Icon: FaJs, color: "text-yellow-300", label: "JavaScript" },
                { Icon: SiAstro, color: "text-orange-400", label: "Astro" },
                { Icon: FaReact, color: "text-cyan-400", label: "React" },
                {
                  Icon: SiTailwindcss,
                  color: "text-teal-400",
                  label: "Tailwind",
                },
                { Icon: FaJava, color: "text-orange-400", label: "Java" },
                { Icon: SiCplusplus, color: "text-purple-400", label: "C++" },
              ].map(({ Icon, color, label }) => (
                <li
                  key={label}
                  className="flex items-center gap-3 p-4 rounded-[20px] hover:bg-m3-on-surface/5 transition-all duration-300 group cursor-default border border-transparent hover:border-m3-outline/10"
                >
                  <Icon
                    className={`${color} w-6 h-6 group-hover:scale-110 transition-transform duration-300`}
                  />
                  <span className="text-m3-on-surface-variant group-hover:text-m3-on-surface font-semibold">
                    {label}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </div>{" "}
        <section
          id="projects"
          className="bg-m3-surface-container border border-m3-outline/10 rounded-[32px] shadow-sm p-8 mt-8"
        >
          <h2 className="text-3xl font-bold mb-6 text-m3-on-surface text-center tracking-tight">
            Projects
          </h2>
          <Projects />
        </section>
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
      </div>{" "}
    </div>
  );
}

export default Home;
