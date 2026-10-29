import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import App from "@/App";
import { mainServices } from "@/lib/servicios";

const GUARANTEE = /si en 6 meses no recuperas lo que pagaste por la implementación/i;
const CONDITIONS = /no incluye herramientas de terceros/i;

const open = (path: string) => {
  window.history.pushState({}, "", path);
  return render(<App />);
};

/**
 * A published guarantee binds the business: it is only ever shown with its
 * conditions, on the paid services, and no unconditional ROI promise remains.
 */
describe("ROI guarantee", () => {
  it("leaves no unconditional ROI promise in the services", () => {
    const text = JSON.stringify(mainServices);
    expect(text).not.toMatch(/ROI garantizado/i);
    expect(text).not.toMatch(/primera semana/i);
  });

  it.each([
    "/servicios/automatizacion-ia-empresas",
    "/servicios/funnels-ventas-ia",
    "/servicios/avatares-ia",
  ])("%s shows the guarantee together with its conditions", (path) => {
    open(path);
    const main = screen.getByRole("main");
    const note = within(main).getByText(GUARANTEE).closest("[data-guarantee]") as HTMLElement;
    expect(note).not.toBeNull();
    expect(within(note).getByText(CONDITIONS)).toBeInTheDocument();
  });

  it("the free consultancy carries no guarantee, only the measurement", () => {
    open("/servicios/consultoria-ia");
    const main = screen.getByRole("main");
    expect(within(main).queryByText(GUARANTEE)).toBeNull();
    expect(within(main).getByText("Medimos el retorno de cada implementación")).toBeInTheDocument();
  });

  it("the home makes no unbacked client-results claim and announces the guarantee", () => {
    open("/");
    expect(document.body.textContent).not.toMatch(/85%/);
    expect(screen.getAllByText(/Garantía de 6 meses en todos nuestros servicios de pago/)).toHaveLength(2);
  });

  it("the home cards show the guarantee only with its conditions", () => {
    open("/");
    const notes = document.querySelectorAll("[data-guarantee]");
    expect(notes).toHaveLength(3);
    for (const note of notes) {
      expect(within(note as HTMLElement).getByText(CONDITIONS)).toBeInTheDocument();
    }
  });
});
