import { describe, it, expect, vi, afterEach } from "vitest";

import { Pricing } from "@/components/pricing";
import { PRICING } from "@/lib/constants";
import { render, screen, waitFor } from "./render";

afterEach(() => vi.unstubAllGlobals());

describe("Pricing", () => {
  it("quotes a live fee per tier", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async (input: string | URL) => {
        const name = new URL(
          String(input),
          "http://localhost",
        ).searchParams.get("name")!;
        return {
          ok: true,
          json: async () => ({
            name,
            feesLabel: name.length,
            fees: String(name.length),
            symbol: "TEST_USDC",
          }),
        };
      }),
    );

    render(<Pricing />);

    for (const tier of PRICING.TIERS) {
      expect(
        await screen.findByText(String(tier.sample.length)),
      ).toBeInTheDocument();
    }
    expect((await screen.findAllByText("USDC")).length).toBe(
      PRICING.TIERS.length,
    );
  });

  // A tier showing nothing reads as "free"; it has to say it doesn't know.
  it("says a price is unavailable when the lookup fails", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => ({ ok: false, json: async () => ({}) })),
    );

    render(<Pricing />);

    // Each tier retries on its own schedule, so wait for the whole grid to
    // settle rather than the first tile that gives up.
    await waitFor(
      () =>
        expect(screen.getAllByText("Unavailable")).toHaveLength(
          PRICING.TIERS.length,
        ),
      { timeout: 5000 },
    );
  });
});
