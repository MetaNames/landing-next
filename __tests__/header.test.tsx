import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { Header } from "@/components/header";
import { render, screen, within } from "./render";

describe("Header", () => {
  it("returns focus to the menu toggle when Escape closes the mobile menu", async () => {
    const user = userEvent.setup();
    render(<Header />);

    const toggle = screen.getByRole("button", { name: /toggle menu/i });
    await user.click(toggle);

    const mobileNavigation = document.getElementById("mobile-navigation");
    expect(mobileNavigation).not.toBeNull();
    const firstLink = within(mobileNavigation!).getByRole("link", {
      name: "Features",
    });
    firstLink.focus();
    expect(firstLink).toHaveFocus();

    await user.keyboard("{Escape}");

    expect(
      screen.queryByRole("link", { name: "Features", hidden: true }),
    ).not.toBeNull();
    expect(document.getElementById("mobile-navigation")).toBeNull();
    expect(toggle).toHaveFocus();
    expect(toggle).toHaveAttribute("aria-controls", "mobile-navigation");
  });
});
