import { isSelectableRomeBookingStart } from "./availability";

describe("isSelectableRomeBookingStart", () => {
  it("allows only the boxes shown by the Italian Friday calendar", () => {
    expect(isSelectableRomeBookingStart("2026-11-20T08:00:00.000Z")).toBe(
      true
    ); // 09:00 Rome
    expect(isSelectableRomeBookingStart("2026-11-20T17:30:00.000Z")).toBe(
      true
    ); // 18:30 Rome
    expect(isSelectableRomeBookingStart("2026-11-20T18:00:00.000Z")).toBe(
      false
    ); // 19:00 Rome
  });

  it("rejects lunch closures, off-grid minutes and closed days", () => {
    expect(isSelectableRomeBookingStart("2026-11-20T12:00:00.000Z")).toBe(
      false
    ); // 13:00 Rome
    expect(isSelectableRomeBookingStart("2026-11-20T13:00:00.000Z")).toBe(
      true
    ); // 14:00 Rome
    expect(isSelectableRomeBookingStart("2026-11-20T14:15:00.000Z")).toBe(
      false
    );
    expect(isSelectableRomeBookingStart("2026-11-23T09:00:00.000Z")).toBe(
      false
    ); // Monday
  });
});
