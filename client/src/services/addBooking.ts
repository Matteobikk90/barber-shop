import { db } from "db/firebase";
import {
  collection,
  doc,
  getDocsFromServer,
  runTransaction,
  Timestamp,
} from "firebase/firestore";
import { Dispatch, SetStateAction } from "react";
import { BookingTypes } from "types/booking.types";
import {
  getBookingSlotDocumentId,
  getRomeDateKey,
  parseBookingDateTime,
} from "utils/bookingDate";
import { isSelectableRomeBookingStart } from "utils/availability";
import { thirtyMinutes } from "utils/utilities";

export class BookingSlotUnavailableError extends Error {
  constructor() {
    super("Booking slot is no longer available");
    this.name = "BookingSlotUnavailableError";
  }
}

export class BookingOutsideOpeningHoursError extends Error {
  constructor() {
    super("Booking time is outside the selectable Rome opening hours");
    this.name = "BookingOutsideOpeningHoursError";
  }
}

type BookingPayload = Pick<
  BookingTypes,
  | "service"
  | "name"
  | "surname"
  | "start_time"
  | "end_time"
  | "phone"
  | "email"
  | "readable_start_time"
>;

const overlapsRequestedSlot = (
  data: Record<string, unknown>,
  requestedStart: number,
  requestedEnd: number
): boolean => {
  if (typeof data.start_time !== "string" || typeof data.end_time !== "string") {
    return false;
  }
  const existingStart = parseBookingDateTime(data.start_time).getTime();
  const existingEnd = parseBookingDateTime(data.end_time).getTime();
  if (Number.isNaN(existingStart) || Number.isNaN(existingEnd)) return false;
  return requestedStart < existingEnd && requestedEnd > existingStart;
};

/**
 * Reserve a slot with one deterministic document id. Concurrent clients trying
 * the same slot cannot both complete the transaction.
 */
export const reserveBookingSlot = async (booking: BookingPayload) => {
  const bookingsRef = collection(db, "bookings");
  const requestedStart = parseBookingDateTime(booking.start_time).getTime();
  const requestedEnd = parseBookingDateTime(booking.end_time).getTime();
  if (
    !isSelectableRomeBookingStart(booking.start_time) ||
    requestedEnd - requestedStart !== thirtyMinutes
  ) {
    throw new BookingOutsideOpeningHoursError();
  }
  const slotDocument = doc(
    db,
    "bookings",
    getBookingSlotDocumentId(booking.start_time)
  );
  const blockedDateDocument = doc(
    db,
    "blockedDates",
    getRomeDateKey(booking.start_time)
  );

  // Existing records used surname-based ids. Check them before moving all new
  // bookings to the atomic, slot-based id.
  const existingBookings = await getDocsFromServer(bookingsRef);
  if (
    existingBookings.docs.some((document) =>
      overlapsRequestedSlot(document.data(), requestedStart, requestedEnd)
    )
  ) {
    throw new BookingSlotUnavailableError();
  }

  const newBooking = {
    ...booking,
    id: Timestamp.now(),
  };

  await runTransaction(db, async (transaction) => {
    const [existingSlot, blockedDate] = await Promise.all([
      transaction.get(slotDocument),
      transaction.get(blockedDateDocument),
    ]);

    if (existingSlot.exists() || blockedDate.exists()) {
      throw new BookingSlotUnavailableError();
    }

    transaction.set(slotDocument, newBooking);
  });
};

export const handleSubmitBooking = async (
  {
    service,
    name,
    surname,
    start_time,
    end_time,
    phone,
    email,
    readable_start_time,
  }: BookingTypes,
  next: () => void,
  setIsLoading: Dispatch<SetStateAction<boolean>>
) => {
  const booking = {
    service,
    name,
    surname,
    start_time,
    end_time,
    phone,
    email,
    readable_start_time,
  };

  try {
    await reserveBookingSlot(booking);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_NEW_URL_EMAIL}send_email_booking`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          mode: "cors",
          body: JSON.stringify({
            name,
            surname,
            email,
            phone,
            readable_start_time,
            service,
          }),
        }
      );
      if (!response.ok) throw new Error("Booking email failed");
    } catch (_) {
      window.alert(
        "Email non inviata, ma la prenotazione è comunque andata a buon fine. A presto"
      );
    }

    next();
  } catch (error) {
    if (error instanceof BookingOutsideOpeningHoursError) {
      window.alert(
        "Questo orario non fa parte degli orari disponibili in Italia. Torna al calendario e seleziona una casella libera."
      );
    } else if (error instanceof BookingSlotUnavailableError) {
      window.alert(
        "Questo orario è appena diventato non disponibile. Torna al calendario e scegline un altro."
      );
    } else {
      console.error(error);
      window.alert("Qualcosa è andato storto, per favore riprova");
    }
  } finally {
    setIsLoading(false);
  }
};
