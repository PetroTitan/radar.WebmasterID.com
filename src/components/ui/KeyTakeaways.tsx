interface KeyTakeawaysProps {
  readonly takeaways: ReadonlyArray<string>;
  readonly heading?: string;
}

/**
 * Bulleted summary block. Each takeaway is a single sentence-ish
 * line, intentionally extractable both visually and by AI
 * crawlers reading the page's DOM.
 *
 * Rendered as a semantic <section> with an H2 heading so each
 * takeaway list is addressable by document structure rather than
 * by class names alone.
 */
export function KeyTakeaways({
  takeaways,
  heading = "Key takeaways",
}: KeyTakeawaysProps) {
  if (takeaways.length === 0) return null;
  return (
    <section
      data-radar-key-takeaways="true"
      className="rounded-card border border-line bg-surface-base p-7 md:p-9"
    >
      <h2 className="eyebrow text-ink-500">{heading}</h2>
      <ol className="mt-6 space-y-4">
        {takeaways.map((takeaway, i) => (
          <li
            key={takeaway}
            className="flex gap-4 text-[0.9375rem] leading-relaxed text-ink-700"
          >
            <span className="shrink-0 font-mono text-xs tabular-nums text-ink-300">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span>{takeaway}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
