import type { Guide } from "@/entities";

const CHECKED_AT = "2026-05-22";

export const INTERCONNECTION_GUIDE: Guide = {
  slug: "interconnection",
  title: "Interconnection",
  dek:
    "What \"interconnection\" actually means in infrastructure terms — peering, transit, private network interconnects, and the bilateral economics that decide which networks meet where.",
  publishedAt: "2026-05-22",
  lastUpdated: "2026-05-22",
  definition:
    "Interconnection is the set of arrangements through which independent networks exchange traffic with each other — public peering at an Internet Exchange Point, private network interconnects between two networks inside a colocation facility, and paid transit from an upstream provider. The choice between these arrangements is governed by network economics, not by any single technical standard.",
  keyTakeaways: [
    "Interconnection refers to *arrangements between networks*, not a specific technology. The same fibre can carry transit, public peering, or private interconnects depending on who agreed to what.",
    "Public peering at an IXP, private network interconnects (PNIs), and paid transit form the three main interconnection modes. Most operators use a mix.",
    "Cross connects inside a carrier-neutral facility are the physical substrate for private interconnects. The neutrality of the building is what lets every network reach every other network without an operator-imposed tax.",
    "Interconnection decisions are bilateral. A request from network A to peer with network B is accepted or refused on B's published peering policy, which usually documents traffic ratios, geographic coverage, and operational requirements.",
    "Cloud providers expose their own interconnection products — AWS Direct Connect, Google Cloud Interconnect, Azure ExpressRoute — that are private interconnects with a managed termination on the provider side.",
  ],
  summary: [
    { label: "Type", value: "Network-to-network exchange arrangements" },
    {
      label: "Principal modes",
      value: "Public peering, private interconnects, transit",
    },
    {
      label: "Physical substrate",
      value: "Cross connects inside carrier-neutral facilities",
    },
    {
      label: "Authoritative source",
      value: "PeeringDB peering policies and facility records",
    },
    {
      label: "Decision basis",
      value: "Bilateral, governed by published peering policy",
    },
    {
      label: "Cloud-provider variants",
      value: "AWS Direct Connect, GCP Interconnect, Azure ExpressRoute",
    },
  ],
  sections: [
    {
      id: "what-interconnection-means",
      heading: "What interconnection means",
      paragraphs: [
        "Interconnection is the catch-all term for arrangements through which two networks exchange traffic with each other. It is a category, not a technology. The same physical fibre can carry transit (the buyer pays the seller), public peering (both sides exchange traffic on an IXP fabric with no payment), or private interconnects (both sides agree to a direct connection inside a building) — and which arrangement applies depends on what the networks signed.",
        "The decisions that matter most in interconnection are not about wires; they are about *which networks agreed to meet, where, and on what terms*. The wires are commodity. The relationships are scarce.",
      ],
    },
    {
      id: "modes",
      heading: "Public peering, private interconnects, transit",
      paragraphs: [
        "Public peering happens at an Internet Exchange Point. Two networks plug into the same IXP fabric and establish a BGP session across the IXP's Layer-2 switch. Traffic exchanged across the fabric does not pay either the IXP operator or any other network. PeeringDB is the canonical public registry of which networks peer at which IXPs.",
        "A private network interconnect (PNI) is a direct fibre run inside the same physical facility, terminated on a port on each network's equipment. It carries only the two networks' traffic, supports higher capacity than a typical IXP session, and is configured under a bilateral private agreement.",
        "Transit is paid: network A buys the right to send traffic to (and receive traffic from) the whole internet through network B. Transit is what fills the routing-table gaps that peering and PNIs do not cover — but for any pair of networks with substantial bilateral traffic, peering or a PNI is usually cheaper than transit on the same path.",
      ],
    },
    {
      id: "carrier-neutral-substrate",
      heading: "The carrier-neutral facility substrate",
      paragraphs: [
        "Private interconnects require both networks to be present in the same physical building. The buildings that make this practical at scale are carrier-neutral colocation facilities — buildings whose operator sells space, power, and cooling, but does not itself sell connectivity. In such a building, every network's port can reach every other network's port via a cross connect, without the building's operator interposing itself.",
        "This neutrality is what lets a metro like Frankfurt or Ashburn become a meeting place for hundreds of networks. The substrate is the building's neutrality combined with its accumulated tenant list.",
      ],
    },
    {
      id: "peering-policy",
      heading: "Bilateral economics and peering policy",
      paragraphs: [
        "Every serious peering-active network publishes a peering policy, usually summarised on PeeringDB. Common policy elements include the traffic ratio at which peering is acceptable (\"balanced\" vs \"selective\"), the geographic coverage the peering counterparty must support, the minimum port speed, and the technical and operational requirements (looking-glass access, 24×7 NOC).",
        "A new network applying to peer with a major content network is evaluated against that policy. \"Open\" policies admit anyone meeting basic operational requirements; \"selective\" or \"restrictive\" policies reserve peering for counterparties with comparable traffic and infrastructure. This is the bilateral, contractual layer that determines actual interconnection outcomes.",
      ],
    },
    {
      id: "cloud-interconnects",
      heading: "Cloud-provider interconnects",
      paragraphs: [
        "Each major cloud provider exposes a managed interconnection product: AWS Direct Connect, Google Cloud Interconnect, and Microsoft Azure ExpressRoute. These are, in network terms, private interconnects with the cloud provider as the counterparty — but with a managed termination, standardised port options, and standardised billing on the cloud side.",
        "From an enterprise customer's perspective, the cloud interconnect is the on-ramp from their on-premises footprint into the cloud's backbone. From an infrastructure perspective, it is one more network agreeing to peer with the customer's network, in one or more facilities the cloud has designated as cloud-on-ramp sites — which usually live inside the same carrier-neutral metros that anchor public peering.",
      ],
    },
  ],
  strategicImportance: [
    "For any network operator running material traffic volumes, interconnection is the cost lever that compounds across years. A network that places itself in the right metros and establishes the right private interconnects routes its traffic at lower per-byte cost than a network that buys transit for the same flows.",
    "For policy makers and infrastructure researchers, the interconnection map is the practical map of how the internet is wired. A national ecosystem with healthy interconnection — both a tier-1 IXP and a population of carrier-neutral colocation — keeps traffic domestic and protects against foreign-routing dependencies.",
  ],
  geographicImportance: [
    {
      entityRef: "city:frankfurt",
      prose:
        "Frankfurt anchors European interconnection: DE-CIX Frankfurt is the largest IXP by connected-network count globally, surrounded by a deep population of carrier-neutral facilities and an unusually dense terrestrial fibre topology into the rest of the continent.",
    },
    {
      entityRef: "city:ashburn",
      prose:
        "Ashburn / Northern Virginia is the US east-coast meeting point: hyperscaler cloud regions, the Equinix Internet Exchange Ashburn fabric, and a dense colocation cluster within a few mile-radius metro footprint.",
    },
    {
      entityRef: "city:singapore",
      prose:
        "Singapore concentrates Southeast Asian interconnection in a single small geography — submarine cable landings, cloud on-ramps, and the regional IXP all reachable within the same metro.",
    },
    {
      entityRef: "ixp:de-cix-frankfurt",
      prose:
        "DE-CIX Frankfurt is the canonical example of a network-effects IXP: connected-network density compounded across two decades of growth, with a Layer-2 fabric spanning multiple Frankfurt-metro facilities.",
    },
  ],
  caveats: [
    "PeeringDB records what networks publish about themselves. A peering policy that says \"open\" still requires the counterparty to agree in practice; published policy and actual peering outcomes can diverge.",
    "Traffic ratio language (\"balanced\", \"mostly inbound\") is industry shorthand without a strict numeric definition. Comparing the ratios of two networks requires reading both networks' policies in context.",
    "Cloud-provider interconnect locations are advertised in the cloud's own documentation; the underlying facility identity is sometimes not disclosed to customers, only the cloud's internal naming.",
  ],
  methodologyNotes: [
    "Interconnection facts that can be made comparable across networks come from PeeringDB and the cloud providers' own documentation. Operator-published peering policies are normalised to PeeringDB's published-policy field.",
    "Capacity figures (port speed, total interconnection capacity per network) are not stored on identity records; capacity is volatile and belongs on dated InfrastructureMetric observations elsewhere.",
  ],
  relatedEntityRefs: [
    "ixp:de-cix-frankfurt",
    "city:frankfurt",
    "city:ashburn",
    "city:singapore",
    "country:germany",
    "country:united-states",
    "country:singapore",
  ],
  relatedDatasetSlugs: ["internet-exchange-hubs", "global-cloud-regions"],
  relatedIndicatorSlugs: ["ixp-density", "carrier-neutrality"],
  relatedRankingSlugs: ["most-connected-cities"],
  relatedMapPaths: ["/maps/ixps", "/maps/datacenters"],
  relatedMediaIds: ["interconnection-topology", "carrier-neutral-facility-model"],
  sources: [
    {
      sourceId: "peeringdb",
      url: "https://www.peeringdb.com/",
      checkedAt: CHECKED_AT,
      note: "Authoritative public registry of peering policies, IXPs, and facility-by-facility network presence.",
    },
    {
      sourceId: "ripe-ncc",
      url: "https://www.ripe.net/",
      checkedAt: CHECKED_AT,
      note: "BGP and AS-routing fundamentals; RIPE Atlas measurement programme.",
    },
    {
      sourceId: "de-cix",
      url: "https://www.de-cix.net/en/locations/frankfurt",
      checkedAt: CHECKED_AT,
      note: "DE-CIX Frankfurt operator pages — policy and operational practice.",
    },
    {
      sourceId: "aws-regions",
      url: "https://aws.amazon.com/about-aws/global-infrastructure/regions_az/",
      checkedAt: CHECKED_AT,
      note: "AWS Direct Connect locations published alongside region directory.",
    },
    {
      sourceId: "telegeography",
      url: "https://www.telegeography.com/",
      checkedAt: CHECKED_AT,
      note: "Carrier and interconnection market reporting.",
    },
  ],
};
