import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    // jsdom solo donde hace falta: los tests que no tocan DOM (contraste de
    // tokens) declaran su propio entorno con un comentario @vitest-environment.
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/test/setup.ts",
    // Full-page form tests take ~1-2 s alone but exceed the 5 s default when the
    // whole suite runs in parallel on a slower machine (CPU contention, not a
    // bug). 15 s keeps a real hang visible while ending false timeouts.
    testTimeout: 15_000,
  },
}));
