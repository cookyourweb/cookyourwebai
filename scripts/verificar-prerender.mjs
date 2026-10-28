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
import { existsSync, readFileSync } from "node:fs";
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

  const entrada =
    /path:\s*"([^"]+)",\s*title:\s*"([^"]+)"(?:,\s*description:\s*"([^"]+)")?(?:,\s*robots:\s*"([^"]+)")?,?\s*\}/g;
  const paginas = [...bloque.matchAll(entrada)].map(([, ruta, titulo, descripcion, robots]) => ({
    ruta,
    titulo,
    descripcion,
    robots,
    canonical: robots ? undefined : `${dominio}${ruta}`,
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

  const h1 = (html.match(/<h1[\s>]/gi) ?? []).length;
  if (h1 !== 1) errores.push(`expected exactly one <h1>, found ${h1}`);

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

  const robots = metas.filter((m) => m.name === "robots").map((m) => m.content);
  const canonicals = etiquetas(html, "link")
    .filter((l) => l.rel === "canonical")
    .map((l) => l.href);

  if (pagina.robots) {
    if (robots.length !== 1 || robots[0] !== pagina.robots) {
      errores.push(`expected exactly one meta robots "${pagina.robots}", found ${JSON.stringify(robots)}`);
    }
    if (canonicals.length > 0) errores.push(`a noindex page must not have a canonical, found ${JSON.stringify(canonicals)}`);
  } else {
    if (robots.length > 0) errores.push(`an indexable page must not have meta robots, found ${JSON.stringify(robots)}`);
    if (canonicals.length !== 1 || canonicals[0] !== pagina.canonical) {
      errores.push(`expected exactly one canonical "${pagina.canonical}", found ${JSON.stringify(canonicals)}`);
    }
    const bloques = [...html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
    if (bloques.length === 0) {
      errores.push("expected JSON-LD (<script type=\"application/ld+json\">), found none");
    }
    for (const [, contenido] of bloques) {
      try {
        JSON.parse(contenido);
      } catch {
        errores.push("JSON-LD is not valid JSON");
      }
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

const esMain = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if (esMain) {
  const root = join(dirname(fileURLToPath(import.meta.url)), "..");
  const dist = join(root, "dist");
  if (!existsSync(dist)) {
    console.error("verificar-prerender: dist/ does not exist. Run `npm run build` first.");
    process.exit(1);
  }
  const errores = comprobarDist(
    dist,
    readFileSync(join(root, "src/lib/seo.ts"), "utf8"),
    readFileSync(join(root, "src/lib/rutas-publicas.ts"), "utf8"),
  );
  if (errores.length > 0) {
    console.error(`verificar-prerender: ${errores.length} problem(s)\n${errores.map((e) => `  - ${e}`).join("\n")}`);
    process.exit(1);
  }
  console.log("verificar-prerender: every route is prerendered with its h1, title, description, canonical and JSON-LD");
}
