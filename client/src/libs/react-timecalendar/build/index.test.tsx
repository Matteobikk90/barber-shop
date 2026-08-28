import { fireEvent, render, screen } from "@testing-library/react";
import TimeCalendar from ".";

describe("TimeCalendar disabled slots", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date(2026, 7, 27, 12, 0, 0));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("does not attach a click handler to an occupied slot", () => {
    const onTimeClick = jest.fn();
    render(
      <TimeCalendar
        disableHistory
        clickable
        timeSlot={30}
        openHours={Array.from({ length: 7 }, () => [9, 19])}
        onTimeClick={onTimeClick}
        bookings={[
          {
            id: "occupied-16",
            start_time: new Date(2026, 7, 27, 16, 0, 0),
            end_time: new Date(2026, 7, 27, 16, 30, 0),
          },
        ]}
        onDateFunction={jest.fn()}
        selectedTime={{ start: "", end: "" }}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /select time/i }));

    const occupiedSlot = screen.getByText("16-00").closest('[role="button"]');
    expect(occupiedSlot).not.toBeNull();
    expect(occupiedSlot?.classList.contains("disabled")).toBe(true);
    expect(occupiedSlot?.getAttribute("aria-disabled")).toBe("true");
    expect(occupiedSlot?.getAttribute("tabindex")).toBe("-1");

    fireEvent.click(occupiedSlot!);
    expect(onTimeClick).not.toHaveBeenCalled();

    fireEvent.click(screen.getByText("16-30"));
    expect(onTimeClick).toHaveBeenCalledTimes(1);
  });
});
