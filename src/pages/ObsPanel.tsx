import { useParams, useSearchParams } from "react-router-dom";
import ObsSpotify, { SpotifyTheme } from "../components/obs/obsLanyard";

function ObsPanel() {
  const { discordId } = useParams<{ discordId: string }>();
  const [searchParams] = useSearchParams();

  const theme = (searchParams.get("theme") as SpotifyTheme) || "badge";
  const animate = searchParams.get("motion") !== "false";

  if (!discordId) {
    return <div>Invalid Discord ID</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-m3-surface">
      <div className="w-full max-w-3xl bg-m3-surface-container rounded-none border border-m3-outline/10 shadow-[6px_6px_0px_0px_rgba(0,0,0,0.35)] p-4">
        <ObsSpotify discordId={discordId} theme={theme} animate={animate} />
      </div>
    </div>
  );
}

export default ObsPanel;
