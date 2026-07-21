jest.mock("db/firebase", () => ({ db: {} }));
jest.mock("firebase/firestore", () => ({
  doc: jest.fn(),
  writeBatch: jest.fn(),
}));

import { doc, writeBatch } from "firebase/firestore";
import { deleteBookingsByIds } from "./deleteBookingsByIds";

const mockDelete = jest.fn();
const mockCommit = jest.fn(() => Promise.resolve());
const mockDoc = doc as jest.Mock;
const mockWriteBatch = writeBatch as jest.Mock;

describe("deleteBookingsByIds", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockDoc.mockImplementation((_db, _collection, id) => ({ id }));
    mockWriteBatch.mockReturnValue({
      delete: mockDelete,
      commit: mockCommit,
    });
  });

  it("deletes all bookings in one atomic batch", async () => {
    await deleteBookingsByIds(["booking-1", "booking-2", "booking-3"]);

    expect(mockWriteBatch).toHaveBeenCalledTimes(1);
    expect(mockDelete).toHaveBeenCalledTimes(3);
    expect(mockDelete).toHaveBeenNthCalledWith(1, { id: "booking-1" });
    expect(mockDelete).toHaveBeenNthCalledWith(3, { id: "booking-3" });
    expect(mockCommit).toHaveBeenCalledTimes(1);
  });

  it("does not open a batch when there is nothing to delete", async () => {
    await deleteBookingsByIds([]);

    expect(mockWriteBatch).not.toHaveBeenCalled();
  });
});
