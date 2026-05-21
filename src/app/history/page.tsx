import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { Container } from "@/components/ui/Container";
import { QuickAnswer } from "@/components/ui/QuickAnswer";
import { HISTORY_PAGES } from "@/content/history";
import { buildPageMetadata } from "@/lib/metadata";
import { breadcrumbJsonLd } from "@/lib/seo";
import { formatDisplayDate } from "@/lib/dates";

const PAGE_PATH = "/history";
const LAST_UPDATED = "2026-05-25";

export const metadata: Metadata = buildPageMetadata({
  title: "Historical infrastructure intelligence",
  description:
    "Source-bound histories of the infrastructure events that shaped the modern internet — the early commercial Network Access Points, the founding of the European member-owned IXPs, the transatlantic submarine-cable corridor, and how they explain the present footprint.",
  path: PAGE_PATH,
  lastUpdated: LAST_UPDATED,
});

export default function HistoryIndex() {
  const ld = breadcrumbJsonLd([{ name: "History", path: PAGE_PATH }]);

  return (
    <Container as="article">
      <header className="border-b border-line pb-12 md:pb-16">
        <p className="eyebrow text-accent-600">History</p>
        <h1 className="mt-6 text-balance font-display text-hero font-semibold text-ink-900">
          Historical infrastructure intelligence.
        </h1>
        <p className="mt-7 max-w-editorial text-lead text-ink-500">
          Analytical histories of the infrastructure events that
          shaped the modern internet. Each page is source-bound and
          editorially reviewed; capacity figures, ranking labels,
          and speculative geopolitical claims are deliberately
          excluded.
        </p>
        <p className="mt-6 text-sm text-ink-500">
          Last reviewed {LAST_UPDATED}.
        </p>
      </header>

      <div className="mt-12 md:mt-16">
        <QuickAnswer
          label="Editorial posture"
          answer="History pages explain how a piece of infrastructure came to be, what milestones marked its evolution, and what that evolution implies about the present footprint. They cite primary sources — NSF, FCC, IEEE, Internet Hall of Fame, operator primary docs, TeleGeography historical reporting — and explicitly refuse to publish &quot;biggest / first / largest&quot; claims that the underlying sources don't consistently support."
        />
      </div>

      <section className="mt-14 md:mt-20">
        <p className="eyebrow text-ink-500">Pages · {HISTORY_PAGES.length}</p>
        <ol className="mt-8 divide-y divide-line border-y border-line">
          {HISTORY_PAGES.map((page, i) => (
            <li key={page.slug} className="py-6 md:py-8">
              <Link
                href={`/history/${page.slug}`}
                className="group flex flex-wrap items-baseline gap-x-4 gap-y-2"
              >
                <span className="font-mono text-xs tabular-nums text-ink-300">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="eyebrow text-ink-500">{page.period}</span>
                <span className="basis-full" />
                <span className="font-display text-h3 font-semibold text-ink-900 transition group-hover:text-accent-700">
                  {page.title}
                </span>
                <span className="basis-full" />
                <p className="max-w-prose text-[0.9375rem] leading-relaxed text-ink-500">
                  {page.dek}
                </p>
                <span className="basis-full" />
                <p className="text-xs text-ink-500">
                  Last reviewed {formatDisplayDate(page.lastUpdated)}
                </p>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <Script
        id="ld-history-index"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
      />
    </Container>
  );
}
