import { motion } from "framer-motion";
import type { ThemeProps } from "./types";

export default function ModernTheme({
  musicData,
  accentColor,
  initialWidth,
  remainingDuration,
  animate,
}: ThemeProps) {
  return (
    <div className="flex flex-col w-64 bg-m3-surface-container rounded-3xl overflow-hidden shadow-2xl border border-m3-outline/5">
      <div className="relative aspect-square">
        <img
          src={musicData.coverUrl ?? undefined}
          className="w-full h-full object-cover"
          alt="Album Art"
        />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <h1 className="text-white font-bold text-base truncate">
            {musicData.title}
          </h1>
          <p className="text-white/80 font-medium text-xs truncate">
            {musicData.subtitle}
          </p>
        </div>
      </div>
      <div className="p-3">
        <div className="w-full h-1.5 bg-m3-surface rounded-full overflow-hidden">
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
