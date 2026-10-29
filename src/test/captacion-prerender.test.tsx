// @vitest-environment node
import { renderToString } from "react-dom/server";
import { HelmetProvider } from "react-helmet-async";
import { createStaticHandler, createStaticRouter, StaticRouterProvider } from "react-router-dom/server";
import { describe, expect, it } from "vitest";

import { routes } from "@/routes";

async function prerender(path: string) {
  const { query, dataRoutes } = createStaticHandler(routes);
  const context = await query(new Request(`https://www.cookyourwebai.es${path}`));
  if (context instanceof Response) throw context;
  const router = createStaticRouter(dataRoutes, context);
  return renderToString(
    <HelmetProvider context={{}}>
      <StaticRouterProvider router={router} context={context} />
    </HelmetProvider>,
  );
}

/** The lead capture must be in the static HTML (no window during render). */
describe("lead capture in the prerendered HTML", () => {
  it("has the sticky bar and one closing block on a legal page", async () => {
    const html = await prerender("/avisolegal");

    expect(html.match(/data-sticky-audit-cta/g)).toHaveLength(1);
    expect(html.match(/aria-labelledby="closing-cta-heading"/g)).toHaveLength(1);
  });

  it.each(["/baja", "/agenteActivado"])("has neither on %s", async (path) => {
    const html = await prerender(path);

    expect(html).not.toContain("data-sticky-audit-cta");
    expect(html).not.toContain("closing-cta-heading");
  });
});
