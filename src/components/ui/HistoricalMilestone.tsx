import { getSourceRecord } from "@/source-registry";
import type { TimelineEvent } from "@/entities";

interface HistoricalMilestoneProps {
  readonly event: TimelineEvent;
  readonly index: number;
}

/**
 * One milestone entry on an InfrastructureTimeline.
 *
 * Renders a year column on the left and the title / summary /
 * sources / caveats on the right. Sources are rendered as inline
 * links to the source-registry entry plus the per-event URL the
 * editor cited. Caveats render beneath, separated from the main
 * summary so a reader can take the milestone at its face value
 * or drill into the caveats deliberately.
 */
export function HistoricalMilestone({
  event,
  index,
}: HistoricalMilestoneProps) {
  return (
    <div
      data-radar-historical-milestone="true"
      data-event-year={event.year}
      className="flex flex-col gap-4 px-7 py-6 md:flex-row md:gap-8 md:px-9 md:py-7"
    >
      <div className="md:w-28 md:shrink-0">
        <p className="font-mono text-xs uppercase tracking-wider text-ink-300">
          {String(index + 1).padStart(2, "0")}
        </p>
        <p className="mt-1 font-display text-h3 font-semibold tabular-nums text-ink-900">
          {event.year}
        </p>
        {event.confidence ? (
          <p className="mt-1 font-mono text-[0.6875rem] uppercase tracking-wider text-ink-500">
            {event.confidence}
          </p>
        ) : null}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-display text-h3 font-semibold text-ink-900">
          {event.title}
        </h3>
        <p className="mt-2 max-w-prose text-[0.9375rem] leading-relaxed text-ink-700">
          {event.summary}
        </p>
        {event.sources && event.sources.length > 0 ? (
          <ul className="mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-xs text-ink-500">
            {event.sources.map((s) => {
              const record = getSourceRecord(s.sourceId);
              return (
                <li key={`${s.sourceId}-${s.url}`}>
                  <span className="eyebrow mr-1 text-ink-300">Source</span>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ink-700 underline decoration-line-strong underline-offset-2 hover:text-accent-700"
                  >
                    {record?.name ?? s.sourceId}
                  </a>
                  {s.checkedAt ? (
                    <span className="ml-1 text-ink-500">· checked {s.checkedAt}</span>
                  ) : null}
                </li>
              );
            })}
          </ul>
        ) : null}
        {event.caveats && event.caveats.length > 0 ? (
          <ul className="mt-3 space-y-1 text-xs italic text-ink-500">
            {event.caveats.map((c) => (
              <li key={c}>· {c}</li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
}
