import type { MediaAssetStatus } from "@/entities";

interface VerifiedMediaBadgeProps {
  readonly status: MediaAssetStatus;
}

/**
 * Small badge that surfaces a media asset's verification status.
 *
 * Distinct from a generic Status pill so the visual archive can
 * reuse the same vocabulary on every surface — entity pages, the
 * /visuals index, and per-asset detail pages all show the same
 * pill for the same asset.
 */
const STATUS_LABEL: Readonly<Record<MediaAssetStatus, string>> = {
  verified: "Verified",
  candidate: "Candidate",
  unverified: "Unverified",
};

const STATUS_CLASS: Readonly<Record<MediaAssetStatus, string>> = {
  verified: "bg-accent-50 text-accent-700",
  candidate: "bg-amber-50 text-amber-600",
  unverified: "bg-surface-raised text-ink-500",
};

export function VerifiedMediaBadge({ status }: VerifiedMediaBadgeProps) {
  return (
    <span
      data-radar-media-badge={status}
      className={`rounded-full px-2.5 py-0.5 text-[0.7rem] font-medium ${STATUS_CLASS[status]}`}
    >
      {STATUS_LABEL[status]}
    </span>
  );
}
