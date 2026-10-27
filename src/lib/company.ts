/**
 * Single source of truth for the company contact data. Pages, the footer and
 * the structured data read it from here; never retype the phone or the email.
 */
export const COMPANY = {
  name: "CookYourWebAI",
  legalName: "Verónica Serna Pérez",
  url: "https://www.cookyourwebai.es",
  email: "veronica@cookyourwebai.es",
  /** E.164, for tel: links and structured data. */
  phone: "+34688757782",
  /** How the phone is shown on screen. */
  phoneDisplay: "+34 688 75 77 82",
  /** wa.me format: country code and number, no "+". */
  whatsapp: "34688757782",
  whatsappUrl: (text: string) => `https://wa.me/34688757782?text=${encodeURIComponent(text)}`,
} as const;
