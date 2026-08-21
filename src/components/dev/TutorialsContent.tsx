export default function TutorialsContent() {
  return (
    <div className="space-y-8">
      <div className="text-center mb-10">
        <h2 className="text-4xl sm:text-5xl font-black text-m3-on-surface tracking-tighter mb-4">
          Tutorials
        </h2>
        <div className="h-2 w-24 bg-gradient-to-r from-m3-primary to-m3-secondary rounded-lg mx-auto mb-6" />
        <p className="text-m3-on-surface-variant max-w-2xl mx-auto font-bold opacity-80 text-lg leading-relaxed">
          Learn from my tutorials and guides on various development topics.
        </p>
      </div>

      <div className="m3-card p-6 rounded-xl">
        <h3 className="text-xl font-black text-m3-on-surface mb-3">
          Coming Soon
        </h3>
        <p className="text-m3-on-surface-variant mb-4 font-medium">
          Tutorials and guides are currently being developed. Check back soon for educational content!
        </p>
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 bg-m3-primary/10 text-m3-primary rounded-lg text-xs font-black uppercase tracking-wider border border-m3-primary/10">
            React
          </span>
          <span className="px-3 py-1 bg-m3-primary/10 text-m3-primary rounded-lg text-xs font-black uppercase tracking-wider border border-m3-primary/10">
            TypeScript
          </span>
          <span className="px-3 py-1 bg-m3-primary/10 text-m3-primary rounded-lg text-xs font-black uppercase tracking-wider border border-m3-primary/10">
            Python
          </span>
        </div>
      </div>
    </div>
  );
}