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
        const emailTemplateBody = `
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
        await Email.send({
            SecureToken: "5bb75e10-e0c5-4be2-b61f-0f1fdd62b9a1",
            Username: "blendon.barbershop@gmail.com",
            Password: process.env.REACT_APP_SMTP_PASS!,
            To: email,
            Host: "smtp.elasticemail.com",
            From: "blendon.barbershop@gmail.com",
            Subject:
                "Blendon Barber Shop - Prenotazione effettuata con successo",
            Body: emailTemplateBody
        }).then((message: string) => console.log(message));
        next();
    } catch (err) {
        console.log(err);
        alert("Qualcosa è andato storto, per favore riprova");
    }
};
