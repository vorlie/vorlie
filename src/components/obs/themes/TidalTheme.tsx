import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import type { ThemeProps } from "./types";

export default function TidalTheme({
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

    // Reset elapsed when theme remounts or start/end changes
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

  return (
    <div className="flex flex-col w-fit min-w-[384px] overflow-hidden rounded-[32px] bg-[#050505] shadow-2xl border border-white/10">
      <div className="flex">
        <div className="relative w-36 h-36 shrink-0">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30 filter blur-2xl"
            style={{ backgroundImage: `url(${musicData.coverUrl ?? ""})` }}
          />
          <div className="absolute inset-0" />
          <img
            src={musicData.coverUrl ?? undefined}
            className="relative m-4 h-32 w-32 rounded-3xl object-cover shadow-lg border border-white/10"
            alt="Cover Art"
          />
        </div>
        <div className="flex flex-1 flex-col justify-center p-4">
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.24em] text-white/60">
              {musicData.iconUrl ? (
                <img
                  src={musicData.iconUrl}
                  className="h-4 w-4 rounded-sm object-contain"
                  alt="Tidal Icon"
                />
              ) : null}
              <span>TIDAL</span>
            </div>
            <span className="rounded-full bg-white/5 px-2 py-1 text-[10px] uppercase tracking-[0.24em] text-white/70">
              Now Playing
            </span>
          </div>
          <h1 className="text-white font-bold text-xl leading-snug tracking-tight truncate max-w-[400px]">
            {musicData.title}
          </h1>
          <p className="mt-2 text-white/70 text-sm truncate max-w-[400px]">
            {musicData.subtitle}
          </p>
          <p className="mt-3 text-white/50 text-xs uppercase tracking-[0.24em] truncate max-w-[400px]">
            {musicData.album}
          </p>
        </div>
      </div>

      <div className="px-5 pb-5 mt-2">
        <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
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
        <div className="mt-3 flex items-center justify-between text-[10px] uppercase tracking-[0.24em] text-white/40">
          <span>MusicPresence.app</span>
          <span className="tabular-nums font-mono">
            {formatTime(elapsed)} / {formatTime(totalTime)}
          </span>
        </div>
      </div>
    </div>
  );
}
