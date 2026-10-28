// @vitest-environment jsdom
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const html = readFileSync(resolve(__dirname, "../../index.html"), "utf8");
const head = new DOMParser().parseFromString(html, "text/html").head;

/**
 * index.html is the template every route is prerendered into: vite-react-ssg
 * writes each page's own title, description, canonical, Open Graph, Twitter
 * and JSON-LD tags at the top of its <head>. Before prerendering this file
 * carried the home's tags as a fallback for link-preview bots that do not run
 * JS. Keeping them now would duplicate every tag on every page, and the static
 * title would sit next to the page's own. Bots now get the real tags per route.
 * (Hydration without duplicates is covered in hydration.test.tsx.)
 */
describe("index.html template", () => {
  it("carries no per-page SEO tag: the prerender writes them per route", () => {
    expect(head.querySelector("title")).toBeNull();
    expect(head.querySelector('meta[name="description"]')).toBeNull();
    expect(head.querySelector('meta[name="robots"]')).toBeNull();
    expect(head.querySelector('link[rel="canonical"]')).toBeNull();
    expect(head.querySelector('meta[property^="og:"]')).toBeNull();
    expect(head.querySelector('meta[name^="twitter:"]')).toBeNull();
    expect(head.querySelector('script[type="application/ld+json"]')).toBeNull();
    expect(head.querySelector("[data-rh]")).toBeNull();
  });

  it("keeps what is the same on every page", () => {
    expect(head.querySelector("meta[charset]")).not.toBeNull();
    expect(head.querySelector('meta[name="viewport"]')).not.toBeNull();
    expect(head.querySelector('link[rel="icon"]')).not.toBeNull();
    expect(head.querySelector('link[rel="apple-touch-icon"]')).not.toBeNull();
  });

  it("does not load Google Tag Manager: that needs consent (src/lib/gtm.ts)", () => {
    expect(html).not.toMatch(/googletagmanager\.com|GTM-[A-Z0-9]+/);
  });
});
