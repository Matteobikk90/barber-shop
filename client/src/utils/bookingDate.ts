const ROME_TIME_ZONE = "Europe/Rome";

const pad2 = (value: number): string => (value < 10 ? `0${value}` : `${value}`);

export type DateParts = {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
};

const getDateParts = (date: Date, timeZone: string): DateParts => {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).formatToParts(date);

  const values: Record<string, number> = {};
  parts.forEach((part) => {
    if (part.type !== "literal") values[part.type] = Number(part.value);
  });

  return {
    year: values.year,
    month: values.month,
    day: values.day,
    hour: values.hour === 24 ? 0 : values.hour,
    minute: values.minute,
    second: values.second,
  };
};

const getTimeZoneOffset = (date: Date, timeZone: string): number => {
  const parts = getDateParts(date, timeZone);
  const asUtc = Date.UTC(
    parts.year,
    parts.month - 1,
    parts.day,
    parts.hour,
    parts.minute,
    parts.second
  );

  return asUtc - date.getTime();
};

const romeWallTimeToDate = (parts: DateParts): Date => {
  const wallTimeUtc = Date.UTC(
    parts.year,
    parts.month - 1,
    parts.day,
    parts.hour,
    parts.minute,
    parts.second
  );
  let result = new Date(wallTimeUtc);
  let offset = getTimeZoneOffset(result, ROME_TIME_ZONE);
  result = new Date(wallTimeUtc - offset);

  // Recalculate once to cover daylight-saving changes around the target date.
  const correctedOffset = getTimeZoneOffset(result, ROME_TIME_ZONE);
  if (correctedOffset !== offset) result = new Date(wallTimeUtc - correctedOffset);

  return result;
};

export const getRomeDateTimeParts = (value: string | Date): DateParts =>
  getDateParts(parseBookingDateTime(value), ROME_TIME_ZONE);

/**
 * Convert a real instant to the calendar's wall-clock representation. The
 * returned Date deliberately uses local getters to carry Rome date/time fields,
 * so the bundled calendar renders identical labels in every device timezone.
 */
export const toRomeCalendarWallTime = (value: string | Date): Date => {
  const parts = getRomeDateTimeParts(value);
  return new Date(
    parts.year,
    parts.month - 1,
    parts.day,
    parts.hour,
    parts.minute,
    parts.second
  );
};

/** Interpret the calendar's local-looking fields exclusively as Rome time. */
export const calendarWallTimeToRomeDate = (value: Date): Date =>
  romeWallTimeToDate({
    year: value.getFullYear(),
    month: value.getMonth() + 1,
    day: value.getDate(),
    hour: value.getHours(),
    minute: value.getMinutes(),
    second: value.getSeconds(),
  });

export const createCalendarWallTime = (
  dateKey: string,
  hour = 0,
  minute = 0,
  second = 0
): Date => {
  const [year, month, day] = dateKey.split("-").map(Number);
  return new Date(year, month - 1, day, hour, minute, second);
};

/** Parse both ISO timestamps and the legacy Firestore format without browser-specific Date parsing. */
export const parseBookingDateTime = (value: string | Date): Date => {
  if (value instanceof Date) return new Date(value.getTime());

  const legacyMatch = value.match(
    /^(\d{4})-(\d{2})-(\d{2})[ T](\d{2}):(\d{2})(?::(\d{2}))?$/
  );
  if (legacyMatch) {
    return romeWallTimeToDate({
      year: Number(legacyMatch[1]),
      month: Number(legacyMatch[2]),
      day: Number(legacyMatch[3]),
      hour: Number(legacyMatch[4]),
      minute: Number(legacyMatch[5]),
      second: Number(legacyMatch[6] || 0),
    });
  }

  return new Date(value);
};

export const normalizeBookingDateTime = (value: string): string => {
  const date = parseBookingDateTime(value);
  return Number.isNaN(date.getTime()) ? value : date.toISOString();
};

export const getRomeDateKey = (value: string | Date): string => {
  const parts = getRomeDateTimeParts(value);
  return `${parts.year}-${pad2(parts.month)}-${pad2(parts.day)}`;
};

export const getRomeTimeKey = (value: string | Date): string => {
  const parts = getRomeDateTimeParts(value);
  return `${pad2(parts.hour)}-${pad2(parts.minute)}`;
};

/** One stable Firestore document per day/time slot, shared by every client. */
export const getBookingSlotDocumentId = (startTime: string | Date): string =>
  `slot_${getRomeDateKey(startTime)}_${getRomeTimeKey(startTime)}`;

type BookingRange = { start_time: Date; end_time: Date };

/** Availability guard used by the click handler, independent of CSS classes. */
export const isBookingSlotUnavailable = (
  selectedTime: Date,
  bookings: BookingRange[],
  blockedDates: string[]
): boolean => {
  if (blockedDates.includes(getRomeDateKey(selectedTime))) return true;
  const timestamp = selectedTime.getTime();
  return bookings.some(
    (booking) =>
      timestamp >= booking.start_time.getTime() &&
      timestamp < booking.end_time.getTime()
  );
};
