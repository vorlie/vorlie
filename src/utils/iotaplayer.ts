export interface IotaHighlight {
  id: string;
  title: string;
  description: string;
}

export interface IotaScreenshot {
  path: string;
  title: string;
  caption: string;
  category?: string;
}

export interface IotaMetadata {
  schemaVersion: number;
  id: string;
  name: string;
  tagline: string;
  summary: string;
  status: string;
  category: string;
  accentColor: string;
  platforms: string[];
  languages: string[];
  repo: {
    owner: string;
    name: string;
    branch: string;
  };
  links: {
    github: string;
    releases: string;
    docs?: string;
    platformSupport?: string;
    notices?: string;
  };
  techStack: string[];
  requirements?: {
    optionalDependencies?: Array<{
      name: string;
      purpose: string;
    }>;
  };
  highlights: IotaHighlight[];
  heroImage: string;
  screenshots: IotaScreenshot[];
}

export interface GitHubReleaseAsset {
  name: string;
  size: number;
  browser_download_url: string;
  download_count: number;
}

export interface GitHubRelease {
  id: number;
  tag_name: string;
  name: string;
  published_at: string;
  prerelease: boolean;
  draft: boolean;
  html_url: string;
  body: string;
  assets: GitHubReleaseAsset[];
}

export interface IotaLiveData {
  metadata: IotaMetadata;
  packageVersion: string | null;
  releases: GitHubRelease[];
}

export const GITHUB_REPO_URL = "https://github.com/vorlie/iotaplayer-rewrite";
export const GITHUB_RELEASES_URL = `${GITHUB_REPO_URL}/releases`;

export const FALLBACK_METADATA: IotaMetadata = {
  schemaVersion: 1,
  id: "iotaplayer",
  name: "IotaPlayer",
  tagline:
    "A local-first desktop music player with MPV playback, word-level lyrics, and an intentional dark interface.",
  summary:
    "IotaPlayer indexes your local audio library into SQLite and pairs native MPV playback (with an automatic Web Audio fallback) with word- and line-synchronized lyrics, a 10-band parametric equalizer, speed and pitch presets, smart playlists, library statistics, and Discord Rich Presence.",
  status: "active",
  category: "desktop-app",
  accentColor: "#ffa7a7",
  platforms: ["windows", "macos", "linux"],
  languages: ["en", "pl"],
  repo: {
    owner: "vorlie",
    name: "iotaplayer-rewrite",
    branch: "main",
  },
  links: {
    github: GITHUB_REPO_URL,
    releases: GITHUB_RELEASES_URL,
    docs: "docs/README.md",
    platformSupport: "docs/PLATFORM-SUPPORT.md",
    notices: "THIRD_PARTY_NOTICES.md",
  },
  techStack: [
    "Electron",
    "React 19",
    "TypeScript",
    "SQLite",
    "MPV",
    "Web Audio API",
    "Zustand",
    "Vite",
  ],
  highlights: [
    {
      id: "playback-engine",
      title: "Dual Playback Engine & Speed Presets",
      description:
        "Plays through MPV over IPC with an automatic Web Audio fallback, 10-band parametric EQ, live spectrum visualizer, and Nightcore/Daycore/Slowed speed & pitch presets.",
    },
    {
      id: "lyrics-engine",
      title: "Word- & Line-Synchronized Lyrics",
      description:
        "Supports Lyricsfile 1.0, Enhanced LRC, standard LRC, embedded tags, and plain sidecars with word-level highlighting, click-to-seek, and instrumental gap indicators.",
    },
    {
      id: "fullscreen-modes",
      title: "Classic & Still Fullscreen Modes",
      description:
        "Switch between the 3-pane Now Playing workspace and Fullscreen Now Playing in Classic (blurred cover backdrop) or Still (ambient dark-glass mesh with film grain) styles.",
    },
    {
      id: "library-insights",
      title: "SQLite Library, Smart Playlists & Stats",
      description:
        "Fast local indexing with Hi-Res/Lossless quality badges, Track File Inspector, rule-based Smart Playlists (ALL/ANY), and SQL-aggregated Library Format Statistics.",
    },
    {
      id: "low-performance-mode",
      title: "Low Performance Mode",
      description:
        "Optional reduced-effects mode that disables glass blurs, ambient shaders, and visualizer loops and falls back to line-level lyrics to save GPU headroom while gaming.",
    },
    {
      id: "desktop-integration",
      title: "Localization & OS Integration",
      description:
        "Full English and Polish UI with system locale detection, hardware media key support via OS Media Session, and Discord Rich Presence.",
    },
  ],
  heroImage: "docs/images/nowplaying-page.png",
  screenshots: [
    {
      path: "docs/images/nowplaying-page.png",
      title: "Now Playing Workspace",
      caption:
        "3-pane Now Playing view with synchronized lyrics, artwork, and resizable Up Next queue.",
      category: "player",
    },
    {
      path: "docs/images/fullscreen-still.png",
      title: "Fullscreen — Still Ambient Style",
      caption:
        "Editorial dark-glass Still ambient backdrop with subtle film grain.",
      category: "fullscreen",
    },
    {
      path: "docs/images/fullscreen-classic.png",
      title: "Fullscreen — Classic Style",
      caption:
        "Classic blurred album-art backdrop with Split, Artwork, and Lyrics modes.",
      category: "fullscreen",
    },
  ],
};

export function getRawAssetUrl(
  path: string,
  repo: { owner: string; name: string; branch: string } = FALLBACK_METADATA.repo,
): string {
  return `https://raw.githubusercontent.com/${repo.owner}/${repo.name}/${repo.branch}/${path.replace(/^\/+/, "")}`;
}

export function formatBytes(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes <= 0) return "";
  const mb = bytes / (1024 * 1024);
  if (mb >= 1) return `${mb.toFixed(1)} MB`;
  return `${Math.round(bytes / 1024)} KB`;
}

export function groupReleaseAssets(assets: GitHubReleaseAsset[]) {
  const windows: GitHubReleaseAsset[] = [];
  const macos: GitHubReleaseAsset[] = [];
  const linux: GitHubReleaseAsset[] = [];
  let checksums: GitHubReleaseAsset | null = null;

  for (const asset of assets) {
    const lower = asset.name.toLowerCase();
    if (lower.includes("sha256")) {
      checksums = asset;
    } else if (lower.endsWith(".exe") || lower.includes("win32") || lower.includes("windows")) {
      windows.push(asset);
    } else if (lower.endsWith(".dmg") || lower.includes("mac") || lower.includes("darwin")) {
      macos.push(asset);
    } else if (
      lower.endsWith(".appimage") ||
      lower.endsWith(".deb") ||
      lower.endsWith(".rpm") ||
      lower.includes("linux")
    ) {
      linux.push(asset);
    }
  }

  return { windows, macos, linux, checksums };
}

export async function fetchIotaPlayerData(): Promise<IotaLiveData> {
  // Try Cloudflare Pages Function first (production / wrangler)
  try {
    const res = await fetch("/api/iotaplayer");
    if (res.ok) {
      const contentType = res.headers.get("content-type") ?? "";
      if (contentType.includes("application/json")) {
        const data = (await res.json()) as {
          metadata?: IotaMetadata | null;
          packageVersion?: string | null;
          releases?: GitHubRelease[];
        };
        return {
          metadata: data.metadata ?? FALLBACK_METADATA,
          packageVersion: data.packageVersion ?? null,
          releases: Array.isArray(data.releases) ? data.releases : [],
        };
      }
    }
  } catch {
    // Fall back to direct GitHub fetch in local Vite dev
  }

  const rawBase = `https://raw.githubusercontent.com/${FALLBACK_METADATA.repo.owner}/${FALLBACK_METADATA.repo.name}/${FALLBACK_METADATA.repo.branch}`;
  const releasesUrl = `https://api.github.com/repos/${FALLBACK_METADATA.repo.owner}/${FALLBACK_METADATA.repo.name}/releases?per_page=10`;

  const [metaRes, pkgRes, relRes] = await Promise.allSettled([
    fetch(`${rawBase}/metadata.json`),
    fetch(`${rawBase}/package.json`),
    fetch(releasesUrl, { headers: { Accept: "application/vnd.github+json" } }),
  ]);

  const metadata =
    metaRes.status === "fulfilled" && metaRes.value.ok
      ? ((await metaRes.value.json()) as IotaMetadata)
      : FALLBACK_METADATA;

  const pkg =
    pkgRes.status === "fulfilled" && pkgRes.value.ok
      ? ((await pkgRes.value.json()) as { version?: string })
      : null;

  const rawReleases =
    relRes.status === "fulfilled" && relRes.value.ok
      ? ((await relRes.value.json()) as GitHubRelease[])
      : [];

  return {
    metadata,
    packageVersion: pkg?.version ?? null,
    releases: Array.isArray(rawReleases) ? rawReleases.filter((r) => !r.draft) : [],
  };
}
