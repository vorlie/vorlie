export default function GamingProjectsContent() {
  return (
    <div className="space-y-8">
      <div className="text-center mb-10">
        <h2 className="text-4xl sm:text-5xl font-black text-m3-on-surface tracking-tighter mb-4">
          Gaming Projects
        </h2>
        <div className="h-2 w-24 bg-gradient-to-r from-m3-primary to-m3-secondary rounded-lg mx-auto mb-6" />
        <p className="text-m3-on-surface-variant max-w-2xl mx-auto font-bold opacity-80 text-lg leading-relaxed">
          Game-related tools and mods I've developed.
        </p>
      </div>

      <div className="m3-card p-6 rounded-xl">
        <h3 className="text-xl font-black text-m3-on-surface mb-3">
          Game Mods & Tools
        </h3>
        <p className="text-m3-on-surface-variant mb-4 font-medium">
          My gaming-related projects including Minecraft mods, game tools, and utilities.
        </p>
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 bg-m3-primary/10 text-m3-primary rounded-lg text-xs font-black uppercase tracking-wider border border-m3-primary/10">
            Minecraft Mods
          </span>
          <span className="px-3 py-1 bg-m3-primary/10 text-m3-primary rounded-lg text-xs font-black uppercase tracking-wider border border-m3-primary/10">
            Game Tools
          </span>
          <span className="px-3 py-1 bg-m3-primary/10 text-m3-primary rounded-lg text-xs font-black uppercase tracking-wider border border-m3-primary/10">
            Replay Manager
          </span>
        </div>
      </div>
    </div>
  );
}