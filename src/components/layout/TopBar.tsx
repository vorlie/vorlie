import { NavLink, useLocation } from "react-router-dom";
import { SubSection } from "./NavigationStructure";

interface TopBarProps {
  subSections: SubSection[];
  onClose?: () => void;
}

export default function TopBar({ subSections, onClose }: TopBarProps) {
  const location = useLocation();

  if (!subSections || subSections.length === 0) {
    return null;
  }

  return (
    <div className="fixed top-0 left-20 right-0 h-16 bg-m3-surface z-40 hidden md:flex items-center  md:px-8 mr-2 md:mr-6">
      <nav
        className="flex items-center gap-1 w-full"
        aria-label="Sub-section navigation"
      >
        {subSections.map((subSection) => {
          const isActive = location.pathname === subSection.route;

          return (
            <NavLink
              key={subSection.id}
              to={subSection.route}
              className={({ isActive: isLinkActive }) =>
                `px-4 py-2 rounded-lg text-sm font-bold transition-all duration-200 ${
                  isLinkActive
                    ? "bg-m3-primary text-m3-on-primary"
                    : "text-m3-on-surface-variant hover:bg-m3-on-surface/10"
                }`
              }
              aria-current={isActive ? "true" : undefined}
            >
              {subSection.label}
            </NavLink>
          );
        })}
      </nav>

      {onClose && (
        <button
          onClick={onClose}
          className="ml-auto p-2 rounded-lg text-m3-on-surface-variant hover:bg-m3-on-surface/10 transition-all duration-200"
          aria-label="Close top bar"
        >
          <span className="material-symbols-rounded">close</span>
        </button>
      )}
    </div>
  );
}
