export default function GalleryContent() {
  return (
    <div className="space-y-8">
      <div className="text-center mb-10">
        <h2 className="text-4xl sm:text-5xl font-black text-m3-on-surface tracking-tighter mb-4">
          Gallery
        </h2>
        <div className="h-2 w-24 bg-gradient-to-r from-m3-primary to-m3-secondary rounded-lg mx-auto mb-6" />
        <p className="text-m3-on-surface-variant max-w-2xl mx-auto font-bold opacity-80 text-lg leading-relaxed">
          Visual artwork and screenshots collection.
        </p>
      </div>

      <div className="m3-card p-6 rounded-xl">
        <h3 className="text-xl font-black text-m3-on-surface mb-3">
          Art Gallery
        </h3>
        <p className="text-m3-on-surface-variant mb-4 font-medium">
          Browse through my visual artwork and screenshots.
        </p>
        <a
          href="/gallery"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-m3-secondary text-m3-on-secondary font-bold text-sm hover:bg-m3-secondary/90 transition-all"
        >
          View Gallery
          <span className="material-symbols-rounded text-base">
            image
          </span>
        </a>
      </div>
    </div>
  );
}