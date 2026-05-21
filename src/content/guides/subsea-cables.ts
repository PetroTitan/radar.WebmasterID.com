import type { Guide } from "@/entities";

const CHECKED_AT = "2026-05-22";

export const SUBSEA_CABLES_GUIDE: Guide = {
  slug: "subsea-cables",
  title: "Submarine cables",
  dek:
    "Why fibre laid on the seabed — not satellites — carries the bulk of intercontinental internet traffic, and how to read the canonical map of cable systems.",
  publishedAt: "2026-05-20",
  lastUpdated: "2026-05-22",
  definition:
    "Submarine cables are fibre-optic systems laid along the seabed that carry the bulk of intercontinental internet traffic. Each cable system is typically owned by a consortium of telcos and increasingly cloud providers, lands at a small number of coastal stations, and operates for 20–25 years. TeleGeography's Submarine Cable Map is the canonical public record of in-service and planned systems.",
  keyTakeaways: [
    "Submarine cables carry the great majority of intercontinental internet traffic; satellites are a complement, not a substitute, for high-bandwidth long-haul.",
    "Each cable system is a fibre pair (or several) terminated at a small number of coastal cable landing stations.",
    "Cables are typically multi-owner consortia. Cloud providers (Google, Meta, Amazon, Microsoft) are now consortium members on multiple major systems.",
    "Strategic geography is at the landing points, not the cable mid-points. Inland routing from the landing station to the interconnection metro is part of the picture.",
    "Design capacity and operating capacity differ; capacity is often upgraded during the cable's life through new transmission equipment at the endpoints.",
  ],
  summary: [
    { label: "Type", value: "Submarine fibre-optic cable system" },
    {
      label: "Authoritative source",
      value: "TeleGeography Submarine Cable Map (tier-2)",
    },
    { label: "Typical operating life", value: "20–25 years" },
    { label: "Ownership model", value: "Multi-owner consortium" },
    {
      label: "Strategic geography",
      value: "Coastal landing stations, not cable mid-points",
    },
    {
      label: "Canonical convergence points",
      value: "Singapore, Marseille, Virginia Beach, Hong Kong",
    },
  ],
  sections: [
    {
      id: "what-it-is",
      heading: "What a submarine cable system is",
      paragraphs: [
        "A submarine cable system is one or more fibre pairs encased in protective armour and laid along the seabed between two or more coastal landing stations. Optical transmission equipment at the landing stations puts traffic onto the fibre at one end and reads it off at the other; repeaters along the cable (powered by a current sent down the cable itself) amplify the signal.",
        "Cables are not satellites. Latency over a long submarine cable is set by the speed of light through glass — roughly two-thirds the speed of light in a vacuum — and is usually a small fraction of the latency of a comparable satellite hop.",
      ],
    },
    {
      id: "consortia",
      heading: "Consortia and ownership",
      paragraphs: [
        "Historically, submarine cable systems were funded by consortia of national telecom operators. That ownership model has broadened: cloud providers (Google, Meta, Amazon, Microsoft) are now consortium members or sole owners on a growing share of major systems. TeleGeography's map and accompanying reporting are the standard public references for current ownership.",
        "From a network-routing perspective, the ownership model affects access policy and pricing but does not change the cable's physical role.",
      ],
    },
    {
      id: "landing-points",
      heading: "Landing points are the strategic geography",
      paragraphs: [
        "The economically and strategically interesting points on a cable system are not the deep-sea mid-points; they are the coastal cable landing stations where the cable comes ashore and is handed off to terrestrial fibre. The choice of landing country, landing station, and inland routing partner determines who can backhaul traffic from the cable into the local interconnection metros.",
        "Virginia Beach is the principal landing corridor for transatlantic cables on the US east coast; traffic is then backhauled inland to Ashburn / Northern Virginia. Marseille plays a similar role for Mediterranean cables into Europe. Singapore concentrates landings for Southeast Asian systems within the metro itself.",
      ],
    },
    {
      id: "reading-the-map",
      heading: "Reading TeleGeography's map",
      paragraphs: [
        "TeleGeography's Submarine Cable Map is updated on a regular cadence and records, for each system, the landing points, the consortium members, and the in-service / planned status. It is the closest thing to a canonical public registry of subsea infrastructure.",
        "For deeper context — design capacity, current operating capacity, recent incidents — TeleGeography's commercial reports are the authoritative reference. The public map is sufficient for geographic and identity facts.",
      ],
    },
    {
      id: "capacity",
      heading: "Design capacity vs operating capacity",
      paragraphs: [
        "A cable's headline design capacity (often quoted in Tbps) reflects what the cable could carry if equipped with current-generation optical transmission equipment across every fibre pair. Operating capacity is typically lower at launch and is upgraded across the cable's life as transmission equipment improves.",
        "When a cable system reports a \"capacity upgrade\", it usually means new equipment at the landing stations rather than new fibre at sea. The fibre on the seabed is the long-term physical asset; the equipment is replaced every few years.",
      ],
    },
    {
      id: "resilience",
      heading: "Disruption and resilience",
      paragraphs: [
        "Cables can be damaged by anchors, fishing gear, seabed movement, and occasionally deliberate action. Repairs are slow (cable ships, deep-water grappling, splicing). Resilient operators design around the loss of any single cable by maintaining capacity on multiple systems that follow different physical routes.",
        "Geographic concentration of cables in narrow corridors (e.g., the Red Sea, the Luzon Strait) creates concentration risk for the regions on either side. Tracking which cables share corridors is the basic discipline of cable resilience analysis.",
      ],
    },
  ],
  strategicImportance: [
    "Submarine cables are the load-bearing element of intercontinental internet infrastructure. A region without diverse cable landings is structurally dependent on a small number of cable consortia and on the regions to which those cables actually route.",
    "For policy-makers, cable diversity is a security concern; for operators, it is a routing concern; for the rest of the internet, it is mostly invisible until something goes wrong.",
  ],
  geographicImportance: [
    {
      entityRef: "country:singapore",
      prose:
        "Singapore is the principal landing-and-interconnect node for Southeast Asian subsea traffic — cable landings, cloud regions, and the regional IXP all reachable within the same metro.",
    },
    {
      entityRef: "city:ashburn",
      prose:
        "Ashburn is the inland anchor for transatlantic cables that come ashore at Virginia Beach; backhaul from the landing corridor terminates in Ashburn's colocation cluster.",
    },
  ],
  caveats: [
    "TeleGeography's public Submarine Cable Map records identity and landing facts; capacity figures, exact route geography, and operating-state detail live in TeleGeography's commercial reports and are not on the public surface.",
    "Cable landing facility identity is sometimes restricted from public documentation for security reasons; Radar records only what the operator or TeleGeography publishes.",
    "Corridor concentration (Red Sea, Luzon Strait, Marseille) shifts over time as new cables enter service; resilience assertions tied to a specific corridor should be read against the current map state, not historical positioning.",
  ],
  methodologyNotes: [
    "Subsea cable systems and landing stations are tracked separately. A landing station can host multiple cable systems, and a cable system typically has at least two landing stations.",
    "Cable identity facts use the official cable system name as published by TeleGeography; operator branding (e.g. \"Project Echo\") and the published system name (e.g. \"Echo cable system\") are recorded distinctly.",
  ],
  relatedEntityRefs: [
    "country:singapore",
    "city:singapore",
    "country:united-states",
    "city:ashburn",
  ],
  relatedDatasetSlugs: ["subsea-cable-landings"],
  relatedIndicatorSlugs: ["subsea-connectivity", "infrastructure-redundancy"],
  relatedRankingSlugs: ["subsea-connectivity-hubs", "internet-resilience"],
  relatedMapPaths: ["/maps/subsea-cables"],
  relatedMediaIds: ["cable-landing-topology", "infrastructure-redundancy-model"],
  sources: [
    {
      sourceId: "telegeography",
      url: "https://www.submarinecablemap.com/",
      checkedAt: CHECKED_AT,
      note: "Authoritative public submarine cable map and accompanying records.",
    },
    {
      sourceId: "peeringdb",
      url: "https://www.peeringdb.com/",
      checkedAt: CHECKED_AT,
      note: "Cable landing-station facility presence and inland metro interconnection.",
    },
    {
      sourceId: "itu",
      url: "https://www.itu.int/",
      checkedAt: CHECKED_AT,
      note: "Spectrum and standards governance; cable-related ITU recommendations.",
    },
  ],
};
