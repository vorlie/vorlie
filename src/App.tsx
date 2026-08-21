import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import BlogPage from "./pages/Blog";
import AboutPage from "./pages/AboutPage";
import DevPage from "./pages/DevPage";
import GamingPage from "./pages/GamingPage";
import CreativePage from "./pages/CreativePage";
import redirect from "./utils/redirect";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import Verify from "./pages/Verify";
import IotaPlayer from "./pages/IotaPlayer";
import BlogPost from "./pages/BlogPost";
import IotasNotepad from "./pages/IotasNotepad";

import useDynamicColor from "./hooks/useDynamicColor";
import ObsPanel from "./pages/ObsPanel";
import ObsGameFramePage from "./pages/ObsCamFrame";
import ObsGameFrame from "./pages/ObsGameFrame";
import { ThemeProvider, useApplyResolvedTheme } from "./theme";
import Sidebar from "./components/layout/Sidebar";
import TabBar from "./components/layout/TabBar";
import MainContent from "./components/layout/MainContent";

// Dev sub-section components
import ProjectsContent from "./components/dev/ProjectsContent";
import APIDocsContent from "./components/dev/APIDocsContent";
import GitHubContent from "./components/dev/GitHubContent";
import TutorialsContent from "./components/dev/TutorialsContent";
import DevDefaultContent from "./components/dev/DevDefaultContent";

// Gaming sub-section components
import ClipsContent from "./pages/Clips";
import SpecsContent from "./pages/PCSpecs";
import AccountsContent from "./components/gaming/AccountsContent";
import GamingProjectsContent from "./components/gaming/GamingProjectsContent";
import GamingDefaultContent from "./components/gaming/GamingDefaultContent";

// Creative sub-section components
import MusicContent from "./components/creative/MusicContent";
import GalleryContent from "./components/creative/GalleryContent";
import ColorsContent from "./components/creative/ColorsContent";
import CreativeToolsContent from "./components/creative/CreativeToolsContent";
import CreativeDefaultContent from "./components/creative/CreativeDefaultContent";

function AppContent() {
  const location = useLocation();
  const isObsRoute = location.pathname.startsWith("/obs");
  const isSpecialRoute = ["/project/iota-player", "/project/iotas-notepad", "/blog/:slug", "/miko/privacy-policy", "/miko/terms-of-service", "/verify"].some(path => 
    location.pathname.match(path.replace(/:[^/]+/g, "[^/]+"))
  );
  
  const isLoading = useDynamicColor("/images/background.jpg");
  useApplyResolvedTheme(isLoading);

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

  if (isSpecialRoute) {
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

          <div className="min-h-screen w-full text-m3-on-surface p-4 md:p-12 pb-24 bg-m3-surface/70 relative overflow-hidden">
            <div className="w-full max-w-7xl mx-auto relative z-10">
              <Routes>
                <Route path="/project/iota-player" element={<IotaPlayer />} />
                <Route path="/project/iotas-notepad" element={<IotasNotepad />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                <Route path="/miko/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/miko/terms-of-service" element={<TermsOfService />} />
                <Route path="/verify" element={<Verify />} />
              </Routes>
            </div>
          </div>
      </>
    );
  }

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[300] focus:px-4 focus:py-2 focus:bg-m3-primary focus:text-m3-on-primary focus:rounded-lg focus:font-bold"
      >
        Skip to main content
      </a>

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

      <Sidebar />
      <TabBar />
      
      <MainContent>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/blog" element={<BlogPage />} />
          
          {/* Dev routes */}
          <Route path="/dev" element={<DevPage />}>
            <Route index element={<DevDefaultContent />} />
            <Route path="projects" element={<ProjectsContent />} />
            <Route path="api" element={<APIDocsContent />} />
            <Route path="github" element={<GitHubContent />} />
            <Route path="tutorials" element={<TutorialsContent />} />
          </Route>
          
          {/* Gaming routes */}
          <Route path="/gaming" element={<GamingPage />}>
            <Route index element={<GamingDefaultContent />} />
            <Route path="clips" element={<ClipsContent />} />
            <Route path="specs" element={<SpecsContent />} />
            <Route path="accounts" element={<AccountsContent />} />
            <Route path="projects" element={<GamingProjectsContent />} />
          </Route>
          
          {/* Creative routes */}
          <Route path="/creative" element={<CreativePage />}>
            <Route index element={<CreativeDefaultContent />} />
            <Route path="music" element={<MusicContent />} />
            <Route path="gallery" element={<GalleryContent />} />
            <Route path="colors" element={<ColorsContent />} />
            <Route path="tools" element={<CreativeToolsContent />} />
          </Route>
          
          <Route path="*" element={<HomePage />} />
        </Routes>
      </MainContent>
    </>
  );
}

function App() {
  useEffect(() => {
    redirect();
  }, []);

  return (
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}

export default App;
