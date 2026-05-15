import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("axios");

import axios from "axios";

describe("getForRentData", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("returns an empty array on network error", async () => {
    vi.mocked(axios.get).mockRejectedValueOnce(new Error("Network Error"));
    const { getForRentData } = await import("utils/dataFetch");
    const result = await getForRentData();
    expect(result).toEqual([]);
  });

  it("returns hits on success", async () => {
    const mockHits = [{ id: 1, title: "Test Property" }];
    vi.mocked(axios.get).mockResolvedValueOnce({ data: { hits: mockHits } });
    const { getForRentData } = await import("utils/dataFetch");
    const result = await getForRentData();
    expect(result).toEqual(mockHits);
  });

  it("returns empty array when hits is missing", async () => {
    vi.mocked(axios.get).mockResolvedValueOnce({ data: {} });
    const { getForRentData } = await import("utils/dataFetch");
    const result = await getForRentData();
    expect(result).toEqual([]);
  });
});

describe("getPropertyDetails", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("returns null on error", async () => {
    vi.mocked(axios.get).mockRejectedValueOnce(new Error("Not Found"));
    const { getPropertyDetails } = await import("utils/dataFetch");
    const result = await getPropertyDetails("invalid-id");
    expect(result).toBeNull();
  });

  it("returns property data on success", async () => {
    const mockProperty = { id: 42, title: "Luxury Villa" };
    vi.mocked(axios.get).mockResolvedValueOnce({ data: mockProperty });
    const { getPropertyDetails } = await import("utils/dataFetch");
    const result = await getPropertyDetails("42");
    expect(result).toEqual(mockProperty);
  });
});
