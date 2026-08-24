import { NavLink } from "react-router-dom";

import { useLanyard } from "../../context/LanyardContext";
import SidebarProfile from "./SidebarProfile";

const navigation = [
  {
    label: "Home",
    icon: "home",
    href: "/",
  },
  {
    label: "Projects",
    icon: "code",
    href: "/projects",
  },
  {
    label: "About",
    icon: "person",
    href: "/about",
  },
  {
    label: "Blog",
    icon: "article",
    href: "/blog",
  },
  {
    label: "Gallery",
    icon: "photo_library",
    href: "/gallery",
  },
  {
    label: "Music",
    icon: "music_history",
    href: "/music",
  }
];

export default function Sidebar() {
  const { presence } = useLanyard();
  return (
    <aside className="sidebar">
      {presence && (
        <SidebarProfile
          user={presence.discord_user}
          status={presence.discord_status}
        />
      )}

      <nav className="sidebar__nav" aria-label="Main navigation">
        <div className="sidebar__section-label">Navigate</div>

        {navigation.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            end={item.href === "/"}
            className={({ isActive }) =>
              `sidebar__item ${isActive ? "sidebar__item--active" : ""}`
            }
          >
            <span className="material-symbols-rounded" aria-hidden="true">
              {item.icon}
            </span>

            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar__footer">
        <a
          href="https://github.com/vorlie"
          target="_blank"
          rel="noopener noreferrer"
          className="sidebar__item"
        >
          <span className="material-symbols-rounded" aria-hidden="true">
            code
          </span>

          <span>GitHub</span>
        </a>
      </div>
    </aside>
  );
}
