import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { EmptyIndexState } from "@/components/ui/EmptyIndexState";
import { COUNTRIES } from "@/data";
import { buildPageMetadata } from "@/lib/metadata";
import { breadcrumbJsonLd, datasetJsonLd } from "@/lib/seo";

const PAGE_PATH = "/countries";
const LAST_UPDATED = "2026-05-20";

export const metadata: Metadata = buildPageMetadata({
  title: "Countries",
  description:
    "Sovereign infrastructure jurisdictions in the Radar knowledge graph. Each country page resolves to its hub cities, IXPs, and announced cloud regions, with every figure source-cited.",
  path: PAGE_PATH,
  lastUpdated: LAST_UPDATED,
});

export default function CountriesIndex() {
  const ld = [
    datasetJsonLd({
      name: "Radar — Countries",
      description:
        "Country-level index of internet infrastructure jurisdictions.",
      path: PAGE_PATH,
      keywords: ["countries", "internet infrastructure", "jurisdictions"],
    }),
    breadcrumbJsonLd([{ name: "Countries", path: PAGE_PATH }]),
  ];

  return (
    <Container as="article">
      <header className="border-b border-line pb-10">
        <p className="text-xs font-medium uppercase tracking-eyebrow text-accent-600">
          Index · Countries
        </p>
        <h1 className="mt-4 text-balance text-4xl font-semibold text-ink-900 md:text-5xl">
          Countries as infrastructure jurisdictions.
        </h1>
        <p className="mt-5 max-w-prose text-ink-700 md:text-lg">
          The country is the legal and policy unit of internet infrastructure.
          Every IXP, cloud region, cable landing, and datacenter facility in the
          Radar graph resolves back to a country record.
        </p>
        <p className="mt-4 max-w-prose text-sm text-ink-9000">
          Index updated {LAST_UPDATED}. See{" "}
          <Link href="/methodology" className="text-accent-600 hover:text-accent-700">
            methodology
          </Link>{" "}
          for verification criteria.
        </p>
      </header>

      <section className="mt-10">
        {COUNTRIES.length === 0 ? (
          <EmptyIndexState entity="country records" />
        ) : (
          <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {COUNTRIES.map((country) => (
              <li key={country.slug}>
                <Card
                  title={country.name}
                  description={country.summary}
                  href={`/countries/${country.slug}`}
                  eyebrow={`${country.code} · ${country.region}`}
                />
              </li>
            ))}
          </ul>
        )}
      </section>

      {ld.map((node, i) => (
        <Script
          key={i}
          id={`ld-countries-${i}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(node) }}
        />
      ))}
    </Container>
  );
}
