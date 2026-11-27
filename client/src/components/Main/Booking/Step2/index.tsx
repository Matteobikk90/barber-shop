import BookingFormContainer from "components/Main/Booking/Container";
import useCalendar from "hooks/useCalendar";
import TimeCalendar from "libs/react-timecalendar/build";
import { useEffect, useState } from "react";
import { subscribeToBlockedDates } from "services/getBlockedDates";
import { subscribeToBookings } from "services/getBookings";
import { BookingTypes } from "types/booking.types";
import {
  calendarWallTimeToRomeDate,
  createCalendarWallTime,
  isBookingSlotUnavailable,
  parseBookingDateTime,
  toRomeCalendarWallTime,
} from "utils/bookingDate";
import { isSelectableRomeBookingStart } from "utils/availability";
import { openHours, openingHoursByDate } from "utils/calendar";
import { thirtyMinutes } from "utils/utilities";
/** @jsxImportSource @emotion/react */
import "twin.macro";

const BLOCKED_STYLE_ID = "dynamic-blocked-dates";

type CalendarBooking = {
  id: string;
  start_time: Date;
  end_time: Date;
};

const injectBlockedDatesCss = (dates: string[]) => {
  let styleEl = document.getElementById(
    BLOCKED_STYLE_ID
  ) as HTMLStyleElement | null;
  if (!styleEl) {
    styleEl = document.createElement("style");
    styleEl.id = BLOCKED_STYLE_ID;
    document.head.appendChild(styleEl);
  }

  styleEl.textContent = dates
    .map((date) => {
      const [, month, day] = date.split("-");
      const cls = `t${day}-${month}`;
      return `.${cls}, .${cls} p { cursor: not-allowed !important; color: #e52b50 !important; }\n.calendar > .body .row .cell.${cls} { pointer-events: none; }\n.timeSelector.${cls} .optionHolder .cell { color: #e52b50 !important; cursor: not-allowed !important; }`;
    })
    .join("\n");
};

const toCalendarBooking = (
  booking: Partial<BookingTypes>
): CalendarBooking | null => {
  if (!booking.start_time || !booking.end_time) return null;
  const startTime = parseBookingDateTime(booking.start_time);
  const endTime = parseBookingDateTime(booking.end_time);
  if (Number.isNaN(startTime.getTime()) || Number.isNaN(endTime.getTime())) {
    return null;
  }
  return {
    id: booking.id || `booking-${startTime.toISOString()}`,
    start_time: startTime,
    end_time: endTime,
  };
};

const Step2 = ({ handleBookingInfo }: Partial<BookingTypes>) => {
  const { goToTimeSelection } = useCalendar();
  const [bookedBookings, setBookedBookings] = useState<
    CalendarBooking[] | null
  >(null);
  const [blockedDates, setBlockedDates] = useState<string[]>([]);
  const [bookingsSynced, setBookingsSynced] = useState(false);
  const [blockedDatesSynced, setBlockedDatesSynced] = useState(false);
  const [calendarError, setCalendarError] = useState(false);

  const formatDateTime = (bookingDateTime: Date) => {
    const serviceDuration = new Date(bookingDateTime.getTime() + thirtyMinutes);
    const tz = "Europe/Rome";
    const datePart = new Intl.DateTimeFormat("it-IT", {
      timeZone: tz,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(bookingDateTime);
    const timePart = new Intl.DateTimeFormat("it-IT", {
      timeZone: tz,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }).format(bookingDateTime);
    handleBookingInfo!({
      start_time: bookingDateTime.toISOString(),
      end_time: serviceDuration.toISOString(),
      readable_start_time: `${datePart} ${timePart}`,
    });
  };

  const selectDateTime = (calendarDateTime: Date) => {
    const bookingDateTime = calendarWallTimeToRomeDate(calendarDateTime);
    if (
      !isSelectableRomeBookingStart(bookingDateTime) ||
      isBookingSlotUnavailable(
        bookingDateTime,
        bookedBookings || [],
        blockedDates
      )
    ) {
      window.alert(
        "Questo orario non è disponibile. Il calendario è stato aggiornato: scegli un altro orario."
      );
      return;
    }

    formatDateTime(bookingDateTime);
  };

  useEffect(() => {
    const handleError = (error: Error) => {
      console.error(error);
      setCalendarError(true);
    };

    const unsubscribeBookings = subscribeToBookings(
      (bookings, source) => {
        if (source.fromCache) return;
        const calendarBookings = bookings
          .map(toCalendarBooking)
          .filter((booking): booking is CalendarBooking => booking !== null);
        setBookedBookings(calendarBookings);
        setBookingsSynced(true);
        setCalendarError(false);
      },
      handleError
    );

    const unsubscribeBlockedDates = subscribeToBlockedDates(
      (dates, source) => {
        if (source.fromCache) return;
        setBlockedDates(dates);
        injectBlockedDatesCss(dates);
        setBlockedDatesSynced(true);
        setCalendarError(false);
      },
      handleError
    );

    return () => {
      unsubscribeBookings();
      unsubscribeBlockedDates();
      document.getElementById(BLOCKED_STYLE_ID)?.remove();
    };
  }, []);

  const blockedDateBookings: CalendarBooking[] = blockedDates.map((date) => ({
    id: `blocked-${date}`,
    start_time: createCalendarWallTime(date, 0, 0, 0),
    end_time: createCalendarWallTime(date, 23, 59, 59),
  }));
  const calendarBookings = [
    ...(bookedBookings || []).map((booking) => ({
      ...booking,
      start_time: toRomeCalendarWallTime(booking.start_time),
      end_time: toRomeCalendarWallTime(booking.end_time),
    })),
    ...blockedDateBookings,
  ];
  const calendarNow = toRomeCalendarWallTime(new Date());
  const calendarReady = bookingsSynced && blockedDatesSynced;

  return (
    <BookingFormContainer title="Seleziona una data e un orario">
      <div tw="flex gap-[1.5rem] justify-center m-auto text-xl mb-[1rem]">
        <div tw="flex gap-[0.5rem] items-center">
          <span tw="h-[0.5rem] w-[0.5rem] rounded bg-red"></span>
          <h3 tw="whitespace-nowrap">Non disponibili</h3>
        </div>
        <div tw="flex gap-[0.5rem] items-center">
          <span tw="h-[0.5rem] w-[0.5rem] rounded bg-black"></span>
          <h3 tw="whitespace-nowrap">Disponibili</h3>
        </div>
      </div>
      <article>
        {calendarError ? (
          <p tw="text-xl">
            Non riesco ad aggiornare le disponibilità. Controlla la connessione e
            ricarica la pagina.
          </p>
        ) : !calendarReady ? (
          <p tw="text-xl">Aggiornamento disponibilità in corso...</p>
        ) : (
          <TimeCalendar
            disableHistory
            clickable
            timeSlot={30}
            openHours={openHours}
            openingHoursByDate={openingHoursByDate}
            onTimeClick={selectDateTime}
            bookings={calendarBookings}
            onDateFunction={goToTimeSelection}
            initialDate={calendarNow}
            currentDate={calendarNow}
            selectedTime={{
              start: "",
              end: "",
            }}
          />
        )}
      </article>
    </BookingFormContainer>
  );
};

export default Step2;
