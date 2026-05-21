interface CaveatBlockProps {
  readonly caveats: ReadonlyArray<string>;
  readonly heading?: string;
}

/**
 * Limitations / caveats callout.
 *
 * Renders the editor-supplied list of caveats that affect how a
 * guide or research page should be read. Visually distinguished
 * from the body so a reader (human or AI) can identify the
 * caveats without re-parsing the prose.
 *
 * Semantic markers: `data-radar-caveats="true"` on the section,
 * `data-radar-caveat-item` on each bullet.
 */
export function CaveatBlock({
  caveats,
  heading = "Caveats and limitations",
}: CaveatBlockProps) {
  if (caveats.length === 0) return null;
  return (
    <section
      data-radar-caveats="true"
      aria-label={heading}
      className="rounded-card border border-dashed border-line-strong bg-surface-subtle px-7 py-7 md:px-9 md:py-8"
    >
      <h2 className="eyebrow text-ink-500">{heading}</h2>
      <ul className="mt-5 space-y-3 max-w-prose">
        {caveats.map((caveat) => (
          <li
            key={caveat}
            data-radar-caveat-item="true"
            className="flex gap-3 text-[0.9375rem] leading-relaxed text-ink-700"
          >
            <span
              aria-hidden="true"
              className="mt-2 size-1.5 shrink-0 rounded-full bg-line-strong"
            />
            <span>{caveat}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
