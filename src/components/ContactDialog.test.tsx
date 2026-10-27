import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import { COMPANY } from "@/lib/company";
import { sendLead } from "@/lib/leadsWebhook";
import ContactDialog from "./ContactDialog";

vi.mock("@/lib/leadsWebhook", () => ({ sendLead: vi.fn().mockResolvedValue(true) }));

afterEach(() => vi.restoreAllMocks());

describe("ContactDialog", () => {
  it("opens the WhatsApp link built from COMPANY on submit, after storing the lead", async () => {
    const user = userEvent.setup();
    const open = vi.spyOn(window, "open").mockReturnValue(null);
    const onClose = vi.fn();
    render(<ContactDialog isOpen onClose={onClose} />);

    await user.type(screen.getByLabelText("Tu nombre"), "Ana");
    await user.type(screen.getByLabelText("Tu email"), "ana@acme.es");
    await user.type(screen.getByLabelText("Tu número de teléfono"), "600111222");
    await user.click(screen.getByRole("button", { name: /enviar por whatsapp/i }));

    const message = `Hola! Soy Ana.\n\nEste mensaje activa un funnel inteligente.\nMi email es: ana@acme.es\nMi número: 600111222\n\nEstoy listo para descubrir cómo la IA puede transformar mi negocio o mis proyectos.`;
    await vi.waitFor(() => expect(open).toHaveBeenCalledTimes(1));
    expect(open).toHaveBeenCalledWith(`https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(message)}`, "_blank");
    expect(sendLead).toHaveBeenCalledWith(expect.objectContaining({ formulario: "contacto", email: "ana@acme.es" }));
    expect(onClose).toHaveBeenCalled();
  }, 15_000);
});
