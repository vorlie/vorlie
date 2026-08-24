import { useCallback, useEffect, useState } from "react";

const BASE_URL = "/api/lastfm";

export type LastFmPeriod =
  | "7day"
  | "1month"
  | "3month"
  | "6month"
  | "12month"
  | "overall";

export interface LastFmImage {
  "#text": string;
  size: string;
}

export interface LastFmArtistResponse {
  name: string;
  playcount: string;
  url: string;
  image?: LastFmImage[];
}

export interface LastFmTrackResponse {
  name: string;

  artist?: {
    "#text": string;
  };

  album?: {
    "#text": string;
  };

  image?: LastFmImage[];

  url: string;

  "@attr"?: {
    nowplaying?: string;
  };
}

export interface LastFmAlbumResponse {
  name: string;
  playcount: string;
  artist?: {
    name: string;
  };
  url: string;
  image?: LastFmImage[];
}

export interface RecentTracksResponse {
  recenttracks?: {
    track?: LastFmTrackResponse[];
  };
}

export interface TopArtistsResponse {
  topartists?: {
    artist?: LastFmArtistResponse[];
  };
}

export interface TopTracksResponse {
  toptracks?: {
    track?: LastFmTrackResponse[];
  };
}

export interface TopAlbumsResponse {
  topalbums?: {
    album?: LastFmAlbumResponse[];
  };
}

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
  playcount: number;
  image: string;
  url: string;
}

export interface Album {
  name: string;
  artist: string;
  playcount: number;
  image: string;
  url: string;
}

const getImage = (images?: LastFmImage[]): string => {
  return (
    images
      ?.slice()
      .reverse()
      .find((image) => image["#text"])?.["#text"] ?? ""
  );
};

async function fetchLastFm<T>(
  method: string,
  params: Record<string, string> = {},
): Promise<T> {
  const searchParams = new URLSearchParams({
    method,
    ...params,
  });

  const response = await fetch(`${BASE_URL}?${searchParams}`);

  if (!response.ok) {
    throw new Error(`Last.fm request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export const useLastFm = (period: LastFmPeriod = "7day") => {
  const [nowPlaying, setNowPlaying] = useState<Track | null>(null);
  const [recentTracks, setRecentTracks] = useState<Track[]>([]);
  const [topArtists, setTopArtists] = useState<Artist[]>([]);
  const [topTracks, setTopTracks] = useState<Track[]>([]);
  const [topAlbums, setTopAlbums] = useState<Album[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const [recentData, artistsData, tracksData, albumsData] =
        await Promise.all([
          fetchLastFm<RecentTracksResponse>("user.getrecenttracks", {
            limit: "10",
          }),
          fetchLastFm<TopArtistsResponse>("user.gettopartists", {
            limit: "10",
            period,
          }),
          fetchLastFm<TopTracksResponse>("user.gettoptracks", {
            limit: "10",
            period,
          }),
          fetchLastFm<TopAlbumsResponse>("user.gettopalbums", {
            limit: "10",
            period,
          }),
        ]);

      const tracks =
        recentData.recenttracks?.track?.map(mapTrack) ?? [];

      const currentlyPlaying =
        tracks.find((track) => track.isPlaying) ?? null;

      setNowPlaying(currentlyPlaying);
      setRecentTracks(tracks);

      setTopArtists(
        artistsData.topartists?.artist?.map(mapArtist) ?? [],
      );

      setTopTracks(
        tracksData.toptracks?.track?.map(mapTrack) ?? [],
      );

      setTopAlbums(
        albumsData.topalbums?.album?.map(mapAlbum) ?? [],
      );
    } catch (error) {
      console.error("Error fetching Last.fm data:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Failed to load Last.fm data",
      );
    } finally {
      setLoading(false);
    }
  }, [period]);

  useEffect(() => {
    void fetchData();

    const interval = window.setInterval(fetchData, 30_000);

    return () => window.clearInterval(interval);
  }, [fetchData]);

  return {
    nowPlaying,
    recentTracks,
    topArtists,
    topTracks,
    topAlbums,
    loading,
    error,
    refresh: fetchData,
  };
};

function mapTrack(track: LastFmTrackResponse): Track {
  return {
    name: track.name,
    artist: track.artist?.["#text"] ?? "Unknown Artist",
    album: track.album?.["#text"] ?? "",
    image: getImage(track.image) || "/images/placeholder_music.png",
    isPlaying: track["@attr"]?.nowplaying === "true",
    url: track.url,
  };
}

function mapArtist(artist: LastFmArtistResponse): Artist {
  return {
    name: artist.name,
    playcount: Number(artist.playcount) || 0,
    image: getImage(artist.image),
    url: artist.url,
  };
}

function mapAlbum(album: LastFmAlbumResponse): Album {
  return {
    name: album.name,
    artist: album.artist?.name ?? "Unknown Artist",
    playcount: Number(album.playcount) || 0,
    image: getImage(album.image),
    url: album.url,
  };
}
