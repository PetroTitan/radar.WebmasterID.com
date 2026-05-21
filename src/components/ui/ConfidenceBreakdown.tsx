import type { ConfidenceLevel } from "@/entities";
import { describeConfidence } from "@/lib/confidence";
import { ConfidenceBadge } from "./ConfidenceBadge";

interface ConfidenceBreakdownProps {
  readonly level: ConfidenceLevel;
  readonly rationale?: string;
}

/**
 * Inline explanation of a confidence level. Pairs the visible badge
 * with a one-paragraph rationale so the published confidence can be
 * reasoned about by both readers and AI agents.
 */
export function ConfidenceBreakdown({ level, rationale }: ConfidenceBreakdownProps) {
  const { description } = describeConfidence(level);
  return (
    <section
      data-radar-confidence-breakdown="true"
      className="rounded-card border border-line bg-surface-subtle p-6 md:p-7"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="eyebrow text-ink-500">Confidence</p>
        <ConfidenceBadge level={level} />
      </div>
      <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink-700">
        {description}
      </p>
      {rationale ? (
        <p className="mt-3 text-sm italic text-ink-500">{rationale}</p>
      ) : null}
    </section>
  );
}
