import { render, screen, within, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import App from "@/App";

/** Pages that carry the lead capture (the public content pages). */
const WITH_CTA = ["/", "/avisolegal", "/politicadeprivacidad", "/cookie-policy"];
/** Never show the audit CTA: the thank-you page, the unsubscribe page and the 404. */
const WITHOUT_STICKY = ["/agenteActivado", "/baja", "/no-existe"];

const STICKY = "[data-sticky-audit-cta]";
const AUDIT_NAME = "Auditoría AI gratuita";

function visit(path: string, consent = true) {
  if (consent) localStorage.setItem("cookieConsent", "true");
  window.history.pushState({}, "", path);
  return render(<App />);
}

afterEach(() => {
  localStorage.clear();
  vi.unstubAllGlobals();
});

const closingBlocks = () => screen.queryAllByRole("region", { name: AUDIT_NAME });

describe.each(WITH_CTA)("sticky audit CTA on %s", (path) => {
  it("is a mobile-only bar with a real button named after the free audit", async () => {
    visit(path);
    await screen.findAllByRole("banner");

    const bars = document.querySelectorAll<HTMLElement>(STICKY);
    expect(bars).toHaveLength(1);
    expect(bars[0].className).toMatch(/\bmd:hidden\b/);
    expect(bars[0].className).toMatch(/\bfixed\b/);
    const button = within(bars[0]).getByRole("button", { name: AUDIT_NAME });
    expect(button.className).toMatch(/\bmin-h-11\b/);
  });

  it("opens the existing business form (no new form) and keeps focus free", async () => {
    const user = userEvent.setup();
    visit(path);
    await screen.findAllByRole("banner");

    await user.click(within(document.querySelector<HTMLElement>(STICKY)!).getByRole("button", { name: AUDIT_NAME }));

    const dialog = await screen.findByRole("dialog");
    expect(within(dialog).getByRole("textbox", { name: "Nombre y cargo" })).toBeInTheDocument();
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).toBeNull();
  });
});

describe.each(WITHOUT_STICKY)("no sticky audit CTA on %s", (path) => {
  it("does not render the bar", async () => {
    visit(path);
    await screen.findAllByRole("banner");

    expect(document.querySelector(STICKY)).toBeNull();
  });
});

describe("sticky audit CTA does not collide with other fixed UI", () => {
  it("is hidden on the home while the cookie banner is shown", async () => {
    visit("/", false);
    await screen.findByRole("button", { name: "Aceptar" });

    expect(document.querySelector(STICKY)).toBeNull();
  });

  it("comes back once the visitor answers the cookie banner", async () => {
    const user = userEvent.setup();
    visit("/", false);

    await user.click(await screen.findByRole("button", { name: "Aceptar" }));

    expect(document.querySelector(STICKY)).not.toBeNull();
  });

  it("is hidden while a call-to-action block of the page is on screen", async () => {
    const observers: Array<{ cb: IntersectionObserverCallback; targets: Element[] }> = [];
    class FakeObserver {
      targets: Element[] = [];
      constructor(public cb: IntersectionObserverCallback) {
        observers.push(this);
      }
      observe(el: Element) {
        this.targets.push(el);
      }
      unobserve() {}
      disconnect() {}
    }
    vi.stubGlobal("IntersectionObserver", FakeObserver);

    visit("/avisolegal");
    await screen.findAllByRole("banner");
    expect(document.querySelector(STICKY)).not.toBeNull();

    const observer = observers.find((o) => o.targets.length > 0)!;
    expect(observer.targets[0]).toBe(closingBlocks()[0]);

    act(() => {
      observer.cb([{ target: observer.targets[0], isIntersecting: true } as IntersectionObserverEntry], observer as never);
    });
    expect(document.querySelector(STICKY)).toBeNull();

    act(() => {
      observer.cb([{ target: observer.targets[0], isIntersecting: false } as IntersectionObserverEntry], observer as never);
    });
    expect(document.querySelector(STICKY)).not.toBeNull();
  });

  it("reserves room at the bottom of the page so it never covers content", async () => {
    visit("/avisolegal");
    await screen.findAllByRole("banner");

    const wrapper = document.querySelector("[data-page-body]")!;
    expect(wrapper.className).toMatch(/\bpb-20\b/);
    expect(wrapper.className).toMatch(/\bmd:pb-0\b/);
  });

  it("does not reserve room on pages without the bar", async () => {
    visit("/baja");
    await screen.findAllByRole("banner");

    expect(document.querySelector("[data-page-body]")!.className).not.toMatch(/pb-20/);
  });
});

describe("closing block before the footer", () => {
  it.each(["/avisolegal", "/politicadeprivacidad", "/cookie-policy", "/no-existe"])(
    "is one region with an h2, one line and a button, on %s",
    async (path) => {
      const user = userEvent.setup();
      visit(path);
      await screen.findAllByRole("banner");

      const blocks = closingBlocks();
      expect(blocks).toHaveLength(1);
      const block = blocks[0];
      expect(within(block).getByRole("heading", { level: 2, name: AUDIT_NAME })).toBeInTheDocument();
      expect(block.querySelectorAll("p")).toHaveLength(1);
      const buttons = within(block).getAllByRole("button");
      expect(buttons).toHaveLength(1);

      await user.click(buttons[0]);
      expect(await screen.findByRole("dialog")).toBeInTheDocument();
    },
  );

  it.each(["/avisolegal", "/politicadeprivacidad", "/cookie-policy"])(
    "sits right before the footer on %s",
    async (path) => {
      visit(path);
      await screen.findAllByRole("banner");

      const footer = screen.getByRole("contentinfo");
      expect(closingBlocks()[0].nextElementSibling).toBe(footer);
    },
  );

  it("is not added to the home, which already ends with its own audit call to action", async () => {
    visit("/");
    await screen.findAllByRole("banner");

    expect(closingBlocks()).toHaveLength(0);
    expect(screen.getAllByRole("heading", { name: /listo para la transformación ia/i })).toHaveLength(1);
  });

  it.each(["/baja", "/agenteActivado"])("is not shown on %s", async (path) => {
    visit(path);
    await screen.findAllByRole("banner");

    expect(closingBlocks()).toHaveLength(0);
  });
});
