import {
  useState,
  useEffect,
  useLayoutEffect,
  useRef,
  useCallback,
} from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

interface NavItem {
  label: string;
  to?: string;
  children?: NavItem[];
  icon?: string;
  type?: "link" | "divider";
}

const navLinks: NavItem[] = [
  { to: "/", label: "Home", icon: "home" },
  { to: "/blog", label: "Blog", icon: "article" },
  {
    label: "Showcase",
    icon: "grid_view",
    children: [
      { to: "/specs", label: "My Rigs", icon: "desktop_windows" },
      { to: "/music", label: "Music", icon: "music_note" },
      { to: "/clips", label: "Clips", icon: "movie" },
      { to: "/rat", label: "Rats", icon: "pets" },
      { to: "/colors", label: "Colors", icon: "palette" },
    ],
  },
  {
    label: "Projects",
    icon: "code",
    children: [
      { to: "/project/iota-player", label: "Iota Player", icon: "play_circle" },
      { to: "https://docs.vorlie.pl", label: "API", icon: "terminal" },
      { to: "https://edit.vorlie.pl", label: "PixieEdit", icon: "edit" },
    ],
  },
  {
    label: "Miko",
    icon: "auto_awesome",
    children: [
      {
        to: "https://discord.gg/yUueAFyAmN",
        label: "Miko's Shrine",
        icon: "temple_buddhist",
      },
      {
        to: "https://vorlie.pl/?link=invite_miko",
        label: "Invite Miko",
        icon: "person_add",
      },
      { to: "/verify", label: "Verify", icon: "verified" },
      { type: "divider", label: "" },
      { to: "/miko/privacy-policy", label: "Privacy", icon: "policy" },
      { to: "/miko/terms-of-service", label: "Terms", icon: "gavel" },
    ],
  },
];

export default function Navbar() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [indicatorStyle, setIndicatorStyle] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  const linksRef = useRef<{ [key: string]: HTMLElement | null }>({});
  const navRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const updatePill = useCallback(() => {
    if (!navRef.current) return;

    let activeElement: HTMLElement | null = null;

    // 1. Priority: Mobile "More" button
    if (isMobileMenuOpen && linksRef.current["More"]) {
      activeElement = linksRef.current["More"];
    }
    // 2. Desktop: Open Dropdown
    else if (openDropdown && linksRef.current[openDropdown]) {
      activeElement = linksRef.current[openDropdown];
    }
    // 3. Match Links (Home/Blog)
    else {
      const activeLinkKey = Object.keys(linksRef.current).find((key) => {
        if (key === "/") return location.pathname === "/";
        return (
          location.pathname === key || location.pathname.startsWith(`${key}/`)
        );
      });

      if (activeLinkKey && linksRef.current[activeLinkKey]) {
        activeElement = linksRef.current[activeLinkKey];
      }
      // 4. Parent Category (Showcase, etc.)
      else {
        const activeGroup = navLinks.find((g) =>
          g.children?.some(
            (c) =>
              c.to === location.pathname ||
              (c.to !== "/" && location.pathname.startsWith(`${c.to}/`)),
          ),
        );
        if (activeGroup) {
          if (linksRef.current[activeGroup.label]) {
            activeElement = linksRef.current[activeGroup.label];
          } else if (linksRef.current["More"]) {
            activeElement = linksRef.current["More"];
          }
        }
      }
    }

    if (activeElement) {
      const navRect = navRef.current.getBoundingClientRect();
      const elRect = activeElement.getBoundingClientRect();

      setIndicatorStyle({
        left: elRect.left - navRect.left,
        width: elRect.width,
        opacity: 1,
      });
    } else {
      setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }));
    }
  }, [location.pathname, openDropdown, isMobileMenuOpen]);

  useLayoutEffect(() => {
    updatePill();
    const timer = setTimeout(updatePill, 50);
    window.addEventListener("resize", updatePill);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updatePill);
    };
  }, [updatePill]);

  useEffect(() => {
    setOpenDropdown(null);
    setIsMobileMenuOpen(false);
    const handleClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [location]);

  const Icon = ({
    name,
    className = "",
  }: {
    name: string;
    className?: string;
  }) => (
    <span
      className={`material-symbols-rounded text-[20px] leading-none ${className}`}
      aria-hidden="true"
    >
      {name}
    </span>
  );

  const renderChildLink = (link: NavItem) => {
    if (link.type === "divider")
      return (
        <div
          key={Math.random()}
          className="my-2 border-t border-m3-outline/10"
        />
      );
    const isExternal = link.to?.startsWith("http");
    const childClass =
      "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-[16px] transition-all duration-200";
    const content = (
      <>
        {link.icon && <Icon name={link.icon} />}
        <span className="flex-grow text-left">{link.label}</span>
        {isExternal && (
          <Icon name="open_in_new" className="text-[16px] opacity-50" />
        )}
      </>
    );

    if (isExternal) {
      return (
        <a
          key={link.to}
          href={link.to}
          target="_blank"
          rel="noopener noreferrer"
          className={`${childClass} text-m3-on-surface hover:bg-m3-on-surface/10`}
        >
          {content}
        </a>
      );
    }
    return (
      <NavLink
        key={link.to}
        to={link.to!}
        className={({ isActive }) =>
          `${childClass} ${isActive ? "bg-m3-secondary text-m3-on-secondary" : "text-m3-on-surface hover:bg-m3-on-surface/10"}`
        }
      >
        {content}
      </NavLink>
    );
  };

  return (
    <div className="fixed bottom-6 left-0 right-0 z-50 px-4 flex justify-center pointer-events-none">
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-10 md:hidden pointer-events-auto"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div
            className="absolute bottom-24 left-4 right-4 bg-m3-surface-container border border-m3-outline/20 rounded-[32px] p-2 shadow-2xl max-h-[70vh] overflow-y-auto animate-mobile-slide-up mx-auto max-w-lg"
            onClick={(e) => e.stopPropagation()}
          >
            {navLinks.slice(2).map((group) => (
              <div key={group.label} className="mb-2 last:mb-0">
                <div className="px-4 py-2 text-[11px] font-bold text-m3-primary uppercase tracking-widest opacity-70">
                  {group.label}
                </div>
                <div className="flex flex-col gap-1">
                  {group.children?.map((child) => renderChildLink(child))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <nav
        ref={navRef}
        className="relative z-20 pointer-events-auto flex items-center gap-1 bg-m3-surface-container border border-m3-outline/20 rounded-[28px] shadow-lg px-2 py-2 transition-all duration-300"
      >
        <div
          className="absolute h-[36px] bg-m3-primary-container rounded-full transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] z-0"
          style={{
            left: `${indicatorStyle.left}px`,
            width: `${indicatorStyle.width}px`,
            opacity: indicatorStyle.opacity,
          }}
        />

        <div className="flex items-center gap-1">
          {navLinks.slice(0, 2).map((link) => (
            <NavLink
              key={link.to}
              to={link.to!}
              ref={(el) => {
                linksRef.current[link.to!] = el;
              }}
              className={({ isActive }) =>
                `relative z-10 flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full transition-colors duration-300 ${isActive ? "text-m3-on-primary-container" : "text-m3-on-surface-variant hover:bg-m3-on-surface/5"}`
              }
            >
              {link.icon && <Icon name={link.icon} />}
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-1">
          {navLinks.slice(2).map((link) => (
            <div key={link.label} className="relative w-fit flex-shrink-0">
              <button
                ref={(el) => {
                  linksRef.current[link.label] = el;
                }}
                onClick={() =>
                  setOpenDropdown(
                    openDropdown === link.label ? null : link.label,
                  )
                }
                className={`relative z-10 flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full transition-all duration-300 ${
                  openDropdown === link.label ||
                  navLinks
                    .find((g) => g.label === link.label)
                    ?.children?.some((c) => c.to === location.pathname)
                    ? "text-m3-on-primary-container"
                    : "text-m3-on-surface-variant hover:bg-m3-on-surface/5"
                }`}
              >
                {link.icon && <Icon name={link.icon} />}
                {link.label}
                <ChevronDownIcon
                  className={`w-4 h-4 transition-transform duration-300 ${openDropdown === link.label ? "rotate-180" : ""}`}
                />
              </button>

              {openDropdown === link.label && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 min-w-[14rem] w-max max-w-[90vw] bg-m3-surface-container border border-m3-outline/20 rounded-[24px] shadow-2xl z-50 overflow-hidden animate-vertical-slide-in transform-gpu origin-bottom">
                  <div className="p-2 space-y-1">
                    {link.children?.map((child) => renderChildLink(child))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <button
          ref={(el) => {
            linksRef.current["More"] = el;
          }}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={`md:hidden flex items-center gap-2 px-4 py-2 rounded-full relative z-10 transition-all ${
            isMobileMenuOpen ||
            navLinks
              .slice(2)
              .some((g) => g.children?.some((c) => c.to === location.pathname))
              ? "text-m3-on-primary-container"
              : "text-m3-on-surface-variant hover:bg-m3-on-surface/10"
          }`}
        >
          <Icon name={isMobileMenuOpen ? "close" : "more_horiz"} />
          <span className="text-sm font-medium">More</span>
        </button>
      </nav>
    </div>
  );
}
