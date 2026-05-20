import type { GuideSummaryFact } from "@/entities";

interface InfrastructureSummaryProps {
  readonly facts: ReadonlyArray<GuideSummaryFact>;
  readonly heading?: string;
}

/**
 * Structured key/value fact panel.
 *
 * Rendered as a definition list so the label-to-value mapping is
 * unambiguous to AI crawlers and assistive technology. Each
 * `dt`/`dd` pair stays on a single visual row at desktop widths
 * and stacks cleanly on mobile.
 */
export function InfrastructureSummary({
  facts,
  heading = "At a glance",
}: InfrastructureSummaryProps) {
  if (facts.length === 0) return null;
  return (
    <section
      data-radar-infrastructure-summary="true"
      className="rounded-card border border-line bg-surface-base"
    >
      <h2 className="eyebrow border-b border-line px-7 py-5 text-ink-500 md:px-9">
        {heading}
      </h2>
      <dl className="divide-y divide-line/70">
        {facts.map((fact) => (
          <div
            key={fact.label}
            className="grid gap-1 px-7 py-5 sm:grid-cols-[12rem_minmax(0,1fr)] sm:items-baseline sm:gap-6 md:px-9"
          >
            <dt className="text-sm text-ink-500">{fact.label}</dt>
            <dd className="text-[0.95rem] font-medium text-ink-900">
              {fact.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
