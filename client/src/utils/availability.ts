import { getRomeDateTimeParts } from "utils/bookingDate";
import { openHours } from "utils/calendar";

const CLOSED_TIMES = new Set(["13-00", "13-30", "19-30"]);

// These recurring closures are currently rendered as unavailable in App.css.
const CLOSED_DAYS = new Set([
  "01-01",
  "06-01",
  "25-04",
  "01-05",
  "02-06",
  "06-06",
  "13-06",
  "03-07",
  "04-07",
  "13-08",
  "14-08",
  "15-08",
  "16-08",
  "17-08",
  "18-08",
  "01-11",
  "08-12",
  "25-12",
  "26-12",
]);

const pad2 = (value: number): string => (value < 10 ? `0${value}` : `${value}`);

/** Match the selectable 30-minute boxes using Europe/Rome only. */
export const isSelectableRomeBookingStart = (value: string | Date): boolean => {
  const parts = getRomeDateTimeParts(value);
  const dayOfWeek = new Date(
    Date.UTC(parts.year, parts.month - 1, parts.day)
  ).getUTCDay();
  const dayHours = openHours[dayOfWeek];
  if (!dayHours || dayHours.length < 2 || dayHours[0] === dayHours[1]) {
    return false;
  }

  if (parts.second !== 0 || ![0, 30].includes(parts.minute)) return false;

  const minutes = parts.hour * 60 + parts.minute;
  const openingMinutes = dayHours[0] * 60;
  const closingMinutes = dayHours[1] * 60;
  if (minutes < openingMinutes || minutes >= closingMinutes) return false;

  const timeKey = `${pad2(parts.hour)}-${pad2(parts.minute)}`;
  const dayKey = `${pad2(parts.day)}-${pad2(parts.month)}`;
  return !CLOSED_TIMES.has(timeKey) && !CLOSED_DAYS.has(dayKey);
};
