import { useEffect, useState } from "react";

import {
  formatRelativeTime,
  calculateProgressPercent,
} from "../../../utils/timeFormatter";

interface ActivityTimestampProps {
  startTime: number;
  endTime?: number;
  color?: string;
  colorSecondary?: string;
}

export default function ActivityTimestamp({
  startTime,
  endTime,
  color = "var(--color-accent)",
  colorSecondary = "var(--color-surface)",
}: ActivityTimestampProps) {
  const [displayTime, setDisplayTime] = useState(() =>
    formatRelativeTime(startTime, endTime),
  );

  const [progress, setProgress] = useState<number | null>(() =>
    endTime ? calculateProgressPercent(startTime, endTime) : null,
  );

  useEffect(() => {
    const update = () => {
      setDisplayTime(formatRelativeTime(startTime, endTime));

      if (endTime) {
        setProgress(calculateProgressPercent(startTime, endTime));
      } else {
        setProgress(null);
      }
    };

    update();

    const interval = window.setInterval(update, 1000);

    return () => window.clearInterval(interval);
  }, [startTime, endTime]);

  return (
    <div className="activity-timestamp">
      <span className="activity-timestamp__label" style={{ color }}>
        {displayTime}
      </span>

      {progress !== null && endTime && (
        <div
          className="activity-timestamp__track"
          style={{ backgroundColor: colorSecondary }}
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="activity-timestamp__progress"
            style={{
              width: `${progress}%`,
              backgroundColor: color,
            }}
          />
        </div>
      )}
    </div>
  );
}
