import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { QuickAnswer } from "@/components/ui/QuickAnswer";
import { Card } from "@/components/ui/Card";
import { buildPageMetadata } from "@/lib/metadata";
import { breadcrumbJsonLd, datasetJsonLd } from "@/lib/seo";
import { INFRASTRUCTURE_MAPS, LEGACY_ENTITY_MAPS } from "@/content/maps";

const PAGE_PATH = "/maps";
const LAST_UPDATED = "2026-05-28";

export const metadata: Metadata = buildPageMetadata({
  title: "Infrastructure maps",
  description:
    "Editorial-quality geographic views of internet infrastructure: cloud regions, Internet Exchange Points, datacenters, submarine cables, and topology corridors. Lightweight, source-bound, server-rendered.",
  path: PAGE_PATH,
  lastUpdated: LAST_UPDATED,
});

export default function MapsIndex() {
  const ld = [
    datasetJsonLd({
      name: "Radar — Infrastructure maps",
      description:
        "Editorial geographic views of internet infrastructure, source-bound and server-rendered.",
      path: PAGE_PATH,
      keywords: ["maps", "geographic intelligence", "infrastructure"],
    }),
    breadcrumbJsonLd([{ name: "Maps", path: PAGE_PATH }]),
  ];

  return (
    <Container as="article">
      <header className="border-b border-line pb-12 md:pb-16">
        <p className="eyebrow text-accent-600">Maps</p>
        <h1 className="mt-6 text-balance font-display text-hero font-semibold text-ink-900">
          Geographic views of verified infrastructure.
        </h1>
        <p className="mt-7 max-w-prose text-lead text-ink-500">
          Four editorial maps. Each one plots only entities Radar has
          editorially verified against a registered source, with the
          coordinates and the cited source documented below the map.
        </p>
        <p className="mt-6 text-sm text-ink-500">
          Most recent review {LAST_UPDATED}.
        </p>
      </header>

      <div className="mt-12 md:mt-16">
        <QuickAnswer
          label="What you'll find"
          answer="Lightweight server-rendered SVG maps on an abstract longitude / latitude grid. No tile servers, no API keys, no JavaScript hydration. Every plotted point cites a source — usually PeeringDB, TeleGeography, GeoNames, or the relevant hyperscaler's published region directory."
        />
      </div>

      <section className="mt-14 md:mt-20">
        <p className="eyebrow text-ink-500">
          Editorial topology maps · {INFRASTRUCTURE_MAPS.length}
        </p>
        <p className="mt-3 max-w-prose text-[0.9375rem] leading-relaxed text-ink-700">
          Corridor, clustering, and ecosystem diagrams. Each map
          ships with explicit methodology and caveats and is anchored
          to a verified self-authored SVG asset in the media registry.
        </p>
        <ol className="mt-8 grid gap-5 md:grid-cols-2">
          {INFRASTRUCTURE_MAPS.map((m, i) => (
            <li key={m.slug}>
              <Card
                title={m.title}
                description={m.dek}
                href={`/maps/${m.slug}`}
                eyebrow={`Topology · ${String(i + 1).padStart(2, "0")} · ${m.category}`}
              />
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-14 md:mt-20">
        <p className="eyebrow text-ink-500">
          Entity maps · {LEGACY_ENTITY_MAPS.length}
        </p>
        <p className="mt-3 max-w-prose text-[0.9375rem] leading-relaxed text-ink-700">
          Each entity map plots every reviewed entity in the
          corresponding registry on an abstract longitude / latitude
          grid. The coordinates and sources cite back to the entity
          records themselves.
        </p>
        <ol className="mt-8 grid gap-5 md:grid-cols-2">
          {LEGACY_ENTITY_MAPS.map((m, i) => (
            <li key={m.slug}>
              <Card
                title={m.title}
                description={m.dek}
                href={`/maps/${m.slug}`}
                eyebrow={`Entity map · ${String(i + 1).padStart(2, "0")} · ${m.category}`}
              />
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-14 max-w-prose md:mt-20">
        <h2 className="font-display text-h1 font-semibold text-ink-900">
          Why these maps look this way
        </h2>
        <p className="mt-5 text-[0.9375rem] leading-relaxed text-ink-700">
          Radar&apos;s first map layer is intentionally minimal. The aesthetic
          is closer to academic infrastructure cartography than to a live
          operations dashboard: an abstract grid, restrained nodes,
          labelled legibly, and every point published alongside its
          source row in the table beneath the map. No tiles, no
          telemetry, no animation.
        </p>
        <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink-700">
          The trade-off is conscious. Tile-based interactive maps look
          impressive but introduce ~200 KB of WebGL, depend on third-party
          tile providers, and visually clash with the platform&apos;s editorial
          tone. Where pan / zoom interaction becomes valuable in a later
          phase, it can be added behind a dynamic import without
          disturbing the underlying entity geo data.
        </p>
        <p className="mt-6 text-sm">
          <Link
            href="/methodology"
            className="text-accent-600 hover:text-accent-700"
          >
            Read the editorial methodology →
          </Link>
        </p>
      </section>

      {ld.map((node, i) => (
        <Script
          key={i}
          id={`ld-maps-${i}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(node) }}
        />
      ))}
    </Container>
  );
}
