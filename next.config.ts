import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

const sentryConfig = {
  silent: true,
  org: process.env.SENTRY_ORG ?? "metanames",
  project: process.env.SENTRY_PROJECT ?? "landing-next",
  widenClientFileUpload: true,
  // Routes browser requests to Sentry through a Next.js rewrite to sidestep ad-blockers.
  tunnelRoute: "/monitoring",
  hideSourceMaps: true,
  disableLogger: true,
};

export default withSentryConfig(nextConfig, sentryConfig);
