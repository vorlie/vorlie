// src/components/PCSpecification.tsx
import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'; 

interface SpecItem {
  label: string;
  value: string;
}

const pcSpecs: SpecItem[] = [
    { label: "CPU", value: "AMD Ryzen 5 3600" },
    { label: "GPU", value: "ASUS Radeon RX 7600 Dual OC V2 8GB GDDR6" },
    { label: "RAM", value: "Corsair Vengeance LPX 2x8GB 3200MT/s CL16" },
    { label: "Motherboard", value: "ASUS Prime B450M-A II" },
    { label: "Storage: SSD (NVMe)", value: "GOODRAM PX500 PCIe GEN 3 x4 NVMe 256GB" },
    { label: "Storage: SSD (SATA)", value: 'GOODRAM CX400 SATA 2,5" 1TB' },
    { label: "Storage: HDD", value: 'TOSHIBA MQ01ABD100 1TB 2,5"' },
    { label: "CPU Cooler", value: "SilentiumPC Fortis 3" },
    { label: "Power Supply", value: "Cooler Master MWE V2 500W 80 Plus" },
    { label: "Case", value: "Cooler Master MasterBox Q300L" },
    { label: "Monitor", value: "AOC 2470W" },
    { label: "Keyboard", value: "SPC Gear GK630K Onyx White" },
    { label: "Mouse", value: "Logitech G102 / G203 Lightsync Lilac" },
    { label: "Headset", value: "SPC Gear Viro Plus Onyx White" },
    { label: "Mousepad", value: "KRUX Space XXL" },
    { label: "Controller", value: "DualShock 4 White" },
];

const PCSpecification: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpansion = () => {
    setIsExpanded(prevExpanded => !prevExpanded); 
  };

  return (
    <section className="my-8 bg-gray-800/50 rounded-lg shadow overflow-hidden">

      <button
        type="button"
        onClick={toggleExpansion}
        className="w-full flex justify-between items-center p-5 text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 rounded-t-lg" // Dodano style dla focusa i zaokrąglenie górne
        aria-expanded={isExpanded}
        aria-controls="pc-specs-content"
      >
        <h3 className="text-xl font-semibold text-white">
          PC Specification
        </h3>
        <span className="text-gray-400 transition-transform duration-300 ease-in-out transform hover:scale-110">
            {isExpanded ? <FaChevronUp size="0.9em" /> : <FaChevronDown size="0.9em" />}
        </span>
      </button>

      <div
        id="pc-specs-content" 
        className={`transition-max-height duration-500 ease-in-out overflow-hidden ${isExpanded ? 'max-h-[1000px]' : 'max-h-0'}`}
      >
        <div className="px-5 pb-5 pt-3 space-y-3 text-sm border-t border-gray-700">
          {pcSpecs.map((spec, index) => (
            <div key={`${spec.label}-${index}`}>
              <span className="block text-gray-400 font-medium">
                {spec.label}:
              </span>
              <span className="block text-gray-100 font-semibold">
                {spec.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PCSpecification;