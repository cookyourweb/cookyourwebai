// @vitest-environment node
import { renderToString } from "react-dom/server";
import { HelmetProvider, type HelmetServerState } from "react-helmet-async";
import { createStaticHandler, createStaticRouter, StaticRouterProvider } from "react-router-dom/server";
import { describe, expect, it } from "vitest";

import { routes } from "@/routes";
import { PAGES, type PageKey } from "@/lib/seo";

/**
 * Renders a route the way vite-react-ssg does at build time (static router +
 * HelmetProvider with a context), in a plain Node environment: no window, no
 * document, no localStorage. If any render-time code touches the browser, this
 * throws, which is exactly what would break the production build.
 */
async function prerender(path: string) {
  const { query, dataRoutes } = createStaticHandler(routes);
  const context = await query(new Request(`https://www.cookyourwebai.es${path}`));
  if (context instanceof Response) throw context;
  const router = createStaticRouter(dataRoutes, context);
  const helmetContext: { helmet?: HelmetServerState } = {};
  const html = renderToString(
    <HelmetProvider context={helmetContext}>
      <StaticRouterProvider router={router} context={context} />
    </HelmetProvider>,
  );
  const helmet = helmetContext.helmet!;
  return {
    html,
    status: context.statusCode,
    title: helmet.title.toString(),
    head: [helmet.meta, helmet.link, helmet.script].map((t) => t.toString()).join(""),
  };
}

const ROUTES: Array<[string, PageKey]> = [
  ["/", "home"],
  ["/politicadeprivacidad", "privacy"],
  ["/cookie-policy", "cookies"],
  ["/avisolegal", "legal"],
  ["/baja", "unsubscribe"],
  ["/agenteActivado", "thanks"],
];

describe.each(ROUTES)("prerendered %s", (path, key) => {
  const page = PAGES[key];

  it("renders without browser globals and has exactly one h1", async () => {
    const { html } = await prerender(path);

    expect(html.match(/<h1[\s>]/g)).toHaveLength(1);
  });

  it("puts the title and the right robots/canonical in the head", async () => {
    const { title, head } = await prerender(path);

    expect(title).toContain(page.title.replace(/&/g, "&amp;"));
    if ("robots" in page && page.robots) {
      expect(head).toContain(`content="${page.robots}"`);
      expect(head).not.toContain('rel="canonical"');
    } else {
      expect(head).toContain(`<link data-rh="true" rel="canonical" href="https://www.cookyourwebai.es${path}"/>`);
    }
  });
});

describe("prerendered JSON-LD", () => {
  it.each(["/", "/politicadeprivacidad", "/cookie-policy", "/avisolegal"])("%s carries it in the head", async (path) => {
    const { head } = await prerender(path);

    expect(head).toContain('type="application/ld+json"');
  });
});

describe("prerendered unknown route", () => {
  it("renders the not-found page, noindex", async () => {
    const { html, head } = await prerender("/no-existe");

    expect(html).toContain("Página no encontrada");
    expect(head).toContain("noindex");
  });
});

describe("consent check at prerender time", () => {
  it("reports no consent when there is no storage, instead of throwing", async () => {
    const { hayConsentimientoEstadistica } = await import("@/lib/gtm");

    expect(hayConsentimientoEstadistica()).toBe(false);
  });
});
