import { useParams, useSearchParams } from "react-router-dom";
import ObsCameraFrame from "../components/obs/obsCameraFrame";

function ObsGameFramePage() {
  const { discordId } = useParams<{ discordId: string }>();
  const [searchParams] = useSearchParams();

  if (!discordId) return <div>Invalid Discord ID</div>;

  // Which widget to render: "camframe" (default) or "glow" (game frame)
  const type = searchParams.get("type") ?? "camframe";

  if (type === "glow") {
    // Lazy import in case this grows
    return null; // handled by ObsGlow route
  }

  return (
    <ObsCameraFrame discordId={discordId} />
  );
}

export default ObsGameFramePage;
