import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { Container } from "@/components/ui/Container";
import { buildPageMetadata } from "@/lib/metadata";
import { breadcrumbJsonLd, datasetJsonLd } from "@/lib/seo";
import { formatDisplayDate } from "@/lib/dates";
import { DATASETS } from "@/content/datasets";

const PAGE_PATH = "/research/datasets";
const LAST_UPDATED = "2026-05-21";

export const metadata: Metadata = buildPageMetadata({
  title: "Datasets",
  description:
    "Source-cited dataset cards: global cloud regions, Internet Exchange Point hubs, submarine cable landings, AI infrastructure regions. Every card documents methodology, sources, status and limitations.",
  path: PAGE_PATH,
  lastUpdated: LAST_UPDATED,
});

const STATUS_LABEL: Readonly<Record<string, string>> = {
  complete: "Complete",
  partial: "Partial",
  pending: "Pending",
};

const STATUS_CLASS: Readonly<Record<string, string>> = {
  complete: "bg-accent-50 text-accent-700",
  partial: "bg-amber-50 text-amber-600",
  pending: "bg-surface-raised text-ink-500",
};

export default function DatasetsIndex() {
  const ld = [
    datasetJsonLd({
      name: "Radar — Datasets",
      description: "Source-cited infrastructure dataset cards.",
      path: PAGE_PATH,
      keywords: ["datasets", "infrastructure", "cloud regions", "IXPs", "submarine cables"],
    }),
    breadcrumbJsonLd([
      { name: "Research", path: "/research" },
      { name: "Datasets", path: PAGE_PATH },
    ]),
  ];

  return (
    <Container as="article">
      <header className="border-b border-line pb-12 md:pb-16">
        <p className="eyebrow text-accent-600">Research · Datasets</p>
        <h1 className="mt-6 text-balance font-display text-hero font-semibold text-ink-900">
          What Radar measures, and where the inputs come from.
        </h1>
        <p className="mt-7 max-w-prose text-lead text-ink-500">
          Each dataset card documents what Radar would publish on a
          given topic, the registered sources it draws from, the
          methodology used to compile it, and the limitations of the
          current state.
        </p>
        <p className="mt-6 text-sm text-ink-500">
          Last reviewed {LAST_UPDATED}.
        </p>
      </header>

      <section className="mt-12 md:mt-16">
        <ol className="divide-y divide-line">
          {DATASETS.map((d, i) => (
            <li key={d.slug} className="py-8 first:pt-0 md:py-10">
              <Link href={`/research/datasets/${d.slug}`} className="group block">
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                  <span className="font-mono text-xs tabular-nums text-ink-300">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="eyebrow text-ink-500">{d.category}</span>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[0.7rem] font-medium ${STATUS_CLASS[d.status]}`}
                  >
                    {STATUS_LABEL[d.status]}
                  </span>
                  <span className="text-xs text-ink-500">
                    Reviewed {formatDisplayDate(d.lastUpdated)}
                  </span>
                </div>
                <h2 className="mt-4 font-display text-display font-semibold text-ink-900 transition group-hover:text-accent-700">
                  {d.title}
                </h2>
                <p className="mt-4 max-w-editorial text-[1.0625rem] leading-relaxed text-ink-500">
                  {d.dek}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-ink-500 transition group-hover:gap-2.5 group-hover:text-accent-600">
                  Read dataset card <span aria-hidden="true">→</span>
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      {ld.map((node, i) => (
        <Script
          key={i}
          id={`ld-research-datasets-${i}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(node) }}
        />
      ))}
    </Container>
  );
}
