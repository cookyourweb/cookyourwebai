import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const root = resolve(__dirname, "../..");
const read = (path: string) => readFileSync(resolve(root, path), "utf8");

/**
 * Loading fonts from Google Fonts sends every visitor's IP address to Google
 * without consent (LG München I, 3 O 17493/20). The same fonts are bundled
 * and served from our own domain instead.
 */
describe("web fonts", () => {
  it("are not loaded from Google Fonts", () => {
    const html = read("index.html");

    expect(html).not.toMatch(/fonts\.googleapis\.com|fonts\.gstatic\.com/);
  });

  it("are bundled from Fontsource with the weights the site uses", () => {
    const entry = read("src/main.tsx");

    for (const font of [
      "@fontsource/inter/400.css",
      "@fontsource/inter/700.css",
      "@fontsource/playfair-display/700.css",
    ]) {
      expect(entry).toContain(`import "${font}"`);
    }
  });
});
