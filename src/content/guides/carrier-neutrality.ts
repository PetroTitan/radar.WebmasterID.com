import type { Guide } from "@/entities";

const CHECKED_AT = "2026-05-22";

export const CARRIER_NEUTRALITY_GUIDE: Guide = {
  slug: "carrier-neutrality",
  title: "Carrier neutrality",
  dek:
    "What it means for a colocation facility to be carrier-neutral, why neutrality is the precondition for dense interconnection, and how to read PeeringDB's facility records.",
  publishedAt: "2026-05-22",
  lastUpdated: "2026-05-23",
  definition:
    "A carrier-neutral facility is a colocation building whose operator does not itself sell connectivity. Tenants — transit providers, content networks, cloud on-ramps, eyeball ISPs — reach each other through cross connects inside the building, not through bandwidth purchased from the operator. Neutrality is the structural condition that lets a facility host many competing networks side-by-side.",
  keyTakeaways: [
    "Neutrality means the building operator sells space, power, and cooling, but not bandwidth — the tenants supply each other.",
    "Without neutrality, a colocation operator that also sold connectivity would have a direct incentive to disadvantage rival carriers, suppressing the density of networks willing to colocate there.",
    "PeeringDB's facility records and the operator's own facility pages are the primary public sources for whether a building is carrier-neutral.",
    "The carrier-neutral colocation operators (Equinix, Digital Realty, NTT Global Data Centers, CyrusOne, KDDI Telehouse, and a long tail of regional operators) are the substrate on which interconnection metros form.",
    "Neutrality is a property of the operator's business model, not of any single feature. The same operator can run neutral and non-neutral buildings in different metros.",
  ],
  summary: [
    { label: "Type", value: "Colocation facility business-model property" },
    {
      label: "Operator does not sell",
      value: "Bandwidth, internet transit, peering",
    },
    {
      label: "Operator does sell",
      value: "Space, power, cooling, cross connects",
    },
    {
      label: "Authoritative source",
      value: "PeeringDB facility records + operator pages",
    },
    {
      label: "Canonical operators",
      value: "Equinix, Digital Realty, NTT, CyrusOne, KDDI Telehouse",
    },
    {
      label: "Implication",
      value: "Substrate for dense interconnection metros",
    },
  ],
  sections: [
    {
      id: "what-neutrality-is",
      heading: "What carrier neutrality is",
      paragraphs: [
        "Carrier neutrality is a property of how a colocation operator runs its building. A neutral operator sells space, power, cooling, remote-hands services, and the cross connects between tenant cages — but it does not sell connectivity. Tenants bring their own networks; cross connects between tenants inside the building cost a one-time setup plus a monthly fee per cross connect, but no per-megabit charge.",
        "The operator's revenue, in a neutral model, comes from the rent on the cage and the recurring fee on the cross connect, not from the bandwidth flowing across that cross connect. This separation is what makes the model scalable to hundreds of competing networks under one roof.",
      ],
    },
    {
      id: "why-neutrality-matters",
      heading: "Why neutrality is the precondition for density",
      paragraphs: [
        "A colocation operator that also sells connectivity has a direct economic incentive to favour its own bandwidth product over the bandwidth of its tenants. In practice, this often shows up as higher cross-connect fees to rival carriers, slower provisioning, or limited carrier choice at the building. Networks that need to reach every other network respond by avoiding that building.",
        "A carrier-neutral operator faces the opposite incentive: every additional network in the building increases the value of being a tenant, which lifts the rent the operator can charge. Neutrality is therefore not just a virtue claim; it is a business model whose economic logic produces denser interconnection over time.",
      ],
    },
    {
      id: "the-operators",
      heading: "Who the carrier-neutral operators are",
      paragraphs: [
        "Equinix is the largest global operator running neutral facilities, with the IBX (International Business Exchange) brand. Digital Realty (after merging in Telx and Interxion) is the other major global operator. NTT Global Data Centers, CyrusOne, KDDI Telehouse, Iron Mountain, Coresite, Cologix, and a long tail of regional operators run neutral facilities across specific metros.",
        "Operators sometimes run buildings under different models in different metros. The carrier-neutral status of an individual facility is what matters for interconnection — not the operator's brand at the corporate level. PeeringDB's per-facility records and the operator's own published descriptions of the building are the practical references.",
      ],
    },
    {
      id: "reading-peeringdb",
      heading: "How to read PeeringDB facility records",
      paragraphs: [
        "PeeringDB records each facility with its operator, address, latitude / longitude, and the list of networks and IXPs present in the building. The network list is the load-bearing signal: a neutral facility with hundreds of networks present is a denser interconnection venue than a neutral facility with twenty.",
        "Per-facility records also list the IXPs whose fabric extends into the building. A facility that hosts a node of a major IXP (DE-CIX Frankfurt, AMS-IX, LINX) is, by that fact alone, a meeting point for every member of that IXP. Reading the facility record together with the relevant IX records is the basic discipline.",
      ],
    },
    {
      id: "non-neutral-comparison",
      heading: "Non-neutral facilities for contrast",
      paragraphs: [
        "Carrier-owned facilities — buildings that exist primarily to host a single carrier's network and customers of that carrier — operate under a different model. Tenants buy connectivity bundled with the building, and the population of competing carriers in the building is much smaller. These buildings still exist (national telecom incumbents often run them), but they are not the substrate for dense multi-network interconnection.",
        "Recognising the distinction matters when reading market reporting. A trade-press claim that a metro has \"a hundred datacenter buildings\" is uninformative without separating neutral interconnection venues from single-carrier facilities.",
      ],
    },
  ],
  strategicImportance: [
    "For any operator planning a metro footprint, choosing a carrier-neutral facility over a carrier-owned one is a structural decision about how many networks you can reach without leaving the building. The interconnection options compound across the life of the deployment.",
    "For policy makers and economic-development authorities, attracting a carrier-neutral colocation operator into a metro is often the practical first step in becoming an interconnection metro. Carrier-neutral operators bring no networks of their own; what they bring is a building under which neutrality lets networks accumulate.",
  ],
  geographicImportance: [
    {
      entityRef: "city:frankfurt",
      prose:
        "Frankfurt's carrier-neutral cluster — Equinix FR series, Digital Realty (formerly Interxion), and NTT facilities — is what made it possible for DE-CIX Frankfurt to span multiple buildings and for hundreds of networks to colocate within the same metro.",
    },
    {
      entityRef: "city:amsterdam",
      prose:
        "Amsterdam's neutral cluster (Equinix AM series, Digital Realty / Interxion, NorthC) is the substrate on which AMS-IX scales across multiple buildings; the metro is a benchmark for what a long-running carrier-neutral ecosystem can accumulate.",
    },
    {
      entityRef: "city:london",
      prose:
        "London concentrates neutral colocation across central London, the Docklands (anchored by Telehouse and Equinix LD series), and the Slough corridor. The neutrality of those facilities is what lets LINX scale across the metro.",
    },
    {
      entityRef: "city:ashburn",
      prose:
        "Ashburn / Northern Virginia is anchored on Equinix's DC series of neutral facilities plus a dense Digital Realty footprint; the cluster's neutrality is what lets hyperscalers, transit providers, content networks and the Equinix Internet Exchange Ashburn fabric coexist inside the same metro.",
    },
    {
      entityRef: "city:singapore",
      prose:
        "Singapore's neutral colocation cluster (Equinix SG series, Digital Realty, KDDI Telehouse) concentrates the region's interconnection capacity in a small geographic footprint near submarine cable landings.",
    },
  ],
  caveats: [
    "Operator neutrality claims and tenant experience can diverge. Cross-connect pricing, port-installation lead times, and on-site staffing all affect how neutral a building feels in practice; PeeringDB and operator pages document policy, not lived experience.",
    "Several operators sell both neutral colocation and managed-services / connectivity products from sister business units. The relevant question is per-building, not per-corporation.",
    "The carrier-neutral category does not include cloud providers' own datacenter campuses. Hyperscaler-owned regions are decidedly not neutral; they exist to host the cloud's own infrastructure.",
  ],
  methodologyNotes: [
    "Radar's reviewed facility rows record only operator name, country, metro, and the source URL — not commercial fees, capacity figures, or non-public tenant lists. Commercial detail belongs in TeleGeography reporting, not the public surface.",
    "Carrier-neutral classification is asserted only when the operator's own facility page describes the building as carrier-neutral or open-access, or when PeeringDB's record corroborates dense multi-network presence.",
  ],
  relatedEntityRefs: [
    "city:frankfurt",
    "city:amsterdam",
    "city:london",
    "city:ashburn",
    "city:singapore",
    "country:germany",
    "country:netherlands",
    "country:united-kingdom",
    "country:united-states",
    "country:singapore",
  ],
  relatedDatasetSlugs: ["internet-exchange-hubs"],
  relatedIndicatorSlugs: ["carrier-neutrality", "datacenter-concentration"],
  relatedRankingSlugs: ["cloud-infrastructure-hubs", "most-connected-cities"],
  relatedMapPaths: ["/maps/datacenters", "/maps/ixps"],
  relatedMediaIds: ["carrier-neutral-facility-model", "interconnection-topology"],
  sources: [
    {
      sourceId: "peeringdb",
      url: "https://www.peeringdb.com/",
      checkedAt: CHECKED_AT,
      note: "Per-facility records: operator, address, present networks, IX nodes.",
    },
    {
      sourceId: "telegeography",
      url: "https://www.telegeography.com/",
      checkedAt: CHECKED_AT,
      note: "Colocation-market reporting; operator and metro analysis.",
    },
    {
      sourceId: "aws-regions",
      url: "https://aws.amazon.com/about-aws/global-infrastructure/regions_az/",
      checkedAt: CHECKED_AT,
      note: "AWS Direct Connect locations — most are inside carrier-neutral buildings.",
    },
  ],
};
