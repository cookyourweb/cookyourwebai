import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";

import App from "@/App";

const EMPLEO_TECH = "https://empleo.cookyourwebai.es/es/";
const PAGES = ["/", "/avisolegal", "/politicadeprivacidad", "/cookie-policy", "/baja", "/agenteActivado", "/no-existe"];

function visit(path: string) {
  localStorage.setItem("cookieConsent", "true");
  window.history.pushState({}, "", path);
  return render(<App />);
}

afterEach(() => localStorage.clear());

/** One header for the whole site: same landmark, nav, logo and controls everywhere. */
describe.each(PAGES)("single header on %s", (path) => {
  it("renders exactly one banner with the main nav and a logo linking to the home", async () => {
    visit(path);

    const banners = await screen.findAllByRole("banner");
    expect(banners).toHaveLength(1);
    const header = banners[0];

    const logo = within(header).getByRole("link", { name: /cookyourwebai/i });
    expect(logo).toHaveAttribute("href", "/");

    const nav = within(header).getByRole("navigation", { name: /principal/i });
    const links = within(nav).getAllByRole("link");
    expect(links[links.length - 1]).toHaveAttribute("href", EMPLEO_TECH);
    expect(within(nav).getByRole("link", { name: "Desarrolladores" })).toBeInTheDocument();
    expect(within(nav).getByRole("link", { name: "Paquetes" })).toBeInTheDocument();
  });

  it("has the WhatsApp contact button and the menu toggle with accessible names", async () => {
    visit(path);
    const header = (await screen.findAllByRole("banner"))[0];

    expect(within(header).getByRole("button", { name: /contactar por whatsapp/i })).toBeInTheDocument();
    const toggle = within(header).getByRole("button", { name: /abrir menú de navegación/i });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
  });

  it("keeps the skip link target", async () => {
    visit(path);
    await screen.findAllByRole("banner");
    expect(document.querySelectorAll("main#main-content")).toHaveLength(1);
  });
});

describe("section links", () => {
  it("are in-page anchors on the home", async () => {
    visit("/");
    const nav = within((await screen.findAllByRole("banner"))[0]).getByRole("navigation", { name: /principal/i });

    expect(within(nav).getByRole("link", { name: "Paquetes" })).toHaveAttribute("href", "#paquetes");
  });

  it("point to the home sections on any other page", async () => {
    visit("/avisolegal");
    const nav = within((await screen.findAllByRole("banner"))[0]).getByRole("navigation", { name: /principal/i });

    expect(within(nav).getByRole("link", { name: "Paquetes" })).toHaveAttribute("href", "/#paquetes");
    expect(within(nav).getByRole("link", { name: "Desarrolladores" })).toHaveAttribute("href", "/#desarrolladores");
  });
});

describe("mobile menu", () => {
  it.each(["/", "/avisolegal"])("toggles aria-expanded and lists the same links on %s", async (path) => {
    const user = userEvent.setup();
    visit(path);
    const header = (await screen.findAllByRole("banner"))[0];
    const desktop = within(within(header).getByRole("navigation", { name: /principal/i }))
      .getAllByRole("link")
      .map((l) => l.getAttribute("href"));

    const toggle = within(header).getByRole("button", { name: /abrir menú de navegación/i });
    await user.click(toggle);

    expect(toggle).toHaveAttribute("aria-expanded", "true");
    const menu = document.getElementById("mobile-menu-home");
    expect(menu).not.toBeNull();
    const mobile = within(menu!).getAllByRole("link").map((l) => l.getAttribute("href"));
    expect(mobile).toEqual(desktop);

    await user.keyboard("{Escape}");
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(document.getElementById("mobile-menu-home")).toBeNull();
  });

  it("closes when a link is chosen", async () => {
    const user = userEvent.setup();
    visit("/avisolegal");
    const header = (await screen.findAllByRole("banner"))[0];
    await user.click(within(header).getByRole("button", { name: /abrir menú de navegación/i }));

    await user.click(within(document.getElementById("mobile-menu-home")!).getByRole("link", { name: "Paquetes" }));

    expect(document.getElementById("mobile-menu-home")).toBeNull();
  });
});

/** The unified header keeps the lead capture with privacy consent (ContactDialog). */
describe("WhatsApp contact", () => {
  it.each(["/", "/avisolegal"])("opens the consent form on %s", async (path) => {
    const user = userEvent.setup();
    visit(path);
    const header = (await screen.findAllByRole("banner"))[0];

    await user.click(within(header).getByRole("button", { name: /contactar por whatsapp/i }));

    const dialog = await screen.findByRole("dialog");
    expect(within(dialog).getByRole("checkbox")).toBeInTheDocument();
    expect(within(dialog).getByRole("button", { name: "Cerrar" })).toBeInTheDocument();
  });
});
