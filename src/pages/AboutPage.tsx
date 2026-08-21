import { FaGithub, FaDiscord, FaSteam } from "react-icons/fa";
import Buttons88x31 from "../components/Buttons88x31";
import SEO from "../components/SEO";

export default function AboutPage() {
  return (
    <div className="min-h-screen text-m3-on-surface relative overflow-hidden">
      <SEO
        title="About"
        description="More about me, how to connect, and other corners of the internet."
        url="https://vorlie.pl/about"
      />
      
      <div className="space-y-8">
        <div className="text-center mb-10">
          <h2 className="text-4xl sm:text-5xl font-black text-m3-on-surface tracking-tighter mb-4">
            About
          </h2>
          <div className="h-2 w-24 bg-gradient-to-r from-m3-primary to-m3-secondary rounded-lg mx-auto mb-6" />
          <p className="text-m3-on-surface-variant max-w-2xl mx-auto font-bold opacity-80 text-lg leading-relaxed">
            More about me, how to connect, and other corners of the internet.
          </p>
        </div>

        <div className="space-y-6">
          <div className="m3-card p-6 rounded-xl">
            <h3 className="text-xl font-black text-m3-on-surface mb-4">
              Connect
            </h3>
            <p className="text-m3-on-surface-variant mb-6 font-medium">
              Find me across the internet
            </p>
            <div className="flex flex-wrap gap-4">
              {[
                {
                  Icon: FaGithub,
                  href: "https://github.com/vorlie",
                  label: "GitHub",
                  color: "bg-m3-primary text-m3-on-primary",
                },
                {
                  Icon: FaDiscord,
                  href: "https://discord.gg/yUueAFyAmN",
                  label: "Discord",
                  color: "bg-m3-secondary text-m3-on-secondary",
                },
                {
                  Icon: FaSteam,
                  href: "https://steamcommunity.com/id/s9suk3_41z3n/",
                  label: "Steam",
                  color: "bg-m3-primary text-m3-on-primary",
                },
              ].map(({ Icon, href, label, color }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg ${color} font-bold text-sm hover:opacity-90 transition-all`}
                >
                  <Icon size={16} />
                  {label}
                </a>
              ))}
            </div>
          </div>

          <div className="m3-card p-6 rounded-xl">
            <h3 className="text-xl font-black text-m3-on-surface mb-4">
              About Me
            </h3>
            <div className="text-m3-on-surface-variant space-y-4 font-medium">
              <p>
                I'm a developer who enjoys building small, thoughtful projects and experiments. 
                I focus on web development, game mods, and creative tools.
              </p>
              <p>
                When I'm not coding, you can find me playing osu!, listening to music, 
                watching anime, or tinkering with new technologies.
              </p>
              <p>
                This website serves as a hub for my projects, thoughts, and creative endeavors. 
                Feel free to explore and reach out if you'd like to connect!
              </p>
            </div>
          </div>

          <div className="m3-card p-6 rounded-xl">
            <h3 className="text-xl font-black text-m3-on-surface mb-4">
              Webring & Badges
            </h3>
            <div className="space-y-4">
              <div className="mx-auto w-full max-w-md overflow-hidden rounded-lg border border-m3-outline/10 bg-m3-surface-container">
                <div className="aspect-[12/5] w-full">
                  <iframe
                    title="Webring widget"
                    src="https://ring.pre1lude.dev/ring?url=https://vorlie.pl&fgcolor=E4E1E6&bgcolor=434559"
                    className="w-full h-full rounded-lg contrast-[1.1] grayscale-[0.2] hover:grayscale-0 transition-all duration-500"
                  />
                </div>
              </div>
              <Buttons88x31 />
            </div>
          </div>

          <div className="m3-card p-6 rounded-xl">
            <h3 className="text-xl font-black text-m3-on-surface mb-4">
              Miko Bot
            </h3>
            <p className="text-m3-on-surface-variant mb-4 font-medium">
              My Discord bot with various features including anime interactions and utilities.
            </p>
            <div className="flex flex-wrap gap-2">
              <a
                href="https://discord.gg/yUueAFyAmN"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-m3-primary text-m3-on-primary font-bold text-sm hover:bg-m3-primary/90 transition-all"
              >
                Miko's Shrine
                <span className="material-symbols-rounded text-base">
                  temple_buddhist
                </span>
              </a>
              <a
                href="/verify"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-m3-outline/10 text-m3-on-surface-variant font-bold text-sm hover:bg-m3-on-surface/5 transition-all"
              >
                Verify
                <span className="material-symbols-rounded text-base">
                  verified
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}