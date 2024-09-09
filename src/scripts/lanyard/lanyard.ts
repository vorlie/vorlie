// lanyard.ts
import type { LanyardData } from './interfaces.ts';

export const fetchPresence = async (): Promise<LanyardData | null> => {
    try {
        const response = await fetch('https://api.lanyard.rest/v1/users/614807913302851594');
        if (!response.ok) throw new Error(`Error: ${response.status}`);
        const { data }: { data: LanyardData } = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const getStatusColor = (status: string): string => {
    switch (status) {
        case 'online':
            return 'var(--status-color-online)';
        case 'idle':
            return 'var(--status-color-idle)';
        case 'dnd':
            return 'var(--status-color-dnd)';
        default:
            return 'var(--status-color-offline)';
    }
};