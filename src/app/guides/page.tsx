import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { Container } from "@/components/ui/Container";
import { buildPageMetadata } from "@/lib/metadata";
import { breadcrumbJsonLd, datasetJsonLd } from "@/lib/seo";
import { formatDisplayDate } from "@/lib/dates";
import { GUIDES } from "@/content/guides";

const PAGE_PATH = "/guides";

const lastReviewedAt =
  GUIDES.reduce<string>(
    (latest, guide) =>
      guide.lastUpdated > latest ? guide.lastUpdated : latest,
    "0",
  ) || "2026-05-20";

export const metadata: Metadata = buildPageMetadata({
  title: "Guides",
  description:
    "Authority reference guides on internet infrastructure — Internet Exchange Points, cloud regions, submarine cables, datacenter hubs, and AI infrastructure. Source-cited, citation-ready, reviewed.",
  path: PAGE_PATH,
  lastUpdated: lastReviewedAt,
});

export default function GuidesIndex() {
  const ld = [
    datasetJsonLd({
      name: "Radar — Guides",
      description:
        "Authority reference guides on internet infrastructure. Each guide carries a structured definition, key takeaways, citation-friendly summary, and full source list.",
      path: PAGE_PATH,
      keywords: [
        "internet exchange",
        "cloud regions",
        "submarine cables",
        "datacenter hubs",
        "AI infrastructure",
      ],
    }),
    breadcrumbJsonLd([{ name: "Guides", path: PAGE_PATH }]),
  ];

  return (
    <Container as="article">
      <header className="border-b border-line pb-12 md:pb-16">
        <p className="eyebrow text-accent-600">Guides</p>
        <h1 className="mt-6 text-balance font-display text-hero font-semibold text-ink-900">
          Authority reference for the infrastructure that runs the internet.
        </h1>
        <p className="mt-7 max-w-prose text-lead text-ink-500">
          Source-cited explainers on the building blocks of internet
          infrastructure: Internet Exchange Points, cloud regions, submarine
          cables, datacenter hubs, and AI capacity. Each guide opens with a
          definitive single-paragraph answer and a structured summary, then
          works through the topic in depth.
        </p>
        <p className="mt-6 text-sm text-ink-500">
          Most recent review {formatDisplayDate(lastReviewedAt)}.
        </p>
      </header>

      <section className="mt-12 md:mt-16">
        <ol className="divide-y divide-line">
          {GUIDES.map((guide, i) => (
            <li key={guide.slug} className="py-8 first:pt-0 md:py-10">
              <Link href={`/guides/${guide.slug}`} className="group block">
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-xs tabular-nums text-ink-300">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="eyebrow text-ink-500">
                    Reviewed {formatDisplayDate(guide.lastUpdated)}
                  </span>
                </div>
                <h2 className="mt-4 font-display text-display font-semibold text-ink-900 transition group-hover:text-accent-700">
                  {guide.title}
                </h2>
                <p className="mt-4 max-w-editorial text-[1.0625rem] leading-relaxed text-ink-500">
                  {guide.dek}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-ink-500 transition group-hover:gap-2.5 group-hover:text-accent-600">
                  Read guide <span aria-hidden="true">→</span>
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      {ld.map((node, i) => (
        <Script
          key={i}
          id={`ld-guides-${i}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(node) }}
        />
      ))}
    </Container>
  );
}
