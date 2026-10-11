import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const root = resolve(__dirname, "../..");
const read = (path: string) => readFileSync(resolve(root, path));

/**
 * Without a declared icon the site showed the browser's generic icon, and
 * /favicon.ico fell through the SPA rewrite and returned the HTML page.
 * The brand icon is the "c" of the logo plus the violet "AI" dot.
 */
describe("favicon", () => {
  it("is declared in index.html, with an Apple touch icon", () => {
    const html = read("index.html").toString();

    expect(html).toMatch(/<link rel="icon" href="\/favicon\.ico" sizes="any"\s*\/?>/);
    expect(html).toMatch(/<link rel="apple-touch-icon" href="\/apple-touch-icon\.png"\s*\/?>/);
  });

  it("ships a real .ico with the 16, 32 and 48 px sizes", () => {
    const ico = read("public/favicon.ico");

    // ICONDIR header: reserved 0, type 1 (icon), then the image count.
    expect(ico.readUInt16LE(0)).toBe(0);
    expect(ico.readUInt16LE(2)).toBe(1);
    const count = ico.readUInt16LE(4);
    const widths = Array.from({ length: count }, (_, i) => ico.readUInt8(6 + i * 16) || 256);
    expect(widths.sort((a, b) => a - b)).toEqual([16, 32, 48]);
  });

  it("ships a 180 x 180 PNG for the iOS home screen", () => {
    const png = read("public/apple-touch-icon.png");

    expect(png.subarray(1, 4).toString()).toBe("PNG");
    expect(png.readUInt32BE(16)).toBe(180);
    expect(png.readUInt32BE(20)).toBe(180);
  });
});
