// DATA STRUCTURES FOR AMAZON SHIFT TRACKER
// Defines shift templates, segments, and monthly shift rosters.

type SegmentType = "work_start" | "paid_break" | "unpaid_break" | "work_end";

export interface Segment {
  id: number;
  time: string; // HH:MM
  label: string;
  type: SegmentType; // Enforced literal types
  isUnpaid: boolean;
}

export interface ShiftTemplate {
  name: string;
  segments: Segment[];
}

export interface TimeSummary {
  status: string;
  elapsedTime: number; // minutes
  remainingTime: number; // minutes
  totalPaidTime: number; // minutes
  totalUnpaidTime: number; // minutes
  totalScheduledPaidTime: number; // minutes
}

const defineShiftTemplate = (template: ShiftTemplate): ShiftTemplate =>
  template;

export const shiftsData: Record<string, ShiftTemplate> = {
  "Day Shift": defineShiftTemplate({
    name: "Day Shift (07:00 - 17:30)",
    segments: [
      {
        id: 1,
        time: "07:00",
        label: "Work Start",
        type: "work_start",
        isUnpaid: false,
      },
      {
        id: 2,
        time: "09:30",
        label: "Work Break (15 min)",
        type: "paid_break",
        isUnpaid: false,
      },
      {
        id: 3,
        time: "09:45",
        label: "Work Resume",
        type: "work_start",
        isUnpaid: false,
      },
      {
        id: 4,
        time: "12:00",
        label: "Lunch Break (Unpaid)",
        type: "unpaid_break",
        isUnpaid: true,
      },
      {
        id: 5,
        time: "12:30",
        label: "Work Resume",
        type: "work_start",
        isUnpaid: false,
      },
      {
        id: 6,
        time: "14:45",
        label: "Work Break (15 min)",
        type: "paid_break",
        isUnpaid: false,
      },
      {
        id: 7,
        time: "15:00",
        label: "Work Resume",
        type: "work_start",
        isUnpaid: false,
      },
      {
        id: 8,
        time: "17:30",
        label: "Work End (Clock Out)",
        type: "work_end",
        isUnpaid: false,
      },
    ],
  }),
  "Day Shift (8h)": defineShiftTemplate({
    name: "Day Shift (07:00 - 15:30)",
    segments: [
      {
        id: 1,
        time: "07:00",
        label: "Work Start",
        type: "work_start",
        isUnpaid: false,
      },
      {
        id: 2,
        time: "09:30",
        label: "Work Break (15 min)",
        type: "paid_break",
        isUnpaid: false,
      },
      {
        id: 3,
        time: "09:45",
        label: "Work Resume",
        type: "work_start",
        isUnpaid: false,
      },
      {
        id: 4,
        time: "12:00",
        label: "Lunch Break (Unpaid)",
        type: "unpaid_break",
        isUnpaid: true,
      },
      {
        id: 5,
        time: "12:30",
        label: "Work Resume",
        type: "work_start",
        isUnpaid: false,
      },
      {
        id: 6,
        time: "14:45",
        label: "Work Break (15 min)",
        type: "paid_break",
        isUnpaid: false,
      },
      {
        id: 7,
        time: "15:00",
        label: "Work Resume",
        type: "work_start",
        isUnpaid: false,
      },
      {
        id: 8,
        time: "15:30",
        label: "Work End (Clock Out)",
        type: "work_end",
        isUnpaid: false,
      },
    ],
  }),
  "Night Shift": defineShiftTemplate({
    name: "Night Shift (18:30 - 05:00)",
    segments: [
      {
        id: 1,
        time: "18:30",
        label: "Work Start",
        type: "work_start",
        isUnpaid: false,
      },
      {
        id: 2,
        time: "21:00",
        label: "Work Break (15 min)",
        type: "paid_break",
        isUnpaid: false,
      },
      {
        id: 3,
        time: "21:15",
        label: "Work Resume",
        type: "work_start",
        isUnpaid: false,
      },
      {
        id: 4,
        time: "00:00",
        label: "Dinner Break (Unpaid)",
        type: "unpaid_break",
        isUnpaid: true,
      },
      {
        id: 5,
        time: "00:30",
        label: "Work Resume",
        type: "work_start",
        isUnpaid: false,
      },
      {
        id: 6,
        time: "03:00",
        label: "Work Break (15 min)",
        type: "paid_break",
        isUnpaid: false,
      },
      {
        id: 7,
        time: "03:15",
        label: "Work Resume",
        type: "work_start",
        isUnpaid: false,
      },
      {
        id: 8,
        time: "05:00",
        label: "Work End (Clock Out)",
        type: "work_end",
        isUnpaid: false,
      },
    ],
  }),
};

// Convert the object map into a prioritized array for internal use
export const SHIFT_TEMPLATES: ShiftTemplate[] = [
  shiftsData["Day Shift"],
  shiftsData["Day Shift (8h)"],
  shiftsData["Night Shift"],
];

// MONTHLY SCHEDULE DEFINITION
// Assign the shift type ('Day Shift', 'Day Shift (8h)' or 'Night Shift') to specific day numbers of the current month.
// Any day not listed is considered a free day.
export const MONTHLY_SHIFT_ROSTERS: Record<number, { [key: number]: string }> =
  {
    // October 2025
    9: {
      23: "Day Shift",
      24: "Day Shift",
      29: "Day Shift (8h)",
      30: "Day Shift",
      31: "Day Shift",
    },
    // November 2025
    10: {
      6: "Day Shift",
      7: "Day Shift",
      8: "Day Shift",
      12: "Day Shift",
      13: "Day Shift",
      14: "Day Shift",
      15: "Day Shift",
      19: "Night Shift",
      20: "Night Shift",
      21: "Night Shift",
      22: "Night Shift",
      23: "Night Shift",
      26: "Night Shift",
      27: "Night Shift",
      28: "Night Shift",
      29: "Night Shift",
    },
  };
