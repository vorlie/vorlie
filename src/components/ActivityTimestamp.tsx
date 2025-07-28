// src/components/ActivityTimestamp.tsx
import React, { useState, useEffect } from "react";
import {
  formatRelativeTime,
  calculateProgressPercent,
} from "../utils/timeFormatter";

interface ActivityTimestampProps {
  startTime: number;
  endTime?: number;
}

const ActivityTimestamp: React.FC<ActivityTimestampProps> = ({
  startTime,
  endTime,
}) => {
  const [displayTime, setDisplayTime] = useState<string>(
    formatRelativeTime(startTime, endTime)
  );
  const [progress, setProgress] = useState<number | null>(
    endTime ? calculateProgressPercent(startTime, endTime) : null
  );

  useEffect(() => {
    const updateTimestamps = () => {
      setDisplayTime(formatRelativeTime(startTime, endTime));
      if (endTime) {
        setProgress(calculateProgressPercent(startTime, endTime));
      }
    };

    updateTimestamps();

    const intervalId = setInterval(updateTimestamps, 1000);
    return () => clearInterval(intervalId);
  }, [startTime, endTime]);

  return (
    <div className="mt-1 text-xs text-gray-400">
      <p>{displayTime}</p>
      {progress !== null && endTime && (
        <div className="w-full bg-gray-600 rounded-full h-1 mt-1 overflow-hidden">
          <div
            className="bg-blue-400 h-1 rounded-full transition-all duration-1000 ease-linear"
            style={{ width: `${progress}%` }}
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
          ></div>
        </div>
      )}
    </div>
  );
};

export default ActivityTimestamp;
