import { useEffect, useRef, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

interface BarcodeScannerProps {
  onScanSuccess: (decodedText: string, decodedResult: any) => void;
  onScanFailure?: (error: any) => void;
}

const BarcodeScanner = ({
  onScanSuccess,
  onScanFailure,
}: BarcodeScannerProps) => {
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Initialize the scanner
    const scannerId = "reader";
    let scanner: Html5QrcodeScanner | null = null;

    // Small delay to ensure DOM is ready and previous cleanup has processed
    const timer = setTimeout(() => {
      // Clear container to prevent duplicates
      const container = document.getElementById(scannerId);
      if (container) {
        container.innerHTML = "";
      }

      try {
        scanner = new Html5QrcodeScanner(
          scannerId,
          {
            fps: 10,
            qrbox: { width: 250, height: 250 },
            aspectRatio: 1.0,
          },
          /* verbose= */ false
        );

        scanner.render(
          (decodedText, decodedResult) => {
            onScanSuccess(decodedText, decodedResult);
          },
          (errorMessage) => {
            if (onScanFailure) {
              onScanFailure(errorMessage);
            }
          }
        );

        scannerRef.current = scanner;
      } catch (err) {
        console.error("Error initializing scanner:", err);
        setError(
          "Failed to initialize camera. Please ensure permissions are granted."
        );
      }
    }, 100);

    // Cleanup function
    return () => {
      clearTimeout(timer);
      if (scanner) {
        scanner.clear().catch((error) => {
          console.error("Failed to clear html5-qrcode scanner. ", error);
        });
      }
    };
  }, [onScanSuccess, onScanFailure]);

  return (
    <div className="w-full">
      {error && (
        <div className="bg-red-500/20 text-red-200 p-4 rounded-lg mb-4 text-center">
          {error}
        </div>
      )}
      <div id="reader" className="w-full overflow-hidden rounded-lg"></div>
    </div>
  );
};

export default BarcodeScanner;
