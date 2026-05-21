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
const CHECKED_AT_2 = "2026-05-22";

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
    peerMetroSlugs: ["ashburn", "singapore", "amsterdam", "london"],
    coordinates: { lat: 50.11, lon: 8.68 },
    timezone: "Europe/Berlin",
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
        {
          sourceId: "geonames",
          url: "https://www.geonames.org/2925533/frankfurt-am-main.html",
          checkedAt: "2026-05-21",
          note: "Frankfurt metro coordinates and timezone.",
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
    ixpSlugs: ["equinix-internet-exchange-ashburn"],
    cloudRegionRefs: [
      "aws:us-east-1",
      "gcp:us-east4",
      "azure:east-us",
    ],
    cableSlugs: [],
    peerMetroSlugs: ["frankfurt", "singapore", "london", "tokyo"],
    coordinates: { lat: 39.05, lon: -77.49 },
    timezone: "America/New_York",
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
        {
          sourceId: "geonames",
          url: "https://www.geonames.org/4744709/ashburn.html",
          checkedAt: "2026-05-21",
          note: "Ashburn metro coordinates and timezone.",
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
    peerMetroSlugs: ["frankfurt", "ashburn", "tokyo"],
    coordinates: { lat: 1.35, lon: 103.82 },
    timezone: "Asia/Singapore",
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
        {
          sourceId: "geonames",
          url: "https://www.geonames.org/1880252/singapore.html",
          checkedAt: "2026-05-21",
          note: "Singapore metro coordinates and timezone.",
        },
      ],
      note: "Specific facility records and Singapore IXP records await ingestion.",
    },
  },
  {
    slug: "amsterdam",
    name: "Amsterdam",
    countryCode: "NL",
    countrySlug: "netherlands",
    aliases: ["AMS"],
    summary:
      "Amsterdam is one of the four FLAP cluster metros and the home of AMS-IX, the Amsterdam Internet Exchange operated by Amsterdam Internet Exchange B.V., per the operator's published location page and PeeringDB.",
    ixpSlugs: ["ams-ix"],
    cloudRegionRefs: [],
    cableSlugs: [],
    peerMetroSlugs: ["frankfurt", "london"],
    coordinates: { lat: 52.37, lon: 4.9 },
    timezone: "Europe/Amsterdam",
    editorial: {
      significance: [
        "Amsterdam is the northern anchor of the FLAP cluster (Frankfurt, London, Amsterdam, Paris). PeeringDB records a dense concentration of carrier-neutral colocation, IXP fabric, and network presence within the metro.",
        "The metro is the home of AMS-IX, one of the largest IXPs globally by connected-network count, with a fabric spanning multiple Amsterdam-metro carrier-neutral facilities.",
      ],
      connectivityRole: [
        "Amsterdam is the connective layer between the UK / North Sea corridor and the rest of continental Europe. Routes north into the Nordics and south into Frankfurt and Paris converge here.",
        "Per TeleGeography, Amsterdam interconnects with the Dutch North Sea cable landings and with cross-Channel terrestrial routes to London.",
      ],
      cloudRelevance: [
        "Hyperscaler cloud regions in the Amsterdam metro are not yet listed as reviewed rows in the Radar registry. AWS, Google Cloud, and Microsoft Azure publish Netherlands-located capacity in their respective directories; specific Amsterdam-metro pinning awaits editorial review.",
      ],
      interconnectionContext: [
        "AMS-IX is the principal exchange in the metro; the fabric spans multiple carrier-neutral facilities operated by Equinix, Digital Realty (Interxion), and NorthC.",
        "Carrier-neutral colocation in Amsterdam is anchored on Equinix AM-series and Digital Realty (Interxion) facilities, with a secondary cluster across the wider Schiphol area.",
      ],
      strategicImportance: [
        "For European deployments that need anchored North European connectivity — UK, Nordics, Northern Germany — Amsterdam is the default routing anchor. For pan-European peering, an Amsterdam presence is generally considered table stakes alongside Frankfurt.",
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
          note: "AMS-IX identity and Amsterdam-metro facility presence.",
        },
        {
          sourceId: "ams-ix",
          url: "https://www.ams-ix.net/ams",
          checkedAt: CHECKED_AT_2,
          note: "AMS-IX operator page for the Amsterdam exchange.",
        },
        {
          sourceId: "telegeography",
          url: "https://www.telegeography.com/",
          checkedAt: CHECKED_AT_2,
          note: "FLAP cluster framing and Amsterdam's role in European interconnection.",
        },
        {
          sourceId: "geonames",
          url: "https://www.geonames.org/2759794/amsterdam.html",
          checkedAt: CHECKED_AT_2,
          note: "Amsterdam metro coordinates and timezone.",
        },
      ],
      note: "Amsterdam IXP and cloud-region records await editorial seeding; the metro is wired into the graph via AMS-IX reviewed rows.",
    },
  },
  {
    slug: "london",
    name: "London",
    countryCode: "GB",
    countrySlug: "united-kingdom",
    aliases: ["LON", "Greater London"],
    summary:
      "London is one of the four FLAP cluster metros and the home of LINX (LON1, LON2), operated by London Internet Exchange Ltd. AWS, Google Cloud, and Microsoft Azure each operate London-anchored cloud regions per their published directories.",
    ixpSlugs: ["linx-lon1"],
    cloudRegionRefs: [
      "aws:eu-west-2",
      "gcp:europe-west2",
      "azure:uk-south",
    ],
    cableSlugs: [],
    peerMetroSlugs: ["frankfurt", "amsterdam"],
    coordinates: { lat: 51.51, lon: -0.13 },
    timezone: "Europe/London",
    editorial: {
      significance: [
        "London is the western anchor of the FLAP cluster (Frankfurt, London, Amsterdam, Paris). PeeringDB records dense carrier-neutral colocation across central London, the Docklands, and the Slough corridor.",
        "The metro is the home of LINX (London Internet Exchange), operated by London Internet Exchange Ltd., with a primary fabric (LON1) and a secondary fabric (LON2) spanning multiple London-metro carrier-neutral facilities.",
      ],
      connectivityRole: [
        "London is the principal European termination point for transatlantic submarine cables — landings on the Cornish coast (Bude / Whitesand Bay) feed terrestrial routes inland to the metro.",
        "Onward routing leaves the UK via cross-Channel terrestrial fibre into Amsterdam, Paris, and Frankfurt.",
      ],
      cloudRelevance: [
        "AWS operates eu-west-2 in London (per AWS Global Infrastructure). Google Cloud operates europe-west2 in London (per Google Cloud's published locations). Microsoft Azure operates UK South in London (per Azure's geographies directory).",
        "London is therefore one of the small set of metros worldwide that hosts general-availability regions of all three major hyperscalers within a single MAN.",
      ],
      interconnectionContext: [
        "Carrier-neutral colocation in London is anchored on Equinix LD-series facilities, Telehouse (Digital Realty / KDDI Telehouse) in the Docklands, and NTT facilities. A deep secondary cluster operates in Slough, west of central London.",
        "LINX is the principal exchange in the metro; its LON1 / LON2 fabric spans multiple central London and Docklands facilities.",
      ],
      strategicImportance: [
        "For UK-facing services and transatlantic-routed European deployments, a London presence is the default. For pan-European peering, a London presence alongside Frankfurt is generally considered the minimum European footprint.",
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
          note: "LINX identity and London-metro facility presence.",
        },
        {
          sourceId: "linx",
          url: "https://www.linx.net/about/our-exchanges/lon1/",
          checkedAt: CHECKED_AT_2,
          note: "LINX LON1 operator page.",
        },
        {
          sourceId: "aws-regions",
          url: "https://aws.amazon.com/about-aws/global-infrastructure/regions_az/",
          checkedAt: CHECKED_AT_2,
          note: "AWS eu-west-2 (London) region listing.",
        },
        {
          sourceId: "gcp-regions",
          url: "https://cloud.google.com/about/locations",
          checkedAt: CHECKED_AT_2,
          note: "Google Cloud europe-west2 (London) region listing.",
        },
        {
          sourceId: "azure-regions",
          url: "https://azure.microsoft.com/en-us/explore/global-infrastructure/geographies/",
          checkedAt: CHECKED_AT_2,
          note: "Microsoft Azure UK South (London) region listing.",
        },
        {
          sourceId: "telegeography",
          url: "https://www.telegeography.com/",
          checkedAt: CHECKED_AT_2,
          note: "Transatlantic cable landings into the UK and FLAP framing.",
        },
        {
          sourceId: "geonames",
          url: "https://www.geonames.org/2643743/london.html",
          checkedAt: CHECKED_AT_2,
          note: "London metro coordinates and timezone.",
        },
      ],
      note: "LINX and Equinix IX London entity records await editorial seeding; cloud-region rows already wire London via metroSlug.",
    },
  },
  {
    slug: "tokyo",
    name: "Tokyo",
    countryCode: "JP",
    countrySlug: "japan",
    aliases: ["TYO", "Greater Tokyo"],
    summary:
      "Tokyo is the principal interconnection metro for Japan and the regional anchor for Northeast Asian hyperscaler capacity. AWS, Google Cloud, and Microsoft Azure each operate Tokyo-anchored cloud regions per their published directories.",
    ixpSlugs: [],
    cloudRegionRefs: [
      "aws:ap-northeast-1",
      "gcp:asia-northeast1",
      "azure:japan-east",
    ],
    cableSlugs: [],
    peerMetroSlugs: ["singapore", "ashburn"],
    coordinates: { lat: 35.68, lon: 139.76 },
    timezone: "Asia/Tokyo",
    editorial: {
      significance: [
        "Tokyo is the principal Northeast Asian interconnection metro and the largest in-country interconnection cluster in Japan. PeeringDB records dense Japanese-operator presence across Otemachi, Shinagawa, and the wider Kanto-area facility cluster.",
        "The metro is the regional default for hyperscaler regions: AWS ap-northeast-1, Google Cloud asia-northeast1, and Microsoft Azure Japan East all anchor here per the provider directories.",
      ],
      connectivityRole: [
        "Tokyo is the principal eastern termination point for transpacific submarine cables; TeleGeography records dense landings on the Boso and Shima peninsulas, with onward terrestrial routes into Tokyo's interconnection facilities.",
        "Onward regional routing reaches Hong Kong, Singapore, the US west coast, and Russia / Northeast Asia.",
      ],
      cloudRelevance: [
        "AWS operates ap-northeast-1 in Tokyo (per AWS Global Infrastructure). Google Cloud operates asia-northeast1 in Tokyo (per Google Cloud's published locations). Microsoft Azure operates Japan East in Tokyo (per Azure's geographies directory).",
        "Within Japan, Tokyo regions are the implicit primary; Osaka regions exist primarily for in-country disaster-recovery footprints.",
      ],
      interconnectionContext: [
        "JPNAP, JPIX, and BBIX operate Tokyo-anchored exchange fabrics. These have not yet been promoted to Radar IXP entity records and await editorial seeding against PeeringDB.",
        "Carrier-neutral colocation in Tokyo is anchored on Equinix TY-series facilities and the NTT Communications Otemachi / Shinagawa campus group.",
      ],
      strategicImportance: [
        "For any operator serving Japanese end users, a Tokyo presence is the default. For regional Northeast Asian routing, Tokyo competes with Singapore depending on the latency profile of the workload.",
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
          note: "Tokyo-metro facility records and Japanese IXP presence.",
        },
        {
          sourceId: "aws-regions",
          url: "https://aws.amazon.com/about-aws/global-infrastructure/regions_az/",
          checkedAt: CHECKED_AT_2,
          note: "AWS ap-northeast-1 (Tokyo) region listing.",
        },
        {
          sourceId: "gcp-regions",
          url: "https://cloud.google.com/about/locations",
          checkedAt: CHECKED_AT_2,
          note: "Google Cloud asia-northeast1 (Tokyo) region listing.",
        },
        {
          sourceId: "azure-regions",
          url: "https://azure.microsoft.com/en-us/explore/global-infrastructure/geographies/",
          checkedAt: CHECKED_AT_2,
          note: "Microsoft Azure Japan East (Tokyo) region listing.",
        },
        {
          sourceId: "telegeography",
          url: "https://www.telegeography.com/",
          checkedAt: CHECKED_AT_2,
          note: "Transpacific cable landings on the Boso and Shima peninsulas.",
        },
        {
          sourceId: "geonames",
          url: "https://www.geonames.org/1850147/tokyo.html",
          checkedAt: CHECKED_AT_2,
          note: "Tokyo metro coordinates and timezone.",
        },
      ],
      note: "Japanese IXP entity records (JPNAP, JPIX, BBIX) and Osaka metro records await editorial seeding.",
    },
  },
];

export function getCity(slug: string): City | undefined {
  return CITIES.find((city) => city.slug === slug);
}

export function listCitySlugs(): ReadonlyArray<string> {
  return CITIES.map((city) => city.slug);
}
