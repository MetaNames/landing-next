import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render as rtlRender } from "@testing-library/react";
import type { ReactElement } from "react";

/**
 * Components under test read the chain through TanStack Query, so every one of
 * them needs a client. Retries are off: a test that mocks a failure wants the
 * error state now, not after the production retry schedule.
 */
export function render(ui: ReactElement) {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false, gcTime: 0 } },
  });
  return rtlRender(
    <QueryClientProvider client={client}>{ui}</QueryClientProvider>,
  );
}

export * from "@testing-library/react";
