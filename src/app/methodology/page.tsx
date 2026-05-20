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
      <header className="border-b border-line pb-12 md:pb-16">
        <p className="eyebrow text-accent-600">Methodology</p>
        <h1 className="mt-6 text-balance font-display text-hero font-semibold text-ink-900">
          What we publish, and what we refuse to publish.
        </h1>
        <p className="mt-7 max-w-prose text-lead text-ink-500">
          The Radar methodology is the contract behind every figure on the
          platform. It governs sourcing, confidence, scoring, and the public
          editorial position when data is unknown or contested.
        </p>
        <p className="mt-6 text-sm text-ink-500">
          Last reviewed {METHODOLOGY_LAST_UPDATED}.
        </p>
      </header>

      <div className="mt-12 grid gap-12 md:mt-16 md:grid-cols-12 md:gap-16">
        <nav
          aria-label="Methodology contents"
          className="md:col-span-4 lg:col-span-3"
        >
          <div className="md:sticky md:top-28">
            <p className="eyebrow text-ink-500">Contents</p>
            <ol className="mt-5 space-y-3 text-sm">
              {METHODOLOGY_SECTIONS.map((section, i) => (
                <li key={section.id} className="flex gap-3">
                  <span className="font-mono text-xs tabular-nums text-ink-300">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <a
                    href={`#${section.id}`}
                    className="text-ink-700 transition hover:text-accent-700"
                  >
                    {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </nav>

        <div className="md:col-span-8 lg:col-span-9">
          <div className="space-y-16 md:space-y-20">
            {METHODOLOGY_SECTIONS.map((section, i) => (
              <section
                key={section.id}
                id={section.id}
                className="scroll-mt-28 max-w-prose"
              >
                <p className="font-mono text-xs tabular-nums uppercase text-ink-300">
                  Section {String(i + 1).padStart(2, "0")}
                </p>
                <h2 className="mt-3 font-display text-h1 font-semibold text-ink-900">
                  {section.title}
                </h2>
                {section.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="mt-5 text-[0.9375rem] leading-relaxed text-ink-700"
                  >
                    {paragraph}
                  </p>
                ))}
                {section.bullets ? (
                  <ul className="mt-6 space-y-3 text-[0.9375rem] leading-relaxed text-ink-700">
                    {section.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-3">
                        <span
                          aria-hidden="true"
                          className="mt-[0.55rem] size-1.5 shrink-0 rounded-full bg-amber-500"
                        />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>
        </div>
      </div>

      <Script
        id="ld-methodology"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
      />
    </Container>
  );
}
