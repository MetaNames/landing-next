import { optionalEnv } from "./env";

type Environment = "test" | "prod";

// One row per environment so Sentry's trace sample rate is picked in a single lookup.
const SENTRY_TRACES_SAMPLE_RATE: Record<Environment, number> = {
  test: 1.0,
  prod: 0.1,
};

const DEFAULT_SENTRY_DSN =
  "https://6d2f001142606b5a20a13a87c20ad0f5@o4506739278544896.ingest.us.sentry.io/4506931764330496";

const environment: Environment =
  optionalEnv(process.env.NEXT_PUBLIC_ENV, "test") === "test" ? "test" : "prod";

export const config = {
  environment,
  siteUrl: optionalEnv(
    process.env.NEXT_PUBLIC_SITE_URL,
    "https://metanames.app",
  ),
  appUrl: optionalEnv(
    process.env.NEXT_PUBLIC_APP_URL,
    "https://app.metanames.app",
  ),
  siteName: "MetaNames",
  siteDescription: "DNS for Partisia Blockchain - Your web3 identity solution",
  // Centralized here so callers never read NEXT_PUBLIC_SENTRY_DSN/SENTRY_DSN
  // directly. An empty value means "Sentry disabled".
  sentryDsn: optionalEnv(
    process.env.NEXT_PUBLIC_SENTRY_DSN ?? process.env.SENTRY_DSN,
    DEFAULT_SENTRY_DSN,
  ),
  get sentryTracesSampleRate() {
    return SENTRY_TRACES_SAMPLE_RATE[this.environment];
  },
  get isTestnet() {
    return this.environment === "test";
  },
  get sdkEnvironment() {
    return this.isTestnet ? "testnet" : "mainnet";
  },
  get enableDevTools() {
    return process.env.NODE_ENV === "development";
  },
} as const;

export type Config = typeof config;
