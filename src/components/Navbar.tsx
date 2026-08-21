import {
  useState,
  useEffect,
  useLayoutEffect,
  useRef,
  useCallback,
} from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { PrideTheme, ThemeMode, useTheme } from "../theme";

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
      { to: "/gallery", label: "Gallery", icon: "image" },
      { to: "/specs", label: "My Rigs", icon: "desktop_windows" },
      { to: "/music", label: "Music", icon: "music_note" },
      { to: "/clips", label: "Clips", icon: "movie" },
      { to: "/colors", label: "Colors", icon: "palette" },
      { to: "/for-sale", label: "For Sale", icon: "sell" },
    ],
  },
  {
    label: "Projects",
    icon: "code",
    children: [
      { to: "/project/iota-player", label: "Iota Player", icon: "play_circle" },
      {
        to: "/project/iotas-notepad",
        label: "Iota's Notepad",
        icon: "note_add",
      },
      { to: "https://docs.vorlie.pl", label: "API", icon: "terminal" },
      { to: "https://edit.vorlie.pl", label: "PixieEdit", icon: "edit" },
      { to: "/project/obs", label: "OBS Widgets", icon: "stream" },
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
  const [isPrideMenuOpen, setIsPrideMenuOpen] = useState(false);
  const [indicatorStyle, setIndicatorStyle] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  const linksRef = useRef<{ [key: string]: HTMLElement | null }>({});
  const navRef = useRef<HTMLDivElement>(null);
  const preferencesRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const {
    themeMode,
    resolvedTheme,
    prideTheme,
    isSeasonalPrideActive,
    isPrideCycleActive,
    setThemeMode,
    setPrideTheme,
    setPrideCycleActive,
  } = useTheme();

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
    setIsPrideMenuOpen(false);
    const handleClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
      if (
        preferencesRef.current &&
        !preferencesRef.current.contains(e.target as Node)
      ) {
        setIsPrideMenuOpen(false);
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

  const themeOptions: {
    mode: ThemeMode;
    label: string;
    icon: string;
    title: string;
  }[] = [
    {
      mode: "auto",
      label: "Auto",
      icon: "auto_awesome",
      title: isSeasonalPrideActive
        ? "Auto: Pride theme active for June"
        : "Auto: default theme outside June",
    },
    {
      mode: "default",
      label: "Default",
      icon: "palette",
      title: "Use the dynamic site palette",
    },
    {
      mode: "pride",
      label: "Pride",
      icon: "favorite",
      title: "Use the selected Pride theme. Right-click for more Pride themes.",
    },
  ];

  const prideThemeOptions: {
    theme: PrideTheme;
    label: string;
    swatches: string[];
  }[] = [
    {
      theme: "bisexual",
      label: "Bisexual",
      swatches: ["#d60270", "#9b4f96", "#0038a8"],
    },
    {
      theme: "genderfluid",
      label: "Genderfluid",
      swatches: ["#ff75a2", "#ffffff", "#be18d6", "#000000", "#333ebd"],
    },
    {
      theme: "lesbian",
      label: "Lesbian",
      swatches: ["#d52d00", "#ef7627", "#ffffff", "#b55690", "#a30262"],
    },
    {
      theme: "transgender",
      label: "Transgender",
      swatches: ["#5bcefa", "#f5a9b8", "#ffffff"],
    },
    {
      theme: "nonbinary",
      label: "Non-Binary",
      swatches: ["#fff430", "#ffffff", "#9c59d1", "#2c2c2c"],
    },
  ];

  const activePrideThemeLabel =
    prideThemeOptions.find((option) => option.theme === prideTheme)?.label ??
    "Pride";

  const selectPrideTheme = (nextTheme: PrideTheme) => {
    setPrideTheme(nextTheme);
    setThemeMode("pride");
    setIsPrideMenuOpen(false);
  };

  const prideThemeMenu = (
    <div
      className="absolute bottom-full right-0 mb-3 w-52 rounded-none border border-m3-outline/20 bg-m3-surface-container/95 p-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.4)] backdrop-blur-2xl animate-vertical-slide-in border-t-white/20 border-l-white/20 border-b-black/40 border-r-black/40"
      onMouseDown={(event) => event.stopPropagation()}
    >
      <div className="px-3 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-m3-primary/80">
        Pride Theme
      </div>
      <div className="space-y-1">
        {prideThemeOptions.map((option) => {
          const isActive = prideTheme === option.theme;
          return (
            <button
              key={option.theme}
              type="button"
              onClick={() => selectPrideTheme(option.theme)}
              className={`flex w-full items-center gap-3 rounded-none px-3 py-2.5 text-left text-sm font-bold transition-all ${
                isActive
                  ? "bg-m3-primary text-m3-on-primary"
                  : "text-m3-on-surface hover:bg-m3-on-surface/10"
              }`}
            >
              <span className="flex overflow-hidden rounded-none border border-m3-outline/20">
                {option.swatches.map((color) => (
                  <span
                    key={color}
                    className="h-4 w-3"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </span>
              <span className="flex-grow">{option.label}</span>
              {isActive && <Icon name="check" className="text-[17px]" />}
            </button>
          );
        })}
      </div>
    </div>
  );

  const themeControl = (compact = false) => (
    <div
      className={`flex items-center gap-1 rounded-none border border-m3-outline/10 bg-m3-on-surface/5 p-1 ${
        compact ? "w-full justify-between" : ""
      }`}
      aria-label="Theme"
    >
      {themeOptions.map((option) => {
        const isActive = themeMode === option.mode;
        const isPrideOption = option.mode === "pride";
        return (
          <div
            key={option.mode}
            className={`relative flex ${compact ? "flex-1" : ""}`}
          >
            <button
              type="button"
              onClick={() => setThemeMode(option.mode)}
              onContextMenu={(event) => {
                if (!isPrideOption) return;
                event.preventDefault();
                setIsPrideMenuOpen((isOpen) => !isOpen);
              }}
              title={
                isPrideOption
                  ? `${option.title} Current: ${activePrideThemeLabel}.`
                  : option.title
              }
              aria-pressed={isActive}
              className={`cursor-pointer relative flex w-full items-center justify-center gap-2 rounded-none text-xs font-black transition-all duration-300 ${
                compact ? "px-3 py-2.5" : "px-3 py-2"
              } ${
                isActive
                  ? "bg-m3-primary text-m3-on-primary shadow-sm"
                  : "text-m3-on-surface-variant hover:bg-m3-on-surface/10 hover:text-m3-on-surface"
              }`}
            >
              <Icon name={option.icon} className="text-[18px]" />
              <span>{option.label}</span>
            </button>
            {isPrideOption && isPrideMenuOpen && prideThemeMenu}
          </div>
        );
      })}
      {resolvedTheme === "pride" && (
        <button
          type="button"
          onClick={() => setPrideCycleActive(!isPrideCycleActive)}
          title={
            isPrideCycleActive
              ? "Stop pride theme looping."
              : "Animate pride themes in a loop."
          }
          aria-pressed={isPrideCycleActive}
          className={`cursor-pointer relative flex flex-1 items-center justify-center gap-2 rounded-none text-xs font-black transition-all duration-300 ${
            compact ? "px-3 py-2.5" : "px-3 py-2"
          } ${
            isPrideCycleActive
              ? "bg-m3-primary text-m3-on-primary shadow-sm"
              : "text-m3-on-surface-variant hover:bg-m3-on-surface/10 hover:text-m3-on-surface"
          }`}
        >
          <Icon
            name={isPrideCycleActive ? "autorenew" : "play_arrow"}
            className="text-[18px]"
          />
          <span>{isPrideCycleActive ? "Pride loop on" : "Loop Pride"}</span>
        </button>
      )}
    </div>
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
      "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-none transition-all duration-200";
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
    <div className="fixed bottom-6 left-0 right-0 z-50 px-4 flex flex-col items-center gap-2 pointer-events-none">
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-10 md:hidden pointer-events-auto"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div
            className="absolute bottom-24 left-4 right-4 bg-m3-surface-container border border-m3-outline/20 rounded-none p-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.4)] max-h-[70vh] overflow-y-auto animate-mobile-slide-up mx-auto max-w-lg border-t-white/20 border-l-white/20 border-b-black/40 border-r-black/40"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-3 rounded-none border border-m3-outline/10 bg-m3-on-surface/5 p-3">
              <div className="px-2 pb-2 text-[11px] font-bold text-m3-primary uppercase tracking-widest opacity-70">
                Preferences
              </div>
              <div className="flex flex-col gap-2">
                {themeControl(true)}
              </div>
              <p className="px-2 pt-2 text-[11px] font-bold text-m3-on-surface-variant/60">
                {resolvedTheme === "pride"
                  ? `${activePrideThemeLabel} Pride palette active`
                  : "Dynamic palette active"}
              </p>
            </div>
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

      <div
        ref={preferencesRef}
        className="hidden md:flex pointer-events-auto items-center gap-2 rounded-none border border-m3-outline/20 bg-m3-surface-container/80 px-2 py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.4)] backdrop-blur-xl border-t-white/20 border-l-white/20 border-b-black/40 border-r-black/40"
      >
        {themeControl()}
      </div>

      <nav
        ref={navRef}
        className="relative z-20 pointer-events-auto flex items-center gap-1 bg-m3-surface-container/80 backdrop-blur-xl border border-m3-outline/20 rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,0.4)] px-2.5 py-2 transition-all duration-500 hover:border-m3-outline/30 border-t-white/20 border-l-white/20 border-b-black/40 border-r-black/40"
      >
        <div
          className="absolute h-[40px] bg-m3-primary-container/80 backdrop-blur-md rounded-sm transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] z-0"
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
                `relative z-10 flex items-center gap-2 text-sm font-bold px-4 py-2.5 rounded-none transition-all duration-300 ${isActive ? "text-m3-on-primary-container" : "text-m3-on-surface-variant hover:text-m3-on-surface"}`
              }
            >
              {link.icon && <Icon name={link.icon} />}
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-1 border-l border-m3-outline/10 ml-1">
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
                className={`cursor-pointer relative z-10 flex items-center gap-2 text-sm font-bold px-4 py-2.5 rounded-none transition-all duration-300 ${
                  openDropdown === link.label ||
                  navLinks
                    .find((g) => g.label === link.label)
                    ?.children?.some((c) => c.to === location.pathname)
                    ? "text-m3-on-primary-container"
                    : "text-m3-on-surface-variant hover:text-m3-on-surface"
                }`}
              >
                {link.icon && <Icon name={link.icon} />}
                {link.label}
                <ChevronDownIcon
                  className={`w-4 h-4 transition-transform duration-500 ${openDropdown === link.label ? "rotate-180" : ""}`}
                />
              </button>

              {openDropdown === link.label && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-6 min-w-[14rem] w-max max-w-[90vw] bg-m3-surface-container/95 backdrop-blur-2xl border border-m3-outline/20 rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,0.4)] z-50 overflow-hidden animate-vertical-slide-in transform-gpu origin-bottom border-t-white/20 border-l-white/20 border-b-black/40 border-r-black/40">
                  <div className="p-2.5 space-y-1">
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
          className={`md:hidden flex items-center gap-2 px-4 py-2.5 rounded-none relative z-10 transition-all ${
            isMobileMenuOpen ||
            navLinks
              .slice(2)
              .some((g) => g.children?.some((c) => c.to === location.pathname))
              ? "text-m3-on-primary-container"
              : "text-m3-on-surface-variant hover:bg-m3-on-surface/10"
          }`}
        >
          <Icon name={isMobileMenuOpen ? "close" : "more_horiz"} />
          <span className="text-sm font-bold">More</span>
        </button>
      </nav>
    </div>
  );
}
