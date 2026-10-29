/**
 * Checks dist/ after `npm run build`: every route must have been prerendered
 * with its own tags in the HTML (what crawlers and link-preview bots read
 * without running JS). The build is never run locally, so CI runs this right
 * after it and fails (exit 1) if anything is missing or wrong.
 *
 * The expected values are read as text from src/lib/seo.ts and
 * src/lib/rutas-publicas.ts (like scripts/generar-sitemap.mjs does), so this
 * check and the app share one source and neither needs a TypeScript compiler.
 * The pure checks (comprobarHtml, leerPaginasEsperadas) are unit-tested in
 * src/test/verificar-prerender.test.ts.
 */
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

/** Route -> file in dist/. Routes are nested (avisolegal/index.html); "*" is the 404. */
export function archivoDeRuta(ruta) {
  if (ruta === "*") return "404.html";
  if (ruta === "/") return "index.html";
  return `${ruta.replace(/^\//, "")}/index.html`;
}

/** Pages declared in seo.ts, with what each one must look like in the HTML. */
export function leerPaginasEsperadas(seoSource, rutasSource) {
  const dominio = rutasSource.match(/DOMINIO_POR_DEFECTO = "([^"]+)"/)?.[1];
  if (!dominio) throw new Error("DOMINIO_POR_DEFECTO not found in rutas-publicas.ts");

  const bloque = seoSource.match(/export const PAGES = \{([\s\S]*?)\} as const satisfies/)?.[1];
  if (!bloque) throw new Error("PAGES not found in seo.ts");

  const og = seoSource.match(/OG_IMAGE = \{\s*url: `\$\{DOMINIO_POR_DEFECTO\}([^`]+)`/)?.[1];
  if (!og) throw new Error("OG_IMAGE url not found in seo.ts");
  const migas = seoSource.match(/BREADCRUMB_PAGES = \[([^\]]*)\]/)?.[1];
  const clavesMiga = [...(migas ?? "").matchAll(/"([^"]+)"/g)].map((m) => m[1]);
  if (clavesMiga.length === 0) throw new Error("BREADCRUMB_PAGES not found in seo.ts");

  const servicios = seoSource.match(/SERVICE_PAGES = \[([^\]]*)\]/)?.[1];
  const clavesServicio = [...(servicios ?? "").matchAll(/"([^"]+)"/g)].map((m) => m[1]);
  if (clavesServicio.length === 0) throw new Error("SERVICE_PAGES not found in seo.ts");

  const entrada =
    /(\w+):\s*\{\s*path:\s*"([^"]+)",\s*title:\s*"([^"]+)"(?:,\s*description:\s*"([^"]+)")?(?:,\s*robots:\s*"([^"]+)")?,?\s*\}/g;
  const paginas = [...bloque.matchAll(entrada)].map(([, clave, ruta, titulo, descripcion, robots]) => ({
    ruta,
    titulo,
    descripcion,
    robots,
    canonical: robots ? undefined : `${dominio}${ruta}`,
    ogImage: `${dominio}${og}`,
    jsonLd: robots
      ? undefined
      : ruta === "/"
        ? "home"
        : clavesServicio.includes(clave)
          ? "service"
          : clavesMiga.includes(clave)
            ? "breadcrumb"
            : undefined,
  }));
  if (paginas.length === 0) throw new Error("No pages read from seo.ts");
  return paginas;
}

const decodificar = (texto) =>
  texto
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#(?:39|x27);/g, "'")
    .replace(/&amp;/g, "&");

function atributos(etiqueta) {
  const attrs = {};
  for (const [, nombre, d, s] of etiqueta.matchAll(/([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g)) {
    attrs[nombre.toLowerCase()] = decodificar(d ?? s ?? "");
  }
  return attrs;
}

const etiquetas = (html, nombre) => [...html.matchAll(new RegExp(`<${nombre}\\b[^>]*>`, "gi"))].map((m) => atributos(m[0]));

/** Returns the list of problems found in one prerendered page (empty = OK). */
export function comprobarHtml(html, pagina) {
  const errores = [];

  if (!/<html\b[^>]*\slang=["']es["']/i.test(html)) errores.push('expected <html lang="es">');

  const h1 = (html.match(/<h1[\s>]/gi) ?? []).length;
  if (h1 !== 1) errores.push(`expected exactly one <h1>, found ${h1}`);
  else {
    const texto = (html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1] ?? "").replace(/<[^>]*>/g, "").trim();
    if (texto === "") errores.push("the <h1> has no text (empty h1)");
  }

  const titulos = [...html.matchAll(/<title\b[^>]*>([\s\S]*?)<\/title>/gi)].map((m) => decodificar(m[1]).trim());
  if (titulos.length !== 1 || titulos[0] !== pagina.titulo) {
    errores.push(`expected exactly one <title> "${pagina.titulo}", found ${JSON.stringify(titulos)}`);
  }

  const metas = etiquetas(html, "meta");
  const descripciones = metas.filter((m) => m.name === "description").map((m) => m.content);
  if (pagina.descripcion !== undefined) {
    if (descripciones.length !== 1 || descripciones[0] !== pagina.descripcion) {
      errores.push(`expected exactly one meta description "${pagina.descripcion}", found ${JSON.stringify(descripciones)}`);
    }
  }

  const valores = (clave, valor) =>
    metas.filter((m) => m[clave] === valor).map((m) => m.content);
  const unico = (etiqueta, encontrados, esperado) => {
    if (encontrados.length !== 1 || encontrados[0] !== esperado) {
      errores.push(`expected exactly one ${etiqueta} "${esperado}", found ${JSON.stringify(encontrados)}`);
    }
  };
  unico("og:title", valores("property", "og:title"), pagina.titulo);
  unico("og:image", valores("property", "og:image"), pagina.ogImage);
  unico("twitter:card", valores("name", "twitter:card"), "summary_large_image");
  const ogUrl = valores("property", "og:url");

  const robots = metas.filter((m) => m.name === "robots").map((m) => m.content);
  const canonicals = etiquetas(html, "link")
    .filter((l) => l.rel === "canonical")
    .map((l) => l.href);

  if (pagina.robots) {
    if (robots.length !== 1 || robots[0] !== pagina.robots) {
      errores.push(`expected exactly one meta robots "${pagina.robots}", found ${JSON.stringify(robots)}`);
    }
    if (canonicals.length > 0) errores.push(`a noindex page must not have a canonical, found ${JSON.stringify(canonicals)}`);
    if (ogUrl.length > 0) errores.push(`a noindex page must not have og:url, found ${JSON.stringify(ogUrl)}`);
    if (/<script\b[^>]*type=["']application\/ld\+json["']/i.test(html)) {
      errores.push("a noindex page must not have JSON-LD");
    }
  } else {
    unico("og:url", ogUrl, pagina.canonical);
    if (robots.length > 0) errores.push(`an indexable page must not have meta robots, found ${JSON.stringify(robots)}`);
    if (canonicals.length !== 1 || canonicals[0] !== pagina.canonical) {
      errores.push(`expected exactly one canonical "${pagina.canonical}", found ${JSON.stringify(canonicals)}`);
    }
    const bloques = [...html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
    if (bloques.length === 0) {
      errores.push("expected JSON-LD (<script type=\"application/ld+json\">), found none");
    }
    const datos = [];
    for (const [, contenido] of bloques) {
      try {
        datos.push(JSON.parse(contenido));
      } catch {
        errores.push("JSON-LD is not valid JSON");
      }
    }
    const tipos = (nodo) => [].concat(nodo?.["@type"] ?? []);
    if (pagina.jsonLd === "home") {
      const nodos = datos.flatMap((d) => (Array.isArray(d?.["@graph"]) ? d["@graph"] : []));
      if (nodos.length === 0) errores.push("expected JSON-LD with an @graph on the home");
      for (const tipo of ["WebSite", "ProfessionalService"]) {
        if (!nodos.some((n) => tipos(n).includes(tipo))) errores.push(`expected a ${tipo} in the JSON-LD @graph`);
      }
    } else if (pagina.jsonLd === "service") {
      const nodos = datos.flatMap((d) => (Array.isArray(d?.["@graph"]) ? d["@graph"] : []));
      const servicio = nodos.find((n) => tipos(n).includes("Service"));
      if (!servicio) errores.push("expected a Service in the JSON-LD @graph");
      else {
        if (!servicio.provider?.["@id"]) errores.push("the Service in the JSON-LD has no provider @id");
        if (servicio.url !== pagina.canonical) {
          errores.push(`expected the Service url "${pagina.canonical}", found ${JSON.stringify(servicio.url)}`);
        }
      }
      const lista = nodos.find((n) => tipos(n).includes("BreadcrumbList"));
      const items = (lista?.itemListElement ?? []).filter((i) => tipos(i).includes("ListItem"));
      if (!lista) errores.push("expected a BreadcrumbList in the JSON-LD @graph");
      else if (items.length !== 2) errores.push(`expected a BreadcrumbList with 2 ListItem, found ${items.length}`);
    } else if (pagina.jsonLd === "breadcrumb") {
      const lista = datos.find((d) => tipos(d).includes("BreadcrumbList"));
      const items = (lista?.itemListElement ?? []).filter((i) => tipos(i).includes("ListItem"));
      if (!lista) errores.push("expected a BreadcrumbList in the JSON-LD");
      else if (items.length !== 2) errores.push(`expected a BreadcrumbList with 2 ListItem, found ${items.length}`);
    }
  }

  return errores;
}

/** Checks every page of seo.ts in dist/. Returns "file: problem" lines. */
export function comprobarDist(dist, seoSource, rutasSource) {
  const errores = [];
  for (const pagina of leerPaginasEsperadas(seoSource, rutasSource)) {
    const archivo = archivoDeRuta(pagina.ruta);
    const ruta = join(dist, archivo);
    if (!existsSync(ruta)) {
      errores.push(`${archivo}: file does not exist`);
      continue;
    }
    for (const error of comprobarHtml(readFileSync(ruta, "utf8"), pagina)) errores.push(`${archivo}: ${error}`);
  }
  return errores;
}

/**
 * llms.txt and the IndexNow key file must reach dist/ byte for byte (Vercel
 * serves them as text/plain from there; no rewrite may swallow them).
 */
export function comprobarEstaticos(dist, publicDir) {
  const errores = [];
  const claves = readdirSync(publicDir).filter((f) => /^[a-f0-9]{32}\.txt$/.test(f));
  if (claves.length !== 1) errores.push(`expected exactly one IndexNow key file in public/, found ${claves.length}`);
  for (const archivo of ["llms.txt", ...claves]) {
    const ruta = join(dist, archivo);
    if (!existsSync(ruta)) errores.push(`${archivo}: file does not exist`);
    else if (readFileSync(ruta, "utf8") !== readFileSync(join(publicDir, archivo), "utf8")) {
      errores.push(`${archivo}: differs from public/`);
    }
  }
  return errores;
}

const esMain = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if (esMain) {
  const root = join(dirname(fileURLToPath(import.meta.url)), "..");
  const dist = join(root, "dist");
  if (!existsSync(dist)) {
    console.error("verificar-prerender: dist/ does not exist. Run `npm run build` first.");
    process.exit(1);
  }
  const errores = [
    ...comprobarDist(
      dist,
      readFileSync(join(root, "src/lib/seo.ts"), "utf8"),
      readFileSync(join(root, "src/lib/rutas-publicas.ts"), "utf8"),
    ),
    ...comprobarEstaticos(dist, join(root, "public")),
  ];
  if (errores.length > 0) {
    console.error(`verificar-prerender: ${errores.length} problem(s)\n${errores.map((e) => `  - ${e}`).join("\n")}`);
    process.exit(1);
  }
  console.log("verificar-prerender: every route is prerendered with its h1, title, description, canonical and JSON-LD, and llms.txt and the IndexNow key are in dist/");
}
