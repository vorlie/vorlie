import { NavLink } from "react-router-dom";
import { navigationGroups } from "./nav";

export default function MobileNav() {
  const allItems = navigationGroups.flatMap((group) => group.items);

  return (
    <nav className="mobile-nav" aria-label="Main navigation">
      {allItems.map((item) => (
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