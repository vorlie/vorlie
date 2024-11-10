// utils.ts
export const extractImageUrl = (url: string, application_id?: string): string => {
    if (!url) return '/images/default.png'; // Fallback if url is empty

    try {
        if (url.startsWith('mp:external/')) {
            return `https://media.discordapp.net/external/${url.replace('mp:external/', '')}`;
        } else if (url.startsWith("spotify:")) {
            return url.replace("spotify:", "https://i.scdn.co/image/");
        } else if (application_id) {
            return `https://cdn.discordapp.com/app-assets/${application_id}/${url}.png`;
        }
        return url;
    } catch (error) {
        console.error("Error extracting image URL:", error);
        return '/images/default.png'; // Return placeholder if an error occurs
    }
};

export const formatElapsedTime = (start: number, end?: number): string => {
    const now = Date.now();
    const elapsed = end ? end - start : now - start;
    const hours = Math.floor(elapsed / 3600000);
    const minutes = Math.floor((elapsed % 3600000) / 60000);
    const seconds = Math.floor((elapsed % 60000) / 1000);
    return `${hours > 0 ? hours + ':' : ''}${hours > 0 && minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

export const formatDuration = (start: number, end: number): string => {
    const duration = end - start;
    const hours = Math.floor(duration / 3600000);
    const minutes = Math.floor((duration % 3600000) / 60000);
    const seconds = Math.floor((duration % 60000) / 1000);
    return `${hours > 0 ? hours + ':' : ''}${hours > 0 && minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

export const getStatusColor = (status: string): string => {
    switch (status) {
        case 'online':
            return 'var(--color-status-online)';
        case 'idle':
            return 'var(--color-status-idle)';
        case 'dnd':
            return 'var(--color-status-dnd)';
        default:
            return 'var(--color-status-offline)';
    }
};