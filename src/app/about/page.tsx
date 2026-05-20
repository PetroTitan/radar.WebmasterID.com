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

export default function AboutPage() {
  const ld = breadcrumbJsonLd([{ name: "About", path: PAGE_PATH }]);

  return (
    <Container as="article">
      <header className="border-b border-line pb-10">
        <p className="text-xs font-medium uppercase tracking-eyebrow text-accent-600">
          About
        </p>
        <h1 className="mt-4 text-balance text-4xl font-semibold text-ink-900 md:text-5xl">
          A platform for verifiable infrastructure facts.
        </h1>
        <p className="mt-5 max-w-prose text-ink-700 md:text-lg">
          {SITE.description}
        </p>
        <p className="mt-4 text-sm text-ink-9000">
          Last reviewed {LAST_UPDATED}.
        </p>
      </header>

      <div className="mt-12 grid gap-12 md:grid-cols-3">
        <section className="md:col-span-2 max-w-prose">
          <h2 className="text-xl font-semibold text-ink-900">Mission</h2>
          <p className="mt-3 text-ink-700">
            Internet infrastructure is opaque by design. Operators publish what
            commerce requires and little more, while the bulk of the system —
            cables, exchanges, regional points of presence — operates outside
            ordinary public visibility. Radar&apos;s mission is to build a verified,
            citable record of that system, so operators, researchers, and
            policymakers can reason about it on shared ground.
          </p>

          <h2 className="mt-10 text-xl font-semibold text-ink-900">
            Editorial position
          </h2>
          <p className="mt-3 text-ink-700">
            Radar refuses to publish fabricated or unverified figures. Where
            data is unknown or contested, the platform displays{" "}
            <span className="font-mono text-ink-700">
              &ldquo;Data not yet verified.&rdquo;
            </span>{" "}
            The absence of a number is itself a published signal.
          </p>

          <h2 className="mt-10 text-xl font-semibold text-ink-900">Scope</h2>
          <p className="mt-3 text-ink-700">
            The knowledge graph covers internet infrastructure, cloud regions,
            Internet Exchange Points, datacenters, submarine cables, internet
            resilience, and AI infrastructure readiness. New entity types are
            added only after a methodology entry has been written.
          </p>

          <h2 className="mt-10 text-xl font-semibold text-ink-900">
            Independence
          </h2>
          <p className="mt-3 text-ink-700">
            Radar is operated by {SITE.organization.name}. Sources are reviewed
            on editorial criteria; vendor pages enter the registry as tier-3
            (self-attested) and never as tier-1.
          </p>
        </section>

        <aside className="space-y-6 text-sm">
          <section className="rounded-lg border border-line bg-surface-base p-5">
            <p className="text-xs font-semibold uppercase tracking-eyebrow text-ink-9000">
              Explore the platform
            </p>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/methodology" className="text-accent-600 hover:text-accent-700">
                  Methodology
                </Link>
              </li>
              <li>
                <Link href="/sources" className="text-accent-600 hover:text-accent-700">
                  Source registry
                </Link>
              </li>
              <li>
                <Link href="/rankings" className="text-accent-600 hover:text-accent-700">
                  Rankings
                </Link>
              </li>
            </ul>
          </section>

          <section className="rounded-lg border border-line bg-surface-base p-5">
            <p className="text-xs font-semibold uppercase tracking-eyebrow text-ink-9000">
              Operator
            </p>
            <p className="mt-3 text-ink-700">{SITE.organization.name}</p>
            <a
              href={SITE.organization.url}
              className="mt-1 inline-block text-ink-500 underline decoration-line-strong hover:text-ink-700"
            >
              {SITE.organization.url}
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
