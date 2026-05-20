import type { Guide } from "@/entities";

const CHECKED_AT = "2026-05-20";

export const AI_INFRASTRUCTURE_GUIDE: Guide = {
  slug: "ai-infrastructure",
  title: "AI infrastructure",
  dek:
    "The compute, network, and power footprint of large-scale machine-learning workloads — and the structural constraints (power, cooling, fibre) that determine where it gets built.",
  publishedAt: "2026-05-20",
  lastUpdated: "2026-05-20",
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
  relatedEntityRefs: [
    "city:ashburn",
    "city:frankfurt",
    "city:singapore",
    "country:united-states",
    "country:germany",
    "country:singapore",
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
  ],
};
