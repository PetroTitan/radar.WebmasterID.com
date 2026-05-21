import type { ConfidenceLevel, ISODate } from "./shared";

/**
 * Row-level dataset records.
 *
 * A dataset row is the atomic unit of ingested infrastructure
 * data. Each row carries the same provenance fields regardless of
 * record type, so the validator can apply uniform integrity rules
 * (source resolution, URL validity, ISO dates, entity-ref
 * resolution).
 *
 * Concrete record types extend `IngestedRecord` with normalized
 * fields specific to the source. Optional fields are `undefined`
 * when the underlying source does not publish the value; the
 * platform refuses to use sentinels like "unknown" as factual
 * values.
 *
 * Reviewed rows live in `src/data/research/*.reviewed.ts` and are
 * the only rows that public pages may render. Generated /
 * un-reviewed rows live in `src/generated/` (gitignored).
 */
export interface IngestedRecord {
  /** Stable identifier for the row, scoped to its source. */
  readonly id: string;
  /** SourceRecord slug. Must exist in source-registry. */
  readonly sourceId: string;
  /** Direct URL to the specific source page or API endpoint that
   *  supplied the row. */
  readonly sourceUrl: string;
  /** ISO date the row was observed at source. */
  readonly observedAt: ISODate;
  /** ISO date the row's editorial review was last signed off. */
  readonly lastVerified: ISODate;
  readonly confidence: ConfidenceLevel;
  /** Human-readable source name for inline rendering, e.g.
   *  "AWS Global Infrastructure". */
  readonly rawSourceName: string;
  /** Entity refs the row pertains to. Format:
   *  `country:<slug>` | `city:<slug>` | `ixp:<slug>`. */
  readonly relatedEntityRefs?: ReadonlyArray<string>;
  /** Row-specific limitations / caveats. */
  readonly limitations?: ReadonlyArray<string>;
}

/** Hyperscaler slug used by ingested cloud-region rows. Distinct
 *  from the editorial `CloudProvider` entity type — this is just
 *  the provider's identifier for grouping rows. */
export type CloudProviderSlug = "aws" | "gcp" | "azure";

export interface CloudProviderRegionRecord extends IngestedRecord {
  readonly recordType: "cloud-region";
  readonly provider: CloudProviderSlug;
  /** Provider-published region code, verbatim (e.g. "eu-central-1"). */
  readonly regionCode: string;
  /** Provider-published display name (e.g. "EU (Frankfurt)"). */
  readonly displayName: string;
  /** ISO 3166-1 alpha-2 country code. */
  readonly countryCode: string;
  /** Provider-published geography label (e.g. "Europe",
   *  "Americas", "Asia Pacific"). */
  readonly geography: string;
  /** Radar city slug, when the region is anchored to a metro in
   *  the entity graph. */
  readonly metroSlug?: string;
  /** Availability-zone count, only when officially disclosed. */
  readonly availabilityZoneCount?: number;
  /** Date the region was made generally available, when disclosed. */
  readonly launchedAt?: ISODate;
  /** Provider-tagged region purpose (general / sovereign / gov). */
  readonly purpose?: "general" | "sovereign" | "government";
}

export interface PeeringDBInternetExchangeRecord extends IngestedRecord {
  readonly recordType: "peeringdb-ix";
  /** PeeringDB IX ID, when verified. */
  readonly peeringDbId?: number;
  readonly name: string;
  /** Operating organisation. */
  readonly operator: string;
  /** ISO 3166-1 alpha-2 country code. */
  readonly countryCode: string;
  /** Radar city slug. */
  readonly metroSlug?: string;
  /** Operator's official website. */
  readonly websiteUrl?: string;
}

export interface PeeringDBFacilityRecord extends IngestedRecord {
  readonly recordType: "peeringdb-facility";
  readonly peeringDbId?: number;
  readonly name: string;
  readonly operator: string;
  readonly countryCode: string;
  readonly metroSlug?: string;
  /** Carrier-neutral classification (true / false). Optional —
   *  classification absent when PeeringDB's operator field is
   *  ambiguous. */
  readonly carrierNeutral?: boolean;
}

/** Discriminated union of every row type the platform stores. */
export type InfrastructureDatasetRow =
  | CloudProviderRegionRecord
  | PeeringDBInternetExchangeRecord
  | PeeringDBFacilityRecord;
