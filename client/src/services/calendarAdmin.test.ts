import {
  browserLocalPersistence,
  browserSessionPersistence,
  getAuth,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { signInCalendarAdmin } from "./calendarAdmin";

jest.mock("db/firebase", () => ({ db: {} }));
jest.mock("firebase/firestore", () => ({}));
jest.mock("firebase/auth", () => ({
  browserLocalPersistence: { type: "LOCAL" },
  browserSessionPersistence: { type: "SESSION" },
  getAuth: jest.fn(),
  setPersistence: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
}));

describe("calendar admin session", () => {
  it.each([
    [true, browserLocalPersistence],
    [false, browserSessionPersistence],
  ])("applies the chosen persistence before sign-in (remember: %s)", async (remember, persistence) => {
    const auth = { name: "test-auth" };
    (getAuth as jest.Mock).mockReturnValue(auth);

    await signInCalendarAdmin("titolare@example.com", "test-password", remember);

    expect(setPersistence).toHaveBeenCalledWith(auth, persistence);
    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
      auth,
      "titolare@example.com",
      "test-password"
    );
    expect((setPersistence as jest.Mock).mock.invocationCallOrder[0]).toBeLessThan(
      (signInWithEmailAndPassword as jest.Mock).mock.invocationCallOrder[0]
    );
  });
});
