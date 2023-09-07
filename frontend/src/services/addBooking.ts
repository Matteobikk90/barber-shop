import { FormEvent } from "react";
import { BookingTypes } from "types/booking.types";
import { db } from "db/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

/* function to add new booking to firestore */
export const handleSubmitBooking = async (
    e: FormEvent,
    { service, name, surname, start_time, end_time, phone, email }: BookingTypes
) => {
    e.preventDefault();
    try {
        await addDoc(collection(db, "bookings"), {
            service,
            name,
            surname,
            start_time,
            end_time,
            phone,
            email,
            id: Timestamp.now()
        });
        console.log("done");
        // onClose();
    } catch (err) {
        alert(err);
    }
};
