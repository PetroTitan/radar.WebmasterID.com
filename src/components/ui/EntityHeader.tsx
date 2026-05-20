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
    <header className="flex flex-col gap-6 border-b border-line pb-12">
      <p className="text-xs font-semibold uppercase tracking-eyebrow text-accent-600">
        {eyebrow}
      </p>
      <h1 className="text-balance font-display text-hero font-semibold text-ink-900">
        {title}
      </h1>
      {summary ? (
        <p className="max-w-editorial text-lg leading-relaxed text-ink-500 md:text-xl">
          {summary}
        </p>
      ) : null}
      <div className="flex flex-wrap items-center gap-3 text-xs text-ink-500">
        <ConfidenceBadge level={confidence} />
        <span className="inline-flex items-center gap-1.5">
          <span aria-hidden="true" className="size-1 rounded-full bg-ink-300" />
          Last reviewed {formatDisplayDate(lastUpdated)}
        </span>
      </div>
    </header>
  );
}
