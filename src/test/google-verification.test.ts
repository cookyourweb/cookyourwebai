import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const FILE = "google7d656d4d04069df9.html";

/**
 * Google Search Console verifies the domain by fetching this exact file.
 * Empleo Tech needs the verified domain to connect each user's Google Drive.
 * It must be served as is: no edits, no renaming.
 */
describe("Google Search Console verification file", () => {
  it("is shipped in public/ with Google's exact content", () => {
    const content = readFileSync(resolve(__dirname, "../../public", FILE), "utf8");

    expect(content).toBe(`google-site-verification: ${FILE}`);
  });
});
