import { SpotifyData } from "../../types/lanyard";
import { LanyardTheme } from "../../data/lanyardThemes";
import { Activity } from "../../types/lanyard";
import ActivityCard from "./ActivityCard";
import SpotifyActivity from "./SpotifyActivity";

interface ThemedActivity {
  activity: Activity;
  theme: LanyardTheme;
}

interface PresenceActivitiesProps {
  customStatus?: Activity;
  spotify: SpotifyData | null;
  spotifyColor: number[] | null;
  themedActivities: ThemedActivity[];
}

function PresenceActivities({
  customStatus,
  spotify,
  spotifyColor,
  themedActivities,
}: PresenceActivitiesProps) {
  return (
    <div className="space-y-3 text-sm">
      {spotify && spotify.track_id && (
        <SpotifyActivity dominantColor={spotifyColor} spotify={spotify} />
      )}

      {themedActivities.length > 0 && (
        <div className="space-y-3">
          {themedActivities.map(({ activity, theme }) => (
            <ActivityCard
              key={activity.id || activity.name}
              activity={activity}
              theme={theme}
            />
          ))}
        </div>
      )}

      {!spotify && themedActivities.length === 0 && !customStatus && (
        <div className="text-center py-6">
          <p className="text-m3-on-surface-variant italic font-medium opacity-50">
            No current activities
          </p>
        </div>
      )}
    </div>
  );
}

export default PresenceActivities;
