// src/components/SystemCard.tsx
import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
// Import all relevant interfaces from systemSpecs.ts
import { SystemDetails } from "../data/systemSpecs";

interface SystemCardProps {
  system: SystemDetails;
}

interface ListItem {
  label: string;
  value: string;
  notes?: string;
  link?: string;
}

const ItemList: React.FC<{ items: ListItem[] }> = ({ items }) => (
  <div className="space-y-3">
    {items.map((item, index) => (
      <div
        key={`${item.label}-${index}`}
        className="flex flex-col md:flex-row md:items-baseline md:space-x-2"
      >
        <span className="text-gray-400 font-medium w-32 flex-shrink-0">
          {item.label}:
        </span>
        <span className="text-gray-100 font-semibold flex-grow">
          {item.value}
          {item.notes && (
            <span className="ml-2 text-gray-400 text-xs italic">
              ({item.notes})
            </span>
          )}
          {item.link && (
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 text-blue-400 hover:text-blue-300 underline text-xs"
            >
              [Link]
            </a>
          )}
        </span>
      </div>
    ))}
  </div>
);

const SystemCard: React.FC<SystemCardProps> = ({ system }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpansion = () => {
    setIsExpanded((prevExpanded) => !prevExpanded);
  };

  return (
    <section className="my-6 bg-gray-800/50 rounded-lg shadow-lg overflow-hidden">
      <button
        type="button"
        onClick={toggleExpansion}
        className="w-full flex justify-between items-center p-5 text-left cursor-pointer focus:outline-none rounded-lg hover:bg-gray-800/60 transition-colors"
        aria-expanded={isExpanded}
        aria-controls={`system-specs-content-${system.name.replace(
          /\s/g,
          "-"
        )}`}
      >
        <h3 className="text-2xl font-bold text-white">{system.name}</h3>
        <span className="text-gray-400 transition-transform duration-300 ease-in-out transform hover:scale-110">
          {isExpanded ? (
            <FaChevronUp size="1em" />
          ) : (
            <FaChevronDown size="1em" />
          )}
        </span>
      </button>

      {system.description && (
        <p className="px-5 pb-3 text-gray-300 text-sm">{system.description}</p>
      )}

      <div
        id={`system-specs-content-${system.name.replace(/\s/g, "-")}`}
        className={`transition-max-height duration-500 ease-in-out overflow-hidden ${
          isExpanded ? "max-h-[2500px]" : "max-h-0"
        }`}
      >
        <div className="px-5 pb-5 pt-3 border-t border-gray-700">
          {/* Core PC Specifications Section */}
          <h4 className="text-xl font-semibold text-gray-200 mb-3 border-b border-gray-700 pb-2">
            Core PC Specifications
          </h4>
          <ItemList items={system.specs} /> {/* Using the generic ItemList */}
          {/* Peripherals Section (conditionally rendered) */}
          {system.peripherals && system.peripherals.length > 0 && (
            <>
              <h4 className="text-xl font-semibold text-gray-200 mt-6 mb-3 border-b border-gray-700 pb-2">
                Peripherals
              </h4>
              <ItemList items={system.peripherals} />{" "}
              {/* Using the generic ItemList */}
            </>
          )}
          {/* Software & Operating Systems Section (conditionally rendered) */}
          {system.softwareAndOS && system.softwareAndOS.length > 0 && (
            <>
              <h4 className="text-xl font-semibold text-gray-200 mt-6 mb-3 border-b border-gray-700 pb-2">
                Software & Operating Systems
              </h4>
              <ItemList items={system.softwareAndOS} />{" "}
              {/* Using the generic ItemList */}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default SystemCard;
