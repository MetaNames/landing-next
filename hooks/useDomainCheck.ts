"use client";

import { useQuery } from "@tanstack/react-query";

import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { API, SEARCH } from "@/lib/constants";
import { stripTld, validateDomainName } from "@/lib/domain-validator";

export interface DomainCheck {
  name: string;
  available: boolean;
  domainPresent: boolean;
  parentPresent: boolean;
}

export type DomainCheckStatus =
  "idle" | "invalid" | "checking" | "available" | "taken" | "error";

interface UseDomainCheckOptions {
  /** Skip the debounce — used when the name is set programmatically. */
  immediate?: boolean;
}

export function useDomainCheck(
  input: string,
  { immediate = false }: UseDomainCheckOptions = {},
) {
  const raw = stripTld(input.trim().toLowerCase());
  const debounced = useDebouncedValue(raw, SEARCH.DEBOUNCE_MS);
  const name = immediate ? raw : debounced;

  const validation = name ? validateDomainName(name) : { valid: false };
  const enabled = name.length > 0 && validation.valid;

  const { data, isFetching, isError } = useQuery<DomainCheck>({
    queryKey: ["domain-check", name],
    enabled,
    queryFn: async () => {
      const response = await fetch(
        `${API.DOMAIN_CHECK}?name=${encodeURIComponent(name)}`,
      );

      if (!response.ok) {
        const body = await response.json().catch(() => null);
        throw new Error(body?.error ?? "Availability lookup failed");
      }

      return response.json();
    },
    staleTime: SEARCH.STALE_TIME_MS,
    retry: 1,
  });

  // `name` lags `raw` by the debounce, so treat "typed something new" as
  // still-checking rather than briefly flashing the previous verdict.
  const settled = data?.name === `${name}.mpc` && name === raw;

  let status: DomainCheckStatus = "idle";
  if (!raw) status = "idle";
  else if (!validateDomainName(raw).valid) status = "invalid";
  else if (isError) status = "error";
  else if (isFetching || !settled) status = "checking";
  else status = data?.available ? "available" : "taken";

  return {
    status,
    name: raw,
    fullName: raw ? `${raw}.mpc` : "",
    check: data,
    error: raw ? validateDomainName(raw).error : undefined,
  };
}
