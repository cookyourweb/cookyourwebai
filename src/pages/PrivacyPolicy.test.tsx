import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import App from "@/App";

function renderPolicy() {
  window.history.pushState({}, "", "/politicadeprivacidad");
  return render(<App />);
}

/**
 * The privacy policy must describe what the site really does with personal
 * data. Leads no longer go through Tally, Make or Airtable: they are stored
 * in Notion via n8n, emailed through Brevo and booked on Google Calendar.
 */
describe("privacy policy", () => {
  it("no longer names providers we stopped using", () => {
    const { container } = renderPolicy();
    const text = container.textContent ?? "";

    expect(text).not.toMatch(/tally/i);
    expect(text).not.toMatch(/\bmake\b/i);
    expect(text).not.toMatch(/airtable/i);
    expect(text).not.toMatch(/usecookyourwebai/i);
  });

  it("names every provider that processes lead data", () => {
    const { container } = renderPolicy();
    const text = container.textContent ?? "";

    for (const provider of ["Notion", "n8n", "Render", "Brevo", "Google Calendar", "WhatsApp"]) {
      expect(text).toContain(provider);
    }
  });

  it("explains transfers outside the European Economic Area", () => {
    renderPolicy();

    expect(
      screen.getByRole("heading", { name: /transferencias internacionales/i })
    ).toBeInTheDocument();
  });
});

/**
 * Article 13 GDPR lists what must be disclosed when collecting data. These
 * items were missing or inaccurate, as flagged by the GDPR review of PR #3.
 */
describe("privacy policy: article 13 GDPR disclosures", () => {
  it("separates pre-contractual steps from consent and legitimate interest", () => {
    const { container } = renderPolicy();

    expect(container.textContent).toMatch(/medidas precontractuales/i);
    expect(container.textContent).toMatch(/art\. 6\.1\.b/i);
  });

  it("explains how to withdraw consent", () => {
    const { container } = renderPolicy();

    expect(container.textContent).toMatch(/retirar tu consentimiento en cualquier momento/i);
  });

  it("states the right to lodge a complaint with the Spanish DPA", () => {
    renderPolicy();

    expect(screen.getByRole("link", { name: /www\.aepd\.es/i })).toHaveAttribute(
      "href",
      "https://www.aepd.es"
    );
  });

  it("uses the one-month response period from article 12.3", () => {
    const { container } = renderPolicy();
    const text = container.textContent ?? "";

    expect(text).toMatch(/un mes/i);
    expect(text).not.toMatch(/30 días naturales/i);
  });

  it("says which fields are optional and that there is no automated decision-making", () => {
    const { container } = renderPolicy();
    const text = container.textContent ?? "";

    expect(text).toMatch(/el teléfono es un campo opcional/i);
    expect(text).toMatch(/no tomamos decisiones automatizadas/i);
  });

  it("bases US transfers on the EU-US Data Privacy Framework", () => {
    const { container } = renderPolicy();

    expect(container.textContent).toMatch(/Data Privacy Framework/);
    expect(container.textContent).toMatch(/art\. 45 RGPD/);
  });
});

/**
 * Wording confirmed by the legal advisor on 11 Oct 2026.
 */
describe("privacy policy: legal advisor's wording", () => {
  it("names each processor by its legal entity", () => {
    const { container } = renderPolicy();
    const text = container.textContent ?? "";

    for (const entity of [
      "Notion Labs, Inc.",
      "Render Services, Inc.",
      "Sendinblue SAS",
      "Google LLC",
      "Meta Platforms, Inc.",
    ]) {
      expect(text).toContain(entity);
    }
  });

  it("keeps non-client contacts for at most 12 months", () => {
    const { container } = renderPolicy();

    expect(container.textContent).toMatch(/12 meses desde la última interacción/i);
  });

  it("does not mention asterisks, which the forms do not show", () => {
    const { container } = renderPolicy();

    expect(container.textContent).not.toMatch(/asterisco/i);
  });
});

