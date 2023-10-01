import { useEffect, useState, useRef } from "react";
import BookingFormContainer from "components/Main/Booking/Container";
import useCalendar from "hooks/useCalendar";
import { getBookings } from "services/getBookings";
import { thirtyMinutes, formatOptions } from "utils/utilities";
import { openHours } from "utils/calendar";
import TimeCalendar from "react-timecalendar";
import { BookingTypes } from "types/booking.types";
/** @jsxImportSource @emotion/react */
import "twin.macro";

const Step2 = ({ handleBookingInfo }: Partial<BookingTypes>) => {
    const { goToTimeSelection } = useCalendar();
    const calendarRef = useRef<any>();

    const [bookedBookings, setBookedBookings] = useState<any>([]);

    const formatDateTime = (bookingDateTime: any) => {
        let serviceDuration: any = new Date(
            bookingDateTime.getTime() + thirtyMinutes
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
        ).format(bookingDateTime)} ${bookingDateTime.toLocaleTimeString(
            "it-IT"
        )}`;
        const end_time = `${new Intl.DateTimeFormat(
            "fr-CA",
            formatOptions
        ).format(serviceDuration)} ${serviceDuration.toLocaleTimeString(
            "it-IT"
        )}`;
        handleBookingInfo!({ start_time, end_time, readable_start_time });
    };

    useEffect(() => {
        getBookings().then((item) => setBookedBookings(item));
    }, []);

    return (
        <BookingFormContainer title="Seleziona una data e un orario">
            <article ref={calendarRef}>
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
                        end: ""
                    }}
                />
            </article>
        </BookingFormContainer>
    );
};

export default Step2;
