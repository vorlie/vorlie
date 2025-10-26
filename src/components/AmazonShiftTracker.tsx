import React, { useState, useEffect, useMemo } from "react";
import {
  TimeSummary,
  SHIFT_TEMPLATES,
  MONTHLY_SHIFT_ROSTERS,
  shiftsData,
} from "../data/amazonShifts";

const shiftColors: Record<string, string> = {
  "Day Shift": "bg-slate-500 text-white",
  "Day Shift (8h)": "bg-slate-600 text-white",
  "Night Shift": "bg-slate-700 text-white",
  off: "bg-gray-700 text-gray-400",
};

const timeToMinutes = (time: string, referenceStart: string): number => {
  const [refHour, refMinute] = referenceStart.split(":").map(Number);
  const [hour, minute] = time.split(":").map(Number);
  let minutes = hour * 60 + minute;
  const refTotalMinutes = refHour * 60 + refMinute;
  if (minutes < refTotalMinutes - 180) minutes += 24 * 60;
  return minutes;
};

const formatDuration = (totalMinutes: number): string => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours}h ${minutes}m`;
};

const minutesToTimeDisplay = (
  startMoment: Date,
  elapsedMinutes: number
): string => {
  const current = new Date(startMoment.getTime() + elapsedMinutes * 60 * 1000);
  const hour = current.getHours();
  const minute = current.getMinutes();
  return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
};

const AmazonShiftTracker: React.FC = () => {
  const [currentTimestamp, setCurrentTimestamp] = useState(Date.now());
  const [showSchedule, setShowSchedule] = useState(false);
  const [monthOffset, setMonthOffset] = useState(0);

  const currentDate = new Date(currentTimestamp);
  const currentDateNum = currentDate.getDate();
  const currentMonth = currentDate.toLocaleString("default", { month: "long" });
  const currentMonthIndex = currentDate.getMonth();
  const nextMonthIndex = (currentMonthIndex + 1) % 12;

  const roster =
    MONTHLY_SHIFT_ROSTERS[currentMonthIndex] ||
    MONTHLY_SHIFT_ROSTERS[nextMonthIndex] ||
    {};

  const scheduledShiftName = roster[currentDateNum] || null;

  // --- Logic that depends on a scheduled shift ---
  // Default to a shift for calculated values, but only use if scheduledShiftName is present
  const activeShift = useMemo(() => {
    return (
      SHIFT_TEMPLATES.find((s) =>
        s.name.startsWith(scheduledShiftName || "")
      ) || shiftsData["Day Shift"] // Fallback for calculations, but rendered only if scheduled
    );
  }, [scheduledShiftName]);

  // These will only be used in the main shift view, but need to be calculated to prevent errors
  const shiftStartTimeStr = activeShift.segments[0].time;
  const shiftStartMoment = useMemo(() => {
    const [h, m] = shiftStartTimeStr.split(":").map(Number);
    const now = new Date();
    const start = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      h,
      m
    );
    // Shift date correction logic
    if (h > 12 && now.getHours() < 6) start.setDate(start.getDate() - 1);
    return start;
  }, [shiftStartTimeStr]);

  const currentElapsedMinutes = useMemo(() => {
    // Only calculate elapsed time if a shift is scheduled, otherwise it's 0
    if (!scheduledShiftName) return 0;

    const elapsedMs = currentTimestamp - shiftStartMoment.getTime();
    return Math.max(0, Math.floor(elapsedMs / 60000));
  }, [currentTimestamp, shiftStartMoment, scheduledShiftName]);

  const shiftStartMinutes = useMemo(
    () =>
      timeToMinutes(activeShift.segments[0].time, activeShift.segments[0].time),
    [activeShift]
  );
  const shiftEndMinutes = useMemo(
    () =>
      timeToMinutes(
        activeShift.segments[activeShift.segments.length - 1].time,
        activeShift.segments[0].time
      ),
    [activeShift]
  );

  const totalShiftDuration = shiftEndMinutes - shiftStartMinutes;
  const shiftStarted = currentElapsedMinutes > 0;
  const shiftCompleted = currentElapsedMinutes >= totalShiftDuration;

  const timeSummary: TimeSummary = useMemo(() => {
    if (!scheduledShiftName) {
      // Return a placeholder summary for the free day
      return {
        status: "Free Day",
        elapsedTime: 0,
        remainingTime: 0,
        totalPaidTime: 0,
        totalUnpaidTime: 0,
        totalScheduledPaidTime: 0,
      };
    }

    if (!shiftStarted)
      return {
        status: `Awaiting ${activeShift.segments[0].time} Start`,
        elapsedTime: 0,
        remainingTime: totalShiftDuration,
        totalPaidTime: 0,
        totalUnpaidTime: 0,
        totalScheduledPaidTime: 0,
      };

    let status = "Pre-Shift";
    let totalPaidTime = 0; // These were incorrectly set to 0 initially and never updated inside the loop
    let totalUnpaidTime = 0; // These were incorrectly set to 0 initially and never updated inside the loop
    let totalScheduledPaidTime = 0;

    activeShift.segments.forEach((segment, i) => {
      const segStart = timeToMinutes(
        segment.time,
        activeShift.segments[0].time
      );
      const next = activeShift.segments[i + 1];
      const segEnd = next
        ? timeToMinutes(next.time, activeShift.segments[0].time)
        : shiftEndMinutes;
      const duration = segEnd - segStart;

      const isPaid = segment.type === "work_start" || segment.type === "paid_break";

      if (isPaid) {
          totalScheduledPaidTime += duration;
      }

      // Update total paid/unpaid time based on elapsed time
      const timeInSegment = Math.max(0, Math.min(duration, currentElapsedMinutes - (segStart - shiftStartMinutes)));

      if (isPaid) {
          totalPaidTime += timeInSegment;
      } else {
          totalUnpaidTime += timeInSegment;
      }


      if (
        currentElapsedMinutes >= segStart - shiftStartMinutes &&
        currentElapsedMinutes < segEnd - shiftStartMinutes
      ) {
        if (segment.type === "work_start") status = "Working (Paid)";
        if (segment.type === "paid_break") status = "On Paid Break";
        if (segment.type === "unpaid_break") status = "On Unpaid Break";
      }
    });

    const remainingTime = totalShiftDuration - currentElapsedMinutes;
    if (shiftCompleted)
      return {
        status: "Shift Completed!",
        elapsedTime: totalShiftDuration,
        remainingTime: 0,
        // For completed shift, paid/unpaid time is the total scheduled time
        totalPaidTime: totalScheduledPaidTime,
        totalUnpaidTime: totalShiftDuration - totalScheduledPaidTime,
        totalScheduledPaidTime,
      };

    return {
      status,
      elapsedTime: currentElapsedMinutes,
      remainingTime,
      totalPaidTime, // Corrected logic: Use accumulated time, not total scheduled time
      totalUnpaidTime, // Corrected logic: Use accumulated time, not total scheduled time
      totalScheduledPaidTime,
    };
  }, [
    currentElapsedMinutes,
    activeShift,
    totalShiftDuration,
    shiftStarted,
    shiftCompleted,
    shiftEndMinutes,
    shiftStartMinutes,
    scheduledShiftName
  ]);

  useEffect(() => {
    const interval = setInterval(() => setCurrentTimestamp(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  // --- MONTHLY SCHEDULE VIEW CALCULATIONS ---
  const displayMonthIndex = (currentMonthIndex + monthOffset + 12) % 12;
  const displayMonthName = new Date(2025, displayMonthIndex).toLocaleString(
    "default",
    {
      month: "long",
    }
  );
  const displayRoster = MONTHLY_SHIFT_ROSTERS[displayMonthIndex] || {};

  // RENDER LOGIC: Check for scheduledShiftName and render the appropriate main view
  let mainContent;

  if (!scheduledShiftName) {
    // FREE DAY VIEW
    mainContent = (
      <div className="w-full mx-auto p-2 text-center bg-gray-800/80 rounded-lg">
        <h1 className="text-2xl font-bold text-green-400">Free Day</h1>
        <p className="text-gray-300 mt-2">
          No shift scheduled for {currentMonth} {currentDateNum}.
        </p>
        <p className="text-xs text-gray-500 mt-4">
          Current time: {currentDate.toLocaleTimeString()}
        </p>
      </div>
    );
  } else {
    // SHIFT TRACKING VIEW
    const currentDisplayedTime = minutesToTimeDisplay(
      shiftStartMoment,
      currentElapsedMinutes
    );
    const progressPercent = shiftStarted
      ? Math.min(100, (currentElapsedMinutes / totalShiftDuration) * 100)
      : 0;

    mainContent = (
      <>
        {/* Status boxes */}
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <div className="flex-1 bg-gray-800/80 p-4 rounded-lg">
            <p className="text-sm text-gray-400">
              Status ({currentMonth} {currentDateNum} —{" "}
              {activeShift.name.split(" ")[0]})
            </p>
            <h2
              className={`text-xl font-semibold mt-1 ${
                shiftCompleted ? "text-green-400" : "text-white"
              }`}
            >
              {timeSummary.status}
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              {currentDisplayedTime} | {activeShift.segments[0].time} →{" "}
              {activeShift.segments[activeShift.segments.length - 1].time}
            </p>
          </div>

          <div className="flex-1 bg-gray-800/80 p-4 rounded-lg">
            <p className="text-sm text-gray-400">Remaining</p>
            <h2 className="text-xl font-semibold text-white mt-1">
              {formatDuration(timeSummary.remainingTime)}
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              Paid time left: {formatDuration(timeSummary.totalScheduledPaidTime - timeSummary.totalPaidTime)}
            </p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="relative h-3 bg-gray-700 rounded-full overflow-hidden">
          <div
            className={`absolute h-full transition-all duration-1000 ${
              shiftCompleted ? "bg-green-400" : "bg-blue-400"
            }`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <p className="text-center text-sm text-gray-400 mt-3">
          Elapsed:{" "}
          <span className="text-blue-400 font-medium">
            {formatDuration(timeSummary.elapsedTime)}
          </span>
        </p>
      </>
    );
  }

  // Final render combines the main content with the monthly schedule component
  return (
    <div className="w-full bg-gray-900/40 p-4 rounded-xl shadow-lg">
      {mainContent}

      {/* Expandable monthly schedule */}
      <div className="mt-6">
        <button
          onClick={() => setShowSchedule((prev) => !prev)}
          className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 text-sm"
        >
          {showSchedule ? "Hide" : "Show"} Monthly Schedule
        </button>

        {showSchedule && (
          <div className="mt-4 bg-gray-800/70 p-4 rounded-lg">
            {/* Month navigation */}
            <div className="flex justify-between items-center mb-3">
              <button
                onClick={() => setMonthOffset((o) => o - 1)}
                className="px-3 py-1 bg-gray-700 rounded hover:bg-gray-600 text-sm"
              >
                ← Prev
              </button>
              <h3 className="text-lg font-semibold text-white">
                {displayMonthName}
              </h3>
              <button
                onClick={() => setMonthOffset((o) => o + 1)}
                className="px-3 py-1 bg-gray-700 rounded hover:bg-gray-600 text-sm"
              >
                Next →
              </button>
            </div>

            {/* Weekday headers */}
            <div className="grid grid-cols-7 gap-2 text-center font-semibold text-gray-300 mb-1">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day}>{day}</div>
              ))}
            </div>

            {/* Days grid */}
            <div className="grid grid-cols-7 gap-2 text-center">
              {(() => {
                const today = new Date();
                const firstDayOfMonth = new Date(
                  today.getFullYear(),
                  displayMonthIndex,
                  1
                ).getDay();
                const daysInMonth = new Date(
                  today.getFullYear(),
                  displayMonthIndex + 1,
                  0
                ).getDate();

                const blanks = Array.from(
                  { length: firstDayOfMonth },
                  (_, i) => (
                    <div
                      key={`blank-${i}`}
                      className="bg-gray-900 p-2 rounded"
                    ></div>
                  )
                );

                const dayCells = Array.from({ length: daysInMonth }, (_, i) => {
                  const day = i + 1;
                  const shiftType = displayRoster[day] || "off";
                  const colorClass = shiftColors[shiftType] || shiftColors.off;
                  const isToday =
                    day === today.getDate() &&
                    displayMonthIndex === today.getMonth() &&
                    // Only highlight today if the displayed month is the current month
                    monthOffset === 0;

                  return (
                    <div
                      key={day}
                      className={`p-2 rounded font-medium ${colorClass} ${
                        isToday ? "ring-2 ring-blue-400" : ""
                      }`}
                    >
                      {day}
                    </div>
                  );
                });

                return [...blanks, ...dayCells];
              })()}
            </div>
            <div className="flex justify-center flex-wrap gap-4 text-sm text-gray-300 mt-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 ring-2 ring-blue-400 rounded-full"></span> Today
              </div>
              <div className="flex items-center gap-2">
                <span className={`w-3 h-3 ${shiftColors["Day Shift"]} rounded`}></span> Day Shift
              </div>
              <div className="flex items-center gap-2">
                <span className={`w-3 h-3 ${shiftColors["Day Shift (8h)"]} rounded`}></span> Day Shift (8h)
              </div>
              <div className="flex items-center gap-2">
                <span className={`w-3 h-3 ${shiftColors["Night Shift"]} rounded`}></span> Night Shift
              </div>
              <div className="flex items-center gap-2">
                <span className={`w-3 h-3 ${shiftColors.off} rounded`}></span> Day Off
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AmazonShiftTracker;
