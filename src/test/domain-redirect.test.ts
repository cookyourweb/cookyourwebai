import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

type Redirect = {
  source: string;
  destination: string;
  permanent: boolean;
  has?: { type: string; value: string }[];
};

const vercel = JSON.parse(readFileSync(resolve(__dirname, "../../vercel.json"), "utf8")) as {
  redirects?: Redirect[];
};

const oldDomainRedirect = vercel.redirects?.find((r) =>
  r.has?.some((h) => h.type === "host" && new RegExp(`^${h.value}$`).test("cookyourweb.es"))
);
const hostPattern = () =>
  new RegExp(`^${oldDomainRedirect!.has!.find((h) => h.type === "host")!.value}$`);

/**
 * cookyourweb.es is the old domain and still served the same site with a 200,
 * so search engines saw two copies competing. It must redirect permanently to
 * the main domain, keeping the path, without ever matching the main domain
 * (that would create a redirect loop).
 */
describe("old domain redirect", () => {
  it("sends cookyourweb.es to www.cookyourwebai.es permanently, keeping the path", () => {
    expect(oldDomainRedirect).toBeDefined();
    expect(oldDomainRedirect!.permanent).toBe(true);
    expect(oldDomainRedirect!.source).toBe("/:path*");
    expect(oldDomainRedirect!.destination).toBe("https://www.cookyourwebai.es/:path*");
  });

  it("covers the old domain with and without www, and never the main domain", () => {
    const pattern = hostPattern();

    expect(pattern.test("cookyourweb.es")).toBe(true);
    expect(pattern.test("www.cookyourweb.es")).toBe(true);
    expect(pattern.test("cookyourwebai.es")).toBe(false);
    expect(pattern.test("www.cookyourwebai.es")).toBe(false);
  });
});
