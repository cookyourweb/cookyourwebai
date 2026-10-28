import { existsSync, renameSync, rmSync } from "node:fs";
import { join } from "node:path";

/**
 * vite-react-ssg renders the "/404" route to <dist>/404/index.html. Vercel
 * serves <dist>/404.html, with a real 404 status, for every URL that matches
 * nothing, so the page is moved there. Throws if it was not generated: a build
 * without it would silently go back to soft 404s.
 */
export function moverPagina404(dist) {
  const origen = join(dist, "404", "index.html");
  if (!existsSync(origen)) {
    throw new Error(`prerender: ${origen} does not exist, so no 404.html can be produced`);
  }
  renameSync(origen, join(dist, "404.html"));
  rmSync(join(dist, "404"), { recursive: true, force: true });
}
