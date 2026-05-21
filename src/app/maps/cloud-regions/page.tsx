import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { Container } from "@/components/ui/Container";
import { EntitySection } from "@/components/ui/EntitySection";
import { QuickAnswer } from "@/components/ui/QuickAnswer";
import { SourceFootnote } from "@/components/ui/SourceFootnote";
import { WorldMap, type MapPoint } from "@/components/maps/WorldMap";
import { MapPointsList } from "@/components/maps/MapPointsList";
import { CITIES } from "@/data";
import { buildPageMetadata } from "@/lib/metadata";
import { breadcrumbJsonLd } from "@/lib/seo";

const PAGE_PATH = "/maps/cloud-regions";
const LAST_UPDATED = "2026-05-21";

export const metadata: Metadata = buildPageMetadata({
  title: "Cloud regions map",
  description:
    "Where AWS, Google Cloud, and Microsoft Azure operate verified cloud regions. Plotted from each provider's own published directory; cross-referenced to Radar's verified metros.",
  path: PAGE_PATH,
  lastUpdated: LAST_UPDATED,
});

const POINTS: ReadonlyArray<
  MapPoint & { readonly href: string; readonly note: string }
> = CITIES.flatMap((c) => {
  if (!c.coordinates || (c.cloudRegionRefs ?? []).length === 0) return [];
  return [
    {
      id: `cloud-${c.slug}`,
      coordinates: c.coordinates,
      label: c.name,
      subLabel: `${(c.cloudRegionRefs ?? []).length} hyperscaler regions`,
      variant: "cloud-region" as const,
      href: `/cities/${c.slug}`,
      note: (c.cloudRegionRefs ?? []).join(", "),
      labelLeft: c.coordinates.lon > 100,
    },
  ];
});

const CITATIONS = [
  {
    sourceId: "aws-regions",
    url: "https://aws.amazon.com/about-aws/global-infrastructure/regions_az/",
    checkedAt: LAST_UPDATED,
    note: "AWS Global Infrastructure regions and availability zones page.",
  },
  {
    sourceId: "gcp-regions",
    url: "https://cloud.google.com/about/locations",
    checkedAt: LAST_UPDATED,
    note: "Google Cloud locations directory.",
  },
  {
    sourceId: "azure-regions",
    url: "https://azure.microsoft.com/en-us/explore/global-infrastructure/geographies/",
    checkedAt: LAST_UPDATED,
    note: "Microsoft Azure geographies and regions directory.",
  },
  {
    sourceId: "geonames",
    url: "https://www.geonames.org/",
    checkedAt: LAST_UPDATED,
    note: "Metro coordinates.",
  },
] as const;

export default function CloudRegionsMapPage() {
  const breadcrumb = breadcrumbJsonLd([
    { name: "Maps", path: "/maps" },
    { name: "Cloud regions", path: PAGE_PATH },
  ]);

  return (
    <Container as="article">
      <header className="border-b border-line pb-12 md:pb-16">
        <p className="eyebrow text-accent-600">Map · Cloud regions</p>
        <h1 className="mt-6 text-balance font-display text-hero font-semibold text-ink-900">
          Where the hyperscalers operate.
        </h1>
        <p className="mt-7 max-w-prose text-lead text-ink-500">
          Verified cloud-region anchors plotted from the three major
          hyperscalers&apos; published region directories, cross-referenced to
          the metros in Radar&apos;s knowledge graph.
        </p>
        <p className="mt-6 text-sm text-ink-500">
          Reviewed {LAST_UPDATED}.
        </p>
      </header>

      <div className="mt-12 md:mt-16">
        <QuickAnswer
          label="What this shows"
          answer="Every metro on the map hosts a general-availability cloud region from at least one of AWS, Google Cloud, or Microsoft Azure, per that provider's own published directory. Sovereignty regions are counted with the parent metro. Provider-named region identifiers and the supporting source for each point are listed in the table below the map."
        />
      </div>

      <section className="mt-14 md:mt-20">
        <WorldMap
          points={POINTS}
          caption="Verified cloud-region anchors. Three points; more added as the entity registry grows."
        />
      </section>

      <section className="mt-10">
        <MapPointsList
          caption="Plotted points"
          points={POINTS}
        />
      </section>

      <EntitySection
        title="Why this map matters"
      >
        <div className="max-w-prose space-y-5 text-[0.9375rem] leading-relaxed text-ink-700">
          <p>
            Hyperscaler region locations are the leading signal for where
            internet infrastructure concentrates. A new region announcement
            triggers ancillary build-out — colocation, transit, IXP
            membership, power-purchase agreements — that reshapes the
            metro for years afterward.
          </p>
          <p>
            Reading the three hyperscaler directories together makes the
            interconnection-metro pattern visible: Frankfurt, Ashburn /
            Northern Virginia, and Singapore each host general-availability
            regions of all three major clouds. These are the same metros
            that anchor the principal IXPs and the densest colocation
            footprints.
          </p>
        </div>
        <p className="mt-6 max-w-prose text-sm">
          <Link
            href="/guides/cloud-regions"
            className="text-accent-600 hover:text-accent-700"
          >
            Read the Cloud regions guide →
          </Link>
        </p>
      </EntitySection>

      <EntitySection title="Methodology">
        <div className="max-w-prose space-y-5 text-[0.9375rem] leading-relaxed text-ink-700">
          <p>
            Each metro is plotted at its city centroid (GeoNames). The
            cloud-region anchor count next to each point reads the
            corresponding city record&apos;s <code className="rounded bg-surface-subtle px-1.5 py-0.5 font-mono text-[0.85em] text-ink-700">cloudRegionRefs</code> field
            in the entity graph — the same list that drives the entity
            page&apos;s cloud-relevance editorial section.
          </p>
          <p>
            Metros that host no verified hyperscaler region are omitted
            from this map. They appear on the {""}
            <Link
              href="/maps/datacenters"
              className="text-accent-600 hover:text-accent-700"
            >
              datacenter-hubs map
            </Link>{" "}
            where appropriate.
          </p>
        </div>
      </EntitySection>

      <EntitySection title="Sources">
        <SourceFootnote citations={CITATIONS} />
      </EntitySection>

      <Script
        id="ld-map-cloud-regions"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
    </Container>
  );
}
