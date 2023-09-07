import { useEffect, useState } from "react";
import BookingFormContainer from "components/Main/Booking/Container";
import { getBookings } from "services/getBookings";
import {
    thirtyMinutes,
    fourtyFiveMinutes,
    formatOptions,
    openHours
} from "utils/utilities";
import TimeCalendar from "react-timecalendar";
/** @jsxImportSource @emotion/react */
import "twin.macro";
import { BookingTypes } from "types/booking.types";

const goToTimeSelection = () => {
    const goToTimeBtn = document.querySelector(
        ".timeSelector"
    ) as HTMLButtonElement;
    goToTimeBtn.click();
};

const Step2 = ({ service, handleBookingInfo }: Partial<BookingTypes>) => {
    const [bookedBookings, setBookedBookings] = useState<any>([]);

    const formatDateTime = (bookingDateTime: any) => {
        let serviceDuration: any = new Date(
            bookingDateTime.getTime() +
                (service === "Taglio + barba"
                    ? fourtyFiveMinutes
                    : thirtyMinutes)
        );
        const cloneDateStart = bookingDateTime;
        const clonedDateEnd = serviceDuration;
        bookingDateTime = new Intl.DateTimeFormat(
            "fr-CA",
            formatOptions
        ).format(bookingDateTime);
        serviceDuration = new Intl.DateTimeFormat(
            "fr-CA",
            formatOptions
        ).format(serviceDuration);
        const start_time = `${bookingDateTime} ${cloneDateStart.toLocaleTimeString(
            "it-IT"
        )}`;
        const end_time = `${serviceDuration} ${clonedDateEnd.toLocaleTimeString(
            "it-IT"
        )}`;
        handleBookingInfo!({ start_time, end_time });
    };

    useEffect(() => {
        getBookings().then((item) => setBookedBookings(item));
    }, []);
    // useEffect(() => {
    //     const calendarDiv = document.querySelector(
    //         ".calendar .header .col-center span"
    //     ) as HTMLDivElement;
    //     calendarDiv.replaceWith("<span>Giovedì</span>");
    //     console.log(calendarDiv);
    // }, []);

    return (
        <BookingFormContainer title="Seleziona una data e un orario">
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
        </BookingFormContainer>
    );
};

export default Step2;
