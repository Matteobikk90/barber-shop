import { FormEvent } from "react";
import { BookingTypes } from "types/booking.types";
import { db } from "db/firebase";
import { collection, setDoc, Timestamp, doc } from "firebase/firestore";

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
        const emailBody = {
            name,
            surname,
            email,
            phone,
            readable_start_time,
            service
        };
        const myDocRef = doc(
            myCollection,
            `${surname.replaceAll(" ", "")} ${readable_start_time
                .split(" ")[0]
                .replaceAll("/", "-")} ${readable_start_time
                .split(" ")[1]
                .replaceAll("/", "-")}`
        );
        await setDoc(myDocRef, newBooking);
        await fetch(
            "https://barber-shop-backend-efc4.onrender.com/send_email_booking",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                mode: "cors",
                body: JSON.stringify(emailBody)
            }
        )
            .then(() => next())
            .catch(() =>
                alert(
                    "Email non inviata, ma la prenotazione è comunque andata a buon fine. A presto"
                )
            );
    } catch (_) {
        alert("Qualcosa è andato storto, per favore riprova");
    }
};
