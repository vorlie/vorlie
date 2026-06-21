import ActivityTimestamp from "./ActivityTimestamp";
import { LanyardTheme } from "../../data/lanyardThemes";
import { Activity } from "../../types/lanyard";
import { extractImageUrl } from "../../utils/helpers";

interface ActivityCardProps {
  activity: Activity;
  theme: LanyardTheme;
}

function ActivityCard({ activity, theme }: ActivityCardProps) {
  return (
    <div className="bg-m3-surface-container border border-m3-outline/10 rounded-none p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.4)] hover:border-m3-outline/30 transition-all duration-300 border-t-white/20 border-l-white/20 border-b-black/40 border-r-black/40">
      <div className="flex items-center gap-4">
        <div className="relative flex-shrink-0">
          {activity.assets?.large_image ? (
            <img
              src={extractImageUrl(
                activity.assets.large_image,
                activity.application_id || "",
              )}
              alt={activity.name}
              className="w-16 h-16 rounded-none object-cover"
            />
          ) : (
            <div className="w-16 h-16 rounded-none flex items-center justify-center bg-m3-primary/10">
              <theme.icon size={32} className="text-m3-primary" />
            </div>
          )}
          {activity.assets?.small_image && (
            <img
              src={extractImageUrl(
                activity.assets.small_image,
                activity.application_id || "",
              )}
              alt="Small asset"
              className="w-6 h-6 rounded-none absolute -bottom-1 -right-1 border-2 border-m3-surface-container"
            />
          )}
        </div>
        <div className="flex-grow overflow-hidden">
          <p className="text-m3-primary text-xs font-black uppercase tracking-widest flex items-center gap-2 mb-0.5">
            <theme.icon size={12} /> {theme.label} {theme.name}
          </p>
          <p className="text-m3-on-surface font-bold text-base truncate tracking-tight">
            {activity.name}
          </p>
          {activity.details && (
            <p className="text-m3-on-surface-variant text-sm font-medium truncate opacity-80">
              {activity.details}
            </p>
          )}
          {activity.state && (
            <p className="text-m3-on-surface-variant text-xs truncate opacity-60">
              {activity.state}
            </p>
          )}
          {theme.repoUrl && (
            <a
              href={theme.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] font-black uppercase tracking-wider text-m3-primary bg-m3-primary/10 border border-m3-primary/20 px-3 py-1 rounded-none mt-2 inline-block hover:bg-m3-primary hover:text-m3-on-primary transition-all duration-200"
            >
              View Repository
            </a>
          )}
        </div>
      </div>
      {activity.timestamps?.start && (
        <div className="mt-3">
          <ActivityTimestamp
            startTime={activity.timestamps.start}
            endTime={activity.timestamps.end}
            color="var(--color-m3-primary)"
            colorSecondary="var(--color-m3-on-secondary)"
          />
        </div>
      )}
    </div>
  );
}

export default ActivityCard;
