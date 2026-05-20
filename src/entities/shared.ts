/**
 * Shared building blocks used across all entity schemas.
 *
 * Every fact in the knowledge graph carries provenance: which source
 * supplied it, how confident we are, and when it was last reviewed.
 * Pages must render these signals — they are part of the published
 * surface, not metadata.
 */

/** ISO-8601 date string. Stored, not constructed at render time. */
export type ISODate = string;

/**
 * Trust tier for a source of record.
 *
 * - tier-1: standards bodies and registries (IANA, ICANN, RIRs, ITU).
 * - tier-2: established neutral aggregators (PeeringDB, TeleGeography,
 *   Cloudflare Radar, World Bank, OECD, Eurostat).
 * - tier-3: vendor-published primary docs (cloud provider region
 *   pages, IXP operator pages). Trusted for self-attested facts.
 * - tier-4: secondary press / industry reporting. Used only with a
 *   tier-1/2/3 corroborator.
 * - unverified: pending review. Never published as a fact.
 */
export type TrustTier = "tier-1" | "tier-2" | "tier-3" | "tier-4" | "unverified";

/**
 * Confidence level attached to a published value or page section.
 *
 * Confidence ≠ trust tier. A tier-1 source can still yield a
 * low-confidence value if the measurement is contested or stale.
 */
export type ConfidenceLevel = "high" | "medium" | "low" | "unverified";

/** Update cadence advertised by a source. */
export type UpdateCadence =
  | "continuous"
  | "daily"
  | "weekly"
  | "monthly"
  | "quarterly"
  | "annual"
  | "irregular"
  | "one-time";

/** A pointer to a source-of-record entry in the registry. */
export interface SourceCitation {
  /** Slug of the SourceRecord in /source-registry. */
  readonly sourceId: string;
  /** Direct URL to the page or dataset that supplied the value. */
  readonly url?: string;
  /** ISO date the citation was last checked against the source. */
  readonly checkedAt?: ISODate;
  /** Optional note (e.g. "Table 3, 2024 release"). */
  readonly note?: string;
}

/** Every published entity carries provenance. */
export interface Provenance {
  /** When the entity record was last reviewed by a human editor. */
  readonly lastUpdated: ISODate;
  /** Overall confidence in the record's published facts. */
  readonly confidence: ConfidenceLevel;
  /** Citations supporting the record. Empty array is allowed but
   *  the page renderer will downgrade displayed confidence. */
  readonly sources: ReadonlyArray<SourceCitation>;
  /** Free-form editorial note shown beneath the metric table. */
  readonly note?: string;
}

/** ISO 3166-1 alpha-2 country code, e.g. "DE", "SG", "US". */
export type CountryCode = string;
