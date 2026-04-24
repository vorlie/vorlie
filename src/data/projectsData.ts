// src/data/projectsData.ts

export interface InstallStep {
  label: string;
  code: string;
}

export interface InstallPlatform {
  platform: string;
  icon: string; // single letter badge
  description: string;
  steps?: InstallStep[];
  cta?: { label: string; href: string };
}

export interface ProjectFeature {
  title: string;
  desc?: string;
  tags?: string[];
  links?: { label: string; href: string }[];
  subsections?: { title: string; desc: string }[];
}

export interface ProjectGalleryImage {
  name: string;
  path: string;
}

export interface ProjectLink {
  label: string;
  href: string;
  meta: string;
}

export interface ProjectWarning {
  message: string;
  linkLabel?: string;
  linkHref?: string;
}

export interface ProjectData {
  id: string;
  slug: string;
  seoTitle: string;
  seoDescription: string;
  name: string;
  tagline: string;
  description: string;
  warning?: ProjectWarning;
  primaryCTA: { label: string; href: string; download?: string };
  secondaryCTA?: { label: string; href: string };
  featuresTitle?: string;
  features: ProjectFeature[];
  installSteps: InstallPlatform[];
  techStack: string[];
  aboutText: string;
  gallery: ProjectGalleryImage[];
  links: ProjectLink[];
  acknowledgments: string;
}

export const projectsData: ProjectData[] = [
  {
    id: "iota-player",
    slug: "iota-player",
    seoTitle: "Iota Player",
    seoDescription:
      "Iota Player is a feature-rich desktop music player for Windows and Linux with playlist management and platform integration.",
    name: "Iota Player",
    tagline: "Desktop Music Player",
    description:
      "Iota Player is a feature-rich desktop music player for Windows and Linux. It's meticulously designed for users who desire seamless playlist management, powerful playback controls, and deep integration with popular services like Discord and YouTube.",
    primaryCTA: {
      label: "Download Linux Installer",
      href: "https://raw.githubusercontent.com/vorlie/IotaPlayer/master/linux_installer.sh",
      download: "linux_installer.sh",
    },
    secondaryCTA: {
      label: "View installation guide",
      href: "#installation",
    },
    featuresTitle: "Core Features",
    features: [
      {
        title: "Playlist Management",
        desc: "Utilize the dedicated Playlist Maker to build or modify playlists. Combine songs from multiple sources into a single, unified playlist with ease.",
        links: [
          {
            label: "Playlist Maker",
            href: "https://github.com/vorlie/IotaPlayer/blob/main/README.md#playlist-maker",
          },
        ],
      },
      {
        title: "Audio Controls",
        desc: "Comprehensive playback including repeat, shuffle, and a draggable seek bar. Built on native QMediaPlayer for maximum stability.",
      },
      {
        title: "Platform Integration",
        tags: ["Discord RPC", "YouTube Upload", "Linux MPRIS", "Google API"],
      },
    ],
    installSteps: [
      {
        platform: "Linux (Recommended)",
        icon: "L",
        description:
          "The linux_installer.sh script automates the entire setup process.",
        steps: [
          {
            label: "1. Download Script",
            code: "curl -O https://raw.githubusercontent.com/vorlie/IotaPlayer/master/linux_installer.sh",
          },
          {
            label: "2. Run Installer",
            code: "chmod +x linux_installer.sh && ./linux_installer.sh install",
          },
        ],
      },
      {
        platform: "Windows",
        icon: "W",
        description:
          "Simply download the standalone .exe from the releases page and launch it.",
        cta: {
          label: "View GitHub Releases",
          href: "https://github.com/vorlie/IotaPlayer/releases",
        },
      },
    ],
    techStack: ["PyQt6", "GStreamer", "Discord RPC"],
    aboutText:
      "Iota Player is built to provide a modern, stable, and feature-rich music environment on the desktop, with a core focus on the Linux ecosystem while remaining Windows-ready.",
    gallery: [
      {
        name: "Main Window",
        path: "/images/projects/iota-player/MainWindow.png",
      },
      {
        name: "Playlist Manager",
        path: "/images/projects/iota-player/PlaylistManager.png",
      },
      {
        name: "App Settings",
        path: "/images/projects/iota-player/Settings.png",
      },
    ],
    links: [
      {
        label: "License",
        href: "https://github.com/vorlie/IotaPlayer/blob/main/LICENSE",
        meta: "GPL 3.0",
      },
      {
        label: "Source",
        href: "https://github.com/vorlie/IotaPlayer",
        meta: "GitHub",
      },
      {
        label: "To-Do",
        href: "https://github.com/users/vorlie/projects/3/views/1",
        meta: "Roadmap",
      },
    ],
    acknowledgments: "Built with PyQt6, qdarktheme, pypresence, and mutagen.",
  },
  {
    id: "iotas-notepad",
    slug: "iotas-notepad",
    seoTitle: "Iota's Notepad - Mica",
    seoDescription:
      "Iota's Notepad is a simple note-taking application built with Electron, offering custom themes and a user-friendly interface.",
    name: "Iota's Notepad",
    tagline: "Electron Note-Taking App",
    description:
      "Iota's Notepad is a simple note-taking application built with Electron. It allows you to create, edit, and delete notes with a user-friendly interface, featuring auto-save and highly customizable themes.",
    warning: {
      message: "Looking for GNOME Iotas? This is a different project.",
      linkLabel: "Official repository",
      linkHref: "https://gitlab.gnome.org/World/iotas",
    },
    primaryCTA: {
      label: "Download Latest Release",
      href: "https://github.com/vorlie/iotas-notepad/releases/latest",
    },
    secondaryCTA: {
      label: "Installation guide",
      href: "#installation",
    },
    featuresTitle: "Key Features",
    features: [
      {
        title: "Note Management",
        desc: "Easily create, edit, and delete notes. Search through your content instantly.",
      },
      {
        title: "Smart Sorting",
        desc: "Organize by creation date, modification date, alphabetical order, or custom index.",
      },
      {
        title: "Auto-Save",
        desc: "Notes are saved automatically to local storage or manually via Ctrl+S.",
      },
      {
        title: "Import/Export",
        desc: "Backup your notes or share them as JSON format files at any time.",
      },
      {
        title: "Custom Themes",
        desc: "Use the built-in Theme Editor for real-time styling or import custom JSON themes.",
      },
      {
        title: "Mica Appearance",
        desc: "Modern and sleek UI design with support for 12/24h time formats and updater.",
      },
      {
        title: "Theme Customization",
        subsections: [
          {
            title: "Built-in Theme Editor",
            desc: "Access the editor directly from Settings. Changes are applied instantly to the main window as you edit, allowing for perfect visual fine-tuning.",
          },
          {
            title: "Import/Export JSON Themes",
            desc: 'Manually import custom theme definitions. To ensure title bar symbols adapt correctly for light themes, include "light" in your theme\'s name.',
          },
        ],
      },
    ],
    installSteps: [
      {
        platform: "Windows",
        icon: "W",
        description:
          "Download the latest setup file and follow the on-screen instructions. Updates are handled automatically in-app.",
        steps: [
          { label: "Install Path", code: "%LocalAppData%\\iotas-notepad" },
        ],
      },
      {
        platform: "Linux (AUR)",
        icon: "L",
        description:
          "Arch Linux users can install via AUR using their preferred helper.",
        steps: [
          { label: "Terminal Command", code: "yay -S iotas-notepad-git" },
        ],
      },
    ],
    techStack: ["Electron", "JavaScript", "Node.js"],
    aboutText:
      "Iota's Notepad was born from the need for a simple yet highly customizable note-taking tool that integrates seamlessly with the Windows Mica design language.",
    gallery: [
      {
        name: "Main Interface",
        path: "https://raw.githubusercontent.com/vorlie/iotas-notepad/master/images/main.png",
      },
      {
        name: "Export Modal",
        path: "https://raw.githubusercontent.com/vorlie/iotas-notepad/master/images/export.png",
      },
    ],
    links: [
      {
        label: "License",
        href: "https://github.com/vorlie/iotas-notepad/blob/master/LICENSE",
        meta: "MIT",
      },
      {
        label: "Source",
        href: "https://github.com/vorlie/iotas-notepad",
        meta: "GitHub",
      },
    ],
    acknowledgments:
      "Built with Electron, Bootstrap Icons, and community themes.",
  },
];

export function getProjectBySlug(slug: string): ProjectData | undefined {
  return projectsData.find((p) => p.slug === slug);
}
