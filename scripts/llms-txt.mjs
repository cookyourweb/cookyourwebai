/**
 * Builds the text of public/llms.txt (the llms.txt convention: H1 name,
 * blockquote summary, H2 sections of links). Called by
 * scripts/generar-sitemap.mjs, so the file is regenerated with the sitemap and
 * cannot drift from it.
 *
 * It only repeats what the site already shows: the page titles/descriptions of
 * src/lib/seo.ts, the services of src/lib/servicios.ts and the contact data of
 * src/lib/company.ts. Sources are read as text (no TypeScript compiler needed).
 *
 * Rules (docs/estado.md section 3): "IA", not "AI"; no city or address. Only
 * sitemap URLs are linked: each service links to its own page. Prices are left
 * out on purpose. Tested in src/test/llms-txt.test.ts.
 */
import { leerPaginasEsperadas } from "./verificar-prerender.mjs";

/** The site text still says "AI" in places; the owner decided to write "IA". */
const ia = (texto) => texto.replace(/\bAI\b/g, "IA");

function leerServicios(source) {
  const servicios = [
    ...source.matchAll(/path:\s*"([^"]+)",\s*title:\s*"([^"]+)",\s*price:\s*"[^"]*",\s*description:\s*"([^"]+)"/g),
  ].map(([, ruta, titulo, descripcion]) => ({ ruta, titulo, descripcion }));
  if (servicios.length === 0) throw new Error("No servicios read from servicios.ts");
  return servicios;
}

function leerEmpresa(source) {
  const campo = (nombre) => {
    const valor = source.match(new RegExp(`\\b${nombre}:\\s*"([^"]+)"`))?.[1];
    if (!valor) throw new Error(`COMPANY.${nombre} not found in company.ts`);
    return valor;
  };
  return { nombre: campo("name"), email: campo("email"), telefono: campo("phoneDisplay") };
}

/** Link text: the page title without the "| Brand" suffix. */
const nombreDePagina = (titulo) => titulo.split(" | ")[0];

export function generarLlmsTxt({ seoSource, rutasSource, serviciosSource, companySource, rutas }) {
  const dominio = rutasSource.match(/DOMINIO_POR_DEFECTO = "([^"]+)"/)?.[1];
  if (!dominio) throw new Error("DOMINIO_POR_DEFECTO not found in rutas-publicas.ts");

  const paginas = leerPaginasEsperadas(seoSource, rutasSource);
  const home = paginas.find((p) => p.ruta === "/");
  if (!home?.descripcion) throw new Error("The home description was not found in seo.ts");
  const servicios = leerServicios(serviciosSource);
  const empresa = leerEmpresa(companySource);

  const enlace = (ruta) => {
    const pagina = paginas.find((p) => p.ruta === ruta);
    if (!pagina) throw new Error(`Route ${ruta} has no entry in seo.ts`);
    const descripcion = pagina.descripcion ? `: ${ia(pagina.descripcion)}` : "";
    return `- [${ia(nombreDePagina(pagina.titulo))}](${dominio}${ruta})${descripcion}`;
  };
  const esLegal = (ruta) => paginas.find((p) => p.ruta === ruta)?.jsonLd === "breadcrumb";

  const esServicio = (ruta) => servicios.some((s) => s.ruta === ruta);

  const secciones = [
    ["Web", rutas.filter((r) => r === "/").map(enlace)],
    ["Servicios", servicios.map((s) => {
        const nombre = rutas.includes(s.ruta) ? `[${ia(s.titulo)}](${dominio}${s.ruta})` : ia(s.titulo);
        return `- ${nombre}: ${ia(s.descripcion)}`;
      })],
    ["Información legal", rutas.filter((r) => r !== "/" && esLegal(r)).map(enlace)],
    ["Otras páginas", rutas.filter((r) => r !== "/" && !esLegal(r) && !esServicio(r)).map(enlace)],
    ["Contacto", [`- Correo: ${empresa.email}`, `- Teléfono y WhatsApp: ${empresa.telefono}`]],
  ].filter(([, lineas]) => lineas.length > 0);

  return [
    `# ${empresa.nombre}`,
    "",
    `> ${ia(home.descripcion)}`,
    "",
    ...secciones.flatMap(([titulo, lineas]) => [`## ${titulo}`, "", ...lineas, ""]),
  ]
    .join("\n")
    .replace(/\n+$/, "\n");
}
