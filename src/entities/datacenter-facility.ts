import type { CountryCode, Provenance } from "./shared";

/**
 * A named datacenter facility.
 *
 * Facility records are intentionally conservative: we record the
 * operator's published facility name, location, and stated power
 * envelope. We do not publish unverified tenant lists or capacity
 * gossip.
 */
export interface DatacenterFacility {
  /** kebab-case slug, e.g. "equinix-fr5". */
  readonly slug: string;
  /** Facility display name, e.g. "Equinix FR5". */
  readonly name: string;
  /** Operating organisation. */
  readonly operator: string;
  /** ISO 3166-1 alpha-2 country code. */
  readonly countryCode: CountryCode;
  /** Slug of the parent metro city. */
  readonly citySlug: string;
  /** Operator-published address or campus name. */
  readonly address?: string;
  /** Operator-stated IT power envelope (MW). Sourced, not inferred. */
  readonly statedPowerMw?: number;
  readonly provenance: Provenance;
}
