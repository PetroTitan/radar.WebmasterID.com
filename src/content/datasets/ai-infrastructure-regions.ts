import type { Dataset } from "@/entities";

const CHECKED_AT = "2026-05-21";

export const AI_INFRASTRUCTURE_REGIONS: Dataset = {
  slug: "ai-infrastructure-regions",
  title: "AI infrastructure regions",
  dek:
    "Inventory of metros and cloud regions hosting hyperscaler AI capacity (GPU and accelerator availability) plus specialist GPU-operator footprints.",
  category: "ai",
  publishedAt: "2026-05-21",
  lastUpdated: "2026-05-21",
  status: "pending",
  confidence: "low",
  methodology:
    "Hyperscaler AI-instance availability is read from each provider's region/instance directory at ingestion time and pinned to the metro the region lives in. Specialist GPU operators (CoreWeave, Lambda, neoclouds) are recorded at metro level from their own published facility pages. Capacity-and-cooling supply signals — power-purchase agreements, grid-interconnect queues, water-rights agreements — are admitted only when published by primary sources (provider or utility).",
  limitations: [
    "AI infrastructure moves faster than the recompute cadence of every existing source. The dataset treats every cell as a snapshot with a documented observation date.",
    "Many specialist GPU operators do not publish facility-level locations. The dataset records metro-level pinning when finer resolution is not available.",
    "GPU generation parity is not in scope. Two regions in the same provider may host different generations of accelerator with materially different capability.",
    "Power and cooling supply-chain signals are sparse public data. Where the underlying source has not published, the dataset records the absence rather than estimating.",
  ],
  relatedEntityRefs: [
    "city:ashburn",
    "city:frankfurt",
    "city:singapore",
    "country:united-states",
  ],
  indicatorSlugs: ["cloud-region-concentration"],
  sources: [
    {
      sourceId: "aws-regions",
      url: "https://aws.amazon.com/about-aws/global-infrastructure/regions_az/",
      checkedAt: CHECKED_AT,
      note: "AWS AI-instance availability per region.",
    },
    {
      sourceId: "gcp-regions",
      url: "https://cloud.google.com/about/locations",
      checkedAt: CHECKED_AT,
      note: "Google Cloud TPU/GPU availability per region.",
    },
    {
      sourceId: "azure-regions",
      url: "https://azure.microsoft.com/en-us/explore/global-infrastructure/geographies/",
      checkedAt: CHECKED_AT,
      note: "Microsoft Azure AI-instance availability per region.",
    },
    {
      sourceId: "peeringdb",
      url: "https://www.peeringdb.com/",
      checkedAt: CHECKED_AT,
      note: "Colocation facility records hosting GPU build-out.",
    },
  ],
};
