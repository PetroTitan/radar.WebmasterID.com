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
      <p className="text-sm text-graphite-400">
        No sources cited. This record has not been verified.
      </p>
    );
  }

  return (
    <ol className="space-y-3 text-sm text-graphite-300">
      {citations.map((citation, index) => {
        const source = getSourceRecord(citation.sourceId);
        const sourceName = source?.name ?? citation.sourceId;
        return (
          <li key={`${citation.sourceId}-${index}`} className="flex gap-3">
            <span className="text-graphite-500">[{index + 1}]</span>
            <span>
              <Link
                href={`/sources#${citation.sourceId}`}
                className="font-medium text-signal-blue-300 hover:text-signal-blue-200"
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
                    className="underline decoration-graphite-600 underline-offset-2 hover:text-graphite-100"
                  >
                    record
                  </a>
                </>
              ) : null}
              {citation.checkedAt ? (
                <span className="text-graphite-500">
                  {" "}
                  · checked {formatDisplayDate(citation.checkedAt)}
                </span>
              ) : null}
              {citation.note ? (
                <span className="text-graphite-500"> · {citation.note}</span>
              ) : null}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
