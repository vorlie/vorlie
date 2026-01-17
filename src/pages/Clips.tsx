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
      <div className="container mx-auto p-4 pt-4 text-blue-500 text-center">
        <p className="text-xl">Error loading clips: {error}</p>
        <p className="text-lg text-gray-400">
          Please try again later or check the console for more details.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-m3-surface-container rounded-[32px] text-m3-on-surface">
      <div className="max-w-6xl mx-auto relative z-10 p-4 md:p-8 text-m3-on-surface">
        <h1 className="text-4xl font-bold mb-4 tracking-tight">
          Clips and Highlights
        </h1>
        <p className="text-lg text-m3-on-surface-variant mb-8 max-w-3xl font-medium">
          This page showcases some of my favorite clips and highlights from
          various streams and gaming sessions. Use the search bar to find
          specific moments!
        </p>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-8">
          <select
            value={sortOrder}
            onChange={(e) =>
              setSortOrder(e.target.value as "newest" | "oldest")
            }
            className="bg-m3-surface-container border border-m3-outline/20 rounded-[16px] text-m3-on-surface text-sm font-semibold px-4 py-3 hover:bg-m3-on-surface/5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-m3-primary/30"
            aria-label="Sort clips"
          >
            <option value="newest" className="bg-m3-surface-container">
              Newest First
            </option>
            <option value="oldest" className="bg-m3-surface-container">
              Oldest First
            </option>
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
    </div>
  );
};

export default Clips;
