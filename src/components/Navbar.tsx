import { useState } from "react";
import { NavLink } from "react-router-dom";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

function Navbar() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "https://docs.vorlie.pl", label: "API" },
    {
      label: "Projects",
      children: [
        { to: "/project/iota-player", label: "Iota Player" }
      ]
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
    <div className="bg-gray-800/50 py-2 rounded-lg shadow-lg mb-2">
      <nav className="max-w-6xl mx-auto px-2 flex justify-start gap-2">
        {navLinks.map((link, index) => {
          if (link.children) {
            // Check if the current link's dropdown is open
            const isOpen = openDropdown === link.label;
            return (
              <div key={index} className="relative">
                <button
                  onClick={() => toggleDropdown(link.label)} // Pass the label to toggle this specific dropdown
                  className={`text-gray-300 hover:text-white hover:bg-gray-800 transition-colors px-3 py-2 rounded-md flex items-center gap-1 ${
                    isOpen ? "bg-gray-900" : ""
                  }`}
                >
                  {link.label}
                  <ChevronDownIcon
                    className={`w-4 h-4 transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    aria-hidden="true"
                  />
                </button>
                {isOpen && ( // Only render if this specific dropdown is open
                  <div className="absolute left-0 mt-1 w-48 bg-gray-700 rounded-md shadow-lg z-20">
                    {link.children.map((childLink) => (
                      <NavLink
                        key={childLink.to}
                        to={childLink.to}
                        className={({ isActive }) =>
                          `block text-gray-300 hover:text-white hover:bg-gray-800 transition-colors px-4 py-2 rounded-md ${
                            isActive ? "bg-gray-900" : ""
                          }`
                        }
                        onClick={() => setOpenDropdown(null)} // Close all dropdowns on item click
                      >
                        {childLink.label}
                      </NavLink>
                    ))}
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
                  `text-gray-300 hover:text-white hover:bg-gray-800 transition-colors px-3 py-2 rounded-md ${
                    isActive ? "bg-gray-900" : ""
                  }`
                }
              >
                {link.label}
              </NavLink>
            );
          }
        })}
      </nav>
    </div>
  );
}

export default Navbar;