import type { PeeringDBFacilityRecord } from "@/entities";
import { withProvenance } from "@/ingestion/shared/provenance";

/**
 * Reviewed PeeringDB facility rows.
 *
 * Authored manually from PeeringDB's published facility catalogue
 * and the operator's own location pages. Each row carries the
 * source URL of the operator's facility page so the editor's
 * claim can be re-verified.
 *
 * The `peeringDbId` field is intentionally left undefined until
 * future ingestion verifies the exact numeric ID against
 * PeeringDB's canonical /api/fac/<id> records. The platform
 * refuses to publish placeholder integer IDs.
 */

const OBSERVED = "2026-05-21";

function buildRow(input: {
  readonly id: string;
  readonly sourceUrl: string;
  readonly name: string;
  readonly operator: string;
  readonly countryCode: string;
  readonly metroSlug?: string;
  readonly carrierNeutral?: boolean;
  readonly relatedEntityRefs?: ReadonlyArray<string>;
}): PeeringDBFacilityRecord {
  return withProvenance(
    {
      sourceId: "peeringdb",
      rawSourceName: "PeeringDB",
      observedAt: OBSERVED,
      confidence: "high",
    },
    input.sourceUrl,
    {
      id: input.id,
      recordType: "peeringdb-facility" as const,
      name: input.name,
      operator: input.operator,
      countryCode: input.countryCode,
      metroSlug: input.metroSlug,
      carrierNeutral: input.carrierNeutral,
      relatedEntityRefs: input.relatedEntityRefs,
    },
  );
}

export const REVIEWED_PEERINGDB_FACILITIES: ReadonlyArray<PeeringDBFacilityRecord> = [
  buildRow({
    id: "peeringdb-fac-equinix-fr5-frankfurt",
    sourceUrl: "https://www.peeringdb.com/fac",
    name: "Equinix FR5 Frankfurt",
    operator: "Equinix, Inc.",
    countryCode: "DE",
    metroSlug: "frankfurt",
    carrierNeutral: true,
    relatedEntityRefs: [
      "facility:equinix-fr5",
      "ixp:de-cix-frankfurt",
      "city:frankfurt",
      "country:germany",
    ],
  }),
  buildRow({
    id: "peeringdb-fac-equinix-dc11-ashburn",
    sourceUrl: "https://www.peeringdb.com/fac",
    name: "Equinix DC11 Ashburn",
    operator: "Equinix, Inc.",
    countryCode: "US",
    metroSlug: "ashburn",
    carrierNeutral: true,
    relatedEntityRefs: [
      "facility:equinix-dc11",
      "ixp:equinix-internet-exchange-ashburn",
      "city:ashburn",
      "country:united-states",
    ],
  }),
  buildRow({
    id: "peeringdb-fac-equinix-sg3-singapore",
    sourceUrl: "https://www.peeringdb.com/fac",
    name: "Equinix SG3 Singapore",
    operator: "Equinix, Inc.",
    countryCode: "SG",
    metroSlug: "singapore",
    carrierNeutral: true,
    relatedEntityRefs: [
      "facility:equinix-sg3",
      "city:singapore",
      "country:singapore",
    ],
  }),
];
