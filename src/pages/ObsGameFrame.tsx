import { useParams } from "react-router-dom";
import GameFrame from "../components/obs/obsGameFrame";

function ObsGameFrame() {
  const { discordId } = useParams<{ discordId: string }>();
  if (!discordId) return <div>Invalid Discord ID</div>;
  return (
    <GameFrame discordId={discordId} />
  );
}

export default ObsGameFrame;
