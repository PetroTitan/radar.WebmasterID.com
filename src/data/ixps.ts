import type { InternetExchange } from "@/entities";

/**
 * Verified Internet Exchange records.
 *
 * IXP identity facts (name, operator, location) are sourced from
 * PeeringDB and the operator's own published pages. Volatile
 * traffic and membership metrics live in InfrastructureMetric
 * records and are not stored on the identity record.
 *
 * The `peeringDbId` field is intentionally left undefined until it
 * is verified during pipeline ingestion.
 */

const CHECKED_AT = "2026-05-20";

export const IXPS: ReadonlyArray<InternetExchange> = [
  {
    slug: "de-cix-frankfurt",
    name: "DE-CIX Frankfurt",
    operator: "DE-CIX Management GmbH",
    countryCode: "DE",
    citySlug: "frankfurt",
    summary:
      "DE-CIX Frankfurt is an Internet Exchange Point in Frankfurt, Germany, operated by DE-CIX Management GmbH. It is one of the primary peering fabrics serving Central and Western European networks, as catalogued on PeeringDB.",
    websiteUrl: "https://www.de-cix.net/en/locations/frankfurt",
    provenance: {
      lastUpdated: "2026-05-20",
      confidence: "high",
      sources: [
        {
          sourceId: "peeringdb",
          url: "https://www.peeringdb.com/",
          checkedAt: CHECKED_AT,
          note: "IX identity record (operator, country, metro).",
        },
      ],
      note: "Connected networks count, peak traffic, and member list to be ingested from PeeringDB. Specific PeeringDB IX ID to be verified at ingestion time.",
    },
  },
];

export function getIxp(slug: string): InternetExchange | undefined {
  return IXPS.find((ixp) => ixp.slug === slug);
}

export function listIxpSlugs(): ReadonlyArray<string> {
  return IXPS.map((ixp) => ixp.slug);
}
