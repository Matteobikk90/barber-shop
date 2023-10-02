import { useEffect, useState } from "react";
import { getBookings } from "services/getBookings";
import { BookingTypes } from "types/booking.types";
import { deleteBooking } from "services/deleteBooking";
/** @jsxImportSource @emotion/react */
import tw from "twin.macro";

const AdminPanel = () => {
    const [bookedBookings, setBookedBookings] = useState<BookingTypes[]>([]);
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
        <section id="calendar">
            <form
                onSubmit={(e) => deleteBooking(e, bookedBookings, deleteDocID)}
                tw="flex gap-[1rem] items-center w-full"
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
            <div tw="flex flex-row gap-[2rem] m-[2rem 1rem]">
                {handleBookings()?.map((item: any) => (
                    <article
                        key={item.date}
                        tw="flex flex-col gap-[0.25rem] rounded items-center"
                    >
                        <h2 tw="w-[120px] text-center">
                            <strong>{item.date}</strong>
                        </h2>
                        {item.bookings.map(
                            ({
                                start_time,
                                readable_start_time,
                                name,
                                surname,
                                phone,
                                service
                            }: BookingTypes) => (
                                <div
                                    key={start_time}
                                    tw="w-[13rem] h-[8rem] p-[0.25rem] flex flex-col gap-[0.25rem] border border-black"
                                >
                                    <strong>
                                        <p tw="flex items-center">
                                            {readable_start_time
                                                ? readable_start_time
                                                : `${start_time.split(" ")[1]}`}
                                            <sup
                                                css={[
                                                    tw`block text-green`,
                                                    readable_start_time &&
                                                        tw`hidden`
                                                ]}
                                            >
                                                + 15min
                                            </sup>
                                        </p>
                                    </strong>
                                    <p>{`${name} ${surname}`}</p>
                                    <p>{service}</p>
                                    <p>{phone}</p>
                                </div>
                            )
                        )}
                    </article>
                ))}
            </div>
        </section>
    );
};

export default AdminPanel;
