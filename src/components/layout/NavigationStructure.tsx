export interface SubSection {
  id: string;
  label: string;
  route: string;
}

export interface NavItem {
  id: string;
  label: string;
  icon: string;
  section: string;
  route: string;
  external?: boolean;
  href?: string;
  subSections?: SubSection[];
}

export const navigationItems: NavItem[] = [
  { id: "home", label: "Home", icon: "home", section: "hero", route: "/" },
  { 
    id: "dev", 
    label: "Dev", 
    icon: "code", 
    section: "dev", 
    route: "/dev",
    subSections: [
      { id: "projects", label: "Projects", route: "/dev/projects" },
      { id: "api", label: "API Docs", route: "/dev/api" },
      { id: "github", label: "GitHub", route: "/dev/github" },
      { id: "tutorials", label: "Tutorials", route: "/dev/tutorials" },
    ]
  },
  { 
    id: "gaming", 
    label: "Gaming", 
    icon: "sports_esports", 
    section: "gaming", 
    route: "/gaming",
    subSections: [
      { id: "clips", label: "Clips", route: "/gaming/clips" },
      { id: "specs", label: "Specs", route: "/gaming/specs" },
      { id: "accounts", label: "Accounts", route: "/gaming/accounts" },
      { id: "projects", label: "Projects", route: "/gaming/projects" },
    ]
  },
  { 
    id: "creative", 
    label: "Creative", 
    icon: "palette", 
    section: "creative", 
    route: "/creative",
    subSections: [
      { id: "music", label: "Music", route: "/creative/music" },
      { id: "gallery", label: "Gallery", route: "/creative/gallery" },
      { id: "colors", label: "Colors", route: "/creative/colors" },
      { id: "tools", label: "Tools", route: "/creative/tools" },
    ]
  },
  { id: "blog", label: "Blog", icon: "article", section: "blog", route: "/blog" },
  { id: "about", label: "About", icon: "person", section: "about", route: "/about" },
];

export const mobileTabItems: NavItem[] = [
  { id: "home", label: "Home", icon: "home", section: "hero", route: "/" },
  { 
    id: "dev", 
    label: "Dev", 
    icon: "code", 
    section: "dev", 
    route: "/dev",
    subSections: [
      { id: "projects", label: "Projects", route: "/dev/projects" },
      { id: "api", label: "API Docs", route: "/dev/api" },
      { id: "github", label: "GitHub", route: "/dev/github" },
      { id: "tutorials", label: "Tutorials", route: "/dev/tutorials" },
    ]
  },
  { 
    id: "gaming", 
    label: "Gaming", 
    icon: "sports_esports", 
    section: "gaming", 
    route: "/gaming",
    subSections: [
      { id: "clips", label: "Clips", route: "/gaming/clips" },
      { id: "specs", label: "Specs", route: "/gaming/specs" },
      { id: "accounts", label: "Accounts", route: "/gaming/accounts" },
      { id: "projects", label: "Projects", route: "/gaming/projects" },
    ]
  },
  { 
    id: "creative", 
    label: "Creative", 
    icon: "palette", 
    section: "creative", 
    route: "/creative",
    subSections: [
      { id: "music", label: "Music", route: "/creative/music" },
      { id: "gallery", label: "Gallery", route: "/creative/gallery" },
      { id: "colors", label: "Colors", route: "/creative/colors" },
      { id: "tools", label: "Tools", route: "/creative/tools" },
    ]
  },
  { id: "more", label: "More", icon: "more_horiz", section: "", route: "/about" },
];

export function getSubSectionsForRoute(route: string): SubSection[] | undefined {
  const baseRoute = "/" + route.split("/")[1];
  const navItem = navigationItems.find(item => item.route === baseRoute);
  return navItem?.subSections;
}

export function getNavItemForRoute(route: string): NavItem | undefined {
  if (route === "/" || route === "") {
    return navigationItems.find(item => item.route === "/");
  }
  
  const baseRoute = "/" + route.split("/")[1];
  return navigationItems.find(item => item.route === baseRoute);
}