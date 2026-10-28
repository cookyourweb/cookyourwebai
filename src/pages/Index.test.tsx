import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";

import App from "@/App";

const EMPLEO_TECH = "https://empleo.cookyourwebai.es/es/";

/**
 * The home shares the single site header (mounted by Layout). Empleo Tech must
 * be there, on desktop and on mobile.
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

  it("also offers Empleo Tech in the mobile menu", async () => {
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

/**
 * The page is prerendered, so the server HTML cannot know the visitor's choice
 * (it lives in localStorage). The banner is therefore decided after mount:
 * a returning visitor who already answered must not see it, and a new one must.
 */
describe("home cookie banner", () => {
  afterEach(() => localStorage.clear());

  it("shows the banner to a visitor who has not answered yet", async () => {
    localStorage.clear();
    window.history.pushState({}, "", "/");
    render(<App />);

    expect(await screen.findByRole("button", { name: /aceptar/i })).toBeInTheDocument();
  });

  it("does not show it to a visitor who already accepted", async () => {
    localStorage.setItem("cookieConsent", "true");
    window.history.pushState({}, "", "/");
    render(<App />);

    await screen.findByRole("navigation", { name: /principal/i });
    expect(screen.queryByText(/usamos cookies para mejorar/i)).toBeNull();
  });

  it("rejecting from the first layer stores no statistics consent", async () => {
    const user = userEvent.setup();
    localStorage.clear();
    window.history.pushState({}, "", "/");
    render(<App />);

    await user.click(await screen.findByRole("button", { name: "Denegar" }));

    expect(localStorage.getItem("statisticsCookies")).toBe("false");
    expect(screen.queryByText(/usamos cookies para mejorar/i)).toBeNull();
  });

  it("saving preferences with statistics unchecked stores no statistics consent", async () => {
    const user = userEvent.setup();
    localStorage.clear();
    window.history.pushState({}, "", "/");
    render(<App />);

    await user.click(await screen.findByRole("button", { name: "Ver preferencias" }));
    const modal = await screen.findByRole("dialog");
    expect(within(modal).getByRole("checkbox", { name: /estadísticas/i })).not.toBeChecked();
    await user.click(within(modal).getByRole("button", { name: "Guardar preferencias" }));

    expect(localStorage.getItem("statisticsCookies")).toBe("false");
  });

  it("rejecting all after ticking statistics stores no statistics consent", async () => {
    const user = userEvent.setup();
    localStorage.clear();
    window.history.pushState({}, "", "/");
    render(<App />);

    await user.click(await screen.findByRole("button", { name: "Ver preferencias" }));
    const modal = await screen.findByRole("dialog");
    await user.click(within(modal).getByRole("checkbox", { name: /estadísticas/i }));
    await user.click(within(modal).getByRole("button", { name: "Rechazar todas" }));

    expect(localStorage.getItem("statisticsCookies")).toBe("false");
  });
});

/**
 * Nothing on the home may open a modal without a user action: on mobile an
 * auto-opening dialog traps focus and Google treats it as an intrusive
 * interstitial. The WhatsApp contact dialog opens only from the header button.
 */
describe("home WhatsApp contact", () => {
  afterEach(() => vi.useRealTimers());

  it("never opens a dialog on its own", async () => {
    vi.useFakeTimers();
    localStorage.setItem("cookieConsent", "true");
    window.history.pushState({}, "", "/");
    render(<App />);

    await act(async () => {
      await vi.advanceTimersByTimeAsync(60_000);
    });

    expect(screen.queryByRole("dialog")).toBeNull();
    localStorage.clear();
  });

  it("has a close button with an accessible name", async () => {
    const user = userEvent.setup();
    window.history.pushState({}, "", "/");
    render(<App />);

    const nav = screen.getByRole("navigation", { name: /principal/i }).closest("header") ?? document.body;
    await user.click(within(nav as HTMLElement).getAllByTitle("Contactar por WhatsApp")[0]);

    const dialog = await screen.findByRole("dialog");
    expect(within(dialog).getByRole("button", { name: "Cerrar" })).toBeInTheDocument();
  });
});
