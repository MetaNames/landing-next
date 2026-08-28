import path from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // Node only: the suite covers pure logic and route handlers. Component
    // tests would need @vitejs/plugin-react, whose current release pulls in a
    // Babel 8 peer that conflicts with shadcn's Babel 7.
    environment: "node",
    globals: true,
    include: ["**/*.test.ts"],
  },
  resolve: {
    alias: { "@": path.resolve(__dirname, "./") },
  },
});
