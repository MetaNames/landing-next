import { NextRequest } from "next/server";
import { afterEach, describe, expect, it, vi } from "vitest";

import { GET } from "@/app/api/domains/check/route";
import { config } from "@/lib/config";

function request(query: string) {
  return new NextRequest(`http://localhost/api/domains/check?${query}`);
}

function mockUpstream(body: unknown, ok = true) {
  const fetchMock = vi.fn().mockResolvedValue({
    ok,
    json: async () => body,
  });
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("GET /api/domains/check", () => {
  it("reports a free name as available", async () => {
    const fetchMock = mockUpstream({
      domainPresent: false,
      parentPresent: false,
    });

    const response = await GET(request("name=marco"));

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({
      name: "marco.mpc",
      available: true,
      domainPresent: false,
      parentPresent: false,
    });
    expect(fetchMock).toHaveBeenCalledWith(
      `${config.appUrl}/api/domains/marco.mpc/check`,
      expect.anything(),
    );
  });

  it("reports a registered name as unavailable", async () => {
    mockUpstream({ domainPresent: true, parentPresent: false });

    const response = await GET(request("name=marco"));

    await expect(response.json()).resolves.toMatchObject({ available: false });
  });

  it("normalizes case and a caller-supplied TLD", async () => {
    const fetchMock = mockUpstream({
      domainPresent: false,
      parentPresent: false,
    });

    await GET(request("name=MARCO.mpc"));

    expect(fetchMock).toHaveBeenCalledWith(
      `${config.appUrl}/api/domains/marco.mpc/check`,
      expect.anything(),
    );
  });

  it("rejects a missing name without calling upstream", async () => {
    const fetchMock = mockUpstream({});

    const response = await GET(request(""));

    expect(response.status).toBe(400);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("rejects an invalid name with the validator's message", async () => {
    const fetchMock = mockUpstream({});

    const response = await GET(request("name=-nope"));

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({
      error: "Cannot start or end with a hyphen",
    });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("turns an upstream failure into a 502", async () => {
    mockUpstream({}, false);

    const response = await GET(request("name=marco"));

    expect(response.status).toBe(502);
  });

  it("turns a network error into a 502", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("boom")));
    vi.spyOn(console, "error").mockImplementation(() => {});

    const response = await GET(request("name=marco"));

    expect(response.status).toBe(502);
  });
});
