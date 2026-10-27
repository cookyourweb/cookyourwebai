import { COMPANY } from "./company";
import { DOMINIO_POR_DEFECTO, urlCanonica } from "./rutas-publicas";
import { mainServices } from "./servicios";

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

const ID = {
  web: `${DOMINIO_POR_DEFECTO}/#web`,
  negocio: `${DOMINIO_POR_DEFECTO}/#negocio`,
  veronica: `${DOMINIO_POR_DEFECTO}/#veronica`,
} as const;

const AREA_SERVED = { "@type": "Country", name: "España" } as const;

/**
 * Structured data of the home: the business, its founder and the four services
 * as one linked graph (fixed @ids, references instead of copies).
 *
 * Left out on purpose (owner decisions, docs/estado.md section 3): address,
 * aggregateRating, review, priceRange, FAQPage (no visible FAQ) and sameAs (no
 * real profiles yet: add the key only when there are some).
 */
export function homeJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": ID.web,
        url: canonical("/"),
        name: SITE.name,
        inLanguage: "es-ES",
        publisher: { "@id": ID.negocio },
      },
      {
        "@type": "ProfessionalService",
        "@id": ID.negocio,
        name: COMPANY.name,
        url: canonical("/"),
        description: "Agencia de IA y automatización para empresas.",
        telephone: COMPANY.phone,
        email: COMPANY.email,
        logo: `${DOMINIO_POR_DEFECTO}/apple-touch-icon.png`,
        image: OG_IMAGE.url,
        areaServed: AREA_SERVED,
        founder: { "@id": ID.veronica },
      },
      {
        "@type": "Person",
        "@id": ID.veronica,
        name: COMPANY.legalName,
        jobTitle: "Fundadora",
        worksFor: { "@id": ID.negocio },
      },
      ...mainServices.map((service) => ({
        "@type": "Service",
        "@id": `${DOMINIO_POR_DEFECTO}/#servicio-${service.slug}`,
        name: service.title,
        url: `${DOMINIO_POR_DEFECTO}/#${service.id}`,
        provider: { "@id": ID.negocio },
        areaServed: AREA_SERVED,
      })),
    ],
  };
}

/** The JSON-LD of a page, or undefined when it has none (noindex pages). */
export function jsonLdFor(page: PageKey): object | undefined {
  if (page === "home") return homeJsonLd();
  return undefined;
}
