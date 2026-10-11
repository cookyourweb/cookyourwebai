import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendLead, type LeadPayload } from "@/lib/leadsWebhook";

const PANTALLA_DE_GRACIAS = "/agenteActivado";

// Only go to the thank-you page once the webhook confirms the lead was stored.
// Otherwise the form stays with a warning: never pretend it worked.
export function useEnviarLead() {
  const navigate = useNavigate();
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState("");

  async function enviar(payload: LeadPayload) {
    setEnviando(true);
    setError("");
    const ok = await sendLead(payload);
    setEnviando(false);
    if (!ok) {
      setError("No hemos podido registrar tu solicitud. Inténtalo de nuevo en unos minutos.");
      return;
    }
    // The thank-you page decides what to offer based on the source form.
    navigate(`${PANTALLA_DE_GRACIAS}?formulario=${payload.formulario}`);
  }

  return { enviar, enviando, error };
}
