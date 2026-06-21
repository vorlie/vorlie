import { DiscordUser, PresenceData, Activity } from "../../types/lanyard";
import { getAvatarUrl, getEffectClass, getFontClass } from "../../utils/helpers";
import StatusBadge from "./StatusBadge";

interface PresenceHeaderProps {
  bannerUrl: string | null;
  customStatus?: Activity;
  discordUser: DiscordUser;
  status: PresenceData["discord_status"];
}

const fallbackBannerUrl = "https://us-east-1.tixte.net/uploads/cx.tixte.co/banner.gif";

function PresenceHeader({
  bannerUrl,
  customStatus,
  discordUser,
  status,
}: PresenceHeaderProps) {
  const displayNameStyles = discordUser.display_name_styles;
  const fontClass = getFontClass(displayNameStyles?.font_id);
  const effectClass = getEffectClass(displayNameStyles?.effect_id);
  const displayName = discordUser.global_name || discordUser.username;

  const avatarUrl = getAvatarUrl(discordUser.id, discordUser.avatar);
  const decorationAsset = discordUser.avatar_decoration_data?.asset;
  const decorationUrl = `https://cdn.discordapp.com/avatar-decoration-presets/${decorationAsset}.png`;
  const clanIconUrl = `https://cdn.discordapp.com/clan-badges/${discordUser.primary_guild?.identity_guild_id}/${discordUser.primary_guild?.badge}.png?size=16`;

  return (
    <>
      <div className="relative overflow-hidden rounded-none h-24 mb-4 border border-m3-outline/10 border-t-white/20 border-l-white/20 border-b-black/40 border-r-black/40 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.4)]">
        <img
          src={bannerUrl || fallbackBannerUrl}
          alt="User Banner"
          className="w-full h-full object-cover [-webkit-mask-image:linear-gradient(to_bottom,rgba(0,0,0,1)_50%,rgba(0,0,0,0)_100%)] [mask-image:linear-gradient(to_bottom,rgba(0,0,0,1)_50%,rgba(0,0,0,0)_100%)] opacity-60"
        />
      </div>

      <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 mb-4 items-start mt-[-4rem]">
        <div className="relative row-span-2 self-start w-16 h-16 rounded-full border-4 border-m3-surface-container">
          <img
            src={avatarUrl}
            alt={`${discordUser.username}'s Avatar`}
            className="w-full h-full rounded-full object-cover"
          />
          {decorationAsset && (
            <img
              src={decorationUrl}
              alt="Avatar Decoration"
              className="absolute inset-0 w-full h-full pointer-events-none transform scale-[1.25]"
            />
          )}
        </div>

        <div className="text-xl font-bold flex items-center self-center leading-tight tracking-tight text-m3-on-surface">
          {effectClass ? (
            <div className={effectClass}>
              <span className="glow-layer" aria-hidden="true">
                {displayName}
              </span>

              <span className={`text-layer ${fontClass}`}>
                <span className="truncate" title={displayName}>
                  {displayName}
                </span>
              </span>
            </div>
          ) : (
            <span className={`truncate ${fontClass}`} title={displayName}>
              {displayName}
            </span>
          )}
          {discordUser.primary_guild && clanIconUrl && (
            <span className="ml-2 inline-flex items-center bg-m3-surface rounded-none px-3 py-1 text-xs font-bold whitespace-nowrap border border-m3-outline/10 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.2)]">
              <img
                src={clanIconUrl}
                alt={`${discordUser.primary_guild.tag} Clan Icon`}
                className="h-3.5 w-3.5 mr-1.5 object-contain"
              />
              <span className="font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
                {discordUser.primary_guild.tag}
              </span>
            </span>
          )}
        </div>

        <StatusBadge customStatus={customStatus} status={status} />
      </div>
    </>
  );
}

export default PresenceHeader;
