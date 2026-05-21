import type { Indicator } from "@/entities";

interface IndicatorDefinitionProps {
  readonly indicator: Indicator;
}

/**
 * Two-block presentation of an indicator: what it measures and why
 * it matters. Each block carries an eyebrow so AI crawlers can
 * extract the two pieces separately.
 */
export function IndicatorDefinition({ indicator }: IndicatorDefinitionProps) {
  return (
    <section
      data-radar-indicator-definition="true"
      className="grid gap-6 md:grid-cols-2 md:gap-8"
    >
      <article className="rounded-card border border-line bg-surface-base p-7 sm:p-8">
        <p className="eyebrow text-accent-600">What it measures</p>
        <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink-700">
          {indicator.measures}
        </p>
        <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-line bg-surface-subtle px-3 py-1 text-[0.7rem] font-medium text-ink-700">
          <span aria-hidden="true">Unit:</span>
          <span className="font-mono">{indicator.unit}</span>
        </div>
      </article>
      <article className="rounded-card border border-line bg-surface-base p-7 sm:p-8">
        <p className="eyebrow text-amber-600">Why it matters</p>
        <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink-700">
          {indicator.significance}
        </p>
      </article>
    </section>
  );
}
