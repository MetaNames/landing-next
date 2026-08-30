/**
 * Reads an optional public env var, treating the empty string and the literal
 * "undefined" (which some platforms produce for a missing var) as unset so a
 * blank value can never fall through to a production default.
 */
export function optionalEnv(value: string | undefined, fallback: string) {
  if (!value || value === "undefined" || value === "null") return fallback;
  return value;
}
