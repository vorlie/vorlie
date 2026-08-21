export default function DevDefaultContent() {
  return (
    <div className="space-y-8">
      <div className="text-center mb-10">
        <h2 className="text-4xl sm:text-5xl font-black text-m3-on-surface tracking-tighter mb-4">
          Development
        </h2>
        <div className="h-2 w-24 bg-gradient-to-r from-m3-primary to-m3-secondary rounded-lg mx-auto mb-6" />
        <p className="text-m3-on-surface-variant max-w-2xl mx-auto font-bold opacity-80 text-lg leading-relaxed">
          Welcome to my development hub. Select a category above to explore my projects, API documentation, GitHub activity, and tutorials.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="m3-card p-6 rounded-xl group hover:border-m3-primary/20 transition-all">
          <div className="flex items-center gap-3 mb-3">
            <span className="material-symbols-rounded text-2xl text-m3-primary">code</span>
            <h3 className="text-xl font-black text-m3-on-surface">Projects</h3>
          </div>
          <p className="text-m3-on-surface-variant mb-4 font-medium">
            A curated collection of my experiments and applications.
          </p>
        </div>

        <div className="m3-card p-6 rounded-xl group hover:border-m3-primary/20 transition-all">
          <div className="flex items-center gap-3 mb-3">
            <span className="material-symbols-rounded text-2xl text-m3-primary">api</span>
            <h3 className="text-xl font-black text-m3-on-surface">API Documentation</h3>
          </div>
          <p className="text-m3-on-surface-variant mb-4 font-medium">
            Comprehensive documentation for my public API endpoints.
          </p>
        </div>

        <div className="m3-card p-6 rounded-xl group hover:border-m3-primary/20 transition-all">
          <div className="flex items-center gap-3 mb-3">
            <span className="material-symbols-rounded text-2xl text-m3-primary">github</span>
            <h3 className="text-xl font-black text-m3-on-surface">GitHub</h3>
          </div>
          <p className="text-m3-on-surface-variant mb-4 font-medium">
            Explore my repositories and open source contributions.
          </p>
        </div>

        <div className="m3-card p-6 rounded-xl group hover:border-m3-primary/20 transition-all">
          <div className="flex items-center gap-3 mb-3">
            <span className="material-symbols-rounded text-2xl text-m3-primary">school</span>
            <h3 className="text-xl font-black text-m3-on-surface">Tutorials</h3>
          </div>
          <p className="text-m3-on-surface-variant mb-4 font-medium">
            Learn from my guides on various development topics.
          </p>
        </div>
      </div>
    </div>
  );
}