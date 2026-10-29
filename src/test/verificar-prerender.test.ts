// @vitest-environment node
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { afterEach, describe, expect, it } from "vitest";

import { DOMINIO_POR_DEFECTO } from "@/lib/rutas-publicas";
import { OG_IMAGE, PAGES } from "@/lib/seo";
import { archivoDeRuta, comprobarDist, comprobarEstaticos, comprobarHtml, leerPaginasEsperadas } from "../../scripts/verificar-prerender.mjs";

const root = resolve(__dirname, "../..");
const seoSource = readFileSync(join(root, "src/lib/seo.ts"), "utf8");
const domainSource = readFileSync(join(root, "src/lib/rutas-publicas.ts"), "utf8");

const OG = "https://www.cookyourwebai.es/og-cookyourwebai.png";
const indexable = {
  ruta: "/avisolegal",
  titulo: "Aviso legal | CookYourWebAI",
  descripcion: "Titular y condiciones.",
  robots: undefined,
  canonical: "https://www.cookyourwebai.es/avisolegal",
  ogImage: OG,
  jsonLd: "breadcrumb" as const,
};
const noindex = {
  ruta: "/baja",
  titulo: "Darme de baja | CookYourWebAI",
  descripcion: "Solicita la baja.",
  robots: "noindex, follow",
  canonical: undefined,
  ogImage: OG,
  jsonLd: undefined,
};

const ld = `<script data-rh="true" type="application/ld+json">{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1},{"@type":"ListItem","position":2}]}</script>`;
const homeLd = `<script type="application/ld+json">{"@context":"https://schema.org","@graph":[{"@type":"WebSite"},{"@type":"ProfessionalService"}]}</script>`;
const pageHtml = (head: string, body = "<main><h1>Aviso legal</h1></main>", lang = ' lang="es"') =>
  `<!DOCTYPE html><html${lang}><head>${head}<meta charset="UTF-8"></head><body><div id="root">${body}</div></body></html>`;
const ogTags = (title: string, extra = "") =>
  `<meta property="og:title" content="${title}"/><meta property="og:image" content="${OG}"/>` +
  `<meta name="twitter:card" content="summary_large_image"/>${extra}`;
const goodHead =
  `<title data-rh="true">Aviso legal | CookYourWebAI</title>` +
  `<meta data-rh="true" name="description" content="Titular y condiciones."/>` +
  `<link data-rh="true" rel="canonical" href="https://www.cookyourwebai.es/avisolegal"/>` +
  ogTags("Aviso legal | CookYourWebAI", `<meta property="og:url" content="https://www.cookyourwebai.es/avisolegal"/>`) +
  ld;

describe("comprobarHtml", () => {
  it("accepts a complete indexable page", () => {
    expect(comprobarHtml(pageHtml(goodHead), indexable)).toEqual([]);
  });

  it("accepts the attributes in any order", () => {
    const head =
      `<title>Aviso legal | CookYourWebAI</title><meta content="Titular y condiciones." name="description">` +
      `<link href="https://www.cookyourwebai.es/avisolegal" rel="canonical">` +
      `<meta content="Aviso legal | CookYourWebAI" property="og:title"><meta content="${OG}" property="og:image">` +
      `<meta content="summary_large_image" name="twitter:card"><meta content="https://www.cookyourwebai.es/avisolegal" property="og:url">${ld}`;
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
      `<meta name="robots" content="noindex, follow"/>` +
      ogTags("Darme de baja | CookYourWebAI");

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
    const head = goodHead.replaceAll("Aviso legal | CookYourWebAI", "Tom &amp; Jerry | CookYourWebAI");
    expect(comprobarHtml(pageHtml(head), page)).toEqual([]);
  });
});

describe("comprobarHtml: language, h1 text, social tags and JSON-LD", () => {
  const check = (html: string, page = indexable) => comprobarHtml(html, page).join("\n");

  it("fails without lang=\"es\" on <html>", () => {
    expect(check(pageHtml(goodHead, undefined, ""))).toMatch(/lang/);
    expect(check(pageHtml(goodHead, undefined, ' lang="en"'))).toMatch(/lang/);
  });

  it("fails on an empty h1", () => {
    expect(check(pageHtml(goodHead, "<main><h1>  <span></span> </h1></main>"))).toMatch(/h1.*text|empty/i);
  });

  it("fails on a wrong, missing or duplicated og:title", () => {
    expect(check(pageHtml(goodHead.replace('property="og:title" content="Aviso legal', 'property="og:title" content="Otro')))).toMatch(/og:title/);
    expect(check(pageHtml(goodHead.replace(/<meta property="og:title"[^>]*>/, "")))).toMatch(/og:title/);
    expect(check(pageHtml(goodHead + `<meta property="og:title" content="Aviso legal | CookYourWebAI"/>`))).toMatch(/og:title/);
  });

  it("fails on a wrong, missing or duplicated og:image", () => {
    expect(check(pageHtml(goodHead.replace(OG, "https://example.com/x.png")))).toMatch(/og:image/);
    expect(check(pageHtml(goodHead.replace(/<meta property="og:image"[^>]*>/, "")))).toMatch(/og:image/);
    expect(check(pageHtml(goodHead + `<meta property="og:image" content="${OG}"/>`))).toMatch(/og:image/);
  });

  it("fails on a wrong, missing or duplicated twitter:card", () => {
    expect(check(pageHtml(goodHead.replace("summary_large_image", "summary")))).toMatch(/twitter:card/);
    expect(check(pageHtml(goodHead.replace(/<meta name="twitter:card"[^>]*>/, "")))).toMatch(/twitter:card/);
    expect(check(pageHtml(goodHead + `<meta name="twitter:card" content="summary_large_image"/>`))).toMatch(/twitter:card/);
  });

  it("requires og:url equal to the canonical on an indexable page", () => {
    expect(check(pageHtml(goodHead.replace(/<meta property="og:url"[^>]*>/, "")))).toMatch(/og:url/);
    expect(check(pageHtml(goodHead.replace('og:url" content="https://www.cookyourwebai.es/avisolegal', 'og:url" content="https://www.cookyourwebai.es/')))).toMatch(/og:url/);
  });

  it("forbids og:url on a noindex page", () => {
    const head =
      `<title>Darme de baja | CookYourWebAI</title><meta name="description" content="Solicita la baja."/>` +
      `<meta name="robots" content="noindex, follow"/>` +
      ogTags("Darme de baja | CookYourWebAI", `<meta property="og:url" content="https://www.cookyourwebai.es/baja"/>`);
    expect(check(pageHtml(head, "<h1>x</h1>"), noindex)).toMatch(/og:url/);
  });

  it("forbids JSON-LD on a noindex page", () => {
    const head =
      `<title>Darme de baja | CookYourWebAI</title><meta name="description" content="Solicita la baja."/>` +
      `<meta name="robots" content="noindex, follow"/>` + ogTags("Darme de baja | CookYourWebAI") + ld;
    expect(check(pageHtml(head, "<h1>x</h1>"), noindex)).toMatch(/JSON-LD/);
  });

  describe("JSON-LD by type", () => {
    it("a breadcrumb page needs a BreadcrumbList with two ListItem", () => {
      const one = goodHead.replace(',{"@type":"ListItem","position":2}', "");
      expect(check(pageHtml(one))).toMatch(/BreadcrumbList/);
      const wrong = goodHead.replace("BreadcrumbList", "Thing");
      expect(check(pageHtml(wrong))).toMatch(/BreadcrumbList/);
    });

    it("the home needs an @graph with WebSite and ProfessionalService", () => {
      const home = { ...indexable, ruta: "/", canonical: "https://www.cookyourwebai.es/", jsonLd: "home" as const };
      const head = goodHead.replace(ld, homeLd).replaceAll("/avisolegal", "/");
      expect(check(pageHtml(head, undefined), home)).toBe("");
      const noService = head.replace('{"@type":"ProfessionalService"}', '{"@type":"Person"}');
      expect(check(pageHtml(noService, undefined), home)).toMatch(/ProfessionalService/);
      const noGraph = head.replace(homeLd, ld);
      expect(check(pageHtml(noGraph, undefined), home)).toMatch(/@graph|WebSite/);
    });
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
    const esperado = Object.entries(PAGES).map(([key, p]) => ({
      ruta: p.path,
      titulo: p.title,
      descripcion: "description" in p ? p.description : undefined,
      robots: "robots" in p ? p.robots : undefined,
      canonical: "robots" in p ? undefined : `${DOMINIO_POR_DEFECTO}${p.path}`,
      ogImage: OG_IMAGE.url,
      jsonLd: p.path === "/" ? "home" : ["privacy", "cookies", "legal"].includes(key) ? "breadcrumb" : undefined,
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
        `<meta property="og:title" content="${p.titulo}"/><meta property="og:image" content="${p.ogImage}"/>` +
        `<meta name="twitter:card" content="summary_large_image"/>` +
        (p.robots
          ? `<meta name="robots" content="${p.robots}"/>`
          : `<link rel="canonical" href="${p.canonical}"/><meta property="og:url" content="${p.canonical}"/>${p.jsonLd === "home" ? homeLd : ld}`);
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

describe("comprobarEstaticos", () => {
  const KEY = "0123456789abcdef0123456789abcdef";
  let base: string;
  afterEach(() => rmSync(base, { recursive: true, force: true }));

  const fixture = () => {
    base = mkdtempSync(join(tmpdir(), "static-"));
    for (const dir of ["public", "dist"]) {
      mkdirSync(join(base, dir));
      writeFileSync(join(base, dir, "llms.txt"), "# CookYourWebAI\n");
      writeFileSync(join(base, dir, `${KEY}.txt`), KEY);
    }
    return { dist: join(base, "dist"), publicDir: join(base, "public") };
  };

  it("passes when dist carries llms.txt and the IndexNow key file untouched", () => {
    const { dist, publicDir } = fixture();
    expect(comprobarEstaticos(dist, publicDir)).toEqual([]);
  });

  it("reports a missing llms.txt, a missing key file and a changed one", () => {
    const { dist, publicDir } = fixture();
    rmSync(join(dist, "llms.txt"));
    writeFileSync(join(dist, `${KEY}.txt`), "<html>spa fallback</html>");

    const errors = comprobarEstaticos(dist, publicDir).join("\n");

    expect(errors).toContain("llms.txt: file does not exist");
    expect(errors).toContain(`${KEY}.txt: differs from public/`);
  });

  it("reports a public/ without exactly one key file", () => {
    const { dist, publicDir } = fixture();
    rmSync(join(publicDir, `${KEY}.txt`));
    expect(comprobarEstaticos(dist, publicDir).join("\n")).toContain("exactly one IndexNow key file");
  });
});
