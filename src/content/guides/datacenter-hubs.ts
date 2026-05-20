import type { Guide } from "@/entities";

const CHECKED_AT = "2026-05-20";

export const DATACENTER_HUBS_GUIDE: Guide = {
  slug: "datacenter-hubs",
  title: "Datacenter hubs",
  dek:
    "What makes a metro a global datacenter hub — and why the same handful of metros (Ashburn, Frankfurt, Singapore, London, Amsterdam) keep appearing on every infrastructure map.",
  publishedAt: "2026-05-20",
  lastUpdated: "2026-05-20",
  definition:
    "A datacenter hub is a metro with a high concentration of carrier-neutral colocation facilities, dense interconnection options, and access to fibre routes and power infrastructure that make it economically attractive to host computing infrastructure. PeeringDB tracks the facility-by-facility composition of every hub.",
  keyTakeaways: [
    "Hubs are metros, not individual buildings; a hub is the collective property of many facilities operating in close physical proximity.",
    "Ashburn, Frankfurt, Singapore, London and Amsterdam are the canonical global hubs per PeeringDB and TeleGeography reporting.",
    "Hub status is path-dependent: an early concentration of facilities attracts more facilities, which attracts more networks, which attracts more facilities.",
    "Hubs are the substrate for cloud regions and IXPs. A cloud region in a non-hub metro is unusual; an IXP outside a hub is small.",
    "Power supply, fibre topology and regulatory stability are the underlying inputs that determine whether a hub can keep growing.",
  ],
  summary: [
    { label: "Type", value: "Datacenter hub metro" },
    { label: "Granularity", value: "Metro / MAN scale" },
    {
      label: "Authoritative source",
      value: "PeeringDB facility records (tier-2)",
    },
    {
      label: "Industry framing",
      value: "Path-dependent network-effects market",
    },
    {
      label: "Canonical examples",
      value: "Ashburn, Frankfurt, Singapore, London, Amsterdam",
    },
    {
      label: "Underlying constraints",
      value: "Power supply, fibre topology, regulatory stability",
    },
  ],
  sections: [
    {
      id: "what-makes-a-hub",
      heading: "What makes a metro a hub",
      paragraphs: [
        "A datacenter hub is the result of three overlapping concentrations in the same metro: carrier-neutral colocation facilities, network presence (transit providers, content networks, eyeball ISPs), and major-cloud presence (Direct Connect / Interconnect / ExpressRoute on-ramps). When all three are present and dense, customers can land capacity in the metro and reach almost everything they need without leaving it.",
        "The carrier-neutral colocation model is what enables the first concentration. A facility operator that does not itself sell connectivity can host every transit provider, every content network, and every cloud on-ramp side by side; networks meet there because their customers and counterparties are already there.",
      ],
    },
    {
      id: "canonical-hubs",
      heading: "The canonical global hubs",
      paragraphs: [
        "Five metros recur on every serious infrastructure map: Ashburn (Northern Virginia), Frankfurt, Singapore, London, and Amsterdam. Each has a distinctive role.",
        "Ashburn is the US east-coast colocation cluster and the origin metro for AWS us-east-1. Frankfurt is the eastern anchor of the European FLAP cluster (Frankfurt, London, Amsterdam, Paris) and the home of DE-CIX Frankfurt. London anchors transatlantic capacity into Europe. Amsterdam anchors the northern European corridor and hosts AMS-IX. Singapore is the regional anchor for Southeast Asia, Australia and South Asia.",
      ],
    },
    {
      id: "path-dependence",
      heading: "How hubs become hubs",
      paragraphs: [
        "Hub status is path-dependent. The early datacenter operator who picked Ashburn in the 1990s did so because the surrounding fibre topology was already favourable; everyone who followed picked Ashburn because they would meet the right counterparties there.",
        "This is why hubs are difficult to substitute. Standing up a new colocation facility in a non-hub metro produces a facility, not a hub; replicating the surrounding ecosystem is a decade-plus project that no individual operator can finance on its own.",
      ],
    },
    {
      id: "underlying-inputs",
      heading: "Power, fibre and policy",
      paragraphs: [
        "Beneath the network-effects loop sit three underlying inputs: power supply (utility capacity, grid stability, and increasingly local sustainable-energy access), fibre topology (long-haul routes, metro fibre density), and regulatory stability (consistent planning permissions, predictable energy pricing, stable data-protection regime).",
        "When one of these inputs deteriorates — power constraints in Northern Virginia, planning constraints in Frankfurt — hubs slow their growth rather than relocate. The fix typically arrives via expanded build-out at adjacent locations within the same metro region.",
      ],
    },
  ],
  strategicImportance: [
    "For application architects, the choice of hub metro for primary capacity determines the network geography of everything downstream — which clouds are reachable on private interconnect, which IXPs are present, which transit providers are competitive.",
    "For policy makers, hub status is an outsized economic and security factor: a hub metro is part of the critical infrastructure of its country and region. Loss of hub status — through power, policy, or sustained capacity drought — has consequences across a far wider geography than the metro itself.",
  ],
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
      sourceId: "peeringdb",
      url: "https://www.peeringdb.com/",
      checkedAt: CHECKED_AT,
      note: "Carrier-neutral facility records and metro composition.",
    },
    {
      sourceId: "telegeography",
      url: "https://www.telegeography.com/",
      checkedAt: CHECKED_AT,
      note: "Colocation and interconnection market reporting.",
    },
    {
      sourceId: "aws-regions",
      url: "https://aws.amazon.com/about-aws/global-infrastructure/regions_az/",
      checkedAt: CHECKED_AT,
      note: "AWS region locations as a proxy signal for hub metros.",
    },
    {
      sourceId: "gcp-regions",
      url: "https://cloud.google.com/about/locations",
      checkedAt: CHECKED_AT,
      note: "Google Cloud locations as a proxy signal for hub metros.",
    },
    {
      sourceId: "azure-regions",
      url: "https://azure.microsoft.com/en-us/explore/global-infrastructure/geographies/",
      checkedAt: CHECKED_AT,
      note: "Microsoft Azure geographies as a proxy signal for hub metros.",
    },
  ],
};
