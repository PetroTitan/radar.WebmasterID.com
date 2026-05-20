import type { EditorialBlock } from "@/entities";

interface SectionDef {
  readonly key: keyof EditorialBlock;
  readonly title: string;
}

/**
 * Editorial section order. Pages render present sections in this
 * order, skipping any that are empty. The ordering reflects the
 * questions a reader asks about an infrastructure entity:
 * "why", "where in the graph", "what cloud lives here", "what
 * peering context", "what to take away".
 */
const SECTIONS: ReadonlyArray<SectionDef> = [
  { key: "significance", title: "Significance" },
  { key: "connectivityRole", title: "Connectivity role" },
  { key: "cloudRelevance", title: "Cloud relevance" },
  { key: "interconnectionContext", title: "Interconnection context" },
  { key: "strategicImportance", title: "Strategic importance" },
];

interface EditorialBlocksProps {
  readonly editorial: EditorialBlock;
}

/**
 * Renders an entity's editorial intelligence as a numbered,
 * publication-style stack. Each sub-section gets its own H3 plus
 * a small ordinal so the page reads like a long-form briefing
 * rather than a dashboard panel.
 *
 * Returns `null` if the editorial block is empty so caller pages
 * can omit the parent EntitySection cleanly.
 */
export function EditorialBlocks({ editorial }: EditorialBlocksProps) {
  const present = SECTIONS.flatMap((def) => {
    const paragraphs = editorial[def.key];
    if (!paragraphs || paragraphs.length === 0) return [];
    return [{ ...def, paragraphs }];
  });

  if (present.length === 0) return null;

  return (
    <div className="space-y-14 md:space-y-20">
      {present.map((section, i) => (
        <section
          key={section.key}
          id={section.key}
          className="scroll-mt-28 max-w-prose"
        >
          <p className="font-mono text-xs tabular-nums uppercase text-ink-300">
            Section {String(i + 1).padStart(2, "0")}
          </p>
          <h3 className="mt-3 font-display text-h1 font-semibold text-ink-900">
            {section.title}
          </h3>
          {section.paragraphs.map((paragraph) => (
            <p
              key={paragraph}
              className="mt-5 text-[0.9375rem] leading-relaxed text-ink-700"
            >
              {paragraph}
            </p>
          ))}
        </section>
      ))}
    </div>
  );
}

/**
 * Truth-checks whether an editorial block contains any prose at
 * all. Used by entity pages to decide whether to render the
 * outer "Infrastructure intelligence" EntitySection.
 */
export function hasEditorialContent(
  editorial: EditorialBlock | undefined,
): boolean {
  if (!editorial) return false;
  return SECTIONS.some((def) => (editorial[def.key]?.length ?? 0) > 0);
}
