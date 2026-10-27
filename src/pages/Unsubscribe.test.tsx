import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { sendLead } from "@/lib/leadsWebhook";
import Unsubscribe from "./Unsubscribe";

vi.mock("@/lib/leadsWebhook", () => ({ sendLead: vi.fn() }));
const sendLeadMock = vi.mocked(sendLead);

function renderPage() {
  return render(
    <HelmetProvider>
      <MemoryRouter>
        <Unsubscribe />
      </MemoryRouter>
    </HelmetProvider>
  );
}

async function requestErasure(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText(/email/i), "ana@example.com");
  await user.type(screen.getByLabelText(/teléfono \(opcional\)/i), "+34600111222");
  await user.type(screen.getByLabelText(/por qué te das de baja/i), "Ya no me interesa");
  await user.click(screen.getByRole("checkbox", { name: /confirmo que deseo eliminar/i }));
  await user.click(screen.getByRole("button", { name: /solicitar baja/i }));
}

/**
 * The privacy policy names this form as the first way to request erasure,
 * and the GDPR requires answering within a month. It used to post to a
 * placeholder Make webhook, so every request failed. It now goes through
 * the same n8n webhook as the leads, tagged as "unsubscribe", which stores
 * it in Notion and notifies Vero without sending any commercial email.
 */
describe("unsubscribe form", () => {
  beforeEach(() => {
    sendLeadMock.mockReset();
  });

  it("sends the erasure request through the leads webhook", async () => {
    sendLeadMock.mockResolvedValue(true);
    const user = userEvent.setup({ delay: null });
    renderPage();

    await requestErasure(user);

    expect(sendLeadMock).toHaveBeenCalledWith(
      expect.objectContaining({
        formulario: "unsubscribe",
        email: "ana@example.com",
        telefono: "+34600111222",
        mensaje: expect.stringMatching(/Ya no me interesa/),
      })
    );
    expect(await screen.findByText(/solicitud recibida/i)).toBeInTheDocument();
  });

  it("shows an error and the email fallback when the request is not stored", async () => {
    sendLeadMock.mockResolvedValue(false);
    const user = userEvent.setup({ delay: null });
    renderPage();

    await requestErasure(user);

    expect(await screen.findByText(/hubo un error al procesar tu solicitud/i)).toBeInTheDocument();
    expect(screen.queryByText(/solicitud recibida/i)).not.toBeInTheDocument();
  });

  it("no longer mentions Airtable", () => {
    const { container } = renderPage();

    expect(container.textContent).not.toMatch(/airtable/i);
  });
});
