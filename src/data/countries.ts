import type { Country } from "@/entities";

/**
 * Verified country records.
 *
 * Each record is hand-curated and source-cited. Identity facts
 * (ISO 3166-1 code, UN M.49 region) are sourced from World Bank
 * Open Data. Infrastructure-role facts in the editorial sections
 * are paraphrased from the cited sources — PeeringDB for IXP and
 * facility presence, TeleGeography for cable landings and
 * interconnection geography, and the hyperscalers' published
 * region directories for cloud-region claims.
 */

const CHECKED_AT = "2026-05-20";

export const COUNTRIES: ReadonlyArray<Country> = [
  {
    slug: "germany",
    code: "DE",
    name: "Germany",
    region: "Western Europe",
    continent: "Europe",
    summary:
      "Germany is a Western European country. It hosts Frankfurt, a major European interconnection metro, and DE-CIX Frankfurt, an Internet Exchange Point operated by DE-CIX Management GmbH.",
    hubCitySlugs: ["frankfurt"],
    ixpSlugs: ["de-cix-frankfurt"],
    editorial: {
      significance: [
        "Germany sits at the geographic and economic centre of European internet infrastructure. The combination of central position, stable jurisdiction and dense fibre infrastructure has made it the default European anchor for hyperscaler capacity, IXP traffic and continental backhaul.",
        "The country's principal interconnection metro is Frankfurt; together with London, Amsterdam and Paris it forms the cluster industry analysts refer to as FLAP — the four metros through which the bulk of intra-European internet traffic moves.",
      ],
      connectivityRole: [
        "Germany functions as the eastern anchor of Western European connectivity. Routes to Central Europe, Eastern Europe and parts of Northern Europe converge through Frankfurt before reaching their destinations.",
        "PeeringDB's published facility data shows a high concentration of carrier-neutral colocation in Frankfurt, with deep secondary clusters in Hamburg, Düsseldorf and Munich. Each of those metros is anchored by a DE-CIX-operated IXP, with Frankfurt as the flagship.",
      ],
      cloudRelevance: [
        "All three major hyperscalers operate German cloud regions according to their published directories: AWS in eu-central-1 (Frankfurt), Google Cloud in europe-west3 (Frankfurt) and Microsoft Azure in Germany West Central (Frankfurt).",
        "Beyond the general-purpose regions, the major providers also operate sovereignty-oriented variants — for example Azure Germany — that target data-residency requirements for German and EU customers.",
      ],
      interconnectionContext: [
        "Germany is the home jurisdiction of DE-CIX Management GmbH, which operates DE-CIX Frankfurt as well as further IXP locations in Hamburg, Munich and Düsseldorf and a number of international DE-CIX exchanges.",
        "The country's interconnection density is reinforced by independent carrier-neutral colocation operators with significant Frankfurt footprints, as published in PeeringDB's facility records.",
      ],
      strategicImportance: [
        "For pan-European cloud deployments, Germany is typically the default region. For European data-sovereignty workloads, it is the de-facto fallback jurisdiction within the EU.",
        "From a routing perspective, Germany is the gateway between the well-connected West and the higher-latency networks of Central and Eastern Europe.",
      ],
    },
    provenance: {
      lastUpdated: "2026-05-20",
      confidence: "high",
      sources: [
        {
          sourceId: "world-bank-open-data",
          url: "https://data.worldbank.org/country/DE",
          checkedAt: CHECKED_AT,
          note: "Geographic classification (ISO 3166-1, UN M.49).",
        },
        {
          sourceId: "peeringdb",
          url: "https://www.peeringdb.com/",
          checkedAt: CHECKED_AT,
          note: "DE-CIX Frankfurt identity and Frankfurt facility presence.",
        },
        {
          sourceId: "telegeography",
          url: "https://www.telegeography.com/",
          checkedAt: CHECKED_AT,
          note: "FLAP cluster framing and European interconnection geography.",
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
          note: "Microsoft Azure Germany West Central region listing.",
        },
        {
          sourceId: "de-cix",
          url: "https://www.de-cix.net/en/locations",
          checkedAt: CHECKED_AT,
          note: "DE-CIX operator pages for Frankfurt, Hamburg, Munich and Düsseldorf.",
        },
      ],
      note: "Quantitative metrics (cloud-region counts, cable landings, IPv6 adoption) await ingestion from their respective sources.",
    },
  },
  {
    slug: "singapore",
    code: "SG",
    name: "Singapore",
    region: "South-Eastern Asia",
    continent: "Asia",
    summary:
      "Singapore is a Southeast Asian city-state. It is a convergence point for multiple submarine cable systems linking Southeast Asia to East Asia, Australia, and South Asia, as recorded on TeleGeography's Submarine Cable Map.",
    hubCitySlugs: ["singapore"],
    ixpSlugs: [],
    editorial: {
      significance: [
        "Singapore is the principal interconnection point for Southeast Asia. As a sovereign city-state with a long-running pro-infrastructure regulatory posture, it has concentrated submarine cable landings, hyperscale cloud capacity and regional IXP fabric on a footprint that fits inside a single metro.",
        "The platform treats Singapore as both a country and a city: the country page covers the sovereign jurisdiction, the city page covers the metro infrastructure.",
      ],
      connectivityRole: [
        "Singapore functions as the regional hub for Southeast Asia, with onward connectivity into East Asia (Hong Kong, Tokyo), Australia and South Asia. Most major Southeast Asian routes transit Singapore.",
        "TeleGeography's published submarine cable map records multiple in-service cables landing at Singapore, including transpacific, intra-Asia and Asia-Australia systems.",
      ],
      cloudRelevance: [
        "All three major hyperscalers operate Singapore regions according to their published directories: AWS ap-southeast-1, Google Cloud asia-southeast1 and Microsoft Azure Southeast Asia.",
        "Edge platforms and specialist providers maintain Singapore points-of-presence to serve regional latency-sensitive traffic.",
      ],
      interconnectionContext: [
        "Multiple Internet Exchange Points operate locally, including community and operator-led fabrics. These are not yet in the Radar registry pending PeeringDB-based editorial review.",
        "Singapore's small physical footprint keeps inter-facility latency low, which makes it practical to host primary, secondary and tertiary infrastructure in the same metro without leaving the jurisdiction.",
      ],
      strategicImportance: [
        "For any operator that needs a single regional anchor across Southeast Asia, Australia and South Asia, Singapore is the default choice. The jurisdiction's stability and direct submarine cable reach to most regional capitals reinforce this position.",
      ],
    },
    provenance: {
      lastUpdated: "2026-05-20",
      confidence: "high",
      sources: [
        {
          sourceId: "world-bank-open-data",
          url: "https://data.worldbank.org/country/SG",
          checkedAt: CHECKED_AT,
          note: "Geographic classification (ISO 3166-1, UN M.49).",
        },
        {
          sourceId: "telegeography",
          url: "https://www.submarinecablemap.com/",
          checkedAt: CHECKED_AT,
          note: "Submarine cable landings in Singapore.",
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
      note: "Specific IXP records and cloud-region cross-links await editorial review before being added.",
    },
  },
  {
    slug: "united-states",
    code: "US",
    name: "United States",
    region: "Northern America",
    continent: "North America",
    summary:
      "The United States is a Northern American country. It hosts Ashburn, Virginia — a metro with a dense concentration of datacenter facilities listed on PeeringDB and the origin metro for several cloud-provider US east-coast regions.",
    hubCitySlugs: ["ashburn"],
    ixpSlugs: [],
    editorial: {
      significance: [
        "The United States is the largest internet jurisdiction by published cloud-region count, by IXP-reported traffic and by the size of its commercial colocation market. Each of the major hyperscaler control planes is rooted in US infrastructure per the provider directories.",
        "The country's internet footprint is structured around a handful of dense metro clusters — Ashburn (Northern Virginia) on the east coast, the Bay Area and Los Angeles on the west coast, with Chicago, Dallas and New York / New Jersey filling out the middle.",
      ],
      connectivityRole: [
        "The US anchors both transatlantic and transpacific traffic. TeleGeography's submarine cable map records dense cable landings on the US east coast (with Virginia Beach as the principal corridor inland to Ashburn) and on the US west coast.",
        "Domestically, the country's metros connect via private long-haul fibre maintained by carrier-neutral operators and the principal Tier-1 transit networks.",
      ],
      cloudRelevance: [
        "All major hyperscalers are US-headquartered and operate multiple US cloud regions according to their published directories: AWS in us-east-1 (Northern Virginia) plus several others, Google Cloud across us-east, us-central and us-west, and Microsoft Azure across East US, Central US and West US.",
        "The control planes for the global versions of these clouds remain US-anchored, which is why us-east-1 in particular is frequently treated by application teams as the implicit \"global\" region.",
      ],
      interconnectionContext: [
        "Major IXPs and Equinix Internet Exchange fabrics span every primary US metro. PeeringDB lists the largest membership concentrations in Northern Virginia, the Bay Area, New York, Chicago and Dallas.",
        "Specific US IXP records have not yet been seeded into the Radar registry and are pending editorial review.",
      ],
      strategicImportance: [
        "For multinational operators, the US is the default fallback for control-plane workloads and large-scale storage. For cost-sensitive global deployments, AWS us-east-1 is frequently the implicit default region.",
      ],
    },
    provenance: {
      lastUpdated: "2026-05-20",
      confidence: "high",
      sources: [
        {
          sourceId: "world-bank-open-data",
          url: "https://data.worldbank.org/country/US",
          checkedAt: CHECKED_AT,
          note: "Geographic classification (ISO 3166-1, UN M.49).",
        },
        {
          sourceId: "peeringdb",
          url: "https://www.peeringdb.com/",
          checkedAt: CHECKED_AT,
          note: "Ashburn / Northern Virginia facility listings and US-metro network distribution.",
        },
        {
          sourceId: "telegeography",
          url: "https://www.submarinecablemap.com/",
          checkedAt: CHECKED_AT,
          note: "US-east and US-west submarine cable landings.",
        },
        {
          sourceId: "aws-regions",
          url: "https://aws.amazon.com/about-aws/global-infrastructure/regions_az/",
          checkedAt: CHECKED_AT,
          note: "AWS us-east-1 (Northern Virginia) and other US region listings.",
        },
        {
          sourceId: "gcp-regions",
          url: "https://cloud.google.com/about/locations",
          checkedAt: CHECKED_AT,
          note: "Google Cloud us-east, us-central and us-west region listings.",
        },
        {
          sourceId: "azure-regions",
          url: "https://azure.microsoft.com/en-us/explore/global-infrastructure/geographies/",
          checkedAt: CHECKED_AT,
          note: "Microsoft Azure US geography region listings.",
        },
      ],
      note: "Specific cloud-region pinning and US IXP records await ingestion.",
    },
  },
];

export function getCountry(slug: string): Country | undefined {
  return COUNTRIES.find((country) => country.slug === slug);
}

export function getCountryByCode(code: string): Country | undefined {
  const upper = code.toUpperCase();
  return COUNTRIES.find((country) => country.code === upper);
}

export function listCountrySlugs(): ReadonlyArray<string> {
  return COUNTRIES.map((country) => country.slug);
}
