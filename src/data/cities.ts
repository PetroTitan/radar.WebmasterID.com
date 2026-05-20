import type { City } from "@/entities";

/**
 * Verified city records.
 *
 * Empty by design. See `countries.ts` for the editorial policy.
 */
export const CITIES: ReadonlyArray<City> = [];

export function getCity(slug: string): City | undefined {
  return CITIES.find((city) => city.slug === slug);
}

export function listCitySlugs(): ReadonlyArray<string> {
  return CITIES.map((city) => city.slug);
}
