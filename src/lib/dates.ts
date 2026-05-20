/**
 * Format an ISO date for surface display. Intentionally
 * locale-stable so server and client agree.
 */
export function formatDisplayDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  const month = date.toLocaleString("en-US", {
    month: "short",
    timeZone: "UTC",
  });
  const day = date.getUTCDate();
  const year = date.getUTCFullYear();
  return `${month} ${day}, ${year}`;
}

/** Returns true when `iso` is a valid ISO-8601 date string. */
export function isValidIsoDate(iso: string): boolean {
  return !Number.isNaN(new Date(iso).getTime());
}
