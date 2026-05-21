import type { MediaAsset } from "@/entities";
import Link from "next/link";

interface VisualAttributionProps {
  readonly asset: MediaAsset;
  readonly variant?: "inline" | "caption";
}

/**
 * Single-line attribution rendered next to (or beneath) a visual.
 *
 * Used inline when the asset's license requires attribution at the
 * point of use. Always links to the source page so the licensing
 * claim is verifiable.
 */
export function VisualAttribution({
  asset,
  variant = "caption",
}: VisualAttributionProps) {
  if (!asset.source || !asset.license) return null;
  const requiresAttribution = asset.license.attributionRequired;
  return (
    <p
      className={
        variant === "inline"
          ? "text-xs text-ink-500"
          : "mt-2 text-xs text-ink-500"
      }
    >
      <span>{requiresAttribution ? "Credit: " : "Source: "}</span>
      <a
        href={asset.source.pageUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-ink-700 underline decoration-line-strong underline-offset-2 hover:text-accent-700"
      >
        {asset.source.name}
      </a>
      {asset.license.url ? (
        <>
          {" · "}
          <a
            href={asset.license.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-ink-500 hover:text-ink-900"
          >
            {asset.license.name}
          </a>
        </>
      ) : (
        <>{" · "}<span>{asset.license.name}</span></>
      )}
      {asset.author ? <>{" · "}<span>{asset.author}</span></> : null}
      {" · "}
      <Link
        href={`/visuals/${asset.id}`}
        className="text-ink-500 hover:text-ink-900"
      >
        record
      </Link>
    </p>
  );
}
