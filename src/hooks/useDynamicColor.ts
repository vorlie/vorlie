import { useEffect, useState } from "react";
import ColorThief from "colorthief";
import {
  argbFromRgb,
  themeFromSourceColor,
  hexFromArgb
} from "@material/material-color-utilities";

const useDynamicColor = (imageUrl: string) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!imageUrl) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = imageUrl;

    img.onload = () => {
      try {
        const colorThief = new ColorThief();
        const dominantRgb = colorThief.getColor(img);

        // Convert RGB to ARGB format required by Material utilities
        const sourceColor = argbFromRgb(dominantRgb[0], dominantRgb[1], dominantRgb[2]);

        // Generate M3 Theme
        const theme = themeFromSourceColor(sourceColor, [
          {
            name: "custom-primary",
            value: sourceColor,
            blend: true,
          },
        ]);

        const systemDark = theme.schemes.dark;
        const root = document.documentElement;

        // Map Material Scheme to our M3 tokens
        root.style.setProperty("--color-m3-surface", hexFromArgb(systemDark.surface));
        root.style.setProperty("--color-m3-surface-container", hexFromArgb(systemDark.secondaryContainer));
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
        //console.log("Dynamic theme generated from dominant color:", dominantRgb);
        const p = dominantRgb;
        root.style.setProperty("--pulse-color", `${p[0]}, ${p[1]}, ${p[2]}`);
      } catch (error) {
        console.error("Error generating dynamic theme:", error);
      } finally {
        setIsLoading(false);
      }
    };

    img.onerror = () => {
      console.error("Failed to load background image for color extraction");
      setIsLoading(false);
    };
  }, [imageUrl]);

  return isLoading;
};

export default useDynamicColor;
