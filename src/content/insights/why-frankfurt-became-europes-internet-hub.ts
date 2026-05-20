import type { Insight } from "@/entities";

const CHECKED_AT = "2026-05-20";

export const WHY_FRANKFURT: Insight = {
  slug: "why-frankfurt-became-europes-internet-hub",
  title: "Why Frankfurt became Europe's internet hub",
  dek:
    "How a midsize German banking city turned into the eastern anchor of European internet traffic — and why network operators today consider a Frankfurt presence non-negotiable.",
  publishedAt: "2026-05-20",
  lastUpdated: "2026-05-20",
  entityRefs: ["country:germany", "city:frankfurt", "ixp:de-cix-frankfurt"],
  sections: [
    {
      id: "intro",
      paragraphs: [
        "Frankfurt is not the obvious choice for Europe's principal interconnection metro. It is not the continent's largest city, its richest, or its most central in any straight-line geographic sense. London is bigger; Amsterdam is more equidistant from the EU's population centres; Paris has a similar combination of city size and central position.",
        "And yet the four metros — Frankfurt, London, Amsterdam, Paris — that TeleGeography and other industry analysts group together as the FLAP cluster carry the great bulk of intra-European internet traffic, and inside that cluster Frankfurt has become the eastern anchor that operators treat as indispensable. The reasons are historical, structural, and reinforcing.",
      ],
    },
    {
      id: "de-cix-flywheel",
      heading: "DE-CIX and the network-effects flywheel",
      paragraphs: [
        "The decisive event was the founding of DE-CIX, recorded on the operator's own corporate pages as 1995, by what is now the German internet industry association eco. The Frankfurt fabric started with a handful of networks meeting in a single facility and grew incrementally; PeeringDB now catalogues it as one of the largest exchanges in the world by connected-network count.",
        "An Internet Exchange's pull on new networks is a classic network-effects market. Every new member adds a reason for the next prospective member to join — because peering with the existing membership saves transit cost. Once DE-CIX Frankfurt accumulated the major German ISPs, attracting the major content networks became easy; once it had the content networks, attracting smaller European ISPs followed naturally.",
      ],
    },
    {
      id: "colocation-cluster",
      heading: "Carrier-neutral colocation arrives",
      paragraphs: [
        "An IXP without dense carrier-neutral colocation around it is a switch fabric in search of a market. Frankfurt's surrounding colocation footprint grew alongside DE-CIX through the 2000s; PeeringDB now lists Equinix FR-series facilities, Digital Realty / Interxion sites, NTT facilities and a long tail of carrier-neutral operators as the principal connection points for the metro.",
        "The colocation cluster's tight physical footprint — most of the principal facilities are within ~15 km of each other — keeps inter-facility latency low. That makes triple-redundant deployments inside a single metro practical and reinforces Frankfurt's role as the place to land redundant European capacity.",
      ],
    },
    {
      id: "flap",
      heading: "The FLAP framing",
      paragraphs: [
        "The grouping of Frankfurt with London, Amsterdam and Paris is industry shorthand — TeleGeography's published European backbone maps treat the four as the structural cluster through which most intra-European traffic moves. Within FLAP, each metro has a slightly different role: London anchors transatlantic traffic, Amsterdam anchors the northern Europe / submarine cable interface, Paris anchors the southern and western European leg, and Frankfurt anchors the eastern axis into Central and Eastern Europe.",
      ],
    },
    {
      id: "hyperscalers",
      heading: "Hyperscaler anchoring",
      paragraphs: [
        "Cloud providers reinforced what was already happening. AWS opened eu-central-1 in Frankfurt, per AWS Global Infrastructure. Google Cloud's published locations record europe-west3 in Frankfurt. Microsoft Azure's geographies directory records Germany West Central in Frankfurt.",
        "Frankfurt is therefore one of a small number of metros worldwide that hosts a general-availability region of all three major hyperscalers within a single MAN. For application teams choosing a default European region, the choice between Frankfurt, Dublin, and Amsterdam is rarely close on a network-reach basis.",
      ],
    },
    {
      id: "moat",
      heading: "What the moat looks like now",
      paragraphs: [
        "Frankfurt's position is no longer a function of geography or first-mover advantage in isolation. It is a function of accumulated network membership, colocation capacity, transit options, and cloud presence — each of which makes the others stickier. Displacing Frankfurt would require simultaneously rebuilding all four layers somewhere else, which is the kind of investment that does not happen by accident.",
        "The historical lesson is that internet-hub status is path-dependent. Once a metro becomes the default European interconnection venue, the cost of being the second-best alternative is structurally higher than the cost of being the first-best one in a different region of the world — which is one reason Amsterdam, London, and Paris remain co-anchors rather than substitutes.",
      ],
    },
  ],
  sources: [
    {
      sourceId: "de-cix",
      url: "https://www.de-cix.net/en/about-de-cix",
      checkedAt: CHECKED_AT,
      note: "DE-CIX founding history; corporate \"About\" page.",
    },
    {
      sourceId: "peeringdb",
      url: "https://www.peeringdb.com/",
      checkedAt: CHECKED_AT,
      note: "DE-CIX Frankfurt member count, Frankfurt-metro facility listings.",
    },
    {
      sourceId: "telegeography",
      url: "https://www.telegeography.com/",
      checkedAt: CHECKED_AT,
      note: "European backbone geography; FLAP cluster framing.",
    },
    {
      sourceId: "aws-regions",
      url: "https://aws.amazon.com/about-aws/global-infrastructure/regions_az/",
      checkedAt: CHECKED_AT,
      note: "AWS eu-central-1 (Frankfurt) region listing.",
    },
    {
      sourceId: "gcp-regions",
      url: "https://cloud.google.com/about/locations",
      checkedAt: CHECKED_AT,
      note: "Google Cloud europe-west3 (Frankfurt) region listing.",
    },
    {
      sourceId: "azure-regions",
      url: "https://azure.microsoft.com/en-us/explore/global-infrastructure/geographies/",
      checkedAt: CHECKED_AT,
      note: "Microsoft Azure Germany West Central (Frankfurt) region listing.",
    },
  ],
};
