// src/utils/timeFormatter.ts

export const formatRelativeTime = (start: number, end?: number): string => {
  const now = Date.now();
  const elapsed = end ? end - now : now - start;

  if (end && elapsed <= 0) {
    return "ended";
  }

  const absElapsed = Math.abs(elapsed);
  const hours = Math.floor(absElapsed / 3600000);
  const minutes = Math.floor((absElapsed % 3600000) / 60000);
  const seconds = Math.floor((absElapsed % 60000) / 1000);

  const formattedTime = `${hours > 0 ? hours + ":" : ""}${
    hours > 0 && minutes < 10 ? "0" : ""
  }${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

  return end ? `${formattedTime} left` : `${formattedTime} elapsed`;
};

export const formatTotalDuration = (start: number, end: number): string => {
  if (end <= start) return "0:00";
  const duration = end - start;
  const hours = Math.floor(duration / 3600000);
  const minutes = Math.floor((duration % 3600000) / 60000);
  const seconds = Math.floor((duration % 60000) / 1000);
  return `${hours > 0 ? hours + ":" : ""}${
    hours > 0 && minutes < 10 ? "0" : ""
  }${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

export const calculateProgressPercent = (
  start: number,
  end: number
): number | null => {
  const now = Date.now();
  if (now < start || end <= start) return 0;
  if (now >= end) return 100;

  const totalDuration = end - start;
  const elapsed = now - start;
  return Math.min((elapsed / totalDuration) * 100, 100);
};
