import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { Container } from "@/components/ui/Container";
import { EntitySection } from "@/components/ui/EntitySection";
import { QuickAnswer } from "@/components/ui/QuickAnswer";
import { SourceFootnote } from "@/components/ui/SourceFootnote";
import { WorldMap, type MapPoint } from "@/components/maps/WorldMap";
import { MapPointsList } from "@/components/maps/MapPointsList";
import { getCity } from "@/data";
import { buildPageMetadata } from "@/lib/metadata";
import { breadcrumbJsonLd } from "@/lib/seo";

const PAGE_PATH = "/maps/subsea-cables";
const LAST_UPDATED = "2026-05-21";

export const metadata: Metadata = buildPageMetadata({
  title: "Submarine cables map",
  description:
    "Submarine cable landing geography anchored by TeleGeography's Submarine Cable Map. Verified landing-metro points only; full cable polylines await editorial ingestion.",
  path: PAGE_PATH,
  lastUpdated: LAST_UPDATED,
});

// v1 plots the two seeded landing metros — Singapore (direct landings)
// and Ashburn (via the Virginia Beach corridor inland to Ashburn).
const LANDING_METRO_SLUGS = ["singapore", "ashburn"] as const;

const POINTS: ReadonlyArray<
  MapPoint & { readonly href: string; readonly note: string }
> = LANDING_METRO_SLUGS.flatMap((slug) => {
  const c = getCity(slug);
  if (!c || !c.coordinates) return [];
  const note =
    slug === "ashburn"
      ? "Reached from Virginia Beach landing stations via inland fibre."
      : "Multiple direct landings within the metro per TeleGeography.";
  return [
    {
      id: `cable-${slug}`,
      coordinates: c.coordinates,
      label: c.name,
      subLabel: "Landing metro",
      variant: "cable-landing" as const,
      href: `/cities/${c.slug}`,
      note,
      labelLeft: c.coordinates.lon > 100,
    },
  ];
});

const CITATIONS = [
  {
    sourceId: "telegeography",
    url: "https://www.submarinecablemap.com/",
    checkedAt: LAST_UPDATED,
    note: "Authoritative public submarine cable map and accompanying records.",
  },
  {
    sourceId: "peeringdb",
    url: "https://www.peeringdb.com/",
    checkedAt: LAST_UPDATED,
    note: "Landing-station facility presence and inland metro interconnection.",
  },
  {
    sourceId: "geonames",
    url: "https://www.geonames.org/",
    checkedAt: LAST_UPDATED,
    note: "Metro coordinates for landing-point plotting.",
  },
] as const;

export default function SubseaCablesMapPage() {
  const breadcrumb = breadcrumbJsonLd([
    { name: "Maps", path: "/maps" },
    { name: "Submarine cables", path: PAGE_PATH },
  ]);

  return (
    <Container as="article">
      <header className="border-b border-line pb-12 md:pb-16">
        <p className="eyebrow text-accent-600">Map · Submarine cables</p>
        <h1 className="mt-6 text-balance font-display text-hero font-semibold text-ink-900">
          Cable geography is landing geography.
        </h1>
        <p className="mt-7 max-w-prose text-lead text-ink-500">
          Submarine cables carry the bulk of intercontinental internet
          traffic, but the strategic geography is at the coastal landing
          stations, not the deep-sea midpoints. This map plots verified
          landing metros only.
        </p>
        <p className="mt-6 text-sm text-ink-500">
          Reviewed {LAST_UPDATED}.
        </p>
      </header>

      <div className="mt-12 md:mt-16">
        <QuickAnswer
          label="What this shows"
          answer="Two landing metros in v1: Singapore (multiple direct cable landings within the metro) and Ashburn (reached from Virginia Beach via inland fibre). Full cable polylines, landing-station coordinates, and additional landing metros remain pending editorial ingestion."
        />
      </div>

      <section className="mt-14 md:mt-20">
        <WorldMap
          points={POINTS}
          caption="Verified cable-landing metros. Full cable polylines pending ingestion."
        />
      </section>

      <section className="mt-10">
        <MapPointsList caption="Plotted landing metros" points={POINTS} />
      </section>

      <EntitySection title="Why landing geography is the geography">
        <div className="max-w-prose space-y-5 text-[0.9375rem] leading-relaxed text-ink-700">
          <p>
            A submarine cable in mid-Pacific is operationally irrelevant
            to anyone except the cable operator. What matters is where
            the cable comes ashore — the landing station — and how
            traffic is backhauled inland from there to the
            interconnection metros.
          </p>
          <p>
            Virginia Beach is the principal landing corridor for
            transatlantic cables on the US east coast; the traffic
            reaches the global internet via Ashburn. Marseille plays a
            similar role for Mediterranean cables into Europe.
            Singapore concentrates landings inside the metro itself, a
            geographic accident that reinforces the city&apos;s regional
            anchor role.
          </p>
        </div>
        <p className="mt-6 max-w-prose text-sm">
          <Link
            href="/guides/subsea-cables"
            className="text-accent-600 hover:text-accent-700"
          >
            Read the Submarine cables guide →
          </Link>
        </p>
      </EntitySection>

      <EntitySection title="Methodology">
        <div className="max-w-prose space-y-5 text-[0.9375rem] leading-relaxed text-ink-700">
          <p>
            Singapore is plotted at the city centroid (GeoNames);
            Ashburn is plotted at the metro centroid as a proxy for the
            Virginia Beach corridor it connects to inland. v1 does not
            distinguish between landing stations and the metros they
            backhaul into — that resolution requires dated landing-
            station entity records which Radar has not yet ingested.
          </p>
          <p>
            Cable polyline data (the cable route itself) is also
            intentionally omitted in v1. Drawing polylines without
            verified landing-station coordinates on both ends would
            misrepresent the geography. Polylines arrive in a future
            phase alongside the cable-system entity records.
          </p>
        </div>
      </EntitySection>

      <EntitySection title="Sources">
        <SourceFootnote citations={CITATIONS} />
      </EntitySection>

      <Script
        id="ld-map-subsea-cables"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
    </Container>
  );
}
