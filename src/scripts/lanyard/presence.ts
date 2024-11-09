// presence.ts
import type { LanyardData } from './interfaces';
import { extractImageUrl, formatElapsedTime } from './utils';

export const displayPresence = async (presence: LanyardData | null): Promise<void> => {
    const container = document.querySelector('.activity-container');
    if (!container) return;

    container.innerHTML = presence ? '' : 'Loading...';
    if (!presence) return;

    const largeCustomImages: Record<string, string> = {
        'counter-strike 2': "https://cdn2.steamgriddb.com/icon/e1bd06c3f8089e7552aa0552cb387c92/32/512x512.png",
        'world of tanks blitz':"https://play-lh.googleusercontent.com/bGox9eeuGjKWkC_EdFuhZIaIFGE1tClqMFa8LdwwNmi2ifTjqXYwxX2zCPa9FVSFYzw",
        'osu!': "https://cdn.discordapp.com/app-assets/367827983903490050/373344233077211136.png"
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
        
        let largeImageUrl = largeCustomImages[name.toLowerCase()] || '/images/default.png';
        let largeImageText = null;
        let smallImageText = null;
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
            const assetUrl = assets.large_image;
            const largeText = assets.large_text;
            const smallText = assets.small_text;
            if (assetUrl) {
                largeImageUrl = extractImageUrl(assetUrl, activity.application_id);
            }
            if (largeText) {
                largeImageText = largeText;
            }
            if (smallText) {
                smallImageText = smallText;
            }
        }

        // Skip custom statuses with or without emojis
        if (type === 4) return;

        // Create and append activity element
        const smallImageUrl = assets?.small_image ? extractImageUrl(assets.small_image, activity.application_id) : null;
        const activityElement = createActivityElement(activityName, largeImageUrl, largeImageText, smallImageUrl, smallImageText ,activityDetails, activityState, startTimestamp, endTimestamp);
        container.appendChild(activityElement);
        hasDisplayableActivity = true;
    });

    if (!hasDisplayableActivity) {
        container.innerHTML = '';
    }
};

// Helper function to create activity element
function createActivityElement(
    name: string, 
    largeImageUrl: string, 
    largeImageText: string | null,
    smallImageUrl: string | null, 
    smallImageText: string | null,
    details: string, state: string, 
    start: number | undefined, 
    end: number | undefined
): HTMLElement {
    const activityElement = document.createElement('div');
    activityElement.classList.add('activity');

    // Name element
    const nameElement = document.createElement('p');
    nameElement.className = 'activityName';
    nameElement.title = name;
    nameElement.textContent = name;
    activityElement.appendChild(nameElement);

    // Wrapper for image and details containers
    const activityWrapper = document.createElement('div');
    activityWrapper.className = 'activityWrapper';

    // Image container
    const imageContainer = document.createElement('div');
    imageContainer.className = 'activityImageContainer';
    
    // Large Image element
    const imgElement = document.createElement('img');
    imgElement.className = 'activityImage activityPointerEventsAllow';
    imgElement.src = largeImageUrl;
    imgElement.alt = name;
    imgElement.title = largeImageText || name;
    imageContainer.appendChild(imgElement);

    // Small Image overlay (if available)
    if (smallImageUrl) {
        const smallImgElement = document.createElement('img');
        smallImgElement.className = 'activitySmallImage';
        smallImgElement.src = smallImageUrl;
        smallImgElement.alt = smallImageText || name;
        smallImgElement.title = smallImageText || name;
        imageContainer.appendChild(smallImgElement);
    }

    activityWrapper.appendChild(imageContainer);

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

    // Timestamp and progress bar handling
    if (start) {
        const timestampElement = document.createElement('p');
        timestampElement.className = 'activityTimestamp';

        if (end) {
            // Create a new wrapper for the progress bar
            const progressWrapper = document.createElement('div');
            progressWrapper.className = 'activityWrapper'; // Duplicate wrapper

            // Progress bar container
            const progressBarContainer = document.createElement('div');
            progressBarContainer.className = 'activityProgressBarContainer';

            const progressBar = document.createElement('div');
            progressBar.className = 'activityProgressBar';
            progressBarContainer.appendChild(progressBar);

            // Update timestamp and progress
            const updateTimestampAndProgress = () => {
                const now = Date.now();
                const remainingTime = end - now;

                if (remainingTime <= 0) {
                    timestampElement.textContent = 'Activity has ended';
                } else {
                    const elapsedText = `${formatElapsedTime(now, end)} left`;
                    timestampElement.textContent = elapsedText;

                    const totalDuration = end - start;
                    const elapsed = now - start;
                    const progressPercent = Math.min((elapsed / totalDuration) * 100, 100);
                    progressBar.style.width = `${progressPercent}%`;
                }
            };

            // Initialize timestamp and progress bar
            updateTimestampAndProgress();

            // Append the timestamp to the details container
            detailsContainer.appendChild(timestampElement);

            // Append the details container to the original wrapper
            activityWrapper.appendChild(detailsContainer);

            // Append the progress bar container to the progress wrapper
            progressWrapper.appendChild(progressBarContainer);

            // Append both the original wrapper (image/details) and the new progress wrapper to the activity element
            activityElement.appendChild(activityWrapper);
            activityElement.appendChild(progressWrapper);
        } else {
            const elapsedText = `${formatElapsedTime(start)} elapsed`;
            timestampElement.textContent = elapsedText;
            detailsContainer.appendChild(timestampElement);
            activityWrapper.appendChild(detailsContainer);
            activityElement.appendChild(activityWrapper);
        }
    } else {
        activityElement.appendChild(detailsContainer);
    }

    return activityElement;
}