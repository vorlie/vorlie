import { useLanyard } from "../../hooks/useLanyard";
import useDominantColor from "../../hooks/useDominantColor";
import { getReadableColor } from "../../utils/helpers";
import { motion, AnimatePresence } from "framer-motion";

export default function ObsCameraFrame({ discordId }: { discordId: string }) {
  const presence = useLanyard(discordId);
  const spotify = presence?.spotify;

  const rawColor = useDominantColor(spotify?.album_art_url || null);
  const readable = getReadableColor(rawColor);

  // Logic for color extraction
  let [r, g, b] = [103, 80, 164];
  if (readable) [r, g, b] = readable;

  const accentColor = `rgb(${r}, ${g}, ${b})`;
  const fillColor = `rgb(${Math.round(r * 0.1)}, ${Math.round(g * 0.1)}, ${Math.round(b * 0.1)})`;

  if (presence?.discord_status === "offline") return null;

  return (
    <div className="fixed inset-0 pointer-events-none flex items-center justify-center p-2">
      <AnimatePresence mode="wait">
        <motion.div
          key={accentColor}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="w-full h-full relative"
        >
          {/* THE MASK
              - Outline: Fills everything outside the rounded box.
              - BoxShadow: Creates the inner glow.
          */}
          <div
            className="w-full h-full rounded-[28px] transition-all duration-1000"
            style={{
              outline: `5000px solid ${fillColor}`,
              border: `16px solid ${accentColor}`,
              boxShadow: `
                inset 0 0 40px rgba(${r}, ${g}, ${b}, 0.4),
                0 0 20px rgba(0, 0, 0, 0.5)
              `
            }}
          />

          {/* Subtle MD3 Shine around the inner edge */}
          <div className="absolute inset-0 rounded-[26px] border border-white/10" />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
