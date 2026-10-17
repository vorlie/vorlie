import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";

import { MotionProject } from "../../../types/motion";
import { aspectStyle } from "./motionUtils";

interface VideoPlayerProps {
  project: MotionProject;
}

export default function VideoPlayer({ project }: VideoPlayerProps) {
  const { video, poster, title } = project;

  const [activated, setActivated] = useState(false);
  const frameRef = useRef<HTMLIFrameElement>(null);

  // The facade button unmounts on activation, so hand focus to the player.
  useEffect(() => {
    if (activated) {
      frameRef.current?.focus();
    }
  }, [activated]);

  return (
    <section aria-label="Visualizer video">
      <div className="motion-player" style={aspectStyle(project)}>
        {!video && (
          <>
            {poster && (
              <img
                className="motion-player__poster"
                src={poster}
                alt=""
                decoding="async"
              />
            )}

            <div className="motion-player__empty">
              <Play size={22} aria-hidden="true" />
              <span>Video coming soon</span>
            </div>
          </>
        )}

        {video?.type === "file" && (
          <video
            className="motion-player__video"
            controls
            preload="metadata"
            playsInline
            poster={poster}
            aria-label={`${title} visualizer`}
          >
            {video.sources.map((source) => (
              <source key={source.src} src={source.src} type={source.type} />
            ))}
            Your browser can't play this video.
          </video>
        )}

        {video?.type === "youtube" &&
          (activated ? (
            <iframe
              ref={frameRef}
              className="motion-player__frame"
              src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`}
              title={`${title} visualizer`}
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          ) : (
            <button
              type="button"
              className="motion-player__facade"
              onClick={() => setActivated(true)}
              aria-label={`Play ${title} visualizer`}
            >
              {poster && (
                <img
                  className="motion-player__poster"
                  src={poster}
                  alt=""
                  decoding="async"
                />
              )}

              <span className="motion-player__play" aria-hidden="true">
                <Play size={26} fill="currentColor" />
              </span>
            </button>
          ))}
      </div>
    </section>
  );
}
