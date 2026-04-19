import { useState } from "react";
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

function ObsWidgets() {
  const [copiedWidget, setCopiedWidget] = useState<string | null>(null);
  const [userDiscordId, setUserDiscordId] = useState("");
  const [selectedDomain, setSelectedDomain] = useState<"main" | "backup">(
    "main",
  );
  const [selectedTheme, setSelectedTheme] = useState<SpotifyTheme>("badge");
  const [motionEnabled, setMotionEnabled] = useState(true);

  const copyToClipboard = (text: string, widget: string) => {
    let finalUrl = text;
    if (widget === "music") {
      const url = new URL(text);
      url.searchParams.set("theme", selectedTheme);
      if (!motionEnabled) {
        url.searchParams.set("motion", "false");
      }
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

  const widgets = [
    {
      id: "music",
      name: "Music Now Playing",
      description:
        "Display your current track from Spotify, Tidal, or MusicBee with album art, artist, and smooth progress tracking. Features adaptive Material Design 3 styling based on album colors.",
      icon: "🎵",
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
      id: "glow",
      name: "Glow Border",
      description:
        "A dynamic glowing border that reacts to your Spotify album colors. Great for highlighting your screen or creating atmosphere.",
      icon: "✨",
      path: "glow",
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
      icon: "📷",
      path: "camframe",
      features: [
        "Rounded corners",
        "Color-matched styling",
        "Subtle shine effect",
        "Material Design 3 aesthetic",
      ],
    },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-black mb-4">OBS Widgets</h1>
        <p className="text-lg text-m3-on-surface-variant max-w-2xl">
          Beautiful, customizable widgets designed for OBS streamers. 
          Support for <span className="font-bold">Spotify</span>, <span className="font-bold">Tidal</span>, and <span className="font-bold">MusicBee</span> (via <a href="https://musicpresence.app" target="_blank" rel="noopener noreferrer" className="text-m3-primary hover:underline font-bold">MusicPresence.app</a>).
        </p>
      </div>

      {/* Setup Instructions */}
      <div className="bg-m3-surface-container rounded-3xl p-8 mb-12 border border-m3-outline/20">
        <h2 className="text-2xl font-bold mb-6">Setup Instructions</h2>

        <div className="bg-m3-surface rounded-2xl p-4 mb-6 border-l-4 border-m3-primary">
          <p className="text-sm text-m3-on-surface">
            <strong>⚠️ Required:</strong> You must be in the{" "}
            <a
              href="https://discord.gg/UrXF2cfJ7F"
              target="_blank"
              rel="noopener noreferrer"
              className="text-m3-primary hover:underline font-bold"
            >
              Lanyard Discord server
            </a>{" "}
            for the widgets to work. This is how the API accesses your Discord
            status.
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-m3-primary text-m3-on-primary flex items-center justify-center font-bold text-sm">
              1
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">Find Your Discord ID</h3>
              <p className="text-m3-on-surface-variant mb-3">
                Enable Developer Mode in Discord (Settings → Advanced →
                Developer Mode), then right-click your profile and select "Copy
                User ID".
              </p>
              <p className="text-sm text-m3-on-surface/70">
                Your Discord ID looks like:{" "}
                <code className="bg-m3-surface px-2 py-1 rounded text-m3-primary">
                  614807913302851594
                </code>
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-m3-primary text-m3-on-primary flex items-center justify-center font-bold text-sm">
              2
            </div>
            <div className="flex-grow">
              <h3 className="font-bold text-lg mb-4">Enter Your Discord ID</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Paste your Discord ID here..."
                  value={userDiscordId}
                  onChange={(e) => setUserDiscordId(e.target.value)}
                  className="w-full bg-m3-surface border border-m3-outline/30 rounded-2xl px-4 py-3 text-m3-on-surface placeholder-m3-on-surface/50 focus:outline-none focus:border-m3-primary transition-colors"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
                  <div className="space-y-3">
                    <p className="text-sm font-bold text-m3-on-surface-variant flex items-center gap-2">
                      <Globe size={16} /> Select Domain:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {(["main", "backup"] as const).map((d) => (
                        <button
                          key={d}
                          onClick={() => setSelectedDomain(d)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                            selectedDomain === d
                              ? "bg-m3-primary text-m3-on-primary shadow-lg scale-105"
                              : "bg-m3-surface text-m3-on-surface-variant hover:bg-m3-surface-variant"
                          }`}
                        >
                          {d === "main" ? "Main" : "Backup"}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <p className="text-sm font-bold text-m3-on-surface-variant flex items-center gap-2">
                      <Settings2 size={16} /> Music Theme:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {(
                        [
                          "badge",
                          "compact",
                          "glass",
                          "modern",
                          "tidal",
                          "amuse",
                          "musicbee",
                        ] as const
                      ).map((t) => (
                        <button
                          key={t}
                          onClick={() => setSelectedTheme(t)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${
                            selectedTheme === t
                              ? "bg-m3-primary text-m3-on-primary shadow-lg scale-105"
                              : "bg-m3-surface text-m3-on-surface-variant hover:bg-m3-surface-variant"
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <p className="text-sm font-bold text-m3-on-surface-variant flex items-center gap-2">
                      {motionEnabled ? <Zap size={16} /> : <ZapOff size={16} />}
                      Internal Animations:
                    </p>
                    <button
                      onClick={() => setMotionEnabled(!motionEnabled)}
                      className={`flex items-center gap-2 px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        motionEnabled
                          ? "bg-green-500/20 text-green-500 border border-green-500/30"
                          : "bg-orange-500/20 text-orange-500 border border-orange-500/30 shadow-inner"
                      }`}
                    >
                      {motionEnabled ? "Animated (Smooth)" : "Static (Low CPU)"}
                    </button>
                    <p className="text-[10px] text-m3-on-surface-variant/70 leading-relaxed italic">
                      Disabling makes the widget "Static"—stopping smooth progress bars and visualizers to save CPU.
                    </p>
                  </div>
                </div>

                {/* Live Preview Section */}
                <div className="mt-8 pt-8 border-t border-m3-outline/20">
                  <p className="text-sm font-bold text-m3-on-surface-variant flex items-center gap-2 mb-6">
                    <Eye size={16} /> Live Preview:
                  </p>
                  <div className="flex justify-center bg-m3-surface rounded-2xl p-8 border border-m3-outline/10 min-h-[300px] overflow-hidden">
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
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-m3-primary text-m3-on-primary flex items-center justify-center font-bold text-sm">
              3
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">Choose Your Widget</h3>
              <p className="text-m3-on-surface-variant">
                Select one of the widgets below and copy your personalized URL.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-m3-primary text-m3-on-primary flex items-center justify-center font-bold text-sm">
              3
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">Add to OBS</h3>
              <p className="text-m3-on-surface-variant mb-3">
                In OBS, create a new Browser Source and paste your URL. The
                widget will automatically:
              </p>
              <ul className="list-disc list-inside space-y-1 text-m3-on-surface-variant text-sm">
                <li>Connect to your Discord activity via Lanyard API</li>
                <li>Detect your music from Spotify, Tidal, or MusicBee</li>
                <li>Update in real-time with live progress tracking</li>
                <li>Adapt colors globally to your current album art</li>
                <li>Hide automatically when playback stops</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Widgets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {widgets.map((widget) => {
          let widgetUrl = `${baseDomain}/obs/${widget.path}/${discordId}`;

          if (widget.id === "music") {
            const params = new URLSearchParams();
            params.set("theme", selectedTheme);
            if (!motionEnabled) params.set("motion", "false");
            widgetUrl += `?${params.toString()}`;
          }

          return (
            <div
              key={widget.id}
              className="bg-m3-surface-container rounded-3xl p-6 border border-m3-outline/20 flex flex-col h-full hover:border-m3-outline/40 transition-colors"
            >
              <div className="text-4xl mb-3">{widget.icon}</div>
              <h3 className="text-xl font-bold mb-2">{widget.name}</h3>
              <p className="text-m3-on-surface-variant text-sm mb-4 flex-grow">
                {widget.description}
              </p>

              <div className="mb-4">
                <p className="text-xs font-bold uppercase tracking-wider text-m3-on-surface-variant mb-2">
                  Features
                </p>
                <ul className="space-y-1">
                  {widget.features.map((feature) => (
                    <li
                      key={feature}
                      className="text-sm text-m3-on-surface-variant flex items-start gap-2"
                    >
                      <span className="text-m3-primary mt-1">•</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => copyToClipboard(widgetUrl, widget.id)}
                  className="w-full bg-m3-primary text-m3-on-primary rounded-2xl py-2 px-4 font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                >
                  {copiedWidget === widget.id ? (
                    <>
                      <Check size={16} /> Copied!
                    </>
                  ) : (
                    <>
                      <Copy size={16} /> Copy URL
                    </>
                  )}
                </button>

                <a
                  href={widgetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-m3-surface-variant text-m3-on-surface-variant rounded-2xl py-2 px-4 font-bold text-sm flex items-center justify-center gap-2 hover:bg-m3-outline/20 transition-colors"
                >
                  <ExternalLink size={16} />
                  Preview
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Customization Section */}
      <div className="bg-m3-surface-container rounded-3xl p-8 mb-12 border border-m3-outline/20">
        <h2 className="text-2xl font-bold mb-6">Customization</h2>

        <div className="space-y-6">
          <div>
            <h3 className="font-bold text-lg mb-3">
              URL Parameters (Advanced)
            </h3>
            <p className="text-m3-on-surface-variant mb-4 font-medium">
              Manually configure your widget by adding query parameters to the URL:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="bg-m3-surface rounded-2xl p-4 border border-m3-outline/10">
                <p className="text-[10px] font-black uppercase tracking-widest text-m3-primary mb-2">Theme Selection</p>
                <code className="text-sm text-m3-on-surface-variant">
                  ?theme=[badge|compact|glass|modern|tidal|amuse|musicbee]
                </code>
              </div>
              <div className="bg-m3-surface rounded-2xl p-4 border border-m3-outline/10">
                <p className="text-[10px] font-black uppercase tracking-widest text-m3-primary mb-2">Animation Toggle</p>
                <code className="text-sm text-m3-on-surface-variant">
                  ?motion=[true|false]
                </code>
              </div>
            </div>

            <h3 className="font-bold text-lg mb-3">Using Your Own Discord ID</h3>
            <p className="text-m3-on-surface-variant mb-4">
              All widgets use URL-based configuration. Simply modify the Discord
              ID at the end of the URL:
            </p>
            <div className="space-y-2 mb-4">
              <div className="bg-m3-surface rounded-2xl p-4 font-mono text-sm border border-m3-outline/5 overflow-x-auto">
                <code>
                  https://vorlie.pl/obs/nowplaying
                  <span className="text-m3-primary">/YOUR_DISCORD_ID</span>
                  <span className="text-m3-on-surface-variant/40">?theme=musicbee&motion=true</span>
                </code>
              </div>
            </div>
            <p className="text-sm text-m3-on-surface-variant">
              Replace{" "}
              <code className="bg-m3-surface px-2 py-1 rounded border border-m3-outline/10">
                YOUR_DISCORD_ID
              </code>{" "}
              with your 18-digit ID.
            </p>
          </div>

          <div className="pt-6 border-t border-m3-outline/10">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <Zap size={20} className="text-m3-primary" /> Widget Behavior
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <li className="flex gap-4 bg-m3-surface/50 p-4 rounded-2xl border border-m3-outline/5">
                <span className="text-m3-primary font-bold mt-0.5">✓</span>
                <div>
                  <p className="font-bold text-sm mb-1 text-m3-on-surface">Offline State</p>
                  <p className="text-xs text-m3-on-surface-variant leading-relaxed">Widgets automatically hide when your Discord status is offline.</p>
                </div>
              </li>
              <li className="flex gap-4 bg-m3-surface/50 p-4 rounded-2xl border border-m3-outline/5">
                <span className="text-m3-primary font-bold mt-0.5">✓</span>
                <div>
                  <p className="font-bold text-sm mb-1 text-m3-on-surface">No Active Playback</p>
                  <p className="text-xs text-m3-on-surface-variant leading-relaxed">The Music card hides if nothing is playing on Spotify, Tidal, or MusicBee.</p>
                </div>
              </li>
              <li className="flex gap-4 bg-m3-surface/50 p-4 rounded-2xl border border-m3-outline/5">
                <span className="text-m3-primary font-bold mt-0.5">✓</span>
                <div>
                  <p className="font-bold text-sm mb-1 text-m3-on-surface">Real-time Updates</p>
                  <p className="text-xs text-m3-on-surface-variant leading-relaxed">WebSocket-driven push updates ensure zero lag for progress and track changes.</p>
                </div>
              </li>
              <li className="flex gap-4 bg-m3-surface/50 p-4 rounded-2xl border border-m3-outline/5">
                <span className="text-m3-primary font-bold mt-0.5">✓</span>
                <div>
                  <p className="font-bold text-sm mb-1 text-m3-on-surface">GPU Optimized</p>
                  <p className="text-xs text-m3-on-surface-variant leading-relaxed">Use <code>motion=false</code> to disable all internal transitions for ultra-low CPU usage.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* API Information */}
      <div className="bg-m3-surface-container rounded-3xl p-8 border border-m3-outline/20">
        <h2 className="text-2xl font-bold mb-6">Behind the Scenes</h2>

        <p className="text-m3-on-surface-variant mb-4">
          These widgets are powered by the{" "}
          <a
            href="https://lanyard.rest"
            className="text-m3-primary hover:underline font-bold"
          >
            Lanyard API
          </a>
          , which provides real-time Discord presence data including:
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[
            "Spotify Presence",
            "Tidal (via MusicPresence)",
            "MusicBee (via MusicPresence)",
            "Real-time Album Art",
            "Live Timestamps",
            "Color Palette Extraction",
          ].map((item) => (
            <div
              key={item}
              className="bg-m3-surface rounded-xl p-3 text-sm text-m3-on-surface-variant"
            >
              ✓ {item}
            </div>
          ))}
        </div>

        <p className="text-m3-on-surface-variant text-sm mt-6">
          The widgets are built with React, Tailwind CSS, and Framer Motion,
          resulting in smooth animations and responsive design. All data is
          fetched in real-time via WebSocket connections.
        </p>
      </div>

      {/* Share Section */}
      <div className="mt-12 pt-8 border-t border-m3-outline/20">
        <p className="text-center text-m3-on-surface-variant">
          Love the widgets? Share this page with other streamers!
        </p>
      </div>
    </div>
  );
}

export default ObsWidgets;
