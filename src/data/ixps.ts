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
    editorial: {
      significance: [
        "DE-CIX Frankfurt is one of the world's largest Internet Exchange Points by connected-network count, as catalogued on PeeringDB. The exchange has run continuously since the mid-1990s and grew into its current scale alongside Frankfurt's emergence as the central European interconnection metro.",
        "DE-CIX Frankfurt is also the flagship of DE-CIX's multi-location operation; per the operator's published pages, DE-CIX further runs IXPs in Hamburg, Munich and Düsseldorf, plus a number of international DE-CIX exchanges.",
      ],
      connectivityRole: [
        "The exchange functions as the principal peering fabric for Central, Western and parts of Eastern European traffic. European ISPs, content networks and enterprise networks meet here to exchange traffic directly, without paying a transit network to forward it.",
        "Because European traffic concentrates in the FLAP cluster (Frankfurt, London, Amsterdam, Paris), DE-CIX Frankfurt's reach is essentially the Central European share of that pattern.",
      ],
      cloudRelevance: [
        "Major cloud providers maintain direct interconnect presence at Frankfurt colocation facilities reachable from DE-CIX Frankfurt, per their published documentation: AWS Direct Connect, Microsoft Azure ExpressRoute and Google Cloud Interconnect all list Frankfurt locations.",
        "For a customer of any of these clouds, DE-CIX Frankfurt is therefore one of the more practical points to establish private-interconnect peering with the cloud provider plus open peering with the rest of the European internet from a single facility.",
      ],
      interconnectionContext: [
        "The exchange operates across multiple Frankfurt colocation facilities. PeeringDB lists Equinix FR-series, Digital Realty / Interxion and other carrier-neutral facilities as DE-CIX Frankfurt connection points.",
        "DE-CIX publishes operating statistics, port options and connection guides on its corporate site. Live volatile metrics (peak traffic, current connected-network count) belong on dated observations rather than the identity record and are not stored here.",
      ],
      strategicImportance: [
        "For any European network — incumbent ISP, content network, enterprise or cloud customer — DE-CIX Frankfurt is the default peering destination if the goal is to reach the largest number of European networks at the lowest latency.",
        "For non-European networks expanding into Europe, establishing DE-CIX Frankfurt connectivity is generally considered table stakes for a credible European footprint.",
      ],
    },
    provenance: {
      lastUpdated: "2026-05-20",
      confidence: "high",
      sources: [
        {
          sourceId: "peeringdb",
          url: "https://www.peeringdb.com/",
          checkedAt: CHECKED_AT,
          note: "DE-CIX Frankfurt IX identity, operator, location and member-facility listings.",
        },
        {
          sourceId: "de-cix",
          url: "https://www.de-cix.net/en/locations/frankfurt",
          checkedAt: CHECKED_AT,
          note: "Operator primary doc — operating organisation, location list and connection options.",
        },
        {
          sourceId: "telegeography",
          url: "https://www.telegeography.com/",
          checkedAt: CHECKED_AT,
          note: "European backbone geography and FLAP cluster framing.",
        },
        {
          sourceId: "aws-regions",
          url: "https://aws.amazon.com/about-aws/global-infrastructure/regions_az/",
          checkedAt: CHECKED_AT,
          note: "AWS Direct Connect Frankfurt presence; AWS eu-central-1 anchor.",
        },
        {
          sourceId: "gcp-regions",
          url: "https://cloud.google.com/about/locations",
          checkedAt: CHECKED_AT,
          note: "Google Cloud Interconnect Frankfurt presence; europe-west3 anchor.",
        },
        {
          sourceId: "azure-regions",
          url: "https://azure.microsoft.com/en-us/explore/global-infrastructure/geographies/",
          checkedAt: CHECKED_AT,
          note: "Azure ExpressRoute Frankfurt presence; Germany West Central anchor.",
        },
      ],
      note: "Connected-network count, peak traffic and current member list to be ingested from PeeringDB. The specific PeeringDB IX ID is to be verified at ingestion time.",
    },
  },
];

export function getIxp(slug: string): InternetExchange | undefined {
  return IXPS.find((ixp) => ixp.slug === slug);
}

export function listIxpSlugs(): ReadonlyArray<string> {
  return IXPS.map((ixp) => ixp.slug);
}
