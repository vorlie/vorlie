// components/layout/AppShell.tsx

import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import MainFrame from "./MainFrame";
import MobileNav from "./MobileNav";

interface AppShellProps {
  children: ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  return (
    <div className="app-shell">
      <div
        className="app-background"
        style={{backgroundImage:"url('/images/background.jpg')"}}
      />
      <MobileNav />
      <Sidebar />
      <MainFrame>{children}</MainFrame>
    </div>
  );
}
