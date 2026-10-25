import { describe, expect, it } from "vitest";
import { parsePropertyFilters } from "@/lib/properties";

describe("parsePropertyFilters", () => {
  it("scopes price filters and price sorting to a country", () => {
    const filters = parsePropertyFilters({ country: "EGYPT", minPrice: "1000000", sort: "price-asc" });
    expect(filters.country).toBe("EGYPT");
    expect(filters.minPrice).toBe(1000000);
    expect(filters.sort).toBe("price-asc");
  });

  it("drops prices and price sorting when the market is not selected", () => {
    const filters = parsePropertyFilters({ minPrice: "1000000", sort: "price-desc" });
    expect(filters.minPrice).toBeUndefined();
    expect(filters.maxPrice).toBeUndefined();
    expect(filters.sort).toBe("newest");
  });

  it("normalizes invalid and unbounded query values", () => {
    const filters = parsePropertyFilters({ page: "-3", bedrooms: "50", maxPrice: "not-a-number", country: "UAE" });
    expect(filters.page).toBe(1);
    expect(filters.bedrooms).toBeUndefined();
    expect(filters.maxPrice).toBeUndefined();
  });
});