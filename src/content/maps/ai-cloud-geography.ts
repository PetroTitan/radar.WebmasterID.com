import type { InfrastructureMap } from "@/entities";

const CHECKED_AT = "2026-05-28";

export const AI_CLOUD_GEOGRAPHY_MAP: InfrastructureMap = {
  slug: "ai-cloud-geography",
  title: "AI-capable cloud geography",
  dek:
    "Editorial topology of the five metros where managed-AI services (AWS Bedrock, Azure OpenAI, Vertex AI) are officially documented as available.",
  category: "ai-geography",
  geographicScope: "Global — Ashburn, London, Frankfurt, Singapore, Tokyo",
  summary:
    "An editorial topology map of managed-AI service geography. The same five metros that anchor the three-hyperscaler general-availability footprint (Ashburn, London, Frankfurt, Singapore, Tokyo) recur in the managed-AI service directories. The map shows provider-availability annotations per metro and corridor lines between metros; it does not depict per-model availability, GPU counts, or accelerator inventory.",
  methodology: [
    "Provider availability annotations are sourced from each hyperscaler's published service-availability page: AWS Bedrock, Azure OpenAI Service, Google Cloud Vertex AI. The map records service-level availability only.",
    "The platform refuses to plot GPU counts, accelerator inventory, capacity estimates, or AI-readiness scores anywhere on the diagram.",
    "Corridor lines mark the intra-region and inter-region routing relevant to AI workloads; they are editorial topology, not exact fibre paths.",
    "Per-model regional availability inside each service is documented on the provider page and is intentionally NOT mirrored into the map — that surface changes too quickly for a citable static snapshot.",
  ],
  caveats: [
    "Provider-managed AI services are a subset of provider general-availability regions; the map shows the subset, not the union.",
    "Singapore and Tokyo are labelled \"per-provider variation\" because the three providers' AI-service rollouts to those metros differ on per-model timing; the map does not enumerate the differences.",
    "Sovereign-cloud variants (Azure Government, AWS GovCloud, GCP sovereign workloads) are not depicted on this map.",
    "Regulatory state — EU AI Act obligations, Singapore IMDA constraints, US export controls — is not encoded on identity-style maps; it lives in the corresponding editorial sources.",
  ],
  relatedEntityRefs: [
    "city:ashburn",
    "city:london",
    "city:frankfurt",
    "city:singapore",
    "city:tokyo",
    "country:united-states",
    "country:united-kingdom",
    "country:germany",
    "country:singapore",
    "country:japan",
    "facility:equinix-dc11",
    "facility:equinix-fr5",
    "facility:equinix-sg3",
  ],
  relatedGuideSlugs: ["ai-infrastructure", "cloud-regions"],
  relatedDatasetSlugs: [
    "ai-capable-cloud-regions",
    "ai-infrastructure-regions",
    "gpu-cloud-geography",
    "global-cloud-regions",
  ],
  mediaId: "map-ai-cloud-geography",
  diagramComponent: "AICloudGeographyMap",
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
    {
      sourceId: "imda-singapore",
      url: "https://www.imda.gov.sg/",
      checkedAt: CHECKED_AT,
      note: "IMDA — Singapore data-centre regulation shaping AI build-out.",
    },
  ],
  editorialNotes: [
    "The map's metro list intentionally matches the AI infrastructure guide's geographic-importance section so the editorial framing is consistent across surfaces.",
  ],
  confidence: "high",
  lastUpdated: CHECKED_AT,
};
