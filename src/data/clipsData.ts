// src/data/clipsData.ts

export interface Clip {
  id: string; // Unique identifier for the clip
  title: string;
  description: string;
  thumbnailUrl: string; // URL for the video thumbnail
  videoUrl: string; // URL to the actual clip (e.g., YouTube, Twitch VOD)
  platform: 'YouTube' | 'Twitch' | 'Other'; // Where the clip is hosted
  date: string; // Date of the clip, e.g., "YYYY-MM-DD"
  tags?: string[]; // for filtering/searching, e.g., ['Valorant', 'Clutch', 'Funny']
}
