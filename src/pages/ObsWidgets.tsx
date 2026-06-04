import { useState } from "react";
import { motion } from "framer-motion";
import {
  Copy,
  Check,
  ExternalLink,
  Settings2,
  Zap,
  ZapOff,
  Globe,
  Eye,
} from "lucide-react";
import ObsSpotify, { SpotifyTheme } from "../components/obs/obsLanyard";
import SEO from "../components/SEO";

function ObsWidgets() {
  const [copiedWidget, setCopiedWidget] = useState<string | null>(null);
  const [userDiscordId, setUserDiscordId] = useState("");
  const [selectedDomain, setSelectedDomain] = useState<"main" | "backup">(
    "main",
  );
  const [selectedTheme, setSelectedTheme] = useState<SpotifyTheme>("badge");
  const [motionEnabled, setMotionEnabled] = useState(true);
  const [frameCorners, setFrameCorners] = useState<
    "rounded" | "sharp" | "pill"
  >("rounded");
  const [frameColor, setFrameColor] = useState<"dynamic" | "static">("dynamic");
  const [frameGlow, setFrameGlow] = useState<
    "off" | "soft" | "medium" | "strong"
  >("medium");

  const copyToClipboard = (text: string, widget: string) => {
    let finalUrl = text;
    if (widget === "music") {
      const url = new URL(text);
      url.searchParams.set("theme", selectedTheme);
      if (!motionEnabled) url.searchParams.set("motion", "false");
      finalUrl = url.toString();
    }
    navigator.clipboard.writeText(finalUrl);
    setCopiedWidget(widget);
    setTimeout(() => setCopiedWidget(null), 2000);
  };

  const exampleDiscordId = "614807913302851594";
  const discordId = userDiscordId || exampleDiscordId;
  const mainDomain = "https://vorlie.pl";
  const backupDomain = "https://vorliev2.pages.dev";
  const baseDomain = selectedDomain === "main" ? mainDomain : backupDomain;

  const themes: SpotifyTheme[] = [
    "badge",
    "compact",
    "glass",
    "modern",
    "tidal",
    "amuse",
    "musicbee",
  ];

  const widgets = [
    {
      id: "music",
      name: "Music Now Playing",
      description:
        "Display your current track from Spotify, Tidal, or MusicBee with album art, artist, and smooth progress tracking. Adaptive Material Design 3 styling.",
      icon: "music_note",
      path: "nowplaying",
      features: [
        "Spotify, Tidal & MusicBee support",
        "Real-time album art & progress",
        "Material Design 3 aesthetic",
        "Color-adaptive UI components",
        "Auto-hide when offline",
      ],
    },
    {
      id: "gameframe",
      name: "Game Frame",
      description:
        "A dynamic frame that reacts to your Spotify album colors. Great for highlighting your screen or creating atmosphere.",
      icon: "flare",
      path: "gameframe",
      features: [
        "Color-reactive border",
        "Smooth transitions",
        "Spotify integration",
        "Desktop-sized effect",
      ],
    },
    {
      id: "camframe",
      name: "Camera Frame",
      description:
        "Elegant camera frame overlay with dynamic color matching from your album art. Clean Material Design styling.",
      icon: "photo_camera",
      path: "camframe",
      features: [
        "Rounded corners",
        "Color-matched styling",
        "Subtle shine effect",
        "Material Design 3 aesthetic",
      ],
    },
  ];

  const behaviors = [
    {
      title: "Offline State",
      desc: "Widgets automatically hide when your Discord status is offline.",
    },
    {
      title: "No Active Playback",
      desc: "The Music card hides if nothing is playing on Spotify, Tidal, or MusicBee.",
    },
    {
      title: "Real-time Updates",
      desc: "WebSocket-driven push updates ensure zero lag for progress and track changes.",
    },
    {
      title: "GPU Optimized",
      desc: "Use motion=false to disable all internal transitions for ultra-low CPU usage.",
    },
  ];

  const apiFeatures = [
    "Spotify Presence",
    "Tidal (via MusicPresence)",
    "MusicBee (via MusicPresence)",
    "Real-time Album Art",
    "Live Timestamps",
    "Color Palette Extraction",
  ];

  return (
    <div className="min-h-screen text-m3-on-surface animate-reveal">
      <SEO
        title="OBS Widgets"
        description="Beautiful, customizable OBS widgets for Spotify, Tidal, and MusicBee streamers."
        url="https://vorlie.pl/obs-widgets"
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
            Streaming Tools
          </p>
          <h1 className="text-5xl sm:text-7xl font-black text-m3-on-surface tracking-tighter mb-4">
            OBS Widgets
          </h1>
          <div className="h-1.5 w-20 bg-gradient-to-r from-m3-primary to-m3-secondary rounded-sm mb-6" />
          <p className="text-lg text-m3-on-surface-variant font-bold opacity-70 max-w-2xl leading-relaxed">
            Beautiful, customizable widgets designed for OBS streamers. Support
            for <span className="text-m3-on-surface opacity-100">Spotify</span>,{" "}
            <span className="text-m3-on-surface opacity-100">Tidal</span>, and{" "}
            <span className="text-m3-on-surface opacity-100">MusicBee</span> via{" "}
            <a
              href="https://musicpresence.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-m3-primary hover:underline font-black"
            >
              MusicPresence.app
            </a>
            .
          </p>
        </motion.div>

        {/* Setup Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="m3-card p-6 sm:p-10 mb-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="h-5 w-1 bg-m3-primary rounded-sm" />
            <h2 className="text-sm font-black text-m3-primary uppercase tracking-[0.2em]">
              Setup Instructions
            </h2>
          </div>

          {/* Required Warning */}
          <div className="flex items-start gap-3 bg-amber-500/10 text-amber-400 px-5 py-4 rounded-none border border-amber-500/20 mb-8">
            <span className="material-symbols-rounded text-[18px] flex-shrink-0 mt-0.5">
              warning
            </span>
            <p className="text-sm font-bold leading-relaxed">
              You must be in the{" "}
              <a
                href="https://discord.gg/UrXF2cfJ7F"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:opacity-80"
              >
                Lanyard Discord server
              </a>{" "}
              for the widgets to work. This is how the API accesses your Discord
              status.
            </p>
          </div>

          <div className="space-y-8">
            {/* Step 1 */}
            <div className="flex gap-5">
              <div className="flex-shrink-0 w-8 h-8 rounded-sm bg-m3-primary text-m3-on-primary flex items-center justify-center font-black text-sm">
                1
              </div>
              <div>
                <h3 className="font-black text-m3-on-surface mb-1">
                  Find Your Discord ID
                </h3>
                <p className="text-m3-on-surface-variant text-sm leading-relaxed mb-2">
                  Enable Developer Mode in Discord (Settings → Advanced →
                  Developer Mode), then right-click your profile and select
                  "Copy User ID".
                </p>
                <code className="text-xs bg-m3-on-surface/5 px-3 py-1.5 rounded-sm text-m3-primary font-black border border-m3-outline/10">
                  614807913302851594
                </code>
              </div>
            </div>

            {/* Step 2 — Config */}
            <div className="flex gap-5">
              <div className="flex-shrink-0 w-8 h-8 rounded-sm bg-m3-primary text-m3-on-primary flex items-center justify-center font-black text-sm">
                2
              </div>
              <div className="flex-grow">
                <h3 className="font-black text-m3-on-surface mb-4">
                  Configure Your Widget
                </h3>

                <input
                  type="text"
                  placeholder="Paste your Discord ID here..."
                  value={userDiscordId}
                  onChange={(e) => setUserDiscordId(e.target.value)}
                  className="w-full bg-m3-on-surface/5 border border-m3-outline/20 rounded-sm px-4 py-3 text-m3-on-surface placeholder-m3-on-surface-variant/40 focus:outline-none focus:border-m3-primary/40 transition-colors font-bold text-sm mb-5"
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {/* Domain */}
                  <div className="md:col-span-3">
                    <p className="text-[10px] font-black uppercase tracking-widest text-m3-on-surface-variant opacity-50 mb-2 flex items-center gap-1.5">
                      <Globe size={12} /> Global Settings
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {(["main", "backup"] as const).map((d) => (
                        <button
                          key={d}
                          onClick={() => setSelectedDomain(d)}
                          className={`px-3 py-1.5 rounded-sm text-xs font-black transition-all capitalize ${
                            selectedDomain === d
                              ? "bg-m3-primary text-m3-on-primary shadow-lg"
                              : "bg-m3-on-surface/5 text-m3-on-surface-variant hover:bg-m3-on-surface/10 border border-m3-outline/10"
                          }`}
                        >
                          Domain: {d}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Theme */}
                  <div className="md:col-span-3 pt-4 border-t border-m3-outline/10">
                    <p className="text-[10px] font-black uppercase tracking-widest text-m3-on-surface-variant opacity-50 mb-2 flex items-center gap-1.5">
                      <Settings2 size={12} /> Music Widget Settings
                    </p>
                  </div>

                  <div className="md:col-span-2">
                    <div className="flex flex-wrap gap-2">
                      {themes.map((t) => (
                        <button
                          key={t}
                          onClick={() => setSelectedTheme(t)}
                          className={`px-3 py-1.5 rounded-sm text-xs font-black capitalize transition-all ${
                            selectedTheme === t
                              ? "bg-m3-primary text-m3-on-primary shadow-lg"
                              : "bg-m3-on-surface/5 text-m3-on-surface-variant hover:bg-m3-on-surface/10 border border-m3-outline/10"
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Motion */}
                  <div>
                    <button
                      onClick={() => setMotionEnabled(!motionEnabled)}
                      className={`flex items-center gap-2 px-4 py-1.5 rounded-sm text-xs font-black transition-all ${
                        motionEnabled
                          ? "bg-green-500/15 text-green-400 border border-green-500/25"
                          : "bg-orange-500/15 text-orange-400 border border-orange-500/25"
                      }`}
                    >
                      {motionEnabled ? <Zap size={12} /> : <ZapOff size={12} />}
                      {motionEnabled ? "Animated" : "Static (Low CPU)"}
                    </button>
                    <p className="text-[10px] text-m3-on-surface-variant opacity-40 mt-2 leading-relaxed">
                      Static mode disables progress bars and visualizers.
                    </p>
                  </div>

                  {/* Frames */}
                  <div className="md:col-span-3 pt-4 border-t border-m3-outline/10">
                    <p className="text-[10px] font-black uppercase tracking-widest text-m3-on-surface-variant opacity-50 mb-2 flex items-center gap-1.5">
                      <Eye size={12} /> Frame Widget Settings
                    </p>
                  </div>

                  <div>
                    <div className="flex flex-wrap gap-2">
                      {(["rounded", "sharp", "pill"] as const).map((c) => (
                        <button
                          key={c}
                          onClick={() => setFrameCorners(c)}
                          className={`px-3 py-1.5 rounded-sm text-xs font-black capitalize transition-all ${
                            frameCorners === c
                              ? "bg-m3-primary text-m3-on-primary shadow-lg"
                              : "bg-m3-on-surface/5 text-m3-on-surface-variant hover:bg-m3-on-surface/10 border border-m3-outline/10"
                          }`}
                        >
                          {c} Corners
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex flex-wrap gap-2">
                      {(["dynamic", "static"] as const).map((c) => (
                        <button
                          key={c}
                          onClick={() => setFrameColor(c)}
                          className={`px-3 py-1.5 rounded-sm text-xs font-black capitalize transition-all ${
                            frameColor === c
                              ? "bg-m3-primary text-m3-on-primary shadow-lg"
                              : "bg-m3-on-surface/5 text-m3-on-surface-variant hover:bg-m3-on-surface/10 border border-m3-outline/10"
                          }`}
                        >
                          {c} Colors
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex flex-wrap gap-2">
                      {(["off", "soft", "medium", "strong"] as const).map(
                        (g) => (
                          <button
                            key={g}
                            onClick={() => setFrameGlow(g)}
                            className={`px-3 py-1.5 rounded-sm text-xs font-black capitalize transition-all ${
                              frameGlow === g
                                ? "bg-m3-primary text-m3-on-primary shadow-lg"
                                : "bg-m3-on-surface/5 text-m3-on-surface-variant hover:bg-m3-on-surface/10 border border-m3-outline/10"
                            }`}
                          >
                            Glow: {g}
                          </button>
                        ),
                      )}
                    </div>
                  </div>
                </div>

                {/* Live Preview */}
                <div className="mt-6 pt-6 border-t border-m3-outline/10">
                  <p className="text-[10px] font-black uppercase tracking-widest text-m3-on-surface-variant opacity-50 mb-4 flex items-center gap-1.5">
                    <Eye size={12} /> Live Preview
                  </p>
                  <div className="flex justify-center bg-m3-on-surface/5 rounded-sm p-8 border border-m3-outline/5 min-h-[300px] overflow-hidden">
                    <div className="scale-75 md:scale-100 origin-center">
                      <ObsSpotify
                        discordId={discordId}
                        theme={selectedTheme}
                        animate={motionEnabled}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-5">
              <div className="flex-shrink-0 w-8 h-8 rounded-sm bg-m3-primary text-m3-on-primary flex items-center justify-center font-black text-sm">
                3
              </div>
              <div>
                <h3 className="font-black text-m3-on-surface mb-1">
                  Add to OBS
                </h3>
                <p className="text-m3-on-surface-variant text-sm leading-relaxed mb-3">
                  Create a new Browser Source in OBS and paste your personalized
                  URL. The widget will automatically:
                </p>
                <ul className="space-y-1">
                  {[
                    "Connect to your Discord activity via Lanyard API",
                    "Detect your music from Spotify, Tidal, or MusicBee",
                    "Update in real-time with live progress tracking",
                    "Adapt colors globally to your current album art",
                    "Hide automatically when playback stops",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm text-m3-on-surface-variant"
                    >
                      <span className="text-m3-primary mt-0.5 flex-shrink-0">
                        •
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Widget Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6"
        >
          {widgets.map((widget, i) => {
            let widgetUrl = `${baseDomain}/obs/${widget.path}/${discordId}`;
            if (widget.id === "music") {
              const params = new URLSearchParams();
              params.set("theme", selectedTheme);
              if (!motionEnabled) params.set("motion", "false");
              widgetUrl += `?${params.toString()}`;
            } else if (widget.id === "camframe" || widget.id === "gameframe") {
              const params = new URLSearchParams();
              if (frameCorners !== "rounded")
                params.set("corners", frameCorners);
              if (frameColor !== "dynamic") params.set("color", frameColor);
              if (frameGlow !== (widget.id === "camframe" ? "soft" : "medium"))
                params.set("glow", frameGlow);
              const paramString = params.toString();
              if (paramString) widgetUrl += `?${paramString}`;
            }

            return (
              <motion.div
                key={widget.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.06 }}
                className="m3-card p-6 flex flex-col hover:border-m3-primary/20 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-sm bg-m3-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-rounded text-m3-primary text-[20px]">
                      {widget.icon}
                    </span>
                  </div>
                  <h3 className="font-black text-m3-on-surface tracking-tight">
                    {widget.name}
                  </h3>
                </div>

                <p className="text-m3-on-surface-variant text-sm leading-relaxed mb-4 flex-grow">
                  {widget.description}
                </p>

                <div className="mb-5">
                  <p className="text-[10px] font-black uppercase tracking-widest text-m3-on-surface-variant opacity-50 mb-2">
                    Features
                  </p>
                  <ul className="space-y-1">
                    {widget.features.map((f) => (
                      <li
                        key={f}
                        className="text-xs text-m3-on-surface-variant flex items-start gap-1.5"
                      >
                        <span className="text-m3-primary mt-0.5 flex-shrink-0">
                          •
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => copyToClipboard(widgetUrl, widget.id)}
                    className="w-full bg-m3-primary text-m3-on-primary rounded-sm py-2.5 px-4 font-black text-xs uppercase tracking-wide flex items-center justify-center gap-2 hover:opacity-90 hover:scale-[1.02] active:scale-95 transition-all"
                  >
                    {copiedWidget === widget.id ? (
                      <>
                        <Check size={14} /> Copied!
                      </>
                    ) : (
                      <>
                        <Copy size={14} /> Copy URL
                      </>
                    )}
                  </button>
                  <a
                    href={widgetUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-m3-on-surface/5 text-m3-on-surface-variant rounded-sm py-2.5 px-4 font-black text-xs uppercase tracking-wide flex items-center justify-center gap-2 hover:bg-m3-on-surface/10 transition-colors border border-m3-outline/10"
                  >
                    <ExternalLink size={14} /> Preview
                  </a>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Customization */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="m3-card p-6 sm:p-10 mb-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="h-5 w-1 bg-m3-secondary rounded-sm" />
            <h2 className="text-sm font-black text-m3-secondary uppercase tracking-[0.2em]">
              Customization
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <div className="p-5 bg-m3-on-surface/5 rounded-none border border-m3-outline/5">
              <p className="text-[10px] font-black uppercase tracking-widest text-m3-primary mb-2">
                Theme Selection
              </p>
              <code className="text-xs text-m3-on-surface-variant font-mono">
                ?theme=[badge|compact|glass|modern|tidal|amuse|musicbee]
              </code>
            </div>
            <div className="p-5 bg-m3-on-surface/5 rounded-none border border-m3-outline/5">
              <p className="text-[10px] font-black uppercase tracking-widest text-m3-primary mb-2">
                Animation Toggle
              </p>
              <code className="text-xs text-m3-on-surface-variant font-mono">
                ?motion=[true|false]
              </code>
            </div>
          </div>

          <h3 className="font-black text-m3-on-surface mb-2">URL Structure</h3>
          <div className="bg-m3-on-surface/5 rounded-none p-4 font-mono text-sm border border-m3-outline/5 overflow-x-auto mb-4">
            <code>
              https://vorlie.pl/obs/nowplaying
              <span className="text-m3-primary">/YOUR_DISCORD_ID</span>
              <span className="text-m3-on-surface-variant opacity-40">
                ?theme=musicbee&motion=true
              </span>
            </code>
          </div>
          <p className="text-sm text-m3-on-surface-variant">
            Replace{" "}
            <code className="bg-m3-on-surface/5 px-2 py-0.5 rounded-sm border border-m3-outline/10 text-m3-primary font-black text-xs">
              YOUR_DISCORD_ID
            </code>{" "}
            with your 18-digit Discord ID.
          </p>

          {/* Widget Behavior */}
          <div className="pt-6 mt-6 border-t border-m3-outline/10">
            <div className="flex items-center gap-3 mb-4">
              <Zap size={14} className="text-m3-primary" />
              <h3 className="font-black text-m3-on-surface text-sm uppercase tracking-wider">
                Widget Behavior
              </h3>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {behaviors.map((b) => (
                <div
                  key={b.title}
                  className="flex gap-3 bg-m3-on-surface/5 p-4 rounded-none border border-m3-outline/5"
                >
                  <span className="text-m3-primary font-black flex-shrink-0 mt-0.5">
                    ✓
                  </span>
                  <div>
                    <p className="font-black text-xs text-m3-on-surface mb-1">
                      {b.title}
                    </p>
                    <p className="text-xs text-m3-on-surface-variant leading-relaxed">
                      {b.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Behind the Scenes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="m3-card p-6 sm:p-10"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="h-5 w-1 bg-m3-primary rounded-sm" />
            <h2 className="text-sm font-black text-m3-primary uppercase tracking-[0.2em]">
              Behind the Scenes
            </h2>
          </div>
          <p className="text-m3-on-surface-variant text-sm leading-relaxed mb-5">
            Powered by the{" "}
            <a
              href="https://lanyard.rest"
              className="text-m3-primary hover:underline font-black"
            >
              Lanyard API
            </a>
            , which provides real-time Discord presence data. All data is
            fetched via WebSocket connections with React, Tailwind CSS, and
            Framer Motion.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {apiFeatures.map((item) => (
              <div
                key={item}
                className="flex items-center gap-2 bg-m3-on-surface/5 rounded-none p-3 border border-m3-outline/5 text-xs text-m3-on-surface-variant"
              >
                <span className="text-m3-primary flex-shrink-0">✓</span>
                {item}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default ObsWidgets;
