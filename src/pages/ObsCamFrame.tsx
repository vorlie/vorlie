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
    <div className="min-h-screen flex items-center justify-center p-6 bg-m3-surface">
      <div className="w-full max-w-2xl bg-m3-surface-container rounded-none border border-m3-outline/10 shadow-[6px_6px_0px_0px_rgba(0,0,0,0.35)] p-4">
        <ObsCameraFrame discordId={discordId} />
      </div>
    </div>
  );
}

export default ObsGameFramePage;
