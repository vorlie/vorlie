// src/pages/PCSpecs.tsx
import React from "react";
import SystemCard from "../components/SystemCard";
import { allSystemSpecs } from "../data/systemSpecs";

const PCSpecs: React.FC = () => {
  return (
    <div className="min-h-screen bg-m3-surface text-m3-on-surface">
      <div className="max-w-6xl mx-auto relative z-10 p-4 md:p-8">
        <h1 className="text-4xl font-bold mb-4 text-m3-on-surface tracking-tight">
          My Tech Arsenal
        </h1>
        <p className="text-lg text-m3-on-surface-variant mb-8 font-medium">
          Here's a detailed look at the computing systems I currently use for
          various purposes, from gaming and development.
        </p>

        {allSystemSpecs.map((system, index) => (
          <SystemCard key={index} system={system} />
        ))}

        <p className="text-m3-on-surface-variant mt-8 text-sm opacity-70">
          Details are kept as up-to-date as possible, reflecting upgrades and
          changes.
        </p>
      </div>
    </div>
  );
};

export default PCSpecs;
