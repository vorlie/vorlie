import React from "react";
import { motion } from "framer-motion";
import { useLastFm } from "../hooks/useLastFm";
import { useAlbumColors } from "../hooks/useAlbumColors";
import SEO from "../components/SEO";
import { FaLastfm } from "react-icons/fa";

const Music: React.FC = () => {
  const { recentTracks, topArtists, loading } = useLastFm();
  const nowPlaying = recentTracks.find((t) => t.isPlaying) || recentTracks[0];
  const albumColors = useAlbumColors(nowPlaying?.image);

  if (loading && recentTracks.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-m3-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div
      className="min-h-screen text-m3-on-surface animate-reveal"
      style={
        albumColors
          ? ({
              "--local-primary": albumColors.primary,
              "--local-primary-container": albumColors.primaryContainer,
              "--local-surface-variant": albumColors.surfaceVariant,
            } as React.CSSProperties)
          : {}
      }
    >
      <SEO
        title="Music Deep Dive"
        description="Explore my recent listens, top artists - powered by Last.fm"
        url="https://vorlie.pl/music"
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
            Listening Activity
          </p>
          <h1
            className="text-5xl sm:text-7xl font-black tracking-tighter mb-4"
            style={{ color: albumColors?.primary || "var(--color-m3-on-surface)" }}
          >
            Music Deep Dive
          </h1>
          <div className="h-1.5 w-20 bg-gradient-to-r from-m3-primary to-m3-secondary rounded-full mb-6" />
          <div className="flex items-center gap-2 text-m3-on-surface-variant opacity-60">
            <FaLastfm />
            <p className="text-sm font-black uppercase tracking-widest">
              Powered by Last.fm
            </p>
          </div>
        </motion.div>

        {/* Now Playing / Latest Track */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="m3-card mb-8 relative overflow-hidden group"
        >
          {/* Album art background glow */}
          <div
            className="absolute inset-0 opacity-10 blur-3xl scale-150 transition-all duration-1000 group-hover:opacity-20"
            style={{
              backgroundImage: `url(${nowPlaying?.image})`,
              backgroundSize: "cover",
            }}
          />

          <div className="relative z-10 p-6 sm:p-10 flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="w-48 h-48 sm:w-64 sm:h-64 flex-shrink-0 shadow-2xl rounded-[24px] overflow-hidden group/art">
              <img
                src={nowPlaying?.image}
                alt={nowPlaying?.album}
                className="w-full h-full object-cover transition-transform duration-700 group-hover/art:scale-110"
              />
            </div>

            <div className="flex-grow text-center md:text-left">
              {nowPlaying?.isPlaying && (
                <div
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5 border animate-pulse"
                  style={{
                    backgroundColor: albumColors?.primary
                      ? `${albumColors.primary}1A`
                      : "rgba(var(--color-m3-primary), 0.1)",
                    color: albumColors?.primary || "var(--color-m3-primary)",
                    borderColor: albumColors?.primary
                      ? `${albumColors.primary}33`
                      : "rgba(var(--color-m3-primary), 0.2)",
                  }}
                >
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: albumColors?.primary || "var(--color-m3-primary)" }}
                  />
                  <span className="text-xs font-black uppercase tracking-widest">
                    Currently Listening
                  </span>
                </div>
              )}

              <h2 className="text-3xl md:text-5xl font-black text-m3-on-surface tracking-tighter mb-3 line-clamp-2">
                {nowPlaying?.name}
              </h2>
              <p
                className="text-xl font-bold mb-1 opacity-90"
                style={{ color: albumColors?.primary || "var(--color-m3-primary)" }}
              >
                {nowPlaying?.artist}
              </p>
              <p className="text-base font-medium text-m3-on-surface-variant opacity-50 italic mb-8">
                {nowPlaying?.album}
              </p>

              <a
                href={nowPlaying?.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-m3-primary text-m3-on-primary px-6 py-2.5 rounded-full font-black uppercase tracking-tighter shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all text-sm"
              >
                <FaLastfm />
                View on Last.fm
              </a>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Scrobbles */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="m3-card p-6 sm:p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-5 w-1 bg-m3-primary rounded-full" />
              <h3 className="text-sm font-black text-m3-primary uppercase tracking-[0.2em]">
                Recent Scrobbles
              </h3>
            </div>
            <div className="space-y-3">
              {recentTracks.slice(1, 7).map((track, i) => (
                <a
                  key={i}
                  href={track.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-3 bg-m3-on-surface/5 rounded-2xl border border-m3-outline/5 hover:bg-m3-on-surface/10 transition-all duration-300 group/track"
                >
                  <img
                    src={track.image}
                    alt={track.name}
                    className="w-12 h-12 rounded-xl object-cover shadow-md transition-transform duration-300 group-hover/track:scale-105"
                  />
                  <div className="flex-grow min-w-0">
                    <p className="font-black truncate text-m3-on-surface group-hover/track:text-m3-primary transition-colors duration-300 text-sm">
                      {track.name}
                    </p>
                    <p className="text-xs font-bold text-m3-on-surface-variant opacity-60 truncate">
                      {track.artist}
                    </p>
                  </div>
                  <span className="material-symbols-rounded text-[16px] text-m3-on-surface-variant opacity-0 group-hover/track:opacity-60 transition-opacity">
                    open_in_new
                  </span>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Top Artists */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="m3-card p-6 sm:p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div
                className="h-5 w-1 rounded-full"
                style={{ backgroundColor: albumColors?.primary || "var(--color-m3-secondary)" }}
              />
              <h3
                className="text-sm font-black uppercase tracking-[0.2em]"
                style={{ color: albumColors?.primary || "var(--color-m3-secondary)" }}
              >
                Top Artists
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {topArtists.map((artist, i) => (
                <a
                  key={i}
                  href={artist.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-m3-on-surface/5 rounded-2xl border border-m3-outline/5 hover:bg-m3-on-surface/10 transition-all duration-300 group/artist text-center"
                >
                  <div
                    className="w-16 h-16 mx-auto mb-3 rounded-full overflow-hidden shadow-md border-2"
                    style={{
                      borderColor: albumColors?.primary
                        ? `${albumColors.primary}33`
                        : "rgba(var(--color-m3-primary), 0.2)",
                    }}
                  >
                    <img
                      src={artist.image}
                      alt={artist.name}
                      className="w-full h-full object-cover group-hover/artist:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <p className="font-black text-sm tracking-tight line-clamp-1 text-m3-on-surface group-hover/artist:text-m3-primary transition-colors duration-300">
                    {artist.name}
                  </p>
                  <p
                    className="text-[10px] font-black uppercase opacity-60 mt-0.5"
                    style={{ color: albumColors?.primary || "var(--color-m3-primary)" }}
                  >
                    {parseInt(artist.playcount).toLocaleString()} Plays
                  </p>
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Music;
