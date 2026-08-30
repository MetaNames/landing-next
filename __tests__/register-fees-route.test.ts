import { NextRequest } from "next/server";
import { afterEach, describe, expect, it, vi } from "vitest";

import { GET } from "@/app/api/register/fees/route";
import { config } from "@/lib/config";
import { feeCoinCandidates, preferredCoin } from "@/lib/metanames";

function request(query: string) {
  return new NextRequest(`http://localhost/api/register/fees?${query}`);
}

const FEES = { feesLabel: 8, fees: "8000000", symbol: "TEST_COIN" };

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("GET /api/register/fees", () => {
  it("quotes the fee in the environment's preferred coin", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValue({ ok: true, json: async () => FEES });
    vi.stubGlobal("fetch", fetchMock);

    const response = await GET(request("name=marco"));

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({
      name: "marco.mpc",
      ...FEES,
    });
    expect(fetchMock).toHaveBeenCalledWith(
      `${config.appUrl}/api/register/marco.mpc/fees/${preferredCoin}`,
      expect.anything(),
    );
  });

  it("quotes an explicitly selected environment BYOC coin", async () => {
    const coin = feeCoinCandidates[1];
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ ...FEES, symbol: coin }),
    });
    vi.stubGlobal("fetch", fetchMock);

    const response = await GET(request(`name=marco&coin=${coin}`));

    expect(response.status).toBe(200);
    expect(fetchMock).toHaveBeenCalledWith(
      `${config.appUrl}/api/register/marco.mpc/fees/${coin}`,
      expect.anything(),
    );
  });

  it("rejects a BYOC coin outside the active environment", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    const response = await GET(request("name=marco&coin=NOT_A_COIN"));

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({
      error: "Unsupported coin symbol",
    });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("rejects an invalid name before spending a round trip", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    // Uppercase is normalized rather than rejected, so this uses a name the
    // validator genuinely refuses.
    const response = await GET(request("name=my_name"));

    expect(response.status).toBe(400);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("turns an upstream failure into a 502", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: false, json: async () => ({}) }),
    );

    const response = await GET(request("name=marco"));

    expect(response.status).toBe(502);
  });

  it("falls back to the next coin when the app rejects the first", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce({ status: 400, ok: false, json: async () => ({}) })
      .mockResolvedValueOnce({ status: 200, ok: true, json: async () => FEES });
    vi.stubGlobal("fetch", fetchMock);

    const response = await GET(request("name=marco"));

    expect(response.status).toBe(200);
    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(fetchMock.mock.calls[1][0]).toContain(
      `/fees/${feeCoinCandidates[1]}`,
    );
  });
});
