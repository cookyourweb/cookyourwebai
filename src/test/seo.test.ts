import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

import { DOMINIO_POR_DEFECTO, RUTAS_PUBLICAS } from "@/lib/rutas-publicas";
import { PAGES, SITE, canonical } from "@/lib/seo";

const pages = Object.values(PAGES);

describe("SEO meta table", () => {
  it("keeps every title within 60 characters and ends it with the brand", () => {
    for (const page of pages) {
      expect(page.title.length, page.title).toBeLessThanOrEqual(60);
      expect(page.title.endsWith("| CookYourWebAI"), page.title).toBe(true);
    }
  });

  it("keeps every description within 155 characters", () => {
    for (const page of pages) {
      if (page.description) expect(page.description.length, page.description).toBeLessThanOrEqual(155);
    }
  });

  it("has unique titles and unique descriptions", () => {
    const titles = pages.map((page) => page.title);
    const descriptions = pages.flatMap((page) => (page.description ? [page.description] : []));

    expect(new Set(titles).size).toBe(titles.length);
    expect(new Set(descriptions).size).toBe(descriptions.length);
  });

  it("gives every indexable public route a title, a description and no robots directive", () => {
    for (const ruta of RUTAS_PUBLICAS) {
      const page = pages.find((p) => p.path === ruta);
      expect(page, ruta).toBeDefined();
      expect(page?.description, ruta).toBeTruthy();
      expect(page?.robots, ruta).toBeUndefined();
    }
  });

  it("never mentions a city or the English 'AI' in titles and descriptions", () => {
    for (const page of pages) {
      expect(`${page.title} ${page.description ?? ""}`).not.toMatch(/madrid|\bAI\b/i);
    }
  });
});

describe("canonical()", () => {
  it("uses the www domain, no trailing slash except for the home", () => {
    expect(DOMINIO_POR_DEFECTO).toBe("https://www.cookyourwebai.es");
    expect(SITE.url).toBe("https://www.cookyourwebai.es");
    expect(canonical("/")).toBe("https://www.cookyourwebai.es/");
    expect(canonical("/avisolegal")).toBe("https://www.cookyourwebai.es/avisolegal");
  });
});

describe("index.html", () => {
  const html = readFileSync(resolve(__dirname, "../../index.html"), "utf8");

  it("leaves description, Open Graph and Twitter tags to the Seo component", () => {
    expect(html).not.toMatch(/property="og:/);
    expect(html).not.toMatch(/name="twitter:/);
    expect(html).not.toMatch(/name="description"/);
  });
});
