// src/pages/Clips.tsx
import React, { useState, useEffect, useMemo } from "react";
import ClipList from "../components/ClipList";
import SearchInput from "../components/SearchInput";
import { Clip } from "../data/clipsData";

// Helper function for filtering
const filterClips = (clips: Clip[], searchText: string): Clip[] => {
  if (!searchText) {
    return clips;
  }
  const lowerCaseSearchText = searchText.toLowerCase();
  return clips.filter(
    (clip) =>
      clip.title.toLowerCase().includes(lowerCaseSearchText) ||
      clip.description.toLowerCase().includes(lowerCaseSearchText) ||
      clip.platform.toLowerCase().includes(lowerCaseSearchText) ||
      (clip.tags &&
        clip.tags.some((tag: string) =>
          tag.toLowerCase().includes(lowerCaseSearchText)
        ))
  );
};

const Clips: React.FC = () => {
  const [allClips, setAllClips] = useState<Clip[]>([]); // State to hold fetched clips
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [error, setError] = useState<string | null>(null); // State for errors
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const fetchClips = async () => {
      try {
        const response = await fetch("https://api.vorlie.pl/clips.json");
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

  const filteredClips = useMemo(() => {
    return filterClips(allClips, searchText);
  }, [allClips, searchText]);

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
        <p className="text-lg text-gray-400">
          Please try again later or check the console for more details.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 pt-4 text-white">
      <h1 className="text-4xl font-extrabold mb-4 text-center md:text-left">
        Clips and Highlights
      </h1>
      <p className="text-lg text-gray-300 mb-8 text-center md:text-left max-w-3xl mx-auto md:mx-0">
        This page showcases some of my favorite clips and highlights from
        various streams and gaming sessions. Use the search bar to find specific
        moments!
      </p>

      <SearchInput
        value={searchText}
        onChange={setSearchText}
        placeholder="Search by title, description, platform, or tags..."
      />

      <ClipList
        clips={filteredClips}
        emptyHeading={
          searchText
            ? `No matches found for "${searchText}"`
            : "No clips available yet."
        }
      />
    </div>
  );
};

export default Clips;
