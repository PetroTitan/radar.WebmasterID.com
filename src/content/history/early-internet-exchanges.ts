import type { HistoryPage } from "@/entities";

const CHECKED_AT = "2026-05-25";

export const EARLY_INTERNET_EXCHANGES_HISTORY: HistoryPage = {
  slug: "early-internet-exchanges",
  title: "Early Internet Exchanges",
  dek:
    "How the first commercial Internet Exchange Points emerged in the early 1990s, and why the original network-effects pattern still governs every IXP that came after.",
  publishedAt: "2026-05-25",
  lastUpdated: "2026-05-25",
  period: "1992 — early 2000s",
  quickAnswer:
    "Commercial Internet Exchange Points emerged in the early 1990s as the NSFNET backbone transitioned to a commercial internet. The chartering of MAE-East (1992), MAE-West, the Chicago NAP, and the New York NAP by the U.S. National Science Foundation, paralleled by community-led exchanges in Europe (LINX in 1994, AMS-IX in 1994, DE-CIX in 1995), seeded the network-effects market that still governs the IXP map: every additional well-connected network at an exchange increases the exchange's pull on the next prospective member.",
  context: [
    "Through the 1980s, the NSFNET backbone connected US research networks under federal stewardship; commercial traffic was nominally not permitted. When the NSF began the decade-long process of decommissioning NSFNET, the commercial ISPs (UUNET, PSINet, ANS, Sprint, MCI, BT, Tele2, KPN, Deutsche Telekom and others) needed somewhere to exchange traffic. The early commercial IXPs answered that question.",
    "Three regional patterns emerged almost in parallel. In the United States, NSF-chartered NAPs (MAE-East, MAE-West, Chicago, New York) anchored the transition. In Europe, member-owned non-profit exchanges (LINX in London, AMS-IX in Amsterdam, DE-CIX in Frankfurt) emerged from the local research and ISP communities. In Asia, commercial exchanges followed somewhat later, with operator-led fabrics in Japan and Singapore.",
  ],
  whyItMattered: [
    "The network-effects logic of an IXP is established in the first few years of its operation. A new exchange that fails to attract the major regional networks does not subsequently recover; an exchange that does attract them compounds for decades. The 1990s exchanges that did attract their regional networks (DE-CIX, AMS-IX, LINX, the Equinix Internet Exchange family successors to MAE-East) anchor the global interconnection map today.",
    "More structurally important than the chartering details was the choice of building. Each early exchange seeded a carrier-neutral colocation cluster around itself — the buildings the exchange's switches lived in attracted facilities operators, transit providers, content networks, and (much later) cloud on-ramps. The exchange's network density and the metro's colocation density compounded together.",
    "The same pattern explains why the IXP map today is geographically conservative. New exchanges in metros without an established colocation substrate struggle; new exchanges in metros that already have one (FLAP, Ashburn) sometimes succeed because the substrate is already in place.",
  ],
  evolution: [
    "Through the late 1990s, the original shared-Ethernet fabrics gave way to dedicated switch hardware capable of higher port counts and per-port capacity. MAE-East's shared-Ethernet limits became operationally untenable at the traffic the commercial internet was reaching; commercial peering migrated onto dedicated fabrics inside the surrounding carrier-neutral facilities.",
    "Through the 2000s and 2010s, the IXP architecture standardised. A modern IXP is, technically, a Layer-2 switch fabric distributed across multiple colocation facilities in the same metro; the operator does not move or inspect traffic, only provides the shared switching. PeeringDB emerged as the authoritative public registry of which networks peer at which IXPs.",
    "The cloud era added a new layer on top. Cloud providers' on-ramp products (AWS Direct Connect, Google Cloud Interconnect, Microsoft Azure ExpressRoute) terminate in the same carrier-neutral facilities the IXPs live in; the result is that the metros that grew around the original exchanges (Frankfurt, London, Amsterdam, Ashburn) are now the metros that anchor hyperscaler cloud regions as well.",
  ],
  geographicImportance: [
    "The four FLAP cluster metros (Frankfurt, London, Amsterdam, Paris) and the US east-coast cluster around Ashburn / Northern Virginia are direct descendants of the early-1990s exchanges. Singapore, Tokyo, Hong Kong, and São Paulo emerged on the same network-effects pattern with different starting dates.",
  ],
  timeline: [
    {
      year: "1992",
      title: "MFS launches MAE-East in Northern Virginia",
      summary:
        "MFS Communications begins letting commercial ISPs exchange traffic over a metropolitan Ethernet at one of its Northern Virginia facilities, seeding what becomes the US east-coast interconnection cluster.",
      relatedEntityRefs: ["city:ashburn", "country:united-states"],
      sources: [
        {
          sourceId: "internet-hall-of-fame",
          url: "https://www.internethalloffame.org/",
          checkedAt: CHECKED_AT,
          note: "Coverage of the early commercial NAPs.",
        },
      ],
      confidence: "high",
    },
    {
      year: "1994",
      title: "LINX founded in London",
      summary:
        "The London Internet Exchange (LINX) is founded as a member-owned non-profit by the early British ISP community, anchoring the FLAP cluster's western node.",
      relatedEntityRefs: ["city:london", "country:united-kingdom", "ixp:linx-lon1"],
      sources: [
        {
          sourceId: "linx",
          url: "https://www.linx.net/about/our-exchanges/lon1/",
          checkedAt: CHECKED_AT,
          note: "Operator primary doc — LINX history and founding.",
        },
      ],
      confidence: "high",
    },
    {
      year: "1994",
      title: "AMS-IX founded in Amsterdam",
      summary:
        "The Amsterdam Internet Exchange (AMS-IX) is founded as a non-profit association by the Dutch academic and ISP community, anchoring the FLAP cluster's northern node.",
      relatedEntityRefs: ["city:amsterdam", "country:netherlands", "ixp:ams-ix"],
      sources: [
        {
          sourceId: "ams-ix",
          url: "https://www.ams-ix.net/ams",
          checkedAt: CHECKED_AT,
          note: "Operator primary doc — AMS-IX history and founding.",
        },
      ],
      confidence: "high",
    },
    {
      year: "1995",
      title: "DE-CIX founded in Frankfurt",
      summary:
        "Deutscher Commercial Internet Exchange (DE-CIX) is founded in Frankfurt to interconnect German ISPs without routing traffic through the United States; it goes on to become the eastern anchor of the FLAP cluster.",
      relatedEntityRefs: [
        "ixp:de-cix-frankfurt",
        "city:frankfurt",
        "country:germany",
      ],
      sources: [
        {
          sourceId: "de-cix",
          url: "https://www.de-cix.net/en/locations/frankfurt",
          checkedAt: CHECKED_AT,
          note: "Operator primary doc — DE-CIX Frankfurt history and founding.",
        },
      ],
      confidence: "high",
    },
    {
      year: "1995",
      title: "NSFNET decommissioning; NSF NAPs chartered",
      summary:
        "The NSF decommissions the NSFNET backbone and formalises a small set of Network Access Points (NAPs) for commercial interconnection: MAE-East, MAE-West, the Chicago NAP, and the New York NAP.",
      sources: [
        {
          sourceId: "nsf",
          url: "https://www.nsf.gov/about/history/nsf0050/internet/launching.htm",
          checkedAt: CHECKED_AT,
          note: "NSF historical overview of the NSFNET-to-commercial transition.",
        },
      ],
      confidence: "high",
    },
    {
      year: "1998",
      title: "Equinix opens its first Ashburn IBX",
      summary:
        "Equinix opens its first US east-coast carrier-neutral colocation facility in Loudoun County, Virginia, providing a scalable alternative to MAE-East and consolidating Ashburn's role as the US east-coast cluster.",
      relatedEntityRefs: ["city:ashburn", "country:united-states"],
      sources: [
        {
          sourceId: "telegeography",
          url: "https://www.telegeography.com/",
          checkedAt: CHECKED_AT,
          note: "TeleGeography historical reporting on the Ashburn cluster emergence.",
        },
      ],
      confidence: "medium",
      caveats: [
        "The exact opening date is recorded variously as 1998 or 1999 across secondary sources; year-precision is preserved.",
      ],
    },
    {
      year: "2004",
      title: "PeeringDB launches as a public IXP registry",
      summary:
        "PeeringDB launches as a public, community-maintained registry of IXP and network presence at exchanges and facilities, providing the canonical interface for evaluating peering counterparts.",
      sources: [
        {
          sourceId: "peeringdb",
          url: "https://www.peeringdb.com/",
          checkedAt: CHECKED_AT,
          note: "PeeringDB about page and operating-history coverage.",
        },
      ],
      confidence: "medium",
      caveats: [
        "PeeringDB's exact launch year is sometimes recorded as 2003; the registry's first public operation is generally dated to 2004.",
      ],
    },
  ],
  relatedEntityRefs: [
    "ixp:de-cix-frankfurt",
    "ixp:ams-ix",
    "ixp:linx-lon1",
    "ixp:equinix-internet-exchange-ashburn",
    "city:frankfurt",
    "city:amsterdam",
    "city:london",
    "city:ashburn",
    "country:germany",
    "country:netherlands",
    "country:united-kingdom",
    "country:united-states",
  ],
  relatedDatasetSlugs: ["internet-exchange-hubs"],
  relatedGuideSlugs: [
    "internet-exchanges",
    "interconnection",
    "carrier-neutrality",
    "datacenter-hubs",
  ],
  relatedMapPaths: ["/maps/ixps"],
  relatedMediaIds: ["interconnection-topology", "carrier-neutral-facility-model"],
  methodologyNotes: [
    "Founding dates are taken from operator primary docs where possible and corroborated against IEEE, Internet Hall of Fame, and TeleGeography reporting.",
    "The page records the network-effects pattern and the founding milestones but deliberately does not assign \"largest / first / biggest\" labels that the sources don't consistently support.",
  ],
  caveats: [
    "Founding dates for the European member-owned exchanges (LINX, AMS-IX, DE-CIX) are sometimes recorded with month-precision in operator material; the timeline preserves year-precision for consistency.",
    "Operator-led Asian exchanges (JPNAP, JPIX, BBIX) launched on a similar trajectory but on a slightly later timeline; they are not yet seeded in Radar's IXP entity registry.",
  ],
  confidence: "high",
  sources: [
    {
      sourceId: "internet-hall-of-fame",
      url: "https://www.internethalloffame.org/",
      checkedAt: CHECKED_AT,
      note: "Editorial reference for early-internet biographical and infrastructural history.",
    },
    {
      sourceId: "nsf",
      url: "https://www.nsf.gov/about/history/nsf0050/internet/launching.htm",
      checkedAt: CHECKED_AT,
      note: "NSF historical overview of the NSFNET-to-commercial transition.",
    },
    {
      sourceId: "telegeography",
      url: "https://www.telegeography.com/",
      checkedAt: CHECKED_AT,
      note: "Historical reporting on the FLAP cluster and the Ashburn cluster emergence.",
    },
    {
      sourceId: "de-cix",
      url: "https://www.de-cix.net/en/locations/frankfurt",
      checkedAt: CHECKED_AT,
      note: "DE-CIX founding and history.",
    },
    {
      sourceId: "ams-ix",
      url: "https://www.ams-ix.net/ams",
      checkedAt: CHECKED_AT,
      note: "AMS-IX founding and history.",
    },
    {
      sourceId: "linx",
      url: "https://www.linx.net/about/our-exchanges/lon1/",
      checkedAt: CHECKED_AT,
      note: "LINX founding and history.",
    },
    {
      sourceId: "peeringdb",
      url: "https://www.peeringdb.com/",
      checkedAt: CHECKED_AT,
      note: "PeeringDB launch and operating history.",
    },
  ],
};
