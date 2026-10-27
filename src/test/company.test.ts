import { readdirSync, readFileSync, statSync } from "node:fs";
import { resolve, relative } from "node:path";
import { describe, expect, it } from "vitest";

import { COMPANY } from "@/lib/company";

const srcDir = resolve(__dirname, "..");

const walk = (dir: string): string[] =>
  readdirSync(dir).flatMap((name) => {
    const full = resolve(dir, name);
    return statSync(full).isDirectory() ? walk(full) : [full];
  });

const isTest = (file: string) => /\.test\.(ts|tsx)$/.test(file);

/**
 * Contact data used to be hardcoded in a dozen files and drifted. Everything
 * reads it from COMPANY now; a raw copy anywhere else is a regression.
 */
describe("company contact data", () => {
  it("exposes the phone in E.164, visible and WhatsApp formats", () => {
    expect(COMPANY.phone).toBe("+34688757782");
    expect(COMPANY.phoneDisplay).toBe("+34 688 75 77 82");
    expect(COMPANY.whatsapp).toBe("34688757782");
    expect(COMPANY.whatsappUrl("hola")).toBe("https://wa.me/34688757782?text=hola");
  });

  it("builds the WhatsApp link from COMPANY.whatsapp, encoding accents and line breaks", () => {
    const message = "Hola! Soy Ana.\n¿Qué tal?";

    expect(COMPANY.whatsappUrl(message)).toBe(`https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(message)}`);
  });

  it("never types the number inside the WhatsApp link, so it cannot drift from the field", () => {
    const source = readFileSync(resolve(srcDir, "lib/company.ts"), "utf8");

    expect(source).not.toMatch(/wa\.me\/\d/);
  });

  it("is the only place in src/ with the raw phone or email", () => {
    const offenders = walk(srcDir)
      .filter((file) => !isTest(file) && !file.endsWith("/lib/company.ts"))
      .filter((file) => /688\s?75\s?77\s?82|veronica@cookyourwebai\.es/.test(readFileSync(file, "utf8")))
      .map((file) => relative(srcDir, file));

    expect(offenders).toEqual([]);
  });
});
