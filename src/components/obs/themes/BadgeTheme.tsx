import { motion } from "framer-motion";
import type { ThemeProps } from "./types";

export default function BadgeTheme({
  musicData,
  accentColor,
  initialWidth,
  remainingDuration,
  animate,
}: ThemeProps) {
  return (
    <div className="flex flex-col items-center">
      <div
        className="w-12 h-5 rounded-t-2xl shadow-lg"
        style={{ backgroundColor: accentColor }}
      />

      <div className="relative w-80 bg-m3-surface-container shadow-2xl rounded-[28px] p-5 flex flex-col gap-4 border border-m3-outline/10">
        <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-6 h-2.5 bg-black rounded-full" />

        <div className="flex items-center gap-4">
          <img
            src={musicData.coverUrl ?? undefined}
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
              {musicData.title}
            </h1>
            <p className="text-m3-on-surface-variant font-medium text-sm truncate">
              {musicData.subtitle}
            </p>
          </div>
        </div>

        <div className="w-full h-1 bg-m3-surface rounded-full overflow-hidden">
          <motion.div
            key={musicData.trackId || musicData.title}
            className="h-full"
            style={{ backgroundColor: accentColor }}
            initial={{ width: initialWidth }}
            animate={animate ? { width: "100%" } : undefined}
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
