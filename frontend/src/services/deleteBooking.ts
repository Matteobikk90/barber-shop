import { db } from "db/firebase";
import { doc, deleteDoc } from "firebase/firestore";

export const deleteBooking = (e: any, docToDelete: string) => {
    e.preventDefault();
    const confirmation = window.confirm(
        `Sei sicuro di voler cancellare ${docToDelete} ?`
    );
    if (confirmation)
        return deleteDoc(doc(db, "bookings", docToDelete))
            .then(() =>
                console.log("Entire Document has been deleted successfully.")
            )
            .catch((error) => console.log(error));
};
