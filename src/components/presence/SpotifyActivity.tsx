import { FaSpotify } from "react-icons/fa";
import ActivityTimestamp from "./ActivityTimestamp";
import { SpotifyData } from "../../types/lanyard";

interface SpotifyActivityProps {
  dominantColor: number[] | null;
  spotify: SpotifyData;
}

function SpotifyActivity({ dominantColor, spotify }: SpotifyActivityProps) {
  return (
    <div
      className="rounded-none p-4 transition-all duration-500 relative overflow-hidden group border border-m3-outline/10 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.4)] border-t-white/20 border-l-white/20 border-b-black/40 border-r-black/40"
      style={{
        backgroundColor: dominantColor
          ? `rgba(${dominantColor[0]}, ${dominantColor[1]}, ${dominantColor[2]}, 0.15)`
          : "var(--color-m3-surface-container)",
        borderColor: dominantColor
          ? `rgba(${dominantColor[0]}, ${dominantColor[1]}, ${dominantColor[2]}, 0.3)`
          : "var(--color-m3-outline)",
      }}
    >
      <div className="flex items-center gap-4 relative z-10">
        {spotify.album_art_url && (
          <div className="relative flex-shrink-0 group">
            <img
              src={spotify.album_art_url}
              alt={`${spotify.album} cover`}
              className="w-16 h-16 rounded-none transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-none flex items-center justify-center">
              <FaSpotify className="text-white drop-shadow-lg" size={24} />
            </div>
          </div>
        )}
        <div className="flex-grow overflow-hidden">
          <a
            href={`https://open.spotify.com/track/${spotify.track_id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-base block truncate hover:underline text-m3-on-surface tracking-tight"
            title={`Listen to ${spotify.song} by ${spotify.artist} on Spotify`}
          >
            {spotify.song}
          </a>
          <p
            className="text-m3-on-surface-variant text-sm font-semibold truncate opacity-80"
            title={spotify.artist}
          >
            {spotify.artist}
          </p>
          <p
            className="text-m3-on-surface-variant text-xs truncate opacity-60"
            title={spotify.album}
          >
            {spotify.album}
          </p>
        </div>
      </div>
      {spotify.timestamps?.start && (
        <div className="mt-3">
          <ActivityTimestamp
            startTime={spotify.timestamps.start}
            endTime={spotify.timestamps.end}
            color="var(--color-m3-primary)"
            colorSecondary="var(--color-m3-on-secondary)"
          />
        </div>
      )}
    </div>
  );
}

export default SpotifyActivity;
