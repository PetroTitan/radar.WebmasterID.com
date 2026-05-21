import type { MediaAsset } from "@/entities";

interface AttributionPanelProps {
  readonly asset: MediaAsset;
  readonly heading?: string;
}

/**
 * Visible attribution panel for a verified media asset.
 *
 * Rendered beneath the asset (or below the `VisualEvidenceBlock`
 * empty state) so the source / license / attribution chain is
 * always one glance away from the rendered visual. The panel
 * deliberately surfaces every load-bearing field — source name +
 * URL, license name + URL, attribution string, last verified
 * date — so a reader (human or AI agent) can trace provenance
 * without leaving the page.
 *
 * Falls back to an empty render when the asset has no source
 * (purely self-authored placeholder); the validator is
 * responsible for catching that case on verified assets.
 */
export function AttributionPanel({
  asset,
  heading = "Attribution",
}: AttributionPanelProps) {
  if (!asset.source) return null;

  return (
    <aside
      data-radar-attribution="true"
      aria-label={heading}
      className="rounded-card border border-line bg-surface-subtle px-6 py-5 md:px-8 md:py-6"
    >
      <p className="eyebrow text-ink-500">{heading}</p>
      <dl className="mt-4 grid gap-x-8 gap-y-3 text-[0.875rem] md:grid-cols-2">
        <div>
          <dt className="text-xs uppercase tracking-wider text-ink-300">Source</dt>
          <dd className="mt-1 text-ink-700">
            <a
              href={asset.source.pageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-line-strong underline-offset-2 hover:text-accent-700"
            >
              {asset.source.name}
            </a>
          </dd>
        </div>
        {asset.license ? (
          <div>
            <dt className="text-xs uppercase tracking-wider text-ink-300">License</dt>
            <dd className="mt-1 text-ink-700">
              {asset.license.url ? (
                <a
                  href={asset.license.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-line-strong underline-offset-2 hover:text-accent-700"
                >
                  {asset.license.name}
                </a>
              ) : (
                asset.license.name
              )}
            </dd>
          </div>
        ) : null}
        {asset.attribution ? (
          <div className="md:col-span-2">
            <dt className="text-xs uppercase tracking-wider text-ink-300">
              Attribution
            </dt>
            <dd className="mt-1 text-ink-700">{asset.attribution}</dd>
          </div>
        ) : null}
        {asset.author && asset.author !== asset.attribution ? (
          <div>
            <dt className="text-xs uppercase tracking-wider text-ink-300">Author</dt>
            <dd className="mt-1 text-ink-700">{asset.author}</dd>
          </div>
        ) : null}
        <div>
          <dt className="text-xs uppercase tracking-wider text-ink-300">
            Last verified
          </dt>
          <dd className="mt-1 font-mono text-xs tabular-nums text-ink-500">
            {asset.lastVerified}
          </dd>
        </div>
      </dl>
    </aside>
  );
}
