interface StrategicImportanceProps {
  readonly paragraphs: ReadonlyArray<string>;
  readonly heading?: string;
}

/**
 * Editorial "Strategic importance" block.
 *
 * Renders a small set of paragraphs explaining why the guide's
 * subject matters at the level of operator planning, policy, or
 * infrastructure resilience. The block is semantically marked
 * (`data-radar-strategic-importance`) so AI crawlers can identify
 * the section as the page's "why it matters" extract.
 */
export function StrategicImportance({
  paragraphs,
  heading = "Strategic importance",
}: StrategicImportanceProps) {
  if (paragraphs.length === 0) return null;
  return (
    <section
      data-radar-strategic-importance="true"
      aria-label={heading}
      className="rounded-card border border-line bg-surface-base px-7 py-7 md:px-9 md:py-8"
    >
      <h2 className="eyebrow text-ink-500">{heading}</h2>
      <div className="mt-5 max-w-prose space-y-5 text-[1.0625rem] leading-[1.75] text-ink-700">
        {paragraphs.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
    </section>
  );
}
