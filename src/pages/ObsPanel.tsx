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
    <div>
      <ObsSpotify discordId={discordId} theme={theme} animate={animate} />
    </div>
  );
}


export default ObsPanel;
