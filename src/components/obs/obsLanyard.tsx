import { useLanyard } from "../../hooks/useLanyard";
import useDominantColor from "../../hooks/useDominantColor";
import { getReadableColor } from "../../utils/helpers";
import { motion } from "framer-motion";

export type SpotifyTheme = "badge" | "compact" | "glass" | "modern";

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

  const rawColor = useDominantColor(spotify?.album_art_url || null);
  const readableColorArray = getReadableColor(rawColor);

  if (!spotify) return null;

  const accentColor = readableColorArray
    ? `rgb(${readableColorArray.join(",")})`
    : "var(--m3-primary)";

  // Calculate the current progress state
  const timestamps = spotify.timestamps;
  let initialWidth = "0%";
  let remainingDuration = 0;

  if (timestamps) {
    const total = timestamps.end - timestamps.start;
    const elapsed = Date.now() - timestamps.start;
    const progress = Math.max(0, Math.min(1, elapsed / total));

    initialWidth = `${progress * 100}%`;
    remainingDuration = Math.max(0, (timestamps.end - Date.now()) / 1000);
  }

  const renderTheme = () => {
    switch (theme) {
      case "compact":
        return (
          <div className="flex items-center gap-3 bg-m3-surface-container shadow-xl rounded-2xl p-2 border border-m3-outline/10 w-80">
            <img
              src={spotify.album_art_url ?? undefined}
              className="w-12 h-12 rounded-xl"
              alt="Album Art"
            />
            <div className="flex flex-col min-w-0 flex-1">
              <h1 className="text-m3-on-surface font-bold text-sm truncate">
                {spotify.song}
              </h1>
              <p className="text-m3-on-surface-variant font-medium text-xs truncate">
                {spotify.artist}
              </p>
              <div className="w-full h-1 bg-m3-surface rounded-full mt-1 overflow-hidden">
                <motion.div
                  key={spotify.track_id}
                  className="h-full"
                  style={{ backgroundColor: accentColor }}
                  initial={{ width: initialWidth }}
                  animate={{ width: "100%" }}
                  transition={{ duration: remainingDuration, ease: "linear" }}
                />
              </div>
            </div>
          </div>
        );

      case "glass":
        return (
          <div className="relative w-80 backdrop-blur-md bg-white/10 shadow-2xl rounded-[28px] p-5 flex flex-col gap-4 border border-white/20 overflow-hidden">
            <div
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                background: `radial-gradient(circle at 50% 50%, ${accentColor}, transparent)`,
              }}
            />
            <div className="flex items-center gap-4 relative z-10">
              <img
                src={spotify.album_art_url ?? undefined}
                className="w-20 h-20 rounded-2xl shadow-lg border border-white/10"
                alt="Album Art"
              />
              <div className="flex flex-col min-w-0">
                <span
                  className="text-[10px] font-black uppercase tracking-[0.2em] mb-1"
                  style={{ color: accentColor }}
                >
                  Now Playing
                </span>
                <h1 className="text-white font-bold text-lg leading-tight truncate">
                  {spotify.song}
                </h1>
                <p className="text-white/70 font-medium text-sm truncate">
                  {spotify.artist}
                </p>
              </div>
            </div>
            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden relative z-10">
              <motion.div
                key={spotify.track_id}
                className="h-full"
                style={{ backgroundColor: accentColor }}
                initial={{ width: initialWidth }}
                animate={{ width: "100%" }}
                transition={
                  animate
                    ? { duration: remainingDuration, ease: "linear" }
                    : { duration: 0 }
                }
              />
            </div>
          </div>
        );

      case "modern":
        return (
          <div className="flex flex-col w-64 bg-m3-surface-container rounded-3xl overflow-hidden shadow-2xl border border-m3-outline/5">
            <div className="relative aspect-square">
              <img
                src={spotify.album_art_url ?? undefined}
                className="w-full h-full object-cover"
                alt="Album Art"
              />
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <h1 className="text-white font-bold text-base truncate">
                  {spotify.song}
                </h1>
                <p className="text-white/80 font-medium text-xs truncate">
                  {spotify.artist}
                </p>
              </div>
            </div>
            <div className="p-3">
              <div className="w-full h-1.5 bg-m3-surface rounded-full overflow-hidden">
                <motion.div
                  key={spotify.track_id}
                  className="h-full"
                  style={{ backgroundColor: accentColor }}
                  initial={{ width: initialWidth }}
                  animate={{ width: "100%" }}
                  transition={
                    animate
                      ? { duration: remainingDuration, ease: "linear" }
                      : { duration: 0 }
                  }
                />
              </div>
            </div>
          </div>
        );

      case "badge":
      default:
        return (
          <div className="flex flex-col items-center">
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

              <div className="w-full h-1 bg-m3-surface rounded-full overflow-hidden">
                <motion.div
                  key={spotify.track_id}
                  className="h-full"
                  style={{ backgroundColor: accentColor }}
                  initial={{ width: initialWidth }}
                  animate={{ width: "100%" }}
                  transition={
                    animate
                      ? { duration: remainingDuration, ease: "linear" }
                      : { duration: 0 }
                  }
                />
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col items-center w-fit p-10 overflow-hidden">
      {/* Lanyard String - only for badge theme */}
      {theme === "badge" && (
        <div className="w-1.5 h-20 bg-m3-surface-variant rounded-full" />
      )}

      <motion.div
        animate={
          animate
            ? {
                rotate: [-1.5, 1.5, -1.5],
                y: [0, 2, 0],
              }
            : {
                rotate: 0,
                y: 0,
              }
        }
        transition={
          animate
            ? {
                rotate: { duration: 5, repeat: Infinity, ease: "easeInOut" },
                y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
              }
            : { duration: 0 }
        }
        style={{
          backfaceVisibility: "hidden",
          WebkitFontSmoothing: "antialiased",
          transformStyle: "preserve-3d",
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

