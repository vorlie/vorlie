// presence.ts
import type { LanyardData } from './interfaces';

const extractImageUrl = (url: string, application_id?: string): string => {
    if (url.startsWith('mp:external/')) {
        return `https://media.discordapp.net/external/${url.replace('mp:external/', '')}`;
    } else if (url.startsWith("spotify:")) {
        return url.replace("spotify:", "https://i.scdn.co/image/");
    } else if (application_id) {
        return `https://cdn.discordapp.com/app-assets/${application_id}/${url}.webp`;
    }
    return url;
};

const formatElapsedTime = (start: number, end?: number): string => {
    const now = Date.now();
    const elapsed = end ? end - start : now - start;
    const hours = Math.floor(elapsed / 3600000);
    const minutes = Math.floor((elapsed % 3600000) / 60000);
    const seconds = Math.floor((elapsed % 60000) / 1000);
    return `${hours > 0 ? hours + ':' : ''}${hours > 0 && minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

const formatDuration = (start: number, end: number): string => {
    const duration = end - start;
    const hours = Math.floor(duration / 3600000);
    const minutes = Math.floor((duration % 3600000) / 60000);
    const seconds = Math.floor((duration % 60000) / 1000);
    return `${hours > 0 ? hours + ':' : ''}${hours > 0 && minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};


export const displayPresence = async (presence: LanyardData | null): Promise<void> => {
    const container = document.querySelector('.activity-container');
    if (!container) return;

    container.innerHTML = ''; 

    if (!presence) {
        container.innerHTML = 'Loading...';
        return;
    }

    let hasDisplayableActivity = false;

    presence.activities.forEach(async (activity, index) => {
        const truncateText = (text: string, maxLength: number) => {
            if (text.length > maxLength) {
                return text.slice(0, maxLength) + '...';
            }
            return text;
        }
        
        let isCustomStatus = activity.type === 4;
        let activityDetails = activity.details ?? '';
        let activityState = activity.state ?? '';
        let activityName = activity.name ?? '';
        let activityLargeText = activity.assets?.large_text ?? '';
        let startTimestamp = activity.timestamps?.start;
        let endTimestamp = activity.timestamps?.end;
        let imageUrl = '/images/default.png'; 
        if (activity.name.toLowerCase().includes('spotify') && presence.spotify) {
            let truncatedName = truncateText(`${presence.spotify.song}`, 28);
            let truncatedDetails = truncateText(`by ${presence.spotify.artist}`, 25);
            let truncatedState = truncateText(`on ${presence.spotify.album}`, 25);
            activityName = truncatedName;
            activityDetails = truncatedDetails;
            activityState = truncatedState;
            startTimestamp = presence.spotify.timestamps.start;
            endTimestamp = presence.spotify.timestamps.end;
        }

        if (isCustomStatus && activity.emoji) {
            return;
        }
        if (isCustomStatus && !activity.emoji) {
            return;
        }

        const activityElement = document.createElement('div');
        activityElement.classList.add('activity');

        hasDisplayableActivity = true;

        if (activity.assets?.large_image) {
            imageUrl = extractImageUrl(activity.assets.large_image, activity.application_id);
        } else if (activity.assets?.small_image) {
            imageUrl = extractImageUrl(activity.assets.small_image, activity.application_id);
        }

        const nameElement = document.createElement('p');
        nameElement.className = 'activityName';
        nameElement.title = activityName ?? '';
        nameElement.textContent = activityName ?? '';

        activityElement.appendChild(nameElement);

        const imgElement = document.createElement('img');
        imgElement.className = 'activityPointerEventsAllow';
        imgElement.className = 'activityImage';
        imgElement.src = imageUrl;
        imgElement.alt = activity.name;
        imgElement.title = activityLargeText;

        activityElement.appendChild(imgElement);

        const detailsElement = document.createElement('div');
        detailsElement.className = 'activityDetailsContainer';

        if (activityDetails) {
            const detailsTextElement = document.createElement('p');
            detailsTextElement.className = 'activityDetails';
            detailsTextElement.title = activityDetails;
            detailsTextElement.textContent = truncateText(activityDetails, 25);
            detailsElement.appendChild(detailsTextElement);
        }

        if (activityState) {
            const stateElement = document.createElement('p');
            stateElement.className = 'activityState';
            stateElement.title = activityState;
            stateElement.textContent = truncateText(activityState, 25);
            detailsElement.appendChild(stateElement);
        }

        if (startTimestamp) {
            const elapsedElement = document.createElement('p');
            elapsedElement.className = 'activityTimestamp';
            let elapsedText = `${formatElapsedTime(startTimestamp)} elapsed`;
        
            if (endTimestamp) {
                elapsedText += ` (${formatDuration(startTimestamp, endTimestamp)})`;
            }
        
            elapsedElement.textContent = elapsedText;
            detailsElement.appendChild(elapsedElement);
        }

        activityElement.appendChild(detailsElement);
        container.appendChild(activityElement);
    });

    if (!hasDisplayableActivity) {
        container.innerHTML = 'Not doing anything right now.';
    }
};