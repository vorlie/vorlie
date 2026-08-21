export default function GamingDefaultContent() {
  return (
    <div className="space-y-8">
      <div className="text-center mb-10">
        <h2 className="text-4xl sm:text-5xl font-black text-m3-on-surface tracking-tighter mb-4">
          Gaming
        </h2>
        <div className="h-2 w-24 bg-gradient-to-r from-m3-primary to-m3-secondary rounded-lg mx-auto mb-6" />
        <p className="text-m3-on-surface-variant max-w-2xl mx-auto font-bold opacity-80 text-lg leading-relaxed">
          Welcome to my gaming hub. Select a category above to explore my clips, PC specs, game accounts, and gaming projects.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="m3-card p-6 rounded-xl group hover:border-m3-primary/20 transition-all">
          <div className="flex items-center gap-3 mb-3">
            <span className="material-symbols-rounded text-2xl text-m3-primary">movie</span>
            <h3 className="text-xl font-black text-m3-on-surface">Clips</h3>
          </div>
          <p className="text-m3-on-surface-variant mb-4 font-medium">
            Collection of my gaming highlights and moments.
          </p>
        </div>

        <div className="m3-card p-6 rounded-xl group hover:border-m3-primary/20 transition-all">
          <div className="flex items-center gap-3 mb-3">
            <span className="material-symbols-rounded text-2xl text-m3-primary">desktop_windows</span>
            <h3 className="text-xl font-black text-m3-on-surface">My Rigs</h3>
          </div>
          <p className="text-m3-on-surface-variant mb-4 font-medium">
            Specifications and details of my gaming setups.
          </p>
        </div>

        <div className="m3-card p-6 rounded-xl group hover:border-m3-primary/20 transition-all">
          <div className="flex items-center gap-3 mb-3">
            <span className="material-symbols-rounded text-2xl text-m3-primary">sports_esports</span>
            <h3 className="text-xl font-black text-m3-on-surface">Game Accounts</h3>
          </div>
          <p className="text-m3-on-surface-variant mb-4 font-medium">
            My gaming accounts across various platforms.
          </p>
        </div>

        <div className="m3-card p-6 rounded-xl group hover:border-m3-primary/20 transition-all">
          <div className="flex items-center gap-3 mb-3">
            <span className="material-symbols-rounded text-2xl text-m3-primary">videogame_asset</span>
            <h3 className="text-xl font-black text-m3-on-surface">Gaming Projects</h3>
          </div>
          <p className="text-m3-on-surface-variant mb-4 font-medium">
            Game-related tools and mods I've developed.
          </p>
        </div>
      </div>
    </div>
  );
}