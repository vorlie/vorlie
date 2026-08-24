// src/hooks/useDynamicColor.ts
// This hook generates a dynamic Material 3 theme based on the dominant color of an image URL.
import { useEffect, useState } from "react";
import ColorThief from "colorthief";
import {
  argbFromRgb,
  themeFromSourceColor,
  hexFromArgb,
} from "@material/material-color-utilities";
import { setDefaultThemeVars } from "../../src-old/theme";

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
        const sourceColor = argbFromRgb(
          dominantRgb[0],
          dominantRgb[1],
          dominantRgb[2],
        );

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
        const themeVars = {
          "--color-m3-surface": hexFromArgb(systemDark.surface),
          "--color-m3-surface-container": hexFromArgb(
            systemDark.secondaryContainer,
          ),
          "--color-m3-surface-variant": hexFromArgb(systemDark.surfaceVariant),
          "--color-m3-primary": hexFromArgb(systemDark.primary),
          "--color-m3-on-primary": hexFromArgb(systemDark.onPrimary),
          "--color-m3-primary-container": hexFromArgb(
            systemDark.primaryContainer,
          ),
          "--color-m3-on-primary-container": hexFromArgb(
            systemDark.onPrimaryContainer,
          ),
          "--color-m3-secondary": hexFromArgb(systemDark.secondary),
          "--color-m3-on-secondary": hexFromArgb(systemDark.onSecondary),
          "--color-m3-outline": hexFromArgb(systemDark.outline),
          "--color-m3-on-surface": hexFromArgb(systemDark.onSurface),
          "--color-m3-on-surface-variant": hexFromArgb(
            systemDark.onSurfaceVariant,
          ),
        };

        // Map Material Scheme to our M3 tokens
        root.style.setProperty(
          "--color-m3-surface",
          themeVars["--color-m3-surface"],
        );
        root.style.setProperty(
          "--color-m3-surface-container",
          themeVars["--color-m3-surface-container"],
        );
        root.style.setProperty(
          "--color-m3-surface-variant",
          themeVars["--color-m3-surface-variant"],
        );
        root.style.setProperty(
          "--color-m3-primary",
          themeVars["--color-m3-primary"],
        );
        root.style.setProperty(
          "--color-m3-on-primary",
          themeVars["--color-m3-on-primary"],
        );
        root.style.setProperty(
          "--color-m3-primary-container",
          themeVars["--color-m3-primary-container"],
        );
        root.style.setProperty(
          "--color-m3-on-primary-container",
          themeVars["--color-m3-on-primary-container"],
        );
        root.style.setProperty(
          "--color-m3-secondary",
          themeVars["--color-m3-secondary"],
        );
        root.style.setProperty(
          "--color-m3-on-secondary",
          themeVars["--color-m3-on-secondary"],
        );
        root.style.setProperty(
          "--color-m3-outline",
          themeVars["--color-m3-outline"],
        );
        root.style.setProperty(
          "--color-m3-on-surface",
          themeVars["--color-m3-on-surface"],
        );
        root.style.setProperty(
          "--color-m3-on-surface-variant",
          themeVars["--color-m3-on-surface-variant"],
        );
        //console.log("Dynamic theme generated from dominant color:", dominantRgb);
        const p = dominantRgb;
        const pulseColor = `${p[0]}, ${p[1]}, ${p[2]}`;
        root.style.setProperty("--pulse-color", pulseColor);
        setDefaultThemeVars({
          ...themeVars,
          "--pulse-color": pulseColor,
          "--color-pride-blue": "#8bb8ff",
        });
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
