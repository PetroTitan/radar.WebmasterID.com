import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { Container } from "@/components/ui/Container";
import { QuickAnswer } from "@/components/ui/QuickAnswer";
import { buildPageMetadata } from "@/lib/metadata";
import { breadcrumbJsonLd, datasetJsonLd } from "@/lib/seo";
import { MEDIA_ASSETS } from "@/content/media";

const PAGE_PATH = "/visuals";
const LAST_UPDATED = "2026-05-21";

export const metadata: Metadata = buildPageMetadata({
  title: "Visual media registry",
  description:
    "Every image, diagram, and illustration on Radar WebmasterID, with its source, license, attribution, and verification status. Self-authored diagrams ship as verified; photographic content awaits editorial licensing review.",
  path: PAGE_PATH,
  lastUpdated: LAST_UPDATED,
});

const STATUS_LABEL: Readonly<Record<string, string>> = {
  verified: "Verified",
  candidate: "Candidate",
  unverified: "Unverified",
};

const STATUS_CLASS: Readonly<Record<string, string>> = {
  verified: "bg-accent-50 text-accent-700",
  candidate: "bg-amber-50 text-amber-600",
  unverified: "bg-surface-raised text-ink-500",
};

export default function VisualsIndex() {
  const ld = [
    datasetJsonLd({
      name: "Radar — Visual media registry",
      description:
        "Source-governed registry of every visual asset published on the platform.",
      path: PAGE_PATH,
      keywords: ["visual media", "image credits", "licensing", "attribution"],
    }),
    breadcrumbJsonLd([{ name: "Visuals", path: PAGE_PATH }]),
  ];

  const verified = MEDIA_ASSETS.filter((m) => m.status === "verified");
  const candidate = MEDIA_ASSETS.filter((m) => m.status === "candidate");
  const unverified = MEDIA_ASSETS.filter((m) => m.status === "unverified");

  return (
    <Container as="article">
      <header className="border-b border-line pb-12 md:pb-16">
        <p className="eyebrow text-accent-600">Visuals</p>
        <h1 className="mt-6 text-balance font-display text-hero font-semibold text-ink-900">
          Every visual on the platform, with its source.
        </h1>
        <p className="mt-7 max-w-prose text-lead text-ink-500">
          Radar publishes a visual asset only after its licensing,
          source, and attribution have been editorially verified.
          Self-authored diagrams ship under CC BY 4.0. Photographic
          assets require an explicit license review before they go
          live.
        </p>
        <p className="mt-6 text-sm text-ink-500">
          Last reviewed {LAST_UPDATED}.
        </p>
      </header>

      <div className="mt-12 md:mt-16">
        <QuickAnswer
          label="Editorial posture"
          answer='If a visual&apos;s licensing cannot be verified, it does not render anywhere on the platform. The registry preserves the candidate source URL and risk notes so the asset can be promoted once licensing is editorially confirmed; until then, the page renders "Visual asset not yet verified." in place of an image.'
        />
      </div>

      {verified.length > 0 ? (
        <Section
          label={`Verified · ${verified.length}`}
          description="Renderable visual assets. Currently all self-authored editorial diagrams under CC BY 4.0."
          assets={verified}
        />
      ) : null}
      {candidate.length > 0 ? (
        <Section
          label={`Candidate · ${candidate.length}`}
          description="Licensing reviewed, editorial sign-off pending."
          assets={candidate}
        />
      ) : null}
      {unverified.length > 0 ? (
        <Section
          label={`Unverified placeholders · ${unverified.length}`}
          description="Future visual records. Candidate source documented; no image bytes stored."
          assets={unverified}
        />
      ) : null}

      <section className="mt-14 max-w-prose md:mt-20">
        <h2 className="font-display text-h1 font-semibold text-ink-900">
          Why no Pinterest images
        </h2>
        <p className="mt-5 text-[0.9375rem] leading-relaxed text-ink-700">
          The platform refuses to publish any visual whose origin,
          license, and attribution cannot be traced. This rules out
          most stock-image platforms, every AI-generated &ldquo;data
          centre&rdquo; visual, and casual reuse from social or blog
          sources. The registry above is the entire surface of what
          Radar publishes.
        </p>
        <p className="mt-6 text-sm">
          <Link
            href="/methodology"
            className="text-accent-600 hover:text-accent-700"
          >
            Read the editorial methodology →
          </Link>
        </p>
      </section>

      {ld.map((node, i) => (
        <Script
          key={i}
          id={`ld-visuals-${i}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(node) }}
        />
      ))}
    </Container>
  );
}

function Section({
  label,
  description,
  assets,
}: {
  readonly label: string;
  readonly description: string;
  readonly assets: ReadonlyArray<(typeof MEDIA_ASSETS)[number]>;
}) {
  return (
    <section className="mt-14 md:mt-20">
      <p className="eyebrow text-ink-500">{label}</p>
      <p className="mt-3 max-w-prose text-[0.9375rem] leading-relaxed text-ink-700">
        {description}
      </p>
      <ol className="mt-8 divide-y divide-line border-y border-line">
        {assets.map((asset, i) => (
          <li key={asset.id} className="py-6 md:py-8">
            <Link
              href={`/visuals/${asset.id}`}
              className="group flex flex-wrap items-baseline gap-x-4 gap-y-2"
            >
              <span className="font-mono text-xs tabular-nums text-ink-300">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="eyebrow text-ink-500">{asset.type}</span>
              <span
                className={`rounded-full px-2.5 py-0.5 text-[0.7rem] font-medium ${STATUS_CLASS[asset.status]}`}
              >
                {STATUS_LABEL[asset.status]}
              </span>
              <span className="basis-full" />
              <span className="font-display text-lg font-semibold text-ink-900 transition group-hover:text-accent-700">
                {asset.title}
              </span>
              <span className="basis-full" />
              <span className="max-w-prose text-[0.9375rem] leading-relaxed text-ink-500">
                {asset.caption ?? asset.altText}
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}
