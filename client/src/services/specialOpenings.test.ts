import { doc, onSnapshot, runTransaction } from "firebase/firestore";
import {
  readSpecialOpenings,
  saveSpecialOpening,
  SpecialOpeningBlockedError,
  subscribeToSpecialOpenings,
} from "./specialOpenings";
import { initialSpecialOpenings } from "utils/calendar";

jest.mock("db/firebase", () => ({ db: {} }));
jest.mock("firebase/firestore", () => ({
  doc: jest.fn((_db, collection, id) => ({ collection, id })),
  runTransaction: jest.fn(),
  onSnapshot: jest.fn(),
}));

const mockSnapshot = (data?: Record<string, unknown>, fromCache = false, hasPendingWrites = false) => ({
  exists: () => !!data,
  data: () => data,
  metadata: { fromCache, hasPendingWrites },
});
const mockRunTransaction = runTransaction as jest.Mock;
const transactionGet = jest.fn();
const transactionSet = jest.fn();
const christmasOpening = { from: 540, to: 1020 };

describe("special opening settings", () => {
  beforeEach(() => {
    jest.useFakeTimers().setSystemTime(new Date("2026-11-27T12:00:00Z"));
    jest.clearAllMocks();
    (doc as jest.Mock).mockImplementation((_db, collection, id) => ({ collection, id }));
    transactionGet.mockReset().mockResolvedValue(mockSnapshot());
    mockRunTransaction.mockImplementation((_db, callback) =>
      callback({ get: transactionGet, set: transactionSet })
    );
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("uses the default only if there are no saved settings yet", () => {
    expect(readSpecialOpenings(mockSnapshot())).toEqual(initialSpecialOpenings);
    expect(readSpecialOpenings(mockSnapshot({ openings: {} }))).toEqual({});
    expect(readSpecialOpenings(mockSnapshot({ openings: "invalid" }))).toEqual({});
  });

  it("ignores invalid records and entries for days already open", () => {
    expect(readSpecialOpenings(mockSnapshot({
      openings: {
        "2026-12-24": christmasOpening,
        "2026-12-25": christmasOpening,
        "2026-12-26": { from: 780, to: 840 },
        "2026-12-99": christmasOpening,
      },
    }))).toEqual({ "2026-12-25": christmasOpening });
  });

  it("ignores cached or pending openings and then adopts the server state", () => {
    const onOpenings = jest.fn();
    subscribeToSpecialOpenings(onOpenings, jest.fn());
    const notify = (onSnapshot as jest.Mock).mock.calls[0][2];
    const data = { openings: { "2026-12-25": christmasOpening } };
    notify(mockSnapshot(data, true));
    notify(mockSnapshot(data, false, true));
    notify(mockSnapshot(data));

    expect(onOpenings.mock.calls).toEqual([[null], [null], [data.openings]]);
  });

  it("preserves other openings on save and writes only the settings document", async () => {
    await saveSpecialOpening("2026-12-25", christmasOpening);
    expect(transactionSet).toHaveBeenCalledTimes(1);
    expect(transactionSet).toHaveBeenCalledWith(
      { collection: "calendarSettings", id: "specialOpenings" },
      { openings: { ...initialSpecialOpenings, "2026-12-25": christmasOpening } }
    );
    expect(doc).not.toHaveBeenCalledWith(expect.anything(), "bookings", expect.anything());
  });

  it("can revoke the previous 28 December opening without restoring it", async () => {
    await saveSpecialOpening("2026-12-28", null);
    expect(transactionSet).toHaveBeenCalledWith(
      { collection: "calendarSettings", id: "specialOpenings" },
      { openings: {} }
    );
  });

  it("rejects manual blocks before saving", async () => {
    transactionGet
      .mockResolvedValueOnce(mockSnapshot())
      .mockResolvedValueOnce(mockSnapshot({ date: "2026-12-25" }));

    await expect(saveSpecialOpening("2026-12-25", christmasOpening)).rejects.toBeInstanceOf(
      SpecialOpeningBlockedError
    );
    expect(transactionSet).not.toHaveBeenCalled();
  });

  it.each([
    ["2026-11-23", christmasOpening],
    ["2026-12-24", christmasOpening],
    ["2026-12-25", { from: 601, to: 1020 }],
    ["2026-12-25", { from: 780, to: 840 }],
    ["2026-12-25", { from: 900, to: 840 }],
  ])("rejects ineligible dates and invalid hours (%s)", async (date, hours) => {
    await expect(saveSpecialOpening(date, hours)).rejects.toThrow();
    expect(mockRunTransaction).not.toHaveBeenCalled();
  });
});
