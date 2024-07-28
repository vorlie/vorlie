// navbar.ts
import type { LanyardData, DiscordUser } from './interfaces';
import { fetchPresence, getStatusColor } from './lanyard';

const generateNavbarHTML = (navbarData: DiscordUser): string => {
    const displayName = navbarData.display_name || '';
    const username = navbarData.username;

    return `
        <p style="margin: 4px auto;font-weight: 600;font-size: 20px; color: var(--color-2);">${displayName}<span style="color: var(--color-2);"> @${username}</span></p>
    `;
};

export const displayNavbar = (navbarData: LanyardData | null): void => {
    const navbar = document.querySelector('.vorlie');
    const statusContainer = document.querySelector('.status') as HTMLElement;
    if (!navbar || !navbarData || !statusContainer) {
        if (navbar) {
            navbar.innerHTML = '<p>Loading...</p>';
        }
        return;
    }

    const avatarImg = document.getElementById('avatar') as HTMLImageElement;
    const avatarDecoImg = document.getElementById('avatar-deco') as HTMLImageElement;
    const userInfo = navbar.querySelector('.userinfo');
    

    if (userInfo) {
        userInfo.innerHTML = generateNavbarHTML(navbarData.discord_user);
    }

    if (avatarImg) {
        avatarImg.src = `https://cdn.discordapp.com/avatars/${navbarData.discord_user.id}/${navbarData.discord_user.avatar}.png`;
        avatarImg.alt = 'User Avatar';
        avatarImg.style.borderColor = getStatusColor(navbarData.discord_status);
    }

    if (navbarData.discord_user.avatar_decoration_data && avatarDecoImg) {
        avatarDecoImg.src = `https://cdn.discordapp.com/avatar-decoration-presets/${navbarData.discord_user.avatar_decoration_data.asset}.png`;
        avatarDecoImg.alt = 'Avatar Decoration';
        avatarDecoImg.style.display = 'block';
    } else if (avatarDecoImg) {
        avatarDecoImg.style.display = 'none';
    }

    const customStatus = navbarData.activities.find(activity => activity.type === 4);
    if (customStatus) {
        let emojiElement: HTMLImageElement | null = null;
        let statusTextElement: HTMLSpanElement | HTMLAnchorElement;

        if (customStatus.emoji) {
            emojiElement = document.createElement('img');
            emojiElement.src = `https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/72x72/${customStatus.emoji.name.codePointAt(0)!.toString(16)}.png` ?? customStatus.emoji.name;
            emojiElement.style.width = '24px';
            emojiElement.style.height = '24px';
            emojiElement.style.marginRight = '8px';
        }

        const statusState = customStatus.state ?? '';
        if (statusState.startsWith('https://')) {
            const anchorElement = document.createElement('a') as HTMLAnchorElement;
            anchorElement.href = statusState;
            anchorElement.textContent = statusState;
            anchorElement.target = '_blank';
            anchorElement.rel = 'noopener noreferrer';
            anchorElement.style.color = 'var(--accent-gradient)';
            anchorElement.style.textDecoration = 'underline';

            statusTextElement = anchorElement;
        } else {
            statusTextElement = document.createElement('span');
            statusTextElement.textContent = statusState || 'No status';
        }

        statusContainer.innerHTML = '';
        if (emojiElement) {
            statusContainer.appendChild(emojiElement);
        }
        statusContainer.appendChild(statusTextElement);
        statusContainer.style.display = 'flex';
    } else {
        statusContainer.innerHTML = '';
        statusContainer.style.display = 'none';
    }
};
