import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import type { ThemeProps } from "./types";

export default function AmuseTheme({
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

  return (
    <div className="relative group p-4">
      <div className="relative flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="relative shrink-0">
            <img
              src={musicData.coverUrl ?? undefined}
              className="w-45 h-45 rounded-[32px] shadow-2xl z-10 relative"
              alt="Album Art"
            />
            <div className="absolute -bottom-2 inset-x-4 h-4 bg-black/20 blur-lg rounded-full" />
          </div>

          <div className="flex flex-col gap-2 w-[400px]">
            <div className="bg-[#1a1a1a]/80 backdrop-blur-md p-5 rounded-[24px] shadow-xl border border-white/5 flex flex-col justify-center min-h-[90px]">
              <h1 className="text-white font-bold text-2xl leading-tight truncate tracking-tight">
                {musicData.title}
              </h1>
              <p className="text-white/60 font-semibold text-lg truncate mt-1">
                {musicData.subtitle}
              </p>
            </div>

            <div className="bg-[#1a1a1a]/80 backdrop-blur-md px-6 py-4 rounded-[24px] shadow-xl border border-white/5 flex items-center justify-between min-h-[70px]">
              <span className="text-white font-bold text-xl tabular-nums tracking-tight">
                {formatTime(elapsed)}
              </span>
              
              <div className="flex items-center gap-1 h-8 px-4">
                {[0.4, 0.7, 0.5, 0.9, 0.6, 0.8, 0.4, 0.7, 0.5, 0.9, 0.6, 0.8].map((h, i) => (
                  <motion.div
                    key={i}
                    className="w-1.5 rounded-full"
                    style={{ backgroundColor: accentColor }}
                    initial={{ height: `${h * 40}%` }}
                    animate={animate ? {
                      height: [`${h * 40}%`, `${(h + 0.3) * 60}%`, `${h * 40}%`],
                    } : undefined}
                    transition={animate ? {
                      duration: 0.8 + Math.random() * 0.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    } : undefined}
                  />
                ))}
              </div>

              <span className="text-white font-bold text-xl opacity-60 tabular-nums tracking-tight">
                {formatTime(totalTime)}
              </span>
            </div>
          </div>
        </div>

        <div className="relative h-4 px-2">
          <div className="absolute inset-0 bg-white/10 rounded-full overflow-hidden mx-2">
            <motion.div
              key={musicData.trackId || musicData.title}
              className="h-full rounded-full shadow-[0_0_15px_rgba(255,255,255,0.3)]"
              style={{ backgroundColor: accentColor }}
              initial={{ width: initialWidth }}
              animate={animate ? { width: "100%" } : undefined}
              transition={
                animate
                  ? { duration: remainingDuration, ease: "linear" }
                  : undefined
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
