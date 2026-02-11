import { useLanyard } from "../hooks/useLanyard";
import useDominantColor from "../hooks/useDominantColor";
import { getReadableColor } from "../utils/helpers";
import { motion } from "framer-motion";

export default function ObsPanel({ discordId }: { discordId: string }) {
  const presence = useLanyard(discordId);
  const spotify = presence?.spotify;

  const rawColor = useDominantColor(spotify?.album_art_url || null);
  const readableColorArray = getReadableColor(rawColor);

  if (!spotify) return null;

  const accentColor = readableColorArray
    ? `rgb(${readableColorArray.join(",")})`
    : "var(--m3-primary)";

  return (
    <div className="flex flex-col items-center w-fit p-10 overflow-hidden">
      {/* Lanyard String */}
      <div className="w-1.5 h-20 bg-m3-surface-variant rounded-full" />

      <motion.div
        animate={{
          rotate: [-1.5, 1.5, -1.5],
          y: [0, 2, 0],
        }}
        transition={{
          rotate: { duration: 5, repeat: Infinity, ease: "easeInOut" },
          y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
        }}
        style={{
          backfaceVisibility: "hidden",
          WebkitFontSmoothing: "antialiased",
          transformStyle: "preserve-3d",
        }}
        className="flex flex-col items-center origin-top -mt-1"
      >
        {/* MD3 Badge Clip */}
        <div
          className="w-12 h-5 rounded-t-2xl shadow-lg"
          style={{ backgroundColor: accentColor }}
        />

        {/* MD3 Surface Container */}
        <div className="relative w-80 bg-m3-surface-container shadow-2xl rounded-[28px] p-5 flex flex-col gap-4 border border-m3-outline/10">
          {/* Punch Hole Detail */}
          <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-6 h-2.5 bg-black rounded-full" />

          <div className="flex items-center gap-4">
            {/* Album Art with MD3 Radius */}
            <img
              src={spotify.album_art_url ?? undefined}
              className="w-20 h-20 rounded-2xl shadow-md"
              alt="Album Art"
            />

            <div className="flex flex-col min-w-0">
              <span
                className="text-[10px] font-black uppercase tracking-[0.2em] mb-1"
                style={{ color: accentColor }}
              >
                Now Playing
              </span>
              <h1 className="text-m3-on-surface font-bold text-lg leading-tight truncate">
                {spotify.song}
              </h1>
              <p className="text-m3-on-surface-variant font-medium text-sm truncate">
                {spotify.artist}
              </p>
            </div>
          </div>

          {/* MD3 Progress Bar Style */}
          <div className="w-full h-1 bg-m3-surface rounded-full overflow-hidden">
            <motion.div
              className="h-full"
              style={{ backgroundColor: accentColor }}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{
                duration: spotify.timestamps
                  ? (spotify.timestamps.end - spotify.timestamps.start) / 1000
                  : 0,
                ease: "linear",
              }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
