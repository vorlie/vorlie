import { useLanyard } from "../../hooks/useLanyard";
import useDominantColor from "../../hooks/useDominantColor";
import { extractImageUrl, getReadableColor } from "../../utils/helpers";
import { motion } from "framer-motion";
import {
  AmuseTheme,
  BadgeTheme,
  CompactTheme,
  GlassTheme,
  ModernTheme,
  MusicBeeTheme,
  TidalTheme,
  type MusicData,
  type SpotifyTheme,
} from "./themes";

export type { SpotifyTheme } from "./themes";

export default function ObsSpotifyComponent({
  discordId,
  theme = "badge",
  animate = true,
}: {
  discordId: string;
  theme?: SpotifyTheme;
  animate?: boolean;
}) {
  const presence = useLanyard(discordId);
  const spotify = presence?.spotify;

  const musicActivity = presence?.activities?.find((activity) => {
    const name = activity.name?.toUpperCase();
    const smallText = activity.assets?.small_text?.toUpperCase();
    const largeText = activity.assets?.large_text?.toUpperCase();

    const isTidal = 
      name === "TIDAL" ||
      smallText === "TIDAL" ||
      largeText?.includes("TIDAL") ||
      activity.application_id === "1246943204411179120";

    const isMusicBee = 
      name === "MUSICBEE" ||
      activity.application_id === "1247654771557666889";

    return isTidal || isMusicBee;
  });

  const musicData: MusicData | null = spotify
    ? {
        service: "spotify",
        trackId: spotify.track_id,
        title: spotify.song,
        subtitle: spotify.artist,
        album: spotify.album,
        coverUrl: spotify.album_art_url,
        iconUrl: null,
        timestamps: spotify.timestamps,
      }
    : musicActivity
      ? {
          service: musicActivity.application_id === "1247654771557666889" ? "musicbee" : "tidal",
          trackId: musicActivity.id,
          title:
            musicActivity.details ||
            musicActivity.assets?.large_text ||
            musicActivity.name ||
            "Unknown Track",
          subtitle:
            musicActivity.state || musicActivity.assets?.small_text || "Music Service",
          album: musicActivity.assets?.large_text || "Music Service",
          coverUrl: musicActivity.assets?.large_image
            ? extractImageUrl(
                musicActivity.assets.large_image,
                musicActivity.application_id ?? undefined,
              )
            : null,
          iconUrl: musicActivity.assets?.small_image
            ? extractImageUrl(
                musicActivity.assets.small_image,
                musicActivity.application_id ?? undefined,
              )
            : null,
          timestamps: musicActivity.timestamps ?? null,
        }
      : null;

  const rawColor = useDominantColor(musicData?.coverUrl || null);
  const readableColorArray = getReadableColor(rawColor);

  if (!musicData) return null;

  const accentColor = readableColorArray
    ? `rgb(${readableColorArray.join(",")})`
    : "var(--m3-primary)";

  // Calculate the current progress state
  const timestamps = musicData.timestamps;
  let initialWidth = "0%";
  let remainingDuration = 0;

  if (
    timestamps &&
    typeof timestamps.start === "number" &&
    typeof timestamps.end === "number"
  ) {
    const total = timestamps.end - timestamps.start;
    const elapsed = Date.now() - timestamps.start;
    const progress = Math.max(0, Math.min(1, elapsed / total));

    initialWidth = `${progress * 100}%`;
    remainingDuration = Math.max(0, (timestamps.end - Date.now()) / 1000);
  }

  const renderTheme = () => {
    const themeProps = {
      musicData,
      accentColor,
      initialWidth,
      remainingDuration,
      animate,
    };

    switch (theme) {
      case "compact":
        return <CompactTheme {...themeProps} />;
      case "glass":
        return <GlassTheme {...themeProps} />;
      case "modern":
        return <ModernTheme {...themeProps} />;
      case "tidal":
        return <TidalTheme {...themeProps} />;
      case "amuse":
        return <AmuseTheme {...themeProps} />;
      case "musicbee":
        return <MusicBeeTheme {...themeProps} />;
      case "badge":
      default:
        return <BadgeTheme {...themeProps} />;
    }
  };

  return (
    <div className="flex flex-col items-center w-fit p-10 overflow-hidden">
      {/* Lanyard String - only for badge theme */}
      {theme === "badge" && (
        <div className="w-1.5 h-20 bg-m3-surface-variant rounded-full" />
      )}

      <motion.div
        animate={{
          y: [0, 0.01, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          backfaceVisibility: "hidden",
          WebkitFontSmoothing: "antialiased",
          transformStyle: "preserve-3d",
          willChange: "transform, opacity",
        }}
        className={`flex flex-col items-center origin-top ${
          theme === "badge" ? "-mt-1" : ""
        }`}
      >
        {renderTheme()}
      </motion.div>
    </div>
  );
}
