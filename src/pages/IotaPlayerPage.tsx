import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  AudioLines,
  Database,
  Download,
  ExternalLink,
  Layers,
  Mic2,
  Shuffle,
  Sliders,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";
import "../styles/pages/iotaplayer.css";

export type IotaPlayerTab = "overview" | "download" | "changelog";

interface IotaPlayerPageProps {
  tab?: IotaPlayerTab;
}

const GITHUB_REPO = "https://github.com/vorlie/iotaplayer-rewrite";
const GITHUB_RELEASES = `${GITHUB_REPO}/releases`;

const FEATURES = [
  {
    title: "Dual Playback Engine",
    description:
      "Uses MPV over IPC for broad lossless/lossy format support, with an automatic Browser / Web Audio fallback featuring a 10-band parametric EQ and real-time spectrum visualizer.",
    Icon: AudioLines,
  },
  {
    title: "Word- & Line-Synchronized Lyrics",
    description:
      "Parses Lyricsfile 1.0 (.lyricsfile.yaml), Enhanced LRC, standard LRC, embedded SYLT/USLT/Vorbis tags, and plain .txt sidecars with click-to-word seeking.",
    Icon: Mic2,
  },
  {
    title: "Fisher–Yates Shuffle & History",
    description:
      "Exhaustive per-cycle shuffle backed by stable queue-entry IDs, true Previous/Next history navigation, and cycle-boundary Repeat All protection.",
    Icon: Shuffle,
  },
  {
    title: "Fast SQLite Library",
    description:
      "Local-first indexing of tracks, albums, artists, and artwork with multi-field search, drag-and-drop playlists, favorites, and per-track resume positions.",
    Icon: Database,
  },
  {
    title: "Immersive Now Playing",
    description:
      "Switch between a 3-pane resizable Now Playing workspace and a blurred-artwork Fullscreen overlay with Split, Artwork, and Lyrics focus modes.",
    Icon: Layers,
  },
  {
    title: "Desktop & OS Integration",
    description:
      "Race-free startup volume hydration, OS Media Session hardware key controls, single-instance focus handling, and Discord Rich Presence.",
    Icon: Sliders,
  },
];

const DOWNLOAD_TARGETS = [
  {
    platform: "Windows 10 / 11",
    arch: "x64",
    files: [
      "IotaPlayer-1.0.0-win32-x64-setup.exe",
      "IotaPlayer-win32-x64-1.0.0.zip",
    ],
    note: "Squirrel installer with Start Menu shortcut & uninstaller, plus portable zip.",
  },
  {
    platform: "macOS 12+",
    arch: "Apple Silicon (arm64) & Intel (x64)",
    files: [
      "IotaPlayer-1.0.0-mac-arm64.dmg",
      "IotaPlayer-1.0.0-mac-x64.dmg",
    ],
    note: "Drag-and-drop DMG bundles with pl.vorlie.iotaplayer bundle identity.",
  },
  {
    platform: "Linux",
    arch: "x64",
    files: [
      "IotaPlayer-1.0.0-linux-x64.AppImage",
      "IotaPlayer-1.0.0-linux-x64.deb",
    ],
    note: "Portable AppImage and Debian package with pl.vorlie.iotaplayer.desktop.",
  },
];

export default function IotaPlayerPage({ tab = "overview" }: IotaPlayerPageProps) {
  useEffect(() => {
    document.querySelector(".main-frame__content")?.scrollTo({ top: 0 });
  }, [tab]);

  return (
    <div className="page iotaplayer-page">
      <div>
        <Link to="/projects" className="button button--secondary">
          <ArrowLeft size={14} />
          Back to Projects
        </Link>
      </div>

      <header className="iotaplayer-hero">
        <div className="iotaplayer-hero__identity">
          <img
            src="/images/projects/iotaplayer.svg"
            alt="IotaPlayer icon"
            className="iotaplayer-hero__icon"
          />
          <div>
            <span className="iotaplayer-hero__eyebrow">Desktop Music Player · v1.0.0</span>
            <h1 className="iotaplayer-hero__title">IotaPlayer</h1>
            <p className="iotaplayer-hero__subtitle">
              A modern desktop music player focused on local music libraries,
              seamless playback, word-synchronized lyrics, and a native-feeling interface.
            </p>
          </div>
        </div>

        <div className="iotaplayer-hero__actions">
          <Link to="/projects/iotaplayer/download" className="button button--primary">
            <Download size={14} />
            Downloads
          </Link>
          <a
            href={GITHUB_REPO}
            target="_blank"
            rel="noopener noreferrer"
            className="button button--secondary"
          >
            <FaGithub />
            GitHub
            <ExternalLink size={13} />
          </a>
        </div>
      </header>

      <nav className="iotaplayer-tabs" aria-label="IotaPlayer sections">
        <Link
          to="/projects/iotaplayer"
          className={`filter-chip ${tab === "overview" ? "filter-chip--active" : ""}`}
        >
          Overview
        </Link>
        <Link
          to="/projects/iotaplayer/download"
          className={`filter-chip ${tab === "download" ? "filter-chip--active" : ""}`}
        >
          Download
        </Link>
        <Link
          to="/projects/iotaplayer/changelog"
          className={`filter-chip ${tab === "changelog" ? "filter-chip--active" : ""}`}
        >
          Changelog
        </Link>
      </nav>

      {tab === "overview" && (
        <>
          <section className="iotaplayer-grid">
            {FEATURES.map(({ title, description, Icon }) => (
              <article key={title} className="iotaplayer-card">
                <div className="iotaplayer-card__icon">
                  <Icon size={18} />
                </div>
                <h2>{title}</h2>
                <p>{description}</p>
              </article>
            ))}
          </section>

          <section className="iotaplayer-specs" aria-label="Technology stack">
            {[
              "Electron 44",
              "React 19",
              "TypeScript",
              "SQLite (better-sqlite3)",
              "MPV IPC",
              "Web Audio API",
              "Zustand",
              "pl.vorlie.iotaplayer",
            ].map((item) => (
              <span key={item} className="iotaplayer-spec-pill">
                {item}
              </span>
            ))}
          </section>
        </>
      )}

      {tab === "download" && (
        <>
          <div className="iotaplayer-note">
            <strong>Pre-release / Unsigned Notice:</strong> Initial builds are unsigned.
            Windows SmartScreen or macOS Gatekeeper may show an unrecognized-publisher prompt
            on first launch. Verify downloads against <code>SHA256SUMS.txt</code> on GitHub Releases.
            Installing <code>mpv</code> on your system <code>PATH</code> is recommended for full codec support.
          </div>

          <section className="iotaplayer-downloads">
            {DOWNLOAD_TARGETS.map((target) => (
              <article key={target.platform} className="iotaplayer-download-card">
                <div>
                  <h3>{target.platform}</h3>
                  <div className="iotaplayer-download-card__meta">{target.arch}</div>
                  <p style={{ marginTop: 10, fontSize: 13, color: "var(--color-text-secondary)", lineHeight: 1.55 }}>
                    {target.note}
                  </p>
                  <div className="iotaplayer-download-card__files" style={{ marginTop: 12 }}>
                    {target.files.map((file) => (
                      <span key={file}>{file}</span>
                    ))}
                  </div>
                </div>

                <a
                  href={GITHUB_RELEASES}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button button--primary"
                >
                  <Download size={14} />
                  Get on GitHub Releases
                </a>
              </article>
            ))}
          </section>
        </>
      )}

      {tab === "changelog" && (
        <section className="iotaplayer-changelog">
          <article className="iotaplayer-release">
            <div className="iotaplayer-release__header">
              <h2>v1.0.0-rc.1</h2>
              <span className="iotaplayer-release__date">2026-11-17</span>
            </div>
            <ul>
              <li>
                Added custom <strong>Harmonic Pillar</strong> cross-platform app icons
                (<code>.ico</code>, <code>.icns</code>, Linux PNG/SVG) and Windows AppUserModelID{" "}
                <code>pl.vorlie.iotaplayer</code>.
              </li>
              <li>
                Implemented word-level lyrics synchronization for <strong>Lyricsfile 1.0</strong>{" "}
                and <strong>Enhanced LRC</strong> with click-to-word seeking and zero-flicker rendering.
              </li>
              <li>
                Redesigned shuffle with a Fisher–Yates permutation deck, stable queue-entry IDs,
                and real <code>Previous</code>/<code>Next</code> playback history.
              </li>
              <li>
                Fixed <code>repeatMode === &apos;one&apos;</code> auto-resume on EOF and eliminated
                cold-launch startup volume spikes across MPV and Web Audio backends.
              </li>
              <li>
                Enforced single-instance locking, production Content Security Policy, transactional
                SQLite migrations, and automated cross-platform GitHub Actions releases.
              </li>
            </ul>
          </article>
        </section>
      )}
    </div>
  );
}
