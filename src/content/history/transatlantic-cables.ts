import type { HistoryPage } from "@/entities";

const CHECKED_AT = "2026-05-25";

export const TRANSATLANTIC_CABLES_HISTORY: HistoryPage = {
  slug: "transatlantic-cables",
  title: "Transatlantic Cables",
  dek:
    "How subsea fibre between the United States and Europe evolved from telco-consortium systems in the late 1980s to cloud-funded high-capacity cables in the 2010s, and what the corridor looks like today.",
  publishedAt: "2026-05-25",
  lastUpdated: "2026-05-25",
  period: "1988 — present",
  quickAnswer:
    "Transatlantic subsea cables are the load-bearing element of intercontinental connectivity between the United States and Europe. Per TeleGeography's published Submarine Cable Map, three structural eras define the corridor: the telco-consortium era (TAT-8 in 1988 through TAT-14 in 2001), the consolidation period of the mid-2000s, and the cloud-funded era from the mid-2010s onward in which Microsoft, Meta, Google, and Amazon became consortium members or sole owners on a growing share of new systems.",
  context: [
    "Before fibre, transatlantic capacity ran over coaxial submarine cables (the TAT-1 through TAT-7 series, 1956–1983) and over geostationary satellites. The 1988 commissioning of TAT-8, the first transatlantic fibre system, was the inflection point — fibre's per-channel capacity was so much higher than coax that the entire cost structure of long-haul capacity shifted within a few years.",
    "Through the 1990s the consortium model dominated: each system was funded by a coalition of national telecom incumbents that pooled capital and divided ownership shares. TAT-9, TAT-10, TAT-11, TAT-12/13 and TAT-14 (TeleGeography's TAT cable series naming) anchored the corridor through this period. AT&T, BT, France Telecom, Deutsche Telekom, Sprint, MCI, KDD, and the major European PTTs were the recurring consortium members.",
  ],
  whyItMattered: [
    "Transatlantic cables carry the great majority of US-to-Europe internet traffic, and the geographic shape of that corridor determines the routing geography of an enormous share of the global internet. The landing-point geography — Virginia Beach and other Mid-Atlantic stations on the US side, Cornwall (Bude, Whitesand Bay) and Bournemouth on the UK side, plus French and Iberian landings — defines which inland metros (Ashburn, London, Paris, Frankfurt, Marseille) can backhaul transatlantic traffic.",
    "The shift to cloud-funded cables from the mid-2010s changed the consortium model. Microsoft, Meta, Google, and Amazon became major consortium members or sole owners on new systems, partly to lock in capacity for their own backbones and partly because the consortium model itself had become less suited to the much higher capacity these operators required. The 2018 MAREA cable (Microsoft / Meta / Telxius) is one canonical example of the cloud-funded era.",
    "Corridor concentration remains a structural concern. Most transatlantic cables follow broadly similar Great Circle routes between Mid-Atlantic US landings and Western European landings; a sustained outage in a narrow geography (a particular Mid-Atlantic landing corridor, a particular European landing zone) affects multiple cables simultaneously.",
  ],
  evolution: [
    "1988–2001: The TAT fibre series (TAT-8 through TAT-14) anchors the corridor under the consortium model. Per-cable design capacity rises from 280 Mbps on TAT-8 to the multi-hundred-Gbps range on TAT-14 by the early 2000s.",
    "2000s: The dot-com bubble's collapse leaves the long-haul capacity market with a sustained capacity surplus; some planned systems are cancelled, others operate at low utilisation for years. Consolidation reshapes carrier ownership.",
    "Mid-2010s onward: Cloud providers begin funding their own transatlantic cables. MAREA (Microsoft / Meta / Telxius, RFS 2018), Grace Hopper (Google, RFS 2022), Amitié (Meta + consortium, RFS 2023), Dunant (Google, RFS 2021) — design capacities rise into hundreds of Tbps per system. The consortium model continues for some new systems but is no longer dominant.",
    "Today: The corridor is dense and diverse on the systems-count axis, but concentrated in a small number of landing geographies. Per TeleGeography reporting, planning decisions for new transatlantic systems explicitly account for corridor diversity (avoiding existing landing clusters where possible).",
  ],
  geographicImportance: [
    "The US east coast end of the corridor is anchored on Virginia Beach (with inland backhaul to Ashburn / Northern Virginia) and on the Mid-Atlantic landing stations further north. The European end is anchored on Cornwall (Bude / Whitesand Bay), Bournemouth, and adjacent UK landings, with Iberian landings (Bilbao, Sopelana) becoming increasingly significant in the cloud-funded era.",
  ],
  timeline: [
    {
      year: "1988",
      title: "TAT-8 enters service",
      summary:
        "TAT-8, the first transatlantic fibre system, enters service. Per TeleGeography reporting, it is funded by a 27-operator consortium and lands at Tuckerton, NJ (US), Widemouth Bay (UK), and Penmarch (France).",
      relatedEntityRefs: ["country:united-states", "country:united-kingdom"],
      sources: [
        {
          sourceId: "telegeography",
          url: "https://www.telegeography.com/",
          checkedAt: CHECKED_AT,
          note: "Historical reporting on the TAT cable series.",
        },
      ],
      confidence: "high",
    },
    {
      year: "2001",
      title: "TAT-14 enters service",
      summary:
        "TAT-14 enters service as a ring system jointly funded by a 50+ operator consortium, with US landings at Manasquan and Tuckerton and European landings in the UK, France, the Netherlands, Germany, and Denmark.",
      relatedEntityRefs: [
        "country:united-states",
        "country:united-kingdom",
        "country:netherlands",
        "country:germany",
      ],
      relatedCableSlugs: ["tat-14"],
      sources: [
        {
          sourceId: "telegeography",
          url: "https://www.submarinecablemap.com/",
          checkedAt: CHECKED_AT,
          note: "TAT-14 cable system page on the TeleGeography Submarine Cable Map.",
        },
      ],
      confidence: "high",
    },
    {
      year: "2018",
      title: "MAREA enters service",
      summary:
        "MAREA, jointly funded by Microsoft, Meta (then Facebook), and Telxius, enters service between Virginia Beach (US) and Bilbao (Spain). The consortium's announced design capacity is 200 Tbps.",
      relatedEntityRefs: ["country:united-states", "city:ashburn"],
      relatedCableSlugs: ["marea"],
      sources: [
        {
          sourceId: "telegeography",
          url: "https://www.submarinecablemap.com/",
          checkedAt: CHECKED_AT,
          note: "MAREA cable system page on the TeleGeography Submarine Cable Map.",
        },
      ],
      confidence: "high",
    },
    {
      year: "2021",
      title: "Dunant enters service",
      summary:
        "Dunant, a Google-funded transatlantic cable, enters service between Virginia Beach (US) and Saint-Hilaire-de-Riez (France). Per Google's public disclosures, the system uses a 12-fibre-pair space-division-multiplexing design.",
      relatedEntityRefs: ["country:united-states", "city:ashburn"],
      sources: [
        {
          sourceId: "telegeography",
          url: "https://www.submarinecablemap.com/",
          checkedAt: CHECKED_AT,
          note: "Dunant cable system page on the TeleGeography Submarine Cable Map.",
        },
      ],
      confidence: "high",
      caveats: [
        "Dunant is not yet seeded as a SubseaCable entity in Radar's registry.",
      ],
    },
    {
      year: "2022",
      title: "Grace Hopper enters service",
      summary:
        "Grace Hopper, a Google-funded transatlantic cable, enters service connecting the United States (Long Island, NY) to the United Kingdom (Bude) and Spain (Bilbao). Per Google's public disclosures, the system anchors Google's transatlantic backbone alongside Dunant.",
      relatedEntityRefs: ["country:united-states", "country:united-kingdom"],
      sources: [
        {
          sourceId: "telegeography",
          url: "https://www.submarinecablemap.com/",
          checkedAt: CHECKED_AT,
          note: "Grace Hopper cable system page on the TeleGeography Submarine Cable Map.",
        },
      ],
      confidence: "high",
      caveats: [
        "Grace Hopper is not yet seeded as a SubseaCable entity in Radar's registry.",
      ],
    },
  ],
  relatedEntityRefs: [
    "city:ashburn",
    "city:london",
    "country:united-states",
    "country:united-kingdom",
    "country:netherlands",
    "country:germany",
  ],
  relatedDatasetSlugs: ["subsea-cable-landings"],
  relatedGuideSlugs: ["subsea-cables", "infrastructure-redundancy"],
  relatedCableSlugs: ["marea", "tat-14"],
  relatedMapPaths: ["/maps/subsea-cables"],
  relatedMediaIds: ["transatlantic-cable-history", "cable-landing-topology"],
  methodologyNotes: [
    "Cable identity, ready-for-service dates, and consortium membership are sourced from TeleGeography's published Submarine Cable Map. Capacity figures are recorded only when the consortium has officially disclosed them.",
    "Cable polylines (the actual sea route) are intentionally out of scope; the landing-point endpoint pairs are the strategic geography.",
  ],
  caveats: [
    "Older systems' specific landing-station coordinates are sometimes recorded variably across secondary sources; the page preserves the inland anchor metro where possible.",
    "Operating capacity has been upgraded across most cables' lives through endpoint equipment changes; the platform does not store current operating capacity.",
    "Several cable systems mentioned in the timeline (Dunant, Grace Hopper, Amitié) are not yet seeded as SubseaCable entities in Radar's registry; the timeline references them by name with TeleGeography as the source.",
  ],
  confidence: "high",
  sources: [
    {
      sourceId: "telegeography",
      url: "https://www.submarinecablemap.com/",
      checkedAt: CHECKED_AT,
      note: "Authoritative public submarine cable map and accompanying historical reporting.",
    },
    {
      sourceId: "fcc",
      url: "https://www.fcc.gov/general/submarine-cable-landing-licenses",
      checkedAt: CHECKED_AT,
      note: "FCC submarine cable landing licenses (US landings).",
    },
    {
      sourceId: "itu",
      url: "https://www.itu.int/",
      checkedAt: CHECKED_AT,
      note: "ITU cable-related recommendations and standards.",
    },
  ],
};
