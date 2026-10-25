export const PAGE_SIZE = 6;
export const countries = ["EGYPT", "SAUDI_ARABIA", "UAE"] as const;
export const listingTypes = ["SALE", "RENT"] as const;
export const propertyTypes = ["APARTMENT", "VILLA", "TOWNHOUSE", "PENTHOUSE", "COMMERCIAL", "LAND"] as const;
export type Country = (typeof countries)[number];
export type PropertyFilters = { q?: string; country?: Country; city?: string; area?: string; listingType?: (typeof listingTypes)[number]; propertyType?: (typeof propertyTypes)[number]; minPrice?: number; maxPrice?: number; bedrooms?: number; sort: "newest" | "price-asc" | "price-desc"; page: number };

type Input = Record<string, string | string[] | undefined>;
const first = (value: Input[string]) => Array.isArray(value) ? value[0] : value;
const pick = <T extends readonly string[]>(value: string | undefined, choices: T): T[number] | undefined => value && (choices as readonly string[]).includes(value) ? value as T[number] : undefined;
const positive = (value: string | undefined, max: number) => { const n = Number(value); return Number.isInteger(n) && n > 0 && n <= max ? n : undefined; };

export function parsePropertyFilters(input: Input): PropertyFilters {
  const country = pick(first(input.country), countries);
  const requestedSort = first(input.sort);
  const sort = country && (requestedSort === "price-asc" || requestedSort === "price-desc") ? requestedSort : "newest";
  return {
    q: first(input.q)?.trim().slice(0, 100) || undefined, country, city: first(input.city)?.trim().slice(0, 60) || undefined,
    area: first(input.area)?.trim().slice(0, 60) || undefined, listingType: pick(first(input.listingType), listingTypes), propertyType: pick(first(input.propertyType), propertyTypes),
    minPrice: country ? positive(first(input.minPrice), 999999999) : undefined, maxPrice: country ? positive(first(input.maxPrice), 999999999) : undefined,
    bedrooms: positive(first(input.bedrooms), 20), sort, page: positive(first(input.page), 10000) || 1,
  };
}

export const currencyByCountry: Record<Country, string> = { EGYPT: "EGP", SAUDI_ARABIA: "SAR", UAE: "AED" };
export function localizedProperty<T extends Record<string, unknown>>(property: T, locale: "ar" | "en") { return { title: String(property[locale === "ar" ? "titleAr" : "titleEn"]), city: String(property[locale === "ar" ? "cityAr" : "cityEn"]), area: String(property[locale === "ar" ? "areaAr" : "areaEn"]), description: String(property[locale === "ar" ? "descriptionAr" : "descriptionEn"]) }; }
export function formatPrice(price: number, currency: string, locale: "ar" | "en") { return new Intl.NumberFormat(locale === "ar" ? "ar-EG" : "en-US", { style: "currency", currency, maximumFractionDigits: 0 }).format(price); }