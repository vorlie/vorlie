import { motion } from "framer-motion";
import GameAccs from "../GameAccs";

export default function GamingSection() {
  return (
    <section id="gaming" className="min-h-screen py-16" aria-labelledby="gaming-heading">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="space-y-8"
      >
        <div className="text-center mb-10">
          <h2 id="gaming-heading" className="text-4xl sm:text-5xl font-black text-m3-on-surface tracking-tighter mb-4">
            Gaming
          </h2>
          <div className="h-2 w-24 bg-gradient-to-r from-m3-primary to-m3-secondary rounded-lg mx-auto mb-6" />
          <p className="text-m3-on-surface-variant max-w-xl mx-auto font-bold opacity-80 text-lg leading-relaxed">
            My gaming setups, clips, and gaming-related projects.
          </p>
        </div>

        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="m3-card p-6 rounded-xl"
          >
            <h3 className="text-xl font-black text-m3-on-surface mb-4">
              Game Accounts
            </h3>
            <GameAccs />
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="m3-card p-6 rounded-xl"
            >
              <h3 className="text-xl font-black text-m3-on-surface mb-3">
                Clips
              </h3>
              <p className="text-m3-on-surface-variant mb-4 font-medium">
                Collection of my gaming highlights and moments.
              </p>
              <a
                href="/clips"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-m3-primary text-m3-on-primary font-bold text-sm hover:bg-m3-primary/90 transition-all"
              >
                View Clips
                <span className="material-symbols-rounded text-base">
                  arrow_forward
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
                My Rigs
              </h3>
              <p className="text-m3-on-surface-variant mb-4 font-medium">
                Specifications and details of my gaming setups.
              </p>
              <a
                href="/specs"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-m3-secondary text-m3-on-secondary font-bold text-sm hover:bg-m3-secondary/90 transition-all"
              >
                View Specs
                <span className="material-symbols-rounded text-base">
                  arrow_forward
                </span>
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="m3-card p-6 rounded-xl"
          >
            <h3 className="text-xl font-black text-m3-on-surface mb-3">
              Gaming Projects
            </h3>
            <p className="text-m3-on-surface-variant mb-4 font-medium">
              Game-related tools and mods I've developed.
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
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}