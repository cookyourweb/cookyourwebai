import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

import { OG_IMAGE } from "@/lib/seo";

const root = resolve(__dirname, "../..");

describe("social image", () => {
  it("is a real 1200x630 PNG in public/", () => {
    const png = readFileSync(resolve(root, "public/og-cookyourwebai.png"));

    // PNG signature, then the IHDR chunk with width and height.
    expect(png.subarray(0, 8).toString("hex")).toBe("89504e470d0a1a0a");
    expect(png.subarray(12, 16).toString()).toBe("IHDR");
    expect(png.readUInt32BE(16)).toBe(1200);
    expect(png.readUInt32BE(20)).toBe(630);
  });

  it("is what the Seo component points og:image and twitter:image to", () => {
    const seo = readFileSync(resolve(root, "src/components/Seo.tsx"), "utf8");

    expect(OG_IMAGE.url).toBe("https://www.cookyourwebai.es/og-cookyourwebai.png");
    expect(OG_IMAGE.width).toBe(1200);
    expect(OG_IMAGE.height).toBe(630);
    expect(seo).toContain('property="og:image" content={OG_IMAGE.url}');
    expect(seo).toContain('name="twitter:image" content={OG_IMAGE.url}');
  });

  it("has its editable SVG source in docs/brand", () => {
    expect(readFileSync(resolve(root, "docs/brand/og-cookyourwebai.svg"), "utf8")).toContain("CookYourWebAI");
  });
});
