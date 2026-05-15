import BookingFormContainer from "components/Main/Booking/Container";
import useCalendar from "hooks/useCalendar";
import TimeCalendar from "libs/react-timecalendar/build";
import { useEffect, useState } from "react";
import { getBlockedDates } from "services/getBlockedDates";
import { getBookings } from "services/getBookings";
import { BookingTypes } from "types/booking.types";
import { openHours } from "utils/calendar";
import { thirtyMinutes } from "utils/utilities";
/** @jsxImportSource @emotion/react */
import "twin.macro";

const BLOCKED_STYLE_ID = "dynamic-blocked-dates";

const injectBlockedDatesCss = (dates: string[]) => {
  let styleEl = document.getElementById(
    BLOCKED_STYLE_ID
  ) as HTMLStyleElement | null;
  if (!styleEl) {
    styleEl = document.createElement("style");
    styleEl.id = BLOCKED_STYLE_ID;
    document.head.appendChild(styleEl);
  }
  if (dates.length === 0) {
    styleEl.textContent = "";
    return;
  }
  const rules = dates
    .map((date) => {
      const [, month, day] = date.split("-");
      const cls = `t${day}-${month}`;
      return `.${cls}, .${cls} p { cursor: not-allowed !important; color: #e52b50 !important; pointer-events: none; }\n.timeSelector.${cls} .tbody { display: none; }`;
    })
    .join("\n");
  styleEl.textContent = rules;
};

const Step2 = ({ handleBookingInfo }: Partial<BookingTypes>) => {
  const { goToTimeSelection } = useCalendar();

  const [bookedBookings, setBookedBookings] = useState<any>([]);

  const formatDateTime = (bookingDateTime: any) => {
    const serviceDuration = new Date(bookingDateTime.getTime() + thirtyMinutes);
    const tz = "Europe/Rome";
    const datePart = new Intl.DateTimeFormat("it-IT", { timeZone: tz, year: "numeric", month: "2-digit", day: "2-digit" }).format(bookingDateTime);
    const timePart = new Intl.DateTimeFormat("it-IT", { timeZone: tz, hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false }).format(bookingDateTime);
    const readable_start_time = `${datePart} ${timePart}`;
    const start_time = bookingDateTime.toISOString();
    const end_time = serviceDuration.toISOString();
    handleBookingInfo!({ start_time, end_time, readable_start_time });
  };

  useEffect(() => {
    getBookings().then((item) => setBookedBookings(item));
    getBlockedDates().then((dates) => injectBlockedDatesCss(dates));
    return () => {
      document.getElementById(BLOCKED_STYLE_ID)?.remove();
    };
  }, []);

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
        {bookedBookings && (
          <TimeCalendar
            disableHistory
            clickable
            timeSlot={30}
            openHours={openHours}
            onTimeClick={formatDateTime}
            bookings={bookedBookings}
            onDateFunction={goToTimeSelection}
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
