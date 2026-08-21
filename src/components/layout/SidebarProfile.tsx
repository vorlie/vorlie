import { DiscordUser } from "../../types/lanyard";

interface SidebarProfileProps {
  user: DiscordUser;
  status: "online" | "idle" | "dnd" | "offline";
}

export default function SidebarProfile({
  user,
  status,
}: SidebarProfileProps) {
  const avatarUrl = user.avatar
    ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=128`
    : `https://cdn.discordapp.com/embed/avatars/${
        Number(user.discriminator) % 5
      }.png`;

  const displayName = user.global_name ?? user.username;

  return (
    <div className="sidebar-profile">
      <div className="sidebar-profile__avatar-wrapper">
        <img
          src={avatarUrl}
          alt=""
          className="sidebar-profile__avatar"
        />

        <span
          className={`sidebar-profile__status sidebar-profile__status--${status}`}
          aria-label={status}
        />
      </div>

      <div className="sidebar-profile__info">
        <strong>{displayName}</strong>
        <span>@{user.username}</span>
      </div>
    </div>
  );
}