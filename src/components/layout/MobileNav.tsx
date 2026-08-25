import { NavLink } from "react-router-dom";

import { navigation } from "./nav";

export default function MobileNav() {
  return (
    <nav className="mobile-nav" aria-label="Main navigation">
      {navigation.map((item) => (
        <NavLink
          key={item.href}
          to={item.href}
          end={item.href === "/"}
          className={({ isActive }) =>
            `mobile-nav__item ${
              isActive ? "mobile-nav__item--active" : ""
            }`
          }
        >
          <span className="material-symbols-rounded" aria-hidden="true">
            {item.icon}
          </span>

          <span className="mobile-nav__label">{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}