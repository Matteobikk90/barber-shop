jest.mock("db/firebase", () => ({ db: {} }));
jest.mock("firebase/firestore", () => ({
  collection: jest.fn(() => ({ kind: "collection" })),
  doc: jest.fn((_db, collectionName, id) => ({ collectionName, id })),
  getDocsFromServer: jest.fn(),
  runTransaction: jest.fn(),
  Timestamp: { now: jest.fn(() => "timestamp") },
}));

import {
  collection,
  doc,
  getDocsFromServer,
  runTransaction,
  Timestamp,
} from "firebase/firestore";
import {
  BookingOutsideOpeningHoursError,
  BookingSlotUnavailableError,
  reserveBookingSlot,
} from "./addBooking";

const mockGetDocsFromServer = getDocsFromServer as jest.Mock;
const mockRunTransaction = runTransaction as jest.Mock;
const mockCollection = collection as jest.Mock;
const mockDoc = doc as jest.Mock;
const mockTimestampNow = Timestamp.now as jest.Mock;
const mockTransactionGet = jest.fn();
const mockTransactionSet = jest.fn();

const booking = {
  service: "Taglio",
  name: "Mario",
  surname: "Rossi",
  start_time: "2026-09-05T14:00:00.000Z",
  end_time: "2026-09-05T14:30:00.000Z",
  phone: 3331234567,
  email: "mario@example.com",
  readable_start_time: "05/09/2026 16:00:00",
};

const exceptionalBooking = {
  ...booking,
  start_time: "2026-12-28T15:30:00.000Z",
  end_time: "2026-12-28T16:00:00.000Z",
  readable_start_time: "28/12/2026 16:30:00",
};

describe("reserveBookingSlot", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockCollection.mockReturnValue({ kind: "collection" });
    mockDoc.mockImplementation((_db, collectionName, id) => ({
      collectionName,
      id,
    }));
    mockTimestampNow.mockReturnValue("timestamp");
    mockGetDocsFromServer.mockResolvedValue({ docs: [] });
    mockRunTransaction.mockImplementation((_db, callback) =>
      callback({ get: mockTransactionGet, set: mockTransactionSet })
    );
    mockTransactionGet.mockReset().mockResolvedValue({ exists: () => false });
  });

  it("rejects an occupied legacy slot before writing", async () => {
    mockGetDocsFromServer.mockResolvedValue({
      docs: [
        {
          data: () => ({
            start_time: "2026-09-05 16:00:00",
            end_time: "2026-09-05 16:30:00",
          }),
        },
      ],
    });

    await expect(reserveBookingSlot(booking)).rejects.toBeInstanceOf(
      BookingSlotUnavailableError
    );
    expect(mockRunTransaction).not.toHaveBeenCalled();
  });

  it("writes a free slot with its deterministic id", async () => {
    await reserveBookingSlot(booking);

    expect(mockTransactionSet).toHaveBeenCalledWith(
      { collectionName: "bookings", id: "slot_2026-09-05_16-00" },
      expect.objectContaining({ name: "Mario", id: "timestamp" })
    );
    expect(mockTransactionGet).toHaveBeenCalledTimes(2);
  });

  it("writes a valid slot during the special opening", async () => {
    await reserveBookingSlot(exceptionalBooking);

    expect(mockTransactionSet).toHaveBeenCalledWith(
      { collectionName: "bookings", id: "slot_2026-12-28_16-30" },
      expect.objectContaining({ start_time: exceptionalBooking.start_time })
    );
    expect(mockTransactionGet).toHaveBeenCalledWith({
      collectionName: "calendarSettings",
      id: "specialOpenings",
    });
  });

  it("books a holiday only using the hours read in the booking transaction", async () => {
    mockTransactionGet
      .mockResolvedValueOnce({ exists: () => false })
      .mockResolvedValueOnce({ exists: () => false })
      .mockResolvedValueOnce({
        exists: () => true,
        data: () => ({ openings: { "2026-12-25": { from: 540, to: 1020 } } }),
      });

    await reserveBookingSlot({
      ...exceptionalBooking,
      start_time: "2026-12-25T15:30:00.000Z",
      end_time: "2026-12-25T16:00:00.000Z",
    });
    expect(mockTransactionSet).toHaveBeenCalledWith(
      { collectionName: "bookings", id: "slot_2026-12-25_16-30" },
      expect.any(Object)
    );
  });

  it.each([
    {},
    { "2026-12-28": { from: 540, to: 960 } },
  ])("rejects a slot when the opening was revoked or shortened (%j)", async (openings) => {
    mockTransactionGet
      .mockResolvedValueOnce({ exists: () => false })
      .mockResolvedValueOnce({ exists: () => false })
      .mockResolvedValueOnce({ exists: () => true, data: () => ({ openings }) });

    await expect(reserveBookingSlot(exceptionalBooking)).rejects.toBeInstanceOf(
      BookingOutsideOpeningHoursError
    );
    expect(mockTransactionSet).not.toHaveBeenCalled();
  });

  it.each([booking, exceptionalBooking])(
    "rejects $readable_start_time if the date was blocked while completing the form",
    async (selectedBooking) => {
      mockTransactionGet
        .mockResolvedValueOnce({ exists: () => false })
        .mockResolvedValueOnce({ exists: () => true });

      await expect(reserveBookingSlot(selectedBooking)).rejects.toBeInstanceOf(
        BookingSlotUnavailableError
      );
      expect(mockTransactionSet).not.toHaveBeenCalled();
    }
  );

  it("rejects 19:00 Rome even if a device submits it directly", async () => {
    await expect(
      reserveBookingSlot({
        ...booking,
        start_time: "2026-09-05T17:00:00.000Z",
        end_time: "2026-09-05T17:30:00.000Z",
        readable_start_time: "05/09/2026 19:00:00",
      })
    ).rejects.toBeInstanceOf(BookingOutsideOpeningHoursError);

    expect(mockGetDocsFromServer).not.toHaveBeenCalled();
    expect(mockRunTransaction).not.toHaveBeenCalled();
  });
});
