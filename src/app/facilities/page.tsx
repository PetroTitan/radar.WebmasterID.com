import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { Container } from "@/components/ui/Container";
import { QuickAnswer } from "@/components/ui/QuickAnswer";
import { DATACENTER_FACILITIES, getCity, getIxp } from "@/data";
import { buildPageMetadata } from "@/lib/metadata";
import { breadcrumbJsonLd } from "@/lib/seo";
import { formatDisplayDate } from "@/lib/dates";

const PAGE_PATH = "/facilities";
const LAST_UPDATED = "2026-05-26";

export const metadata: Metadata = buildPageMetadata({
  title: "Datacenter facilities",
  description:
    "Source-bound identity records for named datacenter facilities — operator, metro, country, carrier-neutrality assertion, and the IXP and cloud-region ecosystem each facility sits inside. No speculative capacity figures, no fake rankings.",
  path: PAGE_PATH,
  lastUpdated: LAST_UPDATED,
});

export default function FacilitiesIndex() {
  const ld = breadcrumbJsonLd([{ name: "Facilities", path: PAGE_PATH }]);

  return (
    <Container as="article">
      <header className="border-b border-line pb-12 md:pb-16">
        <p className="eyebrow text-accent-600">Facilities</p>
        <h1 className="mt-6 text-balance font-display text-hero font-semibold text-ink-900">
          Datacenter facilities, source-bound.
        </h1>
        <p className="mt-7 max-w-editorial text-lead text-ink-500">
          Identity records for named datacenter buildings. Each
          record covers the operator, the parent metro, the
          carrier-neutrality assertion (when source-bound), and the
          IXP / cloud-region ecosystem the facility sits inside.
          Power envelopes, occupancy, rack counts, and tenant lists
          are deliberately out of scope.
        </p>
        <p className="mt-6 text-sm text-ink-500">
          Last reviewed {LAST_UPDATED}.
        </p>
      </header>

      <div className="mt-12 md:mt-16">
        <QuickAnswer
          label="Editorial posture"
          answer="The facility layer is an ecosystem graph, not a capacity dashboard. Facilities appear here only when their identity is corroborated by PeeringDB and the operator's own location pages. Carrier-neutrality is asserted only when the operator's own page describes the facility as such or when PeeringDB records corroborate dense multi-network presence."
        />
      </div>

      <section className="mt-14 md:mt-20">
        <p className="eyebrow text-ink-500">
          Facilities · {DATACENTER_FACILITIES.length}
        </p>
        <ol className="mt-8 divide-y divide-line border-y border-line">
          {DATACENTER_FACILITIES.map((facility, i) => {
            const city = getCity(facility.citySlug);
            const ixps = (facility.relatedIxpSlugs ?? [])
              .map((s) => getIxp(s))
              .filter((x): x is NonNullable<typeof x> => Boolean(x));
            return (
              <li key={facility.slug} className="py-6 md:py-8">
                <Link
                  href={`/facilities/${facility.slug}`}
                  className="group flex flex-wrap items-baseline gap-x-4 gap-y-2"
                >
                  <span className="font-mono text-xs tabular-nums text-ink-300">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="eyebrow text-ink-500">{facility.operator}</span>
                  {facility.carrierNeutral ? (
                    <span className="rounded-full bg-accent-50 px-2.5 py-0.5 text-[0.7rem] font-medium text-accent-700">
                      carrier-neutral
                    </span>
                  ) : null}
                  <span className="basis-full" />
                  <span className="font-display text-h3 font-semibold text-ink-900 transition group-hover:text-accent-700">
                    {facility.name}
                  </span>
                  <span className="basis-full" />
                  <p className="max-w-prose text-[0.9375rem] leading-relaxed text-ink-500">
                    {facility.summary ?? facility.ecosystemRole ?? "Identity record."}
                  </p>
                  <span className="basis-full" />
                  <p className="flex flex-wrap items-baseline gap-x-2 text-xs text-ink-500">
                    {city ? <span>{city.name}</span> : null}
                    <span className="font-mono uppercase tracking-wider text-ink-300">
                      {facility.countryCode}
                    </span>
                    {ixps.length > 0 ? (
                      <>
                        <span aria-hidden="true">·</span>
                        <span>
                          {ixps.map((ixp) => ixp.name).join(", ")}
                        </span>
                      </>
                    ) : null}
                    <span aria-hidden="true">·</span>
                    <span>
                      Last reviewed{" "}
                      {formatDisplayDate(facility.provenance.lastUpdated)}
                    </span>
                  </p>
                </Link>
              </li>
            );
          })}
        </ol>
      </section>

      <Script
        id="ld-facilities-index"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
      />
    </Container>
  );
}
