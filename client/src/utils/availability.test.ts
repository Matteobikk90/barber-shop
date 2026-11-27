import { isSelectableRomeBookingStart } from "./availability";
import { getOpeningHoursByDate, initialSpecialOpenings } from "./calendar";

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

  it.each([
    ["08:30", false],
    ["09:00", true],
    ["12:30", true],
    ["13:00", false],
    ["13:30", false],
    ["14:00", true],
    ["16:30", true],
    ["17:00", false],
  ])("checks the 28 December opening at %s Rome time", (time, available) => {
    expect(
      isSelectableRomeBookingStart(
        `2026-12-28 ${time}:00`,
        getOpeningHoursByDate(initialSpecialOpenings)
      )
    ).toBe(available);
  });

  it("does not change other closed days or repeat the exception every year", () => {
    expect(isSelectableRomeBookingStart("2026-12-21 10:00:00")).toBe(false);
    expect(isSelectableRomeBookingStart("2026-12-25 10:00:00")).toBe(false);
    expect(isSelectableRomeBookingStart("2026-12-27 10:00:00")).toBe(false);
    expect(isSelectableRomeBookingStart("2027-12-28 18:30:00")).toBe(true);
  });

  it("allows an annual holiday only for its configured year and hours", () => {
    const hours = getOpeningHoursByDate({
      "2026-12-25": { from: 12 * 60 + 30, to: 20 * 60 },
    });
    expect(isSelectableRomeBookingStart("2026-12-25 12:30:00", hours)).toBe(true);
    expect(isSelectableRomeBookingStart("2026-12-25 13:30:00", hours)).toBe(false);
    expect(isSelectableRomeBookingStart("2026-12-25 19:30:00", hours)).toBe(true);
    expect(isSelectableRomeBookingStart("2026-12-25 20:00:00", hours)).toBe(false);
    expect(isSelectableRomeBookingStart("2027-12-25 12:30:00", hours)).toBe(false);
    expect(isSelectableRomeBookingStart("2026-12-26 12:30:00", hours)).toBe(false);
  });

  it("leaves 24 December and the usual closing times as configured", () => {
    expect(isSelectableRomeBookingStart("2026-12-24 09:00:00")).toBe(true);
    expect(isSelectableRomeBookingStart("2026-12-23 19:30:00")).toBe(false);
    expect(isSelectableRomeBookingStart("2027-01-06 11:00:00")).toBe(false);
  });
});
