import type { Guide } from "@/entities";

const CHECKED_AT = "2026-05-22";

export const CLOUD_REGIONS_GUIDE: Guide = {
  slug: "cloud-regions",
  title: "Cloud regions",
  dek:
    "What a cloud region actually is, how to read each provider's directory, and why regions cluster in a small number of interconnection metros.",
  publishedAt: "2026-05-20",
  lastUpdated: "2026-05-22",
  definition:
    "A cloud region is a collection of one or more datacenters in a single metro placed under a single administrative and naming scope by a cloud provider — for example AWS eu-central-1 (Frankfurt), Google Cloud asia-southeast1 (Singapore), or Microsoft Azure East US (Virginia). The provider's own published directory is the authoritative public record.",
  keyTakeaways: [
    "A region is a metro-level grouping of datacenters under one provider naming scope, not a single building.",
    "Each region contains multiple availability zones — physically separated facilities engineered to fail independently.",
    "The hyperscaler's published directory (AWS Global Infrastructure, GCP Locations, Azure Geographies) is the authoritative source.",
    "Cloud regions cluster in interconnection metros (Frankfurt, Ashburn, Singapore) because they need dense fibre and peering to be useful.",
    "Sovereignty regions (Azure Germany, AWS Sovereign Cloud) are policy artifacts as much as engineering ones; treat them as distinct from general-purpose regions.",
  ],
  summary: [
    { label: "Type", value: "Cloud region (provider scope)" },
    { label: "Granularity", value: "Multiple availability zones per region" },
    { label: "Authoritative source", value: "Provider region directory (tier-3)" },
    {
      label: "AWS reference",
      value: "AWS Global Infrastructure (regions_az page)",
    },
    {
      label: "GCP reference",
      value: "Google Cloud Locations page",
    },
    {
      label: "Azure reference",
      value: "Microsoft Azure Geographies page",
    },
    {
      label: "Canonical examples",
      value: "AWS eu-central-1, GCP asia-southeast1, Azure East US",
    },
  ],
  sections: [
    {
      id: "what-a-region-is",
      heading: "What a region actually is",
      paragraphs: [
        "A cloud region, in each major provider's own definition, is a collection of one or more datacenters in a single metro placed under a single administrative and naming scope. The naming scope is the region identifier (such as `eu-central-1` or `us-east-1`); the datacenters themselves are grouped into availability zones — physically separated facilities engineered to fail independently.",
        "What providers do not usually publish is which specific datacenter buildings host which zones. That mapping is operationally significant for the provider (it determines failure-domain boundaries) but is intentionally opaque to customers, and therefore intentionally not published in the directories.",
      ],
    },
    {
      id: "the-directory",
      heading: "The hyperscaler directory is authoritative",
      paragraphs: [
        "For region-level facts the providers' own published directories are the authoritative source. AWS publishes a Global Infrastructure / regions_az page; Google Cloud publishes a Locations directory; Microsoft Azure publishes a Geographies page. Each is treated by Radar as a tier-3 vendor primary doc — the operator's own self-attested record of what it operates.",
        "Anything more granular than what the directories publish — specific facility names, zone-to-building maps, capacity figures — is intentionally not published by the operators and is therefore not in the Radar record either.",
      ],
    },
    {
      id: "availability-zones",
      heading: "Availability zones",
      paragraphs: [
        "A region typically contains two to six availability zones. Each zone is one or more datacenters engineered to be independent of the other zones in the region — separate power feeds, separate cooling, separate network paths. Customer architectures use multiple zones in a region to tolerate single-facility failures without falling back to a different region.",
        "Cross-zone latency within a region is usually low-single-digit milliseconds; cross-region latency depends on the actual geographic separation and the cloud's backbone.",
      ],
    },
    {
      id: "interconnection-metros",
      heading: "Regions cluster in interconnection metros",
      paragraphs: [
        "Reading the three hyperscaler directories together, a small set of metros recur. Frankfurt hosts AWS eu-central-1, Google Cloud europe-west3, and Microsoft Azure Germany West Central. Ashburn / Northern Virginia hosts AWS us-east-1, Google Cloud us-east4, and Microsoft Azure East US. Singapore hosts AWS ap-southeast-1, Google Cloud asia-southeast1, and Microsoft Azure Southeast Asia.",
        "The overlap is not coincidence. Cloud regions need dense interconnection to be useful, which means they tend to land in metros that already have dense interconnection — which then reinforces those metros further.",
      ],
    },
    {
      id: "sovereignty",
      heading: "Sovereignty regions",
      paragraphs: [
        "Sovereignty-oriented variants — Azure Germany, the AWS Sovereign Cloud announcements, GCP sovereign-control announcements — are explicit responses to data-residency requirements in particular jurisdictions. Each is documented on the relevant provider's own pages and treated as a distinct region with its own region identifier.",
        "Sovereignty regions complicate the simple \"more regions are better\" reading of cloud expansion. A sovereignty region is, in infrastructure terms, often smaller and more constrained than a general-purpose region; reading the directories with that in mind helps avoid double-counting capacity.",
      ],
    },
  ],
  strategicImportance: [
    "A new cloud region in a metro typically triggers a sequence of ancillary build-out: colocation operators expand or open new facilities, transit providers add capacity, the local IXP often gains the cloud's Direct Connect / Interconnect / ExpressRoute as a member, and the local power and cooling supply chains tighten.",
    "None of this is published on the cloud's own region page. It shows up downstream — in PeeringDB facility listings, in TeleGeography reports, and in trade press about new colocation builds. For policy and operator planning, the region announcement is the leading indicator; everything else trails it.",
  ],
  geographicImportance: [
    {
      entityRef: "city:frankfurt",
      prose:
        "Frankfurt hosts AWS eu-central-1, Google Cloud europe-west3, and Microsoft Azure Germany West Central — the same metro chosen by all three hyperscalers for their primary EU region.",
    },
    {
      entityRef: "city:ashburn",
      prose:
        "Ashburn hosts AWS us-east-1, Google Cloud us-east4, and Microsoft Azure East US, the canonical US east-coast clustering and the largest concentration of hyperscaler region capacity in the world.",
    },
    {
      entityRef: "city:singapore",
      prose:
        "Singapore hosts AWS ap-southeast-1, Google Cloud asia-southeast1, and Microsoft Azure Southeast Asia, with the regions co-located alongside major submarine cable landings.",
    },
  ],
  caveats: [
    "Provider directories restructure occasionally; the canonical reference is whichever version of the directory page is current at the editorial check date, not a snapshot taken months earlier.",
    "Availability-zone counts are published inconsistently across providers and across regions. Where a zone count is not officially published, Radar leaves the field undefined rather than guess.",
    "Sovereignty regions are sometimes counted alongside general-availability regions in marketing material. Reading the directories carefully to separate the two avoids double-counting capacity.",
  ],
  methodologyNotes: [
    "Each region row is pinned to its country by ISO 3166-1 alpha-2 code and, when Radar's entity registry has the metro, to a metro slug. Provider-published region identifiers (e.g. eu-central-1) are stored verbatim.",
    "Hyperscaler region announcements that are not yet generally available are tracked separately from in-service regions; they do not appear in the in-service row corpus until the provider's own directory marks them generally available.",
  ],
  relatedEntityRefs: [
    "city:frankfurt",
    "city:ashburn",
    "city:singapore",
    "country:germany",
    "country:united-states",
    "country:singapore",
  ],
  relatedDatasetSlugs: ["global-cloud-regions", "ai-infrastructure-regions"],
  relatedIndicatorSlugs: ["cloud-region-concentration"],
  relatedRankingSlugs: ["cloud-infrastructure-hubs"],
  relatedMapPaths: ["/maps/cloud-regions"],
  relatedMediaIds: ["cloud-region-distribution"],
  sources: [
    {
      sourceId: "aws-regions",
      url: "https://aws.amazon.com/about-aws/global-infrastructure/regions_az/",
      checkedAt: CHECKED_AT,
      note: "AWS Global Infrastructure regions and availability zones page.",
    },
    {
      sourceId: "gcp-regions",
      url: "https://cloud.google.com/about/locations",
      checkedAt: CHECKED_AT,
      note: "Google Cloud locations directory.",
    },
    {
      sourceId: "azure-regions",
      url: "https://azure.microsoft.com/en-us/explore/global-infrastructure/geographies/",
      checkedAt: CHECKED_AT,
      note: "Microsoft Azure geographies and regions directory.",
    },
    {
      sourceId: "peeringdb",
      url: "https://www.peeringdb.com/",
      checkedAt: CHECKED_AT,
      note: "Cloud on-ramp facilities and Direct Connect / Interconnect locations.",
    },
    {
      sourceId: "telegeography",
      url: "https://www.telegeography.com/",
      checkedAt: CHECKED_AT,
      note: "Interconnection-metro and colocation context.",
    },
  ],
};
