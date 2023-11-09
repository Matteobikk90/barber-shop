import { db } from "db/firebase";
import { doc, deleteDoc } from "firebase/firestore";
import { BookingTypes } from "types/booking.types";

export const deleteBooking = (
    e: any,
    bookedBookings: BookingTypes[],
    docToDelete: string
) => {
    e.preventDefault();
    const findDocToDelete = bookedBookings?.find(
        ({ id }) =>
            id?.toLowerCase().normalize() ===
            docToDelete.toLowerCase().normalize()
    )?.id;
    if (findDocToDelete) {
        const confirmation = window.confirm(
            `Sei sicuro di voler cancellare ${findDocToDelete!} ?`
        );
        if (confirmation)
            return deleteDoc(doc(db, "bookings", findDocToDelete!))
                .then(() => {
                    alert(`${findDocToDelete!} correttamente cancellato`);
                    console.log(
                        "Entire Document has been deleted successfully."
                    );
                })
                .catch((error) => {
                    alert("Qualcosa è andato storto, riprova");
                    console.log(error);
                });
    } else
        alert(
            "Nessuna prenotazione trovata con questo cognome e in questa data, riprova"
        );
};
