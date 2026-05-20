import type { Country } from "@/entities";

/**
 * Verified country records.
 *
 * Empty by design. New countries are added only after editorial
 * review of their summary against tier-1/2 sources cited in
 * `provenance.sources`. Pages handle the empty registry by
 * rendering an "Index pending verification" notice.
 */
export const COUNTRIES: ReadonlyArray<Country> = [];

export function getCountry(slug: string): Country | undefined {
  return COUNTRIES.find((country) => country.slug === slug);
}

export function listCountrySlugs(): ReadonlyArray<string> {
  return COUNTRIES.map((country) => country.slug);
}
