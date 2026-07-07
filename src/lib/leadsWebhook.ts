// Webhook n8n que sustituye al de Make (cancelado 2026).
// Workflow "Leads web cookyourweb" en n8n-asistente-correo (Render) → Notion "Leads web".
const LEADS_WEBHOOK_URL = 'https://n8n-asistente-correo.onrender.com/webhook/leads-web';

export type LeadPayload = {
  formulario: 'contacto' | 'developer' | 'business' | 'unsubscribe';
  nombre?: string;
  email: string;
  telefono?: string;
  mensaje?: string;
};

export async function sendLead(payload: LeadPayload): Promise<boolean> {
  try {
    const response = await fetch(LEADS_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...payload,
        origen: 'web',
        timestamp: new Date().toISOString(),
      }),
    });
    return response.ok;
  } catch {
    // El fallo del webhook nunca debe romper la experiencia del usuario.
    return false;
  }
}
