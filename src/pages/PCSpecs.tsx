import SystemCard from "../components/SystemCard";
import { allSystemSpecs } from "../data/systemSpecs";
import SEO from "../components/SEO";

export default function PCSpecs() {
  return (
    <div className="min-h-screen text-m3-on-surface animate-reveal">
      <SEO
        title="PC Specifications"
        description="Detailed overview of my current systems and setups."
        url="https://vorlie.pl/gaming/specs"
      />

      <div className="max-w-full mx-auto relative z-10">

        <div className="space-y-8">
          {allSystemSpecs.map((system, index) => (
              <SystemCard system={system} />
          ))}
        </div>

        <p
          className="text-m3-on-surface-variant mt-10 text-xs font-bold opacity-40 tracking-wider text-center uppercase"
        >
          Details are kept as up-to-date as possible, reflecting upgrades and
          changes.
        </p>
      </div>
    </div>
  );
}
