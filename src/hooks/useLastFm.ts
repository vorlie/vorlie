import { useState, useEffect } from "react";

// Cloudflare Function proxy to hide API key
const BASE_URL = "/api/lastfm";
const USERNAME = "vorlie";

export interface Track {
  name: string;
  artist: string;
  album: string;
  image: string;
  isPlaying: boolean;
  url: string;
}

export interface Artist {
  name: string;
  playcount: string;
  image: string;
  url: string;
}

export const useLastFm = () => {
  const [recentTracks, setRecentTracks] = useState<Track[]>([]);
  const [topArtists, setTopArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch Recent Tracks via Proxy
        const recentRes = await fetch(
          `${BASE_URL}?method=user.getrecenttracks&user=${USERNAME}&limit=10`,
        );
        const recentData = await recentRes.json();

        if (recentData.recenttracks) {
          const tracks = recentData.recenttracks.track.map((t: any) => ({
            name: t.name,
            artist: t.artist["#text"],
            album: t.album["#text"],
            image: t.image[3]["#text"] || "/images/placeholder_music.png",
            isPlaying: t["@attr"]?.nowplaying === "true",
            url: t.url,
          }));
          setRecentTracks(tracks);
        }

        // Fetch Top Artists via Proxy
        const artistsRes = await fetch(
          `${BASE_URL}?method=user.gettopartists&user=${USERNAME}&limit=6`,
        );
        const artistsData = await artistsRes.json();

        if (artistsData.topartists) {
          // Material Design 3 pastel color palette
          const m3Colors = [
            "#b4a7d6", // Soft Purple
            "#c5b9e8", // Lavender
            "#a4c9f3", // Sky Blue
            "#b3e5fc", // Powder Blue
            "#b2ebf2", // Pale Cyan
            "#a7dbd8", // Mint
            "#b9f6ca", // Soft Green
            "#dcedc8", // Pale Lime
            "#fff9c4", // Cream Yellow
            "#ffe0b2", // Peach
            "#ffccbc", // Soft Coral
            "#f8bbd0", // Blush Pink
            "#e1bee7", // Lilac
            "#d1c4e9", // Periwinkle
          ];

          const artists = artistsData.topartists.artist.map((a: any) => {
            // Last.fm returns empty strings or placeholder icons for many artists
            let imageUrl = a.image[3]["#text"] || a.image[2]["#text"] || "";

            // Filter out Last.fm's default placeholder icons
            if (
              !imageUrl ||
              imageUrl.includes("2a96cbd8b46e442fc41c2b86b821562f")
            ) {
              // Create a simple hash from the artist name for consistent colors
              const hash = a.name
                .split("")
                .reduce((acc: number, char: string) => {
                  return char.charCodeAt(0) + ((acc << 5) - acc);
                }, 0);
              const colorIndex = Math.abs(hash) % m3Colors.length;
              const color = m3Colors[colorIndex];

              const initial = a.name.charAt(0).toUpperCase();
              imageUrl = `data:image/svg+xml,${encodeURIComponent(`
                <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
                  <rect width="200" height="200" fill="${color}"/>
                  <text x="50%" y="50%" dominant-baseline="central" text-anchor="middle" font-family="sans-serif" font-size="80" font-weight="bold" fill="white">${initial}</text>
                </svg>
              `)}`;
            }

            return {
              name: a.name,
              playcount: a.playcount,
              image: imageUrl,
              url: a.url,
            };
          });
          setTopArtists(artists);
        }
      } catch (error) {
        console.error("Error fetching Last.fm data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30000); // Polling every 30s
    return () => clearInterval(interval);
  }, []);

  return { recentTracks, topArtists, loading };
};
