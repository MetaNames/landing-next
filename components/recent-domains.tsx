"use client";

import { formatDistanceToNow } from "date-fns";
import { ArrowRight } from "lucide-react";

import routes from "@/constants/routes";
import { useStats } from "@/hooks/useStats";
import { ANIMATION, DOMAIN_CONFIG } from "@/lib/constants";

function formatCreatedAt(date: string) {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
}

export function RecentDomains() {
  const { recentDomains } = useStats();

  if (recentDomains.length === 0) return null;

  return (
    <div
      className="relative flex w-full items-center overflow-hidden"
      role="region"
      aria-label="Recently registered domains"
    >
      <div
        className="flex w-max py-4 animate-marquee hover:[animation-play-state:paused]"
        style={{ ["--duration" as string]: `${ANIMATION.MARQUEE_DURATION}s` }}
        role="list"
      >
        {[...recentDomains, ...recentDomains].map((item, index) => (
          <div
            key={`${item.name}-${index}`}
            className="h-full px-2"
            role="listitem"
          >
            <a
              href={`${routes.domains.path}/${item.name}`}
              className="focus-ring group glass-panel flex h-full w-[20rem] flex-col justify-between gap-3 rounded-2xl px-5 py-4 text-left transition-colors hover:border-primary/40"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="font-heading text-lg font-bold tracking-tight text-foreground">
                  {item.name}
                </span>
                <span className="rounded-full bg-[var(--chip-registered-bg)] px-2.5 py-0.5 text-xs font-medium text-[var(--chip-registered-fg)]">
                  {DOMAIN_CONFIG.TLD}
                </span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs text-muted-foreground">
                  {formatCreatedAt(item.createdAt)}
                </span>
                <ArrowRight
                  className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary-glow"
                  aria-hidden="true"
                />
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
