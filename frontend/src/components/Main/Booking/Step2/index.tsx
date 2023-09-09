import { useEffect, useState, useRef } from "react";
import BookingFormContainer from "components/Main/Booking/Container";
import useCalendar from "hooks/useCalendar";
import { getBookings } from "services/getBookings";
import {
    fifteenMinutes,
    thirtyMinutes,
    fourtyFiveMinutes,
    formatOptions
} from "utils/utilities";
import { openHours } from "utils/calendar";
import TimeCalendar from "react-timecalendar";
import { BookingTypes } from "types/booking.types";
/** @jsxImportSource @emotion/react */
import "twin.macro";

const Step2 = ({ service, handleBookingInfo }: Partial<BookingTypes>) => {
    const { handleClosedDays, handleTranslation, goToTimeSelection } =
        useCalendar();
    const calendarRef = useRef<any>();

    const [bookedBookings, setBookedBookings] = useState<any>([]);

    const formatDateTime = (bookingDateTime: any) => {
        let allowBookingBasedOnService: any = new Date(
            bookingDateTime.getTime() -
                (service === "Taglio + barba" ? thirtyMinutes : fifteenMinutes)
        );
        let serviceDuration: any = new Date(
            bookingDateTime.getTime() +
                (service === "Taglio + barba"
                    ? fourtyFiveMinutes
                    : thirtyMinutes)
        );
        const readable_start_time = `${new Intl.DateTimeFormat(
            undefined,
            formatOptions
        ).format(bookingDateTime)} ${bookingDateTime.toLocaleTimeString(
            "it-IT"
        )}`;
        const start_time = `${new Intl.DateTimeFormat(
            "fr-CA",
            formatOptions
        ).format(
            bookingDateTime
        )} ${allowBookingBasedOnService.toLocaleTimeString("it-IT")}`;
        const end_time = `${new Intl.DateTimeFormat(
            "fr-CA",
            formatOptions
        ).format(serviceDuration)} ${serviceDuration.toLocaleTimeString(
            "it-IT"
        )}`;
        handleBookingInfo!({ start_time, end_time, readable_start_time });
    };

    // useEffect(() => {
    //     getBookings().then((item) => setBookedBookings(item));
    // }, []);

    useEffect(() => {
        const calendarBody = document.querySelector(
            ".calendar .body"
        ) as HTMLDivElement;
        const calendarDayHeader = document.querySelector(
            ".calendar .header .col-center span"
        ) as HTMLDivElement;
        handleTranslation();
        handleClosedDays();
    }, [handleClosedDays, handleTranslation]);

    return (
        <BookingFormContainer title="Seleziona una data e un orario">
            <article ref={calendarRef}>
                <TimeCalendar
                    disableHistory
                    clickable
                    timeSlot={15}
                    openHours={openHours}
                    onTimeClick={formatDateTime}
                    bookings={bookedBookings}
                    onDateFunction={goToTimeSelection}
                    selectedTime={{
                        start: "",
                        end: ""
                    }}
                />
            </article>
        </BookingFormContainer>
    );
};

export default Step2;
