import { act } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { hydrateRoot, type Root } from "react-dom/client";
import { HelmetProvider, type HelmetServerState } from "react-helmet-async";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { createStaticHandler, createStaticRouter, StaticRouterProvider } from "react-router-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";

import { PAGES } from "@/lib/seo";
import { routes } from "@/routes";

/**
 * Reproduces what happens in production: the HTML that vite-react-ssg wrote at
 * build time (static router, head tags first in <head>) is parsed by the
 * browser and React hydrates it with the browser router. A hydration mismatch
 * means flashes, wasted work and, in the worst case, lost state.
 */
async function serverRender(path: string) {
  const { query, dataRoutes } = createStaticHandler(routes);
  const context = await query(new Request(`https://www.cookyourwebai.es${path}`));
  if (context instanceof Response) throw context;
  const router = createStaticRouter(dataRoutes, context);
  const helmetContext: { helmet?: HelmetServerState } = {};
  // react-helmet-async only fills its server context when it believes there is
  // no DOM; jsdom has one, so the flag is flipped for the server pass.
  const canUseDOM = HelmetProvider.canUseDOM;
  HelmetProvider.canUseDOM = false;
  let html: string;
  try {
    html = renderToString(
      <HelmetProvider context={helmetContext}>
        <StaticRouterProvider router={router} context={context} />
      </HelmetProvider>,
    );
  } finally {
    HelmetProvider.canUseDOM = canUseDOM;
  }
  const { helmet } = helmetContext;
  return { html, head: [helmet!.title, helmet!.meta, helmet!.link, helmet!.script].map((t) => t.toString()).join("") };
}

const count = (selector: string) => document.head.querySelectorAll(selector).length;

describe.each(Object.values(PAGES).filter((p) => p.path !== "*"))("hydrating $path", (page) => {
  let root: Root | undefined;

  afterEach(() => {
    act(() => root?.unmount());
    document.head.innerHTML = "";
    document.body.innerHTML = "";
    vi.restoreAllMocks();
  });

  it("reports no hydration error and leaves one of each head tag", async () => {
    window.history.pushState({}, "", page.path);
    // The server pass may log React's useLayoutEffect-on-server notice (Radix);
    // only what hydration itself reports matters here.
    vi.spyOn(console, "error").mockImplementation(() => {});
    const { html, head } = await serverRender(page.path);
    const errors = vi.mocked(console.error);
    errors.mockClear();
    document.head.innerHTML = `<meta charset="UTF-8" />${head}`;
    const container = document.createElement("div");
    container.id = "root";
    container.setAttribute("data-server-rendered", "true");
    container.innerHTML = html;
    document.body.appendChild(container);

    await act(async () => {
      root = hydrateRoot(
        container,
        <HelmetProvider>
          <RouterProvider router={createBrowserRouter(routes)} />
        </HelmetProvider>,
      );
    });

    const hydrationErrors = errors.mock.calls.filter((c) => /hydrat|did not match|server html/i.test(String(c[0])));
    expect(hydrationErrors).toEqual([]);
    expect(document.title).toBe(page.title);
    expect(count("title")).toBe(1);
    expect(count('meta[name="description"]')).toBe(page.description ? 1 : 0);
    expect(count('meta[property="og:title"]')).toBe(1);
    expect(count('link[rel="canonical"]')).toBe("robots" in page ? 0 : 1);
    expect(container.querySelectorAll("h1")).toHaveLength(1);
  });
});

/**
 * dist/404.html is the prerender of "/404", but Vercel serves it at whatever
 * URL missed (here /no-existe). The browser router then matches "*" instead of
 * "404": both must render the same NotFound, or hydration would mismatch.
 */
describe("hydrating the 404 page at an arbitrary URL", () => {
  let root: Root | undefined;

  afterEach(() => {
    act(() => root?.unmount());
    document.head.innerHTML = "";
    document.body.innerHTML = "";
    vi.restoreAllMocks();
  });

  it("reports no hydration error and shows the not-found content", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    const { html, head } = await serverRender("/404");
    const errors = vi.mocked(console.error);
    errors.mockClear();
    window.history.pushState({}, "", "/no-existe");
    document.head.innerHTML = `<meta charset="UTF-8" />${head}`;
    const container = document.createElement("div");
    container.id = "root";
    container.innerHTML = html;
    document.body.appendChild(container);

    await act(async () => {
      root = hydrateRoot(
        container,
        <HelmetProvider>
          <RouterProvider router={createBrowserRouter(routes)} />
        </HelmetProvider>,
      );
    });

    const hydrationErrors = errors.mock.calls.filter((c) => /hydrat|did not match|server html/i.test(String(c[0])));
    expect(hydrationErrors).toEqual([]);
    expect(container.textContent).toContain("Página no encontrada");
    expect(document.title).toBe(PAGES.notFound.title);
    expect(count('meta[name="robots"]')).toBe(1);
  });
});
