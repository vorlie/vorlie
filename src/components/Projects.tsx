// src/components/ProjectsPage.tsx
import React from "react";
import Project from "./Project";

import { FaJava, FaPython } from "react-icons/fa";
import { SiElectron, SiJavascript } from "react-icons/si";

const projectData = [
  {
    title: "LifeDrain",
    desc: "LifeDrain adds a simple but powerful mechanic to Minecraft: stealing life from hostile mobs. Every time you attack, you'll heal yourself based on the damage dealt, making combat a way to stay alive rather than just survive.", // Oryginalny opis
    links: [
      { href: "https://github.com/vorlie/Lifedrain/", text: "Repository" },
      {
        href: "https://github.com/vorlie/Lifedrain-notepad/releases/",
        text: "Releases",
      },
      { href: "https://modrinth.com/mod/lifedrain/", text: "Modrinth" },
    ],
    language: "Java",
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
    language: "Electron",
  },
  {
    title: "Iota Player",
    desc: "A feature-rich music player application with playlist management, playback controls, song information display, volume and progress tracking, Discord integration, and more.", // Oryginalny opis
    links: [
      { href: "https://github.com/vorlie/IotaPlayer", text: "Repository" },
      {
        href: "https://github.com/vorlie/IotaPlayer/releases/",
        text: "Releases",
      },
    ],
    language: "Python",
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
    language: "Python",
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
    language: "Python",
  },
];

const languageIconMap: { [key: string]: React.ReactNode } = {
  Java: <FaJava className="text-orange-400" />,
  Electron: <SiElectron className="text-cyan-400" />,
  Python: <FaPython className="text-yellow-400" />,
  JavaScript: <SiJavascript className="text-yellow-300" />,
};

const ProjectsPage: React.FC = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
    {projectData.map((proj) => (
      <Project
        key={proj.title}
        title={proj.title}
        desc={proj.desc}
        links={proj.links}
        language={proj.language}
        languageIcon={languageIconMap[proj.language] || null}
      />
    ))}
  </div>
);

export default ProjectsPage;
