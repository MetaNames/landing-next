import { describe, it, expect, vi, afterEach } from "vitest";
import userEvent from "@testing-library/user-event";

import { NamesGenerator } from "@/components/names-generator";
import { render, screen, waitFor } from "./render";

function stubAvailability(available: boolean) {
  vi.stubGlobal(
    "fetch",
    vi.fn(async (input: string | URL) => {
      const name = new URL(String(input), "http://localhost").searchParams.get(
        "name",
      )!;
      return {
        ok: true,
        json: async () => ({
          name: `${name}.mpc`,
          available,
          domainPresent: !available,
          parentPresent: false,
        }),
      };
    }),
  );
}

function generatedName(): string {
  return screen
    .getByLabelText(/^Copy /)
    .getAttribute("aria-label")!
    .slice(5);
}

afterEach(() => vi.unstubAllGlobals());

describe("NamesGenerator", () => {
  it("checks the generated name and offers to register it", async () => {
    stubAvailability(true);
    render(<NamesGenerator />);

    expect(await screen.findByText("Available")).toBeInTheDocument();
    const link = screen.getByRole("link", { name: /register now/i });
    expect(link).toHaveAttribute(
      "href",
      expect.stringContaining(generatedName().replace(".mpc", "")),
    );
  });

  // Offering "Register" for a name that is gone wastes a click and a page load.
  it("blocks registration when the generated name is taken", async () => {
    stubAvailability(false);
    render(<NamesGenerator />);

    expect(await screen.findByText("Already taken")).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /register now/i })).toBeNull();
    expect(
      screen.getByRole("button", { name: /register now/i }),
    ).toBeDisabled();
  });

  it("generates a different name on demand", async () => {
    stubAvailability(true);
    const user = userEvent.setup();
    render(<NamesGenerator />);

    await screen.findByText("Available");
    const first = generatedName();

    await user.click(screen.getByRole("button", { name: /regenerate/i }));
    await waitFor(() => expect(generatedName()).not.toBe(first));
  });

  it("keeps the chosen category and word count pressed", async () => {
    stubAvailability(true);
    const user = userEvent.setup();
    render(<NamesGenerator />);

    await user.click(screen.getByRole("button", { name: "Colors" }));
    expect(screen.getByRole("button", { name: "Colors" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );

    await user.click(screen.getByRole("button", { name: "3" }));
    expect(screen.getByRole("button", { name: "3" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    await waitFor(() =>
      expect(generatedName().replace(".mpc", "").split("-")).toHaveLength(3),
    );
  });
});
