"use client";

import { useConsent } from "./ConsentProvider";

/**
 * Footer link that reopens the consent banner by clearing the
 * persisted decision. Lives in the footer so the user can change
 * their choice at any time after the initial decision.
 */
export function CookiePreferencesLink() {
  const { resetConsent } = useConsent();
  return (
    <button
      type="button"
      onClick={resetConsent}
      className="text-ink-700 transition hover:text-ink-900"
    >
      Cookie preferences
    </button>
  );
}
