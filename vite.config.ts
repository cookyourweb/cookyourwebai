import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { moverPagina404 } from "./scripts/prerender-404.mjs";

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
  // vite-react-ssg: prerenders each route of src/routes.tsx into dist/.
  ssgOptions: {
    // /politicadeprivacidad -> politicadeprivacidad/index.html, served at the
    // same URL without ".html" (and without touching the Google verification file).
    dirStyle: "nested",
    // "/404" is prerendered as 404/index.html; Vercel needs dist/404.html.
    onFinished: () => moverPagina404(path.resolve(__dirname, "dist")),
  },
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
