import { useParams } from "react-router-dom";
import GameFrame from "../components/obs/obsGameFrame";

function ObsGameFrame() {
  const { discordId } = useParams<{ discordId: string }>();
  if (!discordId) return <div>Invalid Discord ID</div>;
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-m3-surface">
      <div className="w-full max-w-3xl bg-m3-surface-container rounded-none border border-m3-outline/10 shadow-[6px_6px_0px_0px_rgba(0,0,0,0.35)] p-4">
        <GameFrame discordId={discordId} />
      </div>
    </div>
  );
}

export default ObsGameFrame;
