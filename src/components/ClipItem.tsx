// src/components/ClipItem.tsx
import React from "react";
import { Clip } from '../data/clipsData';

interface ClipItemProps {
  clip: Clip;
  onClipClick: (clip: Clip) => void;
}

const ClipItem: React.FC<ClipItemProps> = ({ clip, onClipClick }) => {
  return (
    <div
      className="bg-gray-800/50 rounded-lg shadow-lg overflow-hidden flex flex-col transform transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl cursor-pointer"
      onClick={() => onClipClick(clip)}
    >
      <div className="block relative aspect-video overflow-hidden">
        <img
          src={clip.thumbnailUrl}
          alt={clip.title}
          className="w-full h-full object-cover"
        />
        {/* Play icon overlay remains */}
        <div className="absolute inset-0 flex items-center justify-center backdrop-blur-sm bg-opacity-40 opacity-0 hover:opacity-100 transition-opacity duration-300">
          <svg className="h-16 w-16 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
      <div className="p-4 flex-grow flex flex-col">
        <h3 className="text-xl font-semibold text-white mb-2 leading-tight">
          {clip.title}
        </h3>
        <p className="text-gray-300 text-sm mb-3 flex-grow line-clamp-3">
          {clip.description}
        </p>
        <div className="flex justify-between items-center text-sm text-gray-400 mt-auto">
          <span>{clip.platform} - {clip.date}</span>
        </div>
        {clip.tags && clip.tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {clip.tags.map((tag: string) => (
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

export default ClipItem;
