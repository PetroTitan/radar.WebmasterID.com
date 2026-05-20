import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { PRIMARY_NAV, SECONDARY_NAV } from "@/content/navigation";

/**
 * Top navigation.
 *
 * Mobile: collapses to a native `<details>` disclosure — zero
 * client JS, fully server-rendered, browser-native interactivity.
 */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-surface-base/85 backdrop-blur">
      <Container as="div" className="flex h-16 items-center justify-between gap-6 md:h-[4.5rem]">
        <Link
          href="/"
          aria-label="Radar WebmasterID home"
          className="-ml-1 rounded-md px-1 py-0.5"
        >
          <Logo variant="compact" />
        </Link>

        <nav
          aria-label="Primary"
          className="hidden flex-1 items-center justify-center gap-7 md:flex"
        >
          {PRIMARY_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[0.9rem] font-medium text-ink-700 transition hover:text-ink-900"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-6 md:flex">
          {SECONDARY_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[0.9rem] text-ink-500 transition hover:text-ink-900"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <details className="relative md:hidden">
          <summary
            aria-label="Open navigation"
            className="inline-flex size-10 items-center justify-center rounded-md border border-line text-ink-700 transition hover:border-line-strong hover:text-ink-900"
          >
            <MenuIcon />
          </summary>
          <div
            role="menu"
            className="absolute right-0 top-full mt-2 w-72 rounded-card border border-line bg-surface-base p-3 shadow-card-hover"
          >
            <p className="px-3 pb-2 eyebrow text-ink-500">Explore</p>
            <ul className="space-y-0.5">
              {PRIMARY_NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block rounded-md px-3 py-2.5 text-sm font-medium text-ink-900 hover:bg-surface-subtle"
                  >
                    {item.label}
                    {item.description ? (
                      <span className="mt-0.5 block text-xs font-normal text-ink-500">
                        {item.description}
                      </span>
                    ) : null}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-3 border-t border-line pt-3">
              <p className="px-3 pb-2 eyebrow text-ink-500">Platform</p>
              <ul className="space-y-0.5">
                {SECONDARY_NAV.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="block rounded-md px-3 py-2.5 text-sm text-ink-700 hover:bg-surface-subtle hover:text-ink-900"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </details>
      </Container>
    </header>
  );
}

function MenuIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}
