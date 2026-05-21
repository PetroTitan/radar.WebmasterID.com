import type { SourceRecord } from "@/entities";

/**
 * Initial source-of-record registry.
 *
 * Every entry has been hand-curated. Adding a source requires:
 *   1. an editorial review of its methodology and licensing,
 *   2. a trust-tier assignment justified in /docs,
 *   3. a `lastChecked` date set on the day of review.
 *
 * `lastChecked` reflects when an editor last verified the source's
 * metadata (URL, licensing posture, update cadence) — not when the
 * source itself last published.
 */
export const SOURCE_REGISTRY: ReadonlyArray<SourceRecord> = [
  {
    id: "ripe-ncc",
    name: "RIPE NCC",
    category: "registry",
    url: "https://www.ripe.net/",
    trustTier: "tier-1",
    licenseNote: "Open data, attribution requested.",
    lastChecked: "2026-05-20",
    updateFrequency: "continuous",
    description:
      "Regional Internet Registry for Europe, the Middle East and parts of Central Asia. Authoritative source for IPv4/IPv6 allocations and AS number assignments in its region.",
    coverage: ["IPv4 allocations", "IPv6 allocations", "AS numbers", "RIPE Atlas measurements"],
  },
  {
    id: "peeringdb",
    name: "PeeringDB",
    category: "registry",
    url: "https://www.peeringdb.com/",
    trustTier: "tier-2",
    licenseNote: "CC-BY 4.0 with attribution.",
    lastChecked: "2026-05-20",
    updateFrequency: "continuous",
    description:
      "Community-maintained registry of networks, IXPs and interconnection facilities. The de-facto reference for peering policy, IX membership and facility presence.",
    coverage: ["IXPs", "Networks", "Facilities", "Peering policies"],
  },
  {
    id: "cloudflare-radar",
    name: "Cloudflare Radar",
    category: "measurement",
    url: "https://radar.cloudflare.com/",
    trustTier: "tier-2",
    licenseNote: "Public dashboards, direct link only.",
    lastChecked: "2026-05-20",
    updateFrequency: "continuous",
    description:
      "Cloudflare's public observability layer. Useful for traffic-share and routing-event signals derived from one of the largest edge networks.",
    coverage: ["Traffic share", "Routing events", "Protocol adoption", "Outage detection"],
  },
  {
    id: "world-bank-open-data",
    name: "World Bank Open Data",
    category: "intergovernmental",
    url: "https://data.worldbank.org/",
    trustTier: "tier-2",
    licenseNote: "CC-BY 4.0.",
    lastChecked: "2026-05-20",
    updateFrequency: "annual",
    description:
      "Open dataset bank covering global development indicators. Used by Radar for population, GDP and broadband-penetration context behind country pages.",
    coverage: ["Population", "GDP", "Broadband subscriptions", "Mobile penetration"],
  },
  {
    id: "itu",
    name: "ITU",
    category: "intergovernmental",
    url: "https://www.itu.int/",
    trustTier: "tier-1",
    licenseNote: "Reports licensed individually; figures citable with attribution.",
    lastChecked: "2026-05-20",
    updateFrequency: "annual",
    description:
      "International Telecommunication Union. UN agency for information and communications technologies; publishes the canonical Facts and Figures series on global connectivity.",
    coverage: ["Connectivity statistics", "Spectrum policy", "Standards"],
  },
  {
    id: "oecd",
    name: "OECD",
    category: "intergovernmental",
    url: "https://www.oecd.org/",
    trustTier: "tier-2",
    licenseNote: "Most datasets CC-BY; some restricted.",
    lastChecked: "2026-05-20",
    updateFrequency: "quarterly",
    description:
      "Economic and policy research organisation. Source for broadband statistics and digital-economy indicators across OECD member states.",
    coverage: ["Broadband statistics", "Digital economy", "Cross-border data flows"],
  },
  {
    id: "eurostat",
    name: "Eurostat",
    category: "intergovernmental",
    url: "https://ec.europa.eu/eurostat",
    trustTier: "tier-2",
    licenseNote: "Free reuse with attribution.",
    lastChecked: "2026-05-20",
    updateFrequency: "quarterly",
    description:
      "Statistical office of the European Union. Authoritative for ICT-usage and digital-infrastructure indicators across EU member states.",
    coverage: ["ICT statistics", "Digital infrastructure indicators"],
  },
  {
    id: "icann",
    name: "ICANN",
    category: "registry",
    url: "https://www.icann.org/",
    trustTier: "tier-1",
    licenseNote: "Public records, citable with attribution.",
    lastChecked: "2026-05-20",
    updateFrequency: "continuous",
    description:
      "Internet Corporation for Assigned Names and Numbers. Coordinates the global DNS root, IP address allocation, and protocol parameter assignment.",
    coverage: ["Root DNS", "gTLDs", "Policy"],
  },
  {
    id: "iana",
    name: "IANA",
    category: "registry",
    url: "https://www.iana.org/",
    trustTier: "tier-1",
    licenseNote: "Public registries, freely citable.",
    lastChecked: "2026-05-20",
    updateFrequency: "continuous",
    description:
      "Internet Assigned Numbers Authority. Maintains the registries of protocol numbers, IP address blocks, and root-zone delegations that anchor the public internet.",
    coverage: ["Protocol parameters", "IP allocations", "Root zone"],
  },
  {
    id: "telegeography",
    name: "TeleGeography",
    category: "industry",
    url: "https://www.telegeography.com/",
    trustTier: "tier-2",
    licenseNote: "Public maps free to view; commercial datasets licensed.",
    lastChecked: "2026-05-20",
    updateFrequency: "monthly",
    description:
      "Telecommunications market research firm. Maintains the canonical public maps of submarine cables, internet backbones and colocation markets.",
    coverage: ["Submarine cables", "Internet backbones", "Colocation"],
  },
  {
    id: "aws-regions",
    name: "AWS Global Infrastructure",
    category: "vendor",
    url: "https://aws.amazon.com/about-aws/global-infrastructure/regions_az/",
    trustTier: "tier-3",
    licenseNote: "Vendor primary doc, freely citable with attribution.",
    lastChecked: "2026-05-20",
    updateFrequency: "irregular",
    description:
      "Amazon Web Services' published directory of regions, availability zones, and local zones. Authoritative for AWS-attested geographic facts.",
    coverage: ["AWS regions", "AWS availability zones", "AWS local zones"],
  },
  {
    id: "gcp-regions",
    name: "Google Cloud regions",
    category: "vendor",
    url: "https://cloud.google.com/about/locations",
    trustTier: "tier-3",
    licenseNote: "Vendor primary doc, freely citable with attribution.",
    lastChecked: "2026-05-20",
    updateFrequency: "irregular",
    description:
      "Google Cloud's published directory of regions and zones. Authoritative for GCP-attested geographic facts.",
    coverage: ["GCP regions", "GCP zones", "GCP edge locations"],
  },
  {
    id: "azure-regions",
    name: "Microsoft Azure geographies",
    category: "vendor",
    url: "https://azure.microsoft.com/en-us/explore/global-infrastructure/geographies/",
    trustTier: "tier-3",
    licenseNote: "Vendor primary doc, freely citable with attribution.",
    lastChecked: "2026-05-20",
    updateFrequency: "irregular",
    description:
      "Microsoft Azure's published directory of geographies and regions. Authoritative for Azure-attested geographic facts.",
    coverage: ["Azure regions", "Azure geographies", "Azure availability zones"],
  },
  {
    id: "de-cix",
    name: "DE-CIX",
    category: "vendor",
    url: "https://www.de-cix.net/",
    trustTier: "tier-3",
    licenseNote: "Operator primary doc, freely citable with attribution.",
    lastChecked: "2026-05-20",
    updateFrequency: "monthly",
    description:
      "DE-CIX Management GmbH's corporate site. Authoritative operator primary doc for DE-CIX Frankfurt, Hamburg, Munich, Düsseldorf and DE-CIX's international IXP locations.",
    coverage: ["DE-CIX IXP locations", "Operator policy", "Member services"],
  },
  {
    id: "geonames",
    name: "GeoNames",
    category: "registry",
    url: "https://www.geonames.org/",
    trustTier: "tier-2",
    licenseNote: "Open data, CC BY 4.0 with attribution.",
    lastChecked: "2026-05-21",
    updateFrequency: "weekly",
    description:
      "Open geographical database covering >11 million place names with coordinates, administrative hierarchies, timezones and population figures. Used as the canonical reference for city and metro coordinates.",
    coverage: ["City coordinates", "Country centroids", "Administrative regions", "Timezones"],
  },
  {
    id: "ams-ix",
    name: "AMS-IX",
    category: "vendor",
    url: "https://www.ams-ix.net/",
    trustTier: "tier-3",
    licenseNote: "Operator primary doc, freely citable with attribution.",
    lastChecked: "2026-05-22",
    updateFrequency: "monthly",
    description:
      "Amsterdam Internet Exchange B.V.'s corporate site. Authoritative operator primary doc for AMS-IX Amsterdam, AMS-IX's international locations, and the operator's published peering policy.",
    coverage: ["AMS-IX Amsterdam", "AMS-IX international locations", "Operator policy"],
  },
  {
    id: "linx",
    name: "LINX",
    category: "vendor",
    url: "https://www.linx.net/",
    trustTier: "tier-3",
    licenseNote: "Operator primary doc, freely citable with attribution.",
    lastChecked: "2026-05-22",
    updateFrequency: "monthly",
    description:
      "London Internet Exchange Ltd.'s corporate site. Authoritative operator primary doc for the LINX exchanges in London (LON1, LON2), LINX Manchester, LINX Scotland, and the operator's published peering policy.",
    coverage: ["LINX exchanges", "LINX peering policy", "Member services"],
  },
];

export function getSourceRecord(id: string): SourceRecord | undefined {
  return SOURCE_REGISTRY.find((record) => record.id === id);
}
