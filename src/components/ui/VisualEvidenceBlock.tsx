import Link from "next/link";
import type { MediaAsset } from "@/entities";
import { listMediaAssetsByEntityRef } from "@/content/media";
import { VisualContentBlock } from "./VisualContentBlock";
import { VerifiedMediaBadge } from "./VerifiedMediaBadge";

interface VisualEvidenceBlockProps {
  /** Canonical entity ref, e.g. `city:frankfurt`. */
  readonly entityRef: string;
  readonly heading?: string;
}

/**
 * Visual-evidence section for entity pages.
 *
 * Two sub-sections:
 *   1. Verified assets — rendered inline via `VisualContentBlock`.
 *      Anchored to a verified `MediaAsset` for the entity.
 *   2. Candidate / unverified assets — listed as registered intent
 *      records with a status badge and a link to `/visuals/<id>`,
 *      where their risk notes and source candidates are visible.
 *
 * The block is omitted entirely when the entity has no associated
 * media records, so empty entity pages do not show a stub.
 */
export function VisualEvidenceBlock({
  entityRef,
  heading = "Visual evidence",
}: VisualEvidenceBlockProps) {
  const assets = listMediaAssetsByEntityRef(entityRef);
  if (assets.length === 0) return null;

  const verified = assets.filter((a) => a.status === "verified");
  const pending = assets.filter((a) => a.status !== "verified");

  return (
    <div
      data-radar-visual-evidence="true"
      aria-label={heading}
      className="space-y-8"
    >
      {verified.length > 0 ? (
        <div className="space-y-6">
          {verified.map((asset) => (
            <figure key={asset.id} className="space-y-2">
              <VisualContentBlock asset={asset} />
              {asset.caption ? (
                <figcaption className="text-xs italic text-ink-500">
                  {asset.caption}
                </figcaption>
              ) : null}
            </figure>
          ))}
        </div>
      ) : null}

      {pending.length > 0 ? (
        <div className="rounded-card border border-dashed border-line-strong bg-surface-subtle px-6 py-5 md:px-8 md:py-6">
          <p className="eyebrow text-ink-500">Candidate visuals · {pending.length}</p>
          <p className="mt-3 max-w-prose text-[0.9375rem] leading-relaxed text-ink-700">
            Registered visual intent records. Source candidates have been
            identified but licensing has not been editorially confirmed.
            These do not render inline; each candidate&apos;s source page
            and risk notes are visible on the visual&apos;s registry entry.
          </p>
          <ul className="mt-5 space-y-3">
            {pending.map((asset) => (
              <li key={asset.id} className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <VerifiedMediaBadge status={asset.status} />
                <Link
                  href={`/visuals/${asset.id}`}
                  className="font-medium text-ink-900 underline decoration-line-strong underline-offset-2 hover:text-accent-700"
                >
                  {asset.title}
                </Link>
                <span className="basis-full" />
                <p className="max-w-prose text-[0.875rem] leading-relaxed text-ink-500">
                  {asset.caption ?? asset.altText}
                </p>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
