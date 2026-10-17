import { MotionImage } from "../../../types/motion";

interface BehindTheScenesProps {
  images?: MotionImage[];
}

export default function BehindTheScenes({ images }: BehindTheScenesProps) {
  if (!images?.length) {
    return null;
  }

  return (
    <section className="motion-section">
      <h2 className="motion-section__title">Behind the scenes</h2>

      <div className="motion-bts">
        {images.map((image) => (
          <figure key={image.src} className="motion-bts__item">
            <img src={image.src} alt={image.alt} loading="lazy" decoding="async" />

            {image.caption && <figcaption>{image.caption}</figcaption>}
          </figure>
        ))}
      </div>
    </section>
  );
}
