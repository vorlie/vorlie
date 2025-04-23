/* eslint-disable @typescript-eslint/no-explicit-any */
// src/types/lanyard.ts

export interface SpotifyData {
    track_id: string | null;
    timestamps: {
        start: number;
        end: number;
    } | null;
    song: string;
    artist: string;
    album_art_url: string | null;
    album: string;
}

export interface Activity {
    id: string;
    name: string;
    type: number; // 0: Playing, 1: Streaming, 2: Listening, 3: Watching, 4: Custom, 5: Competing
    url?: string | null;
    created_at: number;
    timestamps?: {
        start?: number;
        end?: number;
    } | null;
    application_id?: string | null;
    details?: string | null;
    state?: string | null;
    emoji?: {
        name: string;
        id?: string | null;
        animated?: boolean;
    } | null;
    party?: {
        id?: string;
        size?: [number, number];
    } | null;
    assets?: {
        large_image?: string | null; 
        large_text?: string | null;
        small_image?: string | null;
        small_text?: string | null;
    } | null;
}

export interface AvatarDecoration {
    asset: string;
    sku_id: number;
}

export interface DiscordUser {
    id: string;
    username: string;
    avatar: string | null;
    discriminator: string;
    bot: boolean;
    global_name: string | null; 
    avatar_decoration_data?: AvatarDecoration;
    display_name: string | null; 
    public_flags: number;
}

export type DiscordStatus = 'online' | 'idle' | 'dnd' | 'offline';

export interface PresenceData {
    active_on_discord_web: boolean;
    active_on_discord_mobile: boolean;
    active_on_discord_desktop: boolean;
    listening_to_spotify: boolean;
    spotify: SpotifyData | null;
    discord_user: DiscordUser;
    discord_status: DiscordStatus;
    activities: Activity[];
    kv: Record<string, string>;
}

// For the WebSocket messages
export interface LanyardWebSocketMessage {
    op: number; // Opcode
    t?: string; // Event type (e.g., "INIT_STATE", "PRESENCE_UPDATE")
    seq?: number;
    d?: any; // Data payload (e.g., PresenceData or HelloData)
}

export interface LanyardHelloData {
    heartbeat_interval: number;
}