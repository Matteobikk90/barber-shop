import TimeCalendar from "react-timecalendar";
/** @jsxImportSource @emotion/react */
import "twin.macro";

const openHours = [
    [0, 0],
    [0, 0],
    [9, 19],
    [11, 20.5],
    [9, 19],
    [9, 19],
    [9, 19]
];

const thirtyMinutes = 30 * 60 * 1000;
const fourtyFiveMinutes = 45 * 60 * 1000;

const formatOptions: any = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
};

const goToTimeSelection = () => {
    const goToTimeBtn = document.querySelector(
        ".timeSelector"
    ) as HTMLButtonElement;
    goToTimeBtn.click();
};

const formatDateTime = (bookingDateTime: any) => {
    let serviceDuration: any = new Date(
        bookingDateTime.getTime() + thirtyMinutes
    );
    const cloneDateStart = bookingDateTime;
    const clonedDateEnd = serviceDuration;
    bookingDateTime = new Intl.DateTimeFormat("fr-CA", formatOptions).format(
        bookingDateTime
    );
    serviceDuration = new Intl.DateTimeFormat("fr-CA", formatOptions).format(
        serviceDuration
    );
    const start_time = `${bookingDateTime} ${cloneDateStart.toLocaleTimeString(
        "it-IT"
    )}`;
    const end_time = `${serviceDuration} ${clonedDateEnd.toLocaleTimeString(
        "it-IT"
    )}`;
};

const bookings: any = [
    {
        id: 1,
        start_time: "2023-09-15 13:00:00",
        end_time: "2023-09-15 13:30:00"
    },
    {
        id: 2,
        start_time: "2023-09-15 15:00:00",
        end_time: "2023-09-15 15:45:00"
    }
];

const Step2 = () => {
    return (
        <TimeCalendar
            disableHistory
            clickable
            timeSlot={15}
            openHours={openHours}
            onTimeClick={formatDateTime}
            bookings={bookings}
            onDateFunction={goToTimeSelection}
            selectedTime={{
                start: "",
                end: ""
            }}
        />
    );
};

export default Step2;
