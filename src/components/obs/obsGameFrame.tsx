import { useSearchParams } from "react-router-dom";
import { useLanyard } from "../../hooks/useLanyard";
import useDominantColor from "../../hooks/useDominantColor";
import { getReadableColor } from "../../utils/helpers";
import { motion, AnimatePresence } from "framer-motion";

export type GlowIntensity = "off" | "soft" | "medium" | "strong";

export default function GameFrame({ discordId }: { discordId: string }) {
  const [searchParams] = useSearchParams();

  const glowMode = (searchParams.get("glow") as GlowIntensity) ?? "medium";
  const colorMode = (searchParams.get("color") as "dynamic" | "static") ?? "dynamic";
  const staticHex = searchParams.get("staticColor") ?? "6750a4";
  const corners = (searchParams.get("corners") as "rounded" | "sharp") ?? "rounded";
  const spread = (searchParams.get("spread") as "narrow" | "normal" | "wide") ?? "normal";

  const presence = useLanyard(discordId);
  const spotify = presence?.spotify;

  const rawColor = useDominantColor(spotify?.album_art_url || null);
  const readable = getReadableColor(rawColor);

  let r = 103, g = 80, b = 164;

  if (colorMode === "static") {
    const hex = staticHex.replace("#", "");
    r = parseInt(hex.substring(0, 2), 16) || 103;
    g = parseInt(hex.substring(2, 4), 16) || 80;
    b = parseInt(hex.substring(4, 6), 16) || 164;
  } else if (readable) {
    [r, g, b] = readable;
  }

  if (presence?.discord_status === "offline") return null;

  const radius = corners === "sharp" ? "0px" : "28px";
  const fillColor = `rgb(${Math.round(r * 0.08)}, ${Math.round(g * 0.08)}, ${Math.round(b * 0.08)})`;

  // Glow spread sizes
  const spreadMap = { narrow: [40, 10], normal: [80, 20], wide: [160, 40] };
  const [innerSpread, outerSpread] = spreadMap[spread];

  // Glow intensities
  const glowIntensityMap: Record<GlowIntensity, { innerA: number; outerA: number; border: number }> = {
    off:    { innerA: 0,   outerA: 0,   border: 0 },
    soft:   { innerA: 0.2, outerA: 0.1, border: 0.3 },
    medium: { innerA: 0.4, outerA: 0.2, border: 0.5 },
    strong: { innerA: 0.7, outerA: 0.45, border: 0.8 },
  };
  const { innerA, outerA, border } = glowIntensityMap[glowMode];

  const boxShadow = glowMode === "off"
    ? "none"
    : `inset 0 0 ${innerSpread}px rgba(${r}, ${g}, ${b}, ${innerA}), inset 0 0 ${innerSpread / 2}px rgba(${r}, ${g}, ${b}, ${innerA * 0.6}), 0 0 ${outerSpread}px rgba(${r}, ${g}, ${b}, ${outerA})`;

  return (
    <div className="fixed inset-0 pointer-events-none">
      <AnimatePresence mode="wait">
        <motion.div
          key={`${r}-${g}-${b}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="w-full h-full relative flex items-center justify-center p-6"
        >
          <div
            className="absolute inset-0 transition-all duration-1000"
            style={{
              borderRadius: radius,
              outline: `5000px solid ${fillColor}`,
              boxShadow,
              border: glowMode !== "off" ? `2px solid rgba(${r}, ${g}, ${b}, ${border})` : "none",
              margin: "2px",
            }}
          >
            {/* Inner shine */}
            <div
              className="absolute inset-0 border border-white/5 transition-all duration-1000"
              style={{ borderRadius: radius }}
            />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
