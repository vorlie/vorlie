export default function CreativeDefaultContent() {
  return (
    <div className="space-y-8">
      <div className="text-center mb-10">
        <h2 className="text-4xl sm:text-5xl font-black text-m3-on-surface tracking-tighter mb-4">
          Creative
        </h2>
        <div className="h-2 w-24 bg-gradient-to-r from-m3-primary to-m3-secondary rounded-lg mx-auto mb-6" />
        <p className="text-m3-on-surface-variant max-w-2xl mx-auto font-bold opacity-80 text-lg leading-relaxed">
          Welcome to my creative hub. Select a category above to explore my music, gallery, colors, and creative tools.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="m3-card p-6 rounded-xl group hover:border-m3-primary/20 transition-all">
          <div className="flex items-center gap-3 mb-3">
            <span className="material-symbols-rounded text-2xl text-m3-primary">music_note</span>
            <h3 className="text-xl font-black text-m3-on-surface">Music</h3>
          </div>
          <p className="text-m3-on-surface-variant mb-4 font-medium">
            My music collection and player projects.
          </p>
        </div>

        <div className="m3-card p-6 rounded-xl group hover:border-m3-primary/20 transition-all">
          <div className="flex items-center gap-3 mb-3">
            <span className="material-symbols-rounded text-2xl text-m3-primary">image</span>
            <h3 className="text-xl font-black text-m3-on-surface">Gallery</h3>
          </div>
          <p className="text-m3-on-surface-variant mb-4 font-medium">
            Visual artwork and screenshots collection.
          </p>
        </div>

        <div className="m3-card p-6 rounded-xl group hover:border-m3-primary/20 transition-all">
          <div className="flex items-center gap-3 mb-3">
            <span className="material-symbols-rounded text-2xl text-m3-primary">palette</span>
            <h3 className="text-xl font-black text-m3-on-surface">Colors</h3>
          </div>
          <p className="text-m3-on-surface-variant mb-4 font-medium">
            Color palettes and design experiments.
          </p>
        </div>

        <div className="m3-card p-6 rounded-xl group hover:border-m3-primary/20 transition-all">
          <div className="flex items-center gap-3 mb-3">
            <span className="material-symbols-rounded text-2xl text-m3-primary">construction</span>
            <h3 className="text-xl font-black text-m3-on-surface">Creative Tools</h3>
          </div>
          <p className="text-m3-on-surface-variant mb-4 font-medium">
            Utilities and tools for creative work.
          </p>
        </div>
      </div>
    </div>
  );
}