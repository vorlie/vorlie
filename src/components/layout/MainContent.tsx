import { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { useTheme } from "../../theme";
import TopBar from "./TopBar";
import { getSubSectionsForRoute } from "./NavigationStructure";

interface MainContentProps {
  children: ReactNode;
}

export default function MainContent({ children }: MainContentProps) {
  const { resolvedTheme, prideTheme } = useTheme();
  const location = useLocation();
  const subSections = getSubSectionsForRoute(location.pathname);

  const prideFlagBackground = (() => {
    if (resolvedTheme !== "pride") {
      return "none";
    }

    switch (prideTheme) {
      case "bisexual":
        return "linear-gradient(180deg, #d60270 0%, #d60270 40%, #9b4f96 40%, #9b4f96 60%, #0038a8 60%, #0038a8 100%)";
      case "genderfluid":
        return "linear-gradient(180deg, #ff75a2 0%, #ff75a2 20%, #ffffff 20%, #ffffff 40%, #be18d6 40%, #be18d6 60%, #000000 60%, #000000 80%, #333ebd 80%, #333ebd 100%)";
      case "lesbian":
        return "linear-gradient(180deg, #d52d00 0%, #d52d00 20%, #ef7627 20%, #ef7627 40%, #ffffff 40%, #ffffff 60%, #b55690 60%, #b55690 80%, #a30262 80%, #a30262 100%)";
      case "transgender":
        return "linear-gradient(180deg, #5bcefa 0%, #5bcefa 20%, #f5a9b8 20%, #f5a9b8 40%, #ffffff 40%, #ffffff 60%, #f5a9b8 60%, #f5a9b8 80%, #5bcefa 80%, #5bcefa 100%)";
      case "nonbinary":
        return "linear-gradient(180deg, #fff430 0%, #fff430 25%, #ffffff 25%, #ffffff 50%, #9c59d1 50%, #9c59d1 75%, #2c2c2c 75%, #2c2c2c 100%)";
      default:
        return "none";
    }
  })();

  return (
    <main
      className="md:ml-20 h-screen bg-m3-surface overflow-hidden relative"
      id="main-content"
      role="main"
    >
      <TopBar subSections={subSections || []} />
      
      <div className="rounded-tl-3xl h-full overflow-y-auto relative z-10 mt-16 ">
        <div
          className="absolute inset-0 -z-20 pointer-events-none"
          style={{
            backgroundImage: prideFlagBackground,
            opacity: resolvedTheme === "pride" ? 0.35 : 0,
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%",
          }}
        />

        <div
          className="absolute inset-0 -z-10 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage:
              resolvedTheme === "default"
                ? "url('/images/background.jpg')"
                : undefined,
          }}
        />
        <div className="bg-m3-surface/80">
          {children}
        </div>
      </div>
    </main>
  );
}
