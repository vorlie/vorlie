// src/pages/PCSpecs.tsx
import React from "react";
import SystemCard from "../components/SystemCard";
import { allSystemSpecs } from "../data/systemSpecs";

const PCSpecs: React.FC = () => {
  return (
    <div className="min-h-screen text-gray-100">
      <div className="max-w-6xl mx-auto relative z-10 p-4 md:p-8">
        <h1 className="text-4xl font-extrabold mb-4 text-white">
          My Tech Arsenal
        </h1>
        <p className="text-lg text-gray-300 mb-8">
          Here's a detailed look at the computing systems I currently use for
          various purposes, from gaming and development.
        </p>

        {allSystemSpecs.map((system, index) => (
          <SystemCard key={index} system={system} />
        ))}

        <p className="text-gray-400 mt-8 text-sm">
          Details are kept as up-to-date as possible, reflecting upgrades and
          changes.
        </p>
      </div>
    </div>
  );
};

export default PCSpecs;
