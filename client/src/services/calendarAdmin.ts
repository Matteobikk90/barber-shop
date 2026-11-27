import { db } from "db/firebase";
import {
  browserLocalPersistence,
  browserSessionPersistence,
  getAuth,
  onAuthStateChanged,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import type { Unsubscribe } from "firebase/firestore";

export type CalendarAdminAccess =
  | "checking"
  | "signed-out"
  | "allowed"
  | "denied"
  | "unavailable";

export const subscribeToCalendarAdmin = (
  onAccess: (access: CalendarAdminAccess) => void
): Unsubscribe => {
  let unsubscribeRole: Unsubscribe | undefined;
  const unsubscribeAuth = onAuthStateChanged(getAuth(), (user) => {
    unsubscribeRole?.();
    unsubscribeRole = undefined;

    if (!user) {
      onAccess("signed-out");
      return;
    }

    onAccess("checking");
    // Keep using the permissions already provisioned for special openings.
    unsubscribeRole = onSnapshot(
      doc(db, "openingAdmins", user.uid),
      { includeMetadataChanges: true },
      (snapshot) => {
        if (snapshot.metadata.fromCache || snapshot.metadata.hasPendingWrites) {
          onAccess("checking");
        } else {
          onAccess(snapshot.data()?.enabled === true ? "allowed" : "denied");
        }
      },
      () => onAccess("unavailable")
    );
  });

  return () => {
    unsubscribeRole?.();
    unsubscribeAuth();
  };
};

export const signInCalendarAdmin = async (
  email: string,
  password: string,
  rememberDevice: boolean
) => {
  const auth = getAuth();
  await setPersistence(
    auth,
    rememberDevice ? browserLocalPersistence : browserSessionPersistence
  );
  await signInWithEmailAndPassword(auth, email, password);
};

export const signOutCalendarAdmin = () => signOut(getAuth());
