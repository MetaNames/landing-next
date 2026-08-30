import type { NextRequest } from "next/server";

import { config } from "@/lib/config";
import { normalizeDomain, validateDomainName } from "@/lib/domain-validator";

export const dynamic = "force-dynamic";

interface CheckResponse {
  domainPresent: boolean;
  parentPresent: boolean;
}

/**
 * Availability proxy for the hero search. The chain read lives in the app
 * (`/api/domains/[name]/check`); the landing only normalizes the name, rejects
 * obviously invalid input before spending a round trip, and re-shapes the
 * answer into the `available` flag the UI cares about.
 */
export async function GET(request: NextRequest) {
  const raw = request.nextUrl.searchParams.get("name")?.trim().toLowerCase();

  if (!raw) {
    return Response.json({ error: "Missing name" }, { status: 400 });
  }

  const validation = validateDomainName(raw);
  if (!validation.valid) {
    return Response.json({ error: validation.error }, { status: 400 });
  }

  const name = normalizeDomain(raw);

  try {
    const upstream = await fetch(
      `${config.appUrl}/api/domains/${encodeURIComponent(name)}/check`,
      { next: { revalidate: 30 } },
    );

    if (!upstream.ok) {
      return Response.json(
        { error: "Availability lookup failed" },
        { status: 502 },
      );
    }

    const { domainPresent, parentPresent }: CheckResponse =
      await upstream.json();

    return Response.json(
      { name, available: !domainPresent, domainPresent, parentPresent },
      {
        headers: {
          "Cache-Control": "public, s-maxage=30, stale-while-revalidate=120",
        },
      },
    );
  } catch (error) {
    console.error("Failed to check domain:", error);

    return Response.json(
      { error: "Availability lookup failed" },
      { status: 502 },
    );
  }
}
