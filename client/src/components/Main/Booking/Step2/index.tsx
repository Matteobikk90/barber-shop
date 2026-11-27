import BookingFormContainer from "components/Main/Booking/Container";
import useCalendar from "hooks/useCalendar";
import TimeCalendar from "libs/react-timecalendar/build";
import { useEffect, useMemo, useState } from "react";
import { subscribeToBlockedDates } from "services/getBlockedDates";
import { subscribeToBookings } from "services/getBookings";
import { subscribeToSpecialOpenings } from "services/specialOpenings";
import { BookingTypes } from "types/booking.types";
import {
  calendarWallTimeToRomeDate,
  getCalendarDateKey,
  isBookingSlotUnavailable,
  parseBookingDateTime,
  toRomeCalendarWallTime,
} from "utils/bookingDate";
import {
  isSelectableCalendarBookingStart,
  isSelectableRomeBookingStart,
} from "utils/availability";
import {
  bookingSlotMinutes,
  getOpeningHoursByDate,
  isNormallyClosedDate,
  openHours,
  SpecialOpenings,
} from "utils/calendar";
import { thirtyMinutes } from "utils/utilities";
/** @jsxImportSource @emotion/react */
import "twin.macro";

type CalendarBooking = {
  id: string;
  start_time: Date;
  end_time: Date;
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
  const [specialOpenings, setSpecialOpenings] = useState<SpecialOpenings | null>(
    null
  );
  const [specialOpeningsError, setSpecialOpeningsError] = useState(false);
  const openingHoursByDate = useMemo(
    () => getOpeningHoursByDate(specialOpenings ?? {}),
    [specialOpenings]
  );

  const isDateUnavailable = (calendarDate: Date) => {
    const date = getCalendarDateKey(calendarDate);
    return (
      blockedDates.includes(date) ||
      (isNormallyClosedDate(date) && !openingHoursByDate[date])
    );
  };

  const isTimeUnavailable = (calendarDateTime: Date) =>
    blockedDates.includes(getCalendarDateKey(calendarDateTime)) ||
    !isSelectableCalendarBookingStart(calendarDateTime, openingHoursByDate);

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
      toRomeCalendarWallTime(bookingDateTime).getTime() !==
        calendarDateTime.getTime() ||
      !isSelectableRomeBookingStart(bookingDateTime, openingHoursByDate) ||
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
        setBlockedDatesSynced(true);
        setCalendarError(false);
      },
      handleError
    );

    const unsubscribeOpenings = subscribeToSpecialOpenings(
      setSpecialOpenings,
      (error) => {
        console.error(error);
        setSpecialOpenings(null);
        setSpecialOpeningsError(true);
      }
    );

    return () => {
      unsubscribeBookings();
      unsubscribeBlockedDates();
      unsubscribeOpenings();
    };
  }, []);

  const calendarBookings = (bookedBookings || []).map((booking) => ({
    ...booking,
    start_time: toRomeCalendarWallTime(booking.start_time),
    end_time: toRomeCalendarWallTime(booking.end_time),
  }));
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
          <>
            {specialOpeningsError && (
              <p tw="text-xl">
                Non riesco a caricare le aperture straordinarie. Le date
                ordinarie restano prenotabili.
              </p>
            )}
            <TimeCalendar
              disableHistory
              clickable
              timeSlot={bookingSlotMinutes}
              openHours={openHours}
              openingHoursByDate={openingHoursByDate}
              isDateUnavailable={isDateUnavailable}
              isTimeUnavailable={isTimeUnavailable}
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
          </>
        )}
      </article>
    </BookingFormContainer>
  );
};

export default Step2;
