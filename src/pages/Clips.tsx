// src/pages/Clips.tsx
import React, { useState, useEffect, useMemo } from "react";
import ClipList from '../components/ClipList';
import SearchInput from '../components/SearchInput';
import VideoModal from '../components/VideoModal';
import { Clip } from '../data/clipsData';


// Helper function to filter clips
const filterClips = (clips: Clip[], searchText: string): Clip[] => {
  if (!searchText) {
    return clips;
  }
  const lowerCaseSearchText = searchText.toLowerCase();
  return clips.filter(clip =>
    clip.title.toLowerCase().includes(lowerCaseSearchText) ||
    clip.description.toLowerCase().includes(lowerCaseSearchText) ||
    clip.platform.toLowerCase().includes(lowerCaseSearchText) ||
    (clip.tags && clip.tags.some(tag => tag.toLowerCase().includes(lowerCaseSearchText))) ||
    clip.game.toLowerCase().includes(lowerCaseSearchText)
  );
};

const Clips: React.FC = () => {
  const [allClips, setAllClips] = useState<Clip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchText, setSearchText] = useState('');
  const [selectedClip, setSelectedClip] = useState<Clip | null>(null); // State to hold the clip for the modal

  useEffect(() => {
    const fetchClips = async () => {
      try {
        const response = await fetch('https://api.vorlie.pl/clips.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Clip[] = await response.json();
        setAllClips(data);
      } catch (e: unknown) {
        setError((e as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchClips();
  }, []);

  // Handle URL parameters for deep linking
  useEffect(() => {
    if (allClips.length > 0) {
      const params = new URLSearchParams(window.location.search);
      const clipId = params.get('id');

      if (clipId) {
        const foundClip = allClips.find(clip => clip.id === clipId);
        if (foundClip) {
          setSelectedClip(foundClip);
          window.history.replaceState(null, '', window.location.pathname);
        }
      }
    }
  }, [allClips]);

  const filteredClips = useMemo(() => {
    return filterClips(allClips, searchText);
  }, [allClips, searchText]);

  // Handler to open the modal
  const handleClipClick = (clip: Clip) => {
    setSelectedClip(clip);
    window.history.pushState(null, '', `?id=${clip.id}`);
  };

  // Handler to close the modal
  const handleCloseModal = () => {
    setSelectedClip(null);
    window.history.replaceState(null, '', window.location.pathname);
  };

  if (loading) {
    return (
      <div className="container mx-auto p-4 pt-4 text-white text-center">
        <p className="text-xl">Loading clips...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4 pt-4 text-red-500 text-center">
        <p className="text-xl">Error loading clips: {error}</p>
        <p className="text-lg text-gray-400">Please try again later or check the console for more details.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 pt-4 text-white">
      <h1 className="text-4xl font-extrabold mb-4 text-center md:text-left">
        Clips and Highlights
      </h1>
      <p className="text-lg text-gray-300 mb-8 text-center md:text-left max-w-3xl mx-auto md:mx-0">
        This page showcases some of my favorite clips and highlights from various
        streams and gaming sessions. Use the search bar to find specific moments!
      </p>

      <SearchInput
        value={searchText}
        onChange={setSearchText}
        placeholder="Search by title, description, platform, or tags..."
      />

      <ClipList
        clips={filteredClips}
        emptyHeading={searchText ? `No matches found for "${searchText}"` : "No clips available yet."}
        onClipClick={handleClipClick} // Pass the click handler to ClipList
      />

      {/* Render the modal if a clip is selected */}
      <VideoModal clip={selectedClip} onClose={handleCloseModal} />
    </div>
  );
};

export default Clips;
