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
          `${BASE_URL}?method=user.getrecenttracks&user=${USERNAME}&limit=10`
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
          `${BASE_URL}?method=user.gettopartists&user=${USERNAME}&limit=6`
        );
        const artistsData = await artistsRes.json();
        
        if (artistsData.topartists) {
          const artists = artistsData.topartists.artist.map((a: any) => ({
            name: a.name,
            playcount: a.playcount,
            image: a.image[3]["#text"] || "/images/placeholder_music.png",
            url: a.url,
          }));
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
