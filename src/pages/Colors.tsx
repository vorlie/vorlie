import React, { useEffect, useState } from "react";
import SEO from "../components/SEO";

interface ColorPair {
  name: string;
  foreground: string;
  background: string;
  usage: string;
}

const Colors: React.FC = () => {
  const [colors, setColors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    // Extract all M3 color variables from CSS
    const root = document.documentElement;
    const computedStyle = getComputedStyle(root);

    const colorVars = [
      "color-m3-surface",
      "color-m3-surface-container",
      "color-m3-surface-variant",
      "color-m3-primary",
      "color-m3-on-primary",
      "color-m3-primary-container",
      "color-m3-on-primary-container",
      "color-m3-secondary",
      "color-m3-on-secondary",
      "color-m3-error-container",
      "color-m3-on-error-container",
      "color-m3-outline",
      "color-m3-on-surface",
      "color-m3-on-surface-variant",
    ];

    const extractedColors: { [key: string]: string } = {};
    colorVars.forEach((varName) => {
      const value = computedStyle.getPropertyValue(`--${varName}`).trim();
      if (value) {
        extractedColors[varName] = value;
      }
    });

    setColors(extractedColors);
  }, []);

  // Calculate contrast ratio between two hex colors
  const getContrastRatio = (fg: string, bg: string): number => {
    const getLuminance = (hex: string): number => {
      const rgb = parseInt(hex.slice(1), 16);
      const r = ((rgb >> 16) & 0xff) / 255;
      const g = ((rgb >> 8) & 0xff) / 255;
      const b = (rgb & 0xff) / 255;

      const [rs, gs, bs] = [r, g, b].map((c) => {
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
      });

      return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
    };

    const l1 = getLuminance(fg);
    const l2 = getLuminance(bg);
    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);

    return (lighter + 0.05) / (darker + 0.05);
  };

  const getWCAGLevel = (ratio: number): { level: string; color: string } => {
    if (ratio >= 7) return { level: "AAA", color: "#00e676" };
    if (ratio >= 4.5) return { level: "AA", color: "#76ff03" };
    if (ratio >= 3) return { level: "AA Large", color: "#ffea00" };
    return { level: "Fail", color: "#f50057" };
  };

  // Define common color pairs used in the app
  const colorPairs: ColorPair[] = [
    {
      name: "Primary on Surface",
      foreground: "color-m3-primary",
      background: "color-m3-surface",
      usage: "Headers, accents",
    },
    {
      name: "On-Primary on Primary",
      foreground: "color-m3-on-primary",
      background: "color-m3-primary",
      usage: "Buttons",
    },
    {
      name: "On-Surface on Surface",
      foreground: "color-m3-on-surface",
      background: "color-m3-surface",
      usage: "Body text",
    },
    {
      name: "On-Surface-Variant on Surface",
      foreground: "color-m3-on-surface-variant",
      background: "color-m3-surface",
      usage: "Secondary text",
    },
    {
      name: "On-Surface on Surface Container",
      foreground: "color-m3-on-surface",
      background: "color-m3-surface-container",
      usage: "Cards",
    },
    {
      name: "Primary on Surface Container",
      foreground: "color-m3-primary",
      background: "color-m3-surface-container",
      usage: "Card headers",
    },
    {
      name: "On-Primary-Container on Primary Container",
      foreground: "color-m3-on-primary-container",
      background: "color-m3-primary-container",
      usage: "Highlighted elements",
    },
  ];

  return (
    <div className="py-12 px-4 sm:px-6 animate-in fade-in duration-700">
      <SEO
        title="Color System"
        description="Material 3 Palette and WCAG Contrast Ratios"
        url="https://vorlie.pl/colors"
      />
      <div className="max-w-6xl mx-auto bg-m3-surface-container rounded-[48px] p-8 sm:p-12 border border-m3-outline/10 shadow-sm">
        <header className="mb-12">
          <h1 className="text-5xl font-black text-m3-primary tracking-tighter uppercase italic mb-2">
            Color System
          </h1>
          <p className="text-m3-on-surface-variant font-bold opacity-60 uppercase tracking-[0.2em] text-sm">
            Material 3 Palette & WCAG Contrast
          </p>
        </header>

        {/* Color Swatches */}
        <section className="mb-16">
          <h2 className="text-2xl font-black text-m3-on-surface mb-6 tracking-tight uppercase border-l-4 border-m3-primary pl-4">
            Current Palette
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Object.entries(colors).map(([name, value]) => (
              <div
                key={name}
                className="bg-m3-surface-variant/20 rounded-[24px] p-4 border border-m3-outline/5"
              >
                <div
                  className="w-full h-24 rounded-[16px] mb-3 shadow-inner border border-m3-outline/10"
                  style={{ backgroundColor: value }}
                ></div>
                <p className="text-xs font-black uppercase tracking-widest text-m3-on-surface-variant opacity-60 mb-1">
                  {name.replace("color-m3-", "").replace(/-/g, " ")}
                </p>
                <p className="text-sm font-bold text-m3-primary font-mono">
                  {value}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Contrast Checker */}
        <section>
          <h2 className="text-2xl font-black text-m3-on-surface mb-6 tracking-tight uppercase border-l-4 border-m3-secondary pl-4">
            Contrast Ratios
          </h2>
          <div className="space-y-4">
            {colorPairs.map((pair) => {
              const fg = colors[pair.foreground];
              const bg = colors[pair.background];

              if (!fg || !bg) return null;

              const ratio = getContrastRatio(fg, bg);
              const wcag = getWCAGLevel(ratio);

              return (
                <div
                  key={pair.name}
                  className="bg-m3-surface-variant/20 rounded-[24px] p-6 border border-m3-outline/5 flex flex-col md:flex-row md:items-center gap-6"
                >
                  {/* Preview */}
                  <div
                    className="w-full md:w-48 h-24 rounded-[16px] flex items-center justify-center shadow-inner border border-m3-outline/10 flex-shrink-0"
                    style={{ backgroundColor: bg }}
                  >
                    <span className="text-xl font-black" style={{ color: fg }}>
                      Sample Text
                    </span>
                  </div>

                  {/* Info */}
                  <div className="flex-grow">
                    <h3 className="text-lg font-black text-m3-on-surface mb-1">
                      {pair.name}
                    </h3>
                    <p className="text-sm text-m3-on-surface-variant opacity-60 mb-2">
                      {pair.usage}
                    </p>
                    <div className="flex items-center gap-3 text-xs font-mono">
                      <span className="text-m3-on-surface-variant">
                        {pair.foreground.replace("color-m3-", "")} on{" "}
                        {pair.background.replace("color-m3-", "")}
                      </span>
                    </div>
                  </div>

                  {/* Ratio Badge */}
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-3xl font-black text-m3-on-surface font-mono">
                        {ratio.toFixed(2)}:1
                      </p>
                    </div>
                    <div
                      className="px-4 py-2 rounded-full font-black text-sm uppercase tracking-wider shadow-sm"
                      style={{
                        backgroundColor: `${wcag.color}20`,
                        color: wcag.color,
                        border: `2px solid ${wcag.color}`,
                      }}
                    >
                      {wcag.level}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* WCAG Legend */}
        <div className="mt-12 p-6 bg-m3-surface-variant/10 rounded-[24px] border border-m3-outline/5">
          <h3 className="text-sm font-black uppercase tracking-widest text-m3-on-surface-variant opacity-60 mb-4">
            WCAG 2.1 Standards
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="font-black text-m3-on-surface">AAA: </span>
              <span className="text-m3-on-surface-variant">≥7:1 (Best)</span>
            </div>
            <div>
              <span className="font-black text-m3-on-surface">AA: </span>
              <span className="text-m3-on-surface-variant">≥4.5:1 (Good)</span>
            </div>
            <div>
              <span className="font-black text-m3-on-surface">AA Large: </span>
              <span className="text-m3-on-surface-variant">≥3:1 (18pt+)</span>
            </div>
            <div>
              <span className="font-black text-m3-on-surface">Fail: </span>
              <span className="text-m3-on-surface-variant">&lt;3:1 (Poor)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Colors;
