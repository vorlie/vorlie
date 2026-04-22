import React, { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import ClipList from "../components/ClipList";
import SearchInput from "../components/SearchInput";
import VideoModal from "../components/VideoModal";
import { Clip } from "../data/clipsData";
import SEO from "../components/SEO";

const filterClips = (clips: Clip[], searchText: string): Clip[] => {
  if (!searchText) return clips;
  const lower = searchText.toLowerCase();
  return clips.filter(
    (clip) =>
      clip.title.toLowerCase().includes(lower) ||
      clip.description.toLowerCase().includes(lower) ||
      clip.platform.toLowerCase().includes(lower) ||
      (clip.tags && clip.tags.some((tag) => tag.toLowerCase().includes(lower))) ||
      clip.game.toLowerCase().includes(lower),
  );
};

const Clips: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const [allClips, setAllClips] = useState<Clip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [selectedClip, setSelectedClip] = useState<Clip | null>(null);
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  useEffect(() => {
    const fetchClips = async () => {
      try {
        const response = await fetch("https://api.vorlie.pl/clips.json");
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
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

  useEffect(() => {
    if (allClips.length > 0 && id) {
      const found = allClips.find((clip) => clip.id === id);
      if (found) setSelectedClip(found);
    }
  }, [allClips, id]);

  const sortedClips = useMemo(() => {
    function parseDMY(dateStr: string) {
      const parts = dateStr.includes("-") ? dateStr.split("-") : dateStr.split("/");
      return new Date(parseInt(parts[2], 10), parseInt(parts[1], 10) - 1, parseInt(parts[0], 10)).getTime();
    }
    return [...allClips].sort((a, b) =>
      sortOrder === "newest" ? parseDMY(b.date) - parseDMY(a.date) : parseDMY(a.date) - parseDMY(b.date),
    );
  }, [allClips, sortOrder]);

  const filteredClips = useMemo(() => filterClips(sortedClips, searchText), [sortedClips, searchText]);

  const handleClipClick = (clip: Clip) => {
    setSelectedClip(clip);
    window.history.pushState(null, "", `/clips/${clip.id}`);
  };

  const handleCloseModal = () => {
    setSelectedClip(null);
    window.history.replaceState(null, "", "/clips");
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-m3-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <span className="material-symbols-rounded text-6xl text-m3-on-surface-variant opacity-20">
          movie_off
        </span>
        <p className="text-xl font-black text-m3-on-surface-variant opacity-40 uppercase tracking-tight">
          Failed to load clips
        </p>
        <p className="text-sm text-m3-on-surface-variant opacity-30">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-m3-on-surface animate-reveal">
      <SEO
        title="Clips"
        description="Clips and highlights from streams and gaming sessions"
        url="https://vorlie.pl/clips"
      />

      <div className="max-w-full mx-auto relative z-10 py-8">
        {/* Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <p className="text-m3-primary text-xs font-black uppercase tracking-[0.25em] mb-3 opacity-70">
            Highlights
          </p>
          <h1 className="text-5xl sm:text-7xl font-black text-m3-on-surface tracking-tighter mb-4">
            Clips
          </h1>
          <div className="h-1.5 w-20 bg-gradient-to-r from-m3-primary to-m3-secondary rounded-full mb-6" />
          <p className="text-lg text-m3-on-surface-variant font-bold opacity-70 max-w-xl leading-relaxed">
            Favourite moments from gaming sessions and streams. Search by title,
            game, platform, or tags.
          </p>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-8"
        >
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as "newest" | "oldest")}
            className="bg-m3-surface-container/60 backdrop-blur-xl border border-m3-outline/20 rounded-2xl text-m3-on-surface text-xs font-black uppercase tracking-wider px-4 py-3 hover:border-m3-primary/30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-m3-primary/30 cursor-pointer"
            aria-label="Sort clips"
          >
            <option value="newest" className="bg-m3-surface-container">Newest First</option>
            <option value="oldest" className="bg-m3-surface-container">Oldest First</option>
          </select>
          <div className="flex-grow">
            <SearchInput
              value={searchText}
              onChange={setSearchText}
              placeholder="Search by title, description, platform, or tags..."
            />
          </div>
        </motion.div>

        {/* Clip count badge */}
        {filteredClips.length > 0 && (
          <p className="text-xs font-black uppercase tracking-widest text-m3-on-surface-variant opacity-40 mb-4">
            {filteredClips.length} clip{filteredClips.length !== 1 ? "s" : ""}
            {searchText && ` for "${searchText}"`}
          </p>
        )}

        <ClipList
          clips={filteredClips}
          emptyHeading={
            searchText
              ? `No matches found for "${searchText}"`
              : "No clips available yet."
          }
          onClipClick={handleClipClick}
        />

        <VideoModal clip={selectedClip} onClose={handleCloseModal} />
      </div>
    </div>
  );
};

export default Clips;
