import { db } from "db/firebase";
import { doc, writeBatch } from "firebase/firestore";

const FIRESTORE_BATCH_LIMIT = 500;

/** Delete a group of bookings atomically: either all documents are removed or none are. */
export const deleteBookingsByIds = (bookingIds: string[]): Promise<void> => {
  if (bookingIds.length === 0) return Promise.resolve();
  if (bookingIds.length > FIRESTORE_BATCH_LIMIT) {
    return Promise.reject(new Error("Too many bookings for a single batch"));
  }

  const batch = writeBatch(db);
  bookingIds.forEach((bookingId) => {
    batch.delete(doc(db, "bookings", bookingId));
  });

  return batch.commit();
};
