import { useState } from "react";
import { NavLink } from "react-router-dom";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

function Navbar() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/specs", label: "My Rigs" },
    { to: "/clips", label: "Clips" },
    { to: "https://docs.vorlie.pl", label: "API" },
    {
      label: "Projects",
      children: [{ to: "/project/iota-player", label: "Iota Player" }],
    },
    {
      label: "Miko",
      children: [
        { to: "https://discord.gg/yUueAFyAmN", label: "Miko's Shrine" },
        { to: "https://vorlie.pl/?link=invite_miko", label: "Invite Miko" },
        { to: "/miko/privacy-policy", label: "Privacy Policy" },
        { to: "/miko/terms-of-service", label: "Terms of Service" },
        { to: "/verify", label: "Verify" },
      ],
    },
  ];

  const toggleDropdown = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  return (
    <div className="fixed bottom-6 left-0 right-0 z-50 px-4 flex justify-center pointer-events-none">
      <nav className="pointer-events-auto w-full max-w-4xl bg-m3-surface-container border border-m3-outline/20 rounded-[28px] shadow-lg px-6 py-3 flex items-center justify-between transition-all duration-300">
        <div className="flex flex-wrap gap-2 justify-center w-full sm:justify-start">
          {navLinks.map((link, index) => {
            if (link.children) {
              const isOpen = openDropdown === link.label;
              return (
                <div key={index} className="relative group">
                  <button
                    onClick={() => toggleDropdown(link.label)}
                    className={`text-sm font-medium px-4 py-2 rounded-full flex items-center gap-1 transition-all duration-200 ${
                      isOpen 
                        ? "bg-m3-primary-container text-m3-on-primary-container" 
                        : "text-m3-on-surface-variant hover:bg-m3-on-surface/10"
                    }`}
                  >
                    {link.label}
                    <ChevronDownIcon
                      className={`w-4 h-4 transition-transform duration-300 ${
                        isOpen ? "rotate-0" : "rotate-180"
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                  {isOpen && (
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-56 bg-m3-surface-container border border-m3-outline/20 rounded-[24px] shadow-2xl z-50 overflow-hidden transform origin-bottom animate-vertical-slide-in">
                      <div className="p-2 space-y-1">
                        {link.children.map((childLink) => (
                          <NavLink
                            key={childLink.to}
                            to={childLink.to}
                            className={({ isActive }) =>
                              `block px-4 py-3 text-sm font-medium rounded-[16px] transition-all duration-200 ${
                                isActive 
                                  ? "bg-m3-secondary text-m3-on-secondary" 
                                  : "text-m3-on-surface-variant hover:bg-m3-on-surface/10"
                              }`
                            }
                            onClick={() => setOpenDropdown(null)}
                          >
                            {childLink.label}
                          </NavLink>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            } else {
              const isExternal = link.to.startsWith("http");
              return isExternal ? (
                <a
                  key={link.to}
                  href={link.to}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-m3-on-surface-variant hover:bg-m3-on-surface/10 text-sm font-medium px-4 py-2 rounded-full transition-all duration-200"
                >
                  {link.label}
                </a>
              ) : (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `text-sm font-medium px-4 py-2 rounded-full transition-all duration-200 ${
                      isActive 
                        ? "bg-m3-primary-container text-m3-on-primary-container" 
                        : "text-m3-on-surface-variant hover:bg-m3-on-surface/10"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              );
            }
          })}
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
