import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import userEvent from "@testing-library/user-event";

import { DomainSearch } from "@/components/domain-search";
import { SEARCH } from "@/lib/constants";
import { render, screen, waitFor } from "./render";

function availability(available: boolean) {
  return (name: string) => ({
    ok: true,
    json: async () => ({
      name: `${name}.mpc`,
      available,
      domainPresent: !available,
      parentPresent: false,
    }),
  });
}

function mockFetch(handler: (url: string) => unknown) {
  const fetchMock = vi.fn(async (input: string | URL) => {
    const url = String(input);
    const name = new URL(url, "http://localhost").searchParams.get("name")!;
    if (url.includes("/fees"))
      return {
        ok: true,
        json: async () => ({
          name,
          feesLabel: 5,
          fees: "5",
          symbol: "TEST_USDC",
        }),
      };
    return handler(name);
  });
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}

describe("DomainSearch", () => {
  beforeEach(() => {
    window.history.replaceState(null, "", "/");
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("reports an available name and offers a register link", async () => {
    mockFetch((name) => availability(true)(name));
    const user = userEvent.setup();
    render(<DomainSearch />);

    await user.type(screen.getByLabelText("Search for a .mpc name"), "alice");

    const link = await screen.findByRole("link", { name: /register/i });
    expect(link).toHaveAttribute("href", expect.stringContaining("alice"));
    expect(await screen.findByText(/is available/)).toBeInTheDocument();
  });

  it("keeps Register unusable while the name is taken", async () => {
    mockFetch((name) => availability(false)(name));
    const user = userEvent.setup();
    render(<DomainSearch />);

    await user.type(screen.getByLabelText("Search for a .mpc name"), "alice");

    expect(await screen.findByText(/is taken/)).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /register/i })).toBeNull();
    expect(screen.getByRole("button", { name: /register/i })).toBeDisabled();
  });

  it("rejects an invalid name without asking the network", async () => {
    const fetchMock = mockFetch((name) => availability(true)(name));
    const user = userEvent.setup();
    render(<DomainSearch />);

    await user.type(screen.getByLabelText("Search for a .mpc name"), "a b");

    expect(await screen.findByText(/letters, numbers/i)).toBeInTheDocument();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  // A checked name that cannot be linked to is a name nobody shares.
  it("seeds the field from ?q= and writes what is typed back to the URL", async () => {
    mockFetch((name) => availability(true)(name));
    window.history.replaceState(null, "", `/?${SEARCH.QUERY_PARAM}=bob.mpc`);
    const user = userEvent.setup();
    render(<DomainSearch />);

    const input = screen.getByLabelText("Search for a .mpc name");
    await waitFor(() => expect(input).toHaveValue("bob"));

    await user.clear(input);
    await user.type(input, "carol");
    await waitFor(() =>
      expect(
        new URLSearchParams(window.location.search).get(SEARCH.QUERY_PARAM),
      ).toBe("carol"),
    );
  });

  it("drops the query parameter once the field is emptied", async () => {
    mockFetch((name) => availability(true)(name));
    window.history.replaceState(null, "", `/?${SEARCH.QUERY_PARAM}=bob`);
    const user = userEvent.setup();
    render(<DomainSearch />);

    const input = screen.getByLabelText("Search for a .mpc name");
    await waitFor(() => expect(input).toHaveValue("bob"));
    await user.clear(input);

    await waitFor(() =>
      expect(window.location.search).not.toContain(SEARCH.QUERY_PARAM),
    );
  });

  it("focuses the field when the visitor presses /", async () => {
    mockFetch((name) => availability(true)(name));
    const user = userEvent.setup();
    render(<DomainSearch />);

    await user.keyboard("/");
    expect(screen.getByLabelText("Search for a .mpc name")).toHaveFocus();
  });

  it("says the network is unreachable rather than showing a verdict", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => ({ ok: false, json: async () => ({}) })),
    );
    const user = userEvent.setup();
    render(<DomainSearch />);

    await user.type(screen.getByLabelText("Search for a .mpc name"), "alice");

    // useDomainCheck retries once, so the error state is a beat behind.
    expect(
      await screen.findByText(/Couldn't reach the network/, undefined, {
        timeout: 5000,
      }),
    ).toBeInTheDocument();
  });
});
