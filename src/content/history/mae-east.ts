import type { HistoryPage } from "@/entities";

const CHECKED_AT = "2026-05-25";

export const MAE_EAST_HISTORY: HistoryPage = {
  slug: "mae-east",
  title: "MAE-East",
  dek:
    "How a small commercial Ethernet network in Northern Virginia became the seed of the modern US east-coast interconnection cluster.",
  publishedAt: "2026-05-25",
  lastUpdated: "2026-05-25",
  period: "1992 — early 2000s",
  quickAnswer:
    "MAE-East was a Metropolitan Area Ethernet network in Northern Virginia, established in 1992 as one of the first commercial internet exchanges following the privatisation of the NSFNET backbone. Per IEEE and Internet Hall of Fame reporting, MAE-East and the parallel MAE-West (San Jose) became the principal US Network Access Points (NAPs) chartered by the NSF, anchoring the early commercial peering economy and seeding what is now the Ashburn / Northern Virginia interconnection cluster.",
  context: [
    "Through the 1980s, the NSFNET backbone connected US research and education networks under federal stewardship. Commercial internet traffic was nominally not permitted on NSFNET, which created practical pressure on the early commercial ISPs (UUNET, PSINet, ANS, Sprint, MCI) to interconnect with each other directly.",
    "MFS Communications (later acquired by WorldCom) ran a metropolitan Ethernet service in Washington, DC, and in 1992 began letting ISPs exchange traffic at one of its facilities in Northern Virginia. The arrangement was informal at first — a small switch in a building, with cross connects between participating carriers — but it grew rapidly. The name \"MAE-East\" comes from the Metropolitan Area Ethernet brand the facility was sold under.",
  ],
  whyItMattered: [
    "When the NSF decommissioned the NSFNET backbone in 1995, it formalised the transition to a commercial internet by chartering a small set of Network Access Points (NAPs) where the new commercial backbones would interconnect. The NSF-chartered NAPs were MAE-East (Northern Virginia, MFS), MAE-West (San Jose, MFS/Pacific Bell), the Chicago NAP (Ameritech / Bellcore), and the New York NAP (Sprint).",
    "MAE-East rapidly became the dominant US east-coast exchange. By the late 1990s, a significant share of US-to-Europe peering traffic transited it — the technical limitations of a shared Ethernet at the scale traffic eventually reached are part of the operational folklore of the era.",
    "More structurally important than the technology was the building. MAE-East seeded the carrier-neutral colocation cluster that became the Ashburn / Northern Virginia metro. Networks that joined the fabric stayed in the area when newer, more scalable exchanges (Equinix Internet Exchange Ashburn, regional ATM/Frame-Relay fabrics) replaced the original Ethernet-based MAE-East.",
  ],
  evolution: [
    "MFS Communications was acquired by WorldCom in 1996; WorldCom's later collapse and bankruptcy in 2002 left the MAE-East asset under successor ownership. The operational fabric was migrated off shared Ethernet onto more scalable switch technology through the late 1990s.",
    "By the mid-2000s, commercial interconnection in Northern Virginia had shifted to dedicated carrier-neutral exchange fabrics — particularly the Equinix Internet Exchange Ashburn — and to private network interconnects between major networks inside the same carrier-neutral facilities. MAE-East as a distinct exchange identity faded; the metro's role as the principal US east-coast interconnection cluster did not.",
    "The Ashburn cluster's current density (hyperscaler cloud regions, dense carrier-neutral colocation, transatlantic-cable backhaul corridor) is, in network-effects terms, the long tail of the 1992 decision to exchange traffic in a building in McLean, Virginia.",
  ],
  geographicImportance: [
    "MAE-East and the surrounding MFS facilities anchored what became Loudoun County, Virginia (Ashburn / Sterling / Reston) as the dominant US east-coast colocation metro. Trans-atlantic cables landing at Virginia Beach backhaul inland through this corridor; the same corridor terminates AWS us-east-1, Google Cloud us-east4, and Microsoft Azure East US per the providers' own published directories.",
  ],
  timeline: [
    {
      year: "1992",
      title: "MFS launches MAE-East in Northern Virginia",
      summary:
        "MFS Communications begins letting commercial ISPs exchange traffic over a metropolitan Ethernet at one of its Northern Virginia facilities, originally as part of its MFS Datanet metropolitan-Ethernet service.",
      sources: [
        {
          sourceId: "internet-hall-of-fame",
          url: "https://www.internethalloffame.org/",
          checkedAt: CHECKED_AT,
          note: "Internet Hall of Fame coverage of the early commercial NAPs.",
        },
      ],
      confidence: "high",
    },
    {
      year: "1995",
      title: "NSFNET decommissioning; MAE-East chartered as an NSF NAP",
      summary:
        "The NSF decommissions the NSFNET backbone and formalises a small set of Network Access Points (NAPs) for commercial interconnection. MAE-East is among the chartered NAPs alongside MAE-West, the Chicago NAP, and the New York NAP.",
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
      year: "1996",
      title: "WorldCom acquires MFS",
      summary:
        "WorldCom acquires MFS Communications, bringing MAE-East under WorldCom's ownership and beginning a sustained period of consolidation in US commercial interconnection.",
      sources: [
        {
          sourceId: "fcc",
          url: "https://www.fcc.gov/general/mergers-acquisitions",
          checkedAt: CHECKED_AT,
          note: "FCC merger filings record the MFS / WorldCom transaction.",
        },
      ],
      confidence: "high",
    },
    {
      year: "1998",
      title: "Equinix opens its first Ashburn / Sterling, VA facility",
      summary:
        "Equinix opens its first US east-coast colocation facility in Loudoun County, Virginia, providing a carrier-neutral alternative to MAE-East and accelerating the Ashburn metro's emergence as the dominant east-coast cluster.",
      sources: [
        {
          sourceId: "telegeography",
          url: "https://www.telegeography.com/",
          checkedAt: CHECKED_AT,
          note: "TeleGeography historical reporting on the Ashburn cluster's emergence.",
        },
      ],
      confidence: "medium",
      caveats: [
        "The exact opening date of the first Equinix IBX in Loudoun County is recorded variously as 1998 or 1999 across secondary sources; year-precision is preserved here.",
      ],
    },
    {
      year: "2002",
      title: "WorldCom bankruptcy; MAE-East under successor ownership",
      summary:
        "WorldCom files for bankruptcy. The MAE-East asset passes through successor entities (MCI, then Verizon Business) over subsequent years; the exchange identity gradually fades as commercial peering shifts to Equinix's Ashburn fabric and to private network interconnects inside carrier-neutral facilities.",
      sources: [
        {
          sourceId: "fcc",
          url: "https://www.fcc.gov/general/mergers-acquisitions",
          checkedAt: CHECKED_AT,
          note: "FCC filings document the post-bankruptcy ownership transitions.",
        },
      ],
      confidence: "high",
    },
  ],
  relatedEntityRefs: [
    "city:ashburn",
    "country:united-states",
    "ixp:equinix-internet-exchange-ashburn",
  ],
  relatedDatasetSlugs: ["internet-exchange-hubs"],
  relatedGuideSlugs: ["internet-exchanges", "interconnection", "datacenter-hubs"],
  relatedMapPaths: ["/maps/ixps", "/maps/datacenters"],
  relatedMediaIds: ["interconnection-topology"],
  methodologyNotes: [
    "MAE-East's chartering as an NSF NAP and the NSFNET transition are documented in NSF historical material and Internet Hall of Fame coverage; these are the principal primary references.",
    "Specific opening dates and ownership-transition dates are recorded at year-precision when secondary sources disagree on the exact day or month.",
    "Capacity figures and per-network traffic levels from the MAE-East era are intentionally not stored; the underlying record is operator folklore rather than published measurement.",
  ],
  caveats: [
    "Several MAE-East era technical claims (peak traffic at congestion, exact shared-Ethernet limits) are widely repeated but not consistently sourced; the page records the structural history, not the technical anecdotes.",
    "The Ashburn / Northern Virginia cluster's current scale post-dates the original MAE-East fabric by decades. The historical role is foundational but not directly proportional to current capacity.",
  ],
  confidence: "high",
  sources: [
    {
      sourceId: "internet-hall-of-fame",
      url: "https://www.internethalloffame.org/",
      checkedAt: CHECKED_AT,
      note: "Coverage of the early commercial NAPs and the NSFNET transition.",
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
      note: "Historical reporting on the Ashburn / Northern Virginia cluster emergence.",
    },
    {
      sourceId: "fcc",
      url: "https://www.fcc.gov/general/mergers-acquisitions",
      checkedAt: CHECKED_AT,
      note: "Merger and bankruptcy filings for MFS / WorldCom / MCI / Verizon Business.",
    },
  ],
};
