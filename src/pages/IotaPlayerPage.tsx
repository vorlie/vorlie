import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  ArrowLeft,
  AudioLines,
  Database,
  Download,
  ExternalLink,
  Gauge,
  Globe,
  Image as ImageIcon,
  Layers,
  Mic2,
  X,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";
import {
  FALLBACK_METADATA,
  fetchIotaPlayerData,
  formatBytes,
  getRawAssetUrl,
  GITHUB_RELEASES_URL,
  GITHUB_REPO_URL,
  groupReleaseAssets,
  type GitHubRelease,
  type IotaMetadata,
  type IotaScreenshot,
} from "../utils/iotaplayer";
import "../styles/pages/iotaplayer.css";

export type IotaPlayerTab = "overview" | "gallery" | "download" | "changelog";

interface IotaPlayerPageProps {
  tab?: IotaPlayerTab;
}

const HIGHLIGHT_ICONS: Record<string, typeof AudioLines> = {
  "playback-engine": AudioLines,
  "lyrics-engine": Mic2,
  "fullscreen-modes": Layers,
  "library-insights": Database,
  "low-performance-mode": Gauge,
  "desktop-integration": Globe,
};

const FALLBACK_DOWNLOAD_TARGETS = [
  {
    key: "windows" as const,
    platform: "Windows 10 / 11",
    arch: "x64",
    note: "Squirrel installer with Start Menu shortcut & uninstaller, plus portable zip.",
  },
  {
    key: "macos" as const,
    platform: "macOS 12+",
    arch: "Apple Silicon (arm64) & Intel (x64)",
    note: "Drag-and-drop DMG bundles with pl.vorlie.iotaplayer bundle identity.",
  },
  {
    key: "linux" as const,
    platform: "Linux",
    arch: "x64",
    note: "Portable AppImage and Debian package with pl.vorlie.iotaplayer.desktop.",
  },
];

export default function IotaPlayerPage({ tab = "overview" }: IotaPlayerPageProps) {
  const [metadata, setMetadata] = useState<IotaMetadata>(FALLBACK_METADATA);
  const [packageVersion, setPackageVersion] = useState<string | null>(null);
  const [releases, setReleases] = useState<GitHubRelease[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeShot, setActiveShot] = useState<IotaScreenshot | null>(null);

  useEffect(() => {
    document.querySelector(".main-frame__content")?.scrollTo({ top: 0 });
  }, [tab]);

  useEffect(() => {
    let cancelled = false;
    void fetchIotaPlayerData()
      .then((data) => {
        if (cancelled) return;
        setMetadata(data.metadata);
        setPackageVersion(data.packageVersion);
        setReleases(data.releases);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const latestRelease = releases[0] ?? null;
  const displayVersion =
    latestRelease?.tag_name ??
    (packageVersion ? `v${packageVersion}` : "Latest");
  const repoUrl = metadata.links?.github || GITHUB_REPO_URL;
  const releasesUrl = metadata.links?.releases || GITHUB_RELEASES_URL;
  const groupedAssets = latestRelease
    ? groupReleaseAssets(latestRelease.assets ?? [])
    : null;

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
            <span className="iotaplayer-hero__eyebrow">
              Desktop Music Player · {displayVersion}
            </span>
            <h1 className="iotaplayer-hero__title">{metadata.name}</h1>
            <p className="iotaplayer-hero__subtitle">{metadata.tagline}</p>
          </div>
        </div>

        <div className="iotaplayer-hero__actions">
          <Link to="/projects/iotaplayer/download" className="button button--primary">
            <Download size={14} />
            Downloads
          </Link>
          <a
            href={repoUrl}
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
          to="/projects/iotaplayer/gallery"
          className={`filter-chip ${tab === "gallery" ? "filter-chip--active" : ""}`}
        >
          Gallery
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
          {metadata.heroImage && (
            <section className="iotaplayer-preview">
              <img
                src={getRawAssetUrl(metadata.heroImage, metadata.repo)}
                alt={`${metadata.name} preview`}
                className="iotaplayer-preview__img"
              />
              <div className="iotaplayer-preview__footer">
                <span>{metadata.summary}</span>
                <Link to="/projects/iotaplayer/gallery" className="button button--secondary">
                  <ImageIcon size={14} />
                  View Gallery ({metadata.screenshots.length})
                </Link>
              </div>
            </section>
          )}

          <section className="iotaplayer-grid">
            {metadata.highlights.map((item) => {
              const Icon = HIGHLIGHT_ICONS[item.id] ?? AudioLines;
              return (
                <article key={item.id} className="iotaplayer-card">
                  <div className="iotaplayer-card__icon">
                    <Icon size={18} />
                  </div>
                  <h2>{item.title}</h2>
                  <p>{item.description}</p>
                </article>
              );
            })}
          </section>

          <section className="iotaplayer-specs" aria-label="Technology stack">
            {metadata.techStack.map((item) => (
              <span key={item} className="iotaplayer-spec-pill">
                {item}
              </span>
            ))}
          </section>
        </>
      )}

      {tab === "gallery" && (
        <section className="iotaplayer-gallery">
          {metadata.screenshots.map((shot) => (
            <button
              key={shot.path}
              type="button"
              className="iotaplayer-shot"
              onClick={() => setActiveShot(shot)}
            >
              <img
                src={getRawAssetUrl(shot.path, metadata.repo)}
                alt={shot.title}
                loading="lazy"
              />
              <strong>{shot.title}</strong>
              <span>{shot.caption}</span>
            </button>
          ))}
        </section>
      )}

      {tab === "download" && (
        <>
          <div className="iotaplayer-note">
            <strong>Pre-release / Unsigned Notice:</strong> Initial builds are unsigned.
            Windows SmartScreen or macOS Gatekeeper may show an unrecognized-publisher prompt
            on first launch.
            {groupedAssets?.checksums ? (
              <>
                {" "}
                Verify downloads against{" "}
                <a
                  href={groupedAssets.checksums.browser_download_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <code>{groupedAssets.checksums.name}</code>
                </a>
                .
              </>
            ) : (
              <>
                {" "}
                Verify downloads against <code>SHA256SUMS.txt</code> on GitHub Releases.
              </>
            )}{" "}
            Installing <code>mpv</code> on your system <code>PATH</code> is recommended for full
            codec support.
          </div>

          <section className="iotaplayer-downloads">
            {FALLBACK_DOWNLOAD_TARGETS.map((target) => {
              const assets = groupedAssets?.[target.key] ?? [];
              return (
                <article key={target.platform} className="iotaplayer-download-card">
                  <div>
                    <h3>{target.platform}</h3>
                    <div className="iotaplayer-download-card__meta">
                      {target.arch}
                      {latestRelease ? ` · ${latestRelease.tag_name}` : ""}
                    </div>
                    <p
                      style={{
                        marginTop: 10,
                        fontSize: 13,
                        color: "var(--color-text-secondary)",
                        lineHeight: 1.55,
                      }}
                    >
                      {target.note}
                    </p>

                    {assets.length > 0 && (
                      <div className="iotaplayer-asset-links">
                        {assets.map((asset) => (
                          <a
                            key={asset.name}
                            href={asset.browser_download_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="iotaplayer-asset-link"
                          >
                            <span>{asset.name}</span>
                            <span>{formatBytes(asset.size)}</span>
                          </a>
                        ))}
                      </div>
                    )}
                  </div>

                  <a
                    href={latestRelease?.html_url ?? releasesUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button button--primary"
                  >
                    <Download size={14} />
                    {assets.length > 0 ? "Release Page" : "Get on GitHub Releases"}
                  </a>
                </article>
              );
            })}
          </section>
        </>
      )}

      {tab === "changelog" && (
        <section className="iotaplayer-changelog">
          {loading && releases.length === 0 ? (
            <div className="iotaplayer-note">Loading releases from GitHub…</div>
          ) : releases.length > 0 ? (
            releases.map((release) => (
              <article key={release.id} className="iotaplayer-release">
                <div className="iotaplayer-release__header">
                  <h2>
                    <a
                      href={release.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "inherit", textDecoration: "none" }}
                    >
                      {release.name || release.tag_name}
                    </a>
                  </h2>
                  <span className="iotaplayer-release__date">
                    {release.published_at?.slice(0, 10)}
                  </span>
                </div>
                <div className="iotaplayer-markdown">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {release.body || "_No release notes provided._"}
                  </ReactMarkdown>
                </div>
              </article>
            ))
          ) : (
            <div className="iotaplayer-note">
              Unable to load live releases right now.{" "}
              <a href={releasesUrl} target="_blank" rel="noopener noreferrer">
                View all releases on GitHub
              </a>
              .
            </div>
          )}
        </section>
      )}

      {activeShot && (
        <div
          className="iotaplayer-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={activeShot.title}
          onClick={() => setActiveShot(null)}
        >
          <div
            className="iotaplayer-lightbox__dialog"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="iotaplayer-lightbox__meta">
              <div>
                <strong>{activeShot.title}</strong>
                <div style={{ fontSize: 12.5, color: "var(--color-text-secondary)" }}>
                  {activeShot.caption}
                </div>
              </div>
              <button
                type="button"
                className="button button--secondary"
                onClick={() => setActiveShot(null)}
                aria-label="Close preview"
              >
                <X size={14} />
              </button>
            </div>
            <img
              src={getRawAssetUrl(activeShot.path, metadata.repo)}
              alt={activeShot.title}
            />
          </div>
        </div>
      )}
    </div>
  );
}
