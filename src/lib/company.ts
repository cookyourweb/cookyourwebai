import { DOMINIO_POR_DEFECTO } from "./rutas-publicas";

/** wa.me format: country code and number, no "+". Typed once. */
const WHATSAPP = "34688757782";

/**
 * Single source of truth for the company contact data. Pages, the footer and
 * the structured data read it from here; never retype the phone or the email.
 */
export const COMPANY = {
  name: "CookYourWebAI",
  legalName: "Verónica Serna Pérez",
  url: DOMINIO_POR_DEFECTO,
  email: "veronica@cookyourwebai.es",
  /** E.164, for tel: links and structured data. */
  phone: "+34688757782",
  /** How the phone is shown on screen. */
  phoneDisplay: "+34 688 75 77 82",
  whatsapp: WHATSAPP,
  /** The founder's LinkedIn: footer link and Person.sameAs. */
  linkedinFounder: "https://www.linkedin.com/in/veronica4web/",
  /** Click-to-chat link with a prefilled message, built from the single number above. */
  whatsappUrl: (text: string) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`,
} as const;
