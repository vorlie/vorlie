import { motion } from "framer-motion";
import type { ThemeProps } from "./types";

export default function GlassTheme({
  musicData,
  accentColor,
  initialWidth,
  remainingDuration,
  animate,
}: ThemeProps) {
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
          src={musicData.coverUrl ?? undefined}
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
            {musicData.title}
          </h1>
          <p className="text-white/70 font-medium text-sm truncate">
            {musicData.subtitle}
          </p>
        </div>
      </div>
      <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden relative z-10">
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
  );
}
