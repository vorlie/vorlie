// src/components/SystemCard.tsx
import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
// Import all relevant interfaces from systemSpecs.ts
import { SystemDetails, MonitorDetail } from "../data/systemSpecs";

interface SystemCardProps {
  system: SystemDetails;
}

interface ListItem {
  label: string;
  value: string | MonitorDetail[];
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
        <span className="text-m3-on-surface-variant font-bold w-32 flex-shrink-0 text-sm uppercase tracking-tight">
          {item.label}:
        </span>
        <span className="text-m3-on-surface font-semibold flex-grow">
          {Array.isArray(item.value) ? (
            <ul className="list-disc ml-4">
              {item.value.map((monitor, i) => (
                <li key={i}>
                  {monitor.model}
                  {monitor.role && ` (${monitor.role})`}
                  {monitor.size && `, ${monitor.size}`}
                  {monitor.refreshRate && `, ${monitor.refreshRate}`}
                  {monitor.notes && (
                    <span className="ml-2 text-gray-400 text-xs italic">
                      ({monitor.notes})
                    </span>
                  )}
                  {monitor.link && typeof monitor.link === "string" && (
                    <a
                      href={monitor.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-2 text-blue-400 hover:text-blue-300 underline"
                    >
                      [Link]
                    </a>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            item.value
          )}
          {item.notes && typeof item.value === "string" && (
            <span className="ml-2 text-gray-400 text-xs italic">
              ({item.notes})
            </span>
          )}
          {item.link && typeof item.value === "string" && (
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 text-blue-400 hover:text-blue-300 underline"
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
    <section className="my-6 bg-m3-surface-container border border-m3-outline/10 rounded-[24px] shadow-sm overflow-hidden transition-all duration-300 hover:border-m3-outline/20">
      <button
        type="button"
        onClick={toggleExpansion}
        className="w-full flex justify-between items-center p-6 text-left cursor-pointer focus:outline-none hover:bg-m3-on-surface/5 transition-all duration-200"
        aria-expanded={isExpanded}
        aria-controls={`system-specs-content-${system.name.replace(
          /\s/g,
          "-"
        )}`}
      >
        <h3 className="text-2xl font-bold text-m3-on-surface tracking-tight">{system.name}</h3>
        <span className="text-m3-on-surface-variant transition-transform duration-300 ease-in-out">
          {isExpanded ? (
            <FaChevronUp size="1.2em" />
          ) : (
            <FaChevronDown size="1.2em" />
          )}
        </span>
      </button>

      {system.description && (
        <p className="px-6 pb-4 text-m3-on-surface-variant text-sm font-medium">{system.description}</p>
      )}

      <div
        id={`system-specs-content-${system.name.replace(/\s/g, "-")}`}
        className={`transition-max-height duration-500 ease-in-out overflow-hidden ${
          isExpanded ? "max-h-[2500px]" : "max-h-0"
        }`}
      >
        <div className="px-6 pb-6 pt-2 border-t border-m3-outline/10">
          {/* Core PC Specifications Section */}
          <h4 className="text-lg font-bold text-m3-primary mt-4 mb-4 uppercase tracking-wider text-xs">
            Core PC Specifications
          </h4>
          <ItemList items={system.specs} />
          {/* Peripherals Section (conditionally rendered) */}
          {system.peripherals && system.peripherals.length > 0 && (
            <>
              <h4 className="text-lg font-bold text-m3-primary mt-8 mb-4 uppercase tracking-wider text-xs">
                Peripherals
              </h4>
              <ItemList items={system.peripherals} />
            </>
          )}
          {/* Software & Operating Systems Section (conditionally rendered) */}
          {system.softwareAndOS && system.softwareAndOS.length > 0 && (
            <>
              <h4 className="text-lg font-bold text-m3-primary mt-8 mb-4 uppercase tracking-wider text-xs">
                Software & Operating Systems
              </h4>
              <ItemList items={system.softwareAndOS} />
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default SystemCard;
