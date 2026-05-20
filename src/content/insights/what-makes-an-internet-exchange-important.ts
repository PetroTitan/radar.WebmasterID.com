import type { Insight } from "@/entities";

const CHECKED_AT = "2026-05-20";

export const WHAT_MAKES_AN_IXP_IMPORTANT: Insight = {
  slug: "what-makes-an-internet-exchange-important",
  title: "What makes an Internet Exchange important",
  dek:
    "Beyond the textbook definition: the structural and economic forces that turn one IXP into a global crossroads and another into a regional footnote.",
  publishedAt: "2026-05-20",
  lastUpdated: "2026-05-20",
  entityRefs: ["ixp:de-cix-frankfurt"],
  sections: [
    {
      id: "intro",
      paragraphs: [
        "An Internet Exchange Point — IXP for short — is, technically, a switch fabric in a colocation facility where networks plug in and exchange traffic with each other. There are, depending on which catalogue one trusts, somewhere between several hundred and a few thousand IXPs operating worldwide; PeeringDB records the active ones.",
        "Most of them are footnotes. A handful matter enormously. The difference between the two is not technical — the technology of an IXP is well-understood and widely deployed — but structural: the result of which networks plug into them, what those networks carry, and what they cost-save by doing so.",
      ],
    },
    {
      id: "technical-definition",
      heading: "The technical definition",
      paragraphs: [
        "An IXP is a Layer-2 broadcast domain, usually a high-density Ethernet switch, sometimes a distributed fabric across multiple facilities. Networks (autonomous systems, or ASes) connect to it with a port — 1G, 10G, 100G, 400G — and establish BGP peering sessions with other connected networks.",
        "An IXP itself does not move traffic between networks that have not agreed to peer; it simply provides the physical and addressing infrastructure that lets them. The peering policy, capacity choices, and willingness to peer are decisions of each member network, not the exchange operator.",
      ],
    },
    {
      id: "economics",
      heading: "Settlement-free peering versus transit",
      paragraphs: [
        "The economic point of an IXP is to let two networks exchange traffic without paying a third network (a transit provider) to forward that traffic on their behalf. The cost saving applies any time two networks at an IXP have substantial bilateral traffic.",
        "For a content network like a streaming service, peering with eyeball ISPs at IXPs is often dramatically cheaper than paying transit to deliver the same bytes to the same end users. For an eyeball ISP, peering with content networks is often dramatically cheaper than buying transit to fetch that content for its subscribers. The combination is why the largest IXPs accumulate both populations.",
      ],
    },
    {
      id: "network-effects",
      heading: "Network effects, not geography",
      paragraphs: [
        "An IXP's importance is a function of how many networks of value to *other* networks are present. This is a network-effects market in the most literal sense, and like all network-effects markets it has accumulating, path-dependent dynamics.",
        "Geography matters at the start — DE-CIX Frankfurt would not have grown into a major exchange if Frankfurt were not already a colocation centre — but past a certain scale, geography stops being decisive. DE-CIX Frankfurt is now the default European peering destination not because Frankfurt is the only good place to put one, but because the existing membership of DE-CIX Frankfurt is what every prospective new member is comparing against.",
      ],
    },
    {
      id: "reading-peeringdb",
      heading: "Reading PeeringDB",
      paragraphs: [
        "PeeringDB is the community-maintained registry of networks, IXPs and interconnection facilities. For any IXP it records (among other fields) the connected-network count, the facilities the fabric spans, and the network-specific peering policies.",
        "The connected-network count is the headline figure but should be read with care. A high count concentrated in a single national ecosystem is different from a similar count drawn from networks worldwide. Reading the count alongside the network *categories* present (content, ISP, enterprise, cloud) is more informative than reading the count in isolation.",
      ],
    },
    {
      id: "examples",
      heading: "Examples worth studying",
      paragraphs: [
        "DE-CIX Frankfurt, AMS-IX (Amsterdam), LINX (London) and France-IX (Paris) anchor the FLAP cluster in Europe, all of them with very high connected-network counts in PeeringDB. The Equinix Internet Exchange family — particularly the Ashburn / Washington DC fabric — anchors the equivalent role on the US east coast.",
        "Each of these grew through the same network-effects loop. None of them is replicable in a new metro by simply standing up a new switch fabric; the substrate is the assembled membership, which took decades to assemble.",
      ],
    },
  ],
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
      note: "DE-CIX Frankfurt operator page, member statistics.",
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
