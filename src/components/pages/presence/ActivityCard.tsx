import ActivityTimestamp from "./ActivityTimestamp";
import { Activity } from "../../../types/lanyard";
import { extractImageUrl } from "../../../utils/helpers";

interface ActivityCardProps {
  activity: Activity;
}

export default function ActivityCard({ activity }: ActivityCardProps) {
  const image = activity.assets?.large_image
    ? extractImageUrl(
        activity.assets.large_image,
        activity.application_id ?? "",
      )
    : null;

  const smallImage = activity.assets?.small_image
    ? extractImageUrl(
        activity.assets.small_image,
        activity.application_id ?? "",
      )
    : null;

  return (
    <article className="activity-card">
      <div className="activity-card__media">
        {image ? (
          <img src={image} alt="" className="activity-card__image" />
        ) : (
          <div className="activity-card__placeholder">
            <span className="material-symbols-rounded">play_circle</span>
          </div>
        )}

        {smallImage && (
          <img src={smallImage} alt="" className="activity-card__small-image" />
        )}
      </div>

      <div className="activity-card__content">
        <div className="activity-header">
          <span className="activity-card__label">
            {getActivityLabel(activity)}
          </span>
          <h3 className="activity-card__name">{activity.name}</h3>
        </div>

        {activity.details && (
          <p className="activity-card__details">{activity.details}</p>
        )}

        {activity.state && (
          <p className="activity-card__state">{activity.state}</p>
        )}

        {activity.timestamps?.start && (
          <ActivityTimestamp
            startTime={activity.timestamps.start}
            endTime={activity.timestamps.end}
          />
        )}
      </div>
    </article>
  );
}

function getActivityLabel(activity: Activity): string {
  switch (activity.type) {
    case 0:
      return "Playing";

    case 1:
      return "Streaming";

    case 2:
      return "Listening";

    case 3:
      return "Watching";

    case 4:
      return "Custom status";

    case 5:
      return "Competing";

    default:
      return "Activity";
  }
}
