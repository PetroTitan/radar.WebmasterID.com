interface DataLimitationsProps {
  readonly limitations: ReadonlyArray<string>;
  readonly heading?: string;
}

/**
 * Renders a research artifact's known limitations as a structured
 * bullet list. Editorial discipline: every dataset, indicator, and
 * ranking on the platform publishes its limitations alongside its
 * methodology so the reader is never misled by an unstated caveat.
 */
export function DataLimitations({
  limitations,
  heading = "Known limitations",
}: DataLimitationsProps) {
  if (limitations.length === 0) return null;
  return (
    <section
      data-radar-data-limitations="true"
      className="rounded-card border border-line bg-surface-base p-7 sm:p-8"
    >
      <p className="eyebrow text-amber-600">{heading}</p>
      <ul className="mt-5 space-y-3">
        {limitations.map((limit) => (
          <li
            key={limit}
            className="flex gap-3 text-[0.9375rem] leading-relaxed text-ink-700"
          >
            <span
              aria-hidden="true"
              className="mt-[0.55rem] size-1.5 shrink-0 rounded-full bg-amber-500"
            />
            <span>{limit}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
