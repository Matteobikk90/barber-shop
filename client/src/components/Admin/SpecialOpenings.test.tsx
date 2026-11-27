import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { saveSpecialOpening, subscribeToSpecialOpenings } from "services/specialOpenings";
import { initialSpecialOpenings } from "utils/calendar";
import SpecialOpenings from "./SpecialOpenings";

jest.mock("services/specialOpenings", () => ({
  saveSpecialOpening: jest.fn(),
  subscribeToSpecialOpenings: jest.fn(),
  SpecialOpeningBlockedError: class extends Error {},
}));

const subscribeToOpenings = subscribeToSpecialOpenings as jest.MockedFunction<typeof subscribeToSpecialOpenings>;

describe("admin special openings", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers().setSystemTime(new Date("2026-11-27T12:00:00Z"));
    subscribeToOpenings.mockImplementation((notify) => {
      notify(initialSpecialOpenings);
      return jest.fn();
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.useRealTimers();
  });

  it("selects only normally closed, non-blocked dates and saves custom hours", async () => {
    render(<SpecialOpenings blockedDates={["2026-12-26"]} />);
    fireEvent.click(screen.getByRole("button", { name: /scegli data/i }));
    fireEvent.click(screen.getByRole("button", { name: /mese successivo/i }));

    const dateButton = (day: number) => screen.getByRole("button", {
      name: new RegExp(`\\b${day} dicembre 2026`, "i"),
    }) as HTMLButtonElement;
    expect(dateButton(24).disabled).toBe(true);
    expect(dateButton(26).disabled).toBe(true);
    expect(dateButton(28).disabled).toBe(false);
    fireEvent.click(dateButton(25));

    fireEvent.change(screen.getByLabelText("Dalle"), { target: { value: "570" } });
    fireEvent.change(screen.getByLabelText("Alle"), { target: { value: "990" } });
    fireEvent.click(screen.getByRole("button", { name: "Salva apertura" }));
    await waitFor(() => expect(saveSpecialOpening).toHaveBeenCalledWith(
      "2026-12-25", { from: 570, to: 990 }
    ));
    expect(screen.getByText(/pausa pranzo automatica dalle 13:00 alle 14:00/i)).not.toBeNull();
  });

  it("requires confirmation to revoke an opening and leaves bookings untouched", async () => {
    const confirm = jest.spyOn(window, "confirm").mockReturnValue(false);
    render(<SpecialOpenings blockedDates={[]} />);
    const cancel = screen.getByRole("button", { name: "Annulla apertura" });
    fireEvent.click(cancel);
    expect(saveSpecialOpening).not.toHaveBeenCalled();

    confirm.mockReturnValue(true);
    fireEvent.click(cancel);
    await waitFor(() => expect(saveSpecialOpening).toHaveBeenCalledWith("2026-12-28", null));
    expect(confirm).toHaveBeenCalledWith(expect.stringContaining("Quelle già prese resteranno"));
  });
});
