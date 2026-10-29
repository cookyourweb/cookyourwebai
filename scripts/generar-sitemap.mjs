/**
 * Generates public/sitemap.xml, public/robots.txt and public/llms.txt from
 * src/lib/rutas-publicas.ts (llms.txt also reads seo.ts, servicios.ts and company.ts).
 *
 * Run by hand with `npm run sitemap` and automatically before `vite build`,
 * so a site cannot ship with a stale map. The routes file is read as text:
 * the script needs neither a TypeScript compiler nor the rest of the app.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { generarLlmsTxt } from "./llms-txt.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const source = readFileSync(join(root, "src/lib/rutas-publicas.ts"), "utf8");

const domain = source.match(/DOMINIO_POR_DEFECTO = "([^"]+)"/)?.[1];
if (!domain) throw new Error("DOMINIO_POR_DEFECTO not found in rutas-publicas.ts");

const block = source.match(/RUTAS_PUBLICAS: readonly string\[\] = \[([^\]]*)\]/)?.[1];
const routes = [...(block ?? "").matchAll(/"([^"]+)"/g)].map((m) => m[1]);
if (routes.length === 0) throw new Error("No routes read from rutas-publicas.ts");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map((route) => `  <url><loc>${domain}${route}</loc></url>`).join("\n")}
</urlset>
`;

// One group on purpose: a bot with its own group ignores the "*" one.
// No Disallow: Google must crawl noindex pages (/baja, /agenteActivado) to see their noindex.
const robots = `User-agent: *
Allow: /

Sitemap: ${domain}/sitemap.xml
`;

writeFileSync(join(root, "public/sitemap.xml"), sitemap);
writeFileSync(join(root, "public/robots.txt"), robots);

const llms = generarLlmsTxt({
  seoSource: readFileSync(join(root, "src/lib/seo.ts"), "utf8"),
  rutasSource: source,
  serviciosSource: readFileSync(join(root, "src/lib/servicios.ts"), "utf8"),
  companySource: readFileSync(join(root, "src/lib/company.ts"), "utf8"),
  rutas: routes,
});
writeFileSync(join(root, "public/llms.txt"), llms);
console.log(`sitemap.xml, robots.txt and llms.txt generated: ${routes.length} routes on ${domain}`);
