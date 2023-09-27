import { FormEvent } from "react";
import { BookingTypes } from "types/booking.types";
import { db } from "db/firebase";
import { collection, setDoc, Timestamp, doc } from "firebase/firestore";

/* function to add new booking to firestore */
export const handleSubmitBooking = async (
    e: FormEvent,
    {
        service,
        name,
        surname,
        start_time,
        end_time,
        phone,
        email,
        readable_start_time
    }: BookingTypes,
    next: () => void
) => {
    e.preventDefault();
    try {
        const myCollection = collection(db, "bookings");
        const newBooking = {
            service,
            name,
            surname,
            start_time,
            end_time,
            phone,
            email,
            id: Timestamp.now(),
            readable_start_time
        };
        const myDocRef = doc(
            myCollection,
            `${surname} ${readable_start_time
                .split(" ")[0]
                .replaceAll("/", "-")}`
        );
        await setDoc(myDocRef, newBooking);
        next();
    } catch (err) {
        console.log(err);
        alert("Qualcosa è andato storto, per favore riprova");
    }
};
