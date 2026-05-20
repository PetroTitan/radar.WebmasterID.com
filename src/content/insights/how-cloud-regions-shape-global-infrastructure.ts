import type { Insight } from "@/entities";

const CHECKED_AT = "2026-05-20";

export const HOW_CLOUD_REGIONS_SHAPE: Insight = {
  slug: "how-cloud-regions-shape-global-infrastructure",
  title: "How cloud regions shape global infrastructure",
  dek:
    "A new cloud region is not just a hyperscaler's announcement — it is a magnet for colocation, peering, and policy that reshapes a metro for years afterward.",
  publishedAt: "2026-05-20",
  lastUpdated: "2026-05-20",
  entityRefs: ["city:frankfurt", "city:ashburn", "city:singapore"],
  sections: [
    {
      id: "intro",
      paragraphs: [
        "A cloud region announcement is reported by the trade press as an event in the hyperscaler's life. From the infrastructure side it is more accurately an event in the metro's life. A new region brings concentrated capacity, attracts ancillary build-out, and changes how networks route traffic for years afterward.",
        "Reading the hyperscalers' own region directories alongside PeeringDB's facility listings makes the shape of the effect clear: cloud regions cluster in interconnection metros, and the metros they cluster in get larger and harder to displace as a result.",
      ],
    },
    {
      id: "definition",
      heading: "What a cloud region actually is",
      paragraphs: [
        "A cloud region, in each major provider's own definition, is a collection of one or more datacenters in a single metro placed under a single administrative and naming scope (such as `eu-central-1` or `us-east-1`). The datacenters themselves are grouped into availability zones — physically separated facilities engineered to fail independently.",
        "What providers do not usually publish is which specific datacenter buildings host which zones, which is why the Radar entity graph anchors cloud regions to verified metros (country + city) rather than to specific facility addresses.",
      ],
    },
    {
      id: "authoritative-source",
      heading: "The hyperscaler directory as authoritative",
      paragraphs: [
        "For region-level facts, the hyperscalers' own published directories are the authoritative source. AWS publishes its Global Infrastructure page, Google Cloud its Locations directory, and Microsoft Azure its Geographies pages. Each is treated by Radar as a tier-3 vendor primary doc — the operator's own self-attested record.",
        "Anything more granular than what the directories publish (specific facility names, zone-to-building maps, capacity figures) is intentionally not published by the operators and is therefore not in the Radar record either.",
      ],
    },
    {
      id: "metros-cluster",
      heading: "Cloud regions cluster in interconnection metros",
      paragraphs: [
        "Reading the three hyperscaler directories together, a small set of metros recur. Frankfurt hosts AWS eu-central-1, Google Cloud europe-west3, and Microsoft Azure Germany West Central. Ashburn / Northern Virginia hosts AWS us-east-1, Google Cloud us-east4, and Microsoft Azure East US. Singapore hosts AWS ap-southeast-1, Google Cloud asia-southeast1, and Microsoft Azure Southeast Asia.",
        "These overlap is not coincidence. Cloud regions need dense interconnection to be useful, which means they tend to land in metros that already have dense interconnection — which then reinforces those metros further. The pattern is the same path-dependent dynamic that shaped Frankfurt and Singapore in the first place.",
      ],
    },
    {
      id: "cascade",
      heading: "Cascade effects on local infrastructure",
      paragraphs: [
        "A new cloud region in a metro typically triggers a sequence of ancillary build-out: colocation operators expand or open new facilities to serve customers wanting to peer with the cloud; transit and IP-transit providers add capacity; the local IXP often gains the cloud's Direct Connect / Interconnect / ExpressRoute as a member; the local power and cooling supply chains tighten.",
        "None of this is published on the cloud's own region page. It shows up downstream in PeeringDB's facility listings, in TeleGeography's interconnection reports, and in trade press about new colocation builds.",
      ],
    },
    {
      id: "sovereignty",
      heading: "Sovereignty regions and the policy layer",
      paragraphs: [
        "Cloud regions are also now a policy artifact. Sovereignty-oriented variants — Azure Germany, AWS Sovereign Cloud announcements, GCP sovereign control announcements — are an explicit response to data-residency requirements in particular jurisdictions. Each of these is documented on the relevant provider's own pages and treated as a distinct region with its own region identifier.",
        "Sovereignty regions complicate the simple \"more regions are better\" reading of cloud expansion. A sovereignty region is, in infrastructure terms, often smaller and more constrained than a general-purpose region; reading the directories with that in mind helps avoid double-counting capacity.",
      ],
    },
  ],
  sources: [
    {
      sourceId: "aws-regions",
      url: "https://aws.amazon.com/about-aws/global-infrastructure/regions_az/",
      checkedAt: CHECKED_AT,
      note: "AWS Global Infrastructure regions and availability zones page.",
    },
    {
      sourceId: "gcp-regions",
      url: "https://cloud.google.com/about/locations",
      checkedAt: CHECKED_AT,
      note: "Google Cloud locations directory.",
    },
    {
      sourceId: "azure-regions",
      url: "https://azure.microsoft.com/en-us/explore/global-infrastructure/geographies/",
      checkedAt: CHECKED_AT,
      note: "Microsoft Azure geographies and regions directory.",
    },
    {
      sourceId: "peeringdb",
      url: "https://www.peeringdb.com/",
      checkedAt: CHECKED_AT,
      note: "Facility listings, cloud-provider on-ramp presence.",
    },
    {
      sourceId: "telegeography",
      url: "https://www.telegeography.com/",
      checkedAt: CHECKED_AT,
      note: "Interconnection-metro and colocation context.",
    },
  ],
};
