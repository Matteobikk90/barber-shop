import {
  getBookingSlotDocumentId,
  isBookingSlotUnavailable,
  parseBookingDateTime,
} from "./bookingDate";

describe("bookingDate", () => {
  it("parses legacy Rome dates consistently instead of relying on the browser", () => {
    expect(parseBookingDateTime("2026-09-05 16:00:00").toISOString()).toBe(
      "2026-09-05T14:00:00.000Z"
    );
    expect(parseBookingDateTime("2026-12-05 16:00:00").toISOString()).toBe(
      "2026-12-05T15:00:00.000Z"
    );
  });

  it("creates the same document id for every client booking the same Rome slot", () => {
    expect(getBookingSlotDocumentId("2026-09-05T14:00:00.000Z")).toBe(
      "slot_2026-09-05_16-00"
    );
  });

  it("blocks a click through logic even when CSS is missing", () => {
    const selectedTime = new Date("2026-09-05T14:00:00.000Z");
    const bookings = [
      {
        start_time: new Date("2026-09-05T14:00:00.000Z"),
        end_time: new Date("2026-09-05T14:30:00.000Z"),
      },
    ];

    expect(isBookingSlotUnavailable(selectedTime, bookings, [])).toBe(true);
    expect(
      isBookingSlotUnavailable(
        new Date("2026-09-05T15:00:00.000Z"),
        [],
        ["2026-09-05"]
      )
    ).toBe(true);
    expect(
      isBookingSlotUnavailable(
        new Date("2026-09-06T15:00:00.000Z"),
        bookings,
        []
      )
    ).toBe(false);
  });
});
