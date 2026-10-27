import { readdirSync, readFileSync, statSync } from "node:fs";
import { relative, resolve } from "node:path";
import { describe, expect, it } from "vitest";

import { COMPANY } from "@/lib/company";
import { DOMINIO_POR_DEFECTO, urlCanonica } from "@/lib/rutas-publicas";
import { SITE } from "@/lib/seo";

const root = resolve(__dirname, "../..");

const walk = (dir: string): string[] =>
  readdirSync(dir).flatMap((name) => {
    const full = resolve(dir, name);
    return statSync(full).isDirectory() ? walk(full) : [full];
  });

/**
 * Where the literal site URL may appear. Everything else (SEO tags, canonicals,
 * legal texts, structured data) must read it from DOMINIO_POR_DEFECTO, directly
 * or through COMPANY.url / SITE.url.
 *
 * - src/lib/rutas-publicas.ts: the single source (a literal, because the
 *   sitemap script reads that file as text).
 * - index.html: static fallback for bots that do not run JS (a test keeps it
 *   equal to seo.ts).
 * - public/robots.txt, public/sitemap.xml: generated from the source above.
 */
const ALLOWED = ["src/lib/rutas-publicas.ts", "index.html", "public/robots.txt", "public/sitemap.xml"];

const isTest = (file: string) => /\.test\.(ts|tsx)$/.test(file) || file.endsWith("/test/setup.ts");

describe("site domain", () => {
  it("is defined once and derived everywhere else", () => {
    expect(COMPANY.url).toBe(DOMINIO_POR_DEFECTO);
    expect(SITE.url).toBe(DOMINIO_POR_DEFECTO);
    expect(urlCanonica("/avisolegal")).toBe(`${DOMINIO_POR_DEFECTO}/avisolegal`);
  });

  it("appears as a literal URL only in the allow-list", () => {
    const files = [...walk(resolve(root, "src")), ...walk(resolve(root, "public")), resolve(root, "index.html")];
    const offenders = files
      .filter((file) => !isTest(file) && /\.(ts|tsx|html|txt|xml)$/.test(file))
      .map((file) => relative(root, file))
      .filter((file) => !ALLOWED.includes(file))
      .filter((file) => readFileSync(resolve(root, file), "utf8").includes("https://www.cookyourwebai.es"));

    expect(offenders).toEqual([]);
  });
});
