import React from "react";
import { useLastFm } from "../hooks/useLastFm";
import { useAlbumColors } from "../hooks/useAlbumColors";
import SEO from "../components/SEO";

const Music: React.FC = () => {
  const { recentTracks, topArtists, loading } = useLastFm();
  const nowPlaying = recentTracks.find((t) => t.isPlaying) || recentTracks[0];

  // Extract colors from album art for scoped theming
  const albumColors = useAlbumColors(nowPlaying?.image);

  if (loading && recentTracks.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-m3-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div
      className="py-8 px-4 sm:px-6 animate-in fade-in duration-1000"
      style={albumColors ? {
        '--local-primary': albumColors.primary,
        '--local-primary-container': albumColors.primaryContainer,
        '--local-surface-variant': albumColors.surfaceVariant,
      } as React.CSSProperties : {}}
    >
      <SEO
        title="Music Deep Dive"
        description="Explore my recent listens, top artists - powered by Last.fm"
        url="https://vorlie.pl/music"
      />
      <div className="max-w-6xl mx-auto bg-m3-surface-container rounded-[48px] p-8 sm:p-12 border border-m3-outline/10 shadow-sm relative z-10">
        <header className="mb-12 text-center sm:text-left">
        <h1
          className="text-5xl font-black tracking-tighter uppercase italic mb-2"
          style={{ color: albumColors?.primary || 'var(--color-m3-primary)' }}
        >
          Music Deep Dive
        </h1>
        <p className="text-m3-on-surface-variant font-bold opacity-60 uppercase tracking-[0.2em] text-sm">
          Powered by Last.fm
        </p>
      </header>

      {/* Now Playing / Latest Track */}
      <section className="mb-16">
        <div className="bg-m3-surface-container rounded-[48px] p-6 sm:p-10 border border-m3-outline/10 shadow-2xl relative overflow-hidden group">
          {/* Subtle blurred background of the album art */}
          <div
            className="absolute inset-0 opacity-10 blur-3xl scale-150 transition-all duration-1000 group-hover:opacity-20"
            style={{ backgroundImage: `url(${nowPlaying?.image})`, backgroundSize: 'cover' }}
          ></div>

          <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
            <div className="w-64 h-64 flex-shrink-0 shadow-2xl rounded-[32px] overflow-hidden group/art">
              <img
                src={nowPlaying?.image}
                alt={nowPlaying?.album}
                className="w-full h-full object-cover transition-transform duration-700 group-hover/art:scale-110"
              />
            </div>

            <div className="flex-grow text-center md:text-left">
              {nowPlaying?.isPlaying && (
                <div
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 border animate-pulse"
                  style={{
                    backgroundColor: albumColors?.primary ? `${albumColors.primary}1A` : 'rgba(var(--color-m3-primary), 0.1)',
                    color: albumColors?.primary || 'var(--color-m3-primary)',
                    borderColor: albumColors?.primary ? `${albumColors.primary}33` : 'rgba(var(--color-m3-primary), 0.2)'
                  }}
                >
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: albumColors?.primary || 'var(--color-m3-primary)' }}
                  ></div>
                  <span className="text-xs font-black uppercase tracking-widest">Currently Listening</span>
                </div>
              )}

              <h2 className="text-4xl md:text-5xl font-black text-m3-on-surface-variant tracking-tighter mb-4 line-clamp-2">
                {nowPlaying?.name}
              </h2>
              <p
                className="text-2xl font-bold mb-2 opacity-90"
                style={{ color: albumColors?.primary || 'var(--color-m3-primary)' }}
              >
                {nowPlaying?.artist}
              </p>
              <p className="text-lg font-medium text-m3-on-surface-variant opacity-50 italic">
                {nowPlaying?.album}
              </p>

              <div className="mt-8 flex flex-wrap gap-4 justify-center md:justify-start">
                <a
                  href={nowPlaying?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-m3-primary text-m3-on-primary px-8 py-3 rounded-full font-black uppercase tracking-tighter shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all"
                >
                  View on Last.fm
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Recent History */}
        <section>
          <h3 className="text-2xl font-black text-m3-on-surface mb-8 tracking-tight uppercase border-l-4 border-m3-primary pl-4">
            Recent Scrobbles
          </h3>
          <div className="space-y-4">
            {recentTracks.slice(1, 7).map((track, i) => (
              <a
                key={i}
                href={track.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-m3-surface-variant/20 rounded-[24px] border border-m3-outline/5 hover:bg-m3-surface-variant/40 transition-all group"
              >
                <img src={track.image} alt={track.name} className="w-16 h-16 rounded-[16px] object-cover shadow-md transition-transform group-hover:scale-105" />
                <div className="flex-grow min-w-0">
                  <p
                    className="font-black truncate transition-colors"
                    style={{
                      color: 'var(--color-m3-on-surface)',
                    }}
                    onMouseEnter={(e) => albumColors && (e.currentTarget.style.color = albumColors.primary)}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-m3-on-surface)')}
                  >
                    {track.name}
                  </p>
                  <p className="text-sm font-bold text-m3-on-surface-variant opacity-60 truncate">{track.artist}</p>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Top Artists */}
        <section>
          <h3
            className="text-2xl font-black mb-8 tracking-tight uppercase border-l-4 pl-4"
            style={{
              color: 'var(--color-m3-on-surface)',
              borderColor: albumColors?.primary || 'var(--color-m3-secondary)'
            }}
          >
            Top Artists
          </h3>
          <div className="grid grid-cols-2 gap-6">
            {topArtists.map((artist, i) => (
              <a
                key={i}
                href={artist.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-6 bg-m3-surface-container rounded-[32px] border border-m3-outline/10 hover:shadow-xl transition-all group text-center"
              >
                <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden shadow-lg border-2"
                  style={{ borderColor: albumColors?.primary ? `${albumColors.primary}33` : 'rgba(var(--color-m3-primary), 0.2)' }}
                >
                  <img src={artist.image} alt={artist.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <p
                  className="font-black text-lg tracking-tight line-clamp-1 transition-colors"
                  style={{ color: 'var(--color-m3-on-surface-variant)' }}
                  onMouseEnter={(e) => albumColors && (e.currentTarget.style.color = albumColors.primary)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-m3-on-surface-variant)')}
                >
                  {artist.name}
                </p>
                <p
                  className="text-xs font-black uppercase opacity-60 mt-1"
                  style={{ color: albumColors?.primary || 'var(--color-m3-primary)' }}
                >
                  {parseInt(artist.playcount).toLocaleString()} Plays
                </p>
              </a>
            ))}
          </div>
        </section>
      </div>
      </div>
    </div>
  );
};

export default Music;
