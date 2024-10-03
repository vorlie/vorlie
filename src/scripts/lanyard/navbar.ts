// navbar.ts
import type { LanyardData, DiscordUser } from './interfaces';
import { getStatusColor } from './lanyard';

const generateNavbarHTML = (navbarData: DiscordUser): string => {
    const displayName = navbarData.display_name || '';
    const username = navbarData.username;

    return `
        <p style="margin: 4px auto;font-weight: 600;font-size: 20px;">${displayName}<br><span style="color: var(--color-accent);">@${username}</span></p>
    `;
};

export const displayNavbar = (navbarData: LanyardData | null): void => {
    const navbar = document.querySelector('.vorlie');
    if (!navbar || !navbarData) {
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
        avatarDecoImg.style.display = 'block';
    } else if (avatarDecoImg) {
        avatarDecoImg.style.display = 'none';
    }
};
