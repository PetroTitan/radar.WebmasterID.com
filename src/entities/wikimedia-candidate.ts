import type { ISODate } from "./shared";

/**
 * A Wikimedia Commons candidate asset.
 *
 * The Wikimedia workflow is intentionally manual and gated:
 *
 *   1. An editor finds a candidate image on Wikimedia Commons.
 *   2. The image's Commons page URL, license, author, attribution
 *      requirements, and risk notes are recorded as a
 *      `WikimediaCandidate` here.
 *   3. The candidate appears on `/visuals` as a candidate — it
 *      does NOT render anywhere on the entity / guide / research
 *      pages.
 *   4. Editorial review either promotes the candidate to a
 *      verified `MediaAsset` (with attribution string, captured
 *      author name, optimised local copy) or rejects it.
 *
 * The registry refuses to let a candidate carry an
 * already-verified-looking author or attribution string; that
 * promotion is a deliberate editorial step.
 */
export type WikimediaReviewStatus =
  | "discovered"
  | "license-confirmed"
  | "attribution-pending"
  | "rejected";

export interface WikimediaCandidate {
  /** kebab-case identifier; unique within the candidate registry. */
  readonly id: string;
  /** Display title — short, human-readable. */
  readonly title: string;
  /** Direct URL to the Commons File page (NOT the raw image).
   *  Must start with `https://commons.wikimedia.org/wiki/File:`. */
  readonly commonsPageUrl: string;
  /** Wikimedia Commons category page URL the editor found the
   *  candidate under, when applicable. */
  readonly commonsCategoryUrl?: string;
  /** License identifier as recorded on the Commons page at the
   *  time of discovery, e.g. "CC BY-SA 4.0", "CC BY 4.0",
   *  "Public Domain". Authoritative source is the Commons page
   *  itself; this field captures the editor's reading. */
  readonly recordedLicense: string;
  /** Whether the recorded license requires attribution at use. */
  readonly attributionRequired: boolean;
  /** Editor's review status. */
  readonly reviewStatus: WikimediaReviewStatus;
  /** Composite entity refs the candidate would depict, if
   *  promoted. Format: `country:<slug>` | `city:<slug>` |
   *  `ixp:<slug>`. */
  readonly relatedEntityRefs?: ReadonlyArray<string>;
  /** Risk notes captured at discovery — visible brand marks,
   *  recognisable people, private property considerations, image
   *  age, etc. The validator surfaces non-empty risk notes when
   *  the candidate is promoted to verified. */
  readonly riskNotes?: ReadonlyArray<string>;
  /** Free-text editorial notes for the candidate. */
  readonly editorialNotes?: ReadonlyArray<string>;
  /** ISO date the candidate was added to the registry. */
  readonly discoveredAt: ISODate;
  /** ISO date the candidate's review status was last touched. */
  readonly lastReviewedAt: ISODate;
}
