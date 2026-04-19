import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import type { ThemeProps } from "./types";

export default function MusicBeeTheme({
  musicData,
  accentColor,
  initialWidth,
  remainingDuration,
  animate,
}: ThemeProps) {
  const [elapsed, setElapsed] = useState(0);
  const start = musicData.timestamps?.start;
  const end = musicData.timestamps?.end;

  useEffect(() => {
    if (!start || !end) return;

    const update = () => {
      const now = Date.now();
      const newElapsed = Math.max(0, Math.min(end - start, now - start));
      setElapsed(newElapsed);
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [start, end, musicData.title]);

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const totalTime = end && start ? end - start : 0;
  
  const musicBeeYellow = "#E9AB17";

  return (
    <div className="flex flex-col w-[350px] overflow-hidden rounded-none bg-[#141414] shadow-2xl border border-white/5 ring-1 ring-white/10">
      <div className="bg-[#1a1a1a] px-3 py-1.5 border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <svg width="14" height="14" viewBox="0 0 24 24" fill={musicBeeYellow}>
            <path d="M12 2L9 4L12 6L15 4L12 2M12 22L15 20L12 18L9 20L12 22M2 12L4 15L6 12L4 9L2 12M22 12L20 9L18 12L20 15L22 12M12 9L9 12L12 15L15 12L12 9Z" />
          </svg>
          <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">MusicBee</span>
        </div>
      </div>

      <div className="flex p-3 gap-3 items-center">
        <div className="relative group">
          <img
            src={musicData.coverUrl ?? undefined}
            className="w-20 h-20 rounded-none shadow-lg border border-white/10 relative z-10"
            alt="Album Art"
          />
          <div 
            className="absolute -inset-0.5 rounded-md opacity-20 blur-sm group-hover:opacity-40 transition-opacity"
            style={{ backgroundColor: accentColor || musicBeeYellow }}
          />
        </div>

        <div className="flex flex-col flex-1 min-w-0">
          <h1 className="text-white font-bold text-sm truncate leading-tight">
            {musicData.title}
          </h1>
          <p className="text-white/60 text-[11px] truncate mt-0.5 font-medium">
            {musicData.subtitle}
          </p>
          <p className="mt-2 text-white/40 text-[10px] uppercase tracking-[0.15em] truncate font-bold">
            {musicData.album}
          </p>
        </div>
      </div>

      <div className="px-3 pb-3">
        <div className="h-1 w-full bg-white/5 rounded-none overflow-hidden mb-2">
          <motion.div
            key={musicData.trackId}
            className="h-full rounded-none"
            style={{ backgroundColor: musicBeeYellow }}
            initial={{ width: initialWidth }}
            animate={animate ? { width: "100%" } : undefined}
            transition={
              animate
                ? { duration: remainingDuration, ease: "linear" }
                : undefined
            }
          />
        </div>
        <div className="flex justify-between items-center text-[10px] font-bold font-mono text-white/30 tracking-tight">
          <span>{formatTime(elapsed)}</span>
          <span>{formatTime(totalTime)}</span>
        </div>
      </div>
    </div>
  );
}
