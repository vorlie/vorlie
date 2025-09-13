// src/components/ProjectsPage.tsx
import React from "react";
import Project from "./Project";

import { FaJava, FaPython, FaReact } from "react-icons/fa";
import { SiElectron, SiJavascript, SiCplusplus, SiRust } from "react-icons/si";

const projectData = [
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
    title: "Markdown Notepad",
    desc: "Simple markdown editor with live preview. Built with React and MUI.",
    links: [
      { href: "https://github.com/vorlie/markdown-editor", text: "Repository" },
      { href: "https://md.vorlie.pl", text: "Website" },
    ],
    languages: ["React"],
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
    ],
    languages: ["Electron"],
  },
  {
    title: "YoutubeDL",
    desc: "Simple youtube downloader. Contributions are always welcome!",
    links: [
      { href: "https://github.com/vorlie/YoutubeDL", text: "Repository" },
      {
        href: "https://github.com/vorlie/YoutubeDL/releases/",
        text: "Releases",
      },
    ],
    languages: ["Python"],
  },
  {
    title: "ImageConverter",
    desc: "A convenient tool for converting between JPEG, WebP, PNG, GIF, BMP, and TIFF formats. Also supports resizing.",
    links: [
      {
        href: "https://github.com/vorlie/ImageFormatConverter",
        text: "Repository",
      },
      {
        href: "https://github.com/vorlie/ImageFormatConverter/releases",
        text: "Releases",
      },
    ],
    languages: ["Python"],
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

const ProjectsPage: React.FC = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
    {projectData.map((proj) => (
      <Project
        key={proj.title}
        title={proj.title}
        desc={proj.desc}
        links={proj.links}
        languages={proj.languages}
        languageIcons={proj.languages.map(
          (lang) => languageIconMap[lang] || null
        )}
      />
    ))}
  </div>
);

export default ProjectsPage;
