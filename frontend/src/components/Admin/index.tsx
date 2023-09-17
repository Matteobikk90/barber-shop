import { useEffect, useState } from "react";
import { getBookings } from "services/getBookings";
import { BookingTypes } from "types/booking.types";
/** @jsxImportSource @emotion/react */
import "twin.macro";

const AdminPanel = () => {
    const [bookedBookings, setBookedBookings] = useState<any>([]);

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
        getBookings().then((item: any) => setBookedBookings(item));
    }, []);

    return (
        <section tw="flex flex-row flex-wrap gap-[1rem] m-[2rem 1rem] bg-cream">
            {handleBookings()?.map((item) => (
                <article
                    key={item.date}
                    tw="flex gap-[0.25rem] rounded text-xl"
                >
                    <strong>
                        <h2 tw="w-[50px] text-center">{item.date}</h2>
                    </strong>
                    {item.bookings.map((booking: BookingTypes) => (
                        <div
                            key={booking.start_time}
                            tw="w-[11.25rem] h-[12.25rem] p-[1rem] flex gap-[0.25rem] border border-black"
                        >
                            <p>{booking.name}</p>
                            <p>{booking.surname}</p>
                            <p>{booking.service}</p>
                            <p>{booking.email}</p>
                            <p>{booking.phone}</p>
                            <strong>
                                <p>{booking.start_time}</p>
                            </strong>
                        </div>
                    ))}
                </article>
            ))}
        </section>
    );
};

export default AdminPanel;
