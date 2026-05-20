import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { EmptyIndexState } from "@/components/ui/EmptyIndexState";
import { CLOUD_PROVIDERS } from "@/data";
import { buildPageMetadata } from "@/lib/metadata";
import { breadcrumbJsonLd, datasetJsonLd } from "@/lib/seo";

const PAGE_PATH = "/cloud";
const LAST_UPDATED = "2026-05-20";

export const metadata: Metadata = buildPageMetadata({
  title: "Cloud providers",
  description:
    "Cloud platform operators and their announced regions, normalised to a single schema and pinned to verified country and metro locations.",
  path: PAGE_PATH,
  lastUpdated: LAST_UPDATED,
});

export default function CloudIndex() {
  const ld = [
    datasetJsonLd({
      name: "Radar — Cloud Providers",
      description:
        "Provider-level index of hyperscale and specialist cloud platforms.",
      path: PAGE_PATH,
      keywords: ["cloud", "cloud regions", "hyperscalers", "edge"],
    }),
    breadcrumbJsonLd([{ name: "Cloud", path: PAGE_PATH }]),
  ];

  return (
    <Container as="article">
      <header className="border-b border-line pb-12 md:pb-16">
        <p className="eyebrow text-accent-600">Index · Cloud providers</p>
        <h1 className="mt-6 text-balance font-display text-hero font-semibold text-ink-900">
          Cloud regions, normalised.
        </h1>
        <p className="mt-7 max-w-prose text-lead text-ink-500">
          Provider region directories are the only authoritative public record
          of where the major clouds operate. Radar normalises them onto a
          single schema and resolves each region to a verified country and
          metro.
        </p>
        <p className="mt-6 max-w-prose text-sm text-ink-500">
          Index updated {LAST_UPDATED}. Provider records are tier-3 (vendor
          primary docs); see{" "}
          <Link
            href="/methodology"
            className="text-accent-600 hover:text-accent-700"
          >
            methodology
          </Link>
          .
        </p>
      </header>

      <section className="mt-12 md:mt-16">
        {CLOUD_PROVIDERS.length === 0 ? (
          <EmptyIndexState entity="cloud provider records" />
        ) : (
          <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {CLOUD_PROVIDERS.map((provider) => (
              <li key={provider.slug}>
                <Card
                  title={provider.name}
                  description={provider.summary}
                  href={`/cloud/${provider.slug}`}
                  eyebrow={provider.tier}
                />
              </li>
            ))}
          </ul>
        )}
      </section>

      {ld.map((node, i) => (
        <Script
          key={i}
          id={`ld-cloud-${i}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(node) }}
        />
      ))}
    </Container>
  );
}
