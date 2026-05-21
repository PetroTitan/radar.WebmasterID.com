import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { Container } from "@/components/ui/Container";
import { buildPageMetadata } from "@/lib/metadata";
import { breadcrumbJsonLd, datasetJsonLd } from "@/lib/seo";
import { formatDisplayDate } from "@/lib/dates";
import { INDICATORS } from "@/content/indicators";

const PAGE_PATH = "/research/indicators";
const LAST_UPDATED = "2026-05-21";

export const metadata: Metadata = buildPageMetadata({
  title: "Indicators",
  description:
    "Source-cited research indicators: IXP density, cloud-region concentration, subsea connectivity, carrier neutrality, datacenter concentration, infrastructure redundancy. Each indicator documents what it measures, how, and its limitations.",
  path: PAGE_PATH,
  lastUpdated: LAST_UPDATED,
});

export default function IndicatorsIndex() {
  const ld = [
    datasetJsonLd({
      name: "Radar — Indicators",
      description: "Research indicators with published methodology and source lists.",
      path: PAGE_PATH,
      keywords: ["indicators", "research", "infrastructure metrics"],
    }),
    breadcrumbJsonLd([
      { name: "Research", path: "/research" },
      { name: "Indicators", path: PAGE_PATH },
    ]),
  ];

  return (
    <Container as="article">
      <header className="border-b border-line pb-12 md:pb-16">
        <p className="eyebrow text-accent-600">Research · Indicators</p>
        <h1 className="mt-6 text-balance font-display text-hero font-semibold text-ink-900">
          Dimensions along which infrastructure can be compared.
        </h1>
        <p className="mt-7 max-w-prose text-lead text-ink-500">
          Indicators are the dimensions along which entities can be
          compared. Each one publishes its definition, the unit it
          measures in, the methodology used to compute it, and the
          limitations a reader should keep in mind.
        </p>
        <p className="mt-6 text-sm text-ink-500">
          Last reviewed {LAST_UPDATED}.
        </p>
      </header>

      <section className="mt-12 md:mt-16">
        <ol className="divide-y divide-line">
          {INDICATORS.map((i, idx) => (
            <li key={i.slug} className="py-8 first:pt-0 md:py-10">
              <Link
                href={`/research/indicators/${i.slug}`}
                className="group block"
              >
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                  <span className="font-mono text-xs tabular-nums text-ink-300">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <span className="eyebrow text-ink-500">{i.category}</span>
                  <span className="text-xs text-ink-500">
                    Reviewed {formatDisplayDate(i.lastUpdated)}
                  </span>
                </div>
                <h2 className="mt-4 font-display text-display font-semibold text-ink-900 transition group-hover:text-accent-700">
                  {i.title}
                </h2>
                <p className="mt-4 max-w-editorial text-[1.0625rem] leading-relaxed text-ink-500">
                  {i.dek}
                </p>
                <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-line bg-surface-subtle px-3 py-1 text-[0.7rem] font-medium text-ink-700">
                  <span aria-hidden="true">Unit:</span>
                  <span className="font-mono">{i.unit}</span>
                </div>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      {ld.map((node, idx) => (
        <Script
          key={idx}
          id={`ld-research-indicators-${idx}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(node) }}
        />
      ))}
    </Container>
  );
}
