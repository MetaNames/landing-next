/**
 * Client-side mirror of the app's domain rules (app/lib/domain-validator.ts),
 * minus the tr46/IDNA path: the landing only needs instant feedback while
 * someone types, so a label containing non-ASCII characters is passed through
 * and left for the app's `/check` endpoint — which runs the SDK's own
 * `DomainValidator` — to accept or reject.
 */
export interface ValidationResult {
  valid: boolean;
  error?: string;
}

const ASCII_LABEL = /^[a-z0-9-]+$/;
const HAS_NON_ASCII = /[^\x00-\x7f]/;

export const TLD = ".mpc";

// Mirrors `DomainValidator.rules.maxLength` in @metanames/sdk: the cap covers
// the whole name, TLD included.
export const MAX_DOMAIN_LENGTH = 32;
export const MAX_LABEL_LENGTH = MAX_DOMAIN_LENGTH - TLD.length;

export function stripTld(name: string): string {
  let clean = name;
  while (clean.endsWith(TLD)) clean = clean.slice(0, -TLD.length);
  return clean;
}

export function normalizeDomain(name: string): string {
  return name.endsWith(TLD) ? name : `${name}${TLD}`;
}

export function validateDomainName(name: string): ValidationResult {
  if (name.startsWith("."))
    return { valid: false, error: "Domain cannot start with a dot" };

  const clean = stripTld(name);

  if (clean.includes(".."))
    return { valid: false, error: "Cannot contain consecutive dots" };

  if (normalizeDomain(clean).length > MAX_DOMAIN_LENGTH)
    return {
      valid: false,
      error: `Name must be at most ${MAX_LABEL_LENGTH} characters`,
    };

  for (const part of clean.split(".")) {
    if (part.length < 1)
      return { valid: false, error: "Name must be at least 1 character" };
    if (part.startsWith("-") || part.endsWith("-"))
      return { valid: false, error: "Cannot start or end with a hyphen" };
    if (!ASCII_LABEL.test(part) && !HAS_NON_ASCII.test(part))
      return {
        valid: false,
        error: "Only lowercase letters, numbers, and hyphens allowed",
      };
  }

  return { valid: true };
}
