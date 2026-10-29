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
  servicioAutomatizacion: {
    path: "/servicios/automatizacion-ia-empresas",
    title: "Automatización con IA para empresas | CookYourWebAI",
    description:
      "Automatización empresarial con IA: chatbots 24/7, procesos administrativos, análisis de datos e integración con CRM y ERP. Auditoría gratuita.",
  },
  servicioFunnels: {
    path: "/servicios/funnels-ventas-ia",
    title: "Funnels de ventas con IA para empresas | CookYourWebAI",
    description:
      "Funnels de ventas con IA: lead magnets automáticos, nurturing personalizado, agendado y cualificación automática, CRM integrado y métricas en tiempo real.",
  },
  servicioAvatares: {
    path: "/servicios/avatares-ia",
    title: "Avatares con IA para tu marca personal | CookYourWebAI",
    description:
      "Avatares digitales con IA para CEOs y fundadores: contenido automático, respuestas en tiempo real y presencia 24/7 en redes, email y WhatsApp Business.",
  },
  servicioConsultoria: {
    path: "/servicios/consultoria-ia",
    title: "Consultoría de IA para empresas | CookYourWebAI",
    description:
      "Consultoría de IA: auditoría de procesos automatizables, estrategia de implementación gradual, formación de equipos y consulta estratégica de 60 minutos.",
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
        worksFor: { "@id": ID.negocio },
      },
      ...mainServices.map(serviceNode),
    ],
  };
}

/** One Service node. The home graph and the service's own page emit the same node. */
function serviceNode(service: (typeof mainServices)[number]) {
  return {
    "@type": "Service",
    "@id": `${DOMINIO_POR_DEFECTO}/#servicio-${service.slug}`,
    name: service.title,
    url: canonical(service.path),
    provider: { "@id": ID.negocio },
    areaServed: AREA_SERVED,
  };
}

/**
 * The pages of the four services, in the order of lib/servicios.ts (the
 * entry at the same position has the same path: a test keeps them aligned).
 */
export const SERVICE_PAGES = [
  "servicioAutomatizacion",
  "servicioFunnels",
  "servicioAvatares",
  "servicioConsultoria",
] as const satisfies readonly PageKey[];

export type ServicePageKey = (typeof SERVICE_PAGES)[number];

/** The SEO entry of a service: the PAGES key whose path is the service's own. */
export function servicePageKey(service: (typeof mainServices)[number]): ServicePageKey {
  const key = SERVICE_PAGES.find((k) => PAGES[k].path === service.path);
  if (!key) throw new Error(`No PAGES entry for the service path ${service.path}`);
  return key;
}

/** Pages that carry an "Inicio > page" breadcrumb. The home carries none. */
const BREADCRUMB_PAGES = ["privacy", "cookies", "legal", ...SERVICE_PAGES] as const satisfies readonly PageKey[];

export type BreadcrumbPageKey = (typeof BREADCRUMB_PAGES)[number];

/**
 * Inicio > the page. The single source of the breadcrumb: the JSON-LD and the
 * visible breadcrumb (components/LegalBreadcrumb.tsx) both read it, so they
 * cannot drift. The name is the page title without the brand suffix.
 */
export function breadcrumbTrail(page: BreadcrumbPageKey) {
  const { path, title } = PAGES[page];
  return [
    { name: "Inicio", path: "/", url: canonical("/") },
    { name: title.split(" | ")[0], path, url: canonical(path) },
  ];
}

export function breadcrumbJsonLd(page: BreadcrumbPageKey) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbTrail(page).map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  };
}

/** A service page: its Service and the breadcrumb, as one graph. */
export function servicePageJsonLd(page: ServicePageKey) {
  const service = mainServices.find((s) => s.path === PAGES[page].path);
  if (!service) throw new Error(`No service for the page ${page}`);
  const { "@context": context, ...breadcrumb } = breadcrumbJsonLd(page);
  return { "@context": context, "@graph": [serviceNode(service), breadcrumb] };
}

/** The JSON-LD of a page, or undefined when it has none (noindex pages). */
export function jsonLdFor(page: PageKey): object | undefined {
  if (page === "home") return homeJsonLd();
  if ((SERVICE_PAGES as readonly PageKey[]).includes(page)) return servicePageJsonLd(page as ServicePageKey);
  if ((BREADCRUMB_PAGES as readonly PageKey[]).includes(page)) {
    return breadcrumbJsonLd(page as BreadcrumbPageKey);
  }
  return undefined;
}
