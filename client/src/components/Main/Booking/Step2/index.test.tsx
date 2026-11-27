import { act, fireEvent, render, screen } from "@testing-library/react";
import { subscribeToBlockedDates } from "services/getBlockedDates";
import { subscribeToBookings } from "services/getBookings";
import { subscribeToSpecialOpenings } from "services/specialOpenings";
import { initialSpecialOpenings } from "utils/calendar";
import Step2 from ".";

jest.mock("services/getBookings", () => ({ subscribeToBookings: jest.fn() }));
jest.mock("services/getBlockedDates", () => ({
  subscribeToBlockedDates: jest.fn(),
}));
jest.mock("services/specialOpenings", () => ({
  subscribeToSpecialOpenings: jest.fn(),
}));

const mockBookings = subscribeToBookings as jest.MockedFunction<
  typeof subscribeToBookings
>;
const mockBlockedDates = subscribeToBlockedDates as jest.MockedFunction<
  typeof subscribeToBlockedDates
>;
const mockOpenings = subscribeToSpecialOpenings as jest.MockedFunction<
  typeof subscribeToSpecialOpenings
>;

describe("special openings in the public calendar", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2026-11-27T12:00:00.000Z"));
    mockBookings.mockImplementation((onBookings) => {
      onBookings(
        [
          {
            id: "occupied",
            start_time: "2026-12-28T14:00:00.000Z",
            end_time: "2026-12-28T14:30:00.000Z",
          },
        ],
        { fromCache: false }
      );
      return jest.fn();
    });
    mockBlockedDates.mockImplementation((onDates) => {
      onDates([], { fromCache: false });
      return jest.fn();
    });
    mockOpenings.mockImplementation((onOpenings) => {
      onOpenings(initialSpecialOpenings);
      return jest.fn();
    });
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("offers the two Rome-time windows and disables lunch and occupied slots", () => {
    const handleBookingInfo = jest.fn();
    const { container } = render(<Step2 handleBookingInfo={handleBookingInfo} />);

    fireEvent.click(screen.getByText("chevron_right"));
    const specialDay = container.querySelector(".calendar .cell.t28-12");
    expect(specialDay?.classList.contains("special-opening")).toBe(true);
    const ordinaryMonday = container.querySelector(".calendar .cell.closed-date.t21-12");
    expect(ordinaryMonday?.getAttribute("aria-disabled")).toBe("true");
    fireEvent.click(ordinaryMonday!);
    expect(screen.queryByText("09-00")).toBeNull();

    fireEvent.click(specialDay!);
    const availableSlots = Array.from(
      container.querySelectorAll('.optionHolder .cell[aria-disabled="false"]'),
      (slot) => slot.textContent
    );
    expect(availableSlots).toEqual([
      "09-00", "09-30", "10-00", "10-30", "11-00", "11-30", "12-00", "12-30",
      "14-00", "14-30", "15-30", "16-00", "16-30",
    ]);
    for (const label of ["13-00", "13-30", "15-00"]) {
      const slot = screen.getByText(label).closest('[role="button"]');
      expect(slot?.getAttribute("aria-disabled")).toBe("true");
      fireEvent.click(slot!);
    }
    expect(handleBookingInfo).not.toHaveBeenCalled();

    fireEvent.click(screen.getByText("16-30"));
    expect(handleBookingInfo).toHaveBeenCalledWith(
      expect.objectContaining({
        start_time: "2026-12-28T15:30:00.000Z",
        end_time: "2026-12-28T16:00:00.000Z",
      })
    );
  });

  it("offers no selectable slots if the date was manually blocked", () => {
    mockBlockedDates.mockImplementationOnce((onDates) => {
      onDates(["2026-12-28"], { fromCache: false });
      return jest.fn();
    });
    const handleBookingInfo = jest.fn();
    const { container } = render(<Step2 handleBookingInfo={handleBookingInfo} />);

    fireEvent.click(screen.getByText("chevron_right"));
    expect(
      container.querySelector(".calendar .cell.t28-12")?.getAttribute("aria-disabled")
    ).toBe("true");
    fireEvent.click(container.querySelector(".calendar .cell.t29-12")!);
    fireEvent.click(screen.getByText("chevron_left"));

    const firstSlot = screen.getByText("09-00").closest('[role="button"]');
    expect(firstSlot?.getAttribute("aria-disabled")).toBe("true");
    expect(
      container.querySelector('.optionHolder .cell[aria-disabled="false"]')
    ).toBeNull();
    fireEvent.click(firstSlot!);
    expect(handleBookingInfo).not.toHaveBeenCalled();
  });

  it("updates a reopened holiday and returns it to closed when revoked", () => {
    mockOpenings.mockImplementationOnce((onOpenings) => {
      onOpenings({ "2026-12-25": { from: 18 * 60 + 30, to: 20 * 60 } });
      return jest.fn();
    });
    const handleBookingInfo = jest.fn();
    const { container } = render(<Step2 handleBookingInfo={handleBookingInfo} />);

    fireEvent.click(screen.getByText("chevron_right"));
    const christmas = container.querySelector(".calendar .cell.t25-12")!;
    expect(christmas.getAttribute("aria-disabled")).toBe("false");
    expect(
      container.querySelector(".calendar .cell.t26-12")?.getAttribute("aria-disabled")
    ).toBe("true");
    fireEvent.click(christmas);
    expect(screen.queryByText("20-00")).toBeNull();
    fireEvent.click(screen.getByText("19-30"));
    expect(handleBookingInfo).toHaveBeenCalledWith(
      expect.objectContaining({ start_time: "2026-12-25T18:30:00.000Z" })
    );

    act(() => mockOpenings.mock.calls.at(-1)![0]({}));
    expect(
      container.querySelector('.optionHolder .cell[aria-disabled="false"]')
    ).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "Scegli un'altra data" }));
    expect(
      container.querySelector(".calendar .cell.t25-12")?.getAttribute("aria-disabled")
    ).toBe("true");
  });

  it("keeps ordinary days usable if the special openings have not synced", () => {
    mockOpenings.mockImplementationOnce((onOpenings) => {
      onOpenings(null);
      return jest.fn();
    });
    const { container } = render(<Step2 handleBookingInfo={jest.fn()} />);
    fireEvent.click(screen.getByText("chevron_right"));

    expect(
      container.querySelector(".calendar .cell.t28-12")?.getAttribute("aria-disabled")
    ).toBe("true");
    expect(
      container.querySelector(".calendar .cell.t29-12")?.getAttribute("aria-disabled")
    ).toBe("false");
  });
});
