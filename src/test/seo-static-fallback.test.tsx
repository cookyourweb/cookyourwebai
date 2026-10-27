import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { render, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import App from "@/App";
import { OG_IMAGE, PAGES, SITE, canonical } from "@/lib/seo";

const html = readFileSync(resolve(__dirname, "../../index.html"), "utf8");
const staticHead = new DOMParser().parseFromString(html, "text/html").head;

const attr = (root: ParentNode, selector: string, name: string) =>
  root.querySelector(selector)?.getAttribute(name) ?? null;

const home = PAGES.home;
const homeUrl = canonical(home.path);

/**
 * Link-preview bots (WhatsApp, LinkedIn, Facebook, Slack, X) do not run JS, so
 * index.html must carry the home tags itself until prerendering lands. Each one
 * is marked data-rh so react-helmet-async replaces it instead of duplicating it.
 */
describe("index.html static fallback", () => {
  it("carries the home values of seo.ts, so they cannot drift", () => {
    expect(attr(staticHead, 'meta[name="description"]', "content")).toBe(home.description);
    expect(attr(staticHead, 'link[rel="canonical"]', "href")).toBe(homeUrl);
    expect(attr(staticHead, 'meta[property="og:type"]', "content")).toBe("website");
    expect(attr(staticHead, 'meta[property="og:site_name"]', "content")).toBe(SITE.name);
    expect(attr(staticHead, 'meta[property="og:locale"]', "content")).toBe(SITE.locale);
    expect(attr(staticHead, 'meta[property="og:title"]', "content")).toBe(home.title);
    expect(attr(staticHead, 'meta[property="og:description"]', "content")).toBe(home.description);
    expect(attr(staticHead, 'meta[property="og:url"]', "content")).toBe(homeUrl);
    expect(attr(staticHead, 'meta[property="og:image"]', "content")).toBe(OG_IMAGE.url);
    expect(attr(staticHead, 'meta[property="og:image:width"]', "content")).toBe(String(OG_IMAGE.width));
    expect(attr(staticHead, 'meta[property="og:image:height"]', "content")).toBe(String(OG_IMAGE.height));
    expect(attr(staticHead, 'meta[property="og:image:alt"]', "content")).toBe(OG_IMAGE.alt);
    expect(attr(staticHead, 'meta[name="twitter:card"]', "content")).toBe("summary_large_image");
    expect(attr(staticHead, 'meta[name="twitter:image"]', "content")).toBe(OG_IMAGE.url);
    expect(attr(staticHead, 'meta[name="twitter:image:alt"]', "content")).toBe(OG_IMAGE.alt);
    expect(staticHead.querySelector("title")?.textContent).toBe(home.title);
  });

  it("marks every SEO tag data-rh so Helmet can replace it", () => {
    const seoTags = staticHead.querySelectorAll(
      'meta[name="description"], link[rel="canonical"], meta[property^="og:"], meta[name^="twitter:"]',
    );
    expect(seoTags.length).toBeGreaterThan(0);
    for (const tag of seoTags) expect(tag.getAttribute("data-rh"), tag.outerHTML).toBe("true");
  });
});

describe("head after hydration", () => {
  beforeEach(() => {
    document.head.querySelectorAll("[data-rh]").forEach((el) => el.remove());
    // jsdom does not load index.html: inject its static tags to simulate the real page.
    staticHead
      .querySelectorAll("[data-rh]")
      .forEach((el) => document.head.appendChild(document.importNode(el, true)));
    expect(document.head.querySelectorAll("[data-rh]").length, "static tags injected").toBeGreaterThan(0);
  });

  afterEach(() => {
    document.head.querySelectorAll("[data-rh]").forEach((el) => el.remove());
  });

  const count = (selector: string) => document.head.querySelectorAll(selector).length;
  const expectSingle = (selector: string) => expect(count(selector), selector).toBe(1);

  const open = (path: string) => {
    window.history.pushState({}, "", path);
    return render(<App />);
  };

  it.each([
    ["a non-home route", PAGES.privacy],
    ["the home", PAGES.home],
  ])("has exactly one of each SEO tag on %s, with its own values", async (_name, page) => {
    open(page.path);

    await waitFor(() => expect(document.title).toBe(page.title));
    for (const selector of [
      'meta[name="description"]',
      'link[rel="canonical"]',
      'meta[property="og:title"]',
      'meta[property="og:url"]',
      'meta[property="og:image"]',
      'meta[name="twitter:card"]',
    ]) {
      expectSingle(selector);
    }
    expect(attr(document.head, 'meta[name="description"]', "content")).toBe(page.description);
    expect(attr(document.head, 'link[rel="canonical"]', "href")).toBe(canonical(page.path));
    expect(attr(document.head, 'meta[property="og:title"]', "content")).toBe(page.title);
    expect(attr(document.head, 'meta[property="og:url"]', "content")).toBe(canonical(page.path));
  });

  it("drops the static canonical and og:url on a noindex page", async () => {
    open(PAGES.unsubscribe.path);

    await waitFor(() => expect(document.title).toBe(PAGES.unsubscribe.title));
    expect(count('link[rel="canonical"]')).toBe(0);
    expect(count('meta[property="og:url"]')).toBe(0);
    expect(count('meta[name="description"]')).toBe(1);
  });
});
