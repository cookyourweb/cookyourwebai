import { render, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import App from "@/App";
import { PAGES, canonical, jsonLdFor } from "@/lib/seo";

const scripts = () => Array.from(document.head.querySelectorAll('script[type="application/ld+json"]'));

const open = (path: string) => {
  window.history.pushState({}, "", path);
  return render(<App />);
};

describe("breadcrumbs", () => {
  it.each(["privacy", "cookies", "legal"] as const)("%s has Inicio > page", (key) => {
    const crumb = jsonLdFor(key) as { "@type": string; itemListElement: Record<string, unknown>[] };

    expect(crumb["@type"]).toBe("BreadcrumbList");
    expect(crumb.itemListElement).toHaveLength(2);
    expect(crumb.itemListElement[0]).toMatchObject({ position: 1, name: "Inicio", item: canonical("/") });
    expect(crumb.itemListElement[1]).toMatchObject({
      position: 2,
      name: PAGES[key].title.replace(" | CookYourWebAI", ""),
      item: canonical(PAGES[key].path),
    });
  });

  it("noindex pages have none", () => {
    for (const key of ["unsubscribe", "thanks", "notFound"] as const) expect(jsonLdFor(key), key).toBeUndefined();
  });
});

describe("rendered breadcrumbs", () => {
  it.each(["/politicadeprivacidad", "/cookie-policy", "/avisolegal"])("%s emits its breadcrumb", async (ruta) => {
    open(ruta);

    await waitFor(() => expect(scripts()).toHaveLength(1));
    const parsed = JSON.parse(scripts()[0].textContent ?? "");
    expect(parsed["@type"]).toBe("BreadcrumbList");
    expect(parsed.itemListElement[1].item).toBe(canonical(ruta));
  });
});
