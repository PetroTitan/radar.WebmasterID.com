/**
 * Cookie / analytics consent state.
 *
 * Two categories: `necessary` (always granted) and `analytics`
 * (granted only on explicit Accept). The shape is intentionally
 * minimal — adding more categories later is a matter of extending
 * the union and the banner UI.
 *
 * Persistence: localStorage under STORAGE_KEY. The stored payload
 * carries a schema version so future migrations are explicit.
 *
 * Storage is locally-scoped to the user's own browser. No
 * server-side state. The choice is stored only after the user
 * has actively decided (Accept or Reject); an undecided state
 * means the banner is still visible.
 *
 * Pure module — no React, no DOM — so it can be safely imported
 * from both client components and (for the type) server code.
 */

export const STORAGE_KEY = "radar-consent-v1" as const;

export type ConsentCategory = "necessary" | "analytics";

export interface ConsentState {
  /** `true` if the user has actively decided. `false` means
   *  banner should remain visible. */
  readonly decided: boolean;
  /** Per-category grant state. `necessary` is always granted. */
  readonly grants: Readonly<Record<ConsentCategory, boolean>>;
  /** ISO timestamp of the user's decision, if any. */
  readonly decidedAt: string | null;
}

export const DEFAULT_CONSENT: ConsentState = {
  decided: false,
  grants: { necessary: true, analytics: false },
  decidedAt: null,
};

interface StoredConsent {
  readonly v: 1;
  readonly analytics: boolean;
  readonly decidedAt: string;
}

/** Read the persisted consent state from the browser, or return
 *  the default undecided state. SSR-safe: returns DEFAULT_CONSENT
 *  when there is no `window`. */
export function readConsent(): ConsentState {
  if (typeof window === "undefined") return DEFAULT_CONSENT;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_CONSENT;
    const parsed = JSON.parse(raw) as StoredConsent;
    if (parsed.v !== 1) return DEFAULT_CONSENT;
    return {
      decided: true,
      grants: {
        necessary: true,
        analytics: parsed.analytics === true,
      },
      decidedAt: parsed.decidedAt,
    };
  } catch {
    return DEFAULT_CONSENT;
  }
}

/** Persist a consent decision. Safe to call repeatedly. */
export function writeConsent(analytics: boolean): ConsentState {
  const decidedAt = new Date().toISOString();
  const payload: StoredConsent = { v: 1, analytics, decidedAt };
  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
      /* localStorage may throw in private modes; the in-memory
       * provider state still updates so the user's session-level
       * choice is honoured. */
    }
  }
  return {
    decided: true,
    grants: { necessary: true, analytics },
    decidedAt,
  };
}

/** Clear any persisted decision and return the default state.
 *  Used by the "reset cookie preferences" affordance. */
export function clearConsent(): ConsentState {
  if (typeof window !== "undefined") {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  }
  return DEFAULT_CONSENT;
}
