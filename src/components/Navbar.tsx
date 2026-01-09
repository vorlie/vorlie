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
      <nav className="pointer-events-auto w-full max-w-4xl bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl shadow-2xl px-6 py-3 flex items-center justify-between transition-all duration-300 hover:border-gray-600/50">
        <div className="flex flex-wrap gap-2 justify-center w-full sm:justify-start">
        {navLinks.map((link, index) => {
          if (link.children) {
            // Check if the current link's dropdown is open
            const isOpen = openDropdown === link.label;
            return (
              <div key={index} className="relative group">
                <button
                  onClick={() => toggleDropdown(link.label)} // Pass the label to toggle this specific dropdown
                  className={`text-gray-300 hover:text-white hover:bg-gray-800 transition-colors px-3 py-2 rounded-lg flex items-center gap-1 font-medium text-sm ${
                    isOpen ? "bg-gray-800 text-white" : ""
                  }`}
                >
                  {link.label}
                  <ChevronDownIcon
                    className={`w-4 h-4 transition-transform ${
                      isOpen ? "rotate-0" : "rotate-180"
                    }`}
                    aria-hidden="true"
                  />
                </button>
                {isOpen && ( // Only render if this specific dropdown is open
                  <div className="absolute bottom-full left-0 mb-3 w-48 bg-gray-800/95 backdrop-blur-xl border border-gray-700/50 rounded-xl shadow-xl z-50 overflow-hidden transform origin-bottom transition-all duration-200">
                    <div className="p-1">
                      {link.children.map((childLink) => (
                        <NavLink
                          key={childLink.to}
                          to={childLink.to}
                          className={({ isActive }) =>
                            `block text-gray-300 hover:text-white hover:bg-white/10 transition-colors px-3 py-2 text-sm rounded-lg ${
                              isActive ? "bg-white/10 text-white" : ""
                            }`
                          }
                          onClick={() => setOpenDropdown(null)} // Close all dropdowns on item click
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
            return (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `text-gray-300 hover:text-white hover:bg-gray-800 transition-colors px-3 py-2 rounded-lg font-medium text-sm ${
                    isActive ? "bg-gray-800 text-white" : ""
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
