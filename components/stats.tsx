"use client";

import Image from "next/image";
import CountUp from "react-countup";
import { AlertCircle, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";

import partisiaImage from "@/public/assets/images/partisia-logo.png";
import { useStats } from "@/hooks/useStats";
import { EXTERNAL_LINKS } from "@/lib/constants";

function StatValue({ value }: { value: number }) {
  if (!value) return <span aria-hidden="true">—</span>;
  return (
    <CountUp
      end={value}
      duration={2.5}
      separator=","
      enableScrollSpy
      scrollSpyOnce
    />
  );
}

export function Stats() {
  const { stats, isError, isFetching, refetch } = useStats();

  if (isError && !stats) {
    return (
      <div
        className="glass-panel mx-auto flex w-full max-w-3xl flex-col items-center gap-3 rounded-2xl p-6 text-center"
        role="alert"
      >
        <AlertCircle className="h-5 w-5 text-muted-foreground" aria-hidden />
        <p className="text-sm text-muted-foreground">
          Live numbers are unavailable right now.
        </p>
        <Button
          variant="outline"
          size="lg"
          onClick={() => refetch()}
          disabled={isFetching}
        >
          <RefreshCw
            data-icon="inline-start"
            className={isFetching ? "animate-spin" : undefined}
          />
          Try again
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-3xl mx-auto">
      <div className="glass-panel rounded-2xl p-6 flex items-center justify-center gap-4">
        <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
          Powered by
        </span>
        <a
          href={EXTERNAL_LINKS.PARTISIA}
          target="_blank"
          rel="noopener noreferrer"
          className="focus-ring rounded-md transition-opacity opacity-90 hover:opacity-100"
        >
          <Image
            src={partisiaImage}
            alt="Partisia Blockchain"
            className="w-full h-auto max-w-28"
          />
        </a>
      </div>

      <div className="glass-panel rounded-2xl p-6 flex flex-col gap-1 items-center justify-center">
        <span className="font-heading text-3xl font-extrabold text-primary-glow text-glow">
          <StatValue value={stats?.domainCount ?? 0} />
        </span>
        <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
          Names Registered
        </span>
      </div>

      <div className="glass-panel rounded-2xl p-6 flex flex-col gap-1 items-center justify-center">
        <span className="font-heading text-3xl font-extrabold text-primary-glow text-glow">
          <StatValue value={stats?.ownerCount ?? 0} />
        </span>
        <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
          Unique Wallets
        </span>
      </div>
    </div>
  );
}
