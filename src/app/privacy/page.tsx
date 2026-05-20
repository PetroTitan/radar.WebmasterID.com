import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { buildPageMetadata } from "@/lib/metadata";
import { breadcrumbJsonLd } from "@/lib/seo";

const PAGE_PATH = "/privacy";
const LAST_UPDATED = "2026-05-20";

export const metadata: Metadata = buildPageMetadata({
  title: "Privacy and cookies",
  description:
    "How Radar WebmasterID handles privacy: a single privacy-respecting analytics service (WebmasterID) gated on explicit consent, no advertising trackers, no fingerprinting, no third-party cookies.",
  path: PAGE_PATH,
  lastUpdated: LAST_UPDATED,
});

export default function PrivacyPage() {
  const ld = breadcrumbJsonLd([{ name: "Privacy", path: PAGE_PATH }]);

  return (
    <Container as="article">
      <header className="border-b border-line pb-12 md:pb-16">
        <p className="eyebrow text-accent-600">Privacy</p>
        <h1 className="mt-6 text-balance font-display text-hero font-semibold text-ink-900">
          Privacy and cookies.
        </h1>
        <p className="mt-7 max-w-prose text-lead text-ink-500">
          Radar uses one privacy-respecting analytics service and nothing
          else. No advertising trackers, no fingerprinting, no third-party
          cookies. Analytics only runs after you say so.
        </p>
        <p className="mt-6 text-sm text-ink-500">
          Last reviewed {LAST_UPDATED}.
        </p>
      </header>

      <div className="mt-14 max-w-prose space-y-14 md:mt-20">
        <section id="what-we-collect" className="scroll-mt-28">
          <h2 className="font-display text-h1 font-semibold text-ink-900">
            What we collect
          </h2>
          <p className="mt-5 text-[0.9375rem] leading-relaxed text-ink-700">
            When you grant analytics consent, Radar loads the WebmasterID
            tracker. It records aggregated, anonymised page-view events —
            which page was viewed, when, the referrer if any, and basic
            user-agent information. We do not store IP addresses, set
            advertising identifiers, or fingerprint your device.
          </p>
          <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink-700">
            When you reject analytics — or before you decide — the
            tracker is not loaded at all. No analytics request is made.
          </p>
        </section>

        <section id="what-we-do-not-do" className="scroll-mt-28">
          <h2 className="font-display text-h1 font-semibold text-ink-900">
            What we do not do
          </h2>
          <ul className="mt-6 space-y-3 text-[0.9375rem] leading-relaxed text-ink-700">
            <li className="flex gap-3">
              <span aria-hidden="true" className="mt-[0.55rem] size-1.5 shrink-0 rounded-full bg-amber-500" />
              <span>No advertising trackers. No advertising identifiers.</span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden="true" className="mt-[0.55rem] size-1.5 shrink-0 rounded-full bg-amber-500" />
              <span>No third-party cookies for any purpose.</span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden="true" className="mt-[0.55rem] size-1.5 shrink-0 rounded-full bg-amber-500" />
              <span>No device fingerprinting, no cross-site identifiers.</span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden="true" className="mt-[0.55rem] size-1.5 shrink-0 rounded-full bg-amber-500" />
              <span>No user accounts, no profile building, no data sales.</span>
            </li>
          </ul>
        </section>

        <section id="cookies" className="scroll-mt-28">
          <h2 className="font-display text-h1 font-semibold text-ink-900">
            Cookies and local storage
          </h2>
          <p className="mt-5 text-[0.9375rem] leading-relaxed text-ink-700">
            Radar stores one item in your browser&apos;s local storage: your
            cookie preference itself (under the key{" "}
            <span className="rounded bg-surface-subtle px-1.5 py-0.5 font-mono text-[0.85em] text-ink-700">
              radar-consent-v1
            </span>
            ). This is what lets the banner know that you have already
            decided and not show it again. It is local to your browser
            and never sent to the server.
          </p>
          <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink-700">
            The WebmasterID tracker, when loaded, may set its own
            short-lived identifier as documented on its own privacy
            page. That identifier is created only after you grant
            analytics consent.
          </p>
        </section>

        <section id="change-your-choice" className="scroll-mt-28">
          <h2 className="font-display text-h1 font-semibold text-ink-900">
            Changing your choice
          </h2>
          <p className="mt-5 text-[0.9375rem] leading-relaxed text-ink-700">
            Use the{" "}
            <Link
              href="#"
              className="text-ink-900 underline decoration-line-strong underline-offset-4 hover:decoration-accent-400 hover:text-accent-700"
            >
              Cookie preferences
            </Link>{" "}
            link in the site footer at any time to reset your choice and
            see the banner again. You can grant, revoke, or re-grant
            analytics consent freely.
          </p>
        </section>
      </div>

      <Script
        id="ld-privacy"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
      />
    </Container>
  );
}
