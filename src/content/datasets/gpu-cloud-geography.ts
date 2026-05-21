import type { Dataset } from "@/entities";

const CHECKED_AT = "2026-05-27";

export const GPU_CLOUD_GEOGRAPHY: Dataset = {
  slug: "gpu-cloud-geography",
  title: "GPU and accelerator cloud geography",
  dek:
    "Documentation of how hyperscaler GPU and accelerator availability geography overlaps with general-availability cloud regions, carrier-neutral facilities, and interconnection metros — without per-region GPU counts.",
  category: "ai",
  publishedAt: "2026-05-27",
  lastUpdated: "2026-05-27",
  status: "pending",
  confidence: "low",
  methodology:
    "The dataset documents the geographic pattern by which hyperscaler GPU and accelerator availability overlays the existing general-availability cloud-region geography. Hyperscaler GPU-instance availability (AWS P5 / Trainium / Inferentia, Azure ND-series / NCv-series, GCP A3 / TPU) is read from each provider's per-region instance-availability documentation. The dataset records the *clustering pattern* — which metros host the most-frequently-publicised GPU regions across providers — and does not store per-region GPU counts, per-instance-family inventory, or queue depth. Specialist GPU operators (CoreWeave, Lambda, neoclouds) are documented at metro level when their own published facility pages disclose location.",
  limitations: [
    "GPU and accelerator inventory at a per-region or per-facility level is not stored. The platform refuses to invent these figures.",
    "Per-instance-family availability inside hyperscaler regions changes irregularly. The dataset records structural patterns, not per-day inventory.",
    "Provider-published GPU-instance availability sometimes reflects launch announcements rather than current capacity — the dataset uses the provider's own page at the editorial check date.",
    "Specialist GPU operators publish location inconsistently; the dataset records what is officially disclosed and is silent on the rest.",
    "Power and cooling supply signals — which determine whether an AI-capable region can scale further — are sparsely published and tracked separately in the ai-infrastructure-regions dataset, not here.",
    "The dataset deliberately publishes no per-metro or per-country GPU-region ranking. AI-readiness composites require denominators (total possible regions, total possible accelerators) that are themselves not verifiable.",
  ],
  relatedEntityRefs: [
    "city:ashburn",
    "city:frankfurt",
    "city:london",
    "city:singapore",
    "city:tokyo",
    "country:united-states",
    "country:germany",
    "country:singapore",
  ],
  indicatorSlugs: ["cloud-region-concentration"],
  mapPath: "/maps/cloud-regions",
  sources: [
    {
      sourceId: "aws-regions",
      url: "https://aws.amazon.com/about-aws/global-infrastructure/regions_az/",
      checkedAt: CHECKED_AT,
      note: "AWS Global Infrastructure regions page; AI-instance availability per region.",
    },
    {
      sourceId: "gcp-regions",
      url: "https://cloud.google.com/about/locations",
      checkedAt: CHECKED_AT,
      note: "Google Cloud locations directory; TPU and GPU instance availability per region.",
    },
    {
      sourceId: "azure-regions",
      url: "https://azure.microsoft.com/en-us/explore/global-infrastructure/geographies/",
      checkedAt: CHECKED_AT,
      note: "Microsoft Azure geographies; ND-series and NCv-series instance availability per region.",
    },
    {
      sourceId: "peeringdb",
      url: "https://www.peeringdb.com/",
      checkedAt: CHECKED_AT,
      note: "Colocation footprint context for specialist GPU operators.",
    },
  ],
};
