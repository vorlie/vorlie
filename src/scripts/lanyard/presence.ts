// presence.ts
import type { LanyardData } from './interfaces';
import { extractImageUrl, formatElapsedTime, formatDuration } from './utils';

export const displayPresence = async (presence: LanyardData | null): Promise<void> => {
    const container = document.querySelector('.activity-container');
    if (!container) return;

    container.innerHTML = presence ? '' : 'Loading...';
    if (!presence) return;

    const customImages: Record<string, string> = {
        'counter-strike 2': "https://cdn2.steamgriddb.com/icon/e1bd06c3f8089e7552aa0552cb387c92/32/512x512.png",
        // More images will be added
    };

    let hasDisplayableActivity = false;

    presence.activities.forEach((activity) => {
        const {
            name = '',
            details = '',
            state = '',
            assets,
            timestamps,
            type,
        } = activity;
        
        let imageUrl = customImages[name.toLowerCase()] || '/images/default.png';
        let activityName = name;
        let activityDetails = details;
        let activityState = state;
        let startTimestamp = timestamps?.start;
        let endTimestamp = timestamps?.end;

        // Spotify-specific handling
        if (name.toLowerCase().includes('spotify') && presence.spotify) {
            activityName = `${presence.spotify.song}`;
            activityDetails = `by ${presence.spotify.artist}`;
            activityState = `on ${presence.spotify.album}`;
            startTimestamp = presence.spotify.timestamps.start;
            endTimestamp = presence.spotify.timestamps.end;
        }

        // Update image URL if available in assets
        if (assets) {
            const assetUrl = assets.large_image ?? assets.small_image;
            if (assetUrl) {
                imageUrl = extractImageUrl(assetUrl, activity.application_id);
            }
        }

        // Skip custom statuses with or without emojis
        if (type === 4) return;

        // Create and append activity element
        const activityElement = createActivityElement(activityName, imageUrl, activityDetails, activityState, startTimestamp, endTimestamp);
        container.appendChild(activityElement);
        hasDisplayableActivity = true;
    });

    if (!hasDisplayableActivity) {
        container.innerHTML = 'Not doing anything right now.';
    }
};

// Helper function to create activity element
function createActivityElement(name: string, imageUrl: string, details: string, state: string, start: number | undefined, end: number | undefined): HTMLElement {
    const activityElement = document.createElement('div');
    activityElement.classList.add('activity');

    // Name element
    const nameElement = document.createElement('p');
    nameElement.className = 'activityName';
    nameElement.title = name;
    nameElement.textContent = name;
    activityElement.appendChild(nameElement);

    // Image element
    const imgElement = document.createElement('img');
    imgElement.className = 'activityImage activityPointerEventsAllow';
    imgElement.src = imageUrl;
    imgElement.alt = name;
    imgElement.title = name;
    activityElement.appendChild(imgElement);

    // Details container
    const detailsContainer = document.createElement('div');
    detailsContainer.className = 'activityDetailsContainer';

    // Activity details
    if (details) {
        const detailsText = document.createElement('p');
        detailsText.className = 'activityDetails';
        detailsText.title = details;
        detailsText.textContent = details;
        detailsContainer.appendChild(detailsText);
    }

    // Activity state
    if (state) {
        const stateElement = document.createElement('p');
        stateElement.className = 'activityState';
        stateElement.title = state;
        stateElement.textContent = state;
        detailsContainer.appendChild(stateElement);
    }

    // Timestamp
    if (start) {
        const timestampElement = document.createElement('p');
        timestampElement.className = 'activityTimestamp';
    
        if (end) {
            const updateTimestamp = () => {
                const now = Date.now();
                const remainingTime = end - now;
    
                if (remainingTime <= 0) {
                    timestampElement.textContent = 'Activity has ended';
                } else {
                    const elapsedText = `${formatElapsedTime(now, end)} left`;
                    timestampElement.textContent = elapsedText;
                }
            };

            updateTimestamp();

            detailsContainer.appendChild(timestampElement);
        } else {
            const elapsedText = `${formatElapsedTime(start)} elapsed`;
            timestampElement.textContent = elapsedText;
            detailsContainer.appendChild(timestampElement);
        }
    }

    activityElement.appendChild(detailsContainer);
    return activityElement;
}
