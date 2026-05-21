import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { Container } from "@/components/ui/Container";
import { EntitySection } from "@/components/ui/EntitySection";
import { QuickAnswer } from "@/components/ui/QuickAnswer";
import { SourceFootnote } from "@/components/ui/SourceFootnote";
import { WorldMap, type MapPoint } from "@/components/maps/WorldMap";
import { MapPointsList } from "@/components/maps/MapPointsList";
import { IXPS } from "@/data";
import { buildPageMetadata } from "@/lib/metadata";
import { breadcrumbJsonLd } from "@/lib/seo";

const PAGE_PATH = "/maps/ixps";
const LAST_UPDATED = "2026-05-21";

export const metadata: Metadata = buildPageMetadata({
  title: "Internet Exchange Points map",
  description:
    "Where the principal Internet Exchange Points operate. Plotted from PeeringDB and operator-published records; one verified IXP plotted in v1, more added as the registry grows.",
  path: PAGE_PATH,
  lastUpdated: LAST_UPDATED,
});

const POINTS: ReadonlyArray<
  MapPoint & { readonly href: string; readonly note: string }
> = IXPS.flatMap((ixp) => {
  if (!ixp.coordinates) return [];
  return [
    {
      id: `ixp-${ixp.slug}`,
      coordinates: ixp.coordinates,
      label: ixp.name,
      subLabel: ixp.operator,
      variant: "ixp" as const,
      href: `/ixps/${ixp.slug}`,
      note: `Operator: ${ixp.operator}`,
    },
  ];
});

const CITATIONS = [
  {
    sourceId: "peeringdb",
    url: "https://www.peeringdb.com/",
    checkedAt: LAST_UPDATED,
    note: "Authoritative IXP registry, member counts, facility listings.",
  },
  {
    sourceId: "de-cix",
    url: "https://www.de-cix.net/en/locations/frankfurt",
    checkedAt: LAST_UPDATED,
    note: "DE-CIX Frankfurt operator page.",
  },
  {
    sourceId: "geonames",
    url: "https://www.geonames.org/",
    checkedAt: LAST_UPDATED,
    note: "Metro coordinates for IXP plotting.",
  },
] as const;

export default function IxpsMapPage() {
  const breadcrumb = breadcrumbJsonLd([
    { name: "Maps", path: "/maps" },
    { name: "IXPs", path: PAGE_PATH },
  ]);

  return (
    <Container as="article">
      <header className="border-b border-line pb-12 md:pb-16">
        <p className="eyebrow text-accent-600">Map · Internet Exchanges</p>
        <h1 className="mt-6 text-balance font-display text-hero font-semibold text-ink-900">
          Peering geography.
        </h1>
        <p className="mt-7 max-w-prose text-lead text-ink-500">
          Internet Exchange Points are the physical peering fabrics where
          networks meet to exchange traffic directly. Their geography is
          the practical map of how the internet is wired.
        </p>
        <p className="mt-6 text-sm text-ink-500">
          Reviewed {LAST_UPDATED}.
        </p>
      </header>

      <div className="mt-12 md:mt-16">
        <QuickAnswer
          label="What this shows"
          answer="Every plotted point is an Internet Exchange Point whose identity record is in Radar's IXP registry and whose coordinates are verified against PeeringDB or the operator's own published location page. Volatile metrics (connected-network count, peak traffic) belong on dated observations elsewhere — the map carries identity and geography only."
        />
      </div>

      <section className="mt-14 md:mt-20">
        <WorldMap
          points={POINTS}
          caption="Verified Internet Exchange Points. One point in v1; more added as the registry grows."
        />
      </section>

      <section className="mt-10">
        <MapPointsList caption="Plotted points" points={POINTS} />
      </section>

      <EntitySection title="Why peering geography matters">
        <div className="max-w-prose space-y-5 text-[0.9375rem] leading-relaxed text-ink-700">
          <p>
            The largest IXPs anchor the routing of entire regions.
            DE-CIX Frankfurt — the only point on the map in this v1 —
            is the principal peering fabric for Central, Western, and
            parts of Eastern European traffic, per PeeringDB. Similar
            anchors exist in London, Amsterdam, Paris, Ashburn,
            Singapore, São Paulo and a handful of other metros; they
            will appear on this map as their IXP identity records pass
            editorial review.
          </p>
          <p>
            The FLAP cluster framing — Frankfurt / London / Amsterdam /
            Paris — recurs in TeleGeography reports as the structural
            grouping through which the bulk of intra-European traffic
            moves. The map encodes that geography as it gets seeded.
          </p>
        </div>
        <p className="mt-6 max-w-prose text-sm">
          <Link
            href="/guides/internet-exchanges"
            className="text-accent-600 hover:text-accent-700"
          >
            Read the Internet Exchange Points guide →
          </Link>
        </p>
      </EntitySection>

      <EntitySection title="Methodology">
        <div className="max-w-prose space-y-5 text-[0.9375rem] leading-relaxed text-ink-700">
          <p>
            Each IXP is plotted at its primary facility coordinates as
            recorded by PeeringDB and cross-checked against the
            operator&apos;s own location page. For DE-CIX Frankfurt the two
            sources agree; the coordinate is the city centroid of
            Frankfurt am Main per GeoNames.
          </p>
          <p>
            IXPs that operate as distributed fabrics across multiple
            metros (some carrier-led exchanges do) are plotted at the
            principal anchor metro and noted as multi-metro in the
            entity record. None of the v1 points are multi-metro.
          </p>
        </div>
      </EntitySection>

      <EntitySection title="Sources">
        <SourceFootnote citations={CITATIONS} />
      </EntitySection>

      <Script
        id="ld-map-ixps"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
    </Container>
  );
}
