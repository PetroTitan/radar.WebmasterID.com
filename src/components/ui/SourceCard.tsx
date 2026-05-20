import type { SourceRecord } from "@/entities";
import { formatDisplayDate } from "@/lib/dates";
import { TrustTierBadge } from "./TrustTierBadge";

export function SourceCard({ source }: { readonly source: SourceRecord }) {
  return (
    <article className="flex h-full flex-col gap-6 rounded-card border border-line bg-surface-base p-8 transition hover:border-line-strong hover:shadow-card-hover">
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="eyebrow text-ink-500">{source.category}</p>
          <h3 className="mt-2.5 font-display text-h3 font-semibold text-ink-900">
            {source.name}
          </h3>
        </div>
        <TrustTierBadge tier={source.trustTier} />
      </header>
      <p className="text-[0.9375rem] leading-relaxed text-ink-500">
        {source.description}
      </p>
      {source.coverage && source.coverage.length > 0 ? (
        <ul className="flex flex-wrap gap-1.5 text-xs text-ink-500">
          {source.coverage.map((topic) => (
            <li
              key={topic}
              className="rounded-full bg-surface-subtle px-2.5 py-1"
            >
              {topic}
            </li>
          ))}
        </ul>
      ) : null}
      <dl className="mt-auto grid grid-cols-1 gap-x-4 gap-y-4 border-t border-line pt-6 text-xs text-ink-700 sm:grid-cols-3">
        <div>
          <dt className="text-ink-500">Update frequency</dt>
          <dd className="mt-1 font-medium capitalize text-ink-900">
            {source.updateFrequency}
          </dd>
        </div>
        <div>
          <dt className="text-ink-500">Licensing</dt>
          <dd className="mt-1 font-medium text-ink-900">{source.licenseNote}</dd>
        </div>
        <div>
          <dt className="text-ink-500">Last checked</dt>
          <dd className="mt-1 font-medium text-ink-900">
            {formatDisplayDate(source.lastChecked)}
          </dd>
        </div>
      </dl>
      <a
        href={source.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm font-medium text-accent-600 hover:text-accent-700"
      >
        Visit source →
      </a>
    </article>
  );
}
