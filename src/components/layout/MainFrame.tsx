// components/layout/MainFrame.tsx

import { ReactNode } from "react";

interface MainFrameProps {
  children: ReactNode;
}

export default function MainFrame({ children }: MainFrameProps) {
  return (
    <main className="main-frame">
      <div className="main-frame__content">
        {children}
      </div>
    </main>
  );
}