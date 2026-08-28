import { db } from "db/firebase";
import {
    collection,
    deleteDoc,
    doc,
    DocumentData,
    getDocsFromServer,
    onSnapshot,
    QuerySnapshot,
    Unsubscribe,
} from "firebase/firestore";
import type { FirestoreSource } from "services/getBookings";
import { getRomeDateKey } from "utils/bookingDate";

const blockedDatesRef = collection(db, "blockedDates");

const readBlockedDates = (
    snapshot: QuerySnapshot<DocumentData>,
    removePast: boolean
): string[] => {
    const today = getRomeDateKey(new Date());
    const dates: string[] = [];

    snapshot.docs.forEach((document) => {
        const date = document.data().date as string;
        if (date < today) {
            if (removePast) {
                deleteDoc(doc(db, "blockedDates", document.id)).catch((error) =>
                    console.log(error)
                );
            }
        } else {
            dates.push(date);
        }
    });

    return dates;
};

/** Fetch blocked dates from the server and auto-delete past ones. */
export const getBlockedDates = (): Promise<string[]> =>
    getDocsFromServer(blockedDatesRef).then((snapshot) =>
        readBlockedDates(snapshot, true)
    );

export const subscribeToBlockedDates = (
    onDates: (dates: string[], source: FirestoreSource) => void,
    onError?: (error: Error) => void
): Unsubscribe =>
    onSnapshot(
        blockedDatesRef,
        { includeMetadataChanges: true },
        (snapshot) => {
            const fromCache = snapshot.metadata.fromCache;
            onDates(readBlockedDates(snapshot, !fromCache), { fromCache });
        },
        onError
    );
