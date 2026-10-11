import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";

import Header from "./Header";

const EMPLEO_TECH = "https://empleo.cookyourwebai.es/es/";

function renderHeader() {
  return render(
    <MemoryRouter initialEntries={["/"]}>
      <Header />
    </MemoryRouter>
  );
}

/**
 * Empleo Tech is a separate site in the ecosystem, not a section of the home
 * page. It must be its own link, last in the list and pointing to the Spanish
 * version, without replacing any of the service anchors.
 */
describe("desktop menu", () => {
  it("ends with Empleo Tech pointing to the job platform", () => {
    renderHeader();

    const nav = screen.getByRole("navigation", { name: /principal/i });
    const links = within(nav).getAllByRole("link");
    const last = links[links.length - 1];

    expect(last).toHaveAccessibleName("Empleo Tech");
    expect(last).toHaveAttribute("href", EMPLEO_TECH);
  });

  it("keeps the services as anchors on the home page", () => {
    renderHeader();

    const nav = screen.getByRole("navigation", { name: /principal/i });

    expect(within(nav).getByRole("link", { name: "Automatización" })).toHaveAttribute(
      "href",
      "#automatizacion-empresarial"
    );
  });
});

/**
 * On mobile the desktop nav is hidden. Before this change nothing replaced it:
 * no link at all was visible on a phone. The mobile menu must offer the same
 * destinations as the desktop one.
 */
describe("mobile menu", () => {
  it("opens from a named button and offers the same links, Empleo Tech included", async () => {
    const user = userEvent.setup();
    renderHeader();

    const desktop = within(screen.getByRole("navigation", { name: /principal/i }))
      .getAllByRole("link")
      .map((link) => link.getAttribute("href"));

    await user.click(screen.getByRole("button", { name: /abrir menú/i }));

    const panel = await screen.findByRole("dialog");
    const mobile = within(panel)
      .getAllByRole("link")
      .map((link) => link.getAttribute("href"));

    expect(mobile).toEqual(desktop);
    expect(within(panel).getByRole("link", { name: "Empleo Tech" })).toHaveAttribute(
      "href",
      EMPLEO_TECH
    );
  });

  it("closes when a link is chosen, so it does not cover the target section", async () => {
    const user = userEvent.setup();
    renderHeader();

    await user.click(screen.getByRole("button", { name: /abrir menú/i }));
    const panel = await screen.findByRole("dialog");

    await user.click(within(panel).getByRole("link", { name: "Paquetes" }));

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });
});
