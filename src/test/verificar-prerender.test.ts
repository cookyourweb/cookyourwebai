// @vitest-environment node
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { afterEach, describe, expect, it } from "vitest";

import { DOMINIO_POR_DEFECTO } from "@/lib/rutas-publicas";
import { PAGES } from "@/lib/seo";
import { archivoDeRuta, comprobarDist, comprobarHtml, leerPaginasEsperadas } from "../../scripts/verificar-prerender.mjs";

const root = resolve(__dirname, "../..");
const seoSource = readFileSync(join(root, "src/lib/seo.ts"), "utf8");
const domainSource = readFileSync(join(root, "src/lib/rutas-publicas.ts"), "utf8");

const indexable = {
  ruta: "/avisolegal",
  titulo: "Aviso legal | CookYourWebAI",
  descripcion: "Titular y condiciones.",
  robots: undefined,
  canonical: "https://www.cookyourwebai.es/avisolegal",
};
const noindex = {
  ruta: "/baja",
  titulo: "Darme de baja | CookYourWebAI",
  descripcion: "Solicita la baja.",
  robots: "noindex, follow",
  canonical: undefined,
};

const ld = `<script data-rh="true" type="application/ld+json">{"@context":"https://schema.org","@type":"BreadcrumbList"}</script>`;
const pageHtml = (head: string, body = "<main><h1>Aviso legal</h1></main>") =>
  `<!DOCTYPE html><html lang="es"><head>${head}<meta charset="UTF-8"></head><body><div id="root">${body}</div></body></html>`;
const goodHead =
  `<title data-rh="true">Aviso legal | CookYourWebAI</title>` +
  `<meta data-rh="true" name="description" content="Titular y condiciones."/>` +
  `<link data-rh="true" rel="canonical" href="https://www.cookyourwebai.es/avisolegal"/>${ld}`;

describe("comprobarHtml", () => {
  it("accepts a complete indexable page", () => {
    expect(comprobarHtml(pageHtml(goodHead), indexable)).toEqual([]);
  });

  it("accepts the attributes in any order", () => {
    const head =
      `<title>Aviso legal | CookYourWebAI</title><meta content="Titular y condiciones." name="description">` +
      `<link href="https://www.cookyourwebai.es/avisolegal" rel="canonical">${ld}`;
    expect(comprobarHtml(pageHtml(head), indexable)).toEqual([]);
  });

  it("fails without an h1, or with two", () => {
    expect(comprobarHtml(pageHtml(goodHead, "<main></main>"), indexable).join()).toMatch(/h1/);
    expect(comprobarHtml(pageHtml(goodHead, "<h1>a</h1><h1>b</h1>"), indexable).join()).toMatch(/h1/);
  });

  it("fails on a missing, wrong or duplicated title", () => {
    expect(comprobarHtml(pageHtml(goodHead.replace(/<title.*?<\/title>/, "")), indexable).join()).toMatch(/title/);
    expect(comprobarHtml(pageHtml(goodHead.replace("Aviso legal |", "Otro |")), indexable).join()).toMatch(/title/);
    expect(comprobarHtml(pageHtml(`<title>Home</title>${goodHead}`), indexable).join()).toMatch(/title/);
  });

  it("fails on a wrong or duplicated description", () => {
    expect(comprobarHtml(pageHtml(goodHead.replace("Titular", "Otro")), indexable).join()).toMatch(/description/);
    const dup = `<meta name="description" content="Titular y condiciones.">${goodHead}`;
    expect(comprobarHtml(pageHtml(dup), indexable).join()).toMatch(/description/);
  });

  it("fails on a missing, wrong or duplicated canonical for an indexable page", () => {
    expect(comprobarHtml(pageHtml(goodHead.replace(/<link.*?\/>/, "")), indexable).join()).toMatch(/canonical/);
    expect(comprobarHtml(pageHtml(goodHead.replace("/avisolegal", "/")), indexable).join()).toMatch(/canonical/);
    const dup = `<link rel="canonical" href="https://www.cookyourwebai.es/avisolegal">${goodHead}`;
    expect(comprobarHtml(pageHtml(dup), indexable).join()).toMatch(/canonical/);
  });

  it("fails without JSON-LD, or with JSON-LD that is not JSON", () => {
    expect(comprobarHtml(pageHtml(goodHead.replace(ld, "")), indexable).join()).toMatch(/JSON-LD/);
    expect(comprobarHtml(pageHtml(goodHead.replace(ld, `<script type="application/ld+json">{oops</script>`)), indexable).join()).toMatch(/JSON-LD/);
  });

  it("fails if an indexable page carries a noindex", () => {
    const head = goodHead + `<meta name="robots" content="noindex, follow"/>`;
    expect(comprobarHtml(pageHtml(head), indexable).join()).toMatch(/robots/);
  });

  describe("noindex page", () => {
    const head =
      `<title>Darme de baja | CookYourWebAI</title><meta name="description" content="Solicita la baja."/>` +
      `<meta name="robots" content="noindex, follow"/>`;

    it("accepts the directive and no canonical", () => {
      expect(comprobarHtml(pageHtml(head), noindex)).toEqual([]);
    });

    it("fails without the directive or with a canonical", () => {
      expect(comprobarHtml(pageHtml(head.replace(/<meta name="robots".*?>/, "")), noindex).join()).toMatch(/robots/);
      const withCanonical = head + `<link rel="canonical" href="https://www.cookyourwebai.es/baja"/>`;
      expect(comprobarHtml(pageHtml(withCanonical), noindex).join()).toMatch(/canonical/);
    });
  });

  it("decodes entities before comparing the title", () => {
    const page = { ...indexable, titulo: "Tom & Jerry | CookYourWebAI" };
    const head = goodHead.replace("Aviso legal | CookYourWebAI", "Tom &amp; Jerry | CookYourWebAI");
    expect(comprobarHtml(pageHtml(head), page)).toEqual([]);
  });
});

describe("archivoDeRuta", () => {
  it("maps routes to the nested files and the 404", () => {
    expect(archivoDeRuta("/")).toBe("index.html");
    expect(archivoDeRuta("/avisolegal")).toBe("avisolegal/index.html");
    expect(archivoDeRuta("*")).toBe("404.html");
  });
});

describe("leerPaginasEsperadas", () => {
  const paginas = leerPaginasEsperadas(seoSource, domainSource);

  it("reads exactly what src/lib/seo.ts exports, so the check cannot drift", () => {
    const esperado = Object.values(PAGES).map((p) => ({
      ruta: p.path,
      titulo: p.title,
      descripcion: "description" in p ? p.description : undefined,
      robots: "robots" in p ? p.robots : undefined,
      canonical: "robots" in p ? undefined : `${DOMINIO_POR_DEFECTO}${p.path}`,
    }));

    expect(paginas).toEqual(esperado);
  });
});

describe("comprobarDist", () => {
  let dist: string;
  afterEach(() => rmSync(dist, { recursive: true, force: true }));

  const write = (file: string, content: string) => {
    mkdirSync(dirname(join(dist, file)), { recursive: true });
    writeFileSync(join(dist, file), content);
  };
  const fixture = () => {
    dist = mkdtempSync(join(tmpdir(), "dist-"));
    for (const p of leerPaginasEsperadas(seoSource, domainSource)) {
      const head =
        `<title>${p.titulo}</title>` +
        (p.descripcion ? `<meta name="description" content="${p.descripcion}"/>` : "") +
        (p.robots ? `<meta name="robots" content="${p.robots}"/>` : `<link rel="canonical" href="${p.canonical}"/>${ld}`);
      write(archivoDeRuta(p.ruta), pageHtml(head, "<h1>x</h1>"));
    }
  };

  it("passes on a complete dist", () => {
    fixture();
    expect(comprobarDist(dist, seoSource, domainSource)).toEqual([]);
  });

  it("reports a missing file by name, including 404.html", () => {
    fixture();
    rmSync(join(dist, "404.html"));
    rmSync(join(dist, "avisolegal"), { recursive: true });

    const errors = comprobarDist(dist, seoSource, domainSource).join("\n");

    expect(errors).toContain("404.html");
    expect(errors).toContain("avisolegal/index.html");
  });
});
