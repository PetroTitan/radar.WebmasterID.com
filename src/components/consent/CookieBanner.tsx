"use client";

import { useState } from "react";
import Link from "next/link";
import { useConsent } from "./ConsentProvider";

/**
 * Consent banner.
 *
 * Renders nothing until the consent state is decided either way.
 * Visible until the user makes a choice; afterwards, only the
 * "Cookie preferences" footer link can re-open it via
 * ConsentProvider.resetConsent.
 *
 * Default state is *not* pre-checked for analytics. Accept and
 * Reject are equally prominent. "Manage" expands an inline
 * details panel rather than a modal, preserving the
 * zero-extra-dependency baseline.
 */
export function CookieBanner() {
  const { state, acceptAnalytics, rejectAnalytics } = useConsent();
  const [managing, setManaging] = useState(false);

  if (state.decided) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-banner-title"
      className="fixed inset-x-3 bottom-3 z-40 md:inset-x-auto md:right-6 md:bottom-6 md:max-w-[28rem]"
    >
      <div className="rounded-card border border-line bg-surface-base shadow-card-hover">
        <div className="px-6 py-6">
          <p
            id="cookie-banner-title"
            className="eyebrow text-accent-600"
          >
            Cookies
          </p>
          <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-700">
            Radar uses a single privacy-respecting analytics service
            (WebmasterID) to understand which pages are useful. We do not
            use advertising trackers. Necessary cookies are always on;
            analytics is off until you choose.
          </p>

          {managing ? (
            <div className="mt-5 space-y-3 rounded-md border border-line bg-surface-subtle p-4 text-sm">
              <CategoryRow
                title="Necessary"
                description="Required for the site to function. Always on."
                enabled
                lockedOn
              />
              <CategoryRow
                title="Analytics"
                description="Anonymised page-view aggregation via WebmasterID. Off by default."
                enabled={false}
              />
              <p className="text-xs text-ink-500">
                Use the buttons below to apply your choice.
              </p>
            </div>
          ) : null}

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={acceptAnalytics}
              className="inline-flex items-center rounded-md bg-accent-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-accent-700"
            >
              Accept analytics
            </button>
            <button
              type="button"
              onClick={rejectAnalytics}
              className="inline-flex items-center rounded-md border border-line px-4 py-2 text-sm font-medium text-ink-700 transition hover:border-line-strong hover:text-ink-900"
            >
              Reject
            </button>
            <button
              type="button"
              onClick={() => setManaging((m) => !m)}
              className="text-sm font-medium text-ink-500 transition hover:text-ink-900"
              aria-expanded={managing}
            >
              {managing ? "Hide details" : "Manage preferences"}
            </button>
          </div>

          <p className="mt-4 text-xs text-ink-500">
            <Link
              href="/privacy"
              className="underline decoration-line-strong underline-offset-2 hover:text-ink-700"
            >
              Privacy and cookies
            </Link>
            {" · "}
            You can change this later from the footer.
          </p>
        </div>
      </div>
    </div>
  );
}

function CategoryRow({
  title,
  description,
  enabled,
  lockedOn = false,
}: {
  readonly title: string;
  readonly description: string;
  readonly enabled: boolean;
  readonly lockedOn?: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-3">
      <div>
        <p className="font-medium text-ink-900">{title}</p>
        <p className="mt-0.5 text-xs text-ink-500">{description}</p>
      </div>
      <span
        className={
          enabled
            ? "rounded-full bg-accent-50 px-2 py-0.5 text-[0.7rem] font-medium text-accent-700"
            : "rounded-full bg-surface-raised px-2 py-0.5 text-[0.7rem] font-medium text-ink-500"
        }
      >
        {lockedOn ? "Always on" : enabled ? "On" : "Off"}
      </span>
    </div>
  );
}
