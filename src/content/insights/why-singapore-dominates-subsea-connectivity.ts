import type { Insight } from "@/entities";

const CHECKED_AT = "2026-05-20";

export const WHY_SINGAPORE: Insight = {
  slug: "why-singapore-dominates-subsea-connectivity",
  title: "Why Singapore dominates subsea connectivity",
  dek:
    "A city-state at the world's busiest shipping lane became its busiest digital corridor too — and the structural reasons it remains difficult to substitute.",
  publishedAt: "2026-05-20",
  lastUpdated: "2026-05-20",
  entityRefs: ["country:singapore", "city:singapore"],
  sections: [
    {
      id: "intro",
      paragraphs: [
        "Singapore's role in submarine cable infrastructure is not a coincidence of the internet era. The same geographic position that made the Strait of Singapore one of the world's busiest shipping lanes made it the natural mid-point of every cable system the British Empire and its successors laid across the Indian Ocean / Pacific corridor from the 1870s onward. The fibre era inherited that history.",
        "What is unusual is how durable that role has been. The internet's geography is not static — Hong Kong, Tokyo, Mumbai, and several other Asian metros have repeatedly been positioned as alternatives or successors. Yet TeleGeography's published Submarine Cable Map continues to record an unusual density of in-service cable landings at Singapore, and the city has remained the practical regional anchor for the major hyperscalers.",
      ],
    },
    {
      id: "geography",
      heading: "The geography premium",
      paragraphs: [
        "Singapore sits on the southern lip of the Strait of Malacca, the narrow waterway between Sumatra and the Malay Peninsula. Any cable carrying traffic between the Indian Ocean (Mumbai, Suez, Marseille, the Arabian Gulf) and the Pacific (Hong Kong, Tokyo, Sydney) passes within easy hop of the city. The cost saving of not adding a thousand-kilometre detour applies to every cable, every time.",
        "Geographic premiums of this kind are rare. They survive policy mistakes, capacity gluts, and reasonably aggressive competition because the alternative — building a parallel cable bypassing the natural choke point — is always more expensive.",
      ],
    },
    {
      id: "policy",
      heading: "Decades of policy continuity",
      paragraphs: [
        "Singapore's regulator (formerly IDA, now IMDA) has run an explicitly pro-infrastructure policy posture for decades. Spectrum is allocated transparently, datacenter approvals follow published criteria, and the state has invested directly in upgrading the local power, cooling, and fibre topology around cable landing stations.",
        "Continuity matters more than any single decision. Cable consortia plan on 25-year horizons, and the willingness to land in a jurisdiction is partly a function of the jurisdiction's track record of not abruptly changing the rules. Singapore's track record is unusually long for the region.",
      ],
    },
    {
      id: "cable-convergence",
      heading: "Cable convergence on the city",
      paragraphs: [
        "TeleGeography's submarine cable map records Singapore as a landing point for many of the major Asia-Pacific cable systems — including pan-Asian systems that link Singapore northward to Hong Kong and Japan, transpacific systems that include Singapore as a regional spur, and intra-Southeast Asia systems that converge on the city before fanning out to Indonesia, Vietnam, and Australia.",
        "The cumulative effect is that an operator wanting to serve all of Southeast Asia from one cable presence can, in many cases, do it from Singapore alone. That is rarely true of any other regional metro.",
      ],
    },
    {
      id: "hyperscalers",
      heading: "Hyperscaler regional anchoring",
      paragraphs: [
        "All three major hyperscalers operate Singapore regions according to their published directories: AWS ap-southeast-1, Google Cloud asia-southeast1, Microsoft Azure Southeast Asia. The city is therefore the default Southeast Asian region for any application team picking a hyperscaler footprint.",
        "Because the hyperscalers' Direct Connect / Interconnect / ExpressRoute services land in Singapore, the city has also become the default point at which an enterprise customer establishes private interconnect with their cloud provider for regional traffic.",
      ],
    },
    {
      id: "displacement",
      heading: "What it would take to displace Singapore",
      paragraphs: [
        "Hong Kong has been the most-discussed alternative for transit and interconnection traffic into Greater China, and Jakarta and Manila are alternatives for serving particular national markets. Both are real, but neither replicates Singapore's combination of cable diversity, hyperscaler anchoring, and regulatory continuity.",
        "Displacing Singapore would require a metro that simultaneously offered comparable cable diversity (which is a 10-to-15-year construction project), a comparable hyperscaler presence (which follows cable diversity rather than leading it), and a comparably stable regulatory environment. There is no obvious candidate in the region today.",
      ],
    },
  ],
  sources: [
    {
      sourceId: "telegeography",
      url: "https://www.submarinecablemap.com/country/singapore",
      checkedAt: CHECKED_AT,
      note: "Submarine cable landings recorded at Singapore.",
    },
    {
      sourceId: "peeringdb",
      url: "https://www.peeringdb.com/",
      checkedAt: CHECKED_AT,
      note: "Singapore-metro facility and network presence.",
    },
    {
      sourceId: "aws-regions",
      url: "https://aws.amazon.com/about-aws/global-infrastructure/regions_az/",
      checkedAt: CHECKED_AT,
      note: "AWS ap-southeast-1 (Singapore) region listing.",
    },
    {
      sourceId: "gcp-regions",
      url: "https://cloud.google.com/about/locations",
      checkedAt: CHECKED_AT,
      note: "Google Cloud asia-southeast1 (Singapore) region listing.",
    },
    {
      sourceId: "azure-regions",
      url: "https://azure.microsoft.com/en-us/explore/global-infrastructure/geographies/",
      checkedAt: CHECKED_AT,
      note: "Microsoft Azure Southeast Asia (Singapore) region listing.",
    },
  ],
};
