import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { EntitySection } from "@/components/ui/EntitySection";
import { RelatedEntities } from "@/components/ui/RelatedEntities";
import { SourceFootnote } from "@/components/ui/SourceFootnote";
import { INSIGHTS, getInsight } from "@/content/insights";
import { getCountry, getCity, getIxp } from "@/data";
import { buildPageMetadata } from "@/lib/metadata";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { formatDisplayDate } from "@/lib/dates";

interface RouteParams {
  readonly params: Promise<{ readonly slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return INSIGHTS.map((insight) => ({ slug: insight.slug }));
}

export async function generateMetadata({
  params,
}: RouteParams): Promise<Metadata> {
  const { slug } = await params;
  const insight = getInsight(slug);
  if (!insight) return {};
  return buildPageMetadata({
    title: insight.title,
    description: insight.dek,
    path: `/insights/${insight.slug}`,
    lastUpdated: insight.lastUpdated,
  });
}

interface ResolvedRef {
  readonly href: string;
  readonly label: string;
  readonly note?: string;
}

function resolveRefs(refs: ReadonlyArray<string>): ReadonlyArray<ResolvedRef> {
  return refs.flatMap((ref): ReadonlyArray<ResolvedRef> => {
    const [kind, slug] = ref.split(":");
    if (!kind || !slug) return [];
    if (kind === "country") {
      const c = getCountry(slug);
      return c
        ? [{ href: `/countries/${c.slug}`, label: c.name, note: c.code }]
        : [];
    }
    if (kind === "city") {
      const c = getCity(slug);
      return c
        ? [{ href: `/cities/${c.slug}`, label: c.name, note: c.countryCode }]
        : [];
    }
    if (kind === "ixp") {
      const i = getIxp(slug);
      return i
        ? [{ href: `/ixps/${i.slug}`, label: i.name, note: i.countryCode }]
        : [];
    }
    return [];
  });
}

export default async function InsightPage({ params }: RouteParams) {
  const { slug } = await params;
  const insight = getInsight(slug);
  if (!insight) notFound();

  const related = resolveRefs(insight.entityRefs ?? []);
  const tocSections = insight.sections.filter((s) => s.heading);

  const breadcrumb = breadcrumbJsonLd([
    { name: "Insights", path: "/insights" },
    { name: insight.title, path: `/insights/${insight.slug}` },
  ]);
  const article = articleJsonLd({
    title: insight.title,
    dek: insight.dek,
    path: `/insights/${insight.slug}`,
    publishedAt: insight.publishedAt,
    lastUpdated: insight.lastUpdated,
  });
  const ldNodes = [breadcrumb, article];

  return (
    <Container as="article">
      <header className="border-b border-line pb-12 md:pb-16">
        <p className="eyebrow text-accent-600">Insight</p>
        <h1 className="mt-6 text-balance font-display text-hero font-semibold text-ink-900">
          {insight.title}
        </h1>
        <p className="mt-7 max-w-editorial text-lead text-ink-500">
          {insight.dek}
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-ink-500">
          <span>Published {formatDisplayDate(insight.publishedAt)}</span>
          {insight.lastUpdated !== insight.publishedAt ? (
            <>
              <span aria-hidden="true" className="size-1 rounded-full bg-ink-300" />
              <span>Last reviewed {formatDisplayDate(insight.lastUpdated)}</span>
            </>
          ) : null}
        </div>
      </header>

      <div className="mt-12 grid gap-12 md:mt-16 md:grid-cols-12 md:gap-16">
        {tocSections.length > 1 ? (
          <nav
            aria-label="Insight contents"
            className="md:col-span-4 lg:col-span-3"
          >
            <div className="md:sticky md:top-28">
              <p className="eyebrow text-ink-500">Contents</p>
              <ol className="mt-5 space-y-3 text-sm">
                {tocSections.map((section, i) => (
                  <li key={section.id} className="flex gap-3">
                    <span className="font-mono text-xs tabular-nums text-ink-300">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <a
                      href={`#${section.id}`}
                      className="text-ink-700 transition hover:text-accent-700"
                    >
                      {section.heading}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </nav>
        ) : null}

        <div
          className={
            tocSections.length > 1
              ? "md:col-span-8 lg:col-span-9"
              : "md:col-span-12"
          }
        >
          <div className="space-y-12 md:space-y-16">
            {insight.sections.map((section, i) => (
              <section
                key={section.id}
                id={section.id}
                className="scroll-mt-28 max-w-prose"
              >
                {section.heading ? (
                  <>
                    <p className="font-mono text-xs tabular-nums uppercase text-ink-300">
                      Section {String(i).padStart(2, "0")}
                    </p>
                    <h2 className="mt-3 font-display text-h1 font-semibold text-ink-900">
                      {section.heading}
                    </h2>
                  </>
                ) : null}
                {section.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph}
                    className={`text-[1.0625rem] leading-[1.75] text-ink-700 ${section.heading ? "mt-5" : "mt-0 first:mt-0"} [&:not(:first-child)]:mt-5`}
                  >
                    {paragraph}
                  </p>
                ))}
              </section>
            ))}
          </div>
        </div>
      </div>

      {related.length > 0 ? (
        <EntitySection title="Related entities">
          <RelatedEntities title="Referenced in this insight" items={related} />
        </EntitySection>
      ) : null}

      <EntitySection title="Sources">
        <SourceFootnote citations={insight.sources} />
      </EntitySection>

      <EntitySection title="Continue reading">
        <p className="max-w-prose text-[0.9375rem] leading-relaxed text-ink-500">
          More editorial explainers are on the{" "}
          <Link
            href="/insights"
            className="text-ink-900 underline decoration-line-strong underline-offset-4 hover:decoration-accent-400 hover:text-accent-700"
          >
            insights index
          </Link>
          .
        </p>
      </EntitySection>

      {ldNodes.map((node, i) => (
        <Script
          key={i}
          id={`ld-insight-${insight.slug}-${i}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(node) }}
        />
      ))}
    </Container>
  );
}
