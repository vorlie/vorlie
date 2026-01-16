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
      className="bg-m3-surface-container border border-m3-outline/10 rounded-[24px] shadow-sm overflow-hidden flex flex-col transform transition-all duration-300 hover:scale-[1.01] hover:border-m3-outline/30 cursor-pointer"
      onClick={() => onClipClick(clip)}
    >
      <div className="block relative aspect-video overflow-hidden">
        <img
          src={clip.thumbnailUrl}
          alt={clip.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity duration-300">
          <div className="bg-m3-primary/90 p-4 rounded-full shadow-lg">
            <svg className="h-8 w-8 text-m3-on-primary" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </div>
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-xl font-bold text-m3-on-surface mb-2 leading-tight tracking-tight">
          {clip.title}
        </h3>
        <p className="text-m3-on-surface-variant text-sm mb-4 flex-grow line-clamp-3 font-medium">
          {clip.description}
        </p>
        <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider text-m3-primary mt-auto">
          <span>{clip.platform} &bull; {clip.date}</span>
          <span>{clip.game}</span>
        </div>
        {clip.tags && clip.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {clip.tags.map((tag: string) => (
              <span key={tag} className="bg-m3-primary/10 text-m3-primary text-xs font-bold px-3 py-1 rounded-full border border-m3-primary/20">
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
