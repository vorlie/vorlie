import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
    scale: 0.9
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
    scale: 0.9
  })
};

interface GalleryImage {
  id: number;
  url: string;
  title: string;
  uploadedAt: string;
}

export default function Gallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  useEffect(() => {
    const WORKER_URL = 'https://gallery-api.vorlie.pl/';

    fetch(WORKER_URL)
      .then(res => {
        if (!res.ok) throw new Error("Worker not giving valid response yet");
        return res.json();
      })
      .then(data => {
        const validImages = data.filter((img: GalleryImage) => !img.url.endsWith('/'));
        setImages(validImages);
        setIsLoading(false);
      })
      .catch(err => {
        console.log("Worker not connected yet! Loading local fallbacks:", err.message);
        setImages([
          { id: 1, url: '/images/gallery/photomode_18032026_234946.png', title: 'Cyber Goth', uploadedAt: new Date().toISOString() },
          { id: 2, url: '/images/gallery/photomode_19032026_022536.png', title: 'Neon Rebellion', uploadedAt: new Date().toISOString() },
          { id: 3, url: '/images/gallery/photomode_19032026_023056.png', title: 'Midnight Neko', uploadedAt: new Date().toISOString() },
        ]);
        setIsLoading(false);
      });
  }, []);

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setSelectedIndex((prev) => {
      if (prev === null) return 0;
      return (prev + newDirection + images.length) % images.length;
    });
  };

  // Keyboard navigation
  useEffect(() => {
    if (selectedIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedIndex(null);
      if (e.key === 'ArrowRight') paginate(1);
      if (e.key === 'ArrowLeft') paginate(-1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, images.length]);

  const modalContent = (
    <AnimatePresence>
      {selectedIndex !== null && images.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 sm:p-8 overflow-hidden"
          onClick={() => setSelectedIndex(null)}
        >
          {/* Close button */}
          <button
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-[1001] flex items-center justify-center"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIndex(null);
            }}
          >
            <span className="material-symbols-rounded text-[32px]">close</span>
          </button>

          {/* Previous Button */}
          <button
            className="absolute left-2 sm:left-8 top-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-[1001] flex items-center justify-center"
            onClick={(e) => {
              e.stopPropagation();
              paginate(-1);
            }}
          >
            <span className="material-symbols-rounded text-[32px] md:text-[40px]">chevron_left</span>
          </button>

          {/* Next Button */}
          <button
            className="absolute right-2 sm:right-8 top-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-[1001] flex items-center justify-center"
            onClick={(e) => {
              e.stopPropagation();
              paginate(1);
            }}
          >
            <span className="material-symbols-rounded text-[32px] md:text-[40px]">chevron_right</span>
          </button>

          {/* Modal Image Slider */}
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={selectedIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "tween", duration: 0.2, ease: "easeOut" },
                opacity: { duration: 0.15 }
            }}
              className="relative w-fit h-fit max-w-[95vw] mx-auto rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={images[selectedIndex].url}
                alt={images[selectedIndex].title}
                className="max-h-[85vh] w-auto h-auto object-contain block mx-auto rounded-2xl"
              />
              <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                <h2 className="text-white text-2xl font-sakura leading-tight">{images[selectedIndex].title}</h2>
                <p className="text-white/60 text-sm font-light mt-1">
                  {new Date(images[selectedIndex].uploadedAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="w-full animate-vertical-slide-in mb-25">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-m3-on-surface mb-2 font-sakura">Gallery</h1>
        <p className="text-m3-on-surface-variant">Property of Arasaka Corporation</p>
      </div>

      {isLoading && (
        <div className="flex justify-center my-10 animate-pulse text-m3-on-surface-variant">
          <span className="material-symbols-rounded animate-spin mr-2">refresh</span>
          Fetching from Arasaka Dataterm...
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((img, index) => (
          <motion.div
            key={img.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="group relative aspect-square overflow-hidden rounded-2xl bg-m3-surface-variant cursor-pointer shadow-md hover:shadow-xl transition-all"
            onClick={() => setSelectedIndex(index)}
          >
            {/* Image */}
            <img
              src={img.url}
              alt={img.title}
              className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
              loading="lazy"
            />

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 backdrop-blur-[2px]">
              <div className="flex justify-between items-end">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-white font-medium text-lg leading-tight">
                    {img.title}
                  </h3>
                  <p className="text-white/60 text-xs font-light mt-1">
                    {new Date(img.uploadedAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </div>
                <span className="material-symbols-rounded text-white/80 text-2xl transform scale-75 group-hover:scale-100 transition-transform duration-300">zoom_in</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Render Lightbox via Portal so it breaks out of App.tsx z-index limits */}
      {typeof document !== 'undefined' && createPortal(modalContent, document.body)}
    </div>
  );
}
