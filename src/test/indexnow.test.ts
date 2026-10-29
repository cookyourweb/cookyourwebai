// @vitest-environment node
import { readdirSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { describe, expect, it } from "vitest";

import { DOMINIO_POR_DEFECTO, RUTAS_PUBLICAS } from "@/lib/rutas-publicas";
import { cuerpoIndexNow, HOST } from "../../scripts/indexnow.mjs";

/**
 * IndexNow: tells Bing and others that the pages changed. The key is public by
 * design (the protocol requires publishing it at /<key>.txt to prove the domain
 * is ours). The script is run BY HAND after a deploy, never in the build or CI.
 */
const root = resolve(__dirname, "../..");
const publicDir = join(root, "public");
const keyFiles = readdirSync(publicDir).filter((f) => /^[a-f0-9]{32}\.txt$/.test(f));

describe("IndexNow key file", () => {
  it("there is exactly one key file and it contains exactly the key", () => {
    expect(keyFiles).toHaveLength(1);
    const key = keyFiles[0]!.replace(".txt", "");
    expect(readFileSync(join(publicDir, keyFiles[0]!), "utf8")).toBe(key);
  });
});

describe("IndexNow request body", () => {
  const key = keyFiles[0]?.replace(".txt", "") ?? "";
  const sitemap = readFileSync(join(publicDir, "sitemap.xml"), "utf8");
  const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

  it("uses the canonical host", () => {
    expect(HOST).toBe(new URL(DOMINIO_POR_DEFECTO).host);
  });

  it("sends every sitemap URL, only those, with the key and where it lives", () => {
    expect(cuerpoIndexNow(sitemap, key)).toEqual({
      host: HOST,
      key,
      keyLocation: `${DOMINIO_POR_DEFECTO}/${key}.txt`,
      urlList: locs,
    });
    expect(locs).toHaveLength(RUTAS_PUBLICAS.length);
  });
});

describe("IndexNow wiring", () => {
  const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));

  it("has a manual npm script, and the build and the CI never run it", () => {
    expect(pkg.scripts.indexnow).toBe("node scripts/indexnow.mjs");
    expect(pkg.scripts.build).not.toMatch(/indexnow/);
    const ci = readFileSync(join(root, ".github/workflows/tests.yml"), "utf8");
    expect(ci).not.toMatch(/indexnow/);
  });
});

describe("static file serving on Vercel", () => {
  it("has no rewrites that could swallow /llms.txt or /<key>.txt", () => {
    const vercel = JSON.parse(readFileSync(join(root, "vercel.json"), "utf8"));
    expect(vercel.rewrites).toBeUndefined();
  });
});
