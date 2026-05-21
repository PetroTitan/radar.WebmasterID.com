import Image from "next/image";
import type { MediaAsset, MediaInlineComponent } from "@/entities";
import { InterconnectionDiagram } from "@/components/diagrams/InterconnectionDiagram";
import { CableLandingDiagram } from "@/components/diagrams/CableLandingDiagram";
import { CloudRegionDistributionDiagram } from "@/components/diagrams/CloudRegionDistributionDiagram";
import { CarrierNeutralFacilityDiagram } from "@/components/diagrams/CarrierNeutralFacilityDiagram";
import { InfrastructureRedundancyDiagram } from "@/components/diagrams/InfrastructureRedundancyDiagram";
import { VisualAttribution } from "./VisualAttribution";

interface VisualContentBlockProps {
  readonly asset: MediaAsset;
}

const INLINE_COMPONENTS: Readonly<
  Record<MediaInlineComponent, () => React.ReactElement>
> = {
  InterconnectionDiagram,
  CableLandingDiagram,
  CloudRegionDistributionDiagram,
  CarrierNeutralFacilityDiagram,
  InfrastructureRedundancyDiagram,
};

/**
 * Renderable wrapper around a registered media asset.
 *
 * Rendering rules:
 *   - status === "verified" + inlineComponent → renders the
 *     authored SVG diagram. The diagram component owns the
 *     figure / figcaption shell; this wrapper just resolves it.
 *   - status === "verified" + localPath → renders a responsive
 *     `<img>` with intrinsic dimensions and the alt text from the
 *     registry. Attribution is rendered beneath if the license
 *     requires it.
 *   - status === "candidate" or "unverified" → renders an honest
 *     placeholder card. No image bytes, no rendered asset.
 *
 * Strict editorial rule: a non-verified asset never renders
 * pictorial content.
 */
export function VisualContentBlock({ asset }: VisualContentBlockProps) {
  if (asset.status === "verified") {
    if (asset.inlineComponent) {
      const Component = INLINE_COMPONENTS[asset.inlineComponent];
      // The diagram components ship with their own figure / figcaption.
      // We render them as-is; VisualAttribution would be redundant
      // because the figcaption already credits Radar editorial.
      return <Component />;
    }
    if (asset.localPath && asset.dimensions) {
      return (
        <figure className="rounded-card border border-line bg-surface-base">
          <Image
            src={asset.localPath}
            alt={asset.altText}
            width={asset.dimensions.width}
            height={asset.dimensions.height}
            sizes="(min-width: 80rem) 76rem, 100vw"
            className="block h-auto w-full rounded-t-card"
          />
          <figcaption className="border-t border-line px-6 py-4 text-xs text-ink-500 md:px-8">
            {asset.caption ? (
              <span className="block text-[0.8125rem] text-ink-700">
                {asset.caption}
              </span>
            ) : null}
            <VisualAttribution asset={asset} variant="inline" />
          </figcaption>
        </figure>
      );
    }
  }

  // Honest placeholder for candidate / unverified assets.
  return (
    <figure className="rounded-card border border-dashed border-line-strong bg-surface-subtle px-8 py-12 md:px-12 md:py-16">
      <p className="eyebrow text-ink-500">{asset.type}</p>
      <p className="mt-3 font-display text-h3 font-semibold text-ink-900">
        {asset.title}
      </p>
      <p className="mt-4 max-w-prose text-[0.9375rem] leading-relaxed text-ink-700">
        Visual asset not yet verified.
      </p>
      {asset.source ? (
        <p className="mt-2 max-w-prose text-xs text-ink-500">
          Candidate source:{" "}
          <a
            href={asset.source.pageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-line-strong underline-offset-2 hover:text-ink-900"
          >
            {asset.source.name}
          </a>
        </p>
      ) : null}
    </figure>
  );
}
