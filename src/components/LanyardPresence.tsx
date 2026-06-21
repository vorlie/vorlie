import { useState, useEffect } from "react";
import { getBannerUrl } from "../utils/helpers";
import useDominantColor from "../hooks/useDominantColor";
import { useLanyard } from "../hooks/useLanyard";
import PresenceActivities from "./presence/PresenceActivities";
import PresenceHeader from "./presence/PresenceHeader";
import {
  getActivityTheme,
  getDisplayActivities,
} from "./presence/presenceUtils";

interface LanyardPresenceProps {
  discordId: string;
}

function LanyardPresence({ discordId }: LanyardPresenceProps) {
  const presenceData = useLanyard(discordId);
  const [bannerUrl, setBannerUrl] = useState<string | null>(null);
  const spotifyColor = useDominantColor(
    presenceData?.spotify?.album_art_url || null,
  );

  useEffect(() => {
    if (discordId) {
      getBannerUrl(discordId).then((url) => {
        if (url) setBannerUrl(url);
      });
    }
  }, [discordId]);

  if (!presenceData) {
    return <div className="h-24 text-gray-500 animate-pulse">Loading...</div>;
  }

  const { discord_status, activities, spotify, discord_user } = presenceData;
  const customStatus = activities.find((act) => act.type === 4);

  const themedActivities = getDisplayActivities(activities, Boolean(spotify))
    .map((activity) => ({
      activity,
      theme: getActivityTheme(activity),
    }));

  return (
    <div className="">
      <div className="relative">
        <PresenceHeader
          bannerUrl={bannerUrl}
          customStatus={customStatus}
          discordUser={discord_user}
          status={discord_status}
        />
        <hr className="border-m3-outline/10 my-6" />
        <PresenceActivities
          customStatus={customStatus}
          spotify={spotify}
          spotifyColor={spotifyColor}
          themedActivities={themedActivities}
        />
      </div>
    </div>
  );
}

export default LanyardPresence;
