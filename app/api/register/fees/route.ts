import type { NextRequest } from "next/server";

import { config } from "@/lib/config";
import { normalizeDomain, validateDomainName } from "@/lib/domain-validator";
import { availableFeeCoins, feeCoinCandidates } from "@/lib/metanames";

export const revalidate = 3600;

interface FeesResponse {
  feesLabel: number;
  fees: string;
  symbol: string;
}

/**
 * Registration price for one name, quoted in the environment's preferred BYOC
 * coin. The chain read lives in the app (`/api/register/[name]/fees/[coin]`);
 * the landing only picks the coin and caches the answer, since mint fees are a
 * function of name length and change rarely.
 */
export async function GET(request: NextRequest) {
  const raw = request.nextUrl.searchParams.get("name")?.trim().toLowerCase();

  if (!raw) return Response.json({ error: "Missing name" }, { status: 400 });

  const validation = validateDomainName(raw);
  if (!validation.valid) {
    return Response.json({ error: validation.error }, { status: 400 });
  }

  const name = normalizeDomain(raw);
  const requestedCoin = request.nextUrl.searchParams.get("coin");

  if (requestedCoin && !availableFeeCoins.includes(requestedCoin)) {
    return Response.json({ error: "Unsupported coin symbol" }, { status: 400 });
  }

  try {
    const coins = requestedCoin ? [requestedCoin] : feeCoinCandidates;

    // The app rejects a coin its environment doesn't support, so try the
    // candidates in order and keep the first quote that comes back.
    for (const coin of coins) {
      const upstream = await fetch(
        `${config.appUrl}/api/register/${encodeURIComponent(name)}/fees/${coin}`,
        { next: { revalidate: 3600 } },
      );

      if (upstream.status === 400) continue;

      if (!upstream.ok) break;

      const { feesLabel, fees, symbol }: FeesResponse = await upstream.json();

      return Response.json(
        { name, feesLabel, fees, symbol },
        {
          headers: {
            "Cache-Control":
              "public, s-maxage=3600, stale-while-revalidate=86400",
          },
        },
      );
    }

    return Response.json({ error: "Fee lookup failed" }, { status: 502 });
  } catch (error) {
    console.error("Failed to fetch fees:", error);

    return Response.json({ error: "Fee lookup failed" }, { status: 502 });
  }
}
