import { useState, useEffect, useRef } from "react";
import {
  PresenceData,
  LanyardWebSocketMessage,
  LanyardHelloData,
  Activity,
} from "../types/lanyard";
import { extractImageUrl, getAvatarUrl } from "../utils/helpers";
import ActivityTimestamp from "./ActivityTimestamp";

const LANYARD_API_URL = "wss://api.lanyard.rest/socket";
const OP = {
  EVENT: 0,
  HELLO: 1,
  INITIALIZE: 2,
  HEARTBEAT: 3,
};

interface LanyardPresenceProps {
  discordId: string;
}

const statusTextColors: Record<PresenceData["discord_status"], string> = {
  online: "text-green-400",
  idle: "text-yellow-400",
  dnd: "text-red-400",
  offline: "text-gray-500",
};

function LanyardPresence({ discordId }: LanyardPresenceProps) {
  const [presenceData, setPresenceData] = useState<PresenceData | null>(null);
  const socket = useRef<WebSocket | null>(null);
  const heartbeatInterval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!discordId) return;
    const cleanup = () => {
      if (socket.current) {
        //socket.current.close();
        socket.current = null;
      }
      if (heartbeatInterval.current) {
        clearInterval(heartbeatInterval.current);
        heartbeatInterval.current = null;
      }
    };
    socket.current = new WebSocket(LANYARD_API_URL);
    socket.current.onopen = () => console.log("Lanyard WebSocket connected");
    socket.current.onmessage = (event) => {
      const data: LanyardWebSocketMessage = JSON.parse(event.data);
      switch (data.op) {
        case OP.HELLO: {
          if (heartbeatInterval.current)
            clearInterval(heartbeatInterval.current);
          const helloData = data.d as LanyardHelloData;
          heartbeatInterval.current = setInterval(() => {
            if (socket.current?.readyState === WebSocket.OPEN) {
              socket.current.send(JSON.stringify({ op: OP.HEARTBEAT }));
            }
          }, helloData.heartbeat_interval);
          if (socket.current) {
            socket.current.send(
              JSON.stringify({
                op: OP.INITIALIZE,
                d: { subscribe_to_id: discordId },
              })
            );
          }
          break;
        }
        case OP.EVENT:
          setPresenceData(data.d as PresenceData);
          break;
        default:
          break;
      }
    };
    socket.current.onerror = (error) => {
      console.error("Lanyard WebSocket error:", error);
      cleanup();
    };
    socket.current.onclose = (event) => {
      console.log(
        "Lanyard WebSocket closed:",
        event.reason,
        `Code: ${event.code}`
      );
      cleanup();
    };
    return cleanup;
  }, [discordId]);

  const renderActivity = (activity: Activity) => {
    const largeImageUrl = extractImageUrl(
      activity.assets?.large_image || "",
      activity.application_id || ""
    );
    const smallImageUrl = extractImageUrl(
      activity.assets?.small_image || "",
      activity.application_id || ""
    );
    const finalSmallImageUrl = smallImageUrl.endsWith("/images/default.png")
      ? null
      : smallImageUrl;

    return (
      <div
        key={activity.id || activity.name}
        className="bg-gray-700/50 rounded p-2"
      >
        {" "}
        <div className="flex items-center gap-3">
          {" "}
          {!largeImageUrl.endsWith("/images/default.png") && (
            <div className="relative flex-shrink-0">
              <img
                src={largeImageUrl}
                alt={activity.assets?.large_text || activity.name}
                className="w-10 h-10 rounded object-cover"
                title={activity.assets?.large_text || activity.name}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
              {finalSmallImageUrl && (
                <img
                  src={finalSmallImageUrl}
                  alt={activity.assets?.small_text || ""}
                  className="w-4 h-4 rounded-full absolute -bottom-1 -right-1 border-2 border-gray-700/50 bg-gray-700/50"
                  title={activity.assets?.small_text || ""}
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              )}
            </div>
          )}
          <div className="text-sm overflow-hidden flex-grow">
            {" "}
            <p
              className="font-semibold text-gray-100 truncate"
              title={activity.name}
            >
              {activity.name}
            </p>
            {activity.details && (
              <p className="text-gray-300 truncate" title={activity.details}>
                {activity.details}
              </p>
            )}
            {activity.state && (
              <p className="text-gray-400 truncate" title={activity.state}>
                {activity.state}
              </p>
            )}
          </div>
        </div>
        {activity.timestamps?.start && (
          <ActivityTimestamp
            startTime={activity.timestamps.start}
            endTime={activity.timestamps.end}
          />
        )}
      </div>
    );
  };

  if (!presenceData) {
    return (
      <div className="h-24 text-gray-500 animate-pulse">Ładuję status...</div>
    );
  }

  const { discord_status, activities, spotify, discord_user } = presenceData;
  const avatarUrl = getAvatarUrl(discord_user.id, discord_user.avatar);
  const customStatus = activities.find((act) => act.type === 4);
  const statusText =
    discord_status === "dnd"
      ? "Do not disturb"
      : discord_status.charAt(0).toUpperCase() + discord_status.slice(1);

  const otherActivities = activities.filter(
    (act) => act.type !== 4 && !(act.name === "Spotify" && spotify)
  );

  return (
    <div className="text-gray-100 max-w-lg mx-auto p-0">
      <div className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 mb-3 items-center">
        <img
          src={avatarUrl}
          alt={`Awatar ${discord_user.username}`}
          className="row-span-2 w-12 h-12 rounded-full self-center"
        />
        <p className="text-lg font-semibold truncate self-end leading-tight">
          {discord_user.global_name || discord_user.username}
        </p>
        <div className="text-sm text-gray-400 truncate self-start leading-tight">
          <span className={`${statusTextColors[discord_status]} font-medium`}>
            {statusText}
          </span>
          {customStatus && customStatus.state && (
            <span className="ml-2">
              {customStatus.emoji?.name} {customStatus.state}
            </span>
          )}
        </div>
      </div>
      <hr className="border-gray-700 my-3" />
      <div className="space-y-3 text-sm">
        {spotify && spotify.track_id && (
          <div className="bg-gray-700/50 rounded p-2">
            <div className="flex items-center gap-3">
              {spotify.album_art_url && (
                <img
                  src={spotify.album_art_url}
                  alt={`${spotify.album} cover`}
                  className="w-10 h-10 rounded flex-shrink-0"
                />
              )}
              <div className="flex-grow overflow-hidden">
                <p className="text-gray-300">
                  Listening to{" "}
                  <a
                    href={`https://open.spotify.com/track/${spotify.track_id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-400 hover:underline font-semibold break-words"
                    title={`Listen to ${spotify.song} by ${spotify.artist} on Spotify`}
                  >
                    {spotify.artist} - {spotify.song}
                  </a>
                </p>
                <p className="text-gray-400 text-xs truncate">
                  on {spotify.album}
                </p>
              </div>
            </div>
            {spotify.timestamps?.start && (
              <ActivityTimestamp
                startTime={spotify.timestamps.start}
                endTime={spotify.timestamps.end}
              />
            )}
          </div>
        )}
        {otherActivities.length > 0 && (
          <div className="space-y-2">{otherActivities.map(renderActivity)}</div>
        )}

        {!spotify && otherActivities.length === 0 && (
          <p className="text-gray-400 italic">No activities to show</p>
        )}
      </div>
    </div>
  );
}

export default LanyardPresence;