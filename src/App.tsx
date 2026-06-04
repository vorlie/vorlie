import { useEffect, useMemo } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home";
import redirect from "./utils/redirect";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import Verify from "./pages/Verify";
import Navbar from "./components/Navbar";
import IotaPlayer from "./pages/IotaPlayer";
import PCSpecs from "./pages/PCSpecs";
import Clips from "./pages/Clips";
import Music from "./pages/Music";
import Colors from "./pages/Colors";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import IotasNotepad from "./pages/IotasNotepad";

import useDynamicColor from "./hooks/useDynamicColor";
import ObsPanel from "./pages/ObsPanel";
import ObsGameFramePage from "./pages/ObsCamFrame";
import ObsWidgets from "./pages/ObsWidgets";
import Gallery from "./pages/Gallery";
import ForSale from "./pages/ForSale";
import ObsGameFrame from "./pages/ObsGameFrame";
import { LanguageProvider } from "./i18n";
import { ThemeProvider, useApplyResolvedTheme, useTheme } from "./theme";

function AppContent() {
  const location = useLocation();
  const isObsRoute = location.pathname.startsWith("/obs");
  const isLoading = useDynamicColor("/images/background.jpg");
  useApplyResolvedTheme(isLoading);

  const { resolvedTheme, prideTheme } = useTheme();
  const prideFlagBackground = useMemo(() => {
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
  }, [resolvedTheme, prideTheme]);

  if (isObsRoute) {
    return (
      <div className="bg-transparent min-h-screen overflow-hidden">
        <Routes>
          <Route path="/obs/nowplaying/:discordId" element={<ObsPanel />} />
          <Route
            path="/obs/camframe/:discordId"
            element={<ObsGameFramePage />}
          />
          <Route path="/obs/gameframe/:discordId" element={<ObsGameFrame />} />
        </Routes>
      </div>
    );
  }

  return (
    <>
      <div
        className={`fixed inset-0 z-[200] flex flex-col items-center justify-center bg-m3-surface transition-opacity duration-700 ${!isLoading ? "animate-m3-fade-out" : "opacity-100"}`}
      >
        <div className="relative flex flex-col items-center gap-8">
          <div className="relative w-32 h-32">
            <div className="absolute inset-0 bg-m3-primary/20 rounded-none animate-m3-pulsate overflow-hidden">
              <img
                src="/images/evernight_chibi.gif"
                alt="Loading Mascot"
                className="w-full h-full object-contain relative z-10 animate-m3-pulsate"
              />
            </div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <h2 className="text-2xl font-black text-m3-primary tracking-tighter uppercase">
              Initialize
            </h2>
            <div className="w-32 h-1 bg-m3-surface-variant rounded-sm overflow-hidden">
              <div className="h-full bg-m3-primary w-1/2 animate-[m3-pulsate_1.5s_infinite_ease-in-out]"></div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="fixed inset-0 -z-20 pointer-events-none"
        style={{
          backgroundImage: prideFlagBackground,
          opacity: resolvedTheme === "pride" ? 0.35 : 0,
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
        }}
      />

      <div
        className={`min-h-screen w-full bg-cover bg-center bg-fixed transition-opacity duration-1000 ${isLoading ? "opacity-0" : "opacity-100"}`}
        style={{
          backgroundImage:
            resolvedTheme === "default"
              ? "url('/images/background.jpg')"
              : undefined,
        }}
      >
        <div className="min-h-screen w-full text-m3-on-surface p-4 md:p-12 pb-24 bg-m3-surface/70 relative overflow-hidden">
          {/* Background Depth Effects (Global) */}
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-m3-primary/10 rounded-none blur-[120px] animate-blob" />
            <div className="absolute top-[20%] right-[-5%] w-[35%] h-[35%] bg-m3-secondary/10 rounded-none blur-[100px] animate-blob animation-delay-2000" />
            <div className="theme-blue-glow absolute bottom-[-10%] left-[20%] w-[30%] h-[30%] rounded-none blur-[80px] animate-blob animation-delay-4000" />
          </div>

          <div className="w-full max-w-7xl mx-auto relative z-10">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/specs" element={<PCSpecs />} />
              <Route path="/clips" element={<Clips />} />
              <Route path="/clips/:id" element={<Clips />} />
              <Route path="/miko/privacy-policy" element={<PrivacyPolicy />} />
              <Route
                path="/miko/terms-of-service"
                element={<TermsOfService />}
              />
              <Route path="/verify" element={<Verify />} />
              <Route path="/project/iota-player" element={<IotaPlayer />} />
              <Route path="/project/iotas-notepad" element={<IotasNotepad />} />
              <Route path="/music" element={<Music />} />
              <Route path="/colors" element={<Colors />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/project/obs" element={<ObsWidgets />} />
              <Route path="/obs/lanyard" element={<ObsPanel />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/for-sale" element={<ForSale />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </div>
          <Navbar />
        </div>
      </div>
    </>
  );
}

function App() {
  useEffect(() => {
    redirect();
  }, []);

  return (
    <LanguageProvider>
      <ThemeProvider>
        <Router>
          <AppContent />
        </Router>
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default App;
