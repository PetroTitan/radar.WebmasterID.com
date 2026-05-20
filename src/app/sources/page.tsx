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
      <header className="border-b border-graphite-800 pb-10">
        <p className="text-xs font-medium uppercase tracking-eyebrow text-signal-orange-400">
          Source registry
        </p>
        <h1 className="mt-4 text-balance text-4xl font-semibold text-graphite-50 md:text-5xl">
          Every fact traces back to a source.
        </h1>
        <p className="mt-5 max-w-prose text-graphite-300 md:text-lg">
          The source registry is the contract behind every figure on Radar.
          Each entry is tier-assigned, license-noted, and dated by the last
          editorial review.
        </p>
        <p className="mt-4 text-sm text-graphite-500">
          Registry last reviewed {LAST_UPDATED}. See{" "}
          <Link
            href="/methodology#governance"
            className="text-signal-blue-300 hover:text-signal-blue-200"
          >
            source governance
          </Link>{" "}
          for the trust-tier definitions.
        </p>
      </header>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-graphite-50">Trust tiers</h2>
        <ul className="mt-4 grid gap-3 md:grid-cols-2">
          {TRUST_TIER_DEFINITIONS.map((tier) => (
            <li
              key={tier.tier}
              className="rounded-lg border border-graphite-800 bg-graphite-900/50 p-4"
            >
              <p className="font-mono text-xs uppercase text-signal-orange-400">
                {tier.tier}
              </p>
              <p className="mt-1 font-semibold text-graphite-50">{tier.label}</p>
              <p className="mt-2 text-sm text-graphite-300">{tier.description}</p>
            </li>
          ))}
        </ul>
      </section>

      {orderedCategories.map((category) => {
        const sources = byCategory.get(category) ?? [];
        return (
          <section key={category} className="mt-14">
            <h2 className="text-xl font-semibold text-graphite-50">
              {CATEGORY_LABEL[category]}
            </h2>
            <ul className="mt-6 grid gap-4 md:grid-cols-2">
              {sources.map((source) => (
                <li key={source.id} id={source.id} className="scroll-mt-24">
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
