// @vitest-environment node
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { moverPagina404 } from "../../scripts/prerender-404.mjs";

/**
 * vite-react-ssg writes the "/404" route as dist/404/index.html (nested dir
 * style, so that /politicadeprivacidad serves politicadeprivacidad/index.html).
 * Vercel only answers unmatched URLs with a real 404 status when the file is
 * dist/404.html, so the build moves it there.
 */
describe("moverPagina404", () => {
  let dist: string;

  beforeEach(() => {
    dist = mkdtempSync(join(tmpdir(), "dist-"));
  });
  afterEach(() => rmSync(dist, { recursive: true, force: true }));

  it("moves 404/index.html to 404.html and removes the empty folder", () => {
    mkdirSync(join(dist, "404"));
    writeFileSync(join(dist, "404", "index.html"), "<h1>no</h1>");

    moverPagina404(dist);

    expect(readFileSync(join(dist, "404.html"), "utf8")).toBe("<h1>no</h1>");
    expect(existsSync(join(dist, "404"))).toBe(false);
  });

  it("fails loudly when the 404 page was not generated", () => {
    expect(() => moverPagina404(dist)).toThrow(/404/);
  });
});
