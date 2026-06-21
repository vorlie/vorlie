import {
  FaGamepad,
  FaHeadphones,
  FaTrophy,
  FaVideo,
} from "react-icons/fa";
import { LANYARD_THEMES, LanyardTheme } from "../../data/lanyardThemes";
import { Activity, PresenceData } from "../../types/lanyard";

export const statusTextColors: Record<PresenceData["discord_status"], string> =
  {
    online: "text-green-400",
    idle: "text-yellow-400",
    dnd: "text-red-400",
    offline: "text-gray-500",
  };

export const statusPulseColors: Record<PresenceData["discord_status"], string> =
  {
    online: "74, 222, 128",
    idle: "250, 204, 21",
    dnd: "248, 113, 113",
    offline: "107, 114, 128",
  };

export const statusBgColors: Record<PresenceData["discord_status"], string> = {
  online: "bg-green-400",
  idle: "bg-yellow-400",
  dnd: "bg-red-400",
  offline: "bg-gray-500",
};

export function getStatusText(status: PresenceData["discord_status"]) {
  return status === "dnd"
    ? "Do not disturb"
    : status.charAt(0).toUpperCase() + status.slice(1);
}

export function getDisplayActivities(
  activities: Activity[],
  hasSpotify: boolean,
) {
  const seenActivities = new Set<string>();

  return activities.filter((activity) => {
    if (activity.type === 4) return false;
    if (activity.name === "Spotify" && hasSpotify) return false;

    const activityKey = [
      activity.application_id,
      activity.name,
      activity.type,
      activity.details,
      activity.state,
      activity.assets?.large_text,
      activity.assets?.large_image,
    ]
      .filter(Boolean)
      .join("|");

    if (seenActivities.has(activityKey)) return false;

    seenActivities.add(activityKey);
    return true;
  });
}

export function getActivityTheme(activity: Activity): LanyardTheme {
  if (LANYARD_THEMES[activity.name]) return LANYARD_THEMES[activity.name];
  if (activity.platform === "xbox") return LANYARD_THEMES["Xbox"];

  let label = "Playing";
  let icon = FaGamepad;

  switch (activity.type) {
    case 1:
      label = "Streaming";
      break;
    case 2:
      label = "Listening to";
      icon = FaHeadphones;
      break;
    case 3:
      label = "Watching";
      icon = FaVideo;
      break;
    case 5:
      label = "Competing in";
      icon = FaTrophy;
      break;
  }

  return {
    name: "",
    label,
    color: "text-m3-on-surface-variant",
    pulseColor: "208, 188, 255",
    bgClass: "bg-m3-surface-container",
    borderClass: "border-m3-outline/10",
    textClass: "text-m3-on-surface-variant",
    icon,
  };
}
