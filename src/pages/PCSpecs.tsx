import { motion } from "framer-motion";
import SystemCard from "../components/SystemCard";
import { allSystemSpecs } from "../data/systemSpecs";
import SEO from "../components/SEO";

export default function PCSpecs() {
  return (
    <div className="min-h-screen text-m3-on-surface animate-reveal">
      <SEO
        title="PC Specifications"
        description="Detailed overview of my current systems and setups."
        url="https://vorlie.pl/specs"
      />

      <div className="max-w-full mx-auto relative z-10 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <p className="text-m3-primary text-xs font-black uppercase tracking-[0.25em] mb-3 opacity-70">
            Tech Arsenal
          </p>
          <h1 className="text-5xl sm:text-7xl font-black text-m3-on-surface tracking-tighter mb-4">
            My Rigs
          </h1>
          <div className="h-1.5 w-20 bg-gradient-to-r from-m3-primary to-m3-secondary rounded-full mb-6" />
          <p className="text-lg text-m3-on-surface-variant font-bold opacity-70 max-w-xl leading-relaxed">
            A detailed breakdown of the hardware and software powering my
            development workflow and gaming sessions.
          </p>
        </motion.div>

        <div className="space-y-8">
          {allSystemSpecs.map((system, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <SystemCard system={system} />
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-m3-on-surface-variant mt-10 text-xs font-bold opacity-40 tracking-wider text-center uppercase"
        >
          Details are kept as up-to-date as possible, reflecting upgrades and
          changes.
        </motion.p>
      </div>
    </div>
  );
}
