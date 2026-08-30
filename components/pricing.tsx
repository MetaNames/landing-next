"use client";

import { AlertCircle } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";
import { useRegistrationFee } from "@/hooks/useRegistrationFee";
import { PRICING } from "@/lib/constants";

function TierPrice({ sample }: { sample: string }) {
  const { data, isPending, isError } = useRegistrationFee(sample);

  if (isPending) return <Skeleton className="h-8 w-20" />;

  if (isError || !data) {
    return (
      <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
        <AlertCircle className="h-4 w-4" aria-hidden="true" />
        Unavailable
      </span>
    );
  }

  return (
    <span className="font-heading text-3xl font-extrabold text-primary-glow text-glow">
      {data.feesLabel}
      <span className="ml-1 font-sans text-xs font-medium tracking-[0.18em] uppercase text-muted-foreground">
        {data.symbol.split("_").at(-1)}
      </span>
    </span>
  );
}

export function Pricing() {
  return (
    <div className="grid w-full max-w-4xl grid-cols-2 gap-3 md:grid-cols-3">
      {PRICING.TIERS.map(({ label, sample }) => (
        <div
          key={sample}
          className="glass-panel flex flex-col items-center gap-2 rounded-2xl px-4 py-6 transition-colors hover:border-primary/40"
        >
          <TierPrice sample={sample} />
          <span className="text-xs tracking-[0.18em] uppercase text-muted-foreground">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}
