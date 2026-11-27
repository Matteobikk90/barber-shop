import { db } from "db/firebase";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import type { Unsubscribe } from "firebase/firestore";

export type OpeningAdminAccess =
  | "checking"
  | "signed-out"
  | "allowed"
  | "denied"
  | "unavailable";

export const subscribeToOpeningAdmin = (
  onAccess: (access: OpeningAdminAccess) => void
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

export const signInOpeningAdmin = (email: string, password: string) =>
  signInWithEmailAndPassword(getAuth(), email, password);

export const signOutOpeningAdmin = () => signOut(getAuth());
