import React from "react";
import SEO from "../components/SEO";

const Rats: React.FC = () => {
  const ratImages = [
    "/images/rats/rat1.jpg",
    "/images/rats/rat2.jpg",
    "/images/rats/rat3.jpg",
  ];

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 animate-in fade-in duration-700">
      <SEO
        title="Rats"
        description="A cute collection of rat images."
        url="https://vorlie.pl/rats"
      />
      <div className="max-w-6xl w-full bg-m3-surface-container rounded-[48px] p-8 sm:p-12 border border-m3-outline/10 shadow-sm relative z-10 flex flex-col items-center">
        <h1 className="text-4xl font-black mb-12 text-m3-primary tracking-tighter uppercase italic">RATS</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
        {ratImages.map((src, index) => (
          <div
            key={index}
            className="group relative bg-m3-surface-container rounded-[32px] overflow-hidden shadow-lg border border-m3-outline/10 transition-all duration-500 hover:shadow-2xl hover:scale-[1.02]"
          >
            <div className="aspect-[4/3] w-full overflow-hidden">
              <img
                src={src}
                alt={`Rat ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
                onError={(e) => {
                   (e.target as HTMLImageElement).src = 'https://placehold.co/600x400/1c1b1f/6750a4?text=Missing+Rat';
                }}
              />
            </div>
            {/* Tonal overlay on hover */}
            <div className="absolute inset-0 bg-m3-primary/0 group-hover:bg-m3-primary/5 transition-colors duration-500 pointer-events-none"></div>
          </div>
        ))}
        </div>
      </div>
    </div>
  );
};

export default Rats;
