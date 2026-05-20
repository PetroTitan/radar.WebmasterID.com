import type { ISODate, TrustTier, UpdateCadence } from "./shared";

/**
 * A SourceRecord describes one source-of-record in the knowledge graph.
 *
 * SourceRecords are immutable identifiers. Editorial review controls
 * which records are promoted to which trust tier; tier changes get
 * recorded in /docs as governance events.
 */
export interface SourceRecord {
  /** kebab-case identifier, used as the URL slug on /sources. */
  readonly id: string;
  /** Display name, e.g. "RIPE NCC". */
  readonly name: string;
  /** Source category, used to group cards on /sources. */
  readonly category: SourceCategory;
  /** Canonical homepage or dataset URL. */
  readonly url: string;
  /** Trust tier assigned by editorial review. */
  readonly trustTier: TrustTier;
  /** Short license note. "Permissive", "Restricted, attribution
   *  required", "Proprietary — direct link only", etc. */
  readonly licenseNote: string;
  /** ISO date the source's metadata was last verified. */
  readonly lastChecked: ISODate;
  /** How often the source publishes new data. */
  readonly updateFrequency: UpdateCadence;
  /** One-sentence description shown on the source card. */
  readonly description: string;
  /** Optional list of regions/topics the source covers. */
  readonly coverage?: ReadonlyArray<string>;
}

export type SourceCategory =
  | "registry"
  | "measurement"
  | "intergovernmental"
  | "regulator"
  | "industry"
  | "research"
  | "vendor";
