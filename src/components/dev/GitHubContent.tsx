export default function GitHubContent() {
  return (
    <div className="space-y-8">
      <div className="text-center mb-10">
        <h2 className="text-4xl sm:text-5xl font-black text-m3-on-surface tracking-tighter mb-4">
          GitHub
        </h2>
        <div className="h-2 w-24 bg-gradient-to-r from-m3-primary to-m3-secondary rounded-lg mx-auto mb-6" />
        <p className="text-m3-on-surface-variant max-w-2xl mx-auto font-bold opacity-80 text-lg leading-relaxed">
          Check out my latest contributions and repositories on GitHub.
        </p>
      </div>

      <div className="m3-card p-6 rounded-xl">
        <h3 className="text-xl font-black text-m3-on-surface mb-3">
          GitHub Profile
        </h3>
        <p className="text-m3-on-surface-variant mb-4 font-medium">
          Explore my repositories, contributions, and open source projects.
        </p>
        <a
          href="https://github.com/vorlie"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-m3-secondary text-m3-on-secondary font-bold text-sm hover:bg-m3-secondary/90 transition-all"
        >
          View Profile
          <span className="material-symbols-rounded text-base">
            arrow_forward
          </span>
        </a>
      </div>
    </div>
  );
}