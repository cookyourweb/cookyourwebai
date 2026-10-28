import { existsSync, readdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const root = resolve(__dirname, "../..");
const read = (path: string) => readFileSync(resolve(root, path), "utf8");

function sourceFiles(dir: string): string[] {
  return readdirSync(resolve(root, dir), { withFileTypes: true }).flatMap((entry) => {
    const path = `${dir}/${entry.name}`;
    if (entry.isDirectory()) return sourceFiles(path);
    return /\.(ts|tsx)$/.test(entry.name) && !/\.test\.tsx?$/.test(entry.name) ? [path] : [];
  });
}

/**
 * Every visible resource is served from our own domain: a third-party CDN
 * receives each visitor's IP address without consent, as Google Fonts did.
 */
describe("self-hosted assets", () => {
  it("no source file loads anything from jsDelivr", () => {
    for (const file of [...sourceFiles("src"), "index.html"]) {
      expect(read(file), file).not.toMatch(/cdn\.jsdelivr\.net/);
    }
  });

  it("every logo the home references exists in public/logos", () => {
    const paths = [...read("src/pages/Index.tsx").matchAll(/"(\/logos\/[^"]+\.svg)"/g)].map((m) => m[1]);

    expect(paths.length).toBeGreaterThanOrEqual(6);
    for (const path of paths) {
      expect(existsSync(resolve(root, "public", `.${path}`)), path).toBe(true);
    }
  });

  it("the logos contain no scripts", () => {
    for (const file of readdirSync(resolve(root, "public/logos"))) {
      expect(read(`public/logos/${file}`), file).not.toMatch(/<script|on\w+=/i);
    }
  });
});
