import type { OpeningHoursByDate } from "libs/react-timecalendar/build/types";
import {
  getCalendarDateKey,
  getRomeDateTimeParts,
  toDateKey,
} from "utils/bookingDate";
import {
  bookingSlotMinutes,
  getWeekday,
  isNormallyClosedDate,
  lunchEnd,
  lunchStart,
  openHours,
} from "utils/calendar";

const isSelectableStart = (
  date: string,
  minutes: number,
  seconds: number,
  openingHoursByDate: OpeningHoursByDate
): boolean => {
  if (seconds !== 0 || minutes % bookingSlotMinutes !== 0) return false;
  const end = minutes + bookingSlotMinutes;
  if (minutes < lunchEnd && end > lunchStart) return false;

  if (isNormallyClosedDate(date)) {
    return !!openingHoursByDate[date]?.some(
      ([from, to]) => minutes >= from * 60 && end <= to * 60
    );
  }

  const weekday = getWeekday(date);
  if (weekday === undefined) return false;
  const [from, to] = openHours[weekday];
  // Keep the existing 19:30 closure on the ordinary weekly schedule.
  return minutes >= from * 60 && end <= to * 60 && minutes !== 19 * 60 + 30;
};

/** Match the selectable 30-minute boxes using Europe/Rome only. */
export const isSelectableRomeBookingStart = (
  value: string | Date,
  openingHoursByDate: OpeningHoursByDate = {}
): boolean => {
  const parts = getRomeDateTimeParts(value);
  return isSelectableStart(
    toDateKey(parts.year, parts.month, parts.day),
    parts.hour * 60 + parts.minute,
    parts.second,
    openingHoursByDate
  );
};

/** The calendar carries Rome wall-clock values in its Date's local fields. */
export const isSelectableCalendarBookingStart = (
  value: Date,
  openingHoursByDate: OpeningHoursByDate
): boolean =>
  isSelectableStart(
    getCalendarDateKey(value),
    value.getHours() * 60 + value.getMinutes(),
    value.getSeconds(),
    openingHoursByDate
  );
