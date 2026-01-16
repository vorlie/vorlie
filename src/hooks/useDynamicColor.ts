import { useEffect } from "react";
import ColorThief from "colorthief";
import { 
  argbFromRgb, 
  themeFromSourceColor, 
  hexFromArgb
} from "@material/material-color-utilities";

const useDynamicColor = (imageUrl: string) => {
  useEffect(() => {
    if (!imageUrl) return;

    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = imageUrl;

    img.onload = () => {
      try {
        const colorThief = new ColorThief();
        const dominantRgb = colorThief.getColor(img);
        
        // Convert RGB to ARGB format required by Material utilities
        const sourceColor = argbFromRgb(dominantRgb[0], dominantRgb[1], dominantRgb[2]);
        
        // Generate M3 Theme (Dark mode by default for this site's aesthetic)
        const theme = themeFromSourceColor(sourceColor, [
          {
            name: "custom-primary",
            value: sourceColor,
            blend: true,
          },
        ]);

        // We want to apply these to CSS variables manually to match our existing tailwind setup
        const systemDark = theme.schemes.dark;
        
        const root = document.documentElement;
        
        // Map Material Scheme to our M3 tokens
        root.style.setProperty("--color-m3-surface", hexFromArgb(systemDark.surface));
        root.style.setProperty("--color-m3-surface-container", hexFromArgb(systemDark.secondaryContainer)); // Use secondaryContainer as a proxy for surfaceContainerHigh if missing
        root.style.setProperty("--color-m3-surface-variant", hexFromArgb(systemDark.surfaceVariant));
        root.style.setProperty("--color-m3-primary", hexFromArgb(systemDark.primary));
        root.style.setProperty("--color-m3-on-primary", hexFromArgb(systemDark.onPrimary));
        root.style.setProperty("--color-m3-primary-container", hexFromArgb(systemDark.primaryContainer));
        root.style.setProperty("--color-m3-on-primary-container", hexFromArgb(systemDark.onPrimaryContainer));
        root.style.setProperty("--color-m3-secondary", hexFromArgb(systemDark.secondary));
        root.style.setProperty("--color-m3-on-secondary", hexFromArgb(systemDark.onSecondary));
        root.style.setProperty("--color-m3-outline", hexFromArgb(systemDark.outline));
        root.style.setProperty("--color-m3-on-surface", hexFromArgb(systemDark.onSurface));
        root.style.setProperty("--color-m3-on-surface-variant", hexFromArgb(systemDark.onSurfaceVariant));

        // Also update the legacy pulse colors for Lanyard etc
        const p = dominantRgb;
        root.style.setProperty("--pulse-color", `${p[0]}, ${p[1]}, ${p[2]}`);

        console.log("Material 3 Dynamic Theme Applied from Background:", hexFromArgb(sourceColor));
      } catch (error) {
        console.error("Error generating dynamic theme:", error);
      }
    };

    img.onerror = () => {
      console.error("Failed to load background image for color extraction");
    };
  }, [imageUrl]);
};

export default useDynamicColor;
