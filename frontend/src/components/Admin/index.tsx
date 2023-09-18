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
        <section id="calendar" tw="flex flex-row gap-[2rem] m-[2rem 1rem]">
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
                                    <p>{start_time.split(" ")[1]}</p>
                                </strong>
                                <p>{`${name} ${surname}`}</p>
                                <p>{service}</p>
                                <p>{phone}</p>
                            </div>
                        )
                    )}
                </article>
            ))}
        </section>
    );
};

export default AdminPanel;
