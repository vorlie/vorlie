import { useSearchParams } from "react-router-dom";
import { useLanyard } from "../../hooks/useLanyard";
import useDominantColor from "../../hooks/useDominantColor";
import { getReadableColor } from "../../utils/helpers";
import { motion, AnimatePresence } from "framer-motion";

export type CamFrameCorners = "rounded" | "sharp" | "pill";
export type CamFrameColorMode = "dynamic" | "static";
export type CamFrameBorderSize = "thin" | "normal" | "thick";
export type CamFrameGlow = "none" | "soft" | "strong";

interface CamFrameOptions {
  corners?: CamFrameCorners;
  color?: CamFrameColorMode;
  staticColor?: string; // hex like "a020f0"
  borderSize?: CamFrameBorderSize;
  glow?: CamFrameGlow;
}

export default function ObsCameraFrame({
  discordId,
  options,
}: {
  discordId: string;
  options?: CamFrameOptions;
}) {
  const [searchParams] = useSearchParams();

  // Merge prop options with URL params (URL params take precedence)
  const corners = (searchParams.get("corners") as CamFrameCorners) ?? options?.corners ?? "rounded";
  const colorMode = (searchParams.get("color") as CamFrameColorMode) ?? options?.color ?? "dynamic";
  const staticHex = searchParams.get("staticColor") ?? options?.staticColor ?? "6750a4";
  const borderSize = (searchParams.get("border") as CamFrameBorderSize) ?? options?.borderSize ?? "normal";
  const glowMode = (searchParams.get("glow") as CamFrameGlow) ?? options?.glow ?? "soft";

  const presence = useLanyard(discordId);
  const spotify = presence?.spotify;

  const rawColor = useDominantColor(spotify?.album_art_url || null);
  const readable = getReadableColor(rawColor);

  // Color resolution
  let [r, g, b] = [103, 80, 164];
  if (colorMode === "static") {
    const hex = staticHex.replace("#", "");
    r = parseInt(hex.substring(0, 2), 16) || 103;
    g = parseInt(hex.substring(2, 4), 16) || 80;
    b = parseInt(hex.substring(4, 6), 16) || 164;
  } else if (readable) {
    [r, g, b] = readable;
  }

  // Border radius
  const radiusMap: Record<CamFrameCorners, string> = {
    rounded: "28px",
    sharp: "0px",
    pill: "9999px",
  };
  const radius = radiusMap[corners];

  // Border width
  const borderWidthMap: Record<CamFrameBorderSize, number> = {
    thin: 4,
    normal: 12,
    thick: 20,
  };
  const borderWidth = borderWidthMap[borderSize];

  // Glow intensity
  const glowMap: Record<CamFrameGlow, string> = {
    none: "",
    soft: `inset 0 0 30px rgba(${r}, ${g}, ${b}, 0.25), 0 0 15px rgba(${r}, ${g}, ${b}, 0.15)`,
    strong: `inset 0 0 60px rgba(${r}, ${g}, ${b}, 0.5), 0 0 30px rgba(${r}, ${g}, ${b}, 0.4)`,
  };

  const accentColor = `rgb(${r}, ${g}, ${b})`;
  const fillColor = `rgb(${Math.round(r * 0.08)}, ${Math.round(g * 0.08)}, ${Math.round(b * 0.08)})`;

  if (presence?.discord_status === "offline") return null;

  return (
    <div className="fixed inset-0 pointer-events-none flex items-center justify-center p-2">
      <AnimatePresence mode="wait">
        <motion.div
          key={`${r}-${g}-${b}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="w-full h-full relative"
        >
          <div
            className="w-full h-full transition-all duration-1000"
            style={{
              borderRadius: radius,
              outline: `5000px solid ${fillColor}`,
              border: `${borderWidth}px solid ${accentColor}`,
              boxShadow: glowMap[glowMode] || undefined,
            }}
          />
          {/* Subtle inner shine */}
          <div
            className="absolute inset-0 border border-white/10 transition-all duration-1000"
            style={{ borderRadius: radius }}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
