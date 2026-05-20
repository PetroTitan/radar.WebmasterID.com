import type { SourceRecord } from "@/entities";
import { formatDisplayDate } from "@/lib/dates";
import { TrustTierBadge } from "./TrustTierBadge";

export function SourceCard({ source }: { readonly source: SourceRecord }) {
  return (
    <article className="flex flex-col gap-4 rounded-lg border border-graphite-700/60 bg-graphite-900/60 p-6 transition hover:border-signal-blue-500/40">
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-graphite-50">
            {source.name}
          </h3>
          <p className="mt-1 text-xs uppercase tracking-eyebrow text-graphite-400">
            {source.category}
          </p>
        </div>
        <TrustTierBadge tier={source.trustTier} />
      </header>
      <p className="text-sm text-graphite-300">{source.description}</p>
      {source.coverage && source.coverage.length > 0 ? (
        <ul className="flex flex-wrap gap-2 text-xs text-graphite-400">
          {source.coverage.map((topic) => (
            <li
              key={topic}
              className="rounded-full border border-graphite-700/60 px-2 py-0.5"
            >
              {topic}
            </li>
          ))}
        </ul>
      ) : null}
      <dl className="grid grid-cols-1 gap-3 border-t border-graphite-800 pt-4 text-xs text-graphite-300 sm:grid-cols-3">
        <div>
          <dt className="text-graphite-500">Update frequency</dt>
          <dd className="mt-0.5 capitalize">{source.updateFrequency}</dd>
        </div>
        <div>
          <dt className="text-graphite-500">Licensing</dt>
          <dd className="mt-0.5">{source.licenseNote}</dd>
        </div>
        <div>
          <dt className="text-graphite-500">Last checked</dt>
          <dd className="mt-0.5">{formatDisplayDate(source.lastChecked)}</dd>
        </div>
      </dl>
      <a
        href={source.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm font-medium text-signal-blue-300 hover:text-signal-blue-200"
      >
        Visit source →
      </a>
    </article>
  );
}
