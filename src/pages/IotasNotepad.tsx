import { useState } from "react";
import SEO from "../components/SEO";

function IotasNotepad() {
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
        title="Iota's Notepad - Mica"
        description="Iota's Notepad is a simple note-taking application built with Electron, offering custom themes and a user-friendly interface."
        url="https://vorlie.pl/project/iotas-notepad"
      />
      <div className="flex flex-col lg:flex-row gap-12">
        <section className="lg:w-2/3 flex flex-col gap-10">
          {/* Header Section */}
          <div className="bg-m3-surface-container rounded-[32px] p-8 sm:p-12 shadow-sm border border-m3-outline/10">
            <div className="mb-6 flex items-center gap-3 bg-red-500/10 text-red-500 px-6 py-4 rounded-2xl border border-red-500/20">
              <span className="text-2xl">⚠️</span>
              <p className="font-bold">
                Looking for GNOME Iotas? This is a different project.
                <a
                  href="https://gitlab.gnome.org/World/iotas"
                  className="ml-2 underline hover:opacity-80"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Official repository
                </a>
              </p>
            </div>

            <h1 className="text-5xl sm:text-6xl font-black mb-8 text-m3-primary tracking-tight">
              Iota's Notepad - Mica
            </h1>
            <p className="text-xl text-m3-on-surface-variant font-medium leading-relaxed mb-10">
              Iota's Notepad is a simple note-taking application built with
              Electron. It allows you to create, edit, and delete notes with a
              user-friendly interface, featuring auto-save and highly
              customizable themes.
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8">
              <a
                href="https://github.com/vorlie/iotas-notepad/releases/latest"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-m3-primary text-m3-on-primary font-black uppercase tracking-tighter py-4 px-10 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 active:scale-95 text-lg"
              >
                Download Latest Release
              </a>
              <div className="text-m3-on-surface-variant font-medium">
                <p className="text-sm opacity-80 mb-1">
                  Windows and Linux (AUR) supported.
                </p>
                <a
                  href="#installation"
                  className="text-m3-primary font-bold hover:underline flex items-center gap-1"
                >
                  Installation guide
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

          {/* Features Section */}
          <div className="bg-m3-surface-container rounded-[32px] p-8 sm:p-12 border border-m3-outline/5">
            <h2 className="text-3xl font-black mb-10 text-m3-on-surface tracking-tight flex items-center gap-4">
              <span className="w-2.5 h-10 bg-m3-primary rounded-full"></span>
              Key Features
            </h2>
            <div className="grid sm:grid-cols-2 gap-8">
              {[
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
              ].map((feature) => (
                <div
                  key={feature.title}
                  className="p-6 bg-m3-surface rounded-3xl border border-m3-outline/5 hover:border-m3-primary/20 transition-all group"
                >
                  <h3 className="text-xl font-black text-m3-primary mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-m3-on-surface-variant font-medium leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Themes Section */}
          <div className="bg-m3-surface-container rounded-[32px] p-8 sm:p-12 border border-m3-outline/5">
            <h2 className="text-3xl font-black mb-10 text-m3-on-surface tracking-tight">
              Theme Customization
            </h2>
            <div className="space-y-6">
              <div className="p-8 bg-m3-surface-variant/10 rounded-[28px] border border-m3-outline/5">
                <h3 className="text-2xl font-black text-m3-primary mb-4">
                  Built-in Theme Editor
                </h3>
                <p className="text-m3-on-surface-variant font-medium text-lg leading-relaxed mb-4">
                  Access the editor directly from Settings. Changes are applied
                  instantly to the main window as you edit, allowing for perfect
                  visual fine-tuning.
                </p>
              </div>
              <div className="p-8 bg-m3-surface-variant/10 rounded-[28px] border border-m3-outline/5">
                <h3 className="text-2xl font-black text-m3-primary mb-4">
                  Import/Export JSON Themes
                </h3>
                <p className="text-m3-on-surface-variant font-medium text-lg leading-relaxed mb-4">
                  Manually import custom theme definitions. To ensure title bar
                  symbols adapt correctly for light themes, include "light" in
                  your theme's name.
                </p>
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
              <div className="p-8 bg-m3-surface-variant/10 rounded-[28px] border border-m3-outline/5">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-m3-primary text-m3-on-primary rounded-2xl flex items-center justify-center font-black text-xl shadow-md">
                    W
                  </div>
                  <h3 className="text-2xl font-black text-m3-primary">
                    Windows
                  </h3>
                </div>
                <p className="text-m3-on-surface-variant font-medium text-lg mb-6 leading-relaxed">
                  Download the latest setup file and follow the on-screen
                  instructions. Updates are handled automatically in-app.
                </p>
                <div className="bg-m3-surface rounded-2xl p-6 border border-m3-outline/10">
                  <p className="text-xs text-m3-on-surface-variant font-black uppercase tracking-widest mb-2 opacity-60">
                    Install Path
                  </p>
                  <code className="text-sm font-bold text-m3-on-surface break-all block">
                    %LocalAppData%\iotas-notepad
                  </code>
                </div>
              </div>

              <div className="p-8 bg-m3-surface-variant/10 rounded-[28px] border border-m3-outline/5">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-m3-primary text-m3-on-primary rounded-2xl flex items-center justify-center font-black text-xl shadow-md">
                    L
                  </div>
                  <h3 className="text-2xl font-black text-m3-primary">
                    Linux (AUR)
                  </h3>
                </div>
                <p className="text-m3-on-surface-variant font-medium text-lg mb-6 leading-relaxed">
                  Arch Linux users can install via AUR using their preferred
                  helper.
                </p>
                <div className="bg-m3-surface rounded-2xl p-6 border border-m3-outline/10">
                  <p className="text-xs text-m3-on-surface-variant font-black uppercase tracking-widest mb-2 opacity-60">
                    Terminal Command
                  </p>
                  <code className="text-sm font-bold text-m3-on-surface block">
                    yay -S iotas-notepad-git
                  </code>
                </div>
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
              Iota's Notepad was born from the need for a simple yet highly
              customizable note-taking tool that integrates seamlessly with
              the Windows Mica design language.
            </p>
            <div className="flex flex-col gap-4">
              {["Electron", "TypeScript", "React", "Node.js"].map((tech) => (
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
                  name: "Main Interface",
                  path: "https://raw.githubusercontent.com/vorlie/iotas-notepad/master/images/main.png",
                },
                {
                  name: "Export Modal",
                  path: "https://raw.githubusercontent.com/vorlie/iotas-notepad/master/images/export.png",
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
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "https://placehold.co/600x400?text=Screenshot+Unavailable";
                        }}
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
                href="https://github.com/vorlie/iotas-notepad/blob/master/LICENSE"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between text-m3-on-surface-variant hover:text-m3-primary transition-colors group"
              >
                License{" "}
                <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                  MIT
                </span>
              </a>
              <a
                href="https://github.com/vorlie/iotas-notepad"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between text-m3-on-surface-variant hover:text-m3-primary transition-colors group"
              >
                Source{" "}
                <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                  GitHub
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
            Built with Electron, Bootstrap Icons, and community themes.
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

export default IotasNotepad;
