import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { Container } from "@/components/ui/Container";
import { QuickAnswer } from "@/components/ui/QuickAnswer";
import { ResearchNote } from "@/components/ui/ResearchNote";
import { Card } from "@/components/ui/Card";
import { buildPageMetadata } from "@/lib/metadata";
import { breadcrumbJsonLd } from "@/lib/seo";
import { METHODOLOGY_SECTIONS } from "@/content/methodology";

const PAGE_PATH = "/research/methodologies";
const LAST_UPDATED = "2026-05-21";

export const metadata: Metadata = buildPageMetadata({
  title: "Methodologies",
  description:
    "Editorial principles, scoring approach, confidence framework and source-governance posture underpinning every Radar dataset, indicator, and ranking.",
  path: PAGE_PATH,
  lastUpdated: LAST_UPDATED,
});

export default function MethodologiesPage() {
  const ld = breadcrumbJsonLd([
    { name: "Research", path: "/research" },
    { name: "Methodologies", path: PAGE_PATH },
  ]);

  return (
    <Container as="article">
      <header className="border-b border-line pb-12 md:pb-16">
        <p className="eyebrow text-accent-600">Research · Methodologies</p>
        <h1 className="mt-6 text-balance font-display text-hero font-semibold text-ink-900">
          The editorial discipline behind every published figure.
        </h1>
        <p className="mt-7 max-w-prose text-lead text-ink-500">
          The methodology layer documents the rules that govern what
          Radar publishes: editorial principles, scoring approach,
          confidence framework, source governance, and verification
          process.
        </p>
        <p className="mt-6 text-sm text-ink-500">
          Last reviewed {LAST_UPDATED}.
        </p>
      </header>

      <div className="mt-12 md:mt-16">
        <QuickAnswer
          label="How to read this layer"
          answer="The methodology layer is the contract behind every figure on Radar. Every dataset, indicator, and ranking inherits its source-governance posture from here; every page that publishes a number traces back to one of the principles below."
        />
      </div>

      <section className="mt-14 md:mt-20">
        <h2 className="font-display text-h1 font-semibold text-ink-900">
          Sections of the methodology
        </h2>
        <p className="mt-4 max-w-prose text-[0.9375rem] leading-relaxed text-ink-700">
          The full editorial methodology is published on{" "}
          <Link
            href="/methodology"
            className="text-ink-900 underline decoration-line-strong underline-offset-4 hover:decoration-accent-400 hover:text-accent-700"
          >
            /methodology
          </Link>
          . The sections below summarise its anchors.
        </p>
        <ol className="mt-10 grid gap-5 md:grid-cols-2">
          {METHODOLOGY_SECTIONS.map((section) => (
            <li key={section.id}>
              <Card
                title={section.title}
                description={section.paragraphs[0] ?? ""}
                href={`/methodology#${section.id}`}
                eyebrow="Methodology"
              />
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-14 max-w-prose md:mt-20">
        <h2 className="font-display text-h1 font-semibold text-ink-900">
          Dispute and correction process
        </h2>
        <p className="mt-5 text-[0.9375rem] leading-relaxed text-ink-700">
          When a published value is contested, the correction path is
          editorial, not algorithmic. The dispute is recorded against
          the relevant entity record, the underlying source is
          re-verified, and (if the published value was wrong) the
          record is updated and the change documented in the entity&apos;s
          provenance log. The platform does not silently rewrite
          published facts.
        </p>
        <ResearchNote label="In practice">
          Corrections that change a published numeric value carry a
          new <code className="rounded bg-surface-subtle px-1.5 py-0.5 font-mono text-[0.85em] text-ink-700">lastUpdated</code> date on
          the entity record, which propagates through the freshness
          signals exposed to readers and crawlers.
        </ResearchNote>
      </section>

      <Script
        id="ld-research-methodologies"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
      />
    </Container>
  );
}
