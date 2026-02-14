import { useState } from "react";
import { Copy, Check, ExternalLink } from "lucide-react";

function ObsWidgets() {
  const [copiedWidget, setCopiedWidget] = useState<string | null>(null);
  const [userDiscordId, setUserDiscordId] = useState("");
  const [selectedDomain, setSelectedDomain] = useState<"main" | "backup">(
    "main",
  );

  const copyToClipboard = (text: string, widget: string) => {
    navigator.clipboard.writeText(text);
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
      id: "spotify",
      name: "Now Playing Card",
      description:
        "Display your current Spotify song with album art, artist, and animated progress bar. Material Design 3 themed with dynamic colors. Perfect for showing music taste!",
      icon: "🎵",
      path: "spotify",
      features: [
        "Live Spotify data",
        "Album art",
        "Progress bar",
        "Material Design 3 styling",
        "Color-adaptive design",
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
        <p className="text-lg text-m3-on-surface-variant">
          Beautiful, customizable widgets designed for OBS streamers. Display
          your Spotify activity with style.
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

                <div className="space-y-2">
                  <p className="text-sm font-bold text-m3-on-surface-variant">
                    Select Domain:
                  </p>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="domain"
                        value="main"
                        checked={selectedDomain === "main"}
                        onChange={() => setSelectedDomain("main")}
                        className="w-4 h-4"
                      />
                      <span className="text-sm text-m3-on-surface">
                        Main (vorlie.pl)
                      </span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="domain"
                        value="backup"
                        checked={selectedDomain === "backup"}
                        onChange={() => setSelectedDomain("backup")}
                        className="w-4 h-4"
                      />
                      <span className="text-sm text-m3-on-surface">
                        Backup (vorliev2.pages.dev)
                      </span>
                    </label>
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
                <li>Update in real-time with your Spotify status</li>
                <li>Adapt colors to your current album art</li>
                <li>Hide when you go offline</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Widgets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {widgets.map((widget) => {
          const widgetUrl = `${baseDomain}/obs/${widget.path}/${discordId}`;

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
              Using Your Own Discord ID
            </h3>
            <p className="text-m3-on-surface-variant mb-4">
              All widgets use URL-based configuration. Simply modify the Discord
              ID at the end of the URL:
            </p>
            <div className="space-y-2 mb-4">
              <div className="bg-m3-surface rounded-2xl p-4 font-mono text-sm overflow-x-auto">
                <code>
                  https://vorlie.pl/obs/spotify
                  <span className="text-m3-primary">/614807913302851594</span>
                </code>
              </div>
              <p className="text-xs text-m3-on-surface-variant px-2">
                Main domain
              </p>
            </div>
            <div className="space-y-2 mb-4">
              <div className="bg-m3-surface rounded-2xl p-4 font-mono text-sm overflow-x-auto">
                <code>
                  https://vorliev2.pages.dev/obs/spotify
                  <span className="text-m3-primary">/614807913302851594</span>
                </code>
              </div>
              <p className="text-xs text-m3-on-surface-variant px-2">
                Backup (Cloudflare Pages)
              </p>
            </div>
            <p className="text-sm text-m3-on-surface-variant">
              Replace{" "}
              <code className="bg-m3-surface px-2 py-1 rounded">
                614807913302851594
              </code>{" "}
              with your Discord ID.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-3">Widget Behavior</h3>
            <ul className="space-y-3 text-m3-on-surface-variant">
              <li className="flex gap-3">
                <span className="text-m3-primary font-bold">→</span>
                <span>
                  <strong>Offline:</strong> All widgets automatically hide when
                  your Discord status is offline
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-m3-primary font-bold">→</span>
                <span>
                  <strong>No Spotify:</strong> The Now Playing Card hides if
                  you're not playing anything
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-m3-primary font-bold">→</span>
                <span>
                  <strong>Real-time Updates:</strong> All widgets update via
                  WebSocket for instant changes
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-m3-primary font-bold">→</span>
                <span>
                  <strong>No Configuration Needed:</strong> Just add the URL to
                  OBS and it works!
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-m3-primary font-bold">→</span>
                <span>
                  <strong>GPU Acceleration:</strong> Widgets use GPU
                  acceleration for smooth animations, which may increase GPU
                  usage slightly
                </span>
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
            "Discord Status",
            "Current Game",
            "Spotify Activity",
            "Album Art",
            "Listening Duration",
            "User Status Changes",
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
