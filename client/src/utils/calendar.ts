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

const annualClosures = new Set([
  "01-01", "01-06", "04-25", "05-01", "06-02", "06-06", "06-13",
  "07-03", "07-04", "08-13", "08-14", "08-15", "08-16", "08-17",
  "08-18", "11-01", "12-08", "12-25", "12-26",
]);

export const bookingSlotMinutes = 30;
export const lunchStart = 13 * 60;
export const lunchEnd = 14 * 60;

export type SpecialOpening = { from: number; to: number };
export type SpecialOpenings = Readonly<Partial<Record<string, SpecialOpening>>>;

// Keep the already configured opening if the settings document doesn't exist yet.
export const initialSpecialOpenings: SpecialOpenings = {
  "2026-12-28": { from: 9 * 60, to: 17 * 60 },
};

export const getWeekday = (date: string): number | undefined => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return undefined;
  const utc = new Date(`${date}T00:00:00.000Z`);
  if (Number.isNaN(utc.getTime()) || utc.toISOString().slice(0, 10) !== date) {
    return undefined;
  }
  return utc.getUTCDay();
};

export const isNormallyClosedDate = (date: string): boolean => {
  const weekday = getWeekday(date);
  if (weekday === undefined) return false;
  const [from, to] = openHours[weekday];
  return from === to || annualClosures.has(date.slice(5));
};

export const isValidSpecialOpening = (
  value: unknown
): value is SpecialOpening => {
  if (!value || typeof value !== "object") return false;
  const { from, to } = value as SpecialOpening;
  return (
    Number.isInteger(from) &&
    Number.isInteger(to) &&
    from % bookingSlotMinutes === 0 &&
    to % bookingSlotMinutes === 0 &&
    from >= 0 &&
    to <= 24 * 60 &&
    from < to &&
    (from < lunchStart || to > lunchEnd)
  );
};

export const getOpeningHoursByDate = (
  openings: SpecialOpenings
): OpeningHoursByDate => {
  const byDate: Record<string, NonNullable<OpeningHoursByDate[string]>> = {};
  for (const [date, opening] of Object.entries(openings)) {
    if (!isNormallyClosedDate(date) || !isValidSpecialOpening(opening)) continue;
    const morningEnd = Math.min(opening.to, lunchStart);
    const afternoonStart = Math.max(opening.from, lunchEnd);
    if (opening.from < morningEnd) {
      byDate[date] =
        opening.to > afternoonStart
          ? [[opening.from / 60, morningEnd / 60], [afternoonStart / 60, opening.to / 60]]
          : [[opening.from / 60, morningEnd / 60]];
    } else {
      byDate[date] = [[afternoonStart / 60, opening.to / 60]];
    }
  }
  return byDate;
};
