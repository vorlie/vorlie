// src/utils/helpers.ts
export const extractImageUrl = (
  url: string,
  application_id?: string
): string => {
  const fallback = "/images/default.png";
  if (!url) return fallback;

  try {
    if (url.startsWith("mp:external/")) {
      return `https://media.discordapp.net/external/${url.replace(
        "mp:external/",
        ""
      )}`;
    } else if (url.startsWith("spotify:")) {
      return url.replace("spotify:", "https://i.scdn.co/image/");
    } else if (application_id) {
      return `https://cdn.discordapp.com/app-assets/${application_id}/${url}.png`;
    }
    return fallback;
  } catch (error) {
    console.error("Error extracting image URL:", error);
    return fallback;
  }
};

export const getAvatarUrl = (
  userId: string,
  avatarId: string | null
): string => {
  if (!avatarId) {
    return `https://cdn.discordapp.com/embed/avatars/${Number(userId) % 5}.png`;
  }
  return `https://cdn.discordapp.com/avatars/${userId}/${avatarId}.${
    avatarId.startsWith("a_") ? "gif" : "png"
  }`;
};

export const getFontClass = (fontId: number | undefined): string => {
  switch (fontId) {
    case 2:
      return "font-tempo";
    case 3:
      return "font-sakura";
    case 4:
      return "font-jellybean";
    case 5:
      return "font-modern";
    case 6:
      return "font-medieval";
    case 7:
      return "font-8bit";
    case 8:
      return "font-vampyre";
    default:
      return ""; // ID 1 (gg sans) or any unknown ID
  }
};

export const getEffectClass = (effectId: number | undefined): string => {
  switch (effectId) {
    case 3:
      return "effect-neon";
    default:
      return "";
  }
};

export const decToHex = (dec: number) => {
  const hex = dec.toString(16);
  return '#' + '0'.repeat(6 - hex.length) + hex;
};

export const getBannerUrl = async (userId: string): Promise<string | null> => {
  const url = `/api/v1/user/${userId}/banner`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return data.banner_url;
  } catch (error) {
    console.error('Error fetching banner:', error);
    return null;
  }
};
