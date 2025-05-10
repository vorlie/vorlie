import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

function Navbar() {
  const [isMikoDropdownOpen, setIsMikoDropdownOpen] = useState(false);

  const navLinks = [
    { to: "/", label: "Home" },
    {
      label: "Miko",
      children: [
        { to: "/miko/privacy-policy", label: "Privacy Policy" },
        { to: "/miko/terms-of-service", label: "Terms of Service" },
        { to: "/verify", label: "Verify" },
      ],
    },
  ];

  const toggleMikoDropdown = () => {
    setIsMikoDropdownOpen(!isMikoDropdownOpen);
  };

  return (
    <div className="bg-gray-800/50 py-2 rounded-lg shadow-lg mb-2">
      <nav className="max-w-6xl mx-auto px-2 flex justify-start gap-2">
        {navLinks.map((link, index) => {
          if (link.children) {
            return (
              <div key={index} className="relative">
                <button
                  onClick={toggleMikoDropdown}
                  className={`text-gray-300 hover:text-white hover:bg-gray-800 transition-colors px-3 py-2 rounded-md flex items-center gap-1 ${
                    isMikoDropdownOpen ? "bg-gray-900" : ""
                  }`}
                >
                  {link.label}
                  <ChevronDownIcon
                    className={`w-4 h-4 transition-transform ${
                      isMikoDropdownOpen ? "rotate-180" : ""
                    }`}
                    aria-hidden="true"
                  />
                </button>
                {isMikoDropdownOpen && (
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
                        onClick={toggleMikoDropdown} // Close dropdown on item click
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
