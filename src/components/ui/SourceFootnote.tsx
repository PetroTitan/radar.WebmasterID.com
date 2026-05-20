import type { SourceCitation } from "@/entities";
import Link from "next/link";
import { formatDisplayDate } from "@/lib/dates";
import { getSourceRecord } from "@/source-registry";

interface SourceFootnoteProps {
  readonly citations: ReadonlyArray<SourceCitation>;
}

/**
 * Academic-style citation list. Each entry sits in a hanging-
 * indent grid so the numeral aligns and the text flows naturally
 * — no left-rail visual weight, no dashboard pills.
 */
export function SourceFootnote({ citations }: SourceFootnoteProps) {
  if (citations.length === 0) {
    return (
      <p className="text-sm italic text-ink-500">
        No sources cited. This record has not been verified.
      </p>
    );
  }

  return (
    <ol className="space-y-4">
      {citations.map((citation, index) => {
        const source = getSourceRecord(citation.sourceId);
        const sourceName = source?.name ?? citation.sourceId;
        return (
          <li
            key={`${citation.sourceId}-${index}`}
            className="grid grid-cols-[2rem_minmax(0,1fr)] items-baseline gap-x-2 text-[0.9375rem] leading-relaxed text-ink-700"
          >
            <span className="font-mono text-xs tabular-nums text-ink-300">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span>
              <Link
                href={`/sources#${citation.sourceId}`}
                className="font-medium text-ink-900 underline decoration-line-strong underline-offset-4 hover:decoration-accent-400 hover:text-accent-700"
              >
                {sourceName}
              </Link>
              {citation.url ? (
                <>
                  {" "}
                  <a
                    href={citation.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ink-500 hover:text-ink-900"
                  >
                    ↗
                  </a>
                </>
              ) : null}
              {citation.checkedAt ? (
                <span className="text-ink-500">
                  {" · "}checked {formatDisplayDate(citation.checkedAt)}
                </span>
              ) : null}
              {citation.note ? (
                <span className="text-ink-500"> · {citation.note}</span>
              ) : null}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
