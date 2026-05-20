import type { Metadata } from "next";
import Script from "next/script";
import { Container } from "@/components/ui/Container";
import { buildPageMetadata } from "@/lib/metadata";
import { breadcrumbJsonLd } from "@/lib/seo";
import {
  METHODOLOGY_LAST_UPDATED,
  METHODOLOGY_SECTIONS,
} from "@/content/methodology";

const PAGE_PATH = "/methodology";

export const metadata: Metadata = buildPageMetadata({
  title: "Methodology",
  description:
    "How Radar verifies, ranks, and publishes internet infrastructure facts. Scoring approach, confidence levels, data limitations, source governance and editorial principles.",
  path: PAGE_PATH,
  lastUpdated: METHODOLOGY_LAST_UPDATED,
});

export default function MethodologyPage() {
  const ld = breadcrumbJsonLd([{ name: "Methodology", path: PAGE_PATH }]);

  return (
    <Container as="article">
      <header className="border-b border-line pb-10">
        <p className="text-xs font-medium uppercase tracking-eyebrow text-accent-600">
          Methodology
        </p>
        <h1 className="mt-4 text-balance text-4xl font-semibold text-ink-900 md:text-5xl">
          What we publish, and what we refuse to publish.
        </h1>
        <p className="mt-5 max-w-prose text-ink-700 md:text-lg">
          The Radar methodology is the contract behind every figure on the
          platform. It governs sourcing, confidence, scoring, and the public
          editorial position when data is unknown or contested.
        </p>
        <p className="mt-4 text-sm text-ink-9000">
          Last reviewed {METHODOLOGY_LAST_UPDATED}.
        </p>
      </header>

      <nav aria-label="Methodology contents" className="mt-10">
        <p className="text-xs font-semibold uppercase tracking-eyebrow text-ink-9000">
          Contents
        </p>
        <ol className="mt-3 grid gap-2 text-sm md:grid-cols-2">
          {METHODOLOGY_SECTIONS.map((section, i) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className="text-accent-600 hover:text-accent-700"
              >
                {String(i + 1).padStart(2, "0")} · {section.title}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div className="mt-12 space-y-14">
        {METHODOLOGY_SECTIONS.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className="scroll-mt-24 max-w-prose"
          >
            <h2 className="text-2xl font-semibold text-ink-900">
              {section.title}
            </h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph} className="mt-4 text-ink-700">
                {paragraph}
              </p>
            ))}
            {section.bullets ? (
              <ul className="mt-4 space-y-2 text-ink-700">
                {section.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3">
                    <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-amber-500" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}
      </div>

      <Script
        id="ld-methodology"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
      />
    </Container>
  );
}
