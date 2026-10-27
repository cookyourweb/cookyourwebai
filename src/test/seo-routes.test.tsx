import { render, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import App from "@/App";
import { RUTAS_PUBLICAS } from "@/lib/rutas-publicas";
import { PAGES } from "@/lib/seo";

const meta = (selector: string) => document.head.querySelector(selector)?.getAttribute("content");
const canonicalHref = () => document.head.querySelector('link[rel="canonical"]')?.getAttribute("href");

const open = (path: string) => {
  window.history.pushState({}, "", path);
  return render(<App />);
};

describe.each(RUTAS_PUBLICAS)("SEO head of %s", (ruta) => {
  const page = Object.values(PAGES).find((p) => p.path === ruta)!;

  it("sets the title, description and a self-referencing canonical", async () => {
    open(ruta);

    await waitFor(() => expect(document.title).toBe(page.title));
    const expected = `https://www.cookyourwebai.es${ruta}`;
    expect(canonicalHref()).toBe(expected);
    expect(meta('meta[name="description"]')).toBe(page.description);
    expect(meta('meta[property="og:url"]')).toBe(expected);
    expect(meta('meta[property="og:title"]')).toBe(page.title);
    expect(meta('meta[property="og:site_name"]')).toBe("CookYourWebAI");
    expect(meta('meta[property="og:locale"]')).toBe("es_ES");
    expect(meta('meta[name="twitter:card"]')).toBe("summary_large_image");
    expect(document.head.querySelector('meta[name="robots"]')).toBeNull();
  });
});

describe("noindex pages", () => {
  it("/baja is noindex but followable", async () => {
    open("/baja");

    await waitFor(() => expect(document.title).toBe(PAGES.unsubscribe.title));
    expect(meta('meta[name="robots"]')).toBe("noindex, follow");
    expect(canonicalHref()).toBeUndefined();
  });

  it("/agenteActivado stays noindex, nofollow", async () => {
    open("/agenteActivado");

    await waitFor(() => expect(document.title).toBe(PAGES.thanks.title));
    expect(meta('meta[name="robots"]')).toBe("noindex, nofollow");
  });

  it("the 404 is noindex", async () => {
    open("/una-ruta-que-no-existe");

    await waitFor(() => expect(document.title).toBe(PAGES.notFound.title));
    expect(meta('meta[name="robots"]')).toContain("noindex");
  });
});
