import { useEffect, useState } from "react";
import ColorThief from "colorthief";
import { 
  argbFromRgb, 
  themeFromSourceColor, 
  hexFromArgb
} from "@material/material-color-utilities";

interface AlbumColors {
  primary: string;
  onPrimary: string;
  primaryContainer: string;
  surface: string;
  surfaceVariant: string;
}

export const useAlbumColors = (imageUrl: string | undefined): AlbumColors | null => {
  const [colors, setColors] = useState<AlbumColors | null>(null);

  useEffect(() => {
    if (!imageUrl) {
      setColors(null);
      return;
    }

    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = imageUrl;

    img.onload = () => {
      try {
        const colorThief = new ColorThief();
        const dominantRgb = colorThief.getColor(img);
        
        const sourceColor = argbFromRgb(dominantRgb[0], dominantRgb[1], dominantRgb[2]);
        const theme = themeFromSourceColor(sourceColor, [
          {
            name: "album-theme",
            value: sourceColor,
            blend: true,
          },
        ]);

        const systemDark = theme.schemes.dark;
        
        setColors({
          primary: hexFromArgb(systemDark.primary),
          onPrimary: hexFromArgb(systemDark.onPrimary),
          primaryContainer: hexFromArgb(systemDark.primaryContainer),
          surface: hexFromArgb(systemDark.surface),
          surfaceVariant: hexFromArgb(systemDark.surfaceVariant),
        });
      } catch (error) {
        console.error("Error extracting album colors:", error);
        setColors(null);
      }
    };

    img.onerror = () => {
      console.error("Failed to load album image for color extraction");
      setColors(null);
    };
  }, [imageUrl]);

  return colors;
};
