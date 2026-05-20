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
import { METHODOLOGY_LAST_UPDATED, METHODOLOGY_SECTIONS } from "@/content/methodology";

const HOMEPAGE_UPDATED = "2026-05-20";

export const metadata: Metadata = buildPageMetadata({
  title: `${SITE.name} — ${SITE.tagline}`,
  description: SITE.description,
  path: "/",
  lastUpdated: HOMEPAGE_UPDATED,
});

const FEATURED_HUBS = [
  {
    title: "Frankfurt",
    description:
      "Western Europe's largest peering ecosystem and a primary anchor for EU cloud regions.",
    href: "/cities/frankfurt",
    eyebrow: "Hub city · DE",
  },
  {
    title: "Ashburn",
    description:
      "The dominant US East colocation cluster and origin metro for a majority of east-coast cloud regions.",
    href: "/cities/ashburn",
    eyebrow: "Hub city · US",
  },
  {
    title: "Singapore",
    description:
      "Southeast Asia's primary interconnection gateway and a critical convergence point for submarine cables.",
    href: "/cities/singapore",
    eyebrow: "Hub city · SG",
  },
] as const;

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
    <Container as="section" className="pt-6 pb-20">
      <p className="text-xs font-medium uppercase tracking-eyebrow text-signal-orange-400">
        Radar WebmasterID
      </p>
      <h1 className="mt-4 max-w-3xl text-balance text-4xl font-semibold text-graphite-50 md:text-6xl">
        Verified digital infrastructure intelligence.
      </h1>
      <p className="mt-6 max-w-prose text-lg text-graphite-300">
        A source-governed knowledge graph of the internet&apos;s physical layer:
        cloud regions, IXPs, datacenters, subsea cables, and the institutions
        that run them. Every fact is cited. Where data is absent, we say so.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/countries"
          className="inline-flex items-center rounded-md bg-signal-blue-500 px-4 py-2 text-sm font-medium text-graphite-50 transition hover:bg-signal-blue-400"
        >
          Explore the graph
        </Link>
        <Link
          href="/methodology"
          className="inline-flex items-center rounded-md border border-graphite-700 px-4 py-2 text-sm font-medium text-graphite-200 transition hover:border-graphite-500 hover:text-graphite-50"
        >
          Read the methodology
        </Link>
      </div>
    </Container>
  );
}

function FeaturedHubs() {
  return (
    <Container as="section" className="py-16">
      <SectionHeading
        eyebrow="Featured infrastructure hubs"
        title="The metros that move the internet."
        description="Most global traffic concentrates in fewer than thirty cities. These are the anchors of the graph."
      />
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {FEATURED_HUBS.map((hub) => (
          <Card key={hub.href} {...hub} />
        ))}
      </div>
    </Container>
  );
}

function IntelligenceOverview() {
  return (
    <Container as="section" className="py-16">
      <SectionHeading
        eyebrow="Infrastructure intelligence"
        title="Four axes, one graph."
        description="Radar resolves every record onto geography, cloud, interconnection, and ranked comparisons — without collapsing them into a single contrived score."
      />
      <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {INTELLIGENCE_OVERVIEW.map((axis) => (
          <Card key={axis.href} {...axis} eyebrow="Axis" />
        ))}
      </div>
    </Container>
  );
}

function FeaturedRankings() {
  return (
    <Container as="section" className="py-16">
      <SectionHeading
        eyebrow="Featured rankings"
        title="Source-cited comparative views."
        description={
          <>
            Each ranking publishes its inputs, weights, and last-recomputed date.
            See <Link href="/rankings" className="text-signal-blue-300 hover:text-signal-blue-200">all rankings</Link>.
          </>
        }
      />
      <div className="mt-10 grid gap-4 md:grid-cols-3">
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
    <Container as="section" className="py-16">
      <SectionHeading
        eyebrow="Featured reports"
        title="Editorial work, ingest-ready."
      />
      <div className="mt-10 grid gap-4 md:grid-cols-2">
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
    <Container as="section" className="py-16">
      <SectionHeading
        eyebrow="Maps"
        title="A map layer is on the way."
        description="The graph is built map-ready: cities carry coordinates, cables carry landings, regions carry country anchors. Cartography ships once the underlying data passes verification."
      />
      <div className="mt-10 rounded-lg border border-dashed border-graphite-700 bg-graphite-900/40 p-12 text-center">
        <p className="text-sm uppercase tracking-eyebrow text-graphite-500">
          Map module
        </p>
        <p className="mt-3 text-graphite-300">Data not yet verified.</p>
      </div>
    </Container>
  );
}

function SourceTransparency() {
  const topSources = SOURCE_REGISTRY.slice(0, 6);
  return (
    <Container as="section" className="py-16">
      <SectionHeading
        eyebrow="Source transparency"
        title="Every value traces back to a registered source."
        description={
          <>
            Sources are tier-assigned, license-noted, and dated.
            The full registry lives on{" "}
            <Link href="/sources" className="text-signal-blue-300 hover:text-signal-blue-200">/sources</Link>.
          </>
        }
      />
      <ul className="mt-10 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {topSources.map((source) => (
          <li key={source.id}>
            <Link
              href={`/sources#${source.id}`}
              className="group flex items-baseline justify-between gap-3 rounded-md border border-graphite-800 bg-graphite-900/60 px-4 py-3 transition hover:border-signal-blue-500/40"
            >
              <span>
                <span className="font-medium text-graphite-100 group-hover:text-signal-blue-200">
                  {source.name}
                </span>
                <span className="ml-2 text-xs uppercase tracking-eyebrow text-graphite-500">
                  {source.category}
                </span>
              </span>
              <span className="font-mono text-xs uppercase text-signal-orange-400">
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
    <Container as="section" className="py-16">
      <SectionHeading
        eyebrow="Methodology"
        title="What we publish, and what we refuse to publish."
        description={`Last reviewed ${METHODOLOGY_LAST_UPDATED}. The full document is on /methodology.`}
      />
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {preview.map((section) => (
          <article
            key={section.id}
            className="rounded-lg border border-graphite-800 bg-graphite-900/40 p-6"
          >
            <h3 className="text-lg font-semibold text-graphite-50">
              {section.title}
            </h3>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph} className="mt-3 text-sm text-graphite-300">
                {paragraph}
              </p>
            ))}
          </article>
        ))}
      </div>
      <Link
        href="/methodology"
        className="mt-8 inline-flex items-center text-sm font-medium text-signal-blue-300 hover:text-signal-blue-200"
      >
        Read the full methodology →
      </Link>
    </Container>
  );
}

function InternalLinking() {
  return (
    <Container as="section" className="py-16">
      <SectionHeading
        eyebrow="Explore"
        title="Where to go next."
      />
      <div className="mt-8 grid gap-3 md:grid-cols-3">
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
      className="rounded-md border border-graphite-800 bg-graphite-900/40 px-4 py-3 text-sm text-graphite-200 transition hover:border-signal-blue-500/40 hover:text-signal-blue-200"
    >
      {label}
    </Link>
  );
}
