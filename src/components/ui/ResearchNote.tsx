import type { ReactNode } from "react";

interface ResearchNoteProps {
  readonly children: ReactNode;
  readonly label?: string;
}

/**
 * Inline editorial note used inside research pages. Visually
 * distinct from body prose without being a "callout box" — closer
 * to a margin note than a banner.
 */
export function ResearchNote({ children, label = "Research note" }: ResearchNoteProps) {
  return (
    <aside
      role="note"
      data-radar-research-note="true"
      className="border-l-2 border-accent-400 bg-surface-subtle/60 py-4 pl-5 pr-4"
    >
      <p className="eyebrow text-accent-600">{label}</p>
      <div className="mt-2 text-[0.9375rem] leading-relaxed text-ink-700">
        {children}
      </div>
    </aside>
  );
}
