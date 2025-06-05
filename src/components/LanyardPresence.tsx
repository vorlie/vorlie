import { useState, useEffect, useRef } from "react";
import {
  PresenceData,
  LanyardWebSocketMessage,
  LanyardHelloData,
  Activity,
} from "../types/lanyard";
import { extractImageUrl, getAvatarUrl } from "../utils/helpers";
import ActivityTimestamp from "./ActivityTimestamp";
import MarqueeText from "./MarqueeText";
import { FaSpotify } from "react-icons/fa";

declare global {
  interface Window {
    twemoji: {
      parse: (input: string) => string;
    };
  }
}

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
    return <div className="h-24 text-gray-500 animate-pulse">Loading...</div>;
  }

  const { discord_status, activities, spotify, discord_user } = presenceData;
  const avatarUrl = getAvatarUrl(discord_user.id, discord_user.avatar);
  const decorationAsset = discord_user.avatar_decoration_data?.asset;
  const decorationUrl = `https://cdn.discordapp.com/avatar-decoration-presets/${decorationAsset}.png`;
  const clanIconUrl = `https://cdn.discordapp.com/clan-badges/${discord_user.clan?.identity_guild_id}/${discord_user.clan?.badge}.png?size=16`;
  const customStatus = activities.find((act) => act.type === 4);
  const statusText =
    discord_status === "dnd"
      ? "Do not disturb"
      : discord_status.charAt(0).toUpperCase() + discord_status.slice(1);

  const otherActivities = activities.filter(
    (act) => act.type !== 4 && !(act.name === "Spotify" && spotify)
  );

  return (
    <div className="">
      <img
        src="https://us-east-1.tixte.net/uploads/cx.tixte.co/banner.gif"
        alt="User Banner"
        className="rounded w-full h-24 object-cover [-webkit-mask-image:linear-gradient(to_right,rgba(0,0,0,0)_0%,rgba(0,0,0,1)_90%)] [mask-image:linear-gradient(to_right,rgba(0,0,0,0)_0%,rgba(0,0,0,1)_90%)]"
      />

      <div className="relative">
        <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 mb-3 items-start mt-[-5rem] overflow-hidden">
          <div className="relative row-span-2 self-start w-16 h-16rounded-full">
            {" "}
            <img
              src={avatarUrl}
              alt={`${discord_user.username}'s Avatar`}
              className="w-full h-full rounded-full object-cover"
            />
            <img
              src={decorationUrl}
              alt="Avatar Decoration"
              className="absolute inset-0 w-full h-full pointer-events-none transform scale-[1.20]"
            />
          </div>

          <p className="text-lg font-semibold flex items-center self-center leading-tight">
            <span
              className="truncate"
              title={discord_user.global_name || discord_user.username}
            >
              {discord_user.global_name || discord_user.username}
            </span>

            {discord_user.clan && clanIconUrl && (
              <span className="ml-2 flex items-center bg-gray-900/50 rounded px-2 py-0.5 text-sm font-normal whitespace-nowrap">
                {" "}
                <img
                  src={clanIconUrl}
                  alt={`${discord_user.clan.tag} Clan Icon`}
                  className="h-4 w-4 mr-1 object-contain"
                />
                <span className="font-medium bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-[length:200%_auto] bg-clip-text text-transparent">
                  {" "}
                  {discord_user.clan.tag}
                </span>
              </span>
            )}
          </p>

          <div className="text-sm text-gray-400 truncate self-start leading-tight bg-gray-900/50 rounded px-2 py-1 mr-2">
            <span className={`${statusTextColors[discord_status]} font-medium`}>
              {statusText}
            </span>
            {customStatus && customStatus.state && (
              <MarqueeText className="max-w-[10rem]" title={customStatus.state}>
                {customStatus.emoji?.id ? (
                  <img
                    src={`https://cdn.discordapp.com/emojis/${
                      customStatus.emoji.id
                    }.webp?size=32&animated=${
                      customStatus.emoji.animated ? "true" : "false"
                    }`}
                    alt={customStatus.emoji.name}
                    className="inline h-5 align-text-bottom mr-1"
                    title={customStatus.emoji.name}
                  />
                ) : customStatus.emoji?.name ? (
                  <span
                    className="mr-1 inline-block align-text-bottom"
                    ref={(el) => {
                      if (el && window.twemoji) {
                        el.innerHTML = window.twemoji.parse(
                          customStatus.emoji?.name ?? ""
                        );
                      }
                    }}
                  >
                  </span>
                ) : null}
                {customStatus.state}
              </MarqueeText>
            )}
          </div>
        </div>
        <hr className="border-transparent my-4" />{" "}
        <div className="space-y-2 text-sm">
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
                  <a
                    href={`https://open.spotify.com/track/${spotify.track_id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-400 font-semibold break-words block truncate"
                    title={`Listen to ${spotify.song} by ${spotify.artist} on Spotify`}
                  >
                    <span className="inline-flex items-center gap-1 hover:underline">
                      <FaSpotify size={16} color="currentColor" />
                      {spotify.song}
                    </span>
                  </a>
                  <p
                    className="text-gray-400 text-xs truncate"
                    title={spotify.artist}
                  >
                    by {spotify.artist}
                  </p>
                  <p
                    className="text-gray-400 text-xs truncate"
                    title={spotify.album}
                  >
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
            <div className="space-y-4">
              {otherActivities.map(renderActivity)}
            </div>
          )}

          {!spotify && otherActivities.length === 0 && !customStatus && (
            <p className="text-gray-400 italic">No current activities</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default LanyardPresence;
