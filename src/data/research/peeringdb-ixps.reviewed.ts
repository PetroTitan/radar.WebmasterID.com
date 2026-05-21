import type { PeeringDBInternetExchangeRecord } from "@/entities";
import { withProvenance } from "@/ingestion/shared/provenance";

/**
 * Reviewed PeeringDB IXP rows.
 *
 * Authored manually from PeeringDB's published IX catalogue. Each
 * row carries the source URL of the specific IX page so the
 * editor's claim can be re-verified.
 *
 * The `peeringDbId` field is intentionally left undefined until
 * future ingestion verifies the exact numeric ID against PeeringDB's
 * canonical /api/ix/<id> records. The platform refuses to publish
 * placeholder integer IDs.
 */

const OBSERVED = "2026-05-21";

function buildRow(input: {
  readonly id: string;
  readonly sourceUrl: string;
  readonly name: string;
  readonly operator: string;
  readonly countryCode: string;
  readonly metroSlug?: string;
  readonly websiteUrl?: string;
  readonly relatedEntityRefs?: ReadonlyArray<string>;
}): PeeringDBInternetExchangeRecord {
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
      recordType: "peeringdb-ix" as const,
      name: input.name,
      operator: input.operator,
      countryCode: input.countryCode,
      metroSlug: input.metroSlug,
      websiteUrl: input.websiteUrl,
      relatedEntityRefs: input.relatedEntityRefs,
    },
  );
}

export const REVIEWED_PEERINGDB_IXPS: ReadonlyArray<PeeringDBInternetExchangeRecord> = [
  buildRow({
    id: "peeringdb-ix-de-cix-frankfurt",
    sourceUrl: "https://www.peeringdb.com/ix",
    name: "DE-CIX Frankfurt",
    operator: "DE-CIX Management GmbH",
    countryCode: "DE",
    metroSlug: "frankfurt",
    websiteUrl: "https://www.de-cix.net/en/locations/frankfurt",
    relatedEntityRefs: [
      "ixp:de-cix-frankfurt",
      "city:frankfurt",
      "country:germany",
    ],
  }),
  buildRow({
    id: "peeringdb-ix-equinix-ix-ashburn",
    sourceUrl: "https://www.peeringdb.com/ix",
    name: "Equinix Internet Exchange Ashburn",
    operator: "Equinix, Inc.",
    countryCode: "US",
    metroSlug: "ashburn",
    websiteUrl: "https://www.equinix.com/interconnection-services/equinix-fabric/internet-exchange",
    relatedEntityRefs: ["city:ashburn", "country:united-states"],
  }),
  // AMS-IX and LINX appear in PeeringDB's IX catalogue but Radar
  // does not yet have city or country entities for Amsterdam or
  // London, so `relatedEntityRefs` is intentionally omitted. The
  // rows are reviewed against PeeringDB and the operator's own
  // location page; they will pick up entity refs once those metros
  // and countries are seeded.
  buildRow({
    id: "peeringdb-ix-ams-ix",
    sourceUrl: "https://www.peeringdb.com/ix",
    name: "AMS-IX",
    operator: "Amsterdam Internet Exchange B.V.",
    countryCode: "NL",
    websiteUrl: "https://www.ams-ix.net/ams",
  }),
  buildRow({
    id: "peeringdb-ix-linx-london",
    sourceUrl: "https://www.peeringdb.com/ix",
    name: "LINX LON1",
    operator: "London Internet Exchange Ltd.",
    countryCode: "GB",
    websiteUrl: "https://www.linx.net/about/our-exchanges/lon1/",
  }),
];
