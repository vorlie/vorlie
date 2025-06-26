import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import redirect from "./utils/redirect";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import Verify from "./pages/Verify";
import Navbar from "./components/Navbar";

function App() {
  useEffect(() => {
    redirect();
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-cover bg-center bg-fixed" style={{ backgroundImage: "url('/images/bg.png')" }}>
        <div className="min-h-screen bg-gray-900/50 text-gray-100 p-6 md:p-12">
          <div className="max-w-6xl mx-auto relative z-10">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/miko/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/miko/terms-of-service" element={<TermsOfService />} />
              <Route path="/verify" element={<Verify />} /> {/* Add the new route */}
              <Route path="*" element={<Home />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;