export type SpotifyTheme = "badge" | "compact" | "glass" | "modern" | "tidal" | "amuse" | "musicbee";

export interface MusicData {
  service: "spotify" | "tidal" | "musicbee";
  trackId: string | null;
  title: string;
  subtitle: string;
  album: string;
  coverUrl: string | null;
  iconUrl: string | null;
  timestamps: {
    start?: number;
    end?: number;
  } | null;
}

export interface ThemeProps {
  musicData: MusicData;
  accentColor: string;
  initialWidth: string;
  remainingDuration: number;
  animate: boolean;
}
