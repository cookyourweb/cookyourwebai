import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

import { DOMINIO_POR_DEFECTO, RUTAS_PUBLICAS } from "@/lib/rutas-publicas";

const read = (path: string) => readFileSync(resolve(__dirname, "../..", path), "utf8");

describe("robots.txt", () => {
  it("allows everything and points to the sitemap; noindex pages must stay crawlable", () => {
    expect(read("public/robots.txt")).toBe(
      [
        "User-agent: *",
        "Allow: /",
        "",
        "Sitemap: https://www.cookyourwebai.es/sitemap.xml",
        "",
      ].join("\n"),
    );
  });
});

describe("sitemap.xml", () => {
  const xml = read("public/sitemap.xml");
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

  it("lists exactly the public routes, on the www domain", () => {
    const expected = RUTAS_PUBLICAS.map((ruta) => `${DOMINIO_POR_DEFECTO}${ruta}`);
    expect(locs).toEqual(expected);
  });

  it("carries no priority or changefreq, which Google ignores", () => {
    expect(xml).not.toMatch(/<priority>|<changefreq>/);
  });
});
