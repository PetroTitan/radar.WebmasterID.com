import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { Container } from "@/components/ui/Container";
import { QuickAnswer } from "@/components/ui/QuickAnswer";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { buildPageMetadata } from "@/lib/metadata";
import { breadcrumbJsonLd, datasetJsonLd } from "@/lib/seo";
import { DATASETS } from "@/content/datasets";
import { INDICATORS } from "@/content/indicators";
import { RANKINGS } from "@/content/rankings";

const PAGE_PATH = "/research";
const LAST_UPDATED = "2026-05-21";

export const metadata: Metadata = buildPageMetadata({
  title: "Research",
  description:
    "Radar's structured infrastructure research layer — source-cited datasets, explainable indicators, and transparent rankings. Methodology-first, no fabricated scores.",
  path: PAGE_PATH,
  lastUpdated: LAST_UPDATED,
});

export default function ResearchIndex() {
  const ld = [
    datasetJsonLd({
      name: "Radar — Research",
      description:
        "Structured infrastructure research: datasets, indicators, rankings, methodologies.",
      path: PAGE_PATH,
      keywords: ["research", "datasets", "indicators", "rankings", "methodology"],
    }),
    breadcrumbJsonLd([{ name: "Research", path: PAGE_PATH }]),
  ];

  return (
    <Container as="article">
      <header className="border-b border-line pb-12 md:pb-16">
        <p className="eyebrow text-accent-600">Research</p>
        <h1 className="mt-6 text-balance font-display text-hero font-semibold text-ink-900">
          Structured infrastructure research, transparently sourced.
        </h1>
        <p className="mt-7 max-w-prose text-lead text-ink-500">
          Radar&apos;s research layer is three connected surfaces: datasets
          (what we publish), indicators (the dimensions we measure
          along), and rankings (the comparative views built on the
          indicators). Every input is registered. Every methodology is
          published. No opaque composite scores.
        </p>
        <p className="mt-6 text-sm text-ink-500">
          Last reviewed {LAST_UPDATED}.
        </p>
      </header>

      <div className="mt-12 md:mt-16">
        <QuickAnswer
          label="What this layer is"
          answer="The research layer documents what Radar measures, where the inputs come from, and how the comparative views are built. Datasets feed indicators; indicators feed rankings. Every link in that chain publishes its methodology, its source list, and its known limitations alongside the data."
        />
      </div>

      <section className="mt-14 md:mt-20">
        <SectionHeading
          eyebrow="Surfaces"
          title="Four research entry points."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          <Card
            title={`Datasets · ${DATASETS.length}`}
            description="Source-cited dataset cards documenting what Radar publishes, the methodology used, and the registered sources behind every cell."
            href="/research/datasets"
            eyebrow="Surface · 01"
          />
          <Card
            title={`Indicators · ${INDICATORS.length}`}
            description="Single dimensions along which entities can be compared, each with a published definition, methodology, unit, and limitations."
            href="/research/indicators"
            eyebrow="Surface · 02"
          />
          <Card
            title={`Rankings · ${RANKINGS.length}`}
            description="Comparative views built on indicators. Each ranking documents its inputs, weighting, recompute cadence, and editorial status."
            href="/research/rankings"
            eyebrow="Surface · 03"
          />
          <Card
            title="Methodologies"
            description="The editorial principles, scoring approach, confidence framework and source-governance posture that underpin everything else."
            href="/research/methodologies"
            eyebrow="Surface · 04"
          />
        </div>
      </section>

      <section className="mt-14 max-w-prose md:mt-20">
        <h2 className="font-display text-h1 font-semibold text-ink-900">
          The graph
        </h2>
        <p className="mt-5 text-[0.9375rem] leading-relaxed text-ink-700">
          The four surfaces are connected. A dataset is a card; an
          indicator is built on one or more datasets; a ranking is a
          comparative view along one or more indicators. The
          methodology layer documents the editorial discipline that
          governs all of it.
        </p>
        <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink-700">
          The research layer is the reason Radar is not a single
          composite &ldquo;infrastructure score&rdquo;. Composite scores
          hide their assumptions; this structure surfaces them.
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
          id={`ld-research-${i}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(node) }}
        />
      ))}
    </Container>
  );
}
