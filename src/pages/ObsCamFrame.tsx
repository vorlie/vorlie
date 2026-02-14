import { useParams } from "react-router-dom";
import PixelCamBorder from "../components/obs/obsCameraFrame";

function ObsGameFramePage() {
  const { discordId } = useParams<{ discordId: string }>();

  if (!discordId) {
    return <div>Invalid Discord ID</div>;
  }

  return (
    <div>
      <PixelCamBorder discordId={discordId} />
    </div>
  );
}

export default ObsGameFramePage;
