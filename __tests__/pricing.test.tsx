import userEvent from "@testing-library/user-event";
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
    expect((await screen.findAllByText("USDC / yr")).length).toBe(
      PRICING.TIERS.length,
    );
  });

  it("switches live prices between environment BYOC tokens", async () => {
    const user = userEvent.setup();

    vi.stubGlobal(
      "fetch",
      vi.fn(async (input: string | URL) => {
        const url = new URL(String(input), "http://localhost");
        const coin = url.searchParams.get("coin") ?? "TEST_COIN";

        return {
          ok: true,
          json: async () => ({
            name: url.searchParams.get("name"),
            feesLabel: coin === "ETH_GOERLI" ? 0.25 : 8,
            fees: coin === "ETH_GOERLI" ? "250000000000000000" : "8",
            symbol: coin,
          }),
        };
      }),
    );

    render(<Pricing />);

    expect(
      screen.getByText(/pay with supported tokens through byoc/i),
    ).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "Test Coin" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(
      screen.getByRole("tab", { name: "ETH · Goerli" }),
    ).toBeInTheDocument();
    await waitFor(() =>
      expect(screen.getAllByText("TEST COIN / yr")).toHaveLength(
        PRICING.TIERS.length,
      ),
    );

    await user.click(screen.getByRole("tab", { name: "ETH · Goerli" }));

    expect((await screen.findAllByText("0.25")).length).toBe(
      PRICING.TIERS.length,
    );
    expect(screen.getAllByText("ETH / yr")).toHaveLength(PRICING.TIERS.length);
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
