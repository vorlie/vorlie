import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import SEO from "../components/SEO";

interface ColorPair {
  name: string;
  foreground: string;
  background: string;
  usage: string;
}

const Colors: React.FC = () => {
  const [colors, setColors] = useState<{ [key: string]: string }>({});
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
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
    const extracted: { [key: string]: string } = {};
    colorVars.forEach((v) => {
      const val = computedStyle.getPropertyValue(`--${v}`).trim();
      if (val) extracted[v] = val;
    });
    setColors(extracted);
  }, []);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 1500);
  };

  const getContrastRatio = (fg: string, bg: string): number => {
    const getLuminance = (hex: string): number => {
      const rgb = parseInt(hex.slice(1), 16);
      const r = ((rgb >> 16) & 0xff) / 255;
      const g = ((rgb >> 8) & 0xff) / 255;
      const b = (rgb & 0xff) / 255;
      const [rs, gs, bs] = [r, g, b].map((c) =>
        c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4),
      );
      return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
    };
    const l1 = getLuminance(fg);
    const l2 = getLuminance(bg);
    return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
  };

  const getWCAGLevel = (ratio: number): { level: string; color: string } => {
    if (ratio >= 7) return { level: "AAA", color: "#00e676" };
    if (ratio >= 4.5) return { level: "AA", color: "#76ff03" };
    if (ratio >= 3) return { level: "AA Large", color: "#ffea00" };
    return { level: "Fail", color: "#f50057" };
  };

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
    <div className="min-h-screen text-m3-on-surface animate-reveal">
      <SEO
        title="Color System"
        description="Material 3 Palette and WCAG Contrast Ratios"
        url="https://vorlie.pl/colors"
      />

      <div className="max-w-full mx-auto relative z-10 py-8">
        {/* Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <p className="text-m3-primary text-xs font-black uppercase tracking-[0.25em] mb-3 opacity-70">
            Design System
          </p>
          <h1 className="text-5xl sm:text-7xl font-black text-m3-on-surface tracking-tighter mb-4">
            Color System
          </h1>
          <div className="h-1.5 w-20 bg-gradient-to-r from-m3-primary to-m3-secondary rounded-sm mb-6" />
          <p className="text-lg text-m3-on-surface-variant font-bold opacity-70 max-w-xl leading-relaxed">
            Material 3 dynamic palette with live WCAG contrast checks. Click any
            swatch to copy the hex value.
          </p>
        </motion.div>

        {/* Color Swatches */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="m3-card p-6 sm:p-10 mb-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="h-5 w-1 bg-m3-primary rounded-none" />
            <h2 className="text-sm font-black text-m3-primary uppercase tracking-[0.2em]">
              Current Palette
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3">
            {Object.entries(colors).map(([name, value]) => (
              <button
                key={name}
                onClick={() => copyToClipboard(value, name)}
                className="group flex flex-col text-left hover:scale-105 transition-transform duration-300"
                title={`Copy ${value}`}
              >
                <div
                  className="w-full h-20 rounded-none mb-2 shadow-inner border border-white/10 relative overflow-hidden"
                  style={{ backgroundColor: value }}
                >
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/30">
                    <span className="material-symbols-rounded text-white text-[18px]">
                      {copied === name ? "check" : "content_copy"}
                    </span>
                  </div>
                </div>
                <p className="text-[10px] font-black uppercase tracking-widest text-m3-on-surface-variant opacity-60 leading-none mb-0.5">
                  {name.replace("color-m3-", "").replace(/-/g, " ")}
                </p>
                <p className="text-xs font-black text-m3-primary font-mono leading-none">
                  {value}
                </p>
              </button>
            ))}
          </div>
        </motion.section>

        {/* Contrast Ratios */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="m3-card p-6 sm:p-10 mb-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="h-5 w-1 bg-m3-secondary rounded-none" />
            <h2 className="text-sm font-black text-m3-secondary uppercase tracking-[0.2em]">
              Contrast Ratios
            </h2>
          </div>
          <div className="space-y-3">
            {colorPairs.map((pair) => {
              const fg = colors[pair.foreground];
              const bg = colors[pair.background];
              if (!fg || !bg) return null;
              const ratio = getContrastRatio(fg, bg);
              const wcag = getWCAGLevel(ratio);

              return (
                <div
                  key={pair.name}
                  className="flex flex-col md:flex-row md:items-center gap-5 p-4 bg-m3-on-surface/5 rounded-none border border-m3-outline/5 hover:bg-m3-on-surface/10 transition-colors duration-300"
                >
                  <div
                    className="w-full md:w-36 h-16 rounded-none flex items-center justify-center shadow-inner border border-m3-outline/10 flex-shrink-0"
                    style={{ backgroundColor: bg }}
                  >
                    <span className="text-lg font-black" style={{ color: fg }}>
                      Sample
                    </span>
                  </div>

                  <div className="flex-grow min-w-0">
                    <h3 className="text-sm font-black text-m3-on-surface mb-0.5 truncate">
                      {pair.name}
                    </h3>
                    <p className="text-[11px] text-m3-on-surface-variant opacity-50 font-black uppercase tracking-wider">
                      {pair.usage}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 flex-shrink-0">
                    <p className="text-2xl font-black text-m3-on-surface font-mono">
                      {ratio.toFixed(2)}:1
                    </p>
                    <div
                      className="px-3 py-1 rounded-none font-black text-xs uppercase tracking-wider"
                      style={{
                        backgroundColor: `${wcag.color}20`,
                        color: wcag.color,
                        border: `1.5px solid ${wcag.color}60`,
                      }}
                    >
                      {wcag.level}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.section>

        {/* WCAG Legend */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="m3-card p-5 sm:p-6"
        >
          <p className="text-[10px] font-black uppercase tracking-[0.25em] text-m3-on-surface-variant opacity-40 mb-4">
            WCAG 2.1 Standards
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
            {[
              { label: "AAA", desc: "≥7:1 · Best", color: "#00e676" },
              { label: "AA", desc: "≥4.5:1 · Good", color: "#76ff03" },
              { label: "AA Large", desc: "≥3:1 · 18pt+", color: "#ffea00" },
              { label: "Fail", desc: "<3:1 · Poor", color: "#f50057" },
            ].map(({ label, desc, color }) => (
              <div
                key={label}
                className="flex items-center gap-2 p-2 bg-m3-on-surface/5 rounded-none"
              >
                <div
                  className="w-2 h-2 rounded-none flex-shrink-0"
                  style={{ backgroundColor: color }}
                />
                <div>
                  <span className="font-black text-m3-on-surface text-xs">
                    {label}:{" "}
                  </span>
                  <span className="text-m3-on-surface-variant text-xs opacity-60">
                    {desc}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Colors;
