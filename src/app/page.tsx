import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { buildPageMetadata } from "@/lib/metadata";
import { datasetJsonLd } from "@/lib/seo";
import { SITE } from "@/config/site";
import { SOURCE_REGISTRY } from "@/source-registry";
import { COUNTRIES, CITIES, IXPS } from "@/data";
import {
  METHODOLOGY_LAST_UPDATED,
  METHODOLOGY_SECTIONS,
} from "@/content/methodology";

const HOMEPAGE_UPDATED = "2026-05-20";

export const metadata: Metadata = buildPageMetadata({
  title: `${SITE.name} — ${SITE.tagline}`,
  description: SITE.description,
  path: "/",
  lastUpdated: HOMEPAGE_UPDATED,
});

const INTELLIGENCE_OVERVIEW = [
  {
    title: "Geography",
    description:
      "Countries and metros as the primary axis. Every other entity resolves back to a verified location.",
    href: "/countries",
  },
  {
    title: "Cloud regions",
    description:
      "Provider-published region directories, normalised to a single schema and pinned to a country/metro.",
    href: "/cloud",
  },
  {
    title: "Internet Exchanges",
    description:
      "IXP identity records sourced from PeeringDB and operator pages. Volatile metrics live separately.",
    href: "/ixps",
  },
  {
    title: "Rankings",
    description:
      "Source-cited comparative views. Each ranked dimension documents its inputs, weights, and freshness.",
    href: "/rankings",
  },
] as const;

const FEATURED_RANKINGS = [
  {
    title: "Cloud region density",
    description:
      "Countries by count of hyperscaler-announced cloud regions hosted on national soil.",
    eyebrow: "Index · pending data ingestion",
  },
  {
    title: "Peering depth",
    description:
      "Metros ranked by connected-networks count at the largest local IXP, drawn from PeeringDB.",
    eyebrow: "Index · pending data ingestion",
  },
  {
    title: "Submarine cable diversity",
    description:
      "Countries by count of distinct in-service cable landings, sourced from TeleGeography.",
    eyebrow: "Index · pending data ingestion",
  },
] as const;

const FEATURED_REPORTS = [
  {
    title: "AI infrastructure readiness",
    description:
      "How national infrastructure stacks measure against the demands of large-scale AI workloads. Sources under review.",
    eyebrow: "Forthcoming",
  },
  {
    title: "Subsea cable resilience",
    description:
      "Concentration risk on the world's busiest cable corridors. Methodology drafted; ingest in progress.",
    eyebrow: "Forthcoming",
  },
] as const;

export default function HomePage() {
  const overviewLd = datasetJsonLd({
    name: SITE.name,
    description: SITE.description,
    path: "/",
    keywords: [
      "internet infrastructure",
      "cloud regions",
      "internet exchange points",
      "subsea cables",
      "datacenters",
      "internet resilience",
      "AI infrastructure",
    ],
  });

  return (
    <>
      <Hero />
      <FeaturedHubs />
      <IntelligenceOverview />
      <FeaturedRankings />
      <FeaturedReports />
      <FeaturedMaps />
      <SourceTransparency />
      <MethodologyPreview />
      <InternalLinking />
      <Script
        id="ld-homepage-dataset"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(overviewLd) }}
      />
    </>
  );
}

function Hero() {
  return (
    <Container as="section" className="pt-2 pb-section">
      <div className="grid items-start gap-16 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="text-xs font-semibold uppercase tracking-eyebrow text-accent-600">
            Infrastructure Intelligence
          </p>
          <h1 className="mt-5 text-balance font-display text-hero font-semibold text-ink-900">
            Understand the infrastructure that connects the world.
          </h1>
          <p className="mt-7 max-w-prose text-lg leading-relaxed text-ink-500 md:text-xl">
            Verified, source-governed data on cloud regions, Internet Exchanges,
            datacenters, subsea cables, and the institutions that operate them.
            Every fact is cited. Where data is absent, we say so.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/countries"
              className="inline-flex items-center rounded-md bg-accent-600 px-4 py-2.5 text-sm font-medium text-white shadow-card transition hover:bg-accent-700"
            >
              Explore the graph
            </Link>
            <Link
              href="/methodology"
              className="inline-flex items-center rounded-md border border-line px-4 py-2.5 text-sm font-medium text-ink-700 transition hover:border-line-strong hover:text-ink-900"
            >
              Read the methodology
            </Link>
          </div>
        </div>
        <aside className="lg:col-span-5">
          <div className="rounded-card border border-line bg-surface-subtle p-8">
            <p className="text-xs font-semibold uppercase tracking-eyebrow text-ink-500">
              Knowledge graph · live
            </p>
            <dl className="mt-6 grid grid-cols-3 gap-x-6 gap-y-6">
              <Stat label="Countries" value={COUNTRIES.length} />
              <Stat label="Metros" value={CITIES.length} />
              <Stat label="IXPs" value={IXPS.length} />
              <Stat label="Sources" value={SOURCE_REGISTRY.length} />
              <Stat label="Cloud regions" value="—" hint="pending" />
              <Stat label="Cables" value="—" hint="pending" />
            </dl>
            <p className="mt-7 text-xs leading-relaxed text-ink-500">
              Counts reflect verified records currently in the knowledge graph.
              Pending fields await editorial review against registered sources.
            </p>
          </div>
        </aside>
      </div>
    </Container>
  );
}

function Stat({
  label,
  value,
  hint,
}: {
  readonly label: string;
  readonly value: number | string;
  readonly hint?: string;
}) {
  return (
    <div>
      <dt className="text-xs font-medium uppercase tracking-eyebrow text-ink-500">
        {label}
      </dt>
      <dd className="mt-1.5 font-display text-2xl font-semibold text-ink-900">
        {value}
      </dd>
      {hint ? (
        <p className="mt-0.5 text-xs italic text-ink-300">{hint}</p>
      ) : null}
    </div>
  );
}

function FeaturedHubs() {
  const featured = CITIES;
  if (featured.length === 0) return null;
  return (
    <Container as="section" className="py-section">
      <SectionHeading
        eyebrow="Featured infrastructure hubs"
        title="The metros that move the internet."
        description="Most global traffic concentrates in fewer than thirty cities. These are the anchors of the graph."
      />
      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {featured.map((city) => (
          <Card
            key={city.slug}
            title={city.name}
            description={city.summary}
            href={`/cities/${city.slug}`}
            eyebrow={`${city.countryCode} · Hub metro`}
          />
        ))}
      </div>
    </Container>
  );
}

function IntelligenceOverview() {
  return (
    <Container as="section" className="py-section">
      <SectionHeading
        eyebrow="Infrastructure intelligence"
        title="Four axes, one graph."
        description="Radar resolves every record onto geography, cloud, interconnection, and ranked comparisons — without collapsing them into a single contrived score."
      />
      <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {INTELLIGENCE_OVERVIEW.map((axis) => (
          <Card key={axis.href} {...axis} eyebrow="Axis" />
        ))}
      </div>
    </Container>
  );
}

function FeaturedRankings() {
  return (
    <Container as="section" className="py-section">
      <SectionHeading
        eyebrow="Featured rankings"
        title="Source-cited comparative views."
        description={
          <>
            Each ranking publishes its inputs, weights, and last-recomputed date.{" "}
            <Link
              href="/rankings"
              className="text-accent-600 hover:text-accent-700"
            >
              See all rankings →
            </Link>
          </>
        }
      />
      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {FEATURED_RANKINGS.map((ranking) => (
          <Card
            key={ranking.title}
            title={ranking.title}
            description={ranking.description}
            eyebrow={ranking.eyebrow}
          />
        ))}
      </div>
    </Container>
  );
}

function FeaturedReports() {
  return (
    <Container as="section" className="py-section">
      <SectionHeading
        eyebrow="Featured reports"
        title="Editorial work, ingest-ready."
      />
      <div className="mt-12 grid gap-5 md:grid-cols-2">
        {FEATURED_REPORTS.map((report) => (
          <Card
            key={report.title}
            title={report.title}
            description={report.description}
            eyebrow={report.eyebrow}
          />
        ))}
      </div>
    </Container>
  );
}

function FeaturedMaps() {
  return (
    <Container as="section" className="py-section">
      <SectionHeading
        eyebrow="Maps"
        title="A map layer is on the way."
        description="The graph is built map-ready: cities carry coordinates, cables carry landings, regions carry country anchors. Cartography ships once the underlying data passes verification."
      />
      <div className="mt-12 rounded-card border border-dashed border-line-strong bg-surface-subtle p-14 text-center">
        <p className="text-xs font-semibold uppercase tracking-eyebrow text-ink-500">
          Map module
        </p>
        <p className="mt-3 text-ink-700">Data not yet verified.</p>
      </div>
    </Container>
  );
}

function SourceTransparency() {
  const topSources = SOURCE_REGISTRY.slice(0, 6);
  return (
    <Container as="section" className="py-section">
      <SectionHeading
        eyebrow="Source transparency"
        title="Every value traces back to a registered source."
        description={
          <>
            Sources are tier-assigned, license-noted, and dated. The full
            registry lives on{" "}
            <Link href="/sources" className="text-accent-600 hover:text-accent-700">
              /sources
            </Link>
            .
          </>
        }
      />
      <ul className="mt-12 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {topSources.map((source) => (
          <li key={source.id}>
            <Link
              href={`/sources#${source.id}`}
              className="group flex items-center justify-between gap-3 rounded-card border border-line bg-surface-base px-5 py-4 transition hover:border-accent-200"
            >
              <span>
                <span className="block font-medium text-ink-900 group-hover:text-accent-700">
                  {source.name}
                </span>
                <span className="mt-0.5 block text-xs uppercase tracking-eyebrow text-ink-500">
                  {source.category}
                </span>
              </span>
              <span className="font-mono text-xs uppercase text-amber-600">
                {source.trustTier}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  );
}

function MethodologyPreview() {
  const preview = METHODOLOGY_SECTIONS.slice(0, 2);
  return (
    <Container as="section" className="py-section">
      <SectionHeading
        eyebrow="Methodology"
        title="What we publish, and what we refuse to publish."
        description={`Last reviewed ${METHODOLOGY_LAST_UPDATED}. The full document is on /methodology.`}
      />
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {preview.map((section) => (
          <article
            key={section.id}
            className="rounded-card border border-line bg-surface-base p-8"
          >
            <h3 className="font-display text-lg font-semibold text-ink-900">
              {section.title}
            </h3>
            {section.paragraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="mt-3 text-sm leading-relaxed text-ink-500"
              >
                {paragraph}
              </p>
            ))}
          </article>
        ))}
      </div>
      <Link
        href="/methodology"
        className="mt-10 inline-flex items-center text-sm font-medium text-accent-600 hover:text-accent-700"
      >
        Read the full methodology →
      </Link>
    </Container>
  );
}

function InternalLinking() {
  return (
    <Container as="section" className="py-section">
      <SectionHeading eyebrow="Explore" title="Where to go next." />
      <div className="mt-10 grid gap-3 md:grid-cols-3">
        <InternalLink href="/countries" label="All countries" />
        <InternalLink href="/cities" label="All cities" />
        <InternalLink href="/ixps" label="All Internet Exchanges" />
        <InternalLink href="/cloud" label="Cloud providers" />
        <InternalLink href="/rankings" label="Rankings" />
        <InternalLink href="/about" label="About Radar" />
      </div>
    </Container>
  );
}

function InternalLink({
  href,
  label,
}: {
  readonly href: string;
  readonly label: string;
}) {
  return (
    <Link
      href={href}
      className="rounded-card border border-line bg-surface-base px-5 py-4 text-sm font-medium text-ink-700 transition hover:border-accent-200 hover:text-accent-700"
    >
      {label}
    </Link>
  );
}
