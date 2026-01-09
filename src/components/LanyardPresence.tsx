import { useState, useEffect, useRef } from "react";
import {
  PresenceData,
  LanyardWebSocketMessage,
  LanyardHelloData,
  Activity,
} from "../types/lanyard";
import {
  extractImageUrl,
  getAvatarUrl,
  getFontClass,
  getEffectClass,
  getBannerUrl,
  getReadableColor,
} from "../utils/helpers";
import ActivityTimestamp from "./ActivityTimestamp";
import MarqueeText from "./MarqueeText";
import { FaSpotify, FaGamepad, FaHeadphones, FaVideo, FaTrophy } from "react-icons/fa";
import useDominantColor from "../hooks/useDominantColor";
import { LANYARD_THEMES, LanyardTheme } from "../data/lanyardThemes";

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

const statusPulseColors: Record<PresenceData["discord_status"], string> = {
  online: "74, 222, 128", // green-400
  idle: "250, 204, 21", // yellow-400
  dnd: "248, 113, 113", // red-400
  offline: "107, 114, 128", // gray-500
};

const statusBgColors: Record<PresenceData["discord_status"], string> = {
  online: "bg-green-400",
  idle: "bg-yellow-400",
  dnd: "bg-red-400",
  offline: "bg-gray-500",
};

function LanyardPresence({ discordId }: LanyardPresenceProps) {
  const [presenceData, setPresenceData] = useState<PresenceData | null>(null);
  const [bannerUrl, setBannerUrl] = useState<string | null>(null);
  const socket = useRef<WebSocket | null>(null);
  const heartbeatInterval = useRef<NodeJS.Timeout | null>(null);
  const spotifyColor = useDominantColor(presenceData?.spotify?.album_art_url || null);
  const readableSpotifyColor = getReadableColor(spotifyColor);

  useEffect(() => {
    if (!discordId) return;
    const cleanup = () => {
      if (socket.current) {
        socket.current.onclose = null;
        socket.current.onerror = null;
        socket.current.onmessage = null;
        socket.current.onopen = null;
        socket.current.close();
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
          if (socket.current && socket.current.readyState === WebSocket.OPEN) {
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
    socket.current.onerror = () => {
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

  useEffect(() => {
    if (discordId) {
      getBannerUrl(discordId).then((url) => {
        if (url) setBannerUrl(url);
      });
    }
  }, [discordId]);



  if (!presenceData) {
    return <div className="h-24 text-gray-500 animate-pulse">Loading...</div>;
  }

  const { discord_status, activities, spotify, discord_user } = presenceData;

  const displayNameStyles = discord_user.display_name_styles;
  const effectId = displayNameStyles?.effect_id;
  const fontId = displayNameStyles?.font_id;
  const fontClass = getFontClass(fontId);
  const effectClass = getEffectClass(effectId);
  const displayName = discord_user.global_name || discord_user.username;

  const avatarUrl = getAvatarUrl(discord_user.id, discord_user.avatar);
  const decorationAsset = discord_user.avatar_decoration_data?.asset;
  const decorationUrl = `https://cdn.discordapp.com/avatar-decoration-presets/${decorationAsset}.png`;
  const clanIconUrl = `https://cdn.discordapp.com/clan-badges/${discord_user.primary_guild?.identity_guild_id}/${discord_user.primary_guild?.badge}.png?size=16`;
  const customStatus = activities.find((act) => act.type === 4);
  
  const statusText =
    discord_status === "dnd"
      ? "Do not disturb"
      : discord_status.charAt(0).toUpperCase() + discord_status.slice(1);

  const getTheme = (act: Activity): LanyardTheme => {
    if (LANYARD_THEMES[act.name]) return LANYARD_THEMES[act.name];
    if (act.platform === "xbox") return LANYARD_THEMES["Xbox"];

    let label = "Playing";
    let icon = FaGamepad;

    switch (act.type) {
      case 1: // Streaming
        label = "Streaming";
        break;
      case 2: // Listening
        label = "Listening to";
        icon = FaHeadphones;
        break;
      case 3: // Watching
        label = "Watching";
        icon = FaVideo;
        break;
      case 5: // Competing
        label = "Competing in";
        icon = FaTrophy;
        break;
    }

    return {
      name: "",
      label,
      color: "text-gray-300",
      pulseColor: "156, 163, 175",
      bgClass: "bg-gray-800/50",
      borderClass: "border-gray-700/50",
      textClass: "text-gray-300",
      icon,
    };
  };

  const themedActivities = activities
    .filter((act) => act.type !== 4 && !(act.name === "Spotify" && spotify))
    .map((act) => ({
      activity: act,
      theme: getTheme(act),
    }));

  const usernameElement = (
    <div className="text-lg font-semibold flex items-center self-center leading-tight">
      {effectClass ? (
        <div className={effectClass}>
          <span className="glow-layer" aria-hidden="true">
            {displayName}
          </span>

          <span className={`text-layer ${fontClass}`}>
            <span className="truncate" title={displayName}>
              {displayName}
            </span>
          </span>
        </div>
      ) : (
        <span className="truncate" title={displayName}>
          {displayName}
        </span>
      )}

      {discord_user.primary_guild && clanIconUrl && (
        <span className="ml-2 flex items-center bg-gray-900/50 rounded px-2 py-0.5 text-sm font-normal whitespace-nowrap">
          {" "}
          <img
            src={clanIconUrl}
            alt={`${discord_user.primary_guild.tag} Clan Icon`}
            className="h-4 w-4 mr-1 object-contain"
          />
          <span className="font-medium bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-[length:200%_auto] bg-clip-text text-transparent">
            {" "}
            {discord_user.primary_guild.tag}
          </span>
        </span>
      )}
    </div>
  );

  return (
    <div className="">
      <img
        src={bannerUrl || "https://us-east-1.tixte.net/uploads/cx.tixte.co/banner.gif"}
        alt="User Banner"
        className="rounded w-full h-24 object-cover [-webkit-mask-image:linear-gradient(to_right,rgba(0,0,0,0)_00%,rgba(0,0,0,1)_90%)] [mask-image:linear-gradient(to_right,rgba(0,0,0,0)_00%,rgba(0,0,0,1)_90%)]"
      />

      <div className="relative">
        <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 mb-3 items-start mt-[-5rem]">
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

          {usernameElement}

          <div className="text-sm text-gray-400 truncate self-start leading-tight bg-gray-900/50 rounded px-2 py-1 mr-2 flex items-center gap-2">
            <div className="relative flex items-center justify-center w-2 h-2">
              <div
                className={`absolute inset-0 rounded-full status-indicator-pulse`}
                style={
                  {
                    "--pulse-color": statusPulseColors[discord_status],
                  } as React.CSSProperties
                }
              ></div>
              <div
                className={`relative w-2 h-2 rounded-full ${statusBgColors[discord_status]}`}
              ></div>
            </div>
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
                  ></span>
                ) : null}
                {customStatus.state}
              </MarqueeText>
            )}
          </div>
        </div>
        <hr className="border-transparent my-4" />{" "}
        <div className="space-y-2 text-sm">
          {spotify && spotify.track_id && (
            <div
              className="rounded p-2 transition-colors duration-500 relative overflow-hidden group"
              style={{
                backgroundColor: spotifyColor
                  ? `rgba(${spotifyColor[0]}, ${spotifyColor[1]}, ${spotifyColor[2]}, 0.4)`
                  : "oklch(0.60 0.06 227)", // Default gray-700/50 equivalent
                border: `1px solid ${
                  spotifyColor
                    ? `rgba(${spotifyColor[0]}, ${spotifyColor[1]}, ${spotifyColor[2]}, 0.6)`
                    : "transparent"
                }`,
              }}
            >
              {/* Blurred Background Layer */}
              {spotify.album_art_url && (
                <div
                  className="absolute inset-0 z-0 pointer-events-none transition-transform duration-700 group-hover:scale-110"
                  style={{
                    backgroundImage: `url(${spotify.album_art_url})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    filter: "blur(20px) brightness(0.5)",
                    opacity: 0.4,
                    transform: "scale(1.2)",
                  }}
                />
              )}

              <div className="flex items-center gap-3 relative z-10">
                {spotify.album_art_url && (
                  <img
                    src={spotify.album_art_url}
                    alt={`${spotify.album} cover`}
                    className="w-14 h-14 rounded flex-shrink-0"
                  />
                )}
                <div className="flex-grow overflow-hidden">
                  <a
                    href={`https://open.spotify.com/track/${spotify.track_id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold break-words block truncate"
                    style={{
                      color: readableSpotifyColor
                        ? `rgba(${readableSpotifyColor[0]}, ${readableSpotifyColor[1]}, ${readableSpotifyColor[2]}, 1)`
                        : "oklch(0.77 0.055 227)",
                    }}
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
                  color={
                    readableSpotifyColor
                      ? `rgba(${readableSpotifyColor[0]}, ${readableSpotifyColor[1]}, ${readableSpotifyColor[2]}, 1)`
                      : undefined
                  }
                  colorSecondary={
                    spotifyColor
                      ? `rgba(${spotifyColor[0]}, ${spotifyColor[1]}, ${spotifyColor[2]}, 0.4)`
                      : undefined
                  }
                />
              )}
            </div>
          )}

          {themedActivities.length > 0 && (
            <div className="space-y-2">
              {themedActivities.map(({ activity, theme }) => (
                <div
                  key={activity.id || activity.name}
                  className={`${theme.bgClass} border ${theme.borderClass} rounded p-2`}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative flex-shrink-0">
                      {activity.assets?.large_image ? (
                        <img
                          src={extractImageUrl(
                            activity.assets.large_image,
                            activity.application_id || ""
                          )}
                          alt={activity.name}
                          className="w-14 h-14 rounded object-cover"
                        />
                      ) : (
                        <div
                          className={`w-14 h-14 rounded flex items-center justify-center`}
                          style={{ backgroundColor: `rgba(${theme.pulseColor}, 0.2)` }}
                        >
                          <theme.icon size={32} className={theme.textClass} />
                        </div>
                      )}
                      {activity.assets?.small_image && (
                        <img
                          src={extractImageUrl(
                            activity.assets.small_image,
                            activity.application_id || ""
                          )}
                          alt="Small asset"
                          className="w-5 h-5 rounded-full absolute -bottom-1 -right-1 border-2 border-gray-900"
                        />
                      )}
                    </div>
                    <div className="flex-grow overflow-hidden">
                      <p
                        className={`${theme.textClass} font-semibold truncate flex items-center gap-2`}
                      >
                        <theme.icon /> {theme.label} {theme.name}
                      </p>
                      <p className="text-gray-100 font-medium truncate">
                        {activity.name}
                      </p>
                      {activity.details && (
                        <p className="text-gray-300 text-xs truncate">
                          {activity.details}
                        </p>
                      )}
                      {activity.state && (
                        <p className="text-gray-400 text-xs truncate">
                          {activity.state}
                        </p>
                      )}
                      {theme.repoUrl && (
                        <a
                          href={theme.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`text-xs ${theme.textClass} border ${theme.borderClass} px-2 py-0.5 rounded-full mt-1 inline-block hover:opacity-80 transition-opacity`}
                        >
                          View Repository
                        </a>
                      )}
                    </div>
                  </div>
                  {activity.timestamps?.start && (
                    <ActivityTimestamp
                      startTime={activity.timestamps.start}
                      endTime={activity.timestamps.end}
                      color={`rgba(${theme.pulseColor}, 1)`}
                    />
                  )}
                </div>
              ))}
            </div>
          )}



          {!spotify &&
            themedActivities.length === 0 &&
            !customStatus && (
            <p className="text-gray-400 italic">No current activities</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default LanyardPresence;
