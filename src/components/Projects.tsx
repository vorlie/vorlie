// src/components/Projects.tsx
import React, { useState, useMemo } from "react";
import Project from "./Project";

import {
  FaJava,
  FaPython,
  FaReact,
  FaSearch,
  FaThLarge,
  FaList,
} from "react-icons/fa";
import { SiElectron, SiJavascript, SiCplusplus, SiRust } from "react-icons/si";

const projectData = [
  
  {
    title: "Snake Shader",
    desc: "Welcome to Snake Shader, a high-performance, retro-futuristic reimplementation of the classic Snake game. We've ditched the basic 2D grids for a fully GPU-accelerated experience using ModernGL and Pygame",
    links: [
      {
        href: "https://github.com/vorlie/snake-shader",
        text: "Repository",
      },
    ],
    languages: ["Python"],
  },
  {
    title: "WoT Replay Manager",
    desc: "WoT Replay Manager is a multi-platform companion for organising and viewing your replays alongside your World of Tanks install. Built with C++, Rust and QT6, manage your replays with ease using an intuitive, snappy interface!",
    links: [
      {
        href: "https://github.com/vorlie/WoT-Replay-Manager",
        text: "Repository",
      },
      {
        href: "https://wotrm.vorlie.pl/",
        text: "Homepage",
      },
    ],
    languages: ["C++", "Rust"],
  },
  {
    title: "Iota Player",
    desc: "A feature-rich music player application with playlist management, playback controls, song information display, volume and progress tracking, Discord integration, and more.",
    links: [
      { href: "https://github.com/vorlie/IotaPlayer", text: "Repository" },
      {
        href: "https://vorlie.pl/project/iota-player",
        text: "Homepage",
      },
    ],
    languages: ["Python"],
  },
  {
    title: "API Documentation",
    desc: "API Documentation for my own API. Built with React and TailwindCSS. It is a simple documentation site that provides information about the API endpoints, request/response formats, and usage examples.",
    links: [
      { href: "https://github.com/vorlie/api-docs", text: "Repository" },
      { href: "https://docs.vorlie.pl", text: "Website" },
    ],
    languages: ["React"],
  },
  {
    title: "Vorlie API",
    desc: "My own API which provides endpoints for anime interactive actions (e.g. hug, poke, kiss).",
    links: [
      { href: "https://github.com/vorlie/miko_worker", text: "Repository" },
      { href: "https://docs.vorlie.pl", text: "API Docs" },
    ],
    languages: ["JavaScript"],
  },
  {
    title: "LifeDrain",
    desc: "LifeDrain adds a simple but powerful mechanic to Minecraft: stealing life from hostile mobs. Every time you attack, you'll heal yourself based on the damage dealt, making combat a way to stay alive rather than just survive.",
    links: [
      { href: "https://github.com/vorlie/Lifedrain/", text: "Repository" },
      {
        href: "https://github.com/vorlie/Lifedrain-notepad/releases/",
        text: "Releases",
      },
      { href: "https://modrinth.com/mod/lifedrain/", text: "Modrinth" },
    ],
    languages: ["Java"],
  },
  {
    title: "Iota's Notepad",
    desc: "Iota's Notepad is a simple note-taking application built with Electron",
    links: [
      { href: "https://github.com/vorlie/iotas-notepad", text: "Repository" },
      {
        href: "https://github.com/vorlie/iotas-notepad/releases/",
        text: "Releases",
      },
      { href: "https://vorlie.pl/project/iotas-notepad", text: "Homepage" },
    ],
    languages: ["Electron"],
  },
  
];

const languageIconMap: { [key: string]: React.ReactNode } = {
  Java: <FaJava className="text-orange-400" />,
  "C++": <SiCplusplus className="text-blue-400" />,
  Rust: <SiRust className="text-orange-500" />,
  Electron: <SiElectron className="text-cyan-400" />,
  Python: <FaPython className="text-yellow-400" />,
  JavaScript: <SiJavascript className="text-yellow-300" />,
  React: <FaReact className="text-cyan-400" />,
};

const Projects: React.FC = () => {
  const [search, setSearch] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [view, setView] = useState<"grid" | "list">("grid");

  const allLanguages = useMemo(() => {
    const langs = new Set<string>();
    projectData.forEach((p) => p.languages.forEach((l) => langs.add(l)));
    return Array.from(langs).sort();
  }, []);

  const filteredProjects = useMemo(() => {
    return projectData.filter((p) => {
      const matchSearch =
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.desc.toLowerCase().includes(search.toLowerCase());
      const matchLang =
        !selectedLanguage || p.languages.includes(selectedLanguage);
      return matchSearch && matchLang;
    });
  }, [search, selectedLanguage]);

  return (
    <div className="space-y-6">
      {/* Control Bar */}
      <div className="space-y-4">
        {/* Row 1: Search & View Toggle */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="relative flex-grow w-full sm:w-auto">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-m3-primary/60 w-4 h-4" />
            <input
              type="text"
              placeholder="Search projects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-m3-on-surface/5 border border-m3-outline/20 rounded-sm py-3 pl-11 pr-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-m3-primary/30 focus:border-m3-primary/50 transition-all placeholder:text-m3-on-surface-variant/40"
            />
          </div>

          <div className="flex bg-m3-on-surface/5 p-1 rounded-sm border border-m3-outline/20 shrink-0">
            <button
              onClick={() => setView("grid")}
              className={`flex items-center gap-2 px-4 py-2 rounded-sm text-sm font-bold transition-all ${view === "grid" ? "bg-m3-primary text-m3-on-primary shadow-sm" : "text-m3-on-surface-variant hover:bg-m3-on-surface/10"}`}
            >
              <FaThLarge className="w-4 h-4" />
              <span>Grid</span>
            </button>
            <button
              onClick={() => setView("list")}
              className={`flex items-center gap-2 px-4 py-2 rounded-sm text-sm font-bold transition-all ${view === "list" ? "bg-m3-primary text-m3-on-primary shadow-sm" : "text-m3-on-surface-variant hover:bg-m3-on-surface/10"}`}
            >
              <FaList className="w-4 h-4" />
              <span>List</span>
            </button>
          </div>
        </div>

        {/* Row 2: Filter Chips */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <span className="text-xs font-black text-m3-on-surface-variant/50 uppercase tracking-widest mr-2">
            Filter by:
          </span>
          <button
            onClick={() => setSelectedLanguage(null)}
            className={`px-4 py-1.5 rounded-none text-xs font-bold transition-all border ${
              !selectedLanguage
                ? "bg-m3-primary text-m3-on-primary border-m3-primary shadow-sm"
                : "bg-m3-on-surface/5 text-m3-on-surface-variant border-m3-outline/10 hover:bg-m3-on-surface/10"
            }`}
          >
            All Projects
          </button>
          {allLanguages.map((lang) => (
            <button
              key={lang}
              onClick={() => setSelectedLanguage(lang)}
              className={`px-4 py-1.5 rounded-none text-xs font-bold transition-all border flex items-center gap-2 ${
                selectedLanguage === lang
                  ? "bg-m3-primary text-m3-on-primary border-m3-primary shadow-sm"
                  : "bg-m3-on-surface/5 text-m3-on-surface-variant border-m3-outline/10 hover:bg-m3-on-surface/10"
              }`}
            >
              {languageIconMap[lang] && (
                <span className="w-3 h-3 opacity-80">
                  {languageIconMap[lang]}
                </span>
              )}
              {lang}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid/List */}
      <div
        className={`grid gap-5 ${view === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"}`}
      >
          {filteredProjects.map((proj) => {
            const mainLink =
              proj.links.find((l) =>
                ["Homepage", "Website", "API Docs", "Modrinth"].includes(
                  l.text,
                ),
              )?.href || proj.links[0]?.href;

            const otherLinks = proj.links.filter(
              (l) => !["Homepage", "Website", "API Docs"].includes(l.text),
            );

            return (
              <Project
                key={proj.title}
                view={view}
                title={proj.title}
                desc={proj.desc}
                links={otherLinks}
                mainLink={mainLink}
                languages={proj.languages}
                languageIcons={proj.languages.map(
                  (lang) => languageIconMap[lang] || null,
                )}
              />
            );
          })}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12 bg-m3-surface-container/30 rounded-none border border-dashed border-m3-outline/20">
          <p className="text-m3-on-surface-variant italic">
            No projects found matching your criteria.
          </p>
          <button
            onClick={() => {
              setSearch("");
              setSelectedLanguage(null);
            }}
            className="mt-4 text-m3-primary font-bold hover:underline"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
};

export default Projects;
