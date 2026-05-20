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
    <header className="flex flex-col gap-5 border-b border-graphite-800 pb-10">
      <p className="text-xs font-medium uppercase tracking-eyebrow text-signal-orange-400">
        {eyebrow}
      </p>
      <h1 className="text-balance text-4xl font-semibold text-graphite-50 md:text-5xl">
        {title}
      </h1>
      {summary ? (
        <p className="max-w-prose text-graphite-300 md:text-lg">{summary}</p>
      ) : null}
      <div className="flex flex-wrap items-center gap-3 text-xs text-graphite-400">
        <ConfidenceBadge level={confidence} />
        <span>Last reviewed {formatDisplayDate(lastUpdated)}</span>
      </div>
    </header>
  );
}
