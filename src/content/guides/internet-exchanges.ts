import type { Guide } from "@/entities";

const CHECKED_AT = "2026-05-20";

export const INTERNET_EXCHANGES_GUIDE: Guide = {
  slug: "internet-exchanges",
  title: "Internet Exchange Points",
  dek:
    "What an Internet Exchange Point is, how the economics work, and why a handful of IXPs anchor most of the world's network traffic.",
  publishedAt: "2026-05-20",
  lastUpdated: "2026-05-20",
  definition:
    "An Internet Exchange Point (IXP) is a Layer-2 switching fabric, hosted in one or more colocation facilities, where independent networks meet to exchange traffic directly via BGP peering — bypassing transit providers. PeeringDB is the authoritative public registry of IXPs and their member networks.",
  keyTakeaways: [
    "IXPs lower the cost of moving traffic between two networks that have substantial bilateral exchange.",
    "An IXP itself moves no traffic; it provides the fabric on which member networks peer with each other.",
    "Network membership compounds: every additional well-connected network at an IXP increases the IXP's pull on the next prospective member.",
    "PeeringDB is the authoritative public registry; a small set of IXPs (DE-CIX Frankfurt, AMS-IX, LINX, France-IX, Equinix Internet Exchange Ashburn) anchor most global traffic.",
    "Geography matters at founding; past a certain scale, network membership matters more than physical location.",
  ],
  summary: [
    { label: "Type", value: "Internet Exchange Point (IXP)" },
    { label: "Technical model", value: "Layer-2 switching fabric with BGP peering" },
    { label: "Economic purpose", value: "Settlement-free peering, transit avoidance" },
    {
      label: "Authoritative source",
      value: "PeeringDB (tier-2)",
    },
    {
      label: "Industry framing",
      value: "Network-effects market with high path dependence",
    },
    {
      label: "Canonical examples",
      value: "DE-CIX Frankfurt, AMS-IX, LINX, Equinix IX Ashburn",
    },
  ],
  sections: [
    {
      id: "technical-definition",
      heading: "Technical definition",
      paragraphs: [
        "An IXP is, at the physical layer, a high-density Ethernet switch (or distributed switch fabric across multiple facilities) into which member networks plug a port — typically 1 Gbps, 10 Gbps, 100 Gbps, or 400 Gbps. Each member is an autonomous system (AS) with a globally registered AS number; the IXP is a single Layer-2 broadcast domain across which members establish BGP sessions with each other.",
        "The IXP operator does not route, forward, or inspect traffic. Traffic moves only between members that have explicitly agreed to peer with each other.",
      ],
    },
    {
      id: "economics",
      heading: "Settlement-free peering vs transit",
      paragraphs: [
        "The economic point of an IXP is to let two networks exchange traffic without paying a third network — a transit provider — to forward that traffic on their behalf. The arrangement is called settlement-free peering when the two networks exchange traffic at parity without payment.",
        "For a content network — a streaming service, a search engine, a CDN — peering with eyeball ISPs at IXPs is often dramatically cheaper than paying transit to deliver the same bytes to the same end users. For an eyeball ISP, peering with content networks is often dramatically cheaper than buying transit to fetch the same content for its subscribers. The combination explains why the largest IXPs accumulate both populations.",
      ],
    },
    {
      id: "network-effects",
      heading: "Network effects, not geography",
      paragraphs: [
        "An IXP's importance is a function of how many networks of value to *other* networks are present. This is a network-effects market in the most literal sense, and like all network-effects markets it has accumulating, path-dependent dynamics.",
        "Geography matters at founding — DE-CIX Frankfurt would not have grown to scale if Frankfurt were not already a colocation centre — but past a certain size, geography stops being decisive. An operator joining DE-CIX Frankfurt today compares it against the membership already present, not against the metro's coordinates.",
      ],
    },
    {
      id: "reading-peeringdb",
      heading: "How to evaluate an IXP",
      paragraphs: [
        "PeeringDB records, for each IXP, the connected-network count, the facilities the fabric spans, the network-specific peering policies, and the operator's contact information. Reading PeeringDB carefully — not just the headline network count, but the *categories* of network present (content, ISP, enterprise, cloud) — is the basic discipline of IXP evaluation.",
        "A high count concentrated in a single national ecosystem is structurally different from a similar count drawn from networks worldwide. A regional IXP can dominate its region without being globally important; a global IXP can have a comparable count drawn from a far broader membership base.",
      ],
    },
    {
      id: "examples",
      heading: "Examples worth studying",
      paragraphs: [
        "DE-CIX Frankfurt, AMS-IX (Amsterdam), LINX (London) and France-IX (Paris) anchor the FLAP cluster in Europe, all with very high connected-network counts per PeeringDB. The Equinix Internet Exchange family — particularly the Ashburn / Washington DC fabric — anchors the equivalent role on the US east coast.",
        "Each of these grew through the same network-effects loop. None of them is replicable in a new metro by simply standing up a new switch fabric; the substrate is the assembled membership, which took decades to assemble.",
      ],
    },
  ],
  strategicImportance: [
    "For any network operator, presence at the right IXP defines the routing geography of their traffic. For a national ISP, the decision is largely fixed by geography. For a global content network, it is a deliberate footprint choice — and one of the few infrastructure decisions in which getting it wrong has immediate operational consequences (in extra transit cost) rather than long-tail ones.",
    "For policy-makers and researchers, the IXP map is the practical map of how the internet is wired. A country without a healthy IXP ecosystem typically pays in transit cost for what it could otherwise solve domestically.",
  ],
  relatedEntityRefs: ["ixp:de-cix-frankfurt"],
  sources: [
    {
      sourceId: "peeringdb",
      url: "https://www.peeringdb.com/",
      checkedAt: CHECKED_AT,
      note: "Authoritative IXP registry, member counts, facility listings.",
    },
    {
      sourceId: "de-cix",
      url: "https://www.de-cix.net/en/locations/frankfurt",
      checkedAt: CHECKED_AT,
      note: "DE-CIX Frankfurt operator page; statistics and policy.",
    },
    {
      sourceId: "telegeography",
      url: "https://www.telegeography.com/",
      checkedAt: CHECKED_AT,
      note: "European backbone geography and FLAP cluster framing.",
    },
    {
      sourceId: "ripe-ncc",
      url: "https://www.ripe.net/",
      checkedAt: CHECKED_AT,
      note: "AS / BGP fundamentals, RIPE Atlas measurement methodology.",
    },
  ],
};
