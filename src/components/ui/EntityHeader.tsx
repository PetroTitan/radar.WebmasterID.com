import type { ConfidenceLevel } from "@/entities";
import { formatDisplayDate } from "@/lib/dates";
import { ConfidenceBadge } from "./ConfidenceBadge";

interface EntityHeaderProps {
  readonly eyebrow: string;
  readonly title: string;
  readonly summary?: string;
  readonly confidence: ConfidenceLevel;
  readonly lastUpdated: string;
}

export function EntityHeader({
  eyebrow,
  title,
  summary,
  confidence,
  lastUpdated,
}: EntityHeaderProps) {
  return (
    <header className="border-b border-line pb-12 md:pb-16">
      <p className="eyebrow text-accent-600">{eyebrow}</p>
      <h1 className="mt-6 text-balance font-display text-hero font-semibold text-ink-900">
        {title}
      </h1>
      {summary ? (
        <p className="mt-7 max-w-editorial text-lead text-ink-500">
          {summary}
        </p>
      ) : null}
      <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-ink-500">
        <ConfidenceBadge level={confidence} />
        <span className="inline-flex items-center gap-2">
          <span aria-hidden="true" className="size-1 rounded-full bg-ink-300" />
          Last reviewed {formatDisplayDate(lastUpdated)}
        </span>
      </div>
    </header>
  );
}
