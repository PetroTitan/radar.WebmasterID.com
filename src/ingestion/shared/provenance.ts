/**
 * Provenance helpers for ingestion adapters.
 *
 * Adapters call these helpers to attach the standard
 * IngestedRecord fields (sourceId, sourceUrl, observedAt,
 * lastVerified, confidence, rawSourceName) to every row they
 * emit. Centralising the mapping keeps adapter code focused on
 * the source-specific normalisation logic.
 */

import type { ConfidenceLevel } from "../../entities";

export interface ProvenanceContext {
  /** Source registry slug, e.g. "peeringdb", "aws-regions". */
  readonly sourceId: string;
  /** Display name for inline rendering, e.g. "PeeringDB". */
  readonly rawSourceName: string;
  /** ISO date the run observed the source. Adapters usually pass
   *  `new Date().toISOString().slice(0, 10)`. */
  readonly observedAt: string;
  /** Per-run editor confidence. Defaults to "unverified" for
   *  generated output; reviewed rows raise this manually. */
  readonly confidence?: ConfidenceLevel;
}

/** Compose the provenance fields onto a normalized row. */
export function withProvenance<T extends Record<string, unknown>>(
  ctx: ProvenanceContext,
  sourceUrl: string,
  body: T,
): T & {
  readonly sourceId: string;
  readonly sourceUrl: string;
  readonly observedAt: string;
  readonly lastVerified: string;
  readonly confidence: ConfidenceLevel;
  readonly rawSourceName: string;
} {
  return {
    ...body,
    sourceId: ctx.sourceId,
    sourceUrl,
    observedAt: ctx.observedAt,
    lastVerified: ctx.observedAt,
    confidence: ctx.confidence ?? "unverified",
    rawSourceName: ctx.rawSourceName,
  };
}
