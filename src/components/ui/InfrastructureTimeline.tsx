import type { TimelineEvent } from "@/entities";
import { HistoricalMilestone } from "./HistoricalMilestone";

interface InfrastructureTimelineProps {
  readonly events: ReadonlyArray<TimelineEvent>;
  readonly heading?: string;
}

/**
 * Ordered timeline of year-precision historical events.
 *
 * Events are rendered in source order; the page author is
 * responsible for chronological ordering. Each event renders via
 * `HistoricalMilestone`, which carries its own source citations
 * and caveats. The wrapping element is a semantic `<ol>` so the
 * timeline structure is exposed to AI agents and assistive tech.
 */
export function InfrastructureTimeline({
  events,
  heading = "Timeline",
}: InfrastructureTimelineProps) {
  if (events.length === 0) return null;
  return (
    <section
      data-radar-infrastructure-timeline="true"
      aria-label={heading}
      className="rounded-card border border-line bg-surface-base"
    >
      <h2 className="eyebrow border-b border-line px-7 py-5 text-ink-500 md:px-9">
        {heading} · {events.length}
      </h2>
      <ol className="divide-y divide-line">
        {events.map((event, i) => (
          <li key={`${event.year}-${event.title}`}>
            <HistoricalMilestone event={event} index={i} />
          </li>
        ))}
      </ol>
    </section>
  );
}
