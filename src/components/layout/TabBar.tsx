import { useState } from "react";
import { mobileTabItems, NavItem, getSubSectionsForRoute } from "./NavigationStructure";
import { useNavigation } from "../../hooks/useNavigation";

export default function TabBar() {
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [showSubSectionsMenu, setShowSubSectionsMenu] = useState(false);
  const { activeRoute, navigateTo } = useNavigation();

  const subSections = getSubSectionsForRoute(activeRoute);

  const handleTabClick = (item: NavItem) => {
    if (item.id === "more") {
      setShowMoreMenu(!showMoreMenu);
      setShowSubSectionsMenu(false);
    } else if (item.route) {
      navigateTo(item.route);
      setShowMoreMenu(false);
      setShowSubSectionsMenu(false);
    }
  };

  const handleMoreItemClick = (route: string) => {
    navigateTo(route);
    setShowMoreMenu(false);
  };

  const handleSubSectionClick = (route: string) => {
    navigateTo(route);
    setShowSubSectionsMenu(false);
  };

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 bg-m3-surface border-t border-m3-outline/10 z-50 md:hidden tabbar-mobile" role="navigation" aria-label="Mobile navigation">
        <div className="flex items-center justify-around h-16 px-2">
          {mobileTabItems.map((item) => {
            const isActive = activeRoute === item.route || activeRoute.startsWith(item.route + "/");
            const hasSubSections = item.subSections && item.subSections.length > 0;
            const isPageWithSubSections = isActive && hasSubSections;

            return (
              <button
                key={item.id}
                onClick={() => {
                  if (isPageWithSubSections) {
                    setShowSubSectionsMenu(!showSubSectionsMenu);
                  } else {
                    handleTabClick(item);
                  }
                }}
                className={`flex flex-col items-center justify-center w-full h-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-m3-primary/50 relative ${
                  isActive ? "text-m3-primary" : "text-m3-on-surface-variant"
                }`}
                aria-label={item.label}
                aria-current={isActive ? "true" : undefined}
                aria-expanded={item.id === "more" ? showMoreMenu : isPageWithSubSections ? showSubSectionsMenu : undefined}
              >
                <span className="material-symbols-rounded text-xl mb-1" aria-hidden="true">
                  {item.icon}
                </span>
                <span className="text-[10px] font-medium">
                  {item.label}
                </span>
                
                {/* Sub-section indicator */}
                {hasSubSections && isActive && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-m3-secondary rounded-full" aria-hidden="true" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* More Menu */}
      {showMoreMenu && (
        <div className="fixed bottom-20 left-4 right-4 bg-m3-surface-container border border-m3-outline/20 rounded-xl p-4 z-50 md:hidden shadow-lg">
          <div className="space-y-2">
            <button
              onClick={() => handleMoreItemClick("/blog")}
              className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                activeRoute === "/blog" ? "bg-m3-primary text-m3-on-primary" : "text-m3-on-surface hover:bg-m3-on-surface/10"
              }`}
            >
              Blog
            </button>
            <button
              onClick={() => handleMoreItemClick("/about")}
              className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                activeRoute === "/about" ? "bg-m3-primary text-m3-on-primary" : "text-m3-on-surface hover:bg-m3-on-surface/10"
              }`}
            >
              About
            </button>
          </div>
        </div>
      )}

      {/* Sub-sections Menu */}
      {showSubSectionsMenu && subSections && subSections.length > 0 && (
        <div className="fixed bottom-20 left-4 right-4 bg-m3-surface-container border border-m3-outline/20 rounded-xl p-4 z-50 md:hidden shadow-lg">
          <div className="space-y-2">
            {subSections.map((subSection) => (
              <button
                key={subSection.id}
                onClick={() => handleSubSectionClick(subSection.route)}
                className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                  activeRoute === subSection.route ? "bg-m3-primary text-m3-on-primary" : "text-m3-on-surface hover:bg-m3-on-surface/10"
                }`}
              >
                {subSection.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}