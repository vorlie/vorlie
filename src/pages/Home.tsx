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
} from "react-icons/fa";
import { SiTypescript, SiAstro, SiTailwindcss } from "react-icons/si";

interface CommitInfo {
  sha: string;
  message: string;
  authorName: string;
  authorUrl: string;
  commitUrl: string;
}

const ProjectsPage = () => (
  <section id="projects" className="my-12 py-8 border-t border-gray-700">
    <h2 className="text-3xl font-bold mb-6 text-white text-center">Projects</h2>
    <Projects />
  </section>
);

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
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
          <main className="flex-grow lg:w-2/3">
            {" "}
            <section className="mb-10">
              <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-white leading-tight">
                Hello, I'm <span className="text-red-400">Charlie</span>, a
                friendly coder.
              </h1>
              <div className="space-y-4 text-lg text-gray-300 leading-relaxed">
                <p>
                  I focus on writing code and building projects across various
                  technologies. Outside of development, I have an interest in
                  gaming, music, and anime.
                </p>
                <p>
                  When I'm not coding, I spend time listening to{" "}
                  <span className="text-red-400 font-medium">music</span>,
                  playing{" "}
                  <span className="text-red-400 font-medium">games</span> or
                  watching{" "}
                  <span className="text-red-400 font-medium">anime</span>.
                </p>
                <p className="text-gray-400">
                  Feel free to check out my{" "}
                  <a href="#projects" className="text-blue-400 hover:underline">
                    projects
                  </a>
                  {". "}
                  I'm always open to collaboration.
                </p>
              </div>
            </section>
            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4 text-white">
                Technologies I Use:
              </h2>
              <ul className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-2 text-gray-300">
                {" "}
                <li className="flex items-center gap-2 hover:text-white transition-colors">
                  <SiTypescript className="text-blue-400 w-5 h-5 flex-shrink-0" />{" "}
                  TypeScript
                </li>
                <li className="flex items-center gap-2 hover:text-white transition-colors">
                  <FaPython className="text-yellow-400 w-5 h-5 flex-shrink-0" />{" "}
                  Python
                </li>
                <li className="flex items-center gap-2 hover:text-white transition-colors">
                  <FaHtml5 className="text-orange-500 w-5 h-5 flex-shrink-0" />{" "}
                  HTML
                </li>
                <li className="flex items-center gap-2 hover:text-white transition-colors">
                  <FaCss3Alt className="text-blue-500 w-5 h-5 flex-shrink-0" />{" "}
                  CSS
                </li>
                <li className="flex items-center gap-2 hover:text-white transition-colors">
                  <FaJs className="text-yellow-300 w-5 h-5 flex-shrink-0" />{" "}
                  JavaScript
                </li>
                <li className="flex items-center gap-2 hover:text-white transition-colors">
                  <SiAstro className="text-orange-400 w-5 h-5 flex-shrink-0" />{" "}
                  Astro
                </li>
                <li className="flex items-center gap-2 hover:text-white transition-colors">
                  <FaReact className="text-cyan-400 w-5 h-5 flex-shrink-0" />{" "}
                  React
                </li>
                <li className="flex items-center gap-2 hover:text-white transition-colors">
                  <SiTailwindcss className="text-teal-400 w-5 h-5 flex-shrink-0" />{" "}
                  Tailwind CSS
                </li>
                <li className="flex items-center gap-2 hover:text-white transition-colors">
                  <FaJava className="text-orange-400 w-5 h-5 flex-shrink-0" />{" "}
                  Java
                </li>
              </ul>
            </section>
            <Buttons88x31 />
          </main>

          <aside className="lg:w-1/3 flex-shrink-0">
            {" "}
            <section className="mb-8 top-8">
              {" "}
              <h2 className="text-2xl font-semibold mb-4 text-white">
                Stalk me here
              </h2>
              <div className="bg-gray-800/50 p-4 rounded-lg shadow-lg">
                {" "}
                <LanyardPresence discordId={MY_DISCORD_ID} />
              </div>
            </section>
            <section className="mb-8">
              {" "}
              <h2 className="text-2xl font-semibold mb-4 text-white">
                Tic Tac Toe
              </h2>
              <TicTacToe />
            </section>
          </aside>
        </div>{" "}
        <ProjectsPage />
        <footer className="mt-16 pt-8 border-t border-gray-700 text-center text-gray-500 text-sm">
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
            <p className="text-red-500">
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
