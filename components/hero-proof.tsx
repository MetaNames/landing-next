"use client";

import { useStats } from "@/hooks/useStats";

const numberFormat = new Intl.NumberFormat("en-US");

/**
 * Live proof sitting directly under the search field: the hero asks for a
 * decision, and the registration counts are the strongest argument the page has
 * for making it. The row keeps its height whether or not the numbers have
 * arrived, so nothing below it moves once /api/stats resolves — and it shares
 * the `stats` query with the panel further down, so this costs no extra request.
 */
export function HeroProof() {
  const { stats } = useStats();

  return (
    <p className="flex min-h-5 items-center justify-center gap-2 text-xs text-muted-foreground">
      {stats ? (
        <>
          <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--chip-available-fg)] opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--chip-available-fg)]" />
          </span>
          <span>
            <strong className="font-mono font-semibold text-foreground">
              {numberFormat.format(stats.domainCount)}
            </strong>{" "}
            names claimed by{" "}
            <strong className="font-mono font-semibold text-foreground">
              {numberFormat.format(stats.ownerCount)}
            </strong>{" "}
            owners
          </span>
        </>
      ) : null}
    </p>
  );
}
