import { motion } from "framer-motion";
import Projects from "../Projects";

export default function DevSection() {
  return (
    <section id="dev" className="min-h-screen py-16" aria-labelledby="dev-heading">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="space-y-8"
      >
        <div className="text-center mb-10">
          <h2 id="dev-heading" className="text-4xl sm:text-5xl font-black text-m3-on-surface tracking-tighter mb-4">
            Development
          </h2>
          <div className="h-2 w-24 bg-gradient-to-r from-m3-primary to-m3-secondary rounded-lg mx-auto mb-6" />
          <p className="text-m3-on-surface-variant max-w-xl mx-auto font-bold opacity-80 text-lg leading-relaxed">
            A curated collection of my experiments, from real-time shaders to
            modular desktop applications.
          </p>
        </div>

        <Projects />

        <div className="grid gap-6 md:grid-cols-2 mt-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="m3-card p-6 rounded-xl"
          >
            <h3 className="text-xl font-black text-m3-on-surface mb-3">
              API Documentation
            </h3>
            <p className="text-m3-on-surface-variant mb-4 font-medium">
              Explore my public API endpoints for anime interactions and more.
            </p>
            <a
              href="https://docs.vorlie.pl"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-m3-primary text-m3-on-primary font-bold text-sm hover:bg-m3-primary/90 transition-all"
            >
              View Docs
              <span className="material-symbols-rounded text-base">
                arrow_forward
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
              GitHub Activity
            </h3>
            <p className="text-m3-on-surface-variant mb-4 font-medium">
              Check out my latest contributions and repositories on GitHub.
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
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}