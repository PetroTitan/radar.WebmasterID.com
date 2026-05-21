import type { ISODate, Provenance } from "./shared";

/**
 * A submarine fibre-optic cable system.
 *
 * Subsea cable records describe the system identity (name,
 * consortium, ready-for-service date, landing points). Capacity
 * upgrades happen mid-life so design capacity and current operating
 * capacity are kept distinct.
 *
 * Volatile fields — current operating capacity, current
 * consortium share, in-service status — are deliberately NOT
 * stored on the identity record. The cable map updates them on a
 * different cadence than identity changes.
 */
export interface SubseaCable {
  /** kebab-case slug, e.g. "marea". */
  readonly slug: string;
  /** Cable system name. */
  readonly name: string;
  /** Consortium or owners, in declared order. */
  readonly owners: ReadonlyArray<string>;
  /** Ready-for-service date, when disclosed. */
  readonly readyForServiceAt?: ISODate;
  /** Year the cable was originally ready-for-service when only a
   *  year is disclosed (older cables, where day-precision dates
   *  aren't published). Use one of `readyForServiceAt` or
   *  `readyForServiceYear`, not both. */
  readonly readyForServiceYear?: string;
  /** Landing point city slugs, in geographic order along the cable. */
  readonly landingCitySlugs: ReadonlyArray<string>;
  /** Editorial label for the corridor the cable serves, e.g.
   *  "Transatlantic", "Asia-Australia", "Mediterranean-India". */
  readonly corridor?: string;
  /** Operator-published design capacity (Tbps), if disclosed. */
  readonly designCapacityTbps?: number;
  /** Plain-prose overview of the cable's role. Editorial,
   *  source-cited. */
  readonly summary?: string;
  /** Free-text editorial notes — what changed mid-life, how the
   *  cable interacts with adjacent systems, etc. */
  readonly editorialNotes?: ReadonlyArray<string>;
  readonly provenance: Provenance;
}
