export interface NavItem {
  label: string;
  icon: string;
  href: string;
}

export interface NavGroup {
  title: string;
  items: NavItem[];
}

export const navigationGroups: NavGroup[] = [
  {
    title: "Navigate",
    items: [
      { label: "Home", icon: "home", href: "/" },
      { label: "Projects", icon: "code", href: "/projects" },
      { label: "About", icon: "person", href: "/about" },
    ],
  },
  {
    title: "Creative",
    items: [
      { label: "Blog", icon: "article", href: "/blog" },
      { label: "Gallery", icon: "photo_library", href: "/gallery" },
      { label: "Music", icon: "headphones", href: "/music" },
    ],
  },
];