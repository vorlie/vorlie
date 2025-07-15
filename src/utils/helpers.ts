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
