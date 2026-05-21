/**
 * Shared dry-run output helpers.
 *
 * Every adapter's dry-run script prints a uniform report:
 * adapter name, sources it would call, endpoints, normalisation
 * mapping summary, and the path under `src/generated/` it would
 * write to.
 *
 * No network call is made by anything in this file. The dry-run
 * script is safe to run in any environment.
 */

interface DryRunReport {
  readonly adapter: string;
  readonly sourceName: string;
  readonly sourceId: string;
  readonly endpoints: ReadonlyArray<{ readonly description: string; readonly url: string }>;
  readonly outputPath: string;
  readonly normalizedRecordType: string;
  readonly notes?: ReadonlyArray<string>;
}

export function printDryRunReport(report: DryRunReport): void {
  const today = new Date().toISOString().slice(0, 10);
  const lines: string[] = [];

  lines.push("");
  lines.push(`Radar ingestion · dry-run`);
  lines.push("─".repeat(60));
  lines.push(`Adapter            ${report.adapter}`);
  lines.push(`Source             ${report.sourceName} (${report.sourceId})`);
  lines.push(`Output (if run)    ${report.outputPath.replace("<date>", today)}`);
  lines.push(`Record type        ${report.normalizedRecordType}`);
  lines.push("");
  lines.push("Endpoints this adapter would call:");
  for (const e of report.endpoints) {
    lines.push(`  · ${e.description}`);
    lines.push(`      ${e.url}`);
  }
  if (report.notes && report.notes.length > 0) {
    lines.push("");
    lines.push("Editorial notes:");
    for (const n of report.notes) {
      lines.push(`  · ${n}`);
    }
  }
  lines.push("");
  lines.push(
    "Dry-run only. No network calls were made. Public pages will continue to read from src/data/research/*.reviewed.ts only.",
  );
  lines.push("");

  console.log(lines.join("\n"));
}
