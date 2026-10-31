import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import App from "@/App";
import { COMPANY } from "@/lib/company";

/**
 * Phase 4: the profiles named in the structured data are also linked from the
 * page, so people and Google see the same identity. Only profiles with
 * content: Instagram waits until it has posts (docs/estado.md section 3).
 */
describe("profiles in the footer", () => {
  it("links the founder's LinkedIn, opening in a new tab safely", () => {
    window.history.pushState({}, "", "/avisolegal");
    render(<App />);

    const footer = screen.getByRole("contentinfo");
    const link = within(footer).getByRole("link", { name: /Verónica Serna Pérez\s*en LinkedIn/ });
    expect(link).toHaveAttribute("href", COMPANY.linkedinFounder);
    expect(link).toHaveAttribute("target", "_blank");
    expect(link.getAttribute("rel")).toMatch(/noopener/);
  });

  it("links the company's LinkedIn page, opening in a new tab safely", () => {
    window.history.pushState({}, "", "/avisolegal");
    render(<App />);

    const footer = screen.getByRole("contentinfo");
    const link = within(footer).getByRole("link", { name: /CookYourWebAI\s*en LinkedIn/ });
    expect(link).toHaveAttribute("href", COMPANY.linkedinCompany);
    expect(link).toHaveAttribute("target", "_blank");
    expect(link.getAttribute("rel")).toMatch(/noopener/);
  });

  it("does not link an Instagram profile yet", () => {
    window.history.pushState({}, "", "/avisolegal");
    render(<App />);

    expect(document.querySelector('a[href*="instagram.com"]')).toBeNull();
  });
});
