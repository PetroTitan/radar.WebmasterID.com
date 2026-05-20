"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { ReactNode } from "react";
import {
  DEFAULT_CONSENT,
  clearConsent,
  readConsent,
  writeConsent,
  type ConsentState,
} from "@/lib/consent";

interface ConsentContextValue {
  readonly state: ConsentState;
  /** Grant analytics. Marks consent as decided. */
  readonly acceptAnalytics: () => void;
  /** Reject analytics. Marks consent as decided. */
  readonly rejectAnalytics: () => void;
  /** Clear the persisted decision; returns the banner to the
   *  undecided state. */
  readonly resetConsent: () => void;
}

const ConsentContext = createContext<ConsentContextValue | null>(null);

/**
 * Provides consent state to the consent banner and any consent-
 * gated downstream components (notably the WebmasterID tracker).
 *
 * Lives in the root layout so consent is a global concern. Reads
 * persisted state on mount; emits a `radar:consent-changed`
 * window event after every decision so non-React subscribers
 * could observe it if needed.
 */
export function ConsentProvider({ children }: { readonly children: ReactNode }) {
  const [state, setState] = useState<ConsentState>(DEFAULT_CONSENT);

  useEffect(() => {
    setState(readConsent());
  }, []);

  const apply = useCallback((next: ConsentState) => {
    setState(next);
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("radar:consent-changed", { detail: next }),
      );
    }
  }, []);

  const acceptAnalytics = useCallback(() => {
    apply(writeConsent(true));
  }, [apply]);

  const rejectAnalytics = useCallback(() => {
    apply(writeConsent(false));
  }, [apply]);

  const resetConsent = useCallback(() => {
    apply(clearConsent());
  }, [apply]);

  const value = useMemo<ConsentContextValue>(
    () => ({ state, acceptAnalytics, rejectAnalytics, resetConsent }),
    [state, acceptAnalytics, rejectAnalytics, resetConsent],
  );

  return (
    <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>
  );
}

/** Read the consent state from anywhere inside ConsentProvider. */
export function useConsent(): ConsentContextValue {
  const ctx = useContext(ConsentContext);
  if (!ctx) {
    throw new Error("useConsent must be used inside <ConsentProvider>.");
  }
  return ctx;
}
