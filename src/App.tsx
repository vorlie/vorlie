import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import redirect from "./utils/redirect";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import Verify from "./pages/Verify";
import Navbar from "./components/Navbar";
import IotaPlayer from "./pages/IotaPlayer";
import PCSpecs from "./pages/PCSpecs";
import Clips from "./pages/Clips";
import Rats from "./pages/Rats";
import Music from "./pages/Music";
import Colors from "./pages/Colors";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";

import useDynamicColor from "./hooks/useDynamicColor";
import ObsPanel from "./pages/ObsPanel";

function AppContent() {
  const location = useLocation();
  const isObsRoute = location.pathname.startsWith("/obs");
  const isLoading = useDynamicColor("/images/background.png");

  if (isObsRoute) {
    return (
      <div className="bg-transparent min-h-screen overflow-hidden">
        <Routes>
          <Route path="/obs/lanyard" element={<ObsPanel />} />
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
            <div className="absolute inset-0 bg-m3-primary/20 rounded-full animate-m3-pulsate overflow-hidden">
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
            <div className="w-32 h-1 bg-m3-surface-variant rounded-full overflow-hidden">
              <div className="h-full bg-m3-primary w-1/2 animate-[m3-pulsate_1.5s_infinite_ease-in-out]"></div>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`min-h-screen w-full bg-cover bg-center bg-fixed transition-opacity duration-1000 ${isLoading ? "opacity-0" : "opacity-100"}`}
        style={{ backgroundImage: "url('/images/background.png')" }}
      >
        <div className="min-h-screen w-full text-m3-on-surface p-4 md:p-12 pb-24 bg-m3-surface/30">
          <div className="w-full max-w-6xl mx-auto relative z-10">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/specs" element={<PCSpecs />} />
              <Route path="/clips" element={<Clips />} />
              <Route path="/miko/privacy-policy" element={<PrivacyPolicy />} />
              <Route
                path="/miko/terms-of-service"
                element={<TermsOfService />}
              />
              <Route path="/verify" element={<Verify />} />
              <Route path="/project/iota-player" element={<IotaPlayer />} />
              <Route path="/rat" element={<Rats />} />
              <Route path="/music" element={<Music />} />
              <Route path="/colors" element={<Colors />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/obs/lanyard" element={<ObsPanel />} />
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
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
