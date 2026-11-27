import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import {
  signInCalendarAdmin,
  signOutCalendarAdmin,
  subscribeToCalendarAdmin,
} from "services/calendarAdmin";
import { subscribeToBlockedDates } from "services/getBlockedDates";
import { subscribeToBookings } from "services/getBookings";
import { subscribeToSpecialOpenings } from "services/specialOpenings";
import Calendario from "./Calendario";

jest.mock("db/firebase", () => ({ db: {} }));
jest.mock("firebase/firestore", () => ({
  deleteDoc: jest.fn(),
  doc: jest.fn(),
}));
jest.mock("services/calendarAdmin", () => ({
  signInCalendarAdmin: jest.fn(),
  signOutCalendarAdmin: jest.fn(),
  subscribeToCalendarAdmin: jest.fn(),
}));
jest.mock("services/getBookings", () => ({
  getBookings: jest.fn(),
  subscribeToBookings: jest.fn(),
}));
jest.mock("services/getBlockedDates", () => ({
  getBlockedDates: jest.fn(),
  subscribeToBlockedDates: jest.fn(),
}));
jest.mock("services/specialOpenings", () => ({
  saveSpecialOpening: jest.fn(),
  subscribeToSpecialOpenings: jest.fn(),
}));

const subscribeToAuth = subscribeToCalendarAdmin as jest.MockedFunction<
  typeof subscribeToCalendarAdmin
>;
const stopBookings = jest.fn();
const stopBlockedDates = jest.fn();
const stopOpenings = jest.fn();
const tabLabels = ["Prenotazioni", "Blocco date", "Aperture straordinarie"];
const button = (name: string) => screen.getByRole("button", { name });

const fillLogin = () => {
  fireEvent.change(screen.getByLabelText("Email"), {
    target: { value: "titolare@example.com" },
  });
  fireEvent.change(screen.getByLabelText("Password"), {
    target: { value: "test-password" },
  });
};

describe("calendar admin entry", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    subscribeToAuth.mockImplementation((notify) => {
      notify("signed-out");
      return jest.fn();
    });
    (subscribeToBookings as jest.Mock).mockReturnValue(stopBookings);
    (subscribeToBlockedDates as jest.Mock).mockReturnValue(stopBlockedDates);
    (subscribeToSpecialOpenings as jest.Mock).mockImplementation((notify) => {
      notify({});
      return stopOpenings;
    });
  });

  it("does not display any tab or subscribe to its data before authorization", () => {
    render(<Calendario />);

    expect(button("Accedi")).not.toBeNull();
    for (const status of ["checking", "denied", "unavailable"] as const) {
      act(() => subscribeToAuth.mock.calls[0][0](status));
      for (const name of tabLabels) {
        expect(screen.queryByRole("button", { name })).toBeNull();
      }
    }
    expect(subscribeToBookings).not.toHaveBeenCalled();
    expect(subscribeToBlockedDates).not.toHaveBeenCalled();
    expect(subscribeToSpecialOpenings).not.toHaveBeenCalled();
  });

  it("uses one login for all three tabs and disconnects their data on logout", async () => {
    render(<Calendario />);
    fillLogin();
    const remember = screen.getByRole("checkbox", {
      name: "Ricorda questo dispositivo",
    }) as HTMLInputElement;
    expect(remember.checked).toBe(true);
    fireEvent.click(button("Accedi"));
    await waitFor(() =>
      expect(signInCalendarAdmin).toHaveBeenCalledWith(
        "titolare@example.com",
        "test-password",
        true
      )
    );

    const notify = subscribeToAuth.mock.calls[0][0];
    act(() => notify("allowed"));
    expect(button("Prenotazioni")).not.toBeNull();
    fireEvent.click(button("Blocco date"));
    expect(button("Blocca 🔒")).not.toBeNull();
    fireEvent.click(button("Aperture straordinarie"));
    expect(button("Salva apertura")).not.toBeNull();
    expect(screen.queryByLabelText("Email")).toBeNull();
    expect(subscribeToAuth).toHaveBeenCalledTimes(1);

    (signOutCalendarAdmin as jest.Mock).mockImplementation(async () => {
      notify("signed-out");
    });
    fireEvent.click(button("Esci"));
    expect(await screen.findByRole("button", { name: "Accedi" })).not.toBeNull();
    for (const name of tabLabels) {
      expect(screen.queryByRole("button", { name })).toBeNull();
    }
    expect(stopBookings).toHaveBeenCalledTimes(1);
    expect(stopBlockedDates).toHaveBeenCalledTimes(1);
    expect(stopOpenings).toHaveBeenCalledTimes(1);
  });

  it("can open on a restored session and closes if authorization is revoked", () => {
    subscribeToAuth.mockImplementationOnce((notify) => {
      notify("allowed");
      return jest.fn();
    });
    render(<Calendario />);
    expect(button("Prenotazioni")).not.toBeNull();
    expect(screen.queryByLabelText("Email")).toBeNull();
    expect(signInCalendarAdmin).not.toHaveBeenCalled();

    act(() => subscribeToAuth.mock.calls[0][0]("denied"));
    expect(screen.queryByRole("button", { name: "Prenotazioni" })).toBeNull();
    expect(stopBookings).toHaveBeenCalledTimes(1);
  });

  it("can sign in without remembering a shared device", async () => {
    render(<Calendario />);
    fillLogin();
    fireEvent.click(screen.getByRole("checkbox", { name: "Ricorda questo dispositivo" }));
    fireEvent.click(button("Accedi"));
    await waitFor(() =>
      expect(signInCalendarAdmin).toHaveBeenCalledWith(
        "titolare@example.com",
        "test-password",
        false
      )
    );
  });
});
