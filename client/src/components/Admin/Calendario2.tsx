import { useEffect, useState } from "react";
import { getBookings } from "services/getBookings";
import { BookingTypes } from "types/booking.types";
import { today } from "utils/utilities";
import { deleteBooking } from "services/deleteBooking";
/** @jsxImportSource @emotion/react */
import "twin.macro";

const AdminPanel = () => {
    const [bookedBookings, setBookedBookings] = useState<BookingTypes[]>([]);
    const [selectedDate, setSelectedDate] = useState(today);
    const [deleteDocID, setDeleteDocID] = useState("");

    const handleBookings = () => {
        const sortedDate = bookedBookings.sort(
            (a: BookingTypes, b: BookingTypes) =>
                +new Date(a.start_time) - +new Date(b.start_time)
        );
        const groups = sortedDate.reduce(
            (groups: any, booking: BookingTypes) => {
                const date = booking.start_time.split(" ")[0];
                if (!groups[date]) {
                    groups[date] = [];
                }
                groups[date].push(booking);
                return groups;
            },
            {}
        );

        const groupArrays = Object.keys(groups).map((date) => ({
            date,
            bookings: groups[date]
        }));
        return groupArrays;
    };

    useEffect(() => {
        getBookings().then((bookings: any) => setBookedBookings(bookings));
    }, []);

    return (
        <section id="calendar" tw="flex flex-col gap-[2rem] m-[2rem 1rem]">
            <form
                onSubmit={(e) => deleteBooking(e, bookedBookings, deleteDocID)}
                tw="flex gap-[1rem] items-center"
            >
                <label htmlFor="deleteDoc">Cancella prenotazione</label>
                <input
                    tw="rounded border border-black"
                    onChange={(e) => setDeleteDocID(e.target.value)}
                    id="deleteDoc"
                    type="text"
                />
                <button
                    tw="bg-green border border-[#D7D7D7] p-[0.25rem 0.75rem] text-cream text-center rounded-[0.25rem]"
                    type="submit"
                >
                    Cancella
                </button>
            </form>
            <label htmlFor="bookings">Scegli un giorno:</label>
            <select
                tw="max-w-[13rem] w-full p-[1rem] rounded border border-black"
                onChange={(e) => setSelectedDate(e.target.value)}
                id="bookings"
            >
                {handleBookings()?.map((item: any) => (
                    <option key={item.date} value={item.date}>
                        {item.date}
                    </option>
                ))}
            </select>
            <article tw="flex flex-row flex-wrap gap-[0.25rem]">
                {selectedDate &&
                    handleBookings()
                        ?.find((day) => day.date === selectedDate)
                        ?.bookings?.map(
                            ({
                                start_time,
                                name,
                                surname,
                                phone,
                                service
                            }: BookingTypes) => (
                                <div
                                    key={start_time + phone}
                                    tw="w-[13rem] h-[8rem] p-[0.25rem] flex flex-col gap-[0.25rem] border border-black rounded"
                                >
                                    <strong>
                                        <p>{start_time.split(" ")[1]}</p>
                                    </strong>
                                    <p>{`${name} ${surname}`}</p>
                                    <p>{service}</p>
                                    <p>{phone}</p>
                                </div>
                            )
                        )}
            </article>
        </section>
    );
};

export default AdminPanel;
