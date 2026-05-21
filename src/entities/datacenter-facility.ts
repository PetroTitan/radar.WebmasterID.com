import type { CountryCode, EditorialBlock, Provenance } from "./shared";

/**
 * A named datacenter facility.
 *
 * Facility records are intentionally conservative: we record the
 * operator's published facility name, location, and (optionally)
 * the operator's stated power envelope when officially disclosed.
 * The platform refuses to publish unverified tenant lists, rack
 * counts, occupancy estimates, customer lists, or capacity
 * gossip.
 *
 * Editorial fields (summary, role, carrier-neutrality assertion,
 * related IXPs, related cloud regions) are added only when
 * source-bound. Carrier-neutrality is asserted only when the
 * operator describes the facility as carrier-neutral on its own
 * pages, or when PeeringDB records corroborate dense multi-network
 * presence.
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
  /** Operator-published facility / location page URL. */
  readonly websiteUrl?: string;
  /** Year the facility opened, when the operator has disclosed it. */
  readonly openedYear?: string;
  /** Operator-stated IT power envelope (MW). Sourced, not inferred. */
  readonly statedPowerMw?: number;
  /** Whether the facility is carrier-neutral. Asserted only when
   *  the operator's own page describes it as such, or when
   *  PeeringDB records corroborate dense multi-network presence. */
  readonly carrierNeutral?: boolean;
  /** Plain-prose overview of the facility's ecosystem role.
   *  Editorial, source-cited. */
  readonly summary?: string;
  /** Editorial label for the ecosystem role, e.g. "DE-CIX node",
   *  "AWS Direct Connect on-ramp", "Transatlantic backhaul anchor". */
  readonly ecosystemRole?: string;
  /** Slugs of IXPs whose fabric extends into this facility,
   *  per the operator's page or PeeringDB. */
  readonly relatedIxpSlugs?: ReadonlyArray<string>;
  /** Cloud-region refs the facility serves as an on-ramp for,
   *  in the form `<provider-slug>:<region-slug>`. */
  readonly cloudRegionRefs?: ReadonlyArray<string>;
  /** Free-text editorial notes — historical context, ecosystem
   *  positioning, what the operator publishes vs. what is not
   *  disclosed. */
  readonly editorialNotes?: ReadonlyArray<string>;
  /** Editorial intelligence sections; optional, only when the
   *  facility's role warrants a deeper editorial block. */
  readonly editorial?: EditorialBlock;
  readonly provenance: Provenance;
}
