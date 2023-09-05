import Homepage from "components/Main/Homepage";
import Product from "components/Main/Product";
import Menu from "components/Main/Menu";
import Gallery from "components/Main/Gallery";
import Contact from "components/Main/Contact";
import TimeCalendar from "react-timecalendar";
/** @jsxImportSource @emotion/react */
import "twin.macro";

const openHours = [
    [9.5, 15],
    [9, 23.5]
];

function loggingTime(time: string) {
    console.log(time);
}

const bookings: any = [
    {
        id: 1,
        start_time: "2023-09-10 13:00:00",
        end_time: "2023-09-10 13:30:00"
    },
    {
        id: 2,
        start_time: "2023-09-10 15:00:00",
        end_time: "2023-09-10 15:45:00"
    }
];

const Main = () => {
    return (
        <main tw="pt-[4.18rem]">
            <Homepage />
            <Product />
            <Menu />
            <Gallery />
            <Contact />
            <TimeCalendar
                disableHistory
                clickable
                timeSlot={15}
                openHours={openHours}
                onTimeClick={loggingTime}
                bookings={bookings}
                onDateFunction={() => null}
                selectedTime={{
                    start: "",
                    end: ""
                }}
            />
        </main>
    );
};
export default Main;
