import { BookingTypes } from "types/booking.types";
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
import { normalizeBookingDateTime, parseBookingDateTime } from "utils/bookingDate";
import { yesterday } from "utils/utilities";

const productsRef = collection(db, "bookings");

const readBookings = (
    snapshot: QuerySnapshot<DocumentData>
): Partial<BookingTypes>[] =>
    snapshot.docs.map((document) => {
        const data = document.data();
        return {
            id: document.id,
            service: data.service,
            name: data.name,
            surname: data.surname,
            phone: data.phone,
            email: data.email,
            readable_start_time: data.readable_start_time,
            start_time: normalizeBookingDateTime(data.start_time),
            end_time: normalizeBookingDateTime(data.end_time),
        };
    });

const removePastBookings = (bookings: Partial<BookingTypes>[]) => {
    const cutoff = Date.now() - yesterday;
    bookings.forEach((booking) => {
        if (!booking.id || !booking.start_time) return;
        const startTime = parseBookingDateTime(booking.start_time).getTime();
        if (!Number.isNaN(startTime) && startTime < cutoff) {
            deleteDoc(doc(db, "bookings", booking.id)).catch((error) =>
                console.log(error)
            );
        }
    });
};

/** Read the authoritative server state, never a stale browser cache. */
export const getBookings = () =>
    getDocsFromServer(productsRef).then((snapshot) => {
        const bookings = readBookings(snapshot);
        removePastBookings(bookings);
        return bookings;
    });

export type FirestoreSource = { fromCache: boolean };

/** Keep every open calendar aligned with Firestore changes made by other devices. */
export const subscribeToBookings = (
    onBookings: (
        bookings: Partial<BookingTypes>[],
        source: FirestoreSource
    ) => void,
    onError?: (error: Error) => void
): Unsubscribe =>
    onSnapshot(
        productsRef,
        { includeMetadataChanges: true },
        (snapshot) => {
            const bookings = readBookings(snapshot);
            if (!snapshot.metadata.fromCache) removePastBookings(bookings);
            onBookings(bookings, { fromCache: snapshot.metadata.fromCache });
        },
        onError
    );
