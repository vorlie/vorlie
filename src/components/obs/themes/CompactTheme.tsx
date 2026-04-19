import { motion } from "framer-motion";
import type { ThemeProps } from "./types";

export default function CompactTheme({
  musicData,
  accentColor,
  initialWidth,
  remainingDuration,
  animate,
}: ThemeProps) {
  return (
    <div className="flex items-center gap-3 bg-m3-surface-container shadow-xl rounded-2xl p-2 border border-m3-outline/10 w-80">
      <img
        src={musicData.coverUrl ?? undefined}
        className="w-12 h-12 rounded-xl"
        alt="Album Art"
      />
      <div className="flex flex-col min-w-0 flex-1">
        <h1 className="text-m3-on-surface font-bold text-sm truncate">
          {musicData.title}
        </h1>
        <p className="text-m3-on-surface-variant font-medium text-xs truncate">
          {musicData.subtitle}
        </p>
        <div className="w-full h-1 bg-m3-surface rounded-full mt-1 overflow-hidden">
          <motion.div
            key={musicData.trackId}
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
