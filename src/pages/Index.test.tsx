import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import App from "@/App";

const EMPLEO_TECH = "https://empleo.cookyourwebai.es/es/";

/**
 * The home page does not use components/Header: it has its own header inside
 * Index.tsx. Empleo Tech must be there, on desktop and on mobile.
 */
describe("home menu", () => {
  it("ends with Empleo Tech on desktop, pointing to the job platform", () => {
    window.history.pushState({}, "", "/");
    render(<App />);

    const nav = screen.getByRole("navigation", { name: /principal/i });
    const links = within(nav).getAllByRole("link");
    const last = links[links.length - 1];

    expect(last).toHaveAccessibleName("Empleo Tech");
    expect(last).toHaveAttribute("href", EMPLEO_TECH);
  });

  it("also offers Empleo Tech in the mobile dropdown", async () => {
    const user = userEvent.setup();
    window.history.pushState({}, "", "/");
    render(<App />);

    await user.click(screen.getByRole("button", { name: /abrir menú de navegación/i }));

    const menu = document.getElementById("mobile-menu-home");
    expect(menu).not.toBeNull();
    expect(within(menu!).getByRole("link", { name: "Empleo Tech" })).toHaveAttribute(
      "href",
      EMPLEO_TECH
    );
  });
});

/**
 * The home modals used to load Tally iframes. They now open our own forms,
 * which store the lead in Notion through n8n.
 */
describe("home lead capture modals", () => {
  it("the free audit opens the business form, without Tally", async () => {
    const user = userEvent.setup();
    window.history.pushState({}, "", "/");
    render(<App />);

    await user.click(screen.getByRole("button", { name: /auditoría ai gratuita/i }));

    const modal = await screen.findByRole("dialog");
    expect(within(modal).getByLabelText(/nombre de tu empresa/i)).toBeInTheDocument();
    expect(document.querySelector('iframe[src*="tally.so"]')).toBeNull();
  });

  it("the waiting list opens the developer form, without Tally", async () => {
    const user = userEvent.setup();
    window.history.pushState({}, "", "/");
    render(<App />);

    await user.click(screen.getByRole("button", { name: /únete a la lista de espera/i }));

    const modal = await screen.findByRole("dialog");
    expect(within(modal).getByLabelText(/track de interés/i)).toBeInTheDocument();
    expect(document.querySelector('iframe[src*="tally.so"]')).toBeNull();
  });
});
