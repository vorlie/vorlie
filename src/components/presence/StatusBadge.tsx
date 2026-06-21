import { CSSProperties } from "react";
import { Activity, PresenceData } from "../../types/lanyard";
import CustomStatus from "./CustomStatus";
import {
  getStatusText,
  statusBgColors,
  statusPulseColors,
  statusTextColors,
} from "./presenceUtils";

interface StatusBadgeProps {
  customStatus?: Activity;
  status: PresenceData["discord_status"];
}

function StatusBadge({ customStatus, status }: StatusBadgeProps) {
  return (
    <div className="text-xs text-m3-on-surface-variant truncate self-start leading-tight bg-m3-surface rounded-none px-3 py-1.5 mr-2 flex items-center gap-2 border border-m3-outline/10 border-t-black/50 border-l-black/50 border-b-white/10 border-r-white/10">
      <div className="relative flex items-center justify-center w-2 h-2">
        <div
          className="absolute inset-0 rounded-none status-indicator-pulse"
          style={
            {
              "--pulse-color": statusPulseColors[status],
            } as CSSProperties
          }
        ></div>
        <div
          className={`relative w-2 h-2 rounded-none ${statusBgColors[status]}`}
        ></div>
      </div>
      <span
        className={`${statusTextColors[status]} font-bold uppercase tracking-wider`}
      >
        {getStatusText(status)}
      </span>
      {customStatus && <CustomStatus customStatus={customStatus} />}
    </div>
  );
}

export default StatusBadge;
