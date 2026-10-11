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
