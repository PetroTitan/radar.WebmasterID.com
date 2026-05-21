import type { AICapableCloudRegionRecord } from "@/entities";
import { withProvenance } from "@/ingestion/shared/provenance";

/**
 * Reviewed AI-capable cloud-region rows.
 *
 * Each row records that a specific provider-managed AI service is
 * officially documented as available in a specific cloud region,
 * with the provider's own documentation page as the source.
 *
 * Strict editorial rules:
 *   - No GPU counts.
 *   - No accelerator inventory.
 *   - No capacity estimates.
 *   - No queue-time / throughput / latency claims.
 *   - No inference-pricing comparisons.
 *
 * The platform refuses to publish anything beyond what the provider
 * itself publishes on its own regional-availability page. Each row
 * is small by design — service identity + region identity + a free-
 * text `modelNotes` field for editor context.
 */

const OBSERVED = "2026-05-27";

interface AIRegionInput {
  readonly id: string;
  readonly sourceId: string;
  readonly sourceUrl: string;
  readonly rawSourceName: string;
  readonly aiService: string;
  readonly availability: AICapableCloudRegionRecord["availability"];
  readonly provider: AICapableCloudRegionRecord["provider"];
  readonly regionCode: string;
  readonly displayName: string;
  readonly countryCode: string;
  readonly metroSlug?: string;
  readonly modelNotes?: string;
  readonly relatedEntityRefs?: ReadonlyArray<string>;
  readonly limitations?: ReadonlyArray<string>;
}

function buildRow(input: AIRegionInput): AICapableCloudRegionRecord {
  return withProvenance(
    {
      sourceId: input.sourceId,
      rawSourceName: input.rawSourceName,
      observedAt: OBSERVED,
      confidence: "high",
    },
    input.sourceUrl,
    {
      id: input.id,
      recordType: "ai-capable-cloud-region" as const,
      provider: input.provider,
      regionCode: input.regionCode,
      displayName: input.displayName,
      countryCode: input.countryCode,
      metroSlug: input.metroSlug,
      aiService: input.aiService,
      availability: input.availability,
      modelNotes: input.modelNotes,
      relatedEntityRefs: input.relatedEntityRefs,
      limitations: input.limitations,
    },
  );
}

export const REVIEWED_AI_CAPABLE_CLOUD_REGIONS: ReadonlyArray<AICapableCloudRegionRecord> = [
  buildRow({
    id: "ai-aws-bedrock-us-east-1",
    sourceId: "aws-bedrock",
    rawSourceName: "AWS Bedrock service documentation",
    sourceUrl:
      "https://docs.aws.amazon.com/bedrock/latest/userguide/bedrock-regions.html",
    aiService: "AWS Bedrock",
    availability: "generally-available",
    provider: "aws",
    regionCode: "us-east-1",
    displayName: "US East (N. Virginia)",
    countryCode: "US",
    metroSlug: "ashburn",
    modelNotes:
      "Provider lists Bedrock as available in us-east-1 with its widest published model catalogue. Per-model availability and quotas are documented on the provider page; Radar does not store quota or pricing values.",
    relatedEntityRefs: [
      "city:ashburn",
      "country:united-states",
      "facility:equinix-dc11",
    ],
    limitations: [
      "Per-foundation-model availability inside Bedrock varies and changes irregularly; the row records service-level availability only.",
      "Bedrock cross-region inference and model copying features are not stored on identity rows.",
    ],
  }),
  buildRow({
    id: "ai-aws-bedrock-eu-central-1",
    sourceId: "aws-bedrock",
    rawSourceName: "AWS Bedrock service documentation",
    sourceUrl:
      "https://docs.aws.amazon.com/bedrock/latest/userguide/bedrock-regions.html",
    aiService: "AWS Bedrock",
    availability: "generally-available",
    provider: "aws",
    regionCode: "eu-central-1",
    displayName: "EU (Frankfurt)",
    countryCode: "DE",
    metroSlug: "frankfurt",
    modelNotes:
      "Provider lists Bedrock as available in eu-central-1; the per-model catalogue published on this region is smaller than us-east-1's at the editorial check date.",
    relatedEntityRefs: [
      "city:frankfurt",
      "country:germany",
      "facility:equinix-fr5",
      "ixp:de-cix-frankfurt",
    ],
    limitations: [
      "EU-region availability for specific foundation models reflects provider-level licensing decisions that change irregularly.",
    ],
  }),
  buildRow({
    id: "ai-vertex-ai-us-east4",
    sourceId: "vertex-ai",
    rawSourceName: "Google Cloud Vertex AI regional availability",
    sourceUrl: "https://cloud.google.com/vertex-ai/docs/general/locations",
    aiService: "Google Cloud Vertex AI",
    availability: "generally-available",
    provider: "gcp",
    regionCode: "us-east4",
    displayName: "Northern Virginia",
    countryCode: "US",
    metroSlug: "ashburn",
    modelNotes:
      "Provider lists Vertex AI APIs as available in us-east4 alongside other US regions; Model Garden surfaces vary per-API and are documented on the provider page.",
    relatedEntityRefs: [
      "city:ashburn",
      "country:united-states",
      "facility:equinix-dc11",
    ],
    limitations: [
      "Vertex AI's per-API regional surface (Gemini, Generative AI Studio, Model Garden, AutoML, etc.) is documented separately by the provider; the row records platform-level availability only.",
    ],
  }),
  buildRow({
    id: "ai-vertex-ai-europe-west3",
    sourceId: "vertex-ai",
    rawSourceName: "Google Cloud Vertex AI regional availability",
    sourceUrl: "https://cloud.google.com/vertex-ai/docs/general/locations",
    aiService: "Google Cloud Vertex AI",
    availability: "generally-available",
    provider: "gcp",
    regionCode: "europe-west3",
    displayName: "Frankfurt",
    countryCode: "DE",
    metroSlug: "frankfurt",
    modelNotes:
      "Provider lists Vertex AI APIs in europe-west3; per-API surface differs from US regions and the provider documents which APIs are restricted to EU-region data residency.",
    relatedEntityRefs: [
      "city:frankfurt",
      "country:germany",
      "facility:equinix-fr5",
    ],
    limitations: [
      "EU-region Vertex AI availability interacts with EU AI Act obligations for high-risk and general-purpose model deployments; the row does not encode regulatory state.",
    ],
  }),
  buildRow({
    id: "ai-azure-openai-east-us",
    sourceId: "azure-openai",
    rawSourceName: "Azure OpenAI Service regional availability",
    sourceUrl:
      "https://learn.microsoft.com/azure/ai-services/openai/concepts/models",
    aiService: "Azure OpenAI Service",
    availability: "generally-available",
    provider: "azure",
    regionCode: "eastus",
    displayName: "East US",
    countryCode: "US",
    metroSlug: "ashburn",
    modelNotes:
      "Provider documentation lists Azure OpenAI as available in East US; per-model regional availability (GPT-4 family, embedding models, fine-tuning) is documented separately on the provider page.",
    relatedEntityRefs: [
      "city:ashburn",
      "country:united-states",
      "facility:equinix-dc11",
    ],
    limitations: [
      "Per-model deployment regions inside Azure OpenAI change frequently; the row records service-level availability only.",
    ],
  }),
];
