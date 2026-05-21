import type { Indicator } from "@/entities";

const CHECKED_AT = "2026-05-21";

export const CLOUD_REGION_CONCENTRATION: Indicator = {
  slug: "cloud-region-concentration",
  title: "Cloud region concentration",
  dek:
    "How many hyperscaler-announced cloud regions are anchored in a metro or country.",
  category: "cloud",
  publishedAt: "2026-05-21",
  lastUpdated: "2026-05-21",
  measures:
    "The count of cloud regions hosted in a metro or country, broken down by provider (AWS, GCP, Azure) and by availability status (general-availability vs sovereignty-oriented vs announced).",
  significance:
    "Cloud-region concentration is the leading indicator of where infrastructure capacity will accumulate over the following decade. A new region announcement triggers ancillary build-out across colocation, peering, transit, and power; metros that already host all three major hyperscalers tend to keep attracting capacity through path dependence. The indicator is a forward-looking signal for which metros are likely to anchor the next layer of internet infrastructure.",
  methodology:
    "The published region directories of AWS, Google Cloud, and Microsoft Azure are read directly and normalised. Each region is pinned to a Radar metro via the city's `cloudRegionRefs`. Counts are aggregated per metro and rolled up to the country level. Sovereignty regions are counted separately from general-availability regions and reported as a distinct sub-figure.",
  unit: "Count of regions (per provider and total)",
  limitations: [
    "Provider directories do not publish which datacenter buildings host which availability zones; the indicator captures metro presence, not building presence.",
    "Region GA dates change irregularly; the indicator reads each provider directory on its own cadence and may briefly lag new-region announcements.",
    "Some providers (Oracle, IBM, smaller hyperscalers) are not yet ingested; the indicator under-counts non-AWS/GCP/Azure presence.",
    "Sovereignty variants vary in operational independence between providers; reading the count without the sovereignty break-down can mislead.",
  ],
  datasetSlugs: ["global-cloud-regions", "ai-infrastructure-regions"],
  rankingSlugs: ["cloud-infrastructure-hubs", "ai-infrastructure-readiness"],
  relatedEntityRefs: [
    "city:frankfurt",
    "city:ashburn",
    "city:singapore",
    "country:germany",
    "country:united-states",
    "country:singapore",
  ],
  sources: [
    {
      sourceId: "aws-regions",
      url: "https://aws.amazon.com/about-aws/global-infrastructure/regions_az/",
      checkedAt: CHECKED_AT,
      note: "AWS region directory.",
    },
    {
      sourceId: "gcp-regions",
      url: "https://cloud.google.com/about/locations",
      checkedAt: CHECKED_AT,
      note: "Google Cloud locations.",
    },
    {
      sourceId: "azure-regions",
      url: "https://azure.microsoft.com/en-us/explore/global-infrastructure/geographies/",
      checkedAt: CHECKED_AT,
      note: "Microsoft Azure geographies.",
    },
  ],
};
