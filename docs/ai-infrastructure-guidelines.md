# AI infrastructure — editorial guidelines

Radar's AI infrastructure layer is the most editorially sensitive
surface on the platform. AI infrastructure is the topic on which
the internet has the highest density of unverifiable claims,
fast-moving facts, and incentive to publish hype-driven figures.
This document covers what Radar records, what it deliberately
refuses to record, and the discipline that keeps the layer
research-grade.

## Editorial posture

Five properties define the layer:

1. **No GPU counts.** Per-region, per-facility, or per-cluster GPU
   and accelerator counts (H100 / H200 / MI300 / TPUv5 /
   Trainium / Inferentia) are not stored at any level of
   granularity. The platform refuses to publish numbers that
   providers themselves don't disclose at a citable URL.
2. **No capacity claims.** Power-envelope, queue-time, inference-
   throughput, and latency claims are out of scope. The exception
   is the optional `statedPowerMw` field on a facility, which
   captures the operator's official disclosure — never inferred.
3. **No AI-readiness rankings.** The composite would require
   denominators (total possible accelerators, total possible
   regions, total possible models) that are not themselves
   verifiable. The `ai-infrastructure-readiness` ranking exists
   as a methodology-in-draft card and publishes no positions.
4. **Service identity, not service inventory.** Reviewed
   AI-capable cloud-region rows record that a provider's managed
   AI service is officially documented as available in a given
   region, with the provider's own page as the source. Per-model
   availability inside the service is documented on the provider
   page and is not mirrored into Radar rows.
5. **Sovereign-aware framing.** AI-capable cloud regions sit
   inside two overlapping regulatory regimes — the host
   jurisdiction's general data rules and AI-specific regulation
   (EU AI Act, sovereignty programmes, export controls). Rows
   record availability as the provider publishes it; the platform
   does not encode regulatory state inside identity rows.

## Approved AI sources

| Source                            | Tier   | Notes                                       |
| --------------------------------- | ------ | ------------------------------------------- |
| AWS Bedrock service docs          | tier-3 | Provider-attested regional availability.    |
| Azure OpenAI Service docs         | tier-3 | Provider-attested regional availability.    |
| Google Cloud Vertex AI locations  | tier-3 | Provider-attested regional availability.    |
| AWS / GCP / Azure region directories | tier-3 | AI-instance family availability per region. |
| EU AI Act (Regulation 2024/1689)  | tier-1 | Regulatory primary doc (EUR-Lex).           |
| IMDA Singapore                    | tier-1 | Singapore data-centre policy primary doc.   |
| PeeringDB facility records        | tier-2 | Facility ecosystem context.                 |
| TeleGeography                     | tier-2 | Colocation-market reporting.                |

## Prohibited sources

- Third-party "GPU tracker" sites
- Vendor sales presentations not published on the vendor's own
  documentation site
- Trade-press headlines about specific GPU counts
- Twitter / social-media reshares of capacity claims
- AI-generated content of any kind

## Prohibited fields

The validator catches these explicitly on
`AICapableCloudRegionRecord` rows and would reject any future
schema additions matching these names:

- `gpuCount` / `acceleratorCount`
- `accelerators` (inventory list)
- `aiReadinessScore` / `readinessScore`
- `capacity`
- `queueDepth`
- `throughputTbps` / `throughput`
- `latencyMs`

The validator also flags unsourced superlatives in `modelNotes`
("largest", "fastest", "best", "biggest", "first").

## Allowed claims

A row may state:

- That a specific provider's managed AI service (AWS Bedrock,
  Azure OpenAI Service, Google Cloud Vertex AI) is officially
  documented as available in a specific region.
- The provider-published `availability` status
  (`generally-available`, `preview`, `limited`).
- Free-text `modelNotes` editorial context referring to the
  provider's own documentation.
- Editorial limitations specific to the row.

A row may NOT state:

- How many GPUs are in the region.
- What inference throughput the region supports.
- Pricing comparisons.
- "AI hub", "AI capital", or "AI dominance" claims.
- A composite "readiness" score.

## Regional language discipline

Radar describes regions and metros using provider-published
identifiers (`us-east-1`, `eu-central-1`, `asia-northeast1`,
`Japan East`). The editorial framing for clusters is "AI service
regional availability clusters in the same metros as the three-
hyperscaler general-availability geography" — not "X is the AI
hub of Y."

Country-level and metro-level claims must cite at least one
provider primary doc or one tier-1/2 regulatory source.

## Datasets in scope

- `ai-infrastructure-regions` — the metro-level inventory of
  hyperscaler AI capacity (status: pending).
- `ai-capable-cloud-regions` — provider-managed AI services by
  cloud region (status: partial, with reviewed rows).
- `gpu-cloud-geography` — geographic patterns of hyperscaler GPU
  and accelerator availability (status: pending, methodology-only).
- `global-cloud-regions` — the underlying general-availability
  region inventory, cross-referenced by the AI datasets above.

## Sovereignty caveats

The EU AI Act, US export controls, Singapore's IMDA-administered
data-centre programme, and host-country data-residency rules all
shape which regions can host which AI workloads. Editorial
treatment:

- Reference the regulatory primary doc when a region's
  availability is affected.
- Do not speculate on regulator intent.
- Do not publish geopolitical conclusions ("AI race", "AI
  sovereignty leadership", etc.).
- Treat sovereign-cloud variants (Azure Government, AWS GovCloud,
  GCP for sovereign workloads) as distinct from general-
  availability regions.

## What this is not

- **Not a GPU inventory tracker.**
- **Not an AI-readiness leaderboard.**
- **Not a pricing comparison.**
- **Not a model-availability dashboard.**

If a reader needs per-model regional availability, the provider's
own documentation is the authoritative source; Radar records the
structural pattern, not the per-model surface.
