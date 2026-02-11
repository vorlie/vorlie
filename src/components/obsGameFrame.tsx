import { useLanyard } from "../hooks/useLanyard";
import useDominantColor from "../hooks/useDominantColor";
import { getReadableColor } from "../utils/helpers";
import { motion, AnimatePresence } from "framer-motion";

export default function GameFrame({ discordId }: { discordId: string }) {
  const presence = useLanyard(discordId);
  const spotify = presence?.spotify;

  const rawColor = useDominantColor(spotify?.album_art_url || null);
  const readable = getReadableColor(rawColor);

  let r = 103,
    g = 80,
    b = 164;
  if (readable) {
    [r, g, b] = readable;
  }

  if (presence?.discord_status === "offline") return null;

  const accentColor = `rgb(${r}, ${g}, ${b})`;
  const fillColor = `rgb(${Math.round(r * 0.1)}, ${Math.round(g * 0.1)}, ${Math.round(b * 0.1)})`;

  return (
    <div className="fixed inset-0 pointer-events-none">
      <AnimatePresence mode="wait">
        <motion.div
          key={accentColor}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="w-full h-full relative flex items-center justify-center p-6"
        >
          <div
            className="absolute inset-0 transition-all duration-1000"
            style={{
              outline: `5000px solid ${fillColor}`,
              borderRadius: "28px",
              boxShadow: `
              inset 0 0 120px rgba(${r}, ${g}, ${b}, 0.3),
              inset 0 0 20px rgba(${r}, ${g}, ${b}, 0.5)
            `,
              border: `3px solid rgba(${r}, ${g}, ${b}, 0.6)`,
              margin: "2px",
            }}
          >
            <div className="absolute inset-0 rounded-[25px] border border-white/5" />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
