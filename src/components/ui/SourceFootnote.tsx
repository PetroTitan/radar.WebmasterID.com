import type { SourceCitation } from "@/entities";
import Link from "next/link";
import { formatDisplayDate } from "@/lib/dates";
import { getSourceRecord } from "@/source-registry";

interface SourceFootnoteProps {
  readonly citations: ReadonlyArray<SourceCitation>;
}

export function SourceFootnote({ citations }: SourceFootnoteProps) {
  if (citations.length === 0) {
    return (
      <p className="text-sm italic text-ink-500">
        No sources cited. This record has not been verified.
      </p>
    );
  }

  return (
    <ol className="space-y-4 text-sm leading-relaxed text-ink-700">
      {citations.map((citation, index) => {
        const source = getSourceRecord(citation.sourceId);
        const sourceName = source?.name ?? citation.sourceId;
        return (
          <li
            key={`${citation.sourceId}-${index}`}
            className="flex gap-4 border-l-2 border-line pl-4"
          >
            <span className="shrink-0 font-mono text-xs text-ink-300">
              [{String(index + 1).padStart(2, "0")}]
            </span>
            <span>
              <Link
                href={`/sources#${citation.sourceId}`}
                className="font-medium text-accent-600 hover:text-accent-700"
              >
                {sourceName}
              </Link>
              {citation.url ? (
                <>
                  {" — "}
                  <a
                    href={citation.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline decoration-line-strong underline-offset-2 hover:text-ink-900"
                  >
                    record
                  </a>
                </>
              ) : null}
              {citation.checkedAt ? (
                <span className="text-ink-500">
                  {" "}
                  · checked {formatDisplayDate(citation.checkedAt)}
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
