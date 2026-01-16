import React from "react";
import { useLastFm } from "../hooks/useLastFm";
import useDynamicColor from "../hooks/useDynamicColor";

const Music: React.FC = () => {
  const { recentTracks, topArtists, loading } = useLastFm();
  const nowPlaying = recentTracks.find((t) => t.isPlaying) || recentTracks[0];

  // Update dynamic theme based on now playing album art
  // Only if on this page to give it that "Deep Dive" vibe
  useDynamicColor(nowPlaying?.image || "/images/background.png");

  if (loading && recentTracks.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-m3-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="py-8 px-4 sm:px-0 animate-in fade-in duration-1000">
      <header className="mb-12 text-center sm:text-left">
        <h1 className="text-5xl font-black text-m3-primary tracking-tighter uppercase italic mb-2">
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
                <div className="inline-flex items-center gap-2 bg-m3-primary/10 text-m3-primary px-4 py-1.5 rounded-full mb-6 border border-m3-primary/20 animate-pulse">
                  <div className="w-2 h-2 rounded-full bg-m3-primary"></div>
                  <span className="text-xs font-black uppercase tracking-widest">Currently Listening</span>
                </div>
              )}
              
              <h2 className="text-4xl md:text-5xl font-black text-m3-on-surface-variant tracking-tighter mb-4 line-clamp-2">
                {nowPlaying?.name}
              </h2>
              <p className="text-2xl font-bold text-m3-primary mb-2 opacity-90">
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
                  <p className="font-black text-m3-on-surface truncate group-hover:text-m3-primary transition-colors">{track.name}</p>
                  <p className="text-sm font-bold text-m3-on-surface-variant opacity-60 truncate">{track.artist}</p>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Top Artists */}
        <section>
          <h3 className="text-2xl font-black text-m3-on-surface mb-8 tracking-tight uppercase border-l-4 border-m3-secondary pl-4">
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
                <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden shadow-lg border-2 border-m3-primary/20">
                  <img src={artist.image} alt={artist.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <p className="font-black text-lg text-m3-on-surface-variant tracking-tight line-clamp-1 group-hover:text-m3-primary transition-colors">
                  {artist.name}
                </p>
                <p className="text-xs font-black uppercase text-m3-primary opacity-60 mt-1">
                  {parseInt(artist.playcount).toLocaleString()} Plays
                </p>
              </a>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Music;
