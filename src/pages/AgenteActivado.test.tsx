import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import App from "@/App";

/**
 * The lead forms redirect here after a successful submit. Whoever lands here
 * must know, without doubt, that their form was saved and that we will get in
 * touch. If this route fell into the 404, the lead would think it failed.
 */
describe("/agenteActivado landing", () => {
  it("confirms the form was received and that we will get in touch", () => {
    window.history.pushState({}, "", "/agenteActivado");
    render(<App />);

    expect(screen.getByRole("heading", { level: 1, name: /gracias/i })).toBeInTheDocument();
    expect(screen.getByText(/formulario se ha recogido correctamente/i)).toBeInTheDocument();
    expect(screen.getByText(/nos pondremos en contacto/i)).toBeInTheDocument();
  });

  it("is not the 404 and offers a way back home", () => {
    window.history.pushState({}, "", "/agenteActivado");
    render(<App />);

    expect(screen.queryByText(/página no encontrada/i)).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: /volver al inicio/i })).toHaveAttribute("href", "/");
  });
});

/**
 * Whoever asks for the free audit has the highest intent right after
 * submitting, so that is where the call is offered. The developer waiting
 * list gets no call: there is no open cohort to sell yet.
 */
describe("booking the call from /agenteActivado", () => {
  it("offers the Google Calendar booking page to business leads", () => {
    window.history.pushState({}, "", "/agenteActivado?formulario=business");
    render(<App />);

    const book = screen.getByRole("link", { name: /agenda tu llamada/i });
    expect(book).toHaveAttribute("href", "https://calendar.app.google/Ft4YYTzBZocpox1r5");
    expect(book).toHaveAttribute("target", "_blank");
  });

  it("offers no call to developers on the waiting list", () => {
    window.history.pushState({}, "", "/agenteActivado?formulario=developer");
    render(<App />);

    expect(screen.queryByRole("link", { name: /agenda tu llamada/i })).not.toBeInTheDocument();
  });
});
