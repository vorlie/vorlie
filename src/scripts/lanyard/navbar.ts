// navbar.ts
import type { LanyardData, DiscordUser } from './interfaces';
import { getStatusColor } from './utils';

const generateNavbarHTML = ({ display_name = '', username }: DiscordUser): string => `
    <p style="margin: 4px auto; font-weight: 600; font-size: 20px;">
        ${display_name}<br><span style="color: var(--color-accent);">@${username}</span>
    </p>
`;

const updateAvatar = (avatarUrl: string, statusColor: string, avatarImg: HTMLImageElement) => {
    avatarImg.src = avatarUrl;
    avatarImg.alt = 'User Avatar';
    avatarImg.style.borderColor = statusColor;
};

const updateAvatarDecoration = (asset: string | undefined, avatarDecoImg: HTMLImageElement) => {
    if (asset) {
        avatarDecoImg.src = `https://cdn.discordapp.com/avatar-decoration-presets/${asset}.png`;
        avatarDecoImg.style.display = 'block';
    } else {
        avatarDecoImg.style.display = 'none';
    }
};

export const displayNavbar = (navbarData: LanyardData | null): void => {
    const navbar = document.querySelector('.vorlie');
    if (!navbar) return;

    // Set loading text only if navbarData is null
    if (!navbarData) {
        navbar.innerHTML = '<p>Loading...</p>';
        return; // Exit if no data is available
    }

    const userInfo = navbar.querySelector('.userinfo');
    if (userInfo) {
        userInfo.innerHTML = generateNavbarHTML(navbarData.discord_user);
    }

    const avatarImg = document.getElementById('avatar') as HTMLImageElement | null;
    const avatarDecoImg = document.getElementById('avatar-deco') as HTMLImageElement | null;

    if (avatarImg && navbarData.discord_user.avatar) {
        const avatarUrl = `https://cdn.discordapp.com/avatars/${navbarData.discord_user.id}/${navbarData.discord_user.avatar}.png`;
        const statusColor = getStatusColor(navbarData.discord_status);
        updateAvatar(avatarUrl, statusColor, avatarImg);
    }

    if (avatarDecoImg) {
        const asset = navbarData.discord_user.avatar_decoration_data?.asset;
        updateAvatarDecoration(asset, avatarDecoImg);
    }
};
