export interface PaginaEsperada {
  ruta: string;
  titulo: string;
  descripcion: string | undefined;
  robots: string | undefined;
  canonical: string | undefined;
}
export function archivoDeRuta(ruta: string): string;
export function leerPaginasEsperadas(seoSource: string, rutasSource: string): PaginaEsperada[];
export function comprobarHtml(html: string, pagina: PaginaEsperada): string[];
export function comprobarDist(dist: string, seoSource: string, rutasSource: string): string[];
