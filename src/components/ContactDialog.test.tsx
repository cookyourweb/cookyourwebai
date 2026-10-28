import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import { COMPANY } from "@/lib/company";
import { sendLead } from "@/lib/leadsWebhook";
import ContactDialog from "./ContactDialog";

vi.mock("@/lib/leadsWebhook", () => ({ sendLead: vi.fn().mockResolvedValue(true) }));

afterEach(() => {
  vi.restoreAllMocks();
  vi.mocked(sendLead).mockClear();
});

describe("ContactDialog", () => {
  it("opens the WhatsApp link built from COMPANY on submit, after storing the lead", async () => {
    const user = userEvent.setup({ delay: null });
    const open = vi.spyOn(window, "open").mockReturnValue(null);
    const onClose = vi.fn();
    render(<ContactDialog isOpen onClose={onClose} />);

    await user.type(screen.getByLabelText("Tu nombre"), "Ana");
    await user.type(screen.getByLabelText("Tu email"), "ana@acme.es");
    await user.type(screen.getByLabelText("Tu número de teléfono"), "600111222");
    await user.click(screen.getByRole("checkbox", { name: /he leído y acepto/i }));
    await user.click(screen.getByRole("button", { name: /enviar por whatsapp/i }));

    const message = `Hola! Soy Ana.\n\nEste mensaje activa un funnel inteligente.\nMi email es: ana@acme.es\nMi número: 600111222\n\nEstoy listo para descubrir cómo la IA puede transformar mi negocio o mis proyectos.`;
    await vi.waitFor(() => expect(open).toHaveBeenCalledTimes(1));
    expect(open).toHaveBeenCalledWith(`https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(message)}`, "_blank");
    expect(sendLead).toHaveBeenCalledWith(expect.objectContaining({ formulario: "contacto", email: "ana@acme.es" }));
    expect(onClose).toHaveBeenCalled();
  }, 15_000);

  it("does not send anything until the privacy policy is accepted", async () => {
    const user = userEvent.setup({ delay: null });
    render(<ContactDialog isOpen onClose={vi.fn()} />);

    await user.type(screen.getByLabelText("Tu nombre"), "Ana");
    await user.type(screen.getByLabelText("Tu email"), "ana@acme.es");
    await user.type(screen.getByLabelText("Tu número de teléfono"), "600111222");

    const privacy = screen.getByRole("checkbox", { name: /he leído y acepto/i });
    expect(privacy).not.toBeChecked();
    const submit = screen.getByRole("button", { name: /enviar por whatsapp/i });
    expect(submit).toHaveAttribute("aria-disabled", "true");
    expect(submit).toHaveAccessibleDescription(/acepta la política de privacidad/i);
    await user.click(submit);
    expect(sendLead).not.toHaveBeenCalled();

    await user.click(privacy);
    expect(submit).toHaveAttribute("aria-disabled", "false");
  }, 15_000);

  it("links the privacy policy from the consent", () => {
    render(<ContactDialog isOpen onClose={vi.fn()} />);

    expect(screen.getByRole("link", { name: /política de privacidad/i })).toHaveAttribute(
      "href",
      "/politicadeprivacidad"
    );
  });

  // iOS Safari blocks window.open once the click handler has awaited the network:
  // WhatsApp must open in the same tick as the click, even if the webhook hangs.
  it("opens WhatsApp even when the leads webhook never answers", async () => {
    vi.mocked(sendLead).mockReturnValueOnce(new Promise(() => {}));
    const user = userEvent.setup({ delay: null });
    const open = vi.spyOn(window, "open").mockReturnValue(null);
    render(<ContactDialog isOpen onClose={vi.fn()} />);

    await user.type(screen.getByLabelText("Tu nombre"), "Ana");
    await user.type(screen.getByLabelText("Tu email"), "ana@acme.es");
    await user.type(screen.getByLabelText("Tu número de teléfono"), "600111222");
    await user.click(screen.getByRole("checkbox", { name: /he leído y acepto/i }));
    await user.click(screen.getByRole("button", { name: /enviar por whatsapp/i }));

    expect(open).toHaveBeenCalledTimes(1);
  }, 15_000);

  it("lets the mobile keyboard autofill name, email and phone", () => {
    render(<ContactDialog isOpen onClose={vi.fn()} />);

    expect(screen.getByLabelText("Tu nombre")).toHaveAttribute("autocomplete", "name");
    expect(screen.getByLabelText("Tu email")).toHaveAttribute("autocomplete", "email");
    expect(screen.getByLabelText("Tu número de teléfono")).toHaveAttribute("autocomplete", "tel");
  });
});
