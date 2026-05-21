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
const CHECKED_AT_2 = "2026-05-23";

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
    coordinates: { lat: 50.11, lon: 8.68 },
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
  {
    slug: "ams-ix",
    name: "AMS-IX",
    operator: "Amsterdam Internet Exchange B.V.",
    countryCode: "NL",
    citySlug: "amsterdam",
    summary:
      "AMS-IX is an Internet Exchange Point in Amsterdam, Netherlands, operated by Amsterdam Internet Exchange B.V. It is one of the principal peering fabrics for the northern FLAP cluster anchor (Amsterdam) and is catalogued on PeeringDB.",
    websiteUrl: "https://www.ams-ix.net/ams",
    coordinates: { lat: 52.37, lon: 4.9 },
    editorial: {
      significance: [
        "AMS-IX is one of the long-running European IXPs, in continuous operation since the early 1990s. Per the operator's published pages, the fabric spans multiple Amsterdam-metro carrier-neutral facilities and is catalogued on PeeringDB.",
        "AMS-IX sits at the northern anchor of the FLAP cluster (Frankfurt, London, Amsterdam, Paris); Amsterdam's role as the connective layer between the UK / North Sea corridor and continental Europe is inseparable from this exchange.",
      ],
      connectivityRole: [
        "The exchange functions as a primary peering venue for Dutch networks, North-European content delivery, and a long tail of European ISPs and enterprises that maintain Amsterdam interconnection alongside Frankfurt.",
        "AMS-IX additionally operates branded international exchanges; this entity record covers the Amsterdam-anchored core fabric only.",
      ],
      cloudRelevance: [
        "Major cloud providers publish Direct Connect / Interconnect / ExpressRoute locations in the Amsterdam metro reachable from AMS-IX member facilities, per the providers' own published documentation.",
      ],
      interconnectionContext: [
        "AMS-IX's fabric spans multiple Amsterdam carrier-neutral facilities, including Equinix AM-series and Digital Realty (Interxion) sites; PeeringDB records the participating facilities.",
        "Volatile metrics (connected-network count, peak traffic) are published by the operator and recorded on dated observations elsewhere; they are not stored on this identity record.",
      ],
      strategicImportance: [
        "For European networks that need a North-European interconnection anchor — UK, Nordics, Northern Germany — AMS-IX is one of the default destinations. For pan-European peering, an Amsterdam presence is generally considered a complement to a Frankfurt presence rather than a substitute.",
      ],
    },
    provenance: {
      lastUpdated: CHECKED_AT_2,
      confidence: "high",
      sources: [
        {
          sourceId: "peeringdb",
          url: "https://www.peeringdb.com/",
          checkedAt: CHECKED_AT_2,
          note: "AMS-IX IX identity and Amsterdam-metro facility listings.",
        },
        {
          sourceId: "ams-ix",
          url: "https://www.ams-ix.net/ams",
          checkedAt: CHECKED_AT_2,
          note: "Operator primary doc — operating organisation, location and connection options.",
        },
        {
          sourceId: "telegeography",
          url: "https://www.telegeography.com/",
          checkedAt: CHECKED_AT_2,
          note: "FLAP cluster framing and Amsterdam's role in European interconnection.",
        },
      ],
      note: "Connected-network count, peak traffic and current member list to be ingested from PeeringDB. The specific PeeringDB IX ID is to be verified at ingestion time.",
    },
  },
  {
    slug: "linx-lon1",
    name: "LINX LON1",
    operator: "London Internet Exchange Ltd.",
    countryCode: "GB",
    citySlug: "london",
    summary:
      "LINX LON1 is the primary fabric of the London Internet Exchange, operated by London Internet Exchange Ltd. in London, United Kingdom. It anchors the FLAP cluster's western node and is catalogued on PeeringDB.",
    websiteUrl: "https://www.linx.net/about/our-exchanges/lon1/",
    coordinates: { lat: 51.51, lon: -0.13 },
    editorial: {
      significance: [
        "LINX LON1 is one of the long-running European IXPs, in continuous operation since the mid-1990s. Per the operator's published pages, the fabric spans multiple London-metro carrier-neutral facilities and is catalogued on PeeringDB. LINX additionally operates LON2 as a separate fabric for selective resilience.",
        "London is the FLAP cluster's western anchor; LINX is therefore one of the principal peering venues for transatlantic-routed European traffic.",
      ],
      connectivityRole: [
        "The exchange functions as a primary peering venue for UK networks, transatlantic content delivery into Europe, and a long tail of European ISPs and enterprises maintaining a London presence alongside Frankfurt.",
        "Cross-Channel terrestrial routes from London onward reach Amsterdam, Paris, and Frankfurt; the exchange therefore couples cleanly with the rest of the European FLAP cluster.",
      ],
      cloudRelevance: [
        "All three major hyperscalers operate London-anchored cloud regions per their published directories: AWS eu-west-2, Google Cloud europe-west2, and Microsoft Azure UK South. Provider on-ramps in London colocation facilities are reachable from LINX member sites.",
      ],
      interconnectionContext: [
        "LINX's fabric spans multiple central London and Docklands carrier-neutral facilities, including Telehouse (Digital Realty / KDDI Telehouse), Equinix LD-series, and NTT sites; PeeringDB records the participating facilities.",
        "Volatile metrics (connected-network count, peak traffic) are published by the operator and recorded on dated observations elsewhere; they are not stored on this identity record.",
      ],
      strategicImportance: [
        "For UK-facing services and transatlantic-routed European deployments, a LINX presence is the default. For pan-European peering, a London presence alongside Frankfurt is generally considered the minimum European footprint.",
      ],
    },
    provenance: {
      lastUpdated: CHECKED_AT_2,
      confidence: "high",
      sources: [
        {
          sourceId: "peeringdb",
          url: "https://www.peeringdb.com/",
          checkedAt: CHECKED_AT_2,
          note: "LINX IX identity and London-metro facility listings.",
        },
        {
          sourceId: "linx",
          url: "https://www.linx.net/about/our-exchanges/lon1/",
          checkedAt: CHECKED_AT_2,
          note: "Operator primary doc — operating organisation, LON1 location and connection options.",
        },
        {
          sourceId: "telegeography",
          url: "https://www.telegeography.com/",
          checkedAt: CHECKED_AT_2,
          note: "Transatlantic cable landings into the UK and FLAP cluster framing.",
        },
      ],
      note: "Connected-network count, peak traffic and current member list to be ingested from PeeringDB. The specific PeeringDB IX ID is to be verified at ingestion time. LON2 is treated as a separate operator-disclosed fabric and is not yet seeded.",
    },
  },
  {
    slug: "equinix-internet-exchange-ashburn",
    name: "Equinix Internet Exchange Ashburn",
    operator: "Equinix, Inc.",
    countryCode: "US",
    citySlug: "ashburn",
    summary:
      "Equinix Internet Exchange Ashburn is the Ashburn / Washington DC fabric of Equinix's global Internet Exchange product. The fabric is hosted across Equinix's DC-series carrier-neutral facilities in Loudoun County, Virginia and is catalogued on PeeringDB.",
    websiteUrl:
      "https://www.equinix.com/interconnection-services/equinix-fabric/internet-exchange",
    coordinates: { lat: 39.05, lon: -77.49 },
    editorial: {
      significance: [
        "The Ashburn fabric is the largest of Equinix's Internet Exchange instances by published participant population. Its scale is a consequence of the Ashburn / Northern Virginia metro itself: the densest US east-coast colocation cluster, hosting the origin metro for AWS us-east-1 and equivalent Google Cloud and Microsoft Azure regions.",
        "Equinix runs the Internet Exchange product as a portfolio across many global markets; this entity record covers the Ashburn-anchored instance only.",
      ],
      connectivityRole: [
        "The exchange is a primary peering venue for US east-coast ISPs, content networks, and the long tail of international networks maintaining a US east-coast presence. Transatlantic submarine cables that come ashore at Virginia Beach reach this metro via the inland backhaul corridor.",
      ],
      cloudRelevance: [
        "All three major hyperscalers operate Northern Virginia cloud regions per their published directories — AWS us-east-1, Google Cloud us-east4, and Microsoft Azure East US — and the corresponding cloud on-ramps are reachable from Equinix DC-series facilities.",
      ],
      interconnectionContext: [
        "The fabric is hosted across Equinix's DC-series of carrier-neutral facilities in the Ashburn area; PeeringDB records the participating facilities.",
        "Volatile metrics (connected-network count, peak traffic) are published by the operator and recorded on dated observations elsewhere; they are not stored on this identity record.",
      ],
      strategicImportance: [
        "For any US-facing internet service, an Equinix Internet Exchange Ashburn presence is a default east-coast peering destination. Because AWS us-east-1 is commonly used as an implicit global region, peering with cloud-on-ramps reachable from this fabric has outsize routing impact.",
      ],
    },
    provenance: {
      lastUpdated: CHECKED_AT_2,
      confidence: "high",
      sources: [
        {
          sourceId: "peeringdb",
          url: "https://www.peeringdb.com/",
          checkedAt: CHECKED_AT_2,
          note: "Equinix IX Ashburn identity and Ashburn-metro facility listings.",
        },
        {
          sourceId: "aws-regions",
          url: "https://aws.amazon.com/about-aws/global-infrastructure/regions_az/",
          checkedAt: CHECKED_AT_2,
          note: "AWS Direct Connect Ashburn presence; us-east-1 anchor metro.",
        },
        {
          sourceId: "gcp-regions",
          url: "https://cloud.google.com/about/locations",
          checkedAt: CHECKED_AT_2,
          note: "Google Cloud Interconnect Ashburn presence; us-east4 anchor metro.",
        },
        {
          sourceId: "azure-regions",
          url: "https://azure.microsoft.com/en-us/explore/global-infrastructure/geographies/",
          checkedAt: CHECKED_AT_2,
          note: "Azure ExpressRoute Ashburn presence; East US anchor metro.",
        },
        {
          sourceId: "telegeography",
          url: "https://www.telegeography.com/",
          checkedAt: CHECKED_AT_2,
          note: "Transatlantic cable landings and inland Ashburn corridor framing.",
        },
      ],
      note: "Connected-network count, peak traffic and current member list to be ingested from PeeringDB. The specific PeeringDB IX ID is to be verified at ingestion time. Operator website URL is the Equinix Internet Exchange product page; the per-metro instance is documented on PeeringDB and within Equinix's own product overview.",
    },
  },
];

export function getIxp(slug: string): InternetExchange | undefined {
  return IXPS.find((ixp) => ixp.slug === slug);
}

export function listIxpSlugs(): ReadonlyArray<string> {
  return IXPS.map((ixp) => ixp.slug);
}
