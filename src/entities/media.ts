import type { ISODate } from "./shared";

/**
 * A media asset registered in Radar's visual media registry.
 *
 * Every asset that appears anywhere on the platform's published
 * surface is documented here, with its source page URL, license,
 * attribution string, related entities, and verification status.
 *
 * Status semantics:
 *   - verified:   licensing has been editorially confirmed; the
 *                 asset renders on entity / guide / research pages.
 *   - candidate:  source identified, licensing read, but the
 *                 editorial review has not been signed off. The
 *                 asset does *not* render in public pages; it
 *                 appears only on /visuals with a candidate badge.
 *   - unverified: a placeholder. The asset is intentionally not
 *                 displayed; the registry records intent for future
 *                 sourcing.
 *
 * Renderable assets are one of two shapes:
 *   - inlineComponent: a self-authored SVG component identifier;
 *                       the renderer resolves it via a string map.
 *   - localPath:       a public/ path relative to the site root,
 *                       served by Next's static asset handler.
 *
 * Both are optional; an asset with neither is a registry-only
 * record (only meaningful for status="unverified" placeholders).
 */
export type MediaAssetType =
  | "photo"
  | "diagram"
  | "map"
  | "illustration"
  | "logo";

export type MediaAssetStatus = "verified" | "candidate" | "unverified";

export type MediaInlineComponent =
  | "InterconnectionDiagram"
  | "CableLandingDiagram"
  | "CloudRegionDistributionDiagram";

export interface MediaSource {
  /** Source name, e.g. "Wikimedia Commons", "DE-CIX", "AWS",
   *  "Self-authored". */
  readonly name: string;
  /** Direct URL to the asset's source page (where licensing can be
   *  re-verified). */
  readonly pageUrl: string;
}

export interface MediaLicense {
  /** License identifier, e.g. "CC BY-SA 4.0", "Public Domain",
   *  "All rights reserved (used with permission)". */
  readonly name: string;
  /** URL to the license text. */
  readonly url?: string;
  /** Whether the license requires attribution at the point of use. */
  readonly attributionRequired: boolean;
}

export interface MediaAsset {
  /** kebab-case slug, URL segment under /visuals. */
  readonly id: string;
  /** Display title. */
  readonly title: string;
  /** Asset type, drives the visual treatment on /visuals. */
  readonly type: MediaAssetType;
  /** Verification status — see semantics above. */
  readonly status: MediaAssetStatus;
  /** Source page URL + name. Required for verified and candidate
   *  assets; recorded for unverified placeholders when a candidate
   *  source has been identified. */
  readonly source?: MediaSource;
  /** License terms. Required for verified and candidate assets. */
  readonly license?: MediaLicense;
  /** Author / institution attribution string, rendered next to the
   *  asset when license requires attribution. Required for
   *  verified assets where license.attributionRequired is true. */
  readonly attribution?: string;
  /** Original author name (photographer, illustrator, institution). */
  readonly author?: string;
  /** Alt text. Required. For decorative assets pass an empty
   *  string to mark `aria-hidden`. */
  readonly altText: string;
  /** One-sentence caption shown beneath the asset. */
  readonly caption?: string;
  /** Composite entity refs the asset depicts.
   *  Format: `country:<slug>` | `city:<slug>` | `ixp:<slug>`. */
  readonly relatedEntityRefs?: ReadonlyArray<string>;
  /** Editorial risk notes — recognisable people, brand marks,
   *  private addresses, etc. The validator flags non-empty risk
   *  notes on verified assets. */
  readonly riskNotes?: ReadonlyArray<string>;
  /** Local public/ path for the asset, e.g. `/media/de-cix.jpg`. */
  readonly localPath?: string;
  /** Identifier of a self-authored inline SVG component. */
  readonly inlineComponent?: MediaInlineComponent;
  /** Pixel dimensions when known. */
  readonly dimensions?: { readonly width: number; readonly height: number };
  /** ISO date the editorial verification (or last placeholder
   *  review) was performed. */
  readonly lastVerified: ISODate;
}
