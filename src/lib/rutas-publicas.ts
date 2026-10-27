/**
 * The public, indexable routes of the site, in one place.
 *
 * The page titles (seo.ts), the canonical URLs and the generated sitemap.xml /
 * robots.txt (scripts/generar-sitemap.mjs) all read from here, so they cannot
 * drift apart. The generator reads this file as text: keep DOMINIO_POR_DEFECTO
 * and RUTAS_PUBLICAS as plain literals.
 *
 * Left out on purpose: /baja and /agenteActivado (noindex), the 404 and
 * in-page anchors.
 */

/**
 * Canonical domain: with www, as served by Vercel. THE single source: COMPANY.url,
 * SITE.url and the legal texts derive from it. No env override on purpose, it
 * would make canonicals and the generated sitemap diverge.
 */
export const DOMINIO_POR_DEFECTO = "https://www.cookyourwebai.es";

export const RUTAS_PUBLICAS: readonly string[] = [
  "/",
  "/politicadeprivacidad",
  "/cookie-policy",
  "/avisolegal",
];

/** Absolute canonical URL. Routes carry no trailing slash; the home is "/". */
export const urlCanonica = (ruta: string): string => `${DOMINIO_POR_DEFECTO}${ruta}`;
