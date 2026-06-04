import { useState, useEffect } from "react";
import { PresenceData, Activity } from "../types/lanyard";
import {
  extractImageUrl,
  getAvatarUrl,
  getFontClass,
  getEffectClass,
  getBannerUrl,
} from "../utils/helpers";
import ActivityTimestamp from "./ActivityTimestamp";
import MarqueeText from "./MarqueeText";
import {
  FaSpotify,
  FaGamepad,
  FaHeadphones,
  FaVideo,
  FaTrophy,
} from "react-icons/fa";
import useDominantColor from "../hooks/useDominantColor";
import { LANYARD_THEMES, LanyardTheme } from "../data/lanyardThemes";
import { useLanyard } from "../hooks/useLanyard";

declare global {
  interface Window {
    twemoji: {
      parse: (input: string) => string;
    };
  }
}

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
  const presenceData = useLanyard(discordId);
  const [bannerUrl, setBannerUrl] = useState<string | null>(null);
  const spotifyColor = useDominantColor(
    presenceData?.spotify?.album_art_url || null,
  );

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
      color: "text-m3-on-surface-variant",
      pulseColor: "208, 188, 255", // primary
      bgClass: "bg-m3-surface-container",
      borderClass: "border-m3-outline/10",
      textClass: "text-m3-on-surface-variant",
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
    <div className="text-xl font-bold flex items-center self-center leading-tight tracking-tight text-m3-on-surface">
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
        <span className={`truncate ${fontClass}`} title={displayName}>
          {displayName}
        </span>
      )}
      {discord_user.primary_guild && clanIconUrl && (
        <span className="ml-2 inline-flex items-center bg-m3-surface rounded-none px-3 py-1 text-xs font-bold whitespace-nowrap border border-m3-outline/10 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.2)]">
          <img
            src={clanIconUrl}
            alt={`${discord_user.primary_guild.tag} Clan Icon`}
            className="h-3.5 w-3.5 mr-1.5 object-contain"
          />
          <span className="font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
            {discord_user.primary_guild.tag}
          </span>
        </span>
      )}
    </div>
  );

  return (
    <div className="">
      <div className="relative overflow-hidden rounded-none h-24 mb-4 border border-m3-outline/10 border-t-white/20 border-l-white/20 border-b-black/40 border-r-black/40 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.4)]">
        <img
          src={
            bannerUrl ||
            "https://us-east-1.tixte.net/uploads/cx.tixte.co/banner.gif"
          }
          alt="User Banner"
          className="w-full h-full object-cover [-webkit-mask-image:linear-gradient(to_bottom,rgba(0,0,0,1)_50%,rgba(0,0,0,0)_100%)] [mask-image:linear-gradient(to_bottom,rgba(0,0,0,1)_50%,rgba(0,0,0,0)_100%)] opacity-60"
        />
      </div>

      <div className="relative">
        <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 mb-4 items-start mt-[-4rem]">
          <div className="relative row-span-2 self-start w-16 h-16 rounded-full border-4 border-m3-surface-container">
            {" "}
            <img
              src={avatarUrl}
              alt={`${discord_user.username}'s Avatar`}
              className="w-full h-full rounded-full object-cover"
            />
            <img
              src={decorationUrl}
              alt="Avatar Decoration"
              className="absolute inset-0 w-full h-full pointer-events-none transform scale-[1.25]"
            />
          </div>

          {usernameElement}

          <div className="text-xs text-m3-on-surface-variant truncate self-start leading-tight bg-m3-surface rounded-none px-3 py-1.5 mr-2 flex items-center gap-2 border border-m3-outline/10 border-t-black/50 border-l-black/50 border-b-white/10 border-r-white/10">
            <div className="relative flex items-center justify-center w-2 h-2">
              <div
                className={`absolute inset-0 rounded-none status-indicator-pulse`}
                style={
                  {
                    "--pulse-color": statusPulseColors[discord_status],
                  } as React.CSSProperties
                }
              ></div>
              <div
                className={`relative w-2 h-2 rounded-none ${statusBgColors[discord_status]}`}
              ></div>
            </div>
            <span
              className={`${statusTextColors[discord_status]} font-bold uppercase tracking-wider`}
            >
              {statusText}
            </span>
            {customStatus && customStatus.state && (
              <MarqueeText
                className="max-w-[8rem] font-bold"
                title={customStatus.state}
              >
                {customStatus.emoji?.id ? (
                  <img
                    src={`https://cdn.discordapp.com/emojis/${
                      customStatus.emoji.id
                    }.webp?size=32&animated=${
                      customStatus.emoji.animated ? "true" : "false"
                    }`}
                    alt={customStatus.emoji.name}
                    className="inline h-4 align-text-bottom mr-1"
                    title={customStatus.emoji.name}
                  />
                ) : customStatus.emoji?.name ? (
                  <span
                    className="mr-1 inline-block align-text-bottom"
                    ref={(el) => {
                      if (el && window.twemoji) {
                        el.innerHTML = window.twemoji.parse(
                          customStatus.emoji?.name ?? "",
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
        <hr className="border-m3-outline/10 my-6" />{" "}
        <div className="space-y-3 text-sm">
          {spotify && spotify.track_id && (
            <div
              className="rounded-none p-4 transition-all duration-500 relative overflow-hidden group border border-m3-outline/10 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.4)] border-t-white/20 border-l-white/20 border-b-black/40 border-r-black/40"
              style={{
                backgroundColor: spotifyColor
                  ? `rgba(${spotifyColor[0]}, ${spotifyColor[1]}, ${spotifyColor[2]}, 0.15)`
                  : "var(--color-m3-surface-container)",
                borderColor: spotifyColor
                  ? `rgba(${spotifyColor[0]}, ${spotifyColor[1]}, ${spotifyColor[2]}, 0.3)`
                  : "var(--color-m3-outline)",
              }}
            >
              <div className="flex items-center gap-4 relative z-10">
                {spotify.album_art_url && (
                  <div className="relative flex-shrink-0 group">
                    <img
                      src={spotify.album_art_url}
                      alt={`${spotify.album} cover`}
                      className="w-16 h-16 rounded-none transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-none flex items-center justify-center">
                      <FaSpotify
                        className="text-white drop-shadow-lg"
                        size={24}
                      />
                    </div>
                  </div>
                )}
                <div className="flex-grow overflow-hidden">
                  <a
                    href={`https://open.spotify.com/track/${spotify.track_id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-base block truncate hover:underline text-m3-on-surface tracking-tight"
                    title={`Listen to ${spotify.song} by ${spotify.artist} on Spotify`}
                  >
                    {spotify.song}
                  </a>
                  <p
                    className="text-m3-on-surface-variant text-sm font-semibold truncate opacity-80"
                    title={spotify.artist}
                  >
                    {spotify.artist}
                  </p>
                  <p
                    className="text-m3-on-surface-variant text-xs truncate opacity-60"
                    title={spotify.album}
                  >
                    {spotify.album}
                  </p>
                </div>
              </div>
              {spotify.timestamps?.start && (
                <div className="mt-3">
                  <ActivityTimestamp
                    startTime={spotify.timestamps.start}
                    endTime={spotify.timestamps.end}
                    color="var(--color-m3-primary)"
                    colorSecondary="var(--color-m3-on-secondary)"
                  />
                </div>
              )}
            </div>
          )}

          {themedActivities.length > 0 && (
            <div className="space-y-3">
              {themedActivities.map(({ activity, theme }) => (
                <div
                  key={activity.id || activity.name}
                  className={`bg-m3-surface-container border border-m3-outline/10 rounded-none p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.4)] hover:border-m3-outline/30 transition-all duration-300 border-t-white/20 border-l-white/20 border-b-black/40 border-r-black/40`}
                >
                  <div className="flex items-center gap-4">
                    <div className="relative flex-shrink-0">
                      {activity.assets?.large_image ? (
                        <img
                          src={extractImageUrl(
                            activity.assets.large_image,
                            activity.application_id || "",
                          )}
                          alt={activity.name}
                          className="w-16 h-16 rounded-none object-cover"
                        />
                      ) : (
                        <div
                          className={`w-16 h-16 rounded-none flex items-center justify-center bg-m3-primary/10`}
                        >
                          <theme.icon size={32} className="text-m3-primary" />
                        </div>
                      )}
                      {activity.assets?.small_image && (
                        <img
                          src={extractImageUrl(
                            activity.assets.small_image,
                            activity.application_id || "",
                          )}
                          alt="Small asset"
                          className="w-6 h-6 rounded-none absolute -bottom-1 -right-1 border-2 border-m3-surface-container"
                        />
                      )}
                    </div>
                    <div className="flex-grow overflow-hidden">
                      <p
                        className={`text-m3-primary text-xs font-black uppercase tracking-widest flex items-center gap-2 mb-0.5`}
                      >
                        <theme.icon size={12} /> {theme.label} {theme.name}
                      </p>
                      <p className="text-m3-on-surface font-bold text-base truncate tracking-tight">
                        {activity.name}
                      </p>
                      {activity.details && (
                        <p className="text-m3-on-surface-variant text-sm font-medium truncate opacity-80">
                          {activity.details}
                        </p>
                      )}
                      {activity.state && (
                        <p className="text-m3-on-surface-variant text-xs truncate opacity-60">
                          {activity.state}
                        </p>
                      )}
                      {theme.repoUrl && (
                        <a
                          href={theme.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[10px] font-black uppercase tracking-wider text-m3-primary bg-m3-primary/10 border border-m3-primary/20 px-3 py-1 rounded-none mt-2 inline-block hover:bg-m3-primary hover:text-m3-on-primary transition-all duration-200"
                        >
                          View Repository
                        </a>
                      )}
                    </div>
                  </div>
                  {activity.timestamps?.start && (
                    <div className="mt-3">
                      <ActivityTimestamp
                        startTime={activity.timestamps.start}
                        endTime={activity.timestamps.end}
                        color="var(--color-m3-primary)"
                        colorSecondary="var(--color-m3-on-secondary)"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {!spotify && themedActivities.length === 0 && !customStatus && (
            <div className="text-center py-6">
              <p className="text-m3-on-surface-variant italic font-medium opacity-50">
                No current activities
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LanyardPresence;
