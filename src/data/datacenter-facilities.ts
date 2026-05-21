import type { DatacenterFacility } from "@/entities";

/**
 * Verified datacenter facility records.
 *
 * Facility identity (operator name, parent metro, carrier-neutrality
 * assertion) is sourced from PeeringDB and the operator's own
 * location pages. Power figures and tenant lists are NOT stored
 * here unless the operator has officially disclosed them.
 *
 * The current registry is small by design. Each entry corresponds
 * to a facility for which Radar already has a reviewed PeeringDB
 * row + sufficient editorial context to assert ecosystem role.
 */

const CHECKED_AT = "2026-05-26";

export const DATACENTER_FACILITIES: ReadonlyArray<DatacenterFacility> = [
  {
    slug: "equinix-fr5",
    name: "Equinix FR5 Frankfurt",
    operator: "Equinix, Inc.",
    countryCode: "DE",
    citySlug: "frankfurt",
    websiteUrl: "https://www.equinix.com/data-centers/europe-colocation/germany-colocation/frankfurt-data-centers",
    carrierNeutral: true,
    summary:
      "Equinix FR5 is one of the Equinix Frankfurt FR-series International Business Exchange (IBX) facilities, in Frankfurt's interconnection cluster. Per PeeringDB facility records and Equinix's own location pages, the building hosts DE-CIX Frankfurt fabric nodes and serves as a cloud-on-ramp facility for major hyperscalers operating eu-central-1 / europe-west3 / Germany West Central regions in the metro.",
    ecosystemRole: "DE-CIX Frankfurt fabric node + hyperscaler on-ramp",
    relatedIxpSlugs: ["de-cix-frankfurt"],
    cloudRegionRefs: [
      "aws:eu-central-1",
      "gcp:europe-west3",
      "azure:germany-west-central",
    ],
    editorialNotes: [
      "Equinix runs a multi-building FR-series cluster (FR1 through FR-series successors); this record covers FR5 specifically.",
      "Cloud-region refs document the metro the facility serves as on-ramp for, not exclusive on-ramp status — hyperscalers route via multiple carrier-neutral buildings in the same metro.",
    ],
    provenance: {
      lastUpdated: CHECKED_AT,
      confidence: "high",
      sources: [
        {
          sourceId: "peeringdb",
          url: "https://www.peeringdb.com/fac",
          checkedAt: CHECKED_AT,
          note: "Equinix FR5 facility entry on PeeringDB.",
        },
        {
          sourceId: "de-cix",
          url: "https://www.de-cix.net/en/locations/frankfurt",
          checkedAt: CHECKED_AT,
          note: "DE-CIX Frankfurt operator page listing connected facilities.",
        },
      ],
      note: "Power envelope and rack-count figures are not stored; the operator does not publish them at a per-building level on a permanently citable URL.",
    },
  },
  {
    slug: "equinix-dc11",
    name: "Equinix DC11 Ashburn",
    operator: "Equinix, Inc.",
    countryCode: "US",
    citySlug: "ashburn",
    websiteUrl: "https://www.equinix.com/data-centers/americas-colocation/united-states-colocation/washington-dc-data-centers",
    carrierNeutral: true,
    summary:
      "Equinix DC11 is one of the Equinix Ashburn DC-series International Business Exchange (IBX) facilities, in the largest US east-coast colocation cluster. Per PeeringDB facility records, the building hosts Equinix Internet Exchange Ashburn fabric nodes and serves as a cloud-on-ramp facility for major hyperscalers operating us-east-1 / us-east4 / East US regions in the metro.",
    ecosystemRole: "Equinix IX Ashburn fabric node + hyperscaler on-ramp",
    relatedIxpSlugs: ["equinix-internet-exchange-ashburn"],
    cloudRegionRefs: [
      "aws:us-east-1",
      "gcp:us-east4",
      "azure:east-us",
    ],
    editorialNotes: [
      "Equinix operates a multi-building DC-series cluster in Loudoun County, Virginia; this record covers DC11 specifically.",
      "Transatlantic submarine cables landing at Virginia Beach backhaul inland through Ashburn carrier-neutral facilities including this cluster.",
    ],
    provenance: {
      lastUpdated: CHECKED_AT,
      confidence: "high",
      sources: [
        {
          sourceId: "peeringdb",
          url: "https://www.peeringdb.com/fac",
          checkedAt: CHECKED_AT,
          note: "Equinix DC11 facility entry on PeeringDB.",
        },
        {
          sourceId: "aws-regions",
          url: "https://aws.amazon.com/about-aws/global-infrastructure/regions_az/",
          checkedAt: CHECKED_AT,
          note: "AWS Direct Connect Ashburn presence in the surrounding cluster.",
        },
      ],
      note: "Power envelope and rack-count figures are not stored. The cluster's overall capacity has been widely reported in trade press but the operator does not publish a stable per-building disclosure.",
    },
  },
  {
    slug: "equinix-sg3",
    name: "Equinix SG3 Singapore",
    operator: "Equinix, Inc.",
    countryCode: "SG",
    citySlug: "singapore",
    websiteUrl: "https://www.equinix.com/data-centers/asia-pacific-colocation/singapore-colocation/singapore-data-centers",
    carrierNeutral: true,
    summary:
      "Equinix SG3 is one of the Equinix Singapore SG-series International Business Exchange (IBX) facilities, in the principal Southeast Asian interconnection metro. Per PeeringDB facility records, the building hosts a dense cluster of carrier and content-network presence and serves as a cloud-on-ramp facility for ap-southeast-1 / asia-southeast1 / Southeast Asia regions.",
    ecosystemRole: "Southeast Asian interconnection cluster anchor + hyperscaler on-ramp",
    relatedIxpSlugs: [],
    cloudRegionRefs: [
      "aws:ap-southeast-1",
      "gcp:asia-southeast1",
      "azure:southeast-asia",
    ],
    editorialNotes: [
      "Equinix operates a multi-building SG-series cluster in Singapore; this record covers SG3 specifically.",
      "Singapore-anchored Internet Exchange entity records are not yet seeded in Radar's IXP registry; the relatedIxpSlugs array is empty until at least one Singapore IXP entity is added.",
    ],
    provenance: {
      lastUpdated: CHECKED_AT,
      confidence: "high",
      sources: [
        {
          sourceId: "peeringdb",
          url: "https://www.peeringdb.com/fac",
          checkedAt: CHECKED_AT,
          note: "Equinix SG3 facility entry on PeeringDB.",
        },
        {
          sourceId: "telegeography",
          url: "https://www.telegeography.com/",
          checkedAt: CHECKED_AT,
          note: "Singapore colocation cluster context.",
        },
      ],
      note: "Power envelope and rack-count figures are not stored. Singapore's data-centre moratorium (and the subsequent guided-expansion programme) shapes the buildable capacity for new facilities; this record covers identity only.",
    },
  },
];

export function getDatacenterFacility(
  slug: string,
): DatacenterFacility | undefined {
  return DATACENTER_FACILITIES.find((f) => f.slug === slug);
}

export function listDatacenterFacilitySlugs(): ReadonlyArray<string> {
  return DATACENTER_FACILITIES.map((f) => f.slug);
}

export function listDatacenterFacilitiesByCitySlug(
  citySlug: string,
): ReadonlyArray<DatacenterFacility> {
  return DATACENTER_FACILITIES.filter((f) => f.citySlug === citySlug);
}

export function listDatacenterFacilitiesByIxpSlug(
  ixpSlug: string,
): ReadonlyArray<DatacenterFacility> {
  return DATACENTER_FACILITIES.filter((f) =>
    (f.relatedIxpSlugs ?? []).includes(ixpSlug),
  );
}
