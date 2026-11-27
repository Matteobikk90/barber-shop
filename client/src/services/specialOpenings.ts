import { db } from "db/firebase";
import { doc, onSnapshot, runTransaction } from "firebase/firestore";
import type { DocumentSnapshot } from "firebase/firestore";
import { getRomeDateKey } from "utils/bookingDate";
import {
  initialSpecialOpenings,
  isNormallyClosedDate,
  isValidSpecialOpening,
  SpecialOpening,
  SpecialOpenings,
} from "utils/calendar";

export const getSpecialOpeningsRef = () =>
  doc(db, "calendarSettings", "specialOpenings");

export const readSpecialOpenings = (
  snapshot: Pick<DocumentSnapshot, "exists" | "data">
): SpecialOpenings => {
  if (!snapshot.exists()) return initialSpecialOpenings;

  const openings = snapshot.data()?.openings;
  if (!openings || typeof openings !== "object" || Array.isArray(openings)) {
    return {};
  }
  const valid: Record<string, SpecialOpening> = {};
  for (const [date, opening] of Object.entries(openings)) {
    if (isNormallyClosedDate(date) && isValidSpecialOpening(opening)) {
      valid[date] = { from: opening.from, to: opening.to };
    }
  }
  return valid;
};

/** Reopen dates only on server-confirmed settings, never on a cached copy. */
export const subscribeToSpecialOpenings = (
  onOpenings: (openings: SpecialOpenings | null) => void,
  onError: (error: Error) => void
) =>
  onSnapshot(
    getSpecialOpeningsRef(),
    { includeMetadataChanges: true },
    (snapshot) => {
      if (snapshot.metadata.fromCache || snapshot.metadata.hasPendingWrites) {
        onOpenings(null);
        return;
      }
      onOpenings(readSpecialOpenings(snapshot));
    },
    onError
  );

export class SpecialOpeningBlockedError extends Error {
  constructor() {
    super("This date has a manual block");
    this.name = "SpecialOpeningBlockedError";
  }
}

/** Save or revoke one opening without touching any bookings or other dates. */
export const saveSpecialOpening = async (
  date: string,
  opening: SpecialOpening | null
) => {
  const today = getRomeDateKey(new Date());
  if (
    date < today ||
    !isNormallyClosedDate(date) ||
    (opening !== null && !isValidSpecialOpening(opening))
  ) {
    throw new Error("Invalid date or hours for a special opening");
  }

  const settings = getSpecialOpeningsRef();
  await runTransaction(db, async (transaction) => {
    const snapshot = await transaction.get(settings);
    if (opening) {
      const block = await transaction.get(doc(db, "blockedDates", date));
      if (block.exists()) throw new SpecialOpeningBlockedError();
    }
    const openings = { ...readSpecialOpenings(snapshot) };
    if (opening) openings[date] = { from: opening.from, to: opening.to };
    else delete openings[date];
    transaction.set(settings, { openings });
  });
};
