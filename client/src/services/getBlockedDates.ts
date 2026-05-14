import { db } from "db/firebase";
import { collection, doc, getDocs, deleteDoc } from "firebase/firestore";

const blockedDatesRef = collection(db, "blockedDates");

/* Fetch blocked dates from Firestore, auto-delete past ones */
export const getBlockedDates = (): Promise<string[]> =>
    getDocs(blockedDatesRef).then((res) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const dates: string[] = [];

        res.docs.forEach((docSnap) => {
            const date: string = docSnap.data().date;
            const dateObj = new Date(date + "T00:00:00");

            // Auto-delete dates that have already passed
            if (dateObj < today) {
                deleteDoc(doc(db, "blockedDates", docSnap.id))
                    .then(() => console.log(`Blocked date ${date} auto-removed (past)`))
                    .catch((err) => console.log(err));
            } else {
                dates.push(date);
            }
        });

        return dates;
    });
