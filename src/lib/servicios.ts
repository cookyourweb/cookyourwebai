/**
 * The guarantee of the paid services, approved by the owner on 29-oct-2026.
 * It is always shown together with its conditions (components/GuaranteeNote).
 */
export const GUARANTEE = {
  text: "Garantía de 6 meses: si en 6 meses no recuperas lo que pagaste por la implementación, seguimos trabajando gratis hasta conseguirlo o te devolvemos el importe.",
  conditions:
    "Medimos juntos el ahorro y las ventas desde el inicio. No incluye herramientas de terceros y aplica si el sistema se usa como acordamos.",
};

/**
 * The four main services. The home renders them and the structured data
 * (lib/seo.ts) describes them, both from here, so they cannot drift apart.
 */
export const mainServices = [
  {
    id: "automatizacion-empresarial",
    slug: "automatizacion",
    path: "/servicios/automatizacion-ia-empresas",
    title: "Automatización Empresarial AI",
    price: "€799",
    description: "Transforma tu empresa con AI que opera 24/7 optimizando procesos críticos",
    gradient: "from-blue-500 via-purple-500 to-pink-500",
    features: [
      "Chatbots inteligentes para atención al cliente 24/7",
      "Automatización completa de procesos administrativos",
      "Análisis predictivo de datos empresariales",
      "Integración con CRM, ERP y sistemas existentes",
      "Formación especializada del equipo incluida"
    ],
    guarantee: true
  },
  {
    id: "funnels-ia-avanzados",
    slug: "funnels",
    path: "/servicios/funnels-ventas-ia",
    title: "Funnels AI Avanzados",
    price: "€1.299",
    description: "Sistema de ventas inteligente que se optimiza automáticamente para maximizar conversiones",
    gradient: "from-green-500 via-blue-500 to-purple-500",
    features: [
      "Lead magnets automáticos con AI generativa",
      "Nurturing personalizado según comportamiento usuario",
      "Agendado inteligente y cualificación automática",
      "Seguimiento predictivo para maximizar cierres",
      "CRM inteligente completamente integrado",
      "Dashboard de métricas y KPIs en tiempo real"
    ],
    guarantee: true
  },
  {
    id: "ia-influencer-avatares",
    slug: "avatares",
    path: "/servicios/avatares-ia",
    title: "AI Influencer & Avatares",
    price: "€4.999",
    description: "Crea tu gemelo digital inteligente que genera contenido y construye tu marca personal automáticamente",
    gradient: "from-pink-500 via-red-500 to-orange-500",
    features: [
      "Avatares digitales de CEOs y fundadores",
      "Generación automática de contenido personalizado",
      "Respuestas en tiempo real como si fueras tú",
      "Presencia digital 24/7 en todas las redes sociales",
      "Multiplica tu alcance sin multiplicar tu tiempo",
      "Integración completa email y WhatsApp Business"
    ],
    guarantee: true
  },
  {
    id: "consultoria-transformacion-ia",
    slug: "consultoria",
    path: "/servicios/consultoria-ia",
    title: "Consultoría Transformación AI",
    price: "GRATIS",
    description: "Auditoría completa para identificar oportunidades, implementar soluciones y medir ROI real",
    gradient: "from-emerald-500 via-teal-500 to-cyan-500",
    features: [
      "Auditoría profunda de procesos automatizables",
      "Estrategia de implementación gradual y escalable",
      "Formación especializada de equipos en herramientas AI",
      "Medimos el retorno de cada implementación",
      "Consulta estratégica de 60 minutos incluida",
      "Documento ejecutivo con recomendaciones"
    ],
    guarantee: false
  }
];
