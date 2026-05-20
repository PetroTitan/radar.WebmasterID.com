import type { City } from "@/entities";

/**
 * Verified city records.
 *
 * Each record is hand-curated and source-cited. The city is the
 * practical unit of internet infrastructure (Ashburn vs. Reston vs.
 * Sterling collapse into "Ashburn" for routing purposes).
 *
 * `peerMetroSlugs` lists comparable hub metros for editorial
 * cross-linking — an operator evaluating Frankfurt is also likely
 * to be weighing Ashburn and Singapore as global anchors.
 */

const CHECKED_AT = "2026-05-20";

export const CITIES: ReadonlyArray<City> = [
  {
    slug: "frankfurt",
    name: "Frankfurt",
    countryCode: "DE",
    countrySlug: "germany",
    aliases: ["Frankfurt am Main", "FRA"],
    summary:
      "Frankfurt is a major European interconnection metro. It is the seat of DE-CIX Frankfurt, an Internet Exchange Point operated by DE-CIX Management GmbH, and hosts a dense cluster of colocation facilities listed on PeeringDB.",
    ixpSlugs: ["de-cix-frankfurt"],
    cloudRegionRefs: [
      "aws:eu-central-1",
      "gcp:europe-west3",
      "azure:germany-west-central",
    ],
    cableSlugs: [],
    peerMetroSlugs: ["ashburn", "singapore"],
    editorial: {
      significance: [
        "Frankfurt is the principal interconnection metro for Central Europe. PeeringDB's published facility data shows one of the densest carrier-neutral colocation clusters anywhere, with hundreds of distinct networks present.",
        "Industry analysts group Frankfurt with London, Amsterdam and Paris as the FLAP cluster — the four metros through which the bulk of intra-European internet traffic moves. Within FLAP, Frankfurt is the eastern anchor.",
      ],
      connectivityRole: [
        "Frankfurt's role is primarily intra-European rather than transcontinental. Routing into and out of Central Europe and parts of Eastern Europe converges here before reaching destination networks.",
        "Per TeleGeography, the principal European terrestrial backbones interconnect at Frankfurt before fanning out toward Amsterdam (north-west), London (west), Paris (south-west), Milan (south) and Vienna / Warsaw (east).",
      ],
      cloudRelevance: [
        "AWS operates eu-central-1 in Frankfurt (per AWS Global Infrastructure). Google Cloud operates europe-west3 in Frankfurt (per Google Cloud's published locations). Microsoft Azure operates Germany West Central in Frankfurt (per Azure's geographies directory).",
        "Frankfurt is therefore one of a small number of metros worldwide that hosts general-availability regions of all three major hyperscalers within a single MAN.",
      ],
      interconnectionContext: [
        "The metro is anchored by DE-CIX Frankfurt and a dense carrier-neutral colocation fabric. PeeringDB lists multiple Equinix FR-series facilities, Digital Realty / Interxion sites, and NTT facilities as members of the Frankfurt interconnection ecosystem.",
        "The cluster's tight physical footprint keeps inter-facility latency low, which makes triple-redundant deployments inside a single metro practical.",
      ],
      strategicImportance: [
        "For German and pan-European cloud deployments, Frankfurt is the default region. For traffic-engineering purposes, it is treated as the European peering capital — a network without a Frankfurt presence is generally considered to have an incomplete European footprint.",
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
          note: "DE-CIX Frankfurt and Frankfurt-metro facility listings.",
        },
        {
          sourceId: "telegeography",
          url: "https://www.telegeography.com/",
          checkedAt: CHECKED_AT,
          note: "FLAP cluster framing and European backbone geography.",
        },
        {
          sourceId: "aws-regions",
          url: "https://aws.amazon.com/about-aws/global-infrastructure/regions_az/",
          checkedAt: CHECKED_AT,
          note: "AWS eu-central-1 (Frankfurt) region listing.",
        },
        {
          sourceId: "gcp-regions",
          url: "https://cloud.google.com/about/locations",
          checkedAt: CHECKED_AT,
          note: "Google Cloud europe-west3 (Frankfurt) region listing.",
        },
        {
          sourceId: "azure-regions",
          url: "https://azure.microsoft.com/en-us/explore/global-infrastructure/geographies/",
          checkedAt: CHECKED_AT,
          note: "Microsoft Azure Germany West Central (Frankfurt) region listing.",
        },
        {
          sourceId: "de-cix",
          url: "https://www.de-cix.net/en/locations/frankfurt",
          checkedAt: CHECKED_AT,
          note: "DE-CIX Frankfurt operator page.",
        },
      ],
      note: "Specific facility records and per-region cross-links await ingestion.",
    },
  },
  {
    slug: "ashburn",
    name: "Ashburn",
    countryCode: "US",
    countrySlug: "united-states",
    aliases: ["Northern Virginia", "NoVA"],
    summary:
      "Ashburn is a Loudoun County, Virginia metro that hosts a dense concentration of datacenter facilities listed on PeeringDB and serves as the origin metro for several cloud-provider US east-coast regions.",
    ixpSlugs: [],
    cloudRegionRefs: [
      "aws:us-east-1",
      "gcp:us-east4",
      "azure:east-us",
    ],
    cableSlugs: [],
    peerMetroSlugs: ["frankfurt", "singapore"],
    editorial: {
      significance: [
        "Ashburn — frequently labelled \"Northern Virginia\" or \"NoVA\" in industry reporting — hosts one of the largest concentrations of datacenter facilities in the world. PeeringDB lists a particularly high count of carrier-neutral facilities in the Ashburn / Sterling / Reston area, all collapsed into a single routing metro.",
        "The metro's history as an early Equinix anchor and its proximity to Virginia Beach (the principal US east-coast submarine cable corridor) explain its dominant position on the east coast.",
      ],
      connectivityRole: [
        "Ashburn is the principal US east-coast peering, transit and colocation hub. Most transatlantic submarine cables that land at Virginia Beach reach inland operators via Ashburn, where they terminate at carrier-neutral facilities.",
        "TeleGeography records this Virginia Beach → Ashburn corridor as one of the densest cable-to-colocation hand-offs anywhere.",
      ],
      cloudRelevance: [
        "AWS operates us-east-1 in Northern Virginia (per AWS Global Infrastructure). This is the largest AWS region by usage and the implicit \"global\" region for many applications.",
        "Google Cloud operates us-east4 in Northern Virginia (per Google Cloud's published locations). Microsoft Azure operates East US in Virginia (per Azure's geographies directory).",
      ],
      interconnectionContext: [
        "PeeringDB lists multiple Equinix DC-series facilities (DC1 through DC15+), Digital Realty / DuPont Fabros assets, and CoreSite footprints as the principal Ashburn interconnection venues.",
        "The Equinix Internet Exchange Ashburn / Washington DC fabric is the principal IXP serving the metro. Specific PeeringDB IX IDs have not yet been seeded into the Radar IXP registry.",
      ],
      strategicImportance: [
        "For any US-facing internet service, Ashburn is the default east-coast presence. Because AWS us-east-1 is so commonly used as an implicit global region, an outage in this metro has historically had outsize impact on global services.",
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
          note: "Ashburn / Northern Virginia facility listings.",
        },
        {
          sourceId: "telegeography",
          url: "https://www.submarinecablemap.com/",
          checkedAt: CHECKED_AT,
          note: "Virginia Beach submarine cable landings and inland routing.",
        },
        {
          sourceId: "aws-regions",
          url: "https://aws.amazon.com/about-aws/global-infrastructure/regions_az/",
          checkedAt: CHECKED_AT,
          note: "AWS us-east-1 (Northern Virginia) region listing.",
        },
        {
          sourceId: "gcp-regions",
          url: "https://cloud.google.com/about/locations",
          checkedAt: CHECKED_AT,
          note: "Google Cloud us-east4 (Northern Virginia) region listing.",
        },
        {
          sourceId: "azure-regions",
          url: "https://azure.microsoft.com/en-us/explore/global-infrastructure/geographies/",
          checkedAt: CHECKED_AT,
          note: "Microsoft Azure East US (Virginia) region listing.",
        },
      ],
      note: "Specific facility records and Ashburn IXP records await ingestion.",
    },
  },
  {
    slug: "singapore",
    name: "Singapore",
    countryCode: "SG",
    countrySlug: "singapore",
    aliases: ["SIN"],
    summary:
      "Singapore is the city-state's principal interconnection metro and a convergence point for multiple submarine cable systems linking Southeast Asia to neighbouring regions, as recorded on TeleGeography's Submarine Cable Map.",
    ixpSlugs: [],
    cloudRegionRefs: [
      "aws:ap-southeast-1",
      "gcp:asia-southeast1",
      "azure:southeast-asia",
    ],
    cableSlugs: [],
    peerMetroSlugs: ["frankfurt", "ashburn"],
    editorial: {
      significance: [
        "Singapore is the principal Southeast Asian interconnection metro and one of the most densely connected metros in the broader Asia-Pacific region. As the country and the metro are coterminous, the city's infrastructure footprint is also the country's.",
        "TeleGeography's submarine cable map records Singapore as a landing point for many of the major Asia-Pacific cable systems, which underpins the metro's regional role.",
      ],
      connectivityRole: [
        "Most Southeast Asian routes — and a significant share of routes from East Asia and Australia to South Asia and beyond — transit Singapore. The metro therefore functions as both an interconnection hub and a transit-traffic bottleneck whose congestion affects routing decisions across the region.",
      ],
      cloudRelevance: [
        "AWS operates ap-southeast-1 in Singapore (per AWS Global Infrastructure). Google Cloud operates asia-southeast1 in Singapore (per Google Cloud's published locations). Microsoft Azure operates Southeast Asia in Singapore (per Azure's geographies directory).",
        "Singapore is therefore the Southeast Asian metro of choice for hyperscaler regional deployments.",
      ],
      interconnectionContext: [
        "Multiple Internet Exchange Points operate in Singapore, including operator-led and community-led fabrics. These have not yet been seeded into the Radar IXP registry pending PeeringDB-based editorial review.",
        "The metro's small physical footprint keeps inter-facility latency low and makes triple-redundant deployments practical without leaving Singaporean jurisdiction.",
      ],
      strategicImportance: [
        "Singapore is the default single-region anchor for any operator serving Southeast Asia, Australia or South Asia from one metro. The combination of cable diversity, hyperscaler presence and a stable regulatory environment is difficult to substitute elsewhere in the region.",
      ],
    },
    provenance: {
      lastUpdated: "2026-05-20",
      confidence: "high",
      sources: [
        {
          sourceId: "telegeography",
          url: "https://www.submarinecablemap.com/",
          checkedAt: CHECKED_AT,
          note: "Submarine cable landings at Singapore.",
        },
        {
          sourceId: "peeringdb",
          url: "https://www.peeringdb.com/",
          checkedAt: CHECKED_AT,
          note: "Singapore-metro facility and network presence.",
        },
        {
          sourceId: "aws-regions",
          url: "https://aws.amazon.com/about-aws/global-infrastructure/regions_az/",
          checkedAt: CHECKED_AT,
          note: "AWS ap-southeast-1 (Singapore) region listing.",
        },
        {
          sourceId: "gcp-regions",
          url: "https://cloud.google.com/about/locations",
          checkedAt: CHECKED_AT,
          note: "Google Cloud asia-southeast1 (Singapore) region listing.",
        },
        {
          sourceId: "azure-regions",
          url: "https://azure.microsoft.com/en-us/explore/global-infrastructure/geographies/",
          checkedAt: CHECKED_AT,
          note: "Microsoft Azure Southeast Asia (Singapore) region listing.",
        },
      ],
      note: "Specific facility records and Singapore IXP records await ingestion.",
    },
  },
];

export function getCity(slug: string): City | undefined {
  return CITIES.find((city) => city.slug === slug);
}

export function listCitySlugs(): ReadonlyArray<string> {
  return CITIES.map((city) => city.slug);
}
