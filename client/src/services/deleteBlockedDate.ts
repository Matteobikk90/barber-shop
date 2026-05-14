import { db } from "db/firebase";
import { doc, deleteDoc } from "firebase/firestore";

/* Remove a blocked date from Firestore. Date format: "YYYY-MM-DD" */
export const deleteBlockedDate = (date: string): Promise<void> =>
    deleteDoc(doc(db, "blockedDates", date))
        .then(() => console.log(`Date ${date} unblocked successfully`))
        .catch((err) => {
            console.log(err);
            throw err;
        });
