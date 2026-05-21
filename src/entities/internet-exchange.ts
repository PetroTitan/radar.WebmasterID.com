import type {
  CountryCode,
  EditorialBlock,
  GeoCoordinates,
  Provenance,
} from "./shared";

/**
 * An Internet Exchange Point (IXP).
 *
 * IXPs are the physical peering fabrics that move the bulk of
 * regional traffic. Capacity and peer-count figures change weekly,
 * so the entity record carries the structural identity; the
 * volatile metrics live in InfrastructureMetric records pinned to
 * a date.
 */
export interface InternetExchange {
  /** kebab-case slug, e.g. "de-cix-frankfurt". */
  readonly slug: string;
  /** Display name, e.g. "DE-CIX Frankfurt". */
  readonly name: string;
  /** Operating organisation, e.g. "DE-CIX Management GmbH". */
  readonly operator: string;
  /** ISO 3166-1 alpha-2 country code where the IXP is hosted. */
  readonly countryCode: CountryCode;
  /** Slug of the metro city the IXP serves. */
  readonly citySlug: string;
  /** PeeringDB IX ID, when known. Used for cross-linking. */
  readonly peeringDbId?: number;
  /** Plain-prose overview of the IXP's role in the region. */
  readonly summary: string;
  /** IXP's official website. */
  readonly websiteUrl?: string;
  /** Editorial intelligence sections. */
  readonly editorial?: EditorialBlock;
  /** Coordinates of the IXP's primary facility. Used by the map
   *  system. Populate only when the location has been editorially
   *  verified against PeeringDB or the operator's published page. */
  readonly coordinates?: GeoCoordinates;
  readonly provenance: Provenance;
}
