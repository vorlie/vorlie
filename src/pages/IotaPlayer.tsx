import { useState } from "react";
import SEO from "../components/SEO";

function IotaPlayer() {
  // State for managing the image modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState("");

  const openModal = (imagePath: string) => {
    setCurrentImage(imagePath);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentImage("");
  };

  return (
    <div className="flex flex-col gap-12 max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8 text-m3-on-surface">
      <SEO
        title="Iota Player"
        description="Iota Player is a feature-rich desktop music player for Windows and Linux with playlist management and platform integration."
        url="https://vorlie.pl/project/iota-player"
      />
      <div className="flex flex-col lg:flex-row gap-12">
        <section className="lg:w-2/3 flex flex-col gap-10">
          {/* Header Section */}
          <div className="bg-m3-surface-container rounded-[32px] p-8 sm:p-12 shadow-sm border border-m3-outline/10">
            <h1 className="text-5xl sm:text-6xl font-black mb-8 text-m3-primary tracking-tight">
              Iota Player
            </h1>
            <p className="text-xl text-m3-on-surface-variant font-medium leading-relaxed mb-10">
              Iota Player is a feature-rich desktop music player for Windows and
              Linux. It's meticulously designed for users who desire seamless
              playlist management, powerful playback controls, and deep
              integration with popular services like Discord and YouTube.
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8">
              <a
                href="https://raw.githubusercontent.com/vorlie/IotaPlayer/master/linux_installer.sh"
                download="linux_installer.sh"
                className="inline-flex items-center bg-m3-primary text-m3-on-primary font-black uppercase tracking-tighter py-4 px-10 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 active:scale-95 text-lg"
              >
                Download Linux Installer
              </a>
              <div className="text-m3-on-surface-variant font-medium">
                <p className="text-sm opacity-80 mb-1">
                  One-command installer script.
                </p>
                <a
                  href="#installation"
                  className="text-m3-primary font-bold hover:underline flex items-center gap-1"
                >
                  View installation guide
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Core Features */}
          <div className="bg-m3-surface-container rounded-[32px] p-8 sm:p-12 border border-m3-outline/5">
            <h2 className="text-3xl font-black mb-10 text-m3-on-surface tracking-tight flex items-center gap-4">
              <span className="w-2.5 h-10 bg-m3-primary rounded-full"></span>
              Core Features
            </h2>
            <div className="grid gap-12">
              <div className="group">
                <h3 className="text-xl font-black text-m3-primary mb-3">
                  Playlist Management
                </h3>
                <p className="text-m3-on-surface-variant font-medium text-lg leading-relaxed">
                  Utilize the dedicated{" "}
                  <a
                    href="https://github.com/vorlie/IotaPlayer/blob/main/README.md#playlist-maker"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-m3-primary hover:underline font-bold"
                  >
                    Playlist Maker
                  </a>{" "}
                  to build or modify playlists. Combine songs from multiple
                  sources into a single, unified playlist with ease.
                </p>
              </div>

              <div className="group">
                <h3 className="text-xl font-black text-m3-primary mb-3">
                  Audio Controls
                </h3>
                <p className="text-m3-on-surface-variant font-medium text-lg leading-relaxed mb-4">
                  Comprehensive playback including repeat, shuffle, and a
                  draggable seek bar. Built on native{" "}
                  <code className="bg-m3-surface px-3 py-1.5 rounded-xl text-m3-primary font-black text-sm border border-m3-outline/10">
                    QMediaPlayer
                  </code>{" "}
                  for maximum stability.
                </p>
              </div>

              <div className="group">
                <h3 className="text-xl font-black text-m3-primary mb-4">
                  Platform Integration
                </h3>
                <div className="flex flex-wrap gap-3">
                  {[
                    "Discord RPC",
                    "YouTube Upload",
                    "Linux MPRIS",
                    "Google API",
                  ].map((tag) => (
                    <span
                      key={tag}
                      className="bg-m3-primary/10 text-m3-primary px-4 py-1.5 rounded-full text-sm font-black border border-m3-primary/20 tracking-tight uppercase"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Installation Section */}
          <div
            id="installation"
            className="bg-m3-surface-container rounded-[32px] p-8 sm:p-12 border border-m3-outline/10 shadow-sm scroll-mt-24"
          >
            <h2 className="text-3xl font-black mb-10 text-m3-on-surface tracking-tight">
              Installation Guide
            </h2>

            <div className="flex flex-col gap-10">
              <div className="p-8 bg-m3-surface-variant/10 rounded-[28px] border border-m3-outline/5 hover:border-m3-outline/20 transition-all duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-m3-primary text-m3-on-primary rounded-2xl flex items-center justify-center font-black text-xl shadow-md">
                    L
                  </div>
                  <h3 className="text-2xl font-black text-m3-primary">
                    Linux (Recommended)
                  </h3>
                </div>
                <p className="text-m3-on-surface-variant font-medium text-lg mb-8 leading-relaxed">
                  The{" "}
                  <code className="bg-m3-surface px-2 py-1 rounded-lg text-m3-primary font-bold">
                    linux_installer.sh
                  </code>{" "}
                  script automates the entire setup process.
                </p>
                <div className="space-y-6">
                  <div className="bg-m3-surface rounded-2xl p-6 border border-m3-outline/10 relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-1 h-full bg-m3-primary/50 group-hover:bg-m3-primary transition-colors"></div>
                    <p className="text-xs text-m3-on-surface-variant font-black uppercase tracking-widest mb-3 opacity-60">
                      1. Download Script
                    </p>
                    <code className="text-sm sm:text-base font-bold text-m3-on-surface break-all block">
                      curl -O
                      https://raw.githubusercontent.com/vorlie/IotaPlayer/master/linux_installer.sh
                    </code>
                  </div>
                  <div className="bg-m3-surface rounded-2xl p-6 border border-m3-outline/10 relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-1 h-full bg-m3-primary/50 group-hover:bg-m3-primary transition-colors"></div>
                    <p className="text-xs text-m3-on-surface-variant font-black uppercase tracking-widest mb-3 opacity-60">
                      2. Run Installer
                    </p>
                    <code className="text-sm sm:text-base font-bold text-m3-on-surface block">
                      chmod +x linux_installer.sh && ./linux_installer.sh
                      install
                    </code>
                  </div>
                </div>
              </div>

              <div className="p-8 bg-m3-surface-variant/10 rounded-[28px] border border-m3-outline/5 hover:border-m3-outline/20 transition-all duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-m3-primary text-m3-on-primary rounded-2xl flex items-center justify-center font-black text-xl shadow-md">
                    W
                  </div>
                  <h3 className="text-2xl font-black text-m3-primary">
                    Windows
                  </h3>
                </div>
                <p className="text-m3-on-surface-variant font-medium text-lg mb-8 leading-relaxed">
                  Simply download the standalone{" "}
                  <code className="bg-m3-surface px-2 py-1 rounded-lg">
                    .exe
                  </code>{" "}
                  from the releases page and launch it.
                </p>
                <a
                  href="https://github.com/vorlie/IotaPlayer/releases"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-m3-surface text-m3-primary font-black py-3 px-8 rounded-full border-2 border-m3-primary/20 hover:bg-m3-primary hover:text-m3-on-primary transition-all active:scale-95"
                >
                  View GitHub Releases
                </a>
              </div>
            </div>
          </div>
        </section>

        <aside className="lg:w-1/3 flex flex-col gap-8">
          {/* About Section */}
          <div className="bg-m3-surface-container rounded-[32px] p-8 border border-m3-outline/10 shadow-sm">
            <h2 className="text-2xl font-black mb-6 text-m3-on-surface tracking-tight">
              About Project
            </h2>
            <p className="text-m3-on-surface-variant font-medium leading-relaxed mb-6">
              Iota Player is built to provide a modern, stable, and feature-rich
              music environment on the desktop, with a core focus on the Linux
              ecosystem while remaining Windows-ready.
            </p>
            <div className="flex flex-col gap-4">
              {["PyQt6", "GStreamer", "Discord RPC"].map((tech) => (
                <div key={tech} className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-m3-primary"></div>
                  <span className="font-bold text-sm text-m3-on-surface-variant">
                    {tech}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Gallery Section */}
          <div className="bg-m3-surface-container rounded-[32px] p-8 border border-m3-outline/10 shadow-sm overflow-hidden">
            <h2 className="text-2xl font-black mb-6 text-m3-on-surface tracking-tight">
              Gallery
            </h2>
            <div className="flex flex-col gap-6">
              {[
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
              ].map((img) => (
                <div
                  key={img.path}
                  className="group relative bg-m3-surface rounded-[24px] overflow-hidden border border-m3-outline/5 hover:border-m3-outline/30 transition-all shadow-sm hover:shadow-xl"
                >
                  <div className="p-3">
                    <p className="text-xs font-black uppercase tracking-widest text-m3-on-surface-variant mb-3 group-hover:text-m3-primary transition-colors">
                      {img.name}
                    </p>
                    <div className="relative overflow-hidden rounded-[16px]">
                      <img
                        src={img.path}
                        alt={img.name}
                        className="w-full h-auto cursor-pointer group-hover:scale-110 transition-transform duration-700 ease-out"
                        onClick={() => openModal(img.path)}
                      />
                      <div className="absolute inset-0 bg-m3-primary/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none flex items-center justify-center">
                        <div className="bg-m3-surface/90 p-3 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-m3-primary"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={3}
                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="bg-m3-surface-container/40 rounded-[32px] p-8 border border-m3-outline/5">
            <div className="flex flex-col gap-4 font-black text-sm uppercase tracking-tighter">
              <a
                href="https://github.com/vorlie/IotaPlayer/blob/main/LICENSE"
                className="flex items-center justify-between text-m3-on-surface-variant hover:text-m3-primary transition-colors group"
              >
                License{" "}
                <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                  GPL 3.0
                </span>
              </a>
              <a
                href="https://github.com/vorlie/IotaPlayer"
                className="flex items-center justify-between text-m3-on-surface-variant hover:text-m3-primary transition-colors group"
              >
                Source{" "}
                <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                  GitHub
                </span>
              </a>
              <a
                href="https://github.com/users/vorlie/projects/3/views/1"
                className="flex items-center justify-between text-m3-on-surface-variant hover:text-m3-primary transition-colors group"
              >
                To-Do{" "}
                <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                  Roadmap
                </span>
              </a>
            </div>
          </div>
        </aside>
      </div>

      {/* Footer Acknowledgments */}
      <div className="bg-m3-surface-container rounded-[32px] p-10 border border-m3-outline/10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-xl font-black mb-2 text-m3-on-surface">
            Acknowledgments
          </h3>
          <p className="text-m3-on-surface-variant font-medium">
            Built with PyQt6, qdarktheme, pypresence, and mutagen.
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm font-black text-m3-on-surface-variant uppercase tracking-[0.2em] opacity-30">
            © {new Date().getFullYear()} vorlie
          </p>
        </div>
      </div>

      {/* Image Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-12 bg-m3-surface/95 backdrop-blur-xl animate-in fade-in duration-500"
          onClick={closeModal}
        >
          <div
            className="relative bg-m3-surface-container rounded-[40px] p-4 sm:p-6 shadow-2xl border border-m3-outline/20 max-w-6xl w-full flex flex-col animate-in zoom-in-95 duration-500"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-8 right-8 z-10 p-4 bg-m3-primary text-m3-on-primary rounded-full shadow-xl hover:scale-110 active:scale-90 transition-all group"
              onClick={closeModal}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 stroke-[3px]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div className="overflow-auto rounded-[24px]">
              <img
                src={currentImage}
                alt="Fullscreen Preview"
                className="w-full h-auto object-contain max-h-[85vh] rounded-[24px]"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default IotaPlayer;
