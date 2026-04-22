import React from "react";
import { 
  FaMicrochip, 
  FaKeyboard, 
  FaWindows, 
  FaExternalLinkAlt,
  FaMemory,
  FaHdd,
  FaFan,
  FaChargingStation,
  FaBox
} from "react-icons/fa";
import { SystemDetails, MonitorDetail } from "../data/systemSpecs";

interface SystemCardProps {
  system: SystemDetails;
}

const specIconMap: Record<string, any> = {
  "CPU": FaMicrochip,
  "GPU": FaMicrochip,
  "RAM": FaMemory,
  "Storage": FaHdd,
  "Cooler": FaFan,
  "Power": FaChargingStation,
  "Case": FaBox,
  "Motherboard": FaMicrochip
};

const ItemList: React.FC<{ items: any[], columns?: number }> = ({ items, columns = 1 }) => (
  <div className={`grid grid-cols-1 ${columns > 1 ? "md:grid-cols-2 lg:grid-cols-" + columns : ""} gap-4`}>
    {items.map((item, index) => {
      const labelPrefix = item.label.split(" ")[0];
      const Icon = specIconMap[labelPrefix] || null;
      
      return (
        <div
          key={`${item.label}-${index}`}
          className="flex flex-col p-3 bg-m3-on-surface/5 rounded-2xl border border-m3-outline/5 hover:bg-m3-on-surface/10 transition-colors duration-300"
        >
          <div className="flex items-center gap-2 mb-1">
            {Icon && <Icon className="text-m3-primary/60 text-xs" />}
            <span className="text-m3-on-surface-variant font-black text-[10px] uppercase tracking-widest opacity-60">
              {item.label}
            </span>
          </div>
          <div className="text-m3-on-surface font-bold text-sm leading-tight flex flex-wrap items-center gap-2">
            {Array.isArray(item.value) ? (
              <div className="flex flex-col gap-2 w-full mt-1">
                {item.value.map((monitor: MonitorDetail, i: number) => (
                  <div key={i} className="flex flex-col bg-m3-on-surface/5 p-2 rounded-xl border border-m3-outline/5">
                    <div className="flex justify-between items-center">
                       <span className="text-xs font-black">{monitor.model}</span>
                       {monitor.role && <span className="text-[9px] px-1.5 py-0.5 bg-m3-primary/10 text-m3-primary rounded-full uppercase">{monitor.role}</span>}
                    </div>
                    <span className="text-[10px] opacity-70">
                      {monitor.size && monitor.size} {monitor.refreshRate && `• ${monitor.refreshRate}`}
                    </span>
                    {monitor.link && (
                      <a href={monitor.link} target="_blank" rel="noopener noreferrer" className="text-[10px] text-m3-primary hover:underline flex items-center gap-1 mt-1">
                        View Product <FaExternalLinkAlt size={8}/>
                      </a>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <span>{item.value}</span>
            )}
            {item.notes && !Array.isArray(item.value) && (
              <span className="text-[11px] font-medium italic opacity-50 block w-full mt-1">
                ({item.notes})
              </span>
            )}
            {item.link && !Array.isArray(item.value) && (
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-m3-primary hover:opacity-80 transition-opacity"
                title="View Link"
              >
                <FaExternalLinkAlt size={12} />
              </a>
            )}
          </div>
        </div>
      );
    })}
  </div>
);

const SystemCard: React.FC<SystemCardProps> = ({ system }) => {
  return (
    <div className="m3-card relative overflow-hidden group">
      {/* Visual Accent */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-m3-primary via-m3-secondary to-m3-primary opacity-50" />
      
      <div className="p-6 sm:p-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-8 border-b border-m3-outline/10">
          <div>
            <h2 className="text-3xl sm:text-5xl font-black text-m3-on-surface tracking-tighter mb-4">
              {system.name}
            </h2>
            {system.description && (
              <p className="text-m3-on-surface-variant max-w-2xl font-bold opacity-80 leading-relaxed text-lg">
                {system.description}
              </p>
            )}
          </div>
          <div className="flex items-center gap-3 bg-m3-primary/10 px-4 py-2 rounded-full border border-m3-primary/20">
             <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.5)]" />
             <span className="text-m3-primary text-xs font-black uppercase tracking-wider">Operational</span>
          </div>
        </div>

        <div className="space-y-12">
          {/* Core PC Specifications Section */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-m3-primary/10 rounded-xl">
                <FaMicrochip className="text-m3-primary text-xl" />
              </div>
              <h3 className="text-sm font-black text-m3-primary uppercase tracking-[0.2em]">
                Core Architecture
              </h3>
            </div>
            <ItemList items={system.specs} columns={3} />
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Peripherals Section */}
            {system.peripherals && system.peripherals.length > 0 && (
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-m3-secondary/10 rounded-xl">
                    <FaKeyboard className="text-m3-secondary text-xl" />
                  </div>
                  <h3 className="text-sm font-black text-m3-secondary uppercase tracking-[0.2em]">
                    Interface & Control
                  </h3>
                </div>
                <ItemList items={system.peripherals} columns={2} />
              </section>
            )}

            {/* Software & Operating Systems Section */}
            {system.softwareAndOS && system.softwareAndOS.length > 0 && (
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-m3-primary/10 rounded-xl">
                    <FaWindows className="text-m3-primary text-xl" />
                  </div>
                  <h3 className="text-sm font-black text-m3-primary uppercase tracking-[0.2em]">
                    System Environment
                  </h3>
                </div>
                <ItemList items={system.softwareAndOS} columns={1} />
              </section>
            )}
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-m3-outline/10 text-center">
            <p className="text-[11px] font-black uppercase tracking-[0.2em] opacity-40">
                Last Hardware Scan: {new Date().toLocaleDateString()} • System ID: #VORLIE-MAIN-01
            </p>
        </div>
      </div>
    </div>
  );
};

export default SystemCard;
