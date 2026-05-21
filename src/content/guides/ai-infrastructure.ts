import type { Guide } from "@/entities";

const CHECKED_AT = "2026-05-27";

export const AI_INFRASTRUCTURE_GUIDE: Guide = {
  slug: "ai-infrastructure",
  title: "AI infrastructure",
  dek:
    "The compute, network, and power footprint of large-scale machine-learning workloads — and the structural constraints (power, cooling, fibre, regulation) that determine where it gets built.",
  publishedAt: "2026-05-20",
  lastUpdated: "2026-05-27",
  definition:
    "AI infrastructure refers to the specialised compute, network, and power capacity required for large-scale machine-learning training and inference workloads — typically organised as GPU or accelerator clusters of significant power density, inside cloud regions or specialist colocation facilities. The principal constraint is power and cooling supply, not compute supply alone.",
  keyTakeaways: [
    "AI workloads are power-density limited more than space-limited; a single training rack can draw 50–100 kW where general-purpose racks draw a fraction of that.",
    "Training workloads need concentrated capacity in a single facility; inference workloads can be distributed across regions and edge locations.",
    "Hyperscalers expose AI-specific instance families inside existing cloud regions; specialist operators run GPU-dense facilities outside the hyperscalers.",
    "The infrastructure constraint is the power and cooling supply chain — utility capacity, grid stability, water access — not GPU supply alone.",
    "AI-infrastructure facts move fast; treat any specific capacity or facility claim as a snapshot and check the underlying provider source for current state.",
  ],
  summary: [
    { label: "Type", value: "Compute / network / power infrastructure" },
    { label: "Principal constraint", value: "Power and cooling supply chain" },
    {
      label: "Workload split",
      value: "Training (concentrated) vs inference (distributed)",
    },
    {
      label: "Authoritative sources",
      value: "Hyperscaler provider docs; PeeringDB facility data",
    },
    {
      label: "Substrate",
      value: "Existing datacenter hubs + specialist GPU facilities",
    },
    { label: "Update cadence", value: "Fast-moving; check sources for current" },
  ],
  sections: [
    {
      id: "what-it-is",
      heading: "What AI infrastructure is",
      paragraphs: [
        "AI infrastructure is shorthand for the compute, network, and power capacity required to train and run large machine-learning models. The compute element — GPUs, custom accelerators (TPUs, Trainium, Maia, etc.), high-bandwidth memory — gets the press attention. The network and power elements are equally constraining in practice.",
        "Each major cloud provider exposes AI-specific instance families inside their existing cloud regions, documented in their respective directories. Specialist operators — CoreWeave, Lambda, neoclouds — run GPU-dense colocation footprints outside the hyperscalers.",
      ],
    },
    {
      id: "training-vs-inference",
      heading: "Training vs inference",
      paragraphs: [
        "Training and inference have different infrastructure profiles. Training a frontier model concentrates compute in a small number of facilities — sometimes a single facility — with high inter-GPU bandwidth requirements, so the cluster effectively wants to be in one building with non-blocking interconnect. The total power draw for a training run can be tens of megawatts, sustained for weeks.",
        "Inference is more distributed. Once a model is trained, serving it can happen across regions and edge locations, with the constraint shifting from inter-GPU bandwidth to user latency and request throughput.",
      ],
    },
    {
      id: "power-density",
      heading: "The power-density constraint",
      paragraphs: [
        "A general-purpose colocation rack draws on the order of 5–10 kW. A modern GPU training rack draws 50–100 kW or more, with liquid cooling rather than air. The total power consumption per square metre of floor space is far higher than the colocation industry has historically designed for.",
        "The result is that AI infrastructure build-out is rate-limited by utility power, grid interconnection queues, water access for cooling, and regulatory planning permissions — not by GPU supply alone. Operators that secured power-purchase agreements and grid interconnects early have a structural advantage that is difficult to compete with on a year or two of catch-up.",
      ],
    },
    {
      id: "hyperscaler-vs-specialist",
      heading: "Hyperscaler vs specialist providers",
      paragraphs: [
        "The three major hyperscalers integrate AI-specific instance families into their existing cloud regions — AWS, Google Cloud, and Microsoft Azure all do this and document it in their respective region directories. For customers already operating on a hyperscaler footprint, this is the easiest path to AI capacity.",
        "Specialist operators run GPU-dense facilities optimised for training workloads and rent them on terms different from the hyperscalers. They tend to operate fewer regions, larger contiguous clusters per region, and tighter integration with specific GPU generations.",
      ],
    },
    {
      id: "where-its-being-built",
      heading: "Where AI capacity is being built",
      paragraphs: [
        "AI capacity is being added at three kinds of sites: existing datacenter hubs (Ashburn, Frankfurt, Singapore) where the surrounding interconnection is already dense; specialist GPU facilities adjacent to favourable power markets (some of which are in non-traditional locations chosen specifically for cheap utility power); and new build-outs in metros that have not historically been hub markets but offer favourable power-purchase terms.",
        "The geographic distribution is changing faster than the colocation industry's published facility lists, so reading PeeringDB and TeleGeography reporting alone risks underreading the picture. The hyperscalers' own announcement pages and trade press coverage are the leading indicators.",
      ],
    },
    {
      id: "managed-ai-services",
      heading: "Managed AI services overlay general-availability regions",
      paragraphs: [
        "Each major hyperscaler runs a managed-AI service on top of its general-availability cloud regions: AWS Bedrock, Azure OpenAI Service, and Google Cloud Vertex AI. Each service publishes its own regional-availability page; the regions on those pages are a *subset* of the provider's general-availability regions, with different timing for each model family and significant per-region variation in which models are admitted.",
        "Reading the three managed-AI service pages together reveals the same metro pattern as the general-availability geography — Ashburn, Frankfurt, London, Singapore, and Tokyo recur — but the per-region per-model surface differs noticeably across providers. Radar tracks managed-AI service regional availability as a separate dataset (`ai-capable-cloud-regions`) from general-availability regions and does not collapse them into a single composite metric.",
      ],
    },
    {
      id: "sovereignty",
      heading: "Sovereignty and regulatory considerations",
      paragraphs: [
        "AI-capable cloud regions sit inside two overlapping regulatory regimes: the general data-residency and telecom rules of the host jurisdiction, and AI-specific regulation that has emerged alongside the technology. The EU AI Act (Regulation 2024/1689) is the most explicit example — it imposes obligations on high-risk AI systems and on general-purpose AI models that apply to providers and deployers operating in the EU, including those running models on EU-hosted infrastructure.",
        "Beyond AI-specific regulation, data-centre regulation shapes where new AI-capable capacity can land. Singapore's 2019 data-centre moratorium and the 2022 guided-expansion programme (administered by IMDA) explicitly constrain the rate at which new capacity is admitted in the metro. Other jurisdictions (Ireland, the Netherlands) have adopted similar grid-and-water capacity constraints under different framings.",
        "Sovereign-cloud variants — Azure Government, AWS GovCloud, GCP for sovereign workloads — add a further layer: a region may exist physically inside a hyperscaler's footprint but be administratively isolated for sovereignty reasons. The platform records these as distinct rows from general-availability regions; readers should not collapse them into the in-service count.",
      ],
    },
    {
      id: "caveat",
      heading: "Source caveat",
      paragraphs: [
        "AI infrastructure facts move fast. New facilities, new instance families, new power agreements, and new specialist operators arrive on a weekly basis. Treat any specific capacity claim — by Radar or by any other source — as a snapshot, and check the underlying provider documentation or industry reporting for the current state.",
        "Radar treats AI infrastructure as a topic on which the canonical-source list is broader than for traditional internet infrastructure, and on which the lastUpdated date carries more practical meaning than usual.",
      ],
    },
  ],
  strategicImportance: [
    "For operators planning multi-year capacity, AI infrastructure is the supply chain that needs the longest lead time — power-purchase agreements, grid interconnect queues, planning permissions all run on multi-year horizons. AI infrastructure decisions in 2026 reflect site selection from several years earlier.",
    "For policy makers, AI infrastructure concentrates power-grid load in particular metros and adds a new dimension to grid-planning, water-rights, and economic-development calculations. The infrastructure question is increasingly an industrial-policy question.",
  ],
  geographicImportance: [
    {
      entityRef: "city:ashburn",
      prose:
        "Ashburn already hosts dense hyperscaler region capacity and is therefore the destination of much US AI-infrastructure investment — at the cost of compounding power-grid constraints on the Northern Virginia substations that feed the metro. Provider managed-AI services (AWS Bedrock, Azure OpenAI East US, Vertex AI us-east4) all anchor here.",
    },
    {
      entityRef: "city:frankfurt",
      prose:
        "Frankfurt is the EU equivalent: existing hyperscaler regions and interconnection density make it attractive to AI workloads, while EU AI Act obligations and local power-planning constraints shape how quickly new capacity can land. AWS Bedrock eu-central-1 and Vertex AI europe-west3 anchor managed-AI services in the metro.",
    },
    {
      entityRef: "city:london",
      prose:
        "London is the western FLAP anchor and the principal European termination of transatlantic cables; provider managed-AI service rollouts (Azure OpenAI UK South, Vertex AI europe-west2) follow the same metro pattern as the three-hyperscaler GA-region clustering.",
    },
    {
      entityRef: "city:singapore",
      prose:
        "Singapore's 2019 data-centre moratorium and the subsequent IMDA-administered guided-expansion programme are a leading-edge example of regulator constraint shaping AI-infrastructure buildout. The metro hosts ap-southeast-1 / asia-southeast1 / Southeast Asia and the corresponding managed-AI service regions for each.",
    },
    {
      entityRef: "city:tokyo",
      prose:
        "Tokyo is the Northeast Asian three-hyperscaler anchor (ap-northeast-1 / asia-northeast1 / Japan East). Managed-AI service availability typically extends to Tokyo before the smaller Japanese metros (Osaka), reflecting interconnection density and submarine-cable landing geography.",
    },
  ],
  caveats: [
    "AI infrastructure facts move faster than the colocation industry's published facility lists. PeeringDB and TeleGeography are necessary but not sufficient; the hyperscaler announcement pages and trade-press coverage are the leading indicators.",
    "Capacity claims for specific facilities (megawatt counts, GPU-rack counts) are usually operator-reported and not independently verifiable; Radar does not store such figures on identity records.",
    "Specialist GPU operators (CoreWeave, Lambda, neoclouds) publish footprints inconsistently. Their absence from PeeringDB or TeleGeography reporting is not evidence of absence in the market.",
    "AI-instance availability per cloud region is documented on each cloud's own pages and changes frequently; reading the provider's region directory at a recent date is more reliable than relying on third-party aggregation.",
    "Per-foundation-model availability inside Bedrock, Azure OpenAI, and Vertex AI varies by region and changes frequently; Radar's reviewed `ai-capable-cloud-regions` rows record service-level availability only.",
    "GPU and accelerator counts per region (H100 / H200 / MI300 / TPUv5 / Trainium / Inferentia inventories) are not stored at any level of granularity. The platform refuses to publish numbers that providers themselves don't disclose at a citable URL.",
    "\"AI readiness\" rankings are not published. The composite would require denominators (total possible accelerators, total possible regions, total possible models) that are not themselves verifiable.",
  ],
  methodologyNotes: [
    "Radar does not publish per-region AI-accelerator inventories; the indicators we maintain document the structural concentration question (where AI capacity is being added) rather than per-facility counts.",
    "AI infrastructure cuts across the cloud-region, datacenter-hub, power-supply, and regulatory layers. The guide stays explicitly cross-layer rather than collapsing into any single one.",
    "Managed-AI service availability and general-availability cloud-region availability are tracked as separate datasets (`ai-capable-cloud-regions` and `global-cloud-regions`). The platform refuses to collapse them into a single composite metric.",
    "Editorial language: Radar does not use \"AI hub\", \"AI capital\", or \"AI dominance\" claims. The geographic pattern is described as clustering of provider-published service regions in the same metros that anchor the general-availability geography.",
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
  relatedDatasetSlugs: [
    "ai-infrastructure-regions",
    "ai-capable-cloud-regions",
    "gpu-cloud-geography",
    "global-cloud-regions",
  ],
  relatedIndicatorSlugs: ["cloud-region-concentration", "datacenter-concentration"],
  relatedRankingSlugs: ["ai-infrastructure-readiness", "cloud-infrastructure-hubs"],
  relatedMapPaths: ["/maps/cloud-regions", "/maps/datacenters"],
  relatedMediaIds: [
    "ai-capable-region-clustering",
    "cloud-region-distribution",
    "carrier-neutral-facility-model",
  ],
  sources: [
    {
      sourceId: "aws-regions",
      url: "https://aws.amazon.com/about-aws/global-infrastructure/regions_az/",
      checkedAt: CHECKED_AT,
      note: "AWS AI-instance families documented inside region directory.",
    },
    {
      sourceId: "gcp-regions",
      url: "https://cloud.google.com/about/locations",
      checkedAt: CHECKED_AT,
      note: "Google Cloud TPU and GPU availability per region.",
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
    {
      sourceId: "telegeography",
      url: "https://www.telegeography.com/",
      checkedAt: CHECKED_AT,
      note: "Colocation-market reporting for AI build-out locations.",
    },
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
      note: "IMDA — Singapore data-centre regulation, moratorium history, guided-expansion programme.",
    },
  ],
};
