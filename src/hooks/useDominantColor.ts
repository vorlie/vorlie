import { useState, useEffect } from "react";
import ColorThief from "colorthief";

const useDominantColor = (imageUrl: string | null) => {
  const [color, setColor] = useState<number[] | null>(null);

  useEffect(() => {
    if (!imageUrl) {
      setColor(null);
      return;
    }

    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = imageUrl;

    img.onload = () => {
      try {
        const colorThief = new ColorThief();
        const result = colorThief.getColor(img);
        setColor(result);
      } catch (error) {
        console.error("Error extracting color:", error);
        setColor(null);
      }
    };

    img.onerror = () => {
      // console.error("Error loading image for color extraction");
      setColor(null);
    };
  }, [imageUrl]);

  return color;
};

export default useDominantColor;
