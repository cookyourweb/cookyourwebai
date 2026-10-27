import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, resolve } from "node:path";
import { describe, expect, it } from "vitest";

const SRC = resolve(__dirname, "..");
const ALLOWED = "lib/gtm.ts";

function sourceFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return sourceFiles(path);
    return /\.(tsx?|jsx?)$/.test(name) && !/\.test\./.test(name) ? [path] : [];
  });
}

/**
 * The cookie policy promises that Google Tag Manager only loads after the
 * visitor accepts statistics cookies. src/lib/gtm.ts is the only place
 * allowed to load it. A stale copy of the snippet in the home page loaded it
 * for everyone and sent each visitor's IP address to Google.
 */
describe("Google Tag Manager", () => {
  it("is only referenced from the consent-gated loader", () => {
    const offenders = sourceFiles(SRC)
      .map((path) => relative(SRC, path))
      .filter((path) => path !== ALLOWED)
      .filter((path) => /GTM-[A-Z0-9]+|googletagmanager\.com/.test(readFileSync(join(SRC, path), "utf8")));

    expect(offenders).toEqual([]);
  });
});
