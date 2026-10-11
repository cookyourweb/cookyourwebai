import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes, useLocation } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { sendLead } from "@/lib/leadsWebhook";
import BusinessContactForm from "./BusinessContactForm";
import DeveloperContactForm from "./DeveloperContactForm";

vi.mock("@/lib/leadsWebhook", () => ({ sendLead: vi.fn() }));
const sendLeadMock = vi.mocked(sendLead);

function ThankYouPage() {
  const { search } = useLocation();
  return <p>thank-you page {search}</p>;
}

function renderInRouter(form: React.ReactNode) {
  return render(
    <MemoryRouter initialEntries={["/"]}>
      <Routes>
        <Route path="/" element={form} />
        <Route path="/agenteActivado" element={<ThankYouPage />} />
      </Routes>
    </MemoryRouter>
  );
}

type User = ReturnType<typeof userEvent.setup>;

async function fillBusinessForm(user: User) {
  await user.type(screen.getByLabelText(/nombre y cargo/i), "Ana CEO");
  await user.type(screen.getByLabelText(/nombre de tu empresa/i), "Acme");
  await user.type(screen.getByLabelText(/email corporativo/i), "ana@acme.es");
  await user.type(screen.getByLabelText(/procesos te gustaría automatizar/i), "Facturas");
  await user.click(screen.getByRole("checkbox", { name: /he leído y acepto/i }));
  await user.click(screen.getByRole("button", { name: /solicitar auditoría/i }));
}

async function fillDeveloperForm(user: User) {
  await user.type(screen.getByLabelText(/tu nombre completo/i), "Leo Dev");
  await user.type(screen.getByLabelText(/tu email/i), "leo@dev.es");
  await user.selectOptions(screen.getByLabelText(/años de experiencia/i), "mid");
  await user.selectOptions(screen.getByLabelText(/track de interés/i), "frontend");
  await user.type(screen.getByLabelText(/qué tecnologías dominas/i), "React");
  await user.type(screen.getByLabelText(/a qué te dedicas/i), "Frontend en una fintech");
  await user.type(screen.getByLabelText(/qué te gustaría construir/i), "Un copiloto interno");
  await user.click(screen.getByRole("checkbox", { name: /he leído y acepto/i }));
  await user.click(screen.getByRole("button", { name: /unirme a la lista de espera/i }));
}

/**
 * These forms replace the Tally iframes. A lead only counts as received once
 * the webhook confirms it was stored: then, and only then, the person is taken
 * to /agenteActivado. On failure they stay on the form with a message that
 * screen readers announce, and no alert().
 */
describe.each([
  ["business", () => <BusinessContactForm />, fillBusinessForm, "ana@acme.es"],
  ["developer", () => <DeveloperContactForm />, fillDeveloperForm, "leo@dev.es"],
] as const)("%s form", (formType, createForm, fill, email) => {
  beforeEach(() => {
    sendLeadMock.mockReset();
  });

  it("goes to the thank-you page once the lead is stored", async () => {
    sendLeadMock.mockResolvedValue(true);
    const user = userEvent.setup();
    renderInRouter(createForm());

    await fill(user);

    expect(sendLeadMock).toHaveBeenCalledWith(
      expect.objectContaining({ formulario: formType, email })
    );
    expect(await screen.findByText(`thank-you page ?formulario=${formType}`)).toBeInTheDocument();
  });

  it("warns on the page and does not pretend it worked when the lead is not stored", async () => {
    sendLeadMock.mockResolvedValue(false);
    const user = userEvent.setup();
    renderInRouter(createForm());

    await fill(user);

    expect(await screen.findByRole("alert")).toHaveTextContent(/no hemos podido registrar/i);
    expect(screen.queryByText(/thank-you page/)).not.toBeInTheDocument();
  });

  it("links to the real privacy policy", () => {
    renderInRouter(createForm());

    expect(screen.getByRole("link", { name: /política de privacidad/i })).toHaveAttribute(
      "href",
      "/politicadeprivacidad"
    );
  });
});

/**
 * Each developer's background drives the course syllabus, and an optional
 * phone lets us notify by WhatsApp once the cohort fills up. WhatsApp
 * notifications need their own consent, never pre-checked.
 */
describe("developer form: background and WhatsApp", () => {
  beforeEach(() => {
    sendLeadMock.mockReset();
    sendLeadMock.mockResolvedValue(true);
  });

  it("sends the current role and the goal to shape the course", async () => {
    const user = userEvent.setup();
    renderInRouter(<DeveloperContactForm />);

    await fillDeveloperForm(user);

    const { mensaje } = sendLeadMock.mock.calls[0][0];
    expect(mensaje).toMatch(/Rol: Frontend en una fintech/);
    expect(mensaje).toMatch(/Objetivo: Un copiloto interno/);
    expect(mensaje).toMatch(/WhatsApp: no/);
  });

  it("keeps the phone optional and the WhatsApp consent unchecked by default", () => {
    renderInRouter(<DeveloperContactForm />);

    expect(screen.getByLabelText(/^teléfono \(opcional\)$/i)).not.toBeRequired();
    expect(screen.getByRole("checkbox", { name: /me avise por whatsapp/i })).not.toBeChecked();
  });

  it("sends both the phone and the consent when given", async () => {
    const user = userEvent.setup();
    renderInRouter(<DeveloperContactForm />);

    await user.type(screen.getByLabelText(/^teléfono \(opcional\)$/i), "+34600111222");
    await user.click(screen.getByRole("checkbox", { name: /me avise por whatsapp/i }));
    await fillDeveloperForm(user);

    const lead = sendLeadMock.mock.calls[0][0];
    expect(lead.telefono).toBe("+34600111222");
    expect(lead.mensaje).toMatch(/WhatsApp: sí/);
  });
});

/**
 * The legal advisor confirmed (11 Oct 2026) that notifying the waiting list
 * is a commercial communication (LSSI art. 21). Submitting the waiting list
 * form is the request itself, as long as the form says so next to the
 * button. The WhatsApp consent must name who writes, what for and how to
 * withdraw it.
 */
describe("developer form: legal notices", () => {
  it("tells the person that submitting means receiving the opening email", () => {
    renderInRouter(<DeveloperContactForm />);

    expect(
      screen.getByText(/al enviar este formulario aceptas recibir un email de aviso cuando se abra la formación/i)
    ).toBeInTheDocument();
  });

  it("words the WhatsApp consent with sender, purpose and how to withdraw", () => {
    renderInRouter(<DeveloperContactForm />);

    const consent = screen.getByRole("checkbox", { name: /me avise por whatsapp/i });
    expect(consent).toHaveAccessibleName(
      expect.stringMatching(/Verónica Serna Pérez \(CookYourWeb\).*apertura de la cohorte.*BAJA/)
    );
  });
});

