import { useState } from "react";
import { navigationItems, NavItem } from "./NavigationStructure";
import { useTheme } from "../../theme";
import { useNavigation } from "../../hooks/useNavigation";

export default function Sidebar() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const { themeMode, setThemeMode, resolvedTheme } = useTheme();
  const { activeRoute, navigateTo } = useNavigation();

  const handleNavClick = (item: NavItem) => {
    if (item.external && item.href) {
      window.open(item.href, "_blank", "noopener noreferrer");
    } else if (item.route) {
      navigateTo(item.route);
    }
  };

  const toggleTheme = () => {
    if (themeMode === "default") {
      setThemeMode("pride");
    } else {
      setThemeMode("default");
    }
  };

  return (
    <aside className="fixed left-0 top-0 h-full w-20 bg-m3-surface  z-50 flex flex-col items-center py-6 gap-2 sidebar-flat" role="navigation" aria-label="Main navigation">
      <div className="mb-6">
        <div className="w-10 h-10 bg-m3-primary/20 rounded-lg flex items-center justify-center" aria-hidden="true">
          <span className="material-symbols-rounded text-m3-primary text-xl">
            code
          </span>
        </div>
      </div>

      <nav className="flex-1 flex flex-col items-center gap-1 w-full px-2" aria-label="Site sections">
        {navigationItems.map((item) => {
          const isActive = activeRoute === item.route || activeRoute.startsWith(item.route + "/");
          const isHovered = hoveredItem === item.id;
          const hasSubSections = item.subSections && item.subSections.length > 0;

          return (
            <div
              key={item.id}
              className="relative group"
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <button
                onClick={() => handleNavClick(item)}
                className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-m3-primary/50 relative ${
                  isActive
                    ? "bg-m3-primary text-m3-on-primary"
                    : "text-m3-on-surface-variant hover:bg-m3-on-surface/10"
                }`}
                aria-label={item.label}
                aria-current={isActive ? "true" : undefined}
              >
                <span className="material-symbols-rounded text-xl" aria-hidden="true">
                  {item.icon}
                </span>
                
                {/* Sub-section indicator */}
                {hasSubSections && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-m3-secondary rounded-full" aria-hidden="true" />
                )}
              </button>

              {/* Tooltip */}
              {isHovered && (
                <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-m3-surface-container border border-m3-outline/20 rounded-md text-xs font-medium text-m3-on-surface whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" role="tooltip">
                  {item.label}
                  {hasSubSections && (
                    <span className="ml-2 text-m3-primary text-[10px]">•</span>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      <div className="mt-auto px-2 flex flex-col gap-2">
        <a
          href="https://github.com/vorlie"
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 rounded-lg flex items-center justify-center text-m3-on-surface-variant hover:bg-m3-on-surface/10 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-m3-primary/50"
          aria-label="GitHub"
          title="GitHub"
        >
          <span className="material-symbols-rounded text-xl" aria-hidden="true">
            link
          </span>
        </a>
        <a
          href="https://discord.gg/yUueAFyAmN"
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 rounded-lg flex items-center justify-center text-m3-on-surface-variant hover:bg-m3-on-surface/10 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-m3-primary/50"
          aria-label="Discord"
          title="Discord"
        >
          <span className="material-symbols-rounded text-xl" aria-hidden="true">
            link
          </span>
        </a>
        <button
          onClick={toggleTheme}
          className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-m3-primary/50 ${
            resolvedTheme === "pride"
              ? "bg-m3-primary text-m3-on-primary"
              : "text-m3-on-surface-variant hover:bg-m3-on-surface/10"
          }`}
          aria-label="Toggle theme"
          title={resolvedTheme === "pride" ? "Switch to default theme" : "Switch to pride theme"}
        >
          <span className="material-symbols-rounded text-xl" aria-hidden="true">
            {resolvedTheme === "pride" ? "favorite" : "palette"}
          </span>
        </button>
      </div>
    </aside>
  );
}