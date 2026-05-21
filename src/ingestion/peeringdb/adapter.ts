/**
 * PeeringDB adapter.
 *
 * Documents how Radar would fetch IXP and facility identity
 * records from the PeeringDB API and normalise them into the
 * platform's row-level types.
 *
 * Phase 13 wires the adapter shape; the real-run fetch path is
 * deliberately a developer-machine action (no automated CI run,
 * no public-page runtime call).
 */

import type {
  PeeringDBFacilityRecord,
  PeeringDBInternetExchangeRecord,
} from "../../entities";
import { withProvenance } from "../shared/provenance";

/** PeeringDB public API base URL. */
export const PEERINGDB_API_BASE = "https://www.peeringdb.com/api";

export const PEERINGDB_ENDPOINTS = {
  /** List Internet Exchange Points. Supports filters like
   *  `?country=DE`. */
  ix: `${PEERINGDB_API_BASE}/ix`,
  /** List facilities. */
  facility: `${PEERINGDB_API_BASE}/fac`,
  /** List networks. Phase 13 does not ingest networks. */
  network: `${PEERINGDB_API_BASE}/net`,
} as const;

/**
 * Shape of a PeeringDB IX record as returned by the public API.
 * Only the fields the adapter normalises are typed.
 */
export interface PeeringDBRawIx {
  readonly id: number;
  readonly name: string;
  readonly org_name?: string;
  readonly country: string;
  readonly city?: string;
  readonly url?: string;
  readonly website?: string;
}

export interface PeeringDBRawFacility {
  readonly id: number;
  readonly name: string;
  readonly org_name?: string;
  readonly country: string;
  readonly city?: string;
}

/**
 * Normalise a PeeringDB IX record into a Radar row.
 *
 * Editorial choices:
 *  - operator falls back to the PeeringDB-published org_name.
 *  - metroSlug is *not* inferred — that's an editorial step
 *    performed during review.
 *  - peeringDbId is recorded so cross-references in the entity
 *    graph (InternetExchange.peeringDbId) can be wired later.
 */
export function normalizeIx(
  raw: PeeringDBRawIx,
  options: { readonly observedAt: string },
): PeeringDBInternetExchangeRecord {
  return withProvenance(
    {
      sourceId: "peeringdb",
      rawSourceName: "PeeringDB",
      observedAt: options.observedAt,
      confidence: "unverified",
    },
    `${PEERINGDB_API_BASE}/ix/${raw.id}`,
    {
      id: `peeringdb-ix-${raw.id}`,
      recordType: "peeringdb-ix" as const,
      peeringDbId: raw.id,
      name: raw.name,
      operator: raw.org_name ?? raw.name,
      countryCode: raw.country,
      websiteUrl: raw.website ?? raw.url,
    },
  );
}

export function normalizeFacility(
  raw: PeeringDBRawFacility,
  options: { readonly observedAt: string },
): PeeringDBFacilityRecord {
  return withProvenance(
    {
      sourceId: "peeringdb",
      rawSourceName: "PeeringDB",
      observedAt: options.observedAt,
      confidence: "unverified",
    },
    `${PEERINGDB_API_BASE}/fac/${raw.id}`,
    {
      id: `peeringdb-facility-${raw.id}`,
      recordType: "peeringdb-facility" as const,
      peeringDbId: raw.id,
      name: raw.name,
      operator: raw.org_name ?? raw.name,
      countryCode: raw.country,
    },
  );
}
