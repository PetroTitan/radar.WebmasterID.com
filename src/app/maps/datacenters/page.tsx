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

const PAGE_PATH = "/maps/datacenters";
const LAST_UPDATED = "2026-05-21";

export const metadata: Metadata = buildPageMetadata({
  title: "Datacenter hubs map",
  description:
    "The metros that anchor the world's carrier-neutral colocation clusters. Hub metros plotted from PeeringDB facility records; facility-level points await ingestion.",
  path: PAGE_PATH,
  lastUpdated: LAST_UPDATED,
});

const POINTS: ReadonlyArray<
  MapPoint & { readonly href: string; readonly note: string }
> = CITIES.flatMap((c) => {
  if (!c.coordinates) return [];
  return [
    {
      id: `dc-${c.slug}`,
      coordinates: c.coordinates,
      label: c.name,
      subLabel: "Hub metro",
      variant: "city" as const,
      href: `/cities/${c.slug}`,
      note: "Anchored by PeeringDB facility records.",
      labelLeft: c.coordinates.lon > 100,
    },
  ];
});

const CITATIONS = [
  {
    sourceId: "peeringdb",
    url: "https://www.peeringdb.com/",
    checkedAt: LAST_UPDATED,
    note: "Carrier-neutral facility records and metro composition.",
  },
  {
    sourceId: "telegeography",
    url: "https://www.telegeography.com/",
    checkedAt: LAST_UPDATED,
    note: "Colocation and interconnection market reporting.",
  },
  {
    sourceId: "geonames",
    url: "https://www.geonames.org/",
    checkedAt: LAST_UPDATED,
    note: "Metro coordinates.",
  },
] as const;

export default function DatacentersMapPage() {
  const breadcrumb = breadcrumbJsonLd([
    { name: "Maps", path: "/maps" },
    { name: "Datacenter hubs", path: PAGE_PATH },
  ]);

  return (
    <Container as="article">
      <header className="border-b border-line pb-12 md:pb-16">
        <p className="eyebrow text-accent-600">Map · Datacenter hubs</p>
        <h1 className="mt-6 text-balance font-display text-hero font-semibold text-ink-900">
          Where the colocation clusters anchor.
        </h1>
        <p className="mt-7 max-w-prose text-lead text-ink-500">
          Hubs are metros, not buildings. This map plots the metros that
          anchor the world&apos;s principal carrier-neutral colocation
          ecosystems; facility-level pins remain pending ingestion.
        </p>
        <p className="mt-6 text-sm text-ink-500">
          Reviewed {LAST_UPDATED}.
        </p>
      </header>

      <div className="mt-12 md:mt-16">
        <QuickAnswer
          label="What this shows"
          answer="Each plotted point is a metro that PeeringDB and TeleGeography reporting identify as a carrier-neutral colocation cluster. Facility-by-facility points (Equinix DC-series, Digital Realty / Interxion, NTT, etc.) are intentionally not plotted in v1 — they belong on dated facility records, not on a high-level geographic map."
        />
      </div>

      <section className="mt-14 md:mt-20">
        <WorldMap
          points={POINTS}
          caption="Hub metros currently in the Radar registry. Facility-level points await ingestion."
        />
      </section>

      <section className="mt-10">
        <MapPointsList caption="Plotted hub metros" points={POINTS} />
      </section>

      <EntitySection title="Why hub geography matters">
        <div className="max-w-prose space-y-5 text-[0.9375rem] leading-relaxed text-ink-700">
          <p>
            Five metros recur on every serious infrastructure map:
            Ashburn (Northern Virginia), Frankfurt, Singapore, London,
            and Amsterdam. Each has a distinct role — east-coast US
            colocation, Central European peering anchor, Southeast
            Asian gateway, transatlantic capacity, and northern
            European corridor respectively.
          </p>
          <p>
            Three of those five — Ashburn, Frankfurt, Singapore — are
            seeded into the Radar registry today and plotted above.
            London and Amsterdam will appear as their entity records
            pass editorial review.
          </p>
        </div>
        <p className="mt-6 max-w-prose text-sm">
          <Link
            href="/guides/datacenter-hubs"
            className="text-accent-600 hover:text-accent-700"
          >
            Read the Datacenter hubs guide →
          </Link>
        </p>
      </EntitySection>

      <EntitySection title="Methodology">
        <div className="max-w-prose space-y-5 text-[0.9375rem] leading-relaxed text-ink-700">
          <p>
            Each metro is plotted at the city centroid (GeoNames). The
            label reflects the city record in Radar&apos;s knowledge graph;
            the underlying classification as a hub is editorially
            assigned based on PeeringDB&apos;s facility-density data and
            TeleGeography&apos;s published reporting.
          </p>
          <p>
            Facility-level points — specific Equinix or Digital Realty
            buildings — are deliberately omitted. A facility-level map
            requires a dated dataset (facility opens, closes, expands
            year over year) which Radar does not yet ingest.
          </p>
        </div>
      </EntitySection>

      <EntitySection title="Sources">
        <SourceFootnote citations={CITATIONS} />
      </EntitySection>

      <Script
        id="ld-map-datacenters"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
    </Container>
  );
}
