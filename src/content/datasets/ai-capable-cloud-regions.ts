import type { Dataset } from "@/entities";

const CHECKED_AT = "2026-05-27";

export const AI_CAPABLE_CLOUD_REGIONS: Dataset = {
  slug: "ai-capable-cloud-regions",
  title: "AI-capable cloud regions",
  dek:
    "Officially documented hyperscaler-managed AI services (AWS Bedrock, Azure OpenAI, Google Cloud Vertex AI) by cloud region, sourced from provider regional-availability documentation.",
  category: "ai",
  publishedAt: "2026-05-27",
  lastUpdated: "2026-05-27",
  status: "partial",
  confidence: "high",
  methodology:
    "Each row records that a specific provider-managed AI service is officially documented as available in a specific cloud region, with the provider's own service documentation page as the source. Service identity (AWS Bedrock, Azure OpenAI Service, Google Cloud Vertex AI) and region identity are stored verbatim from provider material; per-model availability inside each service is documented on the provider page and is intentionally NOT mirrored into Radar rows — that surface changes too quickly for a citable static snapshot. The platform refuses to publish GPU counts, accelerator inventory, capacity estimates, queue times, throughput claims, or pricing comparisons.",
  limitations: [
    "Per-foundation-model availability inside each service changes irregularly. The dataset records service-level availability only; readers needing per-model regional availability must consult the provider's own documentation at the editorial check date.",
    "Provider service regions and provider general-availability regions are not always the same set; the dataset records the AI-service regions specifically, not the union of all cloud regions.",
    "Smaller AI-platform providers (Oracle, IBM, smaller cloud-native AI hosts) are not yet ingested.",
    "Preview-grade and limited-availability regions are tagged on each row; readers should not collapse them into the generally-available count.",
    "Provider regional surfaces interact with regulatory frameworks (EU AI Act, sovereignty rules, US export controls); the dataset records availability as the provider publishes it but does not encode regulatory state.",
  ],
  relatedEntityRefs: [
    "city:ashburn",
    "city:frankfurt",
    "city:london",
    "city:singapore",
    "city:tokyo",
    "country:united-states",
    "country:germany",
    "country:united-kingdom",
    "country:singapore",
    "country:japan",
    "facility:equinix-dc11",
    "facility:equinix-fr5",
    "facility:equinix-sg3",
  ],
  indicatorSlugs: ["cloud-region-concentration"],
  mapPath: "/maps/cloud-regions",
  sources: [
    {
      sourceId: "aws-bedrock",
      url: "https://docs.aws.amazon.com/bedrock/latest/userguide/bedrock-regions.html",
      checkedAt: CHECKED_AT,
      note: "AWS Bedrock published regional availability.",
    },
    {
      sourceId: "azure-openai",
      url: "https://learn.microsoft.com/azure/ai-services/openai/concepts/models",
      checkedAt: CHECKED_AT,
      note: "Azure OpenAI Service model and region documentation.",
    },
    {
      sourceId: "vertex-ai",
      url: "https://cloud.google.com/vertex-ai/docs/general/locations",
      checkedAt: CHECKED_AT,
      note: "Google Cloud Vertex AI published location list.",
    },
    {
      sourceId: "eu-ai-act",
      url: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R1689",
      checkedAt: CHECKED_AT,
      note: "EU AI Act — regulatory framing for EU-region AI deployments.",
    },
  ],
  recordCount: 5,
};
