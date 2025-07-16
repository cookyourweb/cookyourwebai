import Header from "@/components/Header";
import ArticleSearch from "@/components/ArticleSearch";
import SectionCard from "@/components/SectionCard";
import { Check } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
} from "@/components/ui/dialog";
import { OpenAIIcon } from "@/components/icons/OpenAIIcon";
import { ChatGPTIcon } from "@/components/icons/ChatGPTIcon";
import { OpenAIColorIcon } from "@/components/icons/OpenAIColorIcon";
import { AiChatbotIcon } from "@/components/icons/AiChatbotIcon";

const techLogos = [
  { name: "React", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  
  { name: "OpenAI", icon: OpenAIColorIcon },

  { name: "Docker", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  { name: "Python", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "Next.js", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
  { name: "FastAPI", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg" },
  { name: "Node.js", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "MongoDB", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
];

const testimonials = [
  {
    name: "María García - CEO TechCorp",
    text: "Automatizamos nuestro proceso de ventas con IA y aumentamos las conversiones un 340%. El ROI fue inmediato."
  },
  {
    name: "Carlos Mendoza - Director Marketing", 
    text: "El avatar IA de nuestro CEO genera contenido 24/7 y responde como si fuera él. Increíble."
  },
  {
    name: "Ana Ruiz - Gerente Operaciones",
    text: "Implementaron chatbots inteligentes que resuelven el 80% de consultas automáticamente. Ahorramos tiempo y dinero."
  }
];

const developerTestimonials = [
  {
    name: "Diego López - Full Stack Developer",
    text: "Pasé de no saber nada de IA a implementar modelos en producción en 3 meses. Los proyectos prácticos fueron clave."
  },
  {
    name: "Laura Jiménez - Frontend Developer",
    text: "Ahora integro APIs de IA en mis aplicaciones web sin problemas. Mi valor como desarrolladora se multiplicó."
  },
  {
    name: "Roberto Silva - Backend Developer",
    text: "Aprendí a crear mis propios endpoints de IA y ahora lidero proyectos de machine learning en mi empresa."
  }
];

const developerTracks = [
  {
    title: "Track Frontend: IA en el Cliente",
    level: "Desarrolladores Frontend/Fullstack",
    duration: "8-12 semanas",
    description: "Integra IA directamente en tus aplicaciones web",
    skills: [
      "APIs de OpenAI, Anthropic y otros proveedores",
      "Procesamiento de texto e imágenes en tiempo real",
      "Chatbots y asistentes conversacionales",
      "Generación de contenido automático",
      "Optimización de UX con IA predictiva"
    ],
    gradient: "from-neonblue via-neonpink to-neonviolet"
  },
  {
    title: "Track Backend: IA y Machine Learning",
    level: "Desarrolladores Backend/DevOps",
    duration: "12-16 semanas",
    description: "Construye la infraestructura que alimenta la IA",
    skills: [
      "Entrenamiento y fine-tuning de modelos",
      "APIs robustas para modelos de ML",
      "Bases de datos vectoriales y embeddings",
      "Deployment y escalabilidad de modelos",
      "MLOps y monitoreo de rendimiento"
    ],
    gradient: "from-neongreen via-neonpink to-neonblue"
  }
];

const pricingPlans = [
  {
    name: "Consultoría IA",
    price: "Gratis",
    description: "Auditoría inicial para identificar oportunidades",
    features: [
      "Análisis de procesos automatizables",
      "Estrategia de implementación",
      "ROI estimado de soluciones IA",
      "Consulta de 60 minutos",
      "Documento con recomendaciones"
    ],
    gradient: "from-neonblue/20 via-neonpink/10 to-neongreen/10",
    borderColor: "border-neonblue",
    popular: false,
    cta: "Solicitar Auditoría",
    ctaColor: "bg-gradient-to-r from-neonblue via-neonpink to-neonviolet"
  },
  {
    name: "Automatización Pro",
    price: "€2,999",
    description: "Implementación completa de IA empresarial",
    features: [
      "Chatbot inteligente personalizado",
      "Automatización de procesos clave",
      "Integración con sistemas existentes",
      "Dashboard de métricas y análisis",
      "Soporte técnico por 3 meses",
      "Formación del equipo incluida"
    ],
    gradient: "from-neonpink/20 via-neonviolet/10 to-neonblue/10",
    borderColor: "border-neonpink",
    popular: true,
    cta: "Contratar Ahora",
    ctaColor: "bg-gradient-to-r from-neonpink via-neonviolet to-neonblue"
  },
  {
    name: "Avatar IA Premium",
    price: "€4,999",
    description: "Tu gemelo digital que trabaja 24/7",
    features: [
      "Avatar personalizado con tu personalidad",
      "Generación automática de contenido",
      "Respuestas en redes sociales",
      "Integración con email y WhatsApp",
      "Análisis de engagement automático",
      "Actualizaciones y mejoras continuas"
    ],
    gradient: "from-neongreen/20 via-neonblue/10 to-neonpink/10",
    borderColor: "border-neongreen",
    popular: false,
    cta: "Crear Mi Avatar",
    ctaColor: "bg-gradient-to-r from-neongreen via-neonblue to-neonpink"
  }
];

const individualServices = [
  {
    name: "Chatbot Inteligente",
    price: "€1,499",
    description: "Asistente de IA para atención al cliente 24/7",
    features: [
      "Configuración y entrenamiento personalizado",
      "Integración con tu web o WhatsApp",
      "Base de conocimiento específica",
      "Métricas y analytics incluidos",
      "1 mes de soporte técnico"
    ],
    popular: false
  },
  {
    name: "Automatización de Procesos",
    price: "€899",
    description: "Automatiza tareas repetitivas con IA",
    features: [
      "Análisis de proceso específico",
      "Implementación de automatización",
      "Integración con herramientas existentes",
      "Documentación completa",
      "Formación del equipo"
    ],
    popular: true
  },
  {
    name: "Generador de Contenido IA",
    price: "€699",
    description: "IA que crea contenido para tu marca",
    features: [
      "Configuración de tono y estilo",
      "Templates personalizados",
      "Integración con redes sociales",
      "Calendario de contenido",
      "Revisión y optimización"
    ],
    popular: false
  },
  {
    name: "Web con IA Integrada",
    price: "€1,299",
    description: "Página web optimizada con funciones de IA",
    features: [
      "Diseño responsive profesional",
      "Chatbot integrado",
      "Formularios inteligentes",
      "SEO optimizado",
      "Hosting incluido 1 año"
    ],
    popular: false
  },
  {
    name: "Dashboard de Análisis IA",
    price: "€799",
    description: "Métricas e insights automáticos de tu negocio",
    features: [
      "Conectores a tus fuentes de datos",
      "Reportes automáticos",
      "Predicciones y tendencias",
      "Alertas inteligentes",
      "Acceso multi-usuario"
    ],
    popular: false
  },
  {
    name: "Formación IA Empresarial",
    price: "€499",
    description: "Capacitación para tu equipo en herramientas IA",
    features: [
      "Workshop de 4 horas",
      "Material de formación incluido",
      "Casos prácticos específicos",
      "Certificado de participación",
      "Seguimiento post-formación"
    ],
    popular: false
  }
];

const services = [
  {
    emoji: "🤖",
    label: "Automatización Empresarial IA",
    bullets: [
      "Chatbots inteligentes para atención al cliente 24/7",
      "Automatización de procesos administrativos",
      "Análisis predictivo de datos empresariales",
      "Integración con CRM, ERP y sistemas existentes"
    ]
  },
  {
    emoji: "🎯",
    label: "Funnels IA Avanzados",
    bullets: [
      "Lead magnets automáticos con IA generativa",
      "Nurturing personalizado según comportamiento",
      "Agendado inteligente y cualificación automática",
      "Seguimiento predictivo para maximizar cierres"
    ]
  },
  {
    emoji: "👤",
    label: "IA Influencer & Avatares",
    bullets: [
      "Avatares digitales de CEOs y fundadores",
      "Generación automática de contenido personalizado",
      "Respuestas en tiempo real como si fueras tú",
      "Presencia digital 24/7 en redes sociales"
    ]
  },
  {
    emoji: "🌐",
    label: "Desarrollo Web con IA",
    bullets: [
      "Páginas web generadas con IA en minutos",
      "Optimización SEO automática e inteligente",
      "Diseño adaptativo según audiencia objetivo",
      "Integración completa con herramientas IA"
    ]
  },
  {
    emoji: "📊",
    label: "Consultoría en Transformación IA",
    bullets: [
      "Auditoría de procesos susceptibles de automatizar",
      "Estrategia de implementación gradual",
      "Formación de equipos en herramientas IA",
      "ROI garantizado en implementaciones"
    ]
  }
];

const businessBenefits = [
  {
    title: "Transformación Digital Inteligente",
    details: [
      "Implementación gradual sin interrumpir operaciones actuales",
      "Integración con sistemas existentes (CRM, ERP, bases de datos)",
      "Monitorización en tiempo real del rendimiento IA",
      "Soporte técnico continuo y actualizaciones automáticas"
    ]
  }
];

const sections = [
  {
    id: "automatizacion",
    title: "Automatización Empresarial",
    description:
      "Transforma tu empresa con IA que trabaja 24/7: desde atención al cliente hasta análisis predictivo de ventas.",
    gradient: "from-neonblue via-neonpink to-neonviolet",
    content: (
      <div className="text-zinc-200 text-base leading-relaxed font-inter pt-2">
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <b>Chatbots superinteligentes</b>: atienden clientes, resuelven dudas complejas y escalan solo casos críticos.
          </li>
          <li>
            <b>Automatización de procesos</b>: desde facturación hasta gestión de inventarios con IA predictiva.
          </li>
          <li>
            <b>Análisis de datos en tiempo real</b>: insights automáticos para decisiones empresariales más inteligentes.
          </li>
        </ul>
      </div>
    )
  },
  {
    id: "funnels",
    title: "Funnels IA Avanzados",
    description:
      "Embudo de ventas que se optimiza solo: desde captar leads hasta cerrar ventas automáticamente con IA conversacional.",
    gradient: "from-neonviolet via-neongreen to-neonblue",
    content: (
      <div className="text-zinc-200 text-base leading-relaxed font-inter pt-2">
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <b>Lead magnets IA</b>: contenido personalizado generado automáticamente según perfil del visitante.
          </li>
          <li>
            <b>Nurturing inteligente</b>: secuencias que se adaptan al comportamiento y preferencias del lead.
          </li>
          <li>
            <b>Agendado automático</b>: IA que cualifica, agenda y prepara reuniones comerciales.
          </li>
        </ul>
      </div>
    )
  },
  {
    id: "avatares",
    title: "IA Influencer & Avatares",
    description:
      "Crea tu gemelo digital: un avatar IA que genera contenido, responde mensajes y construye tu marca personal automáticamente.",
    gradient: "from-neongreen via-neonpink to-neonviolet",
    content: (
      <div className="text-zinc-200 text-base leading-relaxed font-inter pt-2">
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <b>Avatar de CEO/Fundador</b>: responde emails, comentarios y mensajes como si fueras tú.
          </li>
          <li>
            <b>Contenido 24/7</b>: posts, artículos y respuestas generadas automáticamente con tu estilo.
          </li>
          <li>
            <b>Presencia digital infinita</b>: multiplica tu alcance sin multiplicar tu tiempo.
          </li>
        </ul>
      </div>
    )
  },
  {
    id: "desarrollo",
    title: "Desarrollo Web con IA",
    description:
      "Páginas web que se crean, optimizan y mejoran solas usando IA generativa y análisis de comportamiento de usuarios.",
    gradient: "from-neonpink via-neonviolet to-neonblue",
    content: (
      <div className="text-zinc-200 text-base leading-relaxed font-inter pt-2">
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <b>Generación automática</b>: describe tu negocio y obtienes una web completa en minutos.
          </li>
          <li>
            <b>Optimización continua</b>: la IA mejora conversiones automáticamente según datos reales.
          </li>
          <li>
            <b>SEO inteligente</b>: contenido optimizado que se adapta a tendencias y algoritmos.
          </li>
        </ul>
      </div>
    )
  },
  {
    id: "consultoria",
    title: "Consultoría en Transformación IA",
    description:
      "Te ayudamos a identificar oportunidades, implementar soluciones y medir ROI en tu transformación digital con IA.",
    gradient: "from-neonblue via-neonpink to-neongreen",
    content: (
      <div className="text-zinc-200 text-base leading-relaxed font-inter pt-2">
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <b>Auditoría de procesos</b>: identificamos qué automatizar primero para máximo impacto.
          </li>
          <li>
            <b>Implementación gradual</b>: sin interrumpir operaciones, con resultados medibles.
          </li>
          <li>
            <b>Formación de equipos</b>: tu personal aprende a trabajar con las nuevas herramientas IA.
          </li>
        </ul>
      </div>
    )
  }
];

export default function Index() {
  return (
    <div className="relative min-h-screen w-full bg-black font-inter">
      {/* --- HERO SECTION --- */}
      <header>
        <Header />
        <div className="container mx-auto flex flex-col items-center pt-24 text-center animate-fade-in">
          <h1 className="font-playfair text-5xl md:text-7xl text-neonviolet font-bold mb-4 drop-shadow">
            Transforma tu Empresa con <span className="bg-gradient-to-r from-neonblue via-neonpink to-neongreen bg-clip-text text-transparent animate-pulse-neon">IA</span>
          </h1>
          <p className="text-2xl md:text-3xl text-zinc-200 mb-6 max-w-3xl mx-auto">
            Soluciones de automatización con Inteligencia Artificial para empresas que buscan transformación digital real.
          </p>
          <div className="flex gap-6 justify-center mb-8">
            <a href="#contacto" className="px-8 py-3 rounded-2xl text-lg font-bold text-black bg-gradient-to-r from-neonblue via-neonpink to-neonviolet shadow-lg hover:scale-110 transition-all border-none">
              Solicita tu Auditoría IA Gratis
            </a>
            <a href="#desarrolladores" className="px-8 py-3 rounded-2xl text-lg font-bold text-white bg-gradient-to-r from-neonviolet via-neonblue to-neonpink shadow-lg border-2 border-neonpink hover:scale-110 transition-all">
              Formación para Desarrolladores
            </a>
          </div>
          {/* VIDEO/ANIMACIÓN DEMO */}
          <div className="w-full flex items-center justify-center mb-8">
            <Dialog>
              <DialogTrigger asChild>
                <img
                  src="/placeholder.png"
                  alt="Video placeholder"
                  className="rounded-2xl shadow-xl w-[320px] md:w-[580px] border-4 border-neonpink cursor-pointer"
                />
              </DialogTrigger>
              <DialogContent className="max-w-4xl p-0">
                <iframe
                  src="https://www.youtube.com/embed/luDoX9aeW58"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  className="w-full aspect-video rounded-lg"
                  title="YouTube Video"
                />
              </DialogContent>
            </Dialog>
          </div>
          {/* LOGOS TECNOLOGÍAS */}
          <div className="flex flex-wrap items-center justify-center gap-6 mb-10 opacity-80">
          {techLogos.map(logo => (
            logo.icon ? (
              <logo.icon key={logo.name} className="h-10 md:h-12 text-white grayscale hover:grayscale-0 transition" />
            ) : (
              <img src={logo.src} alt={logo.name} title={logo.name} key={logo.name} className="h-10 md:h-12 object-contain grayscale hover:grayscale-0 transition" />
            )
          ))}
          </div>
          {/* TESTIMONIOS */}
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6 text-left">
              {testimonials.map((t, idx) => (
                <div key={idx} className="bg-gradient-to-br from-neonblue/20 via-neonpink/10 to-neongreen/10 rounded-2xl px-5 py-4 shadow border border-neonblue/20">
                  <span className="block mb-2 text-sm text-neonpink font-bold">{t.name}</span>
                  <span className="text-base text-zinc-200">{t.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>
      {/* --- END HERO --- */}

      <main className="container mx-auto px-8 pt-16 pb-24 animate-fade-in">
        {/* --- SERVICIOS EMPRESARIALES --- */}
        <section className="mb-32 text-center">
          <h2 className="font-playfair text-4xl md:text-5xl text-neonviolet font-bold mb-7">Servicios de IA para <span className="text-neonpink">Empresas</span></h2>
          <p className="text-xl text-zinc-300 mb-10 max-w-3xl mx-auto">
            Soluciones de automatización inteligente diseñadas para empresas medianas y grandes que buscan ventaja competitiva.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {services.map((service, idx) => (
              <div key={service.label} className={`${service.label === 'Funnels IA Avanzados' ? 'bg-gradient-to-br from-neonviolet/20 via-neongreen/15 to-neonblue/15' : 'bg-gradient-to-br from-neonblue/10 via-neonpink/5 to-neongreen/10'} rounded-3xl border-2 border-zinc-800 p-7 shadow-xl transition hover:scale-105`}>
                <div className="text-4xl mb-2">{service.emoji}</div>
                <h3 className="text-2xl font-bold text-neonblue mb-2">{service.label}</h3>
                <ul className="text-zinc-200 font-inter text-base leading-relaxed list-disc pl-5 text-left space-y-2">
                  {service.bullets.map(bullet => <li key={bullet}>{bullet}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* --- SECCIÓN DE PRECIOS PAQUETES --- */}
        <section id="precios" className="mb-32">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl md:text-5xl text-neonpink font-bold mb-7">
              Paquetes <span className="text-neonblue">Completos</span>
            </h2>
            <p className="text-xl text-zinc-300 mb-4 max-w-3xl mx-auto">
              Soluciones integrales para transformar tu empresa con IA. Desde auditoría gratuita hasta implementación completa.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, idx) => (
              <div key={idx} className={`relative bg-gradient-to-br ${plan.gradient} rounded-3xl border-2 ${plan.borderColor} p-8 shadow-xl transition hover:scale-105 ${plan.popular ? 'ring-4 ring-neonpink/50' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-neonpink to-neonviolet text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                      MÁS POPULAR
                    </span>
                  </div>
                )}
                
                <div className="bg-black/60 p-6 rounded-2xl h-full flex flex-col">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-playfair font-bold text-white mb-2">{plan.name}</h3>
                    <div className="text-4xl font-bold text-neonblue mb-2">{plan.price}</div>
                    <p className="text-zinc-300 text-sm">{plan.description}</p>
                  </div>

                  <ul className="flex-1 space-y-3 mb-8">
                    {plan.features.map((feature, featureIdx) => (
                      <li key={featureIdx} className="flex items-start text-zinc-200">
                        <Check className="w-5 h-5 text-neongreen mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button className={`w-full ${plan.ctaColor} text-black font-bold py-3 px-6 rounded-2xl shadow hover:scale-105 transition bg-gradient-to-r`}>
                    {plan.cta}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* --- NUEVA SECCIÓN SERVICIOS INDIVIDUALES --- */}
        <section id="servicios-individuales" className="mb-32">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl md:text-5xl text-neongreen font-bold mb-7">
              Servicios <span className="text-neonpink">Individuales</span>
            </h2>
            <p className="text-xl text-zinc-300 mb-4 max-w-3xl mx-auto">
              Elige servicios específicos según tus necesidades. Perfectos para empresas que quieren empezar gradualmente con IA.
            </p>
            <p className="text-neonblue font-bold">
              💡 Combina varios servicios y obtén descuentos especiales
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {individualServices.map((service, idx) => (
              <div key={idx} className={`relative bg-gradient-to-br from-zinc-900/90 to-zinc-800/90 rounded-3xl border-2 border-zinc-700 p-6 shadow-xl transition hover:scale-105 hover:border-neonblue ${service.popular ? 'ring-2 ring-neongreen/50' : ''}`}>
                {service.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-neongreen to-neonblue text-black px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                      POPULAR
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-4">
                  <h3 className="text-xl font-playfair font-bold text-white mb-2">{service.name}</h3>
                  <div className="text-3xl font-bold text-neonblue mb-2">{service.price}</div>
                  <p className="text-zinc-300 text-sm">{service.description}</p>
                </div>

                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, featureIdx) => (
                    <li key={featureIdx} className="flex items-start text-zinc-200 text-sm">
                      <Check className="w-4 h-4 text-neongreen mr-2 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button className="w-full bg-gradient-to-r from-neonblue to-neonpink text-black font-bold py-2 px-4 rounded-xl shadow hover:scale-105 transition text-sm">
                  Contratar Servicio
                </button>
              </div>
            ))}
          </div>

          <div className="text-center mt-12 p-6 rounded-2xl border-2 border-neongreen max-w-4xl mx-auto bg-gradient-to-r from-neongreen via-neonblue to-neonpink">
            <h3 className="text-2xl font-playfair text-black mb-3">
              ¿Necesitas una <span className="text-neonpink">Combinación Personalizada</span>?
            </h3>
            <p className="text-black mb-4">
              <strong>Descuentos por volumen:</strong> Combina 3 o más servicios y obtén hasta un 25% de descuento. 
              También ofrecemos planes de pago flexibles para empresas.
            </p>
            <a href="#contacto" className="inline-block bg-gradient-to-r from-neongreen to-neonblue text-black font-bold py-3 px-6 rounded-2xl shadow hover:scale-105 transition">
              Solicitar Presupuesto Personalizado
            </a>
          </div>
        </section>

        {/* --- NUEVA SECCIÓN PARA DESARROLLADORES --- */}
        <section id="desarrolladores" className="mb-32">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl md:text-5xl text-neongreen font-bold mb-7">
              Formación IA para <span className="text-neonpink">Desarrolladores</span>
            </h2>
            <p className="text-xl text-zinc-300 mb-4 max-w-3xl mx-auto">
              Domina la Inteligencia Artificial desde tu stack tecnológico. Dos tracks especializados para que integres IA en tus proyectos.
            </p>
            <p className="text-lg text-neonblue font-bold">
              🚀 De Desarrollador a AI Engineer en 12-16 semanas
            </p>
          </div>

          {/* TRACKS DE FORMACIÓN */}
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            {developerTracks.map((track, idx) => (
              <div key={idx} className={`bg-gradient-to-br ${track.gradient} p-8 rounded-3xl border-2 shadow-xl`}>
                <div className="bg-black/60 p-6 rounded-2xl">
                  <h3 className="text-2xl font-playfair font-bold text-white mb-2">{track.title}</h3>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-neonpink font-bold text-sm">{track.level}</span>
                    <span className="text-neonblue font-bold text-sm">{track.duration}</span>
                  </div>
                  <p className="text-zinc-200 mb-4 text-base">{track.description}</p>
                  <ul className="text-zinc-200 space-y-2 text-sm">
                    {track.skills.map((skill, skillIdx) => (
                      <li key={skillIdx} className="flex items-start">
                        <span className="text-neongreen mr-2">✓</span>
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* TESTIMONIOS DE DESARROLLADORES */}
          <div className="bg-zinc-900/90 p-8 rounded-3xl border-2 border-neongreen">
            <h3 className="text-2xl font-playfair text-neongreen mb-6 text-center">
              Lo que dicen nuestros <span className="text-neonpink">AI Engineers</span>
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {developerTestimonials.map((testimonial, idx) => (
                <div key={idx} className="bg-gradient-to-br from-neongreen/20 via-neonblue/10 to-neonpink/10 rounded-2xl p-5 border border-neongreen/20">
                  <span className="block mb-2 text-sm text-neongreen font-bold">{testimonial.name}</span>
                  <span className="text-base text-zinc-200">{testimonial.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA DESARROLLADORES */}
          <div className="text-center mt-12">
            <div className="bg-gradient-to-r from-neongreen via-neonblue to-neonpink p-8 rounded-3xl">
              <h3 className="text-3xl font-playfair font-bold text-black mb-4">
                ¿Listo para ser un AI Engineer?
              </h3>
              <p className="text-black mb-6 text-lg max-w-2xl mx-auto">
                <b>Plazas limitadas:</b> Solo 20 desarrolladores por cohorte para garantizar mentoría personalizada
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <a href="#contacto-dev" className="px-8 py-3 bg-black text-neongreen font-bold rounded-2xl shadow hover:scale-105 transition border-2 border-neongreen">
                  Solicitar Información Frontend
                </a>
                <a href="#contacto-dev" className="px-8 py-3 bg-black text-neonblue font-bold rounded-2xl shadow hover:scale-105 transition border-2 border-neonblue">
                  Solicitar Información Backend
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* --- MÉTODO DE IMPLEMENTACIÓN --- */}
        <section className="max-w-3xl mx-auto mb-20 bg-zinc-900/90 p-8 rounded-3xl shadow-2xl border-2 border-neonpink text-center">
          <h2 className="text-3xl font-playfair text-neonpink mb-3">¿Cómo implementamos la IA en tu empresa?</h2>
          <ul className="text-zinc-200 space-y-4 text-left mt-4 font-inter">
            {businessBenefits[0].details.map(d => <li key={d}><span className="text-neonblue">✔</span> {d}</li>)}
          </ul>
        </section>

        {/* --- SECCIÓN CONTACTO EMPRESARIAL --- */}
        <section id="contacto" className="max-w-2xl mx-auto mb-20 bg-zinc-900/90 p-8 rounded-3xl shadow-2xl border-2 border-neonblue text-center">
          <iframe
            src="https://tally.so/r/n0YDZ0"
            className="w-full h-[700px] rounded-3xl border-0"
            title="Formulario de Contacto Empresarial"
          />
        </section>

        {/* --- CONTACTO DESARROLLADORES --- */}
        <section id="contacto-dev" className="max-w-2xl mx-auto mb-20 bg-zinc-900/90 p-8 rounded-3xl shadow-2xl border-2 border-neongreen text-center">
          <iframe
            src="https://tally.so/r/n00406"
            className="w-full h-[850px] rounded-3xl border-0"
            title="Formulario de Contacto Desarrolladores"
          />
        </section>
        
        {/* --- SECCIONES DETALLADAS --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 mb-14">
          {sections.map((s) => (
            <SectionCard
              key={s.id}
              id={s.id}
              title={s.title}
              description={s.description}
              gradient={`bg-gradient-to-br ${s.gradient}`}
            >
              {s.content}
            </SectionCard>
          ))}
        </div>

        {/* --- CTA FINAL --- */}
          <section className="max-w-2xl mx-auto mt-16 bg-gradient-to-r from-neonviolet via-neonblue to-neonpink p-8 rounded-3xl shadow-2xl border-2 border-neonpink text-center">
          <h2 className="text-3xl font-playfair text-neonpink mb-3">¿Listo para la Transformación IA?</h2>
          <p className="text-zinc-200 mb-4">
            <b>Automatiza procesos, incrementa ventas y reduce costos</b> con soluciones de IA diseñadas específicamente para tu empresa. Implementación rápida, ROI garantizado.
          </p>
          <a href="mailto:info@cookyourweb.es" className="inline-block font-bold font-inter bg-gradient-to-r from-neonviolet via-neonblue to-neonpink px-8 py-3 rounded-xl text-black shadow hover:scale-110 transition">Empezar Transformación IA →</a>
        </section>
        
        <footer className="mt-24 pt-12 pb-8 text-center text-zinc-500 text-sm">
          © {new Date().getFullYear()} cookYourWeb.es · Agencia de IA & Automatización Empresarial · Hecho con <span className="text-neonpink">❤</span> y mucha IA
        </footer>
      </main>
    </div>
  );
}
