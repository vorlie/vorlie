import { useState } from "react";
import BarcodeScanner from "../components/BarcodeScanner";
import { FaBarcode, FaCopy, FaSearch, FaRedo } from "react-icons/fa";

const Scanner = () => {
  const [scannedResult, setScannedResult] = useState<string | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);

  const handleScanSuccess = (decodedText: string) => {
    setScannedResult(decodedText);
    setCopySuccess(false);
  };

  const copyToClipboard = async () => {
    if (scannedResult) {
      try {
        await navigator.clipboard.writeText(scannedResult);
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      } catch (err) {
        console.error("Failed to copy text: ", err);
      }
    }
  };

  const openBarcodeLookup = () => {
    if (scannedResult) {
      window.open(
        `https://www.barcodelookup.com/${scannedResult}`,
        "_blank",
        "noopener,noreferrer"
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
      <div className="text-center space-y-4 mb-8">
        <h1 className="text-5xl font-bold text-white font-modern tracking-wider">
          <span className="effect-neon">
            <span className="glow-layer">BARCODE</span>
            <span className="text-layer">BARCODE</span>
          </span>{" "}
          SCANNER
        </h1>
        <p className="text-gray-400 text-lg max-w-md mx-auto">
          Scan any barcode or QR code to instantly get its content.
        </p>
      </div>

      <div className="w-full max-w-xl bg-gray-900/60 backdrop-blur-md rounded-2xl border border-gray-700/50 shadow-2xl overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 pointer-events-none" />
        
        <div className="p-6 relative z-10">
          {!scannedResult ? (
            <div className="space-y-4">
              <div className="bg-black/40 rounded-xl overflow-hidden border border-gray-800 shadow-inner min-h-[300px] flex items-center justify-center">
                 <BarcodeScanner onScanSuccess={handleScanSuccess} />
              </div>
              <p className="text-center text-sm text-gray-500">
                Point your camera at a code to scan automatically
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-8 py-4">
              <div className="w-20 h-20 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center text-4xl shadow-[0_0_20px_rgba(74,222,128,0.3)] animate-bounce-short">
                <FaBarcode />
              </div>
              
              <div className="w-full space-y-2">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">
                  Scanned Content
                </label>
                <div className="w-full bg-black/50 p-4 rounded-xl border border-gray-700 font-mono text-lg text-white break-all shadow-inner flex items-center justify-between gap-4">
                  <span>{scannedResult}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                <button
                  onClick={copyToClipboard}
                  className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                    copySuccess
                      ? "bg-green-600 text-white shadow-[0_0_15px_rgba(22,163,74,0.4)]"
                      : "bg-gray-700 hover:bg-gray-600 text-gray-200 hover:text-white"
                  }`}
                >
                  <FaCopy /> {copySuccess ? "Copied!" : "Copy Text"}
                </button>
                
                <button
                  onClick={openBarcodeLookup}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold transition-all duration-200 shadow-[0_0_15px_rgba(37,99,235,0.3)] hover:shadow-[0_0_20px_rgba(37,99,235,0.5)]"
                >
                  <FaSearch /> Lookup Code
                </button>
              </div>

              <button
                onClick={() => setScannedResult(null)}
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm mt-4"
              >
                <FaRedo /> Scan Another Code
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Scanner;
