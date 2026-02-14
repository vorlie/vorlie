import { useParams } from "react-router-dom";
import GameFrame from "../components/obs/obsGameFrame";

function ObsGameFramePage() {
  const { discordId } = useParams<{ discordId: string }>();

  if (!discordId) {
    return <div>Invalid Discord ID</div>;
  }

  return (
    <div>
      <GameFrame discordId={discordId} />
    </div>
  );
}

export default ObsGameFramePage;
