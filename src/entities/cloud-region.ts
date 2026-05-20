import type { CountryCode, ISODate, Provenance } from "./shared";

/**
 * A named cloud region operated by a CloudProvider.
 *
 * Regions are the granular unit users actually deploy into. We
 * record the provider's announced location, but do not invent
 * "exact datacenter" metadata — providers deliberately keep that
 * fuzzy and so do we.
 */
export interface CloudRegion {
  /** Provider-scoped slug, e.g. "eu-central-1". */
  readonly slug: string;
  /** Slug of the parent CloudProvider, e.g. "aws". */
  readonly providerSlug: string;
  /** Display label, e.g. "EU (Frankfurt)". */
  readonly displayName: string;
  /** ISO 3166-1 alpha-2 country code of the announced location. */
  readonly countryCode: CountryCode;
  /** City slug of the announced metro, when published. */
  readonly citySlug?: string;
  /** Date the region was made generally available (if disclosed). */
  readonly launchedAt?: ISODate;
  /** Region's purpose, when explicitly tagged: e.g. "general",
   *  "sovereign", "gov", "secret". */
  readonly purpose?: CloudRegionPurpose;
  readonly provenance: Provenance;
}

export type CloudRegionPurpose =
  | "general"
  | "sovereign"
  | "government"
  | "classified"
  | "edge";
