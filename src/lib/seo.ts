import { DOMINIO_POR_DEFECTO, urlCanonica } from "./rutas-publicas";

export const SITE = {
  name: "CookYourWebAI",
  url: DOMINIO_POR_DEFECTO,
  locale: "es_ES",
} as const;

export const canonical = urlCanonica;

/** Social card image, 1200x630. Source: docs/brand/og-cookyourwebai.svg. */
export const OG_IMAGE = {
  url: `${DOMINIO_POR_DEFECTO}/og-cookyourwebai.png`,
  width: 1200,
  height: 630,
  alt: "CookYourWebAI, agencia de IA y automatización",
} as const;

export interface PageMeta {
  path: string;
  /** At most 60 characters, ending with "| CookYourWebAI". */
  title: string;
  /** At most 155 characters. Optional only for pages nobody finds on Google. */
  description?: string;
  /** Present only on pages that must stay out of the index. */
  robots?: "noindex, follow" | "noindex, nofollow";
}

/** One entry per route page. Indexable routes must also be in rutas-publicas.ts. */
export const PAGES = {
  home: {
    path: "/",
    title: "Agencia de IA y automatización para empresas | CookYourWebAI",
    description:
      "Automatizamos procesos, atención al cliente y ventas con IA para empresas. Auditoría gratuita de 60 minutos.",
  },
  privacy: {
    path: "/politicadeprivacidad",
    title: "Política de privacidad | CookYourWebAI",
    description:
      "Cómo trata CookYourWebAI tus datos personales: responsable, finalidad, proveedores, plazos y cómo ejercer tus derechos.",
  },
  cookies: {
    path: "/cookie-policy",
    title: "Política de cookies | CookYourWebAI",
    description:
      "Qué cookies usa cookyourwebai.es, cuáles son de estadística y cómo aceptarlas, rechazarlas o cambiar tu elección.",
  },
  legal: {
    path: "/avisolegal",
    title: "Aviso legal | CookYourWebAI",
    description: "Titular, datos de contacto y condiciones de uso de cookyourwebai.es conforme a la LSSI-CE.",
  },
  unsubscribe: {
    path: "/baja",
    title: "Darme de baja | CookYourWebAI",
    description: "Solicita la baja y la supresión de tus datos en CookYourWebAI.",
    robots: "noindex, follow",
  },
  thanks: {
    path: "/agenteActivado",
    title: "¡Gracias! | CookYourWebAI",
    robots: "noindex, nofollow",
  },
  notFound: {
    path: "*",
    title: "Página no encontrada | CookYourWebAI",
    robots: "noindex, follow",
  },
} as const satisfies Record<string, PageMeta>;

export type PageKey = keyof typeof PAGES;
