import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { Container } from "@/components/ui/Container";
import { buildPageMetadata } from "@/lib/metadata";
import { breadcrumbJsonLd, datasetJsonLd } from "@/lib/seo";
import { formatDisplayDate } from "@/lib/dates";
import { INSIGHTS, listInsightsByDate } from "@/content/insights";

const PAGE_PATH = "/insights";

const lastPublishedAt =
  INSIGHTS.reduce<string>(
    (latest, insight) =>
      insight.lastUpdated > latest ? insight.lastUpdated : latest,
    "0",
  ) || "2026-05-20";

export const metadata: Metadata = buildPageMetadata({
  title: "Insights",
  description:
    "Editorial infrastructure explainers from Radar WebmasterID. Source-cited essays on internet exchanges, cloud regions, submarine cables, and the metros that anchor the global internet.",
  path: PAGE_PATH,
  lastUpdated: lastPublishedAt,
});

export default function InsightsIndex() {
  const insights = listInsightsByDate();
  const ld = [
    datasetJsonLd({
      name: "Radar — Insights",
      description:
        "Editorial infrastructure explainers, source-cited, with documented review dates.",
      path: PAGE_PATH,
      keywords: [
        "infrastructure intelligence",
        "internet exchange",
        "cloud regions",
        "submarine cables",
        "FLAP",
      ],
    }),
    breadcrumbJsonLd([{ name: "Insights", path: PAGE_PATH }]),
  ];

  return (
    <Container as="article">
      <header className="border-b border-line pb-12 md:pb-16">
        <p className="eyebrow text-accent-600">Insights</p>
        <h1 className="mt-6 text-balance font-display text-hero font-semibold text-ink-900">
          Editorial explainers on the infrastructure that runs the internet.
        </h1>
        <p className="mt-7 max-w-prose text-lead text-ink-500">
          Long-form, source-cited essays on internet exchanges, cloud regions,
          submarine cables, and the metros that anchor the global internet.
          Every claim traces to a registered source; no live charts, no
          invented metrics.
        </p>
        <p className="mt-6 text-sm text-ink-500">
          Most recent update {formatDisplayDate(lastPublishedAt)}.
        </p>
      </header>

      <section className="mt-12 md:mt-16">
        <ol className="divide-y divide-line">
          {insights.map((insight, i) => (
            <li key={insight.slug} className="py-8 first:pt-0 md:py-10">
              <Link
                href={`/insights/${insight.slug}`}
                className="group block"
              >
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-xs tabular-nums text-ink-300">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="eyebrow text-ink-500">
                    {formatDisplayDate(insight.publishedAt)}
                  </span>
                </div>
                <h2 className="mt-4 font-display text-display font-semibold text-ink-900 transition group-hover:text-accent-700">
                  {insight.title}
                </h2>
                <p className="mt-4 max-w-editorial text-[1.0625rem] leading-relaxed text-ink-500">
                  {insight.dek}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-ink-500 transition group-hover:gap-2.5 group-hover:text-accent-600">
                  Read insight <span aria-hidden="true">→</span>
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      {ld.map((node, i) => (
        <Script
          key={i}
          id={`ld-insights-${i}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(node) }}
        />
      ))}
    </Container>
  );
}
