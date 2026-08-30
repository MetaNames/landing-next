"use client";

import { useQuery } from "@tanstack/react-query";

import { API, PRICING } from "@/lib/constants";
import { validateDomainName } from "@/lib/domain-validator";

export interface RegistrationFee {
  name: string;
  /** Human-readable amount in `symbol` units (e.g. 8 for 8 USDC). */
  feesLabel: number;
  /** Raw on-chain amount, in the coin's smallest unit. */
  fees: string;
  symbol: string;
}

/**
 * Mint fee for one name. Fees depend only on length and rarely move, so the
 * query is cached hard and never refetched on focus.
 */
export function useRegistrationFee(
  name: string,
  enabled = true,
  coin?: string,
) {
  const clean = name.trim().toLowerCase();

  return useQuery<RegistrationFee>({
    queryKey: ["registration-fee", clean, coin],
    enabled: enabled && clean.length > 0 && validateDomainName(clean).valid,
    queryFn: async () => {
      const params = new URLSearchParams({ name: clean });
      if (coin) params.set("coin", coin);

      const response = await fetch(`${API.REGISTRATION_FEES}?${params}`);

      if (!response.ok) throw new Error("Fee lookup failed");

      return response.json();
    },
    staleTime: PRICING.STALE_TIME_MS,
    retry: 1,
  });
}
