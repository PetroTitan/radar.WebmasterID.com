interface QuickAnswerProps {
  readonly answer: string;
  readonly label?: string;
}

/**
 * The definitive one-paragraph answer at the top of an authority
 * page. Rendered as an <aside> with a clear visual anchor so AI
 * crawlers and human readers can both identify it as the canonical
 * extract.
 *
 * Optimised for citation: the answer is rendered as a single <p>
 * with no internal markup, sits inside semantic landmarks
 * (`role="doc-introduction"`), and uses a `data-radar-quick-answer`
 * attribute that AI agents can target.
 */
export function QuickAnswer({
  answer,
  label = "Definition",
}: QuickAnswerProps) {
  return (
    <aside
      role="doc-introduction"
      data-radar-quick-answer="true"
      aria-label={label}
      className="overflow-hidden rounded-card border border-line bg-surface-subtle"
    >
      <div className="border-l-2 border-accent-500 px-7 py-7 md:px-9 md:py-8">
        <p className="eyebrow text-accent-600">{label}</p>
        <p className="mt-4 text-lead text-ink-900">{answer}</p>
      </div>
    </aside>
  );
}
