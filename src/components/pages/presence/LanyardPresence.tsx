import { Activity, PresenceData } from "../../../types/lanyard";
import ActivityCard from "./ActivityCard";

interface LanyardPresenceProps {
  presence: PresenceData;
}

export default function LanyardPresence({ presence }: LanyardPresenceProps) {
  const { activities } = presence;
  return (
    <section className="lanyard">
      {activities.length > 0 ? (
        <div className="lanyard__activities">
          {activities.map((activity: Activity) => {
            return (
              <ActivityCard
                key={`${activity.application_id ?? activity.name}-${activity.id}`}
                activity={activity}
              />
            );
          })}
        </div>
      ) : (
        <div className="lanyard__empty">
          <span>Nothing currently active.</span>
        </div>
      )}
    </section>
  );
}
