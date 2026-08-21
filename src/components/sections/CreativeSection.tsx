import { motion } from "framer-motion";

export default function CreativeSection() {
  return (
    <section id="creative" className="min-h-screen py-16" aria-labelledby="creative-heading">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="space-y-8"
      >
        <div className="text-center mb-10">
          <h2 id="creative-heading" className="text-4xl sm:text-5xl font-black text-m3-on-surface tracking-tighter mb-4">
            Creative
          </h2>
          <div className="h-2 w-24 bg-gradient-to-r from-m3-primary to-m3-secondary rounded-lg mx-auto mb-6" />
          <p className="text-m3-on-surface-variant max-w-xl mx-auto font-bold opacity-80 text-lg leading-relaxed">
            Music, art, colors, and creative explorations.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="m3-card p-6 rounded-xl"
          >
            <h3 className="text-xl font-black text-m3-on-surface mb-3">
              Music
            </h3>
            <p className="text-m3-on-surface-variant mb-4 font-medium">
              My music collection and player projects.
            </p>
            <a
              href="/music"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-m3-primary text-m3-on-primary font-bold text-sm hover:bg-m3-primary/90 transition-all"
            >
              Listen
              <span className="material-symbols-rounded text-base">
                music_note
              </span>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="m3-card p-6 rounded-xl"
          >
            <h3 className="text-xl font-black text-m3-on-surface mb-3">
              Gallery
            </h3>
            <p className="text-m3-on-surface-variant mb-4 font-medium">
              Visual artwork and screenshots collection.
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
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="m3-card p-6 rounded-xl"
          >
            <h3 className="text-xl font-black text-m3-on-surface mb-3">
              Colors
            </h3>
            <p className="text-m3-on-surface-variant mb-4 font-medium">
              Color palettes and design experiments.
            </p>
            <a
              href="/colors"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-m3-primary text-m3-on-primary font-bold text-sm hover:bg-m3-primary/90 transition-all"
            >
              Explore Colors
              <span className="material-symbols-rounded text-base">
                palette
              </span>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="m3-card p-6 rounded-xl"
          >
            <h3 className="text-xl font-black text-m3-on-surface mb-3">
              Creative Tools
            </h3>
            <p className="text-m3-on-surface-variant mb-4 font-medium">
              Utilities and tools for creative work.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-m3-primary/10 text-m3-primary rounded-lg text-xs font-black uppercase tracking-wider border border-m3-primary/10">
                PixieEdit
              </span>
              <span className="px-3 py-1 bg-m3-primary/10 text-m3-primary rounded-lg text-xs font-black uppercase tracking-wider border border-m3-primary/10">
                Notepad
              </span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}