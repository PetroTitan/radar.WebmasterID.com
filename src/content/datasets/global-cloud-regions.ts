import type { Dataset } from "@/entities";

const CHECKED_AT = "2026-05-21";

export const GLOBAL_CLOUD_REGIONS: Dataset = {
  slug: "global-cloud-regions",
  title: "Global cloud regions",
  dek:
    "Hyperscaler-announced cloud regions normalised to a single schema and pinned to verified countries and metros.",
  category: "cloud",
  publishedAt: "2026-05-21",
  lastUpdated: "2026-05-21",
  status: "partial",
  confidence: "high",
  methodology:
    "Each of the three major hyperscalers' published region directories — AWS Global Infrastructure, Google Cloud Locations, Microsoft Azure Geographies — is read directly; their published region identifiers (e.g. eu-central-1, europe-west3, Germany West Central) are stored verbatim. Each region is pinned to a country (ISO 3166-1) and a metro (Radar city slug) when the provider publishes the location. Sovereignty-oriented regions (Azure Germany, AWS Sovereign Cloud) are counted separately from general-availability regions.",
  limitations: [
    "Provider directories do not publish which specific datacenter buildings host which availability zones; the dataset records only the metro, not the facility.",
    "Region availability changes irregularly; the dataset re-reads each provider directory monthly. New regions announced between reads are absent until the next refresh.",
    "Provider-specific instance availability and feature parity per region are not in scope; those facts belong with the cloud-region records themselves.",
    "Regions in announced-but-not-yet-generally-available status are tagged separately and do not count as in-service regions.",
  ],
  relatedEntityRefs: [
    "country:germany",
    "country:singapore",
    "country:united-states",
    "city:frankfurt",
    "city:ashburn",
    "city:singapore",
  ],
  indicatorSlugs: ["cloud-region-concentration"],
  mapPath: "/maps/cloud-regions",
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
  ],
  recordCount: 9,
  // Reviewed rows live in src/data/research/cloud-regions.reviewed.ts.
};
