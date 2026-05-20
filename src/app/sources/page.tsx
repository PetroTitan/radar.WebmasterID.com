import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SourceCard } from "@/components/ui/SourceCard";
import { buildPageMetadata } from "@/lib/metadata";
import { breadcrumbJsonLd } from "@/lib/seo";
import { SOURCE_REGISTRY, TRUST_TIER_DEFINITIONS } from "@/source-registry";
import type { SourceCategory } from "@/entities";

const PAGE_PATH = "/sources";
const LAST_UPDATED = "2026-05-20";

export const metadata: Metadata = buildPageMetadata({
  title: "Sources",
  description:
    "The Radar source registry. Every published fact traces back to one of these entries: RIPE, PeeringDB, Cloudflare Radar, the World Bank, ITU, OECD, Eurostat, ICANN, IANA, TeleGeography.",
  path: PAGE_PATH,
  lastUpdated: LAST_UPDATED,
});

const CATEGORY_LABEL: Readonly<Record<SourceCategory, string>> = {
  registry: "Registries",
  measurement: "Measurement networks",
  intergovernmental: "Intergovernmental",
  regulator: "Regulators",
  industry: "Industry",
  research: "Research",
  vendor: "Vendor",
};

export default function SourcesPage() {
  const ld = breadcrumbJsonLd([{ name: "Sources", path: PAGE_PATH }]);

  const byCategory = new Map<SourceCategory, typeof SOURCE_REGISTRY[number][]>();
  for (const source of SOURCE_REGISTRY) {
    const existing = byCategory.get(source.category) ?? [];
    existing.push(source);
    byCategory.set(source.category, existing);
  }
  const orderedCategories = Array.from(byCategory.keys()).sort((a, b) =>
    CATEGORY_LABEL[a].localeCompare(CATEGORY_LABEL[b]),
  );

  return (
    <Container as="article">
      <header className="border-b border-line pb-12 md:pb-16">
        <p className="eyebrow text-accent-600">Source registry</p>
        <h1 className="mt-6 text-balance font-display text-hero font-semibold text-ink-900">
          Every fact traces back to a source.
        </h1>
        <p className="mt-7 max-w-prose text-lead text-ink-500">
          The source registry is the contract behind every figure on Radar.
          Each entry is tier-assigned, license-noted, and dated by the last
          editorial review.
        </p>
        <p className="mt-6 text-sm text-ink-500">
          Registry last reviewed {LAST_UPDATED}. See{" "}
          <Link
            href="/methodology#governance"
            className="text-accent-600 hover:text-accent-700"
          >
            source governance
          </Link>{" "}
          for the trust-tier definitions.
        </p>
      </header>

      <section className="mt-14 md:mt-20">
        <h2 className="font-display text-h2 font-semibold text-ink-900">
          Trust tiers
        </h2>
        <p className="mt-3 max-w-prose text-[0.9375rem] leading-relaxed text-ink-500">
          Five tiers grade every source. Anything published on Radar must cite
          at least one tier-1, tier-2, or tier-3 source.
        </p>
        <ol className="mt-8 divide-y divide-line/70 rounded-card border border-line bg-surface-base">
          {TRUST_TIER_DEFINITIONS.map((tier) => (
            <li
              key={tier.tier}
              className="grid gap-2 px-6 py-5 sm:grid-cols-[10rem_minmax(0,1fr)] sm:items-baseline sm:gap-6 sm:px-8"
            >
              <div>
                <p className="font-mono text-[0.7rem] uppercase tracking-wider text-amber-600">
                  {tier.tier}
                </p>
                <p className="mt-1 font-medium text-ink-900">{tier.label}</p>
              </div>
              <p className="text-[0.9375rem] leading-relaxed text-ink-500">
                {tier.description}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {orderedCategories.map((category) => {
        const sources = byCategory.get(category) ?? [];
        return (
          <section key={category} className="mt-14 md:mt-20">
            <h2 className="font-display text-h2 font-semibold text-ink-900">
              {CATEGORY_LABEL[category]}
            </h2>
            <ul className="mt-8 grid gap-5 md:grid-cols-2">
              {sources.map((source) => (
                <li key={source.id} id={source.id} className="scroll-mt-28">
                  <SourceCard source={source} />
                </li>
              ))}
            </ul>
          </section>
        );
      })}

      <Script
        id="ld-sources"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
      />
    </Container>
  );
}
