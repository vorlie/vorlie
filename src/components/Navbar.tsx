
import { NavLink } from 'react-router-dom';

function Navbar() {
  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/miko/privacy-policy", label: "Privacy Policy" },
    { to: "/miko/terms-of-service", label: "Terms of Service" },
    { to: "/verify", label: "Verify" },
  ];

  return (
    <div className="bg-gray-800/50 py-2 rounded-lg shadow-lg mb-2">
      <nav className="max-w-6xl mx-auto px-2 flex justify-start gap-2">
        {navLinks.map((link) => (
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
        ))}
      </nav>
    </div>
  );
}

export default Navbar;