import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
    scale: 0.9,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
    scale: 0.9,
  }),
};

interface GalleryImage {
  id: number;
  url: string;
  title: string;
  uploadedAt: string;
}

const WORKER_URL = "https://gallery-api.vorlie.pl/";

export default function Gallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  useEffect(() => {
    fetch(WORKER_URL)
      .then((res) => {
        if (!res.ok) throw new Error("Worker not giving valid response yet");
        return res.json();
      })
      .then((data) => {
        const validImages = data.filter((img: GalleryImage) => {
          try {
            const url = new URL(img.url, window.location.origin);

            // 1. Must be in /images/ path
            const isInImagesPath = url.pathname.startsWith("/images/");

            // 2. Must be an actual image file
            const isImage = /\.(png|jpe?g|webp|gif|avif)$/i.test(url.pathname);

            return isInImagesPath && isImage;
          } catch {
            return false;
          }
        });
        setImages(validImages);
        setIsLoading(false);
      })
      .catch((error: unknown) => {
        console.error("Failed to load gallery:", error);
        setImages([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const paginate = useCallback(
    (newDirection: number) => {
      setDirection(newDirection);
      setSelectedIndex((prev) => {
        if (prev === null) return 0;
        return (prev + newDirection + images.length) % images.length;
      });
    },
    [images.length],
  );

  // Keyboard navigation
  useEffect(() => {
    if (selectedIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedIndex(null);
      if (e.key === "ArrowRight") paginate(1);
      if (e.key === "ArrowLeft") paginate(-1);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, paginate]);

  const modalContent = (
    <AnimatePresence>
      {selectedIndex !== null && images.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="gallery-lightbox"
          onClick={() => setSelectedIndex(null)}
        >
          <button
            type="button"
            className="gallery-lightbox__button gallery-lightbox__button--close"
            onClick={(event) => {
              event.stopPropagation();
              setSelectedIndex(null);
            }}
            aria-label="Close gallery"
          >
            <span className="material-symbols-rounded">close</span>
          </button>

          <button
            type="button"
            className="gallery-lightbox__button gallery-lightbox__button--previous"
            onClick={(event) => {
              event.stopPropagation();
              paginate(-1);
            }}
            aria-label="Previous image"
          >
            <span className="material-symbols-rounded">chevron_left</span>
          </button>

          <button
            type="button"
            className="gallery-lightbox__button gallery-lightbox__button--next"
            onClick={(event) => {
              event.stopPropagation();
              paginate(1);
            }}
            aria-label="Next image"
          >
            <span className="material-symbols-rounded">chevron_right</span>
          </button>

          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={selectedIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: {
                  type: "tween",
                  duration: 0.2,
                  ease: "easeOut",
                },
                opacity: {
                  duration: 0.15,
                },
              }}
              className="gallery-lightbox__content"
              onClick={(event) => event.stopPropagation()}
            >
              <img
                src={images[selectedIndex].url}
                alt={images[selectedIndex].title}
                className="gallery-lightbox__image"
              />

              <div className="gallery-lightbox__caption">
                <h2>{images[selectedIndex].title}</h2>

                <p>
                  {new Date(
                    images[selectedIndex].uploadedAt,
                  ).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="gallery-page">
      <div className="gallery-page__header">
        <p className="gallery-page__eyebrow">Arasaka Dataterm</p>

        <h1 className="gallery-page__title">Gallery</h1>

        <div className="gallery-page__accent" />

        <p className="gallery-page__description">
          Property of Arasaka Corporation
        </p>
      </div>

      {isLoading ? (
        <div className="gallery-page__loading">
          <div className="gallery-page__spinner" />
        </div>
      ) : images.length === 0 ? (
        <div className="gallery-page__empty">
          <span className="material-symbols-rounded">photo_library</span>

          <h2>No images found</h2>
          <p>The gallery is currently empty.</p>
        </div>
      ) : (
        <div className="gallery-grid">
          {images.map((image, index) => (
            <motion.button
              key={image.id}
              type="button"
              className="gallery-card"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.35,
                delay: index * 0.05,
              }}
              onClick={() => setSelectedIndex(index)}
            >
              <img
                src={image.url}
                alt={image.title}
                className="gallery-card__image"
                loading="lazy"
              />

              <div className="gallery-card__overlay">
                <div>
                  <h3>{image.title}</h3>

                  <time>
                    {new Date(image.uploadedAt).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                </div>

                <span className="material-symbols-rounded">zoom_in</span>
              </div>
            </motion.button>
          ))}
        </div>
      )}

      {typeof document !== "undefined" &&
        createPortal(modalContent, document.body)}
    </div>
  );
}
