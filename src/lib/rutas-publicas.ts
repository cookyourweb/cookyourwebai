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

/** Canonical domain: with www, as served by Vercel. */
export const DOMINIO_POR_DEFECTO = "https://www.cookyourwebai.es";

export const DOMINIO_CANONICO: string = import.meta.env["VITE_SITE_URL"] ?? DOMINIO_POR_DEFECTO;

export const RUTAS_PUBLICAS: readonly string[] = [
  "/",
  "/politicadeprivacidad",
  "/cookie-policy",
  "/avisolegal",
];

/** Absolute canonical URL: no trailing slash, except for the home. */
export const urlCanonica = (ruta: string): string => `${DOMINIO_CANONICO}${ruta === "/" ? "/" : ruta}`;
