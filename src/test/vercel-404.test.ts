import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const vercel = JSON.parse(readFileSync(resolve(__dirname, "../../vercel.json"), "utf8")) as {
  redirects?: unknown[];
  rewrites?: { source: string; destination: string }[];
  cleanUrls?: boolean;
  trailingSlash?: boolean;
};

/**
 * A global "/(.*)" -> "/index.html" rewrite answers every URL with 200, so
 * Google sees /anything as a real page (soft 404). Every public route is now a
 * prerendered file, and Vercel serves dist/404.html with status 404 for
 * anything else, but only if nothing rewrites those URLs first.
 */
describe("vercel.json", () => {
  it("has no catch-all rewrite to index.html", () => {
    const catchAll = (vercel.rewrites ?? []).filter(
      (r) => r.destination === "/index.html" || /^\/\(\.\*\)$|^\/:path\*?$/.test(r.source),
    );

    expect(catchAll).toEqual([]);
  });

  it("keeps the old-domain redirect", () => {
    expect(vercel.redirects).toHaveLength(1);
  });

  // Pages are prerendered as <route>/index.html, so Vercel would also answer
  // /avisolegal/ with 200: a duplicate URL. trailingSlash:false redirects it.
  it("redirects trailing-slash URLs to the canonical ones", () => {
    expect(vercel.trailingSlash).toBe(false);
  });

  it("does not turn on cleanUrls, which would redirect the Google verification file", () => {
    expect(vercel.cleanUrls).toBeUndefined();
  });
});
