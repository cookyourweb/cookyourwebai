import { render, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import App from "@/App";
import { COMPANY } from "@/lib/company";
import { DOMINIO_POR_DEFECTO } from "@/lib/rutas-publicas";
import { OG_IMAGE, PAGES, canonical, homeJsonLd } from "@/lib/seo";
import { mainServices } from "@/lib/servicios";

type Node = Record<string, unknown> & { "@type": string; "@id"?: string };

const graph = () => homeJsonLd()["@graph"] as Node[];
const byType = (type: string) => graph().filter((n) => n["@type"] === type);
const negocio = () => byType("ProfessionalService")[0];

const NEGOCIO = `${DOMINIO_POR_DEFECTO}/#negocio`;
const VERONICA = `${DOMINIO_POR_DEFECTO}/#veronica`;

const scripts = () => Array.from(document.head.querySelectorAll('script[type="application/ld+json"]'));

const open = (path: string) => {
  window.history.pushState({}, "", path);
  return render(<App />);
};

describe("home JSON-LD graph", () => {
  it("uses the schema.org context and fixed @ids on the domain", () => {
    expect(homeJsonLd()["@context"]).toBe("https://schema.org");
    expect(byType("WebSite")[0]["@id"]).toBe(`${DOMINIO_POR_DEFECTO}/#web`);
    expect(negocio()["@id"]).toBe(NEGOCIO);
    expect(byType("Person")[0]["@id"]).toBe(VERONICA);
  });

  it("points publisher, provider and worksFor to the business, and founder to the person", () => {
    expect(byType("WebSite")[0].publisher).toEqual({ "@id": NEGOCIO });
    expect(byType("Person")[0].worksFor).toEqual({ "@id": NEGOCIO });
    expect(negocio().founder).toEqual({ "@id": VERONICA });
    for (const service of byType("Service")) expect(service.provider).toEqual({ "@id": NEGOCIO });
  });

  it("takes the contact data and the images from the single sources", () => {
    expect(negocio().telephone).toBe(COMPANY.phone);
    expect(negocio().telephone).toMatch(/^\+\d+$/);
    expect(negocio().email).toBe(COMPANY.email);
    expect(negocio().url).toBe(canonical("/"));
    expect(negocio().name).toBe(COMPANY.name);
    expect(negocio().logo).toBe(`${DOMINIO_POR_DEFECTO}/apple-touch-icon.png`);
    expect(negocio().image).toBe(OG_IMAGE.url);
    expect(negocio().areaServed).toEqual({ "@type": "Country", name: "España" });
    expect(byType("Person")[0].name).toBe(COMPANY.legalName);
  });

  it("never emits what the owner ruled out", () => {
    const json = JSON.stringify(homeJsonLd());
    for (const banned of ["address", "aggregateRating", "review", "priceRange", "sameAs", "FAQPage"]) {
      expect(json, banned).not.toContain(banned);
    }
  });

  it("has exactly one Service per main service, named as the home names it", () => {
    const services = byType("Service");
    expect(services).toHaveLength(4);
    expect(services.map((s) => s.name)).toEqual(mainServices.map((s) => s.title));
    for (const [i, s] of mainServices.entries()) {
      expect(services[i]["@id"]).toBe(`${DOMINIO_POR_DEFECTO}/#servicio-${s.slug}`);
      expect(services[i].url).toBe(`${DOMINIO_POR_DEFECTO}/#${s.id}`);
    }
  });

  it("only links to anchors that exist in the rendered home", async () => {
    open("/");
    await waitFor(() => expect(document.title).toBe(PAGES.home.title));

    for (const service of byType("Service")) {
      const anchor = String(service.url).split("#")[1];
      expect(document.getElementById(anchor), anchor).not.toBeNull();
    }
  });
});

describe("rendered home JSON-LD", () => {
  it("the home head has exactly one parseable ld+json script", async () => {
    open("/");

    await waitFor(() => expect(scripts()).toHaveLength(1));
    expect(JSON.parse(scripts()[0].textContent ?? "")).toEqual(homeJsonLd());
  });

  it.each([
    ["/baja", PAGES.unsubscribe.title],
    ["/agenteActivado", PAGES.thanks.title],
    ["/una-ruta-que-no-existe", PAGES.notFound.title],
  ])("%s emits no JSON-LD", async (ruta, title) => {
    open(ruta);

    await waitFor(() => expect(document.title).toBe(title));
    expect(scripts()).toHaveLength(0);
  });
});
