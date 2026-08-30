"use client";

import { useState } from "react";
import { AlertCircle } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";
import { useRegistrationFee } from "@/hooks/useRegistrationFee";
import { PRICING } from "@/lib/constants";
import { availableFeeCoins } from "@/lib/metanames";

const coinLabel = (symbol: string) => {
  const labels: Record<string, string> = {
    POLYGON_USDC: "USDC · Polygon",
    ETHEREUM_USDT: "USDT · Ethereum",
    TEST_COIN: "Test Coin",
    ETH_GOERLI: "ETH · Goerli",
  };

  return labels[symbol] ?? symbol;
};

const priceSymbol = (symbol: string) => {
  if (symbol === "TEST_COIN") return "TEST COIN";
  if (symbol === "ETH_GOERLI") return "ETH";
  return symbol.split("_").at(-1);
};

function TierPrice({ sample, coin }: { sample: string; coin: string }) {
  const { data, isPending, isError } = useRegistrationFee(sample, true, coin);

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
        {priceSymbol(data.symbol)} / yr
      </span>
    </span>
  );
}

export function Pricing() {
  const [coin, setCoin] = useState(availableFeeCoins[0]);

  return (
    <div className="flex w-full max-w-4xl flex-col items-center gap-5">
      <p className="text-center text-sm text-muted-foreground text-balance">
        Pay with supported tokens through BYOC (Bring Your Own Coin).
      </p>

      <div
        role="tablist"
        aria-label="Payment token"
        className="flex max-w-full gap-1 overflow-x-auto rounded-xl border border-border/70 bg-card/50 p-1"
      >
        {availableFeeCoins.map((symbol) => (
          <button
            key={symbol}
            type="button"
            role="tab"
            aria-selected={coin === symbol}
            onClick={() => setCoin(symbol)}
            className={`focus-ring shrink-0 rounded-lg px-3 py-2 text-xs font-semibold transition-colors ${
              coin === symbol
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            {coinLabel(symbol)}
          </button>
        ))}
      </div>

      <div className="grid w-full grid-cols-2 gap-3 md:grid-cols-3">
        {PRICING.TIERS.map(({ label, sample }) => (
          <div
            key={sample}
            className="glass-panel flex flex-col items-center gap-2 rounded-2xl px-4 py-6 transition-colors hover:border-primary/40"
          >
            <TierPrice sample={sample} coin={coin} />
            <span className="text-xs tracking-[0.18em] uppercase text-muted-foreground">
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
