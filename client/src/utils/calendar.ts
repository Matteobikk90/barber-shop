import type { OpeningHoursByDate } from "libs/react-timecalendar/build/types";

export const openHours = [
  [0, 0],
  [0, 0],
  [9, 19],
  [11, 20],
  [9, 19],
  [9, 19],
  [9, 18],
];

// One-off openings, keyed by the full date in Europe/Rome.
export const openingHoursByDate: OpeningHoursByDate = {
  "2026-12-28": [
    [9, 13],
    [14, 17],
  ],
};
