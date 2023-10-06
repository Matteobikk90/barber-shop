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
        const myDocRef = doc(
            myCollection,
            `${surname} ${readable_start_time
                .split(" ")[0]
                .replaceAll("/", "-")} ${readable_start_time
                .split(" ")[1]
                .replaceAll("/", "-")}`
        );
        await setDoc(myDocRef, newBooking);
        const templateBody = `
            <p>Ciao <strong>${name},</strong></p>
            <p>Di seguito i dettagli della tua prenotazione:</p>
            <p>&nbsp;</p>
            <p>Nome: <strong>${name}</strong></p>
            <p>Cognome: <strong>${surname}</strong></p>
            <p>Email: <strong>${email}</strong></p>
            <p>Telefono: <strong>${phone}</strong></p>
            <p>Data: <strong>${readable_start_time}</strong></p>
            <p>Servizio: <strong>${service}</strong></p>
            <p>&nbsp;</p>
            <p>Saluti,</p>
            <p>Blendon Barber Shop</p>
        `;
        Email.send({
            SecureToken: "01da71eb-3a31-4daa-b6bd-4b71636bb929",
            To: email,
            Host: "smtp.elasticemail.com",
            From: "blendon.barbershop@gmail.com",
            Subject:
                "Blendon Barber Shop - Prenotazione effettuata con successo",
            Body: templateBody
        }).then((message: string) => console.log(message));
        next();
    } catch (err) {
        console.log(err);
        alert("Qualcosa è andato storto, per favore riprova");
    }
};
