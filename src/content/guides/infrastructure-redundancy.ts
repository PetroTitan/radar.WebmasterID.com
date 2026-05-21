import type { Guide } from "@/entities";

const CHECKED_AT = "2026-05-22";

export const INFRASTRUCTURE_REDUNDANCY_GUIDE: Guide = {
  slug: "infrastructure-redundancy",
  title: "Infrastructure redundancy",
  dek:
    "The layered model behind \"highly available\" infrastructure: facility, metro, region, route, and operator redundancy — and what each layer actually protects against.",
  publishedAt: "2026-05-22",
  lastUpdated: "2026-05-22",
  definition:
    "Infrastructure redundancy is the practice of designing systems so that the failure of a single component (a facility, a metro, a cloud region, a fibre route, an operator) does not produce a system-wide outage. Each redundancy layer addresses a different class of failure, and a system's overall resilience is determined by which layers it actually spans — not by aggregate uptime claims.",
  keyTakeaways: [
    "Redundancy is layered: facility, metro, region, route, and operator are independent failure domains that stack.",
    "Hardware redundancy inside a single facility protects against component failure but not against losing the building.",
    "Multi-region architectures protect against losing a region but not against losing a route between regions or against an operator-wide policy or billing failure.",
    "Route diversity (independent fibre paths between sites) and operator diversity (capacity across different providers) are the layers most often skipped — and the ones most often invoked after a major outage.",
    "Resilience is a property of the actual deployment, not of any single provider's published architecture diagram. The published diagrams describe what is possible, not what was bought.",
  ],
  summary: [
    { label: "Type", value: "Layered failure-domain model" },
    {
      label: "Principal layers",
      value: "Facility, metro, region, route, operator",
    },
    {
      label: "Authoritative source",
      value: "Provider availability-zone and region documentation",
    },
    {
      label: "Critical layer often skipped",
      value: "Route diversity (independent fibre paths)",
    },
    {
      label: "Common mistake",
      value: "Equating provider claims with actual architecture",
    },
    {
      label: "Operational test",
      value: "What failure mode does each layer actually protect against?",
    },
  ],
  sections: [
    {
      id: "the-layers",
      heading: "The five layers",
      paragraphs: [
        "Infrastructure redundancy is best read as a stack of independent failure domains. The first layer is the facility — a single colocation building or a single cloud availability zone. Hardware redundancy inside the facility (dual power feeds, dual cooling paths, redundant networking) protects against component failure inside the building.",
        "The second layer is the metro: multiple facilities in the same geography. A metro-level architecture protects against losing a single facility (fire, power outage, building incident) but not against a regional power event or a metro-wide fibre cut.",
        "The third layer is the region: geographically separated sites operated under different power grids, water systems, and regulatory jurisdictions. The fourth layer is route diversity: the fibre paths between sites should be physically distinct, so a single backhoe cannot sever both. The fifth layer is operator diversity: capacity across different providers, so a single provider's policy or billing event cannot remove the whole footprint.",
      ],
    },
    {
      id: "facility-vs-az",
      heading: "Facility redundancy and availability zones",
      paragraphs: [
        "A cloud availability zone is the provider's name for a facility-redundancy unit — typically one or more datacenters engineered to be independent of the other zones in the region. Customers deploying across multiple zones in a region get facility-level redundancy on the cloud's terms.",
        "Outside the cloud, the equivalent is operating cages in multiple carrier-neutral facilities in the same metro. The protection is identical in principle and the residual risk is identical in practice: metro-wide events (a hurricane, a sustained regional power event, a fibre incident across the metro's main routes) are not addressed by facility redundancy alone.",
      ],
    },
    {
      id: "region-vs-route",
      heading: "Region-level versus route-level redundancy",
      paragraphs: [
        "Multi-region architectures are usually the first redundancy layer organisations buy. The headline cloud architecture diagrams emphasise this layer because it is the easiest to provision: replicate the deployment in a second region and configure failover.",
        "Route diversity is the layer most often missed. Two regions can be \"different regions\" by the cloud's naming but connected by fibre routes that share physical paths through specific corridors — Marseille for east-west Mediterranean cables, the Red Sea for Europe-to-Asia, the Luzon Strait for north-east Asia. A cable incident in a corridor shared by both routes produces correlated failure that the region-level diagram does not show.",
      ],
    },
    {
      id: "operator-diversity",
      heading: "Operator diversity",
      paragraphs: [
        "Operator diversity is the practice of running capacity across providers that are operationally independent — different clouds, different colocation operators, different transit providers. The point is not redundancy against hardware failure (which is what the lower layers handle) but redundancy against a single provider's policy, billing, or operational issue affecting the whole footprint.",
        "Operator diversity is expensive: tooling, contracts, and operational practices all duplicate. It is therefore reserved for footprints where a single-provider failure is unacceptable. For most workloads, the trade-off is unfavourable; for critical infrastructure, payments systems, and certain regulated services, the trade-off goes the other way.",
      ],
    },
    {
      id: "what-the-diagrams-show",
      heading: "Reading availability-zone and region diagrams",
      paragraphs: [
        "Cloud-provider documentation publishes availability-zone and region architecture at a level of abstraction that omits the underlying physical detail. Two zones described as \"physically separated\" might be in adjacent buildings (separated power, separated cooling, common metro fibre) or in geographically distant facilities (everything separated). The provider's documentation rarely distinguishes these two cases.",
        "The practical operational question is which failure modes the architecture protects against. A deployment in two zones in the same region survives single-facility failure; whether it survives metro-level failure depends on how the cloud actually placed those zones. The cloud's own published documentation is the starting point; running deliberate failure-domain analysis on a specific deployment is the rest of the work.",
      ],
    },
  ],
  strategicImportance: [
    "Most production outages on infrastructure with substantial published redundancy turn out, on review, to have failed at a layer that was not actually independent — two regions that shared a fibre corridor, two providers that shared an upstream, a multi-zone deployment whose zones shared a single metro substation. The redundancy was real on the diagram but absent in the deployment.",
    "For policy and regulator audiences, infrastructure redundancy is the operational substance of resilience claims. Reading published architecture without checking which failure modes are actually independent risks accepting redundancy-on-paper as redundancy-in-fact.",
  ],
  geographicImportance: [
    {
      entityRef: "country:singapore",
      prose:
        "Singapore concentrates cloud regions, IXPs, and submarine cable landings inside the same small geography. Multi-region failover from Singapore must go offshore to maintain meaningful geographic redundancy.",
    },
    {
      entityRef: "city:ashburn",
      prose:
        "Ashburn is a metro-redundancy zone but not a region-redundancy zone: dozens of facilities within the same Northern Virginia geography means metro-wide events (power grid, regional weather) hit multiple operators simultaneously.",
    },
    {
      entityRef: "city:frankfurt",
      prose:
        "Frankfurt's interconnection density makes it the natural EU primary; its proximity to Amsterdam, Paris, and London makes credible region-level failover within Europe practical without leaving the EU regulatory perimeter.",
    },
  ],
  caveats: [
    "Provider availability-zone and region documentation describes design intent, not the specific physical placement of every customer's deployment. Detailed failure-domain claims require deployment-specific analysis.",
    "Route-diversity analysis requires cable-map and metro-fibre data that is often only partially public; TeleGeography reporting is the most complete public reference.",
    "Operator-diversity costs compound across years. The trade-off depends on a workload's actual sensitivity to single-provider outage — not on a generalised principle that more diversity is always better.",
  ],
  methodologyNotes: [
    "Radar treats redundancy claims at the layer of *which entities exist* — what facilities, IXPs, and cloud regions are present in a metro — and stops there. Capacity, uptime, and per-customer architecture are not Radar facts.",
    "When discussing resilience, Radar surfaces structural signals (metro count of carrier-neutral facilities, regional cable landing diversity) rather than computing composite resilience scores. Composite scores require denominators (every possible failure mode) that are themselves not verifiable.",
  ],
  relatedEntityRefs: [
    "city:frankfurt",
    "city:ashburn",
    "city:singapore",
    "country:germany",
    "country:united-states",
    "country:singapore",
  ],
  relatedDatasetSlugs: [
    "global-cloud-regions",
    "internet-exchange-hubs",
    "subsea-cable-landings",
  ],
  relatedIndicatorSlugs: ["infrastructure-redundancy", "subsea-connectivity"],
  relatedRankingSlugs: ["internet-resilience", "subsea-connectivity-hubs"],
  relatedMapPaths: ["/maps/subsea-cables", "/maps/datacenters"],
  relatedMediaIds: ["infrastructure-redundancy-model", "cable-landing-topology"],
  sources: [
    {
      sourceId: "aws-regions",
      url: "https://aws.amazon.com/about-aws/global-infrastructure/regions_az/",
      checkedAt: CHECKED_AT,
      note: "AWS availability-zone and region documentation.",
    },
    {
      sourceId: "gcp-regions",
      url: "https://cloud.google.com/about/locations",
      checkedAt: CHECKED_AT,
      note: "Google Cloud zone documentation.",
    },
    {
      sourceId: "azure-regions",
      url: "https://azure.microsoft.com/en-us/explore/global-infrastructure/geographies/",
      checkedAt: CHECKED_AT,
      note: "Microsoft Azure region and availability-zone documentation.",
    },
    {
      sourceId: "telegeography",
      url: "https://www.telegeography.com/",
      checkedAt: CHECKED_AT,
      note: "Cable corridors, fibre-route geography, and corridor concentration analysis.",
    },
    {
      sourceId: "peeringdb",
      url: "https://www.peeringdb.com/",
      checkedAt: CHECKED_AT,
      note: "Facility-by-facility records for metro-level redundancy analysis.",
    },
    {
      sourceId: "ripe-ncc",
      url: "https://www.ripe.net/",
      checkedAt: CHECKED_AT,
      note: "RIPE Atlas measurement data for route-diversity analysis.",
    },
  ],
};
