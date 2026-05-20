import type { ConfidenceLevel, ISODate, SourceCitation } from "./shared";

/**
 * A single observed metric pinned to an entity and a date.
 *
 * Metrics are append-only. The page renderer surfaces the most
 * recent observation per (entityRef, metricKey) pair and links to
 * the time-series in the dataset registry.
 */
export interface InfrastructureMetric {
  /** Composite reference, e.g. "country:de", "city:frankfurt",
   *  "ixp:de-cix-frankfurt". */
  readonly entityRef: string;
  /** Stable identifier for the metric type. See MetricKey. */
  readonly metricKey: MetricKey;
  /** Numeric value. Always paired with `unit`. */
  readonly value: number;
  /** Unit string ("Tbps", "ms", "MW", "AS", "%", etc.). */
  readonly unit: string;
  /** Date the value was observed (not the date it was published). */
  readonly observedAt: ISODate;
  /** Confidence in this specific observation. */
  readonly confidence: ConfidenceLevel;
  /** Citations supporting the value. */
  readonly sources: ReadonlyArray<SourceCitation>;
}

/**
 * Canonical metric identifiers.
 *
 * Keep this enum tight. A new metric requires a methodology entry
 * before it can be ingested.
 */
export type MetricKey =
  | "peering-traffic-peak-tbps"
  | "peering-traffic-avg-tbps"
  | "connected-networks-count"
  | "announced-cloud-regions-count"
  | "submarine-cable-landings-count"
  | "ixp-count"
  | "internet-penetration-pct"
  | "ipv6-adoption-pct"
  | "median-fixed-latency-ms"
  | "datacenter-power-mw";
