// src/pages/PCSpecs.tsx
import React from "react";
import SystemCard from "../components/SystemCard";
import { allSystemSpecs } from "../data/systemSpecs";

const PCSpecs: React.FC = () => {
  return (
    <div className="container pt-4 text-white">
      <h1 className="text-4xl font-extrabold mb-4 text-left">
        My Tech Arsenal
      </h1>
      <p className="text-lg text-gray-300 mb-4 text-left">
        Here's a detailed look at the computing systems I currently use for
        various purposes, from gaming and development.
      </p>

      {allSystemSpecs.map((system, index) => (
        <SystemCard key={index} system={system} />
      ))}

      <p className="text-left text-gray-400 mt-4 text-sm">
        Details are kept as up-to-date as possible, reflecting upgrades and
        changes.
      </p>
    </div>
  );
};

export default PCSpecs;
