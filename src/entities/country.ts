import type {
  CountryCode,
  EditorialBlock,
  GeoCoordinates,
  Provenance,
} from "./shared";

/**
 * A sovereign country observed as an infrastructure jurisdiction.
 *
 * The Country record is the root of the geography axis of the
 * knowledge graph. Cities, IXPs, cable landings and cloud regions
 * resolve back to a Country for SEO, navigation, and aggregation.
 */
export interface Country {
  /** kebab-case slug, e.g. "germany". URL segment under /countries. */
  readonly slug: string;
  /** ISO 3166-1 alpha-2 code, e.g. "DE". */
  readonly code: CountryCode;
  /** Display name, e.g. "Germany". */
  readonly name: string;
  /** UN macro-region, e.g. "Western Europe". */
  readonly region: string;
  /** Continent label, e.g. "Europe". */
  readonly continent: string;
  /** Plain-prose overview of the country's role in global
   *  infrastructure. Editorial; must be source-cited. */
  readonly summary: string;
  /** Optional shortlist of major infrastructure hub cities (slugs).
   *  Used to power the "related entities" block. */
  readonly hubCitySlugs?: ReadonlyArray<string>;
  /** Optional shortlist of major IXPs operating in-country (slugs). */
  readonly ixpSlugs?: ReadonlyArray<string>;
  /** Optional shortlist of cloud regions hosted in-country.
   *  Format: "<provider-slug>:<region-slug>". */
  readonly cloudRegionRefs?: ReadonlyArray<string>;
  /** Editorial intelligence sections. Author-curated, source-cited
   *  prose. Pages render present sections in document order. */
  readonly editorial?: EditorialBlock;
  /** Approximate country centroid coordinates, used by the map
   *  system. Optional — populate only when the centroid has been
   *  editorially verified against a cited source. */
  readonly coordinates?: GeoCoordinates;
  readonly provenance: Provenance;
}
