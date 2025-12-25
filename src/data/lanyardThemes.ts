import { IconType } from "react-icons";
import { FaYoutube, FaXbox, FaReact } from "react-icons/fa";
import { SiJellyfin, SiIntellijidea } from "react-icons/si";
import { VscCode } from "react-icons/vsc";

export interface LanyardTheme {
  name: string;
  color: string; // Tailwind color class or hex
  pulseColor: string; // RGB for pulse
  icon: IconType;
  label: string;
  bgClass: string;
  borderClass: string;
  textClass: string;
}

export const LANYARD_THEMES: Record<string, LanyardTheme> = {
  Jellyfin: {
    name: "Jellyfin",
    color: "text-blue-500",
    pulseColor: "59, 130, 246",
    icon: SiJellyfin,
    label: "Coding in",
    bgClass: "bg-blue-900/20",
    borderClass: "border-blue-900/30",
    textClass: "text-blue-400",
  },
  YouTube: {
    name: "YouTube",
    color: "text-red-500",
    pulseColor: "239, 68, 68",
    icon: FaYoutube,
    label: "Watching on",
    bgClass: "bg-red-900/20",
    borderClass: "border-red-900/30",
    textClass: "text-red-400",
  },
  Xbox: {
    name: "Xbox",
    color: "text-green-500",
    pulseColor: "74, 222, 128",
    icon: FaXbox,
    label: "Playing on",
    bgClass: "bg-green-900/20",
    borderClass: "border-green-900/30",
    textClass: "text-green-400",
  },
  "Google Antigravity": {
    name: "Google Antigravity",
    color: "text-blue-400",
    pulseColor: "96, 165, 250",
    icon: FaReact,
    label: "Developing with",
    bgClass: "bg-blue-900/20",
    borderClass: "border-blue-900/30",
    textClass: "text-blue-400",
  },
  "Visual Studio Code": {
    name: "Visual Studio Code",
    color: "text-blue-500",
    pulseColor: "59, 130, 246",
    icon: VscCode,
    label: "Coding in",
    bgClass: "bg-blue-900/20",
    borderClass: "border-blue-900/30",
    textClass: "text-blue-400",
  },
  "IntelliJ IDEA": {
    name: "IntelliJ IDEA",
    color: "text-purple-500",
    pulseColor: "168, 85, 247",
    icon: SiIntellijidea,
    label: "Coding in",
    bgClass: "bg-purple-900/20",
    borderClass: "border-purple-900/30",
    textClass: "text-purple-400",
  },
};
