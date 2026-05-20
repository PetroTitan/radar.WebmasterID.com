"use client";

import Script from "next/script";
import { useConsent } from "@/components/consent/ConsentProvider";

/**
 * WebmasterID analytics tracker.
 *
 * Mounted from the root layout. Renders the WebmasterID script
 * tag *only* when the user has decided to grant analytics consent.
 * Until then, no <script> is emitted, no network request leaves
 * the browser, and no identifier is stored.
 *
 * Loaded with `next/script` strategy `afterInteractive` so it
 * never blocks the initial render.
 */

const WMID_SITE_ID = "wm_vodmq44les0n0q40";
const WMID_ENDPOINT =
  "https://webmasterid-ingest-api.vercel.app/api/events";
const WMID_SRC = "https://webmasterid.com/tracker.iife.min.js";

export function WebmasterIDTracker() {
  const { state } = useConsent();
  if (!state.decided || !state.grants.analytics) return null;

  return (
    <Script
      id="webmasterid-tracker"
      src={WMID_SRC}
      strategy="afterInteractive"
      data-wmid={WMID_SITE_ID}
      data-endpoint={WMID_ENDPOINT}
    />
  );
}
