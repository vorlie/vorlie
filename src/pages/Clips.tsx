// src/pages/Clips.tsx
import React, { useState, useEffect, useMemo } from "react";
import ClipList from "../components/ClipList";
import SearchInput from "../components/SearchInput";
import VideoModal from "../components/VideoModal";
import { Clip } from "../data/clipsData";

// Helper function to filter clips
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
        clip.tags.some((tag) =>
          tag.toLowerCase().includes(lowerCaseSearchText)
        )) ||
      clip.game.toLowerCase().includes(lowerCaseSearchText)
  );
};

const Clips: React.FC = () => {
  const [allClips, setAllClips] = useState<Clip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [selectedClip, setSelectedClip] = useState<Clip | null>(null); // State to hold the clip for the modal
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

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

  // Handle URL parameters for deep linking
  useEffect(() => {
    if (allClips.length > 0) {
      const params = new URLSearchParams(window.location.search);
      const clipId = params.get("id");

      if (clipId) {
        const foundClip = allClips.find((clip) => clip.id === clipId);
        if (foundClip) {
          setSelectedClip(foundClip);
          window.history.replaceState(null, "", window.location.pathname);
        }
      }
    }
  }, [allClips]);

  const sortedClips = useMemo(() => {
    function parseDMY(dateStr: string) {
      const parts = dateStr.includes("-")
        ? dateStr.split("-")
        : dateStr.split("/");
      const day = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const year = parseInt(parts[2], 10);
      return new Date(year, month, day).getTime();
    }

    return [...allClips].sort((a, b) => {
      const dateA = parseDMY(a.date);
      const dateB = parseDMY(b.date);
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });
  }, [allClips, sortOrder]);

  const filteredClips = useMemo(() => {
    return filterClips(sortedClips, searchText);
  }, [sortedClips, searchText]);

  // Handler to open the modal
  const handleClipClick = (clip: Clip) => {
    setSelectedClip(clip);
    window.history.pushState(null, "", `?id=${clip.id}`);
  };

  // Handler to close the modal
  const handleCloseModal = () => {
    setSelectedClip(null);
    window.history.replaceState(null, "", window.location.pathname);
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

      <div className="flex items-center gap-2">
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as "newest" | "oldest")}
          className="bg-gray-700 text-white rounded-lg p-3 border border-gray-600"
          aria-label="Sort clips"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
        <SearchInput
          value={searchText}
          onChange={setSearchText}
          placeholder="Search by title, description, platform, or tags..."
        />
      </div>

      <ClipList
        clips={filteredClips}
        emptyHeading={
          searchText
            ? `No matches found for "${searchText}"`
            : "No clips available yet."
        }
        onClipClick={handleClipClick} // Pass the click handler to ClipList
      />

      {/* Render the modal if a clip is selected */}
      <VideoModal clip={selectedClip} onClose={handleCloseModal} />
    </div>
  );
};

export default Clips;
