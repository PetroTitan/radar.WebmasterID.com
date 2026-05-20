import type { CountryCode, Provenance } from "./shared";

/**
 * An infrastructure hub city.
 *
 * Cities are first-class entities because the practical unit of
 * internet infrastructure is the metro, not the country (Ashburn vs.
 * Reston vs. Sterling all collapse into "Ashburn" for routing
 * purposes).
 */
export interface City {
  /** kebab-case slug, e.g. "frankfurt". URL segment under /cities. */
  readonly slug: string;
  /** Display name, e.g. "Frankfurt". */
  readonly name: string;
  /** ISO 3166-1 alpha-2 country code. */
  readonly countryCode: CountryCode;
  /** Country slug, redundant with code but used for in-graph linking. */
  readonly countrySlug: string;
  /** Metro alias list, e.g. ["FRA", "Frankfurt am Main"]. */
  readonly aliases?: ReadonlyArray<string>;
  /** Plain-prose overview of the city's infrastructure role. */
  readonly summary: string;
  /** Slugs of IXPs operating in this metro. */
  readonly ixpSlugs?: ReadonlyArray<string>;
  /** Cloud regions hosted in this metro ("<provider>:<region>"). */
  readonly cloudRegionRefs?: ReadonlyArray<string>;
  /** Slugs of subsea cables landing in or routed via this metro. */
  readonly cableSlugs?: ReadonlyArray<string>;
  readonly provenance: Provenance;
}
