// src/components/VideoModal.tsx
import React, { useEffect, useCallback } from "react";
import { Clip } from '../data/clipsData'; // Adjust path as needed

interface VideoModalProps {
  clip: Clip | null; // Nullable, as the modal might not be open
  onClose: () => void;
}

const VideoModal: React.FC<VideoModalProps> = ({ clip, onClose }) => {
  // Determine the embed source based on platform/URL type
  // Returns an object { type: 'iframe' | 'video', src: string } or null
  const getEmbedSource = useCallback((videoUrl: string, platform: 'YouTube' | 'Twitch' | 'Other'): { type: 'iframe' | 'video', src: string } | null => {
    if (!videoUrl) return null;

    // List of common video file extensions
    const videoExtensions = ['.mp4', '.webm',];

    try {
      const url = new URL(videoUrl);
      const pathname = url.pathname.toLowerCase();

      // 1. Check for direct video file (e.g., .mp4 from a CDN)
      const isDirectVideoFile = videoExtensions.some(ext => pathname.endsWith(ext));
      if (isDirectVideoFile) {
        return { type: 'video', src: videoUrl };
      }

      // 2. Handle YouTube embeds
      if (platform === 'YouTube' && (url.hostname.includes('youtube.com') || url.hostname.includes('youtu.be'))) {
        let videoId = null;
        if (url.hostname.includes('youtu.be')) {
          // For short URLs like https://youtu.be/VIDEO_ID
          videoId = url.pathname.split('/').pop();
        } else {
          // For standard URLs like https://www.youtube.com/watch?v=VIDEO_ID
          videoId = url.searchParams.get('v');
        }

        if (videoId) {
          return { type: 'iframe', src: `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0` };
        }
      }

      // 3. Handle Twitch embeds (VODs and Clips)
      if (platform === 'Twitch' && (url.hostname.includes('twitch.tv') || url.hostname.includes('clips.twitch.tv'))) {
        // For Twitch VODs: https://www.twitch.tv/videos/123456789
        const videoIdMatch = videoUrl.match(/(?:videos\/)(\d+)/);
        if (videoIdMatch) {
          const videoId = videoIdMatch[1];
          return { type: 'iframe', src: `https://player.twitch.tv/?video=${videoId}&parent=${window.location.hostname}&autoplay=true` };
        }
        // For Twitch Clips: https://clips.twitch.tv/ClipID (alphanumeric string)
        const clipIdMatch = videoUrl.match(/clips\.twitch\.tv\/([a-zA-Z0-9]+)/);
        if (clipIdMatch) {
          const clipId = clipIdMatch[1];
          return { type: 'iframe', src: `https://clips.twitch.tv/embed?clip=${clipId}&parent=${window.location.hostname}&autoplay=true`};
        }
      }

    } catch (e) {
      console.error("Error parsing video URL or platform:", e);
    }
    return null; // Fallback if no specific embed type is found
  }, []);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  if (!clip) {
    return null;
  }

  // Get the source and type for embedding
  const embedSource = getEmbedSource(clip.videoUrl, clip.platform);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center  bg-opacity-75 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="bg-gray-900 rounded-lg shadow-2xl p-6 w-full max-w-4xl max-h-[90vh] flex flex-col relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white text-3xl font-bold leading-none z-10"
          aria-label="Close modal"
        >
          ×
        </button>

        <h2 className="text-3xl font-bold text-white mb-4 pr-10">{clip.title}</h2>

        {embedSource ? (
          <div className="relative pt-[56.25%] mb-4 bg-gray-800 rounded-md overflow-hidden">
            {/* Conditional rendering based on embedSource.type */}
            {embedSource.type === 'iframe' ? (
              <iframe
                src={embedSource.src}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                title={clip.title}
                className="absolute top-0 left-0 w-full h-full border-0"
              ></iframe>
            ) : ( // Assumes embedSource.type === 'video'
              <video
                controls
                autoPlay // Automatically start playing when opened
                src={embedSource.src}
                title={clip.title}
                className="absolute top-0 left-0 w-full h-full object-contain"
              >
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        ) : (
          <div className="mb-4 text-center text-gray-400">
            <p>Cannot embed this video directly. You can open it in a new tab:</p>
            <a
              href={clip.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-500 hover:underline mt-2 inline-block"
            >
              Open Video in New Tab
            </a>
          </div>
        )}

        <p className="text-gray-300 text-base mb-4 flex-grow overflow-y-auto pr-2 custom-scrollbar">
          {clip.description}
        </p>

        <div className="flex justify-between items-center text-sm text-gray-400 border-t border-gray-700 pt-4 mt-auto">
          <span>{clip.platform} - {clip.date}</span>
        </div>
        {clip.tags && clip.tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {clip.tags.map(tag => (
              <span key={tag} className="bg-gray-700 text-gray-300 text-xs px-2 py-0.5 rounded-full">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoModal;
