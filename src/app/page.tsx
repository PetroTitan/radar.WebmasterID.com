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
import { listInsightsByDate } from "@/content/insights";
import { GUIDES } from "@/content/guides";
import {
  METHODOLOGY_LAST_UPDATED,
  METHODOLOGY_SECTIONS,
} from "@/content/methodology";

const HOMEPAGE_UPDATED = "2026-05-21";

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
      "Provider-published region directories, normalised to a single schema and pinned to a country / metro.",
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

const FORTHCOMING_REPORTS = [
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
      <HowRadarWorks />
      <FeaturedHubs />
      <IntelligenceOverview />
      <FeaturedGuides />
      <FeaturedInsights />
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
    <Container as="section" className="pt-4 pb-section-y md:pt-8">
      <div className="grid items-start gap-12 md:gap-16 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="eyebrow text-accent-600">Infrastructure intelligence</p>
          <h1 className="mt-6 text-balance font-display text-hero font-semibold text-ink-900">
            Understand the infrastructure that connects the world.
          </h1>
          <p className="mt-7 max-w-prose text-lead text-ink-500">
            Verified, source-governed data on cloud regions, Internet Exchanges,
            datacenters, subsea cables, and the institutions that operate them.
            Every fact is cited. Where data is absent, we say so.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/countries"
              className="inline-flex items-center rounded-md bg-accent-600 px-5 py-2.5 text-sm font-medium text-white shadow-card transition hover:bg-accent-700"
            >
              Explore the graph
            </Link>
            <Link
              href="/methodology"
              className="inline-flex items-center rounded-md border border-line px-5 py-2.5 text-sm font-medium text-ink-700 transition hover:border-line-strong hover:text-ink-900"
            >
              Read the methodology
            </Link>
          </div>
        </div>
        <aside className="lg:col-span-5">
          <div className="rounded-card border border-line bg-surface-subtle p-8 md:p-10">
            <p className="inline-flex items-center gap-2 eyebrow text-ink-500">
              <span
                aria-hidden="true"
                className="size-1.5 rounded-full bg-accent-500"
              />
              Knowledge graph
            </p>
            <dl className="num mt-7 grid grid-cols-3 gap-x-6 gap-y-8">
              <Stat label="Countries" value={COUNTRIES.length} />
              <Stat label="Metros" value={CITIES.length} />
              <Stat label="IXPs" value={IXPS.length} />
              <Stat label="Sources" value={SOURCE_REGISTRY.length} />
              <Stat label="Cloud regions" value="—" hint="pending" />
              <Stat label="Cables" value="—" hint="pending" />
            </dl>
            <p className="mt-8 max-w-[26rem] text-[0.8125rem] leading-relaxed text-ink-500">
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
      <dt className="text-[0.7rem] font-medium uppercase tracking-eyebrow text-ink-500">
        {label}
      </dt>
      <dd className="mt-2 font-display text-[1.75rem] font-semibold leading-none text-ink-900">
        {value}
      </dd>
      {hint ? (
        <p className="mt-1 text-[0.7rem] italic text-ink-300">{hint}</p>
      ) : null}
    </div>
  );
}

function HowRadarWorks() {
  const principles = [
    {
      title: "Source-governed",
      body: "Every value on the platform cites a registered source. The source registry lives at /sources with each entry's trust tier, license posture, and last-checked date documented in public.",
      href: "/sources",
      cta: "Review the source registry",
    },
    {
      title: "Honest absence",
      body: "Where data is unknown, contested, or simply not yet ingested, Radar publishes “Data not yet verified.” rather than a guess. The absence is itself a published signal.",
      href: "/methodology",
      cta: "Read the methodology",
    },
    {
      title: "Entity graph",
      body: "Countries resolve to hub cities and IXPs. Cities resolve to their country plus peer hub metros. IXPs resolve to their operator, city, and country. Every record carries an explicit confidence level and a last-reviewed date.",
      href: "/countries",
      cta: "Explore the graph",
    },
    {
      title: "Editorial cadence",
      body: "Each entity, guide, and insight publishes a reviewed-on date. Quantitative metrics live on dated observations. The published surface advertises freshness so AI crawlers and human readers can judge it directly.",
      href: "/guides",
      cta: "See the reference guides",
    },
  ] as const;

  return (
    <Container as="section" className="py-section-y">
      <SectionHeading
        eyebrow="How Radar works"
        title="What we publish, and how."
        description="Radar is a source-governed knowledge graph, not a dashboard. Four operating principles set what makes it onto the platform and what stays out."
      />
      <ol className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {principles.map((p, i) => (
          <li key={p.title}>
            <article className="flex h-full flex-col rounded-card border border-line bg-surface-base p-7 sm:p-8">
              <p className="font-mono text-xs tabular-nums text-ink-300">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-3 font-display text-h3 font-semibold text-ink-900">
                {p.title}
              </h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-500">
                {p.body}
              </p>
              <Link
                href={p.href}
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent-600 hover:text-accent-700"
              >
                {p.cta} <span aria-hidden="true">→</span>
              </Link>
            </article>
          </li>
        ))}
      </ol>
    </Container>
  );
}

function FeaturedHubs() {
  const featured = CITIES;
  if (featured.length === 0) return null;
  return (
    <Container as="section" className="py-section-y">
      <SectionHeading
        eyebrow="Featured infrastructure hubs"
        title="The metros that move the internet."
        description="Most global traffic concentrates in fewer than thirty cities. These are the anchors of the graph."
        trailing={
          <Link
            href="/cities"
            className="text-sm font-medium text-accent-600 hover:text-accent-700"
          >
            View all metros →
          </Link>
        }
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
    <Container as="section" className="py-section-y">
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
    <Container as="section" className="py-section-y">
      <SectionHeading
        eyebrow="Featured rankings"
        title="Source-cited comparative views."
        description="Each ranking publishes its inputs, weights, and last-recomputed date."
        trailing={
          <Link
            href="/rankings"
            className="text-sm font-medium text-accent-600 hover:text-accent-700"
          >
            See all rankings →
          </Link>
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

function FeaturedGuides() {
  const guides = GUIDES.slice(0, 4);
  if (guides.length === 0) return null;
  return (
    <Container as="section" className="py-section-y">
      <SectionHeading
        eyebrow="Reference guides"
        title="The building blocks of internet infrastructure."
        description="Authority reference on Internet Exchange Points, cloud regions, submarine cables, datacenter hubs, and AI infrastructure. Each guide opens with a definitive answer and a structured summary."
        trailing={
          <Link
            href="/guides"
            className="text-sm font-medium text-accent-600 hover:text-accent-700"
          >
            See all guides →
          </Link>
        }
      />
      <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {guides.map((guide) => (
          <Card
            key={guide.slug}
            title={guide.title}
            description={guide.dek}
            href={`/guides/${guide.slug}`}
            eyebrow="Guide"
          />
        ))}
      </div>
    </Container>
  );
}

function FeaturedInsights() {
  const insights = listInsightsByDate().slice(0, 4);
  if (insights.length === 0) return null;
  return (
    <Container as="section" className="py-section-y">
      <SectionHeading
        eyebrow="Featured insights"
        title="Editorial explainers on the infrastructure that runs the internet."
        description="Long-form, source-cited essays on internet exchanges, cloud regions, submarine cables, and the metros that anchor the global internet."
        trailing={
          <Link
            href="/insights"
            className="text-sm font-medium text-accent-600 hover:text-accent-700"
          >
            See all insights →
          </Link>
        }
      />
      <div className="mt-12 grid gap-5 md:grid-cols-2">
        {insights.map((insight) => (
          <Card
            key={insight.slug}
            title={insight.title}
            description={insight.dek}
            href={`/insights/${insight.slug}`}
            eyebrow="Insight"
          />
        ))}
      </div>
    </Container>
  );
}

function FeaturedReports() {
  return (
    <Container as="section" className="py-section-y">
      <SectionHeading
        eyebrow="Forthcoming reports"
        title="Editorial work, ingest-ready."
      />
      <div className="mt-12 grid gap-5 md:grid-cols-2">
        {FORTHCOMING_REPORTS.map((report) => (
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
  const maps = [
    {
      title: "Cloud regions",
      description: "Where the three major hyperscalers operate verified cloud regions.",
      href: "/maps/cloud-regions",
    },
    {
      title: "Internet Exchange Points",
      description: "Peering geography, anchored by PeeringDB.",
      href: "/maps/ixps",
    },
    {
      title: "Datacenter hubs",
      description: "Metros that anchor the world's colocation clusters.",
      href: "/maps/datacenters",
    },
    {
      title: "Submarine cables",
      description: "Cable landing geography, anchored by TeleGeography.",
      href: "/maps/subsea-cables",
    },
  ] as const;
  return (
    <Container as="section" className="py-section-y">
      <SectionHeading
        eyebrow="Maps"
        title="Geographic intelligence layer."
        description="Lightweight server-rendered SVG maps. Every plotted point cites a registered source; coordinates documented in the table beneath each map."
        trailing={
          <Link
            href="/maps"
            className="text-sm font-medium text-accent-600 hover:text-accent-700"
          >
            View all maps →
          </Link>
        }
      />
      <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {maps.map((m) => (
          <Card key={m.href} title={m.title} description={m.description} href={m.href} eyebrow="Map" />
        ))}
      </div>
    </Container>
  );
}

function SourceTransparency() {
  const topSources = SOURCE_REGISTRY.slice(0, 6);
  return (
    <Container as="section" className="py-section-y">
      <SectionHeading
        eyebrow="Source transparency"
        title="Every value traces back to a registered source."
        description="Sources are tier-assigned, license-noted, and dated."
        trailing={
          <Link
            href="/sources"
            className="text-sm font-medium text-accent-600 hover:text-accent-700"
          >
            View the full registry →
          </Link>
        }
      />
      <ul className="mt-12 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {topSources.map((source) => (
          <li key={source.id}>
            <Link
              href={`/sources#${source.id}`}
              className="group flex items-center justify-between gap-3 rounded-card border border-line bg-surface-base px-5 py-4 transition hover:border-line-strong hover:shadow-card-hover"
            >
              <span>
                <span className="block text-[0.95rem] font-medium text-ink-900 group-hover:text-accent-700">
                  {source.name}
                </span>
                <span className="mt-0.5 block eyebrow text-ink-500">
                  {source.category}
                </span>
              </span>
              <span className="font-mono text-[0.7rem] uppercase tracking-wider text-amber-600">
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
    <Container as="section" className="py-section-y">
      <SectionHeading
        eyebrow="Methodology"
        title="What we publish, and what we refuse to publish."
        description={`Last reviewed ${METHODOLOGY_LAST_UPDATED}.`}
        trailing={
          <Link
            href="/methodology"
            className="text-sm font-medium text-accent-600 hover:text-accent-700"
          >
            Read the full methodology →
          </Link>
        }
      />
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {preview.map((section) => (
          <article
            key={section.id}
            className="rounded-card border border-line bg-surface-base p-8"
          >
            <h3 className="font-display text-h3 font-semibold text-ink-900">
              {section.title}
            </h3>
            {section.paragraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="mt-4 text-[0.9375rem] leading-relaxed text-ink-500"
              >
                {paragraph}
              </p>
            ))}
          </article>
        ))}
      </div>
    </Container>
  );
}

function InternalLinking() {
  return (
    <Container as="section" className="py-section-y">
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
      className="group flex items-center justify-between rounded-card border border-line bg-surface-base px-5 py-4 text-sm font-medium text-ink-700 transition hover:border-line-strong hover:text-accent-700"
    >
      {label}
      <span
        aria-hidden="true"
        className="text-ink-300 transition group-hover:text-accent-600"
      >
        →
      </span>
    </Link>
  );
}
