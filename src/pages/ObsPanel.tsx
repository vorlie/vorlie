import { useParams } from "react-router-dom";
import ObsSpotify from "../components/obs/obsLanyard";

function ObsPanel() {
  const { discordId } = useParams<{ discordId: string }>();

  if (!discordId) {
    return <div>Invalid Discord ID</div>;
  }

  return (
    <div>
      <ObsSpotify discordId={discordId} />
    </div>
  );
}

export default ObsPanel;
