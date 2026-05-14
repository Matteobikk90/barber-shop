import { db } from "db/firebase";
import { doc, setDoc } from "firebase/firestore";

/* Add a blocked date to Firestore. Date format: "YYYY-MM-DD" */
export const addBlockedDate = (date: string): Promise<void> =>
    setDoc(doc(db, "blockedDates", date), { date })
        .then(() => console.log(`Date ${date} blocked successfully`))
        .catch((err) => {
            console.log(err);
            throw err;
        });
