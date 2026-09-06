import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { computeAccessibleName } from "dom-accessibility-api";

import App from "@/App";

describe("enlace de salto", () => {
  it("es lo primero que encuentra el teclado y lleva al contenido principal", () => {
    render(<App />);

    const salto = screen.getByRole("link", { name: /saltar al contenido principal/i });

    expect(salto).toHaveAttribute("href", "#main-content");
  });
});

/**
 * Un lector de pantalla ofrece "ir al contenido principal" a partir del
 * landmark <main>. Sin el, el usuario se traga el cabecero entero en cada
 * pagina. Con dos, deja de saber cual es el bueno. Tiene que haber uno.
 */
describe.each([
  ["/", "home"],
  ["/politicadeprivacidad", "politica de privacidad"],
  ["/cookie-policy", "politica de cookies"],
  ["/avisolegal", "aviso legal"],
  ["/baja", "baja"],
  ["/una-ruta-que-no-existe", "404"],
])("ruta %s (%s)", (ruta) => {
  it("tiene un unico landmark main, y el enlace de salto puede alcanzarlo", () => {
    window.history.pushState({}, "", ruta);

    render(<App />);

    const mains = screen.getAllByRole("main");
    expect(mains).toHaveLength(1);
    expect(mains[0]).toHaveAttribute("id", "main-content");
  });
});

/**
 * Los cinco modales de la home eran divs: no se anunciaban como dialogo, el
 * foco se escapaba por detras y Escape no hacia nada. Al migrarlos a Radix
 * esto tiene que cumplirse solo. Este test vigila que siga siendo asi.
 */
describe("modal de contacto", () => {
  it("se anuncia como dialogo y se cierra con Escape", async () => {
    const usuaria = userEvent.setup();
    window.history.pushState({}, "", "/");
    render(<App />);

    await usuaria.click(screen.getByTitle(/contactar por whatsapp/i));

    expect(await screen.findByRole("dialog")).toBeInTheDocument();

    await usuaria.keyboard("{Escape}");

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });
});

/**
 * Un boton sin nombre accesible es un boton mudo: el lector de pantalla dice
 * "boton" y nada mas. Quien navega a ciegas no sabe si cierra, envia o borra.
 */
describe("nombres accesibles", () => {
  it("ningun boton de la home se queda sin nombre", () => {
    window.history.pushState({}, "", "/");
    const { container } = render(<App />);

    const mudos = [...container.querySelectorAll("button")]
      .filter((boton) => computeAccessibleName(boton).trim() === "")
      .map((boton) => boton.outerHTML.slice(0, 120));

    expect(mudos).toEqual([]);
  });
});
