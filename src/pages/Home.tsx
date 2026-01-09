  /* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import LanyardPresence from "../components/LanyardPresence";
import Projects from "../components/Projects";
import Buttons88x31 from "../components/Buttons88x31";
import TicTacToe from "../components/TicTacToe";

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
import { SiTypescript, SiAstro, SiTailwindcss, SiCplusplus } from "react-icons/si";

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

  return <span className="inline-block min-w-[200px]">{displayText}<span className="animate-pulse">|</span></span>;
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
          `https://api.github.com/repos/${GITHUB_REPO}/commits/v2`
        );
        if (!response.ok) {
          throw new Error(
            `GitHub API Error: ${response.status} (${response.statusText})`
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
    <div className="min-h-scree text-gray-100">
      <div className="max-w-6xl mx-auto relative z-10 ">
        {" "}
        <div className="flex flex-col gap-8">
          {/* Top Section: Hero & Status */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Hero Card */}
            <main className="lg:col-span-2">
              <section className="h-full flex flex-col justify-start bg-gray-900/60 backdrop-blur-md border border-gray-700/50 rounded-2xl shadow-xl p-8 relative overflow-hidden group">
                <div className="relative z-10 w-full">
                  <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-4">
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
                    <span className="block text-2xl sm:text-3xl mt-2 text-gray-300 font-normal">
                      <TypewriterText texts={["a friendly coder.", "a web developer.", "an osu! player.", "a tech enthusiast."]} />
                    </span>
                  </h1>
                  <p className="text-gray-400 text-sm mb-6 font-mono bg-gray-900/50 inline-block px-3 py-1 rounded-full">
                    Haiii visitors1!!1!!!1
                  </p>
                  
                  {/* Social Icons */}
                  <div className="flex gap-4 mb-6">
                    {[
                      { Icon: FaGithub, href: "https://github.com/vorlie", color: "hover:text-white" },
                      { Icon: FaDiscord, href: "https://discord.gg/yUueAFyAmN", color: "hover:text-indigo-400" },
                      { Icon: FaSteam, href: "https://steamcommunity.com/id/s9suk3_41z3n/", color: "hover:text-blue-500" },
                      { Icon: FaYoutube, href: "https://www.youtube.com/@vve1_", color: "hover:text-red-500" },
                    ].map(({ Icon, href, color }, index) => (
                      <a
                        key={index}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`text-gray-400 transition-all duration-300 transform hover:scale-110 ${color}`}
                      >
                        <Icon size={24} />
                      </a>
                    ))}
                  </div>

                  <div className="space-y-4 text-lg text-gray-300 leading-relaxed max-w-xl">
                    <p>
                      I focus on writing code and building projects across various
                      technologies. I love anime, games, and music.
                    </p>
                    <p>
                      I have an interest in{" "}
                      <span className="text-blue-400 font-medium bg-blue-400/10 px-1 rounded">games</span>,
                      <span className="text-blue-400 font-medium bg-blue-400/10 px-1 rounded"> music</span>, and{" "}
                      <span className="text-blue-400 font-medium bg-blue-400/10 px-1 rounded">anime</span>.
                    </p>
                  </div>
                  <div className="mt-8">
                     <Buttons88x31 />
                  </div>
                </div>

                {/* Floating Mascot */}
                <div className="md:block absolute -bottom-4 -right-4 w-64 h-64 pointer-events-none opacity-90 z-0">
                  <img 
                    src="/images/evernight_chibi.gif" 
                    alt="Chibi Mascot" 
                    className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(230,204,213,1)]"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              </section>
            </main>

            {/* Sidebar: Status & TicTacToe */}
            <aside className="space-y-8">
              <section className="bg-gray-900/60 backdrop-blur-md border border-gray-700/50 rounded-2xl shadow-xl p-6">
                <div className="">
                  <LanyardPresence discordId={MY_DISCORD_ID} />
                </div>
              </section>
              
              <section className="bg-gray-900/60 backdrop-blur-md border border-gray-700/50 rounded-2xl shadow-xl p-6">
                 <h2 className="text-xl font-semibold mb-4 text-white">
                  Tic Tac Toe
                </h2>
                <TicTacToe />
              </section>
            </aside>
          </div>

          {/* Technologies Section */}
          <section className="bg-gray-900/60 backdrop-blur-md border border-gray-700/50 rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-semibold mb-6 text-white border-b border-gray-700/50 pb-2">
              Technologies I Use
            </h2>
            <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {[
                { Icon: SiTypescript, color: "text-blue-400", label: "TypeScript" },
                { Icon: FaPython, color: "text-yellow-400", label: "Python" },
                { Icon: FaHtml5, color: "text-orange-500", label: "HTML" },
                { Icon: FaCss3Alt, color: "text-blue-500", label: "CSS" },
                { Icon: FaJs, color: "text-yellow-300", label: "JavaScript" },
                { Icon: SiAstro, color: "text-orange-400", label: "Astro" },
                { Icon: FaReact, color: "text-cyan-400", label: "React" },
                { Icon: SiTailwindcss, color: "text-teal-400", label: "Tailwind" },
                { Icon: FaJava, color: "text-orange-400", label: "Java" },
                { Icon: SiCplusplus, color: "text-purple-400", label: "C++" },
              ].map(({ Icon, color, label }) => (
                <li key={label} className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-all duration-300 group cursor-default border border-transparent hover:border-white/10">
                  <Icon className={`${color} w-6 h-6 group-hover:scale-110 transition-transform duration-300`} />
                  <span className="text-gray-300 group-hover:text-white font-medium">{label}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>{" "}
        <section id="projects" className="bg-gray-900/60 backdrop-blur-md border border-gray-700/50 rounded-2xl shadow-xl p-8 mt-8">
          <h2 className="text-3xl font-bold mb-6 text-white text-center">Projects</h2>
          <Projects />
        </section>
        <footer className="mt-8 pb-12 border-gray-700 text-center text-gray-500 text-sm">
          {commitInfo ? (
            <p>
              Last commit:{" "}
              <a
                href={commitInfo.commitUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300"
              >
                <code>{commitInfo.sha}</code>
              </a>
              <span className="mx-1">&bull;</span>
              <span title={commitInfo.message}>{commitInfo.message}</span>{" "}
              <span className="mx-1">&bull;</span> by
              <a
                href={commitInfo.authorUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-1 hover:text-gray-300"
              >
                {commitInfo.authorName}
              </a>
            </p>
          ) : commitError ? (
            <p className="text-blue-500">
              Oops! Something went wrong: {commitError}
            </p>
          ) : (
            <p>Loading commit info...</p>
          )}
          <p className="mt-2">
            © {new Date().getFullYear()} Charlie. All rights reserved.
          </p>
        </footer>
      </div>{" "}
    </div>
  );
}

export default Home;
