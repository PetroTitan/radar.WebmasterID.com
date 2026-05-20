import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { buildPageMetadata } from "@/lib/metadata";
import { breadcrumbJsonLd } from "@/lib/seo";
import { SITE } from "@/config/site";

const PAGE_PATH = "/about";
const LAST_UPDATED = "2026-05-20";

export const metadata: Metadata = buildPageMetadata({
  title: "About",
  description:
    "About Radar WebmasterID — a verified, source-governed knowledge graph of the internet's physical layer.",
  path: PAGE_PATH,
  lastUpdated: LAST_UPDATED,
});

const SECTIONS = [
  {
    id: "mission",
    title: "Mission",
    body: (
      <>
        Internet infrastructure is opaque by design. Operators publish what
        commerce requires and little more, while the bulk of the system —
        cables, exchanges, regional points of presence — operates outside
        ordinary public visibility. Radar&apos;s mission is to build a
        verified, citable record of that system, so operators, researchers,
        and policymakers can reason about it on shared ground.
      </>
    ),
  },
  {
    id: "position",
    title: "Editorial position",
    body: (
      <>
        Radar refuses to publish fabricated or unverified figures. Where data
        is unknown or contested, the platform displays{" "}
        <span className="rounded bg-surface-subtle px-1.5 py-0.5 font-mono text-[0.85em] text-ink-700">
          &ldquo;Data not yet verified.&rdquo;
        </span>{" "}
        The absence of a number is itself a published signal.
      </>
    ),
  },
  {
    id: "scope",
    title: "Scope",
    body: (
      <>
        The knowledge graph covers internet infrastructure, cloud regions,
        Internet Exchange Points, datacenters, submarine cables, internet
        resilience, and AI infrastructure readiness. New entity types are
        added only after a methodology entry has been written.
      </>
    ),
  },
] as const;

export default function AboutPage() {
  const ld = breadcrumbJsonLd([{ name: "About", path: PAGE_PATH }]);

  return (
    <Container as="article">
      <header className="border-b border-line pb-12 md:pb-16">
        <p className="eyebrow text-accent-600">About</p>
        <h1 className="mt-6 text-balance font-display text-hero font-semibold text-ink-900">
          A platform for verifiable infrastructure facts.
        </h1>
        <p className="mt-7 max-w-prose text-lead text-ink-500">
          {SITE.description}
        </p>
        <p className="mt-6 text-sm text-ink-500">
          Last reviewed {LAST_UPDATED}.
        </p>
      </header>

      <div className="mt-14 grid gap-12 md:mt-20 md:grid-cols-12 md:gap-16">
        <section className="md:col-span-8">
          <div className="space-y-14">
            {SECTIONS.map((section) => (
              <section
                key={section.id}
                id={section.id}
                className="scroll-mt-28 max-w-prose"
              >
                <h2 className="font-display text-h1 font-semibold text-ink-900">
                  {section.title}
                </h2>
                <p className="mt-5 text-[0.9375rem] leading-relaxed text-ink-700">
                  {section.body}
                </p>
              </section>
            ))}

            <section id="independence" className="scroll-mt-28 max-w-prose">
              <h2 className="font-display text-h1 font-semibold text-ink-900">
                Independence
              </h2>
              <p className="mt-5 text-[0.9375rem] leading-relaxed text-ink-700">
                Radar is operated by {SITE.organization.name}. Sources are
                reviewed on editorial criteria; vendor pages enter the
                registry as tier-3 (self-attested) and never as tier-1.
              </p>
            </section>
          </div>
        </section>

        <aside className="md:col-span-4 lg:col-span-3 lg:col-start-10 space-y-6">
          <section className="rounded-card border border-line bg-surface-base p-6">
            <p className="eyebrow text-ink-500">Explore the platform</p>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <Link
                  href="/methodology"
                  className="text-ink-900 underline decoration-line-strong underline-offset-4 hover:decoration-accent-400 hover:text-accent-700"
                >
                  Methodology
                </Link>
              </li>
              <li>
                <Link
                  href="/sources"
                  className="text-ink-900 underline decoration-line-strong underline-offset-4 hover:decoration-accent-400 hover:text-accent-700"
                >
                  Source registry
                </Link>
              </li>
              <li>
                <Link
                  href="/rankings"
                  className="text-ink-900 underline decoration-line-strong underline-offset-4 hover:decoration-accent-400 hover:text-accent-700"
                >
                  Rankings
                </Link>
              </li>
            </ul>
          </section>

          <section className="rounded-card border border-line bg-surface-base p-6">
            <p className="eyebrow text-ink-500">Operator</p>
            <p className="mt-3 text-[0.95rem] font-medium text-ink-900">
              {SITE.organization.name}
            </p>
            <a
              href={SITE.organization.url}
              className="mt-1 inline-block text-sm text-ink-500 hover:text-ink-900"
            >
              {SITE.organization.url} ↗
            </a>
          </section>
        </aside>
      </div>

      <Script
        id="ld-about"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
      />
    </Container>
  );
}
