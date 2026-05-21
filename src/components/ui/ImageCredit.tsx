import type { MediaAsset } from "@/entities";
import Link from "next/link";

interface ImageCreditProps {
  readonly asset: MediaAsset;
}

const STATUS_STYLE: Readonly<
  Record<MediaAsset["status"], { readonly label: string; readonly className: string }>
> = {
  verified: {
    label: "Verified — licensed and attributed",
    className: "bg-accent-50 text-accent-700",
  },
  candidate: {
    label: "Candidate — editorial review pending",
    className: "bg-amber-50 text-amber-600",
  },
  unverified: {
    label: "Unverified — placeholder",
    className: "bg-surface-raised text-ink-500",
  },
};

/**
 * Structured per-asset credit card used on /visuals and on
 * individual asset pages. Carries every metadata field required
 * by the platform's editorial-discipline rule that every published
 * visual is traceable.
 */
export function ImageCredit({ asset }: ImageCreditProps) {
  const status = STATUS_STYLE[asset.status];
  return (
    <section
      data-radar-image-credit="true"
      className="rounded-card border border-line bg-surface-base"
    >
      <h2 className="eyebrow border-b border-line px-7 py-5 text-ink-500 md:px-9">
        Credit and licensing
      </h2>
      <dl className="divide-y divide-line/70">
        <Row label="Status">
          <span
            className={`rounded-full px-2.5 py-0.5 text-[0.7rem] font-medium ${status.className}`}
          >
            {status.label}
          </span>
        </Row>
        <Row label="Type">
          <span className="capitalize">{asset.type}</span>
        </Row>
        {asset.source ? (
          <Row label="Source">
            <Link
              href={asset.source.pageUrl}
              className="text-ink-900 underline decoration-line-strong underline-offset-4 hover:decoration-accent-400 hover:text-accent-700"
              target="_blank"
              rel="noopener noreferrer"
            >
              {asset.source.name}
            </Link>
          </Row>
        ) : (
          <Row label="Source">
            <span className="italic text-ink-300">
              Visual asset not yet verified.
            </span>
          </Row>
        )}
        {asset.license ? (
          <Row label="License">
            {asset.license.url ? (
              <Link
                href={asset.license.url}
                className="text-ink-900 underline decoration-line-strong underline-offset-4 hover:decoration-accent-400 hover:text-accent-700"
                target="_blank"
                rel="noopener noreferrer"
              >
                {asset.license.name}
              </Link>
            ) : (
              <span>{asset.license.name}</span>
            )}
            {asset.license.attributionRequired ? (
              <span className="ml-2 text-xs text-ink-500">
                · attribution required
              </span>
            ) : null}
          </Row>
        ) : (
          <Row label="License">
            <span className="italic text-ink-300">Not yet recorded.</span>
          </Row>
        )}
        {asset.author ? (
          <Row label="Author">{asset.author}</Row>
        ) : null}
        {asset.attribution ? (
          <Row label="Attribution string">{asset.attribution}</Row>
        ) : null}
        <Row label="Alt text">{asset.altText}</Row>
        {asset.dimensions ? (
          <Row label="Dimensions">
            <span className="font-mono tabular-nums">
              {asset.dimensions.width} × {asset.dimensions.height} px
            </span>
          </Row>
        ) : null}
        <Row label="Last verified">{asset.lastVerified}</Row>
      </dl>
      {asset.riskNotes && asset.riskNotes.length > 0 ? (
        <div className="border-t border-line px-7 py-5 md:px-9">
          <p className="eyebrow text-amber-600">Risk notes</p>
          <ul className="mt-3 space-y-2">
            {asset.riskNotes.map((note) => (
              <li
                key={note}
                className="flex gap-3 text-[0.9375rem] leading-relaxed text-ink-700"
              >
                <span
                  aria-hidden="true"
                  className="mt-[0.55rem] size-1.5 shrink-0 rounded-full bg-amber-500"
                />
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  );
}

function Row({
  label,
  children,
}: {
  readonly label: string;
  readonly children: React.ReactNode;
}) {
  return (
    <div className="grid gap-1 px-7 py-5 sm:grid-cols-[12rem_minmax(0,1fr)] sm:items-baseline sm:gap-6 md:px-9">
      <dt className="text-sm text-ink-500">{label}</dt>
      <dd className="text-[0.95rem] font-medium text-ink-900">{children}</dd>
    </div>
  );
}
