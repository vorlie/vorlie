import { fetchPresence } from './lanyard';

const updateIframe = async () => {
    const presenceData = await fetchPresence();
    if (!presenceData) return;

    const iframeImage = document.getElementById('iframeImage') as HTMLImageElement;
    const iframeName = document.getElementById('iframeName') as HTMLParagraphElement;

    if (iframeImage && presenceData.discord_user.avatar) {
        iframeImage.src = `https://cdn.discordapp.com/avatars/${presenceData.discord_user.id}/${presenceData.discord_user.avatar}.png`;
        iframeImage.alt = 'User Avatar';
    }

    if (iframeName) {
        iframeName.textContent = presenceData.discord_user.username;
    }
};

document.addEventListener('DOMContentLoaded', updateIframe);