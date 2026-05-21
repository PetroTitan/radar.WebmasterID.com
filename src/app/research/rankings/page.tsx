import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { Container } from "@/components/ui/Container";
import { QuickAnswer } from "@/components/ui/QuickAnswer";
import { buildPageMetadata } from "@/lib/metadata";
import { breadcrumbJsonLd, datasetJsonLd } from "@/lib/seo";
import { formatDisplayDate } from "@/lib/dates";
import { RANKINGS } from "@/content/rankings";

const PAGE_PATH = "/research/rankings";
const LAST_UPDATED = "2026-05-21";

export const metadata: Metadata = buildPageMetadata({
  title: "Rankings",
  description:
    "Source-cited comparative views of internet infrastructure: cloud infrastructure hubs, most connected cities, subsea connectivity, internet resilience, AI infrastructure readiness. Each ranking documents its inputs and weights.",
  path: PAGE_PATH,
  lastUpdated: LAST_UPDATED,
});

const STATUS_LABEL: Readonly<Record<string, string>> = {
  verified: "Verified",
  "methodology-in-draft": "Methodology in draft",
  "pending-dataset": "Pending verified dataset",
};

const STATUS_CLASS: Readonly<Record<string, string>> = {
  verified: "bg-accent-50 text-accent-700",
  "methodology-in-draft": "bg-amber-50 text-amber-600",
  "pending-dataset": "bg-surface-raised text-ink-500",
};

export default function RankingsIndex() {
  const ld = [
    datasetJsonLd({
      name: "Radar — Rankings",
      description: "Source-cited comparative views of internet infrastructure.",
      path: PAGE_PATH,
      keywords: ["rankings", "research", "comparative views", "infrastructure"],
    }),
    breadcrumbJsonLd([
      { name: "Research", path: "/research" },
      { name: "Rankings", path: PAGE_PATH },
    ]),
  ];

  return (
    <Container as="article">
      <header className="border-b border-line pb-12 md:pb-16">
        <p className="eyebrow text-accent-600">Research · Rankings</p>
        <h1 className="mt-6 text-balance font-display text-hero font-semibold text-ink-900">
          Comparative views, source-cited.
        </h1>
        <p className="mt-7 max-w-prose text-lead text-ink-500">
          Radar does not publish a single overall &ldquo;infrastructure
          score&rdquo;. Operators care about different dimensions; we
          rank each dimension separately, document the inputs, and
          refuse to publish numbers we cannot back to a registered
          source.
        </p>
        <p className="mt-6 max-w-prose text-sm text-ink-500">
          Updated {LAST_UPDATED}.
        </p>
      </header>

      <div className="mt-12 md:mt-16">
        <QuickAnswer
          label="Editorial posture"
          answer="Every Radar ranking publishes its inputs, source tiers, weighting, and recompute cadence before any number is published. Where the underlying dataset has not yet been ingested, the per-ranking page renders &quot;Data not yet verified.&quot; for every result cell."
        />
      </div>

      <section className="mt-14 md:mt-20">
        <ol className="divide-y divide-line">
          {RANKINGS.map((r, i) => (
            <li key={r.slug} className="py-8 first:pt-0 md:py-10">
              <Link
                href={`/research/rankings/${r.slug}`}
                className="group block"
              >
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                  <span className="font-mono text-xs tabular-nums text-ink-300">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="eyebrow text-ink-500">{r.category}</span>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[0.7rem] font-medium ${STATUS_CLASS[r.status]}`}
                  >
                    {STATUS_LABEL[r.status]}
                  </span>
                  <span className="text-xs text-ink-500">
                    Reviewed {formatDisplayDate(r.lastUpdated)}
                  </span>
                </div>
                <h2 className="mt-4 font-display text-display font-semibold text-ink-900 transition group-hover:text-accent-700">
                  {r.title}
                </h2>
                <p className="mt-4 max-w-editorial text-[1.0625rem] leading-relaxed text-ink-500">
                  {r.dek}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-ink-500 transition group-hover:gap-2.5 group-hover:text-accent-600">
                  Read ranking <span aria-hidden="true">→</span>
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-14 max-w-prose md:mt-20">
        <h2 className="font-display text-h1 font-semibold text-ink-900">
          Why no headline number
        </h2>
        <p className="mt-5 text-[0.9375rem] leading-relaxed text-ink-700">
          Composite scores hide their assumptions. A &ldquo;best country
          for internet infrastructure&rdquo; figure that collapses cloud
          presence, peering depth, cable diversity, and modernisation
          into one number is an editorial choice masquerading as a
          measurement.
        </p>
        <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink-700">
          Radar publishes each dimension on its own terms, with its own
          sources and its own cadence, and asks the reader to compose
          them as needed. The trade-offs that matter are not the same
          for a regulator, a hyperscaler architect, and a global content
          network.
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
          id={`ld-research-rankings-${i}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(node) }}
        />
      ))}
    </Container>
  );
}
