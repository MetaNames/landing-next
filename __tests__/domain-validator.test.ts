import { describe, expect, it } from "vitest";

import {
  MAX_DOMAIN_LENGTH,
  MAX_LABEL_LENGTH,
  normalizeDomain,
  stripTld,
  validateDomainName,
} from "@/lib/domain-validator";

describe("validateDomainName", () => {
  it("accepts lowercase names, digits and inner hyphens", () => {
    for (const name of ["a", "marco", "meta-names", "web3-2024"]) {
      expect(validateDomainName(name).valid).toBe(true);
    }
  });

  it("accepts a name that already carries the TLD", () => {
    expect(validateDomainName("marco.mpc").valid).toBe(true);
  });

  it("accepts subdomains", () => {
    expect(validateDomainName("pay.marco.mpc").valid).toBe(true);
  });

  it("rejects a leading dot", () => {
    expect(validateDomainName(".marco")).toEqual({
      valid: false,
      error: "Domain cannot start with a dot",
    });
  });

  it("rejects consecutive dots", () => {
    expect(validateDomainName("pay..marco").valid).toBe(false);
  });

  it("rejects an empty label", () => {
    expect(validateDomainName("")).toEqual({
      valid: false,
      error: "Name must be at least 1 character",
    });
  });

  it("rejects hyphens at either edge", () => {
    expect(validateDomainName("-marco").valid).toBe(false);
    expect(validateDomainName("marco-").valid).toBe(false);
  });

  it("rejects uppercase, spaces and underscores", () => {
    for (const name of ["Marco", "my name", "my_name"]) {
      expect(validateDomainName(name).valid).toBe(false);
    }
  });

  it("counts the TLD against the SDK's 32-character cap", () => {
    const longest = "a".repeat(MAX_LABEL_LENGTH);
    expect(longest.length + ".mpc".length).toBe(MAX_DOMAIN_LENGTH);
    expect(validateDomainName(longest).valid).toBe(true);
    expect(validateDomainName(`${longest}a`).valid).toBe(false);
    // The cap applies whether or not the caller typed the TLD.
    expect(validateDomainName(`${longest}a.mpc`).valid).toBe(false);
  });

  it("leaves non-ASCII names for the SDK to judge", () => {
    expect(validateDomainName("café").valid).toBe(true);
  });
});

describe("stripTld / normalizeDomain", () => {
  it("strips every trailing TLD", () => {
    expect(stripTld("marco.mpc")).toBe("marco");
    expect(stripTld("marco.mpc.mpc")).toBe("marco");
    expect(stripTld("marco")).toBe("marco");
  });

  it("appends the TLD only when missing", () => {
    expect(normalizeDomain("marco")).toBe("marco.mpc");
    expect(normalizeDomain("marco.mpc")).toBe("marco.mpc");
  });
});
