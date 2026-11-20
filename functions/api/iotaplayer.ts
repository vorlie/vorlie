const REPO_OWNER = "vorlie";
const REPO_NAME = "iotaplayer-rewrite";
const RAW_BASE = `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/main`;
const RELEASES_URL = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/releases?per_page=10`;

const GITHUB_HEADERS = {
  Accept: "application/vnd.github+json",
  "User-Agent": "vorlie-website",
};

export const onRequest = async () => {
  try {
    const [metadataRes, pkgRes, releasesRes] = await Promise.all([
      fetch(`${RAW_BASE}/metadata.json`, { headers: GITHUB_HEADERS }),
      fetch(`${RAW_BASE}/package.json`, { headers: GITHUB_HEADERS }),
      fetch(RELEASES_URL, { headers: GITHUB_HEADERS }),
    ]);

    const metadata = metadataRes.ok ? await metadataRes.json() : null;
    const pkg = pkgRes.ok ? ((await pkgRes.json()) as { version?: string }) : null;
    const rawReleases = releasesRes.ok ? ((await releasesRes.json()) as unknown[]) : [];
    const releases = Array.isArray(rawReleases)
      ? rawReleases.filter((r: any) => r && !r.draft)
      : [];

    return new Response(
      JSON.stringify({
        metadata,
        packageVersion: pkg?.version ?? null,
        releases,
      }),
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Cache-Control": "public, max-age=300, s-maxage=300",
        },
      },
    );
  } catch {
    return new Response(
      JSON.stringify({ error: "Failed to fetch IotaPlayer metadata" }),
      {
        status: 502,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
};
