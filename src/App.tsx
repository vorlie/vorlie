import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import redirect from "./utils/redirect";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import Verify from "./pages/Verify";
import Navbar from "./components/Navbar";
import Chleb from "./pages/Chleb";
import IotaPlayer from "./pages/IotaPlayer";
import PCSpecs from "./pages/PCSpecs";
import Clips from "./pages/Clips";
import Scanner from "./pages/Scanner";
import Rats from "./pages/Rats";


import useDynamicColor from "./hooks/useDynamicColor";

function App() {
  useEffect(() => {
    redirect();
  }, []);

  const isLoading = useDynamicColor("/images/background.png");

  return (
    <Router>
      {/* 
        Loading Screen Overlay 
        We use a solid background fallback and fixed positioning to ensure it's visible immediately.
      */}
      <div 
        className={`fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#1C1B1F] bg-m3-surface transition-opacity duration-700 ${!isLoading ? 'animate-m3-fade-out' : 'opacity-100'}`}
      >
        <div className="relative flex flex-col items-center gap-8">
          <div className="relative w-32 h-32">
             <div className="absolute inset-0 bg-m3-primary/20 rounded-full animate-m3-pulsate"></div>
             <img src="/images/evernight_chibi.gif" alt="Loading Mascot" className="w-full h-full object-contain relative z-10 animate-m3-pulsate" />
          </div>
          <div className="flex flex-col items-center gap-2">
            <h2 className="text-2xl font-black text-m3-primary tracking-tighter uppercase">Initialize</h2>
            <div className="w-32 h-1 bg-m3-surface-variant rounded-full overflow-hidden">
                <div className="h-full bg-m3-primary w-1/2 animate-[m3-pulsate_1.5s_infinite_ease-in-out]"></div>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`min-h-screen w-full bg-cover bg-center bg-fixed transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
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
              <Route path="/przepis-na-chleb" element={<Chleb />} />
              <Route path="/scanner" element={<Scanner />} />
              <Route path="/rat" element={<Rats />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </div>
          <Navbar />
        </div>
      </div>
    </Router>
  );
}

export default App;
