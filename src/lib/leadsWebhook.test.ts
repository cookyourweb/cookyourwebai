import { afterEach, describe, expect, it, vi } from "vitest";

import { sendLead } from "./leadsWebhook";

afterEach(() => vi.unstubAllGlobals());

describe("sendLead", () => {
  // The contact dialog navigates to WhatsApp right after the click: keepalive
  // lets the browser finish the request after the page loses focus.
  it("sends the request with keepalive so it survives leaving the page", async () => {
    const fetch = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("fetch", fetch);

    await sendLead({ formulario: "contacto", email: "ana@acme.es" });

    expect(fetch).toHaveBeenCalledWith(expect.any(String), expect.objectContaining({ keepalive: true }));
  });
});
