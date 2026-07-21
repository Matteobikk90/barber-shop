import { fireEvent, render, screen } from "@testing-library/react";
import { useState } from "react";
import BlockDatePicker from "./BlockDatePicker";

const DatePickerHarness = () => {
  const [value, setValue] = useState("");

  return (
    <BlockDatePicker
      value={value}
      min="2026-07-21"
      unavailableDates={["2026-07-23"]}
      onChange={setValue}
    />
  );
};

describe("BlockDatePicker", () => {
  it("opens its calendar from the visible button and selects an available date", () => {
    render(<DatePickerHarness />);

    fireEvent.click(screen.getByRole("button", { name: /scegli data/i }));

    expect(screen.getByRole("dialog", { name: "Scegli una data" })).not.toBeNull();
    expect(
      (screen.getByRole("button", {
        name: /23 luglio 2026/i,
      }) as HTMLButtonElement).disabled
    ).toBe(true);

    fireEvent.click(screen.getByRole("button", { name: /24 luglio 2026/i }));

    expect(screen.queryByRole("dialog", { name: "Scegli una data" })).toBeNull();
    expect(screen.getByRole("button", { name: /24 lug 2026/i })).not.toBeNull();
  });
});
