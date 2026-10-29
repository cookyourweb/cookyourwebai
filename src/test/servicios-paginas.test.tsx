import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import App from "@/App";
import { DOMINIO_POR_DEFECTO, RUTAS_PUBLICAS } from "@/lib/rutas-publicas";
import { PAGES, canonical, homeJsonLd } from "@/lib/seo";
import { mainServices } from "@/lib/servicios";

const PATHS = [
  "/servicios/automatizacion-ia-empresas",
  "/servicios/funnels-ventas-ia",
  "/servicios/avatares-ia",
  "/servicios/consultoria-ia",
];

const scripts = () => Array.from(document.head.querySelectorAll('script[type="application/ld+json"]'));
const ldGraph = () => (JSON.parse(scripts()[0].textContent ?? "{}")["@graph"] ?? []) as Array<Record<string, unknown>>;

const open = (path: string) => {
  window.history.pushState({}, "", path);
  return render(<App />);
};

describe("service pages: data", () => {
  it("maps the approved URLs to the four services, in order, from servicios.ts", () => {
    expect(mainServices.map((s) => s.path)).toEqual(PATHS);
  });

  it("lists them as public routes and gives each a unique SEO entry", () => {
    for (const path of PATHS) {
      expect(RUTAS_PUBLICAS, path).toContain(path);
      const page = Object.values(PAGES).find((p) => p.path === path);
      expect(page, path).toBeDefined();
      expect(page?.description, path).toBeTruthy();
    }
  });

  it("keeps the 'IA' spelling and the brand in the new titles and descriptions", () => {
    for (const path of PATHS) {
      const page = Object.values(PAGES).find((p) => p.path === path)!;
      expect(`${page.title} ${page.description}`).toMatch(/\bIA\b/);
      expect(page.title.endsWith("| CookYourWebAI")).toBe(true);
    }
  });

  it("makes the home graph point each Service to its page", () => {
    const services = (homeJsonLd()["@graph"] as Array<Record<string, unknown>>).filter((n) => n["@type"] === "Service");
    expect(services.map((s) => s.url)).toEqual(PATHS.map((p) => `${DOMINIO_POR_DEFECTO}${p}`));
  });
});

describe.each(mainServices.map((s) => [s.path, s] as const))("service page %s", (path, service) => {
  const page = () => Object.values(PAGES).find((p) => p.path === path)!;

  it("sets title, description and a self-referencing canonical", async () => {
    open(path);

    await waitFor(() => expect(document.title).toBe(page().title));
    expect(document.head.querySelector('link[rel="canonical"]')?.getAttribute("href")).toBe(canonical(path));
    expect(document.head.querySelector('meta[name="description"]')?.getAttribute("content")).toBe(page().description);
    expect(document.head.querySelector('meta[name="robots"]')).toBeNull();
  });

  it("shows the existing service text: h1 title, description, price and every feature", async () => {
    open(path);

    const h1 = await screen.findByRole("heading", { level: 1 });
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(h1).toHaveTextContent(service.title);
    const main = screen.getByRole("main");
    expect(within(main).getByText(service.description)).toBeInTheDocument();
    expect(within(main).getByText(service.price)).toBeInTheDocument();
    for (const feature of service.features) expect(within(main).getByText(feature)).toBeInTheDocument();
  });

  it("emits one JSON-LD with the Service and the breadcrumb, no ruled-out properties", async () => {
    open(path);

    await waitFor(() => expect(scripts()).toHaveLength(1));
    const graph = ldGraph();
    const svc = graph.find((n) => n["@type"] === "Service")!;
    expect(svc).toMatchObject({
      "@id": `${DOMINIO_POR_DEFECTO}/#servicio-${service.slug}`,
      name: service.title,
      url: canonical(path),
      provider: { "@id": `${DOMINIO_POR_DEFECTO}/#negocio` },
    });
    const crumb = graph.find((n) => n["@type"] === "BreadcrumbList") as { itemListElement: Array<Record<string, unknown>> };
    expect(crumb.itemListElement).toHaveLength(2);
    expect(crumb.itemListElement[0]).toMatchObject({ position: 1, name: "Inicio", item: canonical("/") });
    expect(crumb.itemListElement[1]).toMatchObject({ position: 2, item: canonical(path) });
    const json = JSON.stringify(graph);
    for (const banned of ["address", "aggregateRating", "review", "priceRange", "sameAs"]) {
      expect(json, banned).not.toContain(banned);
    }
  });

  it("shows the same breadcrumb as the JSON-LD above the h1", async () => {
    open(path);

    const nav = await screen.findByRole("navigation", { name: "Migas de pan" });
    await waitFor(() => expect(scripts()).toHaveLength(1));
    const crumb = ldGraph().find((n) => n["@type"] === "BreadcrumbList") as { itemListElement: Array<{ name: string }> };
    const items = within(nav).getAllByRole("listitem").filter((li) => li.getAttribute("aria-hidden") !== "true");
    expect(items.map((li) => li.textContent)).toEqual(crumb.itemListElement.map((i) => i.name));
    expect(within(nav).getByRole("link", { name: "Inicio" })).toHaveAttribute("href", "/");
    expect(nav.compareDocumentPosition(screen.getByRole("heading", { level: 1 })) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it("has a call to action that opens the existing audit dialog", async () => {
    const user = userEvent.setup();
    open(path);
    const h1 = await screen.findByRole("heading", { level: 1 });

    const zone = h1.closest("main")!.querySelector<HTMLElement>("[data-service-cta]")!;
    expect(zone).not.toBeNull();
    const button = within(zone).getByRole("button");
    expect(button.className).toMatch(/\bmin-h-11\b/);
    await user.click(button);

    const dialog = await screen.findByRole("dialog");
    expect(within(dialog).getByRole("textbox", { name: "Nombre y cargo" })).toBeInTheDocument();
  });

  it("keeps the sticky bar and the closing block of the public pages", async () => {
    open(path);
    await screen.findByRole("heading", { level: 1 });

    expect(document.querySelector("[data-sticky-audit-cta]")).not.toBeNull();
    expect(screen.getByRole("region", { name: "Auditoría AI gratuita" })).toBeInTheDocument();
  });
});

describe("links to the service pages", () => {
  it("the home cards link every service title to its page with a real href", async () => {
    open("/");
    await screen.findAllByRole("banner");

    for (const service of mainServices) {
      const heading = document.getElementById(service.id)!;
      expect(heading.tagName).toBe("H3");
      expect(within(heading).getByRole("link", { name: service.title })).toHaveAttribute("href", service.path);
    }
  });

  it.each(["/", "/avisolegal", ...PATHS])("the footer on %s links the four pages", async (ruta) => {
    open(ruta);
    await screen.findAllByRole("banner");

    const nav = screen.getByRole("navigation", { name: "Servicios" });
    for (const service of mainServices) {
      expect(within(nav).getByRole("link", { name: service.title })).toHaveAttribute("href", service.path);
    }
  });
});

describe("footer button for companies", () => {
  it("sits next to the Empleo Tech link and opens the WhatsApp contact form with its privacy checkbox", async () => {
    const user = userEvent.setup();
    open("/avisolegal");
    await screen.findAllByRole("banner");

    const footer = screen.getByRole("contentinfo");
    expect(within(footer).getByRole("link", { name: "Empleo Tech" })).toHaveAttribute(
      "href",
      "https://empleo.cookyourwebai.es/es/",
    );
    await user.click(within(footer).getByRole("button", { name: "¿Eres empresa y buscas desarrolladores?" }));

    const dialog = await screen.findByRole("dialog");
    expect(within(dialog).getByRole("checkbox")).toBeInTheDocument();
  });
});
