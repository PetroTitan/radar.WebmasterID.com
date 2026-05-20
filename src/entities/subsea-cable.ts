import type { ISODate, Provenance } from "./shared";

/**
 * A submarine fibre-optic cable system.
 *
 * Subsea cable records describe the system identity (name,
 * consortium, ready-for-service date, landing points). Capacity
 * upgrades happen mid-life so design capacity and current operating
 * capacity are kept distinct.
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
  /** Landing point city slugs, in geographic order along the cable. */
  readonly landingCitySlugs: ReadonlyArray<string>;
  /** Operator-published design capacity (Tbps), if disclosed. */
  readonly designCapacityTbps?: number;
  readonly provenance: Provenance;
}
