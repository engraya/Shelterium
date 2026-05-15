import { describe, it, expect } from "vitest";
import { getFilterValues, filterData } from "utils/filterData";

describe("filterData", () => {
  it("contains 10 filter groups", () => {
    expect(filterData).toHaveLength(10);
  });

  it("each filter group has items, placeholder, and queryName", () => {
    for (const group of filterData) {
      expect(group.items.length).toBeGreaterThan(0);
      expect(group.placeholder).toBeTruthy();
      expect(group.queryName).toBeTruthy();
    }
  });

  it("every filter item has name and value", () => {
    for (const group of filterData) {
      for (const item of group.items) {
        expect(item.name).toBeTruthy();
        expect(item.value).toBeTruthy();
      }
    }
  });
});

describe("getFilterValues", () => {
  it("returns only defined values", () => {
    const result = getFilterValues({ purpose: "for-sale", sort: "price-asc" });
    expect(result.some((r) => r.value === undefined)).toBe(false);
  });

  it("returns entries for provided params", () => {
    const result = getFilterValues({ purpose: "for-rent", roomsMin: 2 });
    const names = result.map((r) => r.name);
    expect(names).toContain("purpose");
    expect(names).toContain("roomsMin");
  });

  it("returns empty array when no params given", () => {
    const result = getFilterValues({});
    expect(result).toHaveLength(0);
  });
});
