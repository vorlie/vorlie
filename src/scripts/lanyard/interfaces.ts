// interfaces.ts
export interface Activity {
    name: string;
    application_id?: string;
    emoji?: { name: string; }
    type: number;
    details?: string;
    state?: string;
    assets?: { 
        large_image?: string; 
        small_image?: string; 
        large_text?: string; 
        small_text?: string; 
    };
    timestamps: { start: number; end: number; }
}

export interface AvatarDecoration {
    asset: string;
    sku_id: number;
}

export interface DiscordUser {
    id: string;
    username: string;
    avatar: string;
    display_name?: string;
    avatar_decoration_data?: AvatarDecoration;
}

export interface LanyardData {
    discord_user: DiscordUser;
    discord_status: string;
    activities: Activity[];
    spotify?: Spotify;
}

export interface Spotify {
    track_id: string;
    timestamps: { start: number; end: number; };
    album: string;
    album_art_url: string;
    artist: string;
    song: string;
}
