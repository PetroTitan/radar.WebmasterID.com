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
      <header className="border-b border-graphite-800 pb-10">
        <p className="text-xs font-medium uppercase tracking-eyebrow text-signal-orange-400">
          Index · Cloud providers
        </p>
        <h1 className="mt-4 text-balance text-4xl font-semibold text-graphite-50 md:text-5xl">
          Cloud regions, normalised.
        </h1>
        <p className="mt-5 max-w-prose text-graphite-300 md:text-lg">
          Provider region directories are the only authoritative public record
          of where the major clouds operate. Radar normalises them onto a single
          schema and resolves each region to a verified country and metro.
        </p>
        <p className="mt-4 max-w-prose text-sm text-graphite-500">
          Index updated {LAST_UPDATED}. Provider records are tier-3 (vendor
          primary docs); see{" "}
          <Link href="/methodology" className="text-signal-blue-300 hover:text-signal-blue-200">
            methodology
          </Link>.
        </p>
      </header>

      <section className="mt-10">
        {CLOUD_PROVIDERS.length === 0 ? (
          <EmptyIndexState entity="cloud provider records" />
        ) : (
          <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
