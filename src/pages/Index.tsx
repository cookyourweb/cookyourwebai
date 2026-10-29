import React, { useState, useEffect } from 'react';
import { Check, X } from "lucide-react";
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import GuaranteeNote from '@/components/GuaranteeNote';
import AuditDialog from '@/components/AuditDialog';
import { useAudit } from '@/components/audit-context';
import DeveloperContactForm from '../components/DeveloperContactForm';
import { cargarGtm } from '../lib/gtm';
import { Dialog, DialogContent, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { COMPANY } from "@/lib/company";
import Seo from "@/components/Seo";
import { mainServices } from "@/lib/servicios";

// Iconos originales del proyecto
const OpenAIColorIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"/>
  </svg>
);

// Devicon logos (MIT), served from our own domain: no third-party CDN.
const techLogos = [
  { name: "React", src: "/logos/react.svg" },
  { name: "OpenAI", icon: OpenAIColorIcon },
  { name: "Docker", src: "/logos/docker.svg" },
  { name: "Python", src: "/logos/python.svg" },
  { name: "Next.js", src: "/logos/nextjs.svg" },
  { name: "FastAPI", src: "/logos/fastapi.svg" },
  { name: "Node.js", src: "/logos/nodejs.svg" },
  { name: "MongoDB", src: "/logos/mongodb.svg" },
];


const individualServices = [
  {
    name: "Setup Chatbot Profesional",
    price: "€299",
    description: "Chatbot inteligente implementado y operativo en 48h",
    baseService: "Automatización",
    features: [
      "Configuración chatbot personalizado",
      "Entrenamiento con tu información específica",
      "Integración web completa o WhatsApp Business",
      "Métricas y analytics básicos incluidos",
      "Soporte técnico especializado 1 semana"
    ],
    popular: false
  },
  {
    name: "Automatización Proceso Específico",
    price: "€499",
    description: "Automatiza completamente 1 proceso administrativo crítico",
    baseService: "Automatización",
    features: [
      "Análisis detallado del proceso específico",
      "Implementación completa de automatización",
      "Integración con herramientas existentes",
      "Documentación técnica completa",
      "Formación especializada del equipo"
    ],
    popular: true
  },
  {
    name: "Landing Page AI Optimizada",
    price: "€599",
    description: "Landing page optimizada con AI para máxima conversión",
    baseService: "Funnels",
    features: [
      "Landing page optimizada con AI",
      "Lead magnet automático integrado",
      "Formularios inteligentes avanzados",
      "A/B testing automático incluido",
      "Analytics avanzados y reportes"
    ],
    popular: false
  },
  {
    name: "Lead Magnet Automático",
    price: "€399",
    description: "Sistema que genera leads 24/7 con contenido AI personalizado y reportes",
    baseService: "Funnels",
    features: [
      "Generación automática de contenido relevante",
      "Segmentación inteligente de leads",
      "Secuencias de email personalizadas",
      "Integración completa con CRM",
      "Métricas de conversión detalladas"
    ],
    popular: false
  },
  {
    name: "Avatar Redes Sociales Pro",
    price: "€1.999",
    description: "Avatar AI que genera contenido viral en redes sociales",
    baseService: "Avatares",
    features: [
      "Avatar personalizado profesional",
      "Generación automática de posts",
      "Respuestas inteligentes a comentarios",
      "Programación de contenido avanzada",
      "Analytics de engagement completos"
    ],
    popular: false
  },
  {
    name: "Generador Contenido AI Pro",
    price: "€699",
    description: "AI que crea contenido de marca automáticamente optimizado",
    baseService: "Avatares",
    features: [
      "Configuración de tono y estilo de marca",
      "Templates personalizados avanzados",
      "Calendario de contenido automático",
      "Integración con todas las redes sociales",
      "Revisión y optimización continua"
    ],
    popular: false
  }
];

const featuredPackages = [
  {
    name: "Auditoría AI Gratuita",
    price: "Gratis",
    description: "Descubre oportunidades ocultas de automatización en tu negocio",
    features: [
      "Auditoría completa de procesos automatizables",
      "Estrategia de implementación personalizada",
      "ROI estimado de soluciones AI",
      "Consulta estratégica de 60 minutos",
      "Documento ejecutivo con recomendaciones"
    ],
    gradient: "from-blue-500/20 via-purple-500/10 to-cyan-500/10",
    borderColor: "border-blue-500",
    cta: "Solicitar Auditoría Gratuita",
    ctaColor: "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
  },
  {
    name: "Transformación Completa",
    price: "€2.999",
    description: "Automatización + Funnels + Consultoría en solución integral",
    features: [
      "Automatización Empresarial AI (€799)",
      "Funnels AI Avanzados (€1,299)",
      "Consultoría estratégica personalizada",
      "Integración completa con sistemas existentes",
      "Soporte técnico especializado 3 meses",
      "Formación completa del equipo incluida"
    ],
    gradient: "from-purple-500/20 via-pink-500/10 to-blue-500/10",
    borderColor: "border-purple-500",
    popular: true,
    cta: "Transformar Mi Empresa Ahora",
    ctaColor: "bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500",
    savings: "Ahorro: €98 (antes €2,098 + consultoría)"
  },
  {
    name: "Empire Builder Pro",
    price: "€4.999",
    description: "Avatar digital + automatización completa + escalamiento",
    features: [
      "AI Influencer & Avatares (€4,999)",
      "Funnels AI Avanzados (€1,299)",
      "Automatización Empresarial (€799)",
      "Consultoría estratégica avanzada",
      "Integración y escalamiento completo",
      "Soporte premium y mentoring 6 meses"
    ],
    gradient: "from-emerald-500/20 via-teal-500/10 to-cyan-500/10",
    borderColor: "border-emerald-500",
    cta: "Crear Mi Imperio Digital",
    ctaColor: "bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500",
    savings: "Ahorro: €2,097 (antes €7,096 + consultoría)"
  }
];

const developerTracks = [
  {
    title: "Track Frontend: AI en Cliente",
    level: "Desarrolladores Frontend/Fullstack",
    duration: "8-12 semanas intensivas",
    description: "Domina la integración de AI directamente en aplicaciones web modernas",
    skills: [
      "APIs de OpenAI, Anthropic y otros proveedores",
      "Procesamiento de texto e imágenes en tiempo real",
      "Chatbots y asistentes conversacionales avanzados",
      "Generación de contenido automático",
      "Optimización de UX con AI predictiva"
    ],
    gradient: "from-blue-500 via-purple-500 to-pink-500"
  },
  {
    title: "Track Backend: AI y Machine Learning",
    level: "Desarrolladores Backend/DevOps",
    duration: "12-16 semanas intensivas",
    description: "Construye la infraestructura robusta que alimenta sistemas de AI",
    skills: [
      "Entrenamiento y fine-tuning de modelos",
      "APIs robustas para modelos de ML en producción",
      "Bases de datos vectoriales y embeddings",
      "Deployment y escalabilidad de modelos",
      "MLOps y monitoreo de rendimiento avanzado"
    ],
    gradient: "from-emerald-500 via-teal-500 to-blue-500"
  }
];

// Service Card Component
type MainService = {
  id: string;
  path: string;
  title: string;
  price: string;
  description: string;
  gradient: string;
  features: string[];
  guarantee: boolean;
};

const ServiceCard = ({ service, onContactClick }: { service: MainService; onContactClick: () => void }) => (
  <div className={`relative group overflow-hidden rounded-3xl bg-gradient-to-br ${service.gradient} p-1 transition-all duration-300 hover:scale-105`}>
    <div className="bg-black/80 rounded-3xl p-6 md:p-8 h-full flex flex-col">
      <div className="mb-6">
        <h3 className="text-xl md:text-2xl font-bold text-white mb-3" id={service.id}>
          <Link to={service.path} className="inline-block min-h-11 py-2 hover:underline">
            {service.title}
          </Link>
        </h3>
        <p className="text-zinc-200 text-sm md:text-base leading-relaxed">
          {service.description}
        </p>
      </div>
      
      <div className="flex-1">
        <div className="text-2xl md:text-3xl font-bold text-blue-400 mb-6">{service.price}</div>
        <ul className="space-y-3 text-white text-sm md:text-base mb-8">
          {service.features.map((feature, idx) => (
            <li key={idx} className="flex items-start">
              <Check className="h-4 w-4 md:h-5 md:w-5 text-green-400 mr-3 mt-1 flex-shrink-0" />
              <span className="leading-relaxed">{feature}</span>
            </li>
          ))}
        </ul>
        {service.guarantee && <GuaranteeNote className="mb-8" />}
      </div>

      <button
        onClick={onContactClick}
        className="w-full py-3 md:py-4 px-6 rounded-xl text-sm md:text-base font-bold text-white bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:scale-105 transition-all shadow-lg"
      >
        Solicitar Información
      </button>
    </div>
  </div>
);

// CTA Section Component
const CTASection = ({ 
  title, 
  description, 
  buttonText, 
  buttonAction, 
  gradient = "from-blue-500/20 via-purple-500/20 to-pink-500/20" 
}: {
  title: string;
  description: string;
  buttonText: string;
  buttonAction: () => void;
  gradient?: string;
}) => (
  <section className={`my-16 md:my-20 bg-gradient-to-r ${gradient} rounded-3xl border border-zinc-800 p-6 md:p-8 text-center`}>
    <div className="max-w-4xl mx-auto">
      <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">{title}</h3>
      <p className="text-lg md:text-xl text-zinc-200 mb-6 md:mb-8 max-w-2xl mx-auto leading-relaxed">{description}</p>
      <button 
        onClick={buttonAction}
        className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-bold py-3 md:py-4 px-6 md:px-8 rounded-2xl shadow-xl hover:scale-105 transition-all text-base md:text-lg"
      >
        {buttonText}
      </button>
    </div>
  </section>
);

export default function OptimizedLandingPage() {
  const [showContactForm, setShowContactForm] = useState(false);
  const [showDevForm, setShowDevForm] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  // The page is prerendered, where there is no localStorage: the stored choice
  // is read after mount, and the banner waits for it (no flash, no mismatch).
  const [cookieConsent, setCookieConsent] = useState(false);
  const [consentLoaded, setConsentLoaded] = useState(false);
  const [showPreferencesModal, setShowPreferencesModal] = useState(false);
  const [statisticsCookies, setStatisticsCookies] = useState(false);

  useEffect(() => {
    setCookieConsent(localStorage.getItem('cookieConsent') === 'true');
    setStatisticsCookies(localStorage.getItem('statisticsCookies') === 'true');
    setConsentLoaded(true);
  }, []);

  // Tell the shell whether the cookie banner is on screen, so the sticky audit bar steps aside.
  const { setCookieBannerVisible } = useAudit();
  const bannerVisible = consentLoaded && !cookieConsent;
  useEffect(() => {
    setCookieBannerVisible(bannerVisible);
    return () => setCookieBannerVisible(false);
  }, [bannerVisible, setCookieBannerVisible]);

  const acceptCookies = () => {
    setCookieConsent(true);
    setStatisticsCookies(true);
    localStorage.setItem('cookieConsent', 'true');
    localStorage.setItem('statisticsCookies', 'true');
    cargarGtm();
  };

  const rejectCookies = () => {
    setCookieConsent(false);
    setStatisticsCookies(false);
    localStorage.setItem('cookieConsent', 'false');
    localStorage.setItem('statisticsCookies', 'false');
  };

  // `estadistica` se pasa explicitamente porque el estado de React no se
  // actualiza de forma sincrona: leerlo aqui despues de setStatisticsCookies(true)
  // devolveria el valor anterior y se guardaria un consentimiento equivocado.
  const savePreferences = (estadistica = statisticsCookies) => {
    localStorage.setItem('cookieConsent', 'true');
    localStorage.setItem('statisticsCookies', estadistica ? 'true' : 'false');
    setCookieConsent(true);
    setShowPreferencesModal(false);
    if (estadistica) cargarGtm();
  };

  const acceptAll = () => {
    setStatisticsCookies(true);
    savePreferences(true);
  };

  const rejectAll = () => {
    setStatisticsCookies(false);
    savePreferences(false);
  };

  return (
    <div className="relative min-h-screen w-full bg-black text-white font-sans">
      <Seo page="home" />

      <main id="main-content" tabIndex={-1}>

      {/* HERO SECTION */}
      <section className="pt-12 md:pt-20 pb-16 md:pb-20">
        <div className="container mx-auto px-4 md:px-8 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 leading-tight">
            Transforma tu Empresa con{' '}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              AI
            </span>
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-zinc-300 mb-8 max-w-4xl leading-relaxed">
            Automatiza procesos críticos, multiplica ventas entre <strong className="text-blue-400">20%-100%</strong> y 
            libera tiempo estratégico mientras tu empresa opera de forma inteligente las 24 horas.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-12 w-full max-w-2xl">
            <button 
              onClick={() => setShowContactForm(true)}
              className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 rounded-2xl text-base md:text-lg font-bold text-white bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 shadow-lg hover:scale-105 transition-all"
            >
              🎯 Auditoría AI Gratuita
            </button>
            <a 
              href="#desarrolladores" 
              className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 rounded-2xl text-base md:text-lg font-bold text-white bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 shadow-lg hover:scale-105 transition-all text-center"
            >
              👨‍💻 Formación Desarrolladores
            </a>
          </div>
          
          {/* Aqui iba un bloque "Ver Demo en Accion". Quitado el 18-ago-2026: no era un
              video, era una foto de stock de Unsplash con un boton de play encima,
              presentada como demo del producto, y el clic abria usecookyourwebai.es,
              que es la landing del master montada en HighLevel: ya no hay acceso y el
              dominio no resuelve. Un enlace muerto dice "esto esta abandonado" mas
              fuerte que no tener video.
              Cuando haya demo real va aqui. Ver WEB-COOKYOURWEB-PENDIENTES.md */}

          <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              ¿Sigues perdiendo clientes mientras tu competencia Automatiza con IA?
            </span>
          </h2>

          {/* TECH LOGOS */}
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 mb-12 opacity-70">
            {techLogos.map(logo => (
              logo.icon ? (
                <logo.icon key={logo.name} className="h-8 md:h-10 text-white hover:opacity-100 transition-opacity" />
              ) : (
                <img 
                  src={logo.src} 
                  alt={logo.name} 
                  key={logo.name} 
                  className="h-8 md:h-10 object-contain hover:opacity-100 transition-opacity filter brightness-0 invert" 
                />
              )
            ))}
          </div>
          </div>
      </section>

      <div className="container mx-auto px-4 md:px-8 pb-24">

        {/* SERVICIOS PRINCIPALES */}
        <section id="servicios" className="mb-20 md:mb-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              Servicios de AI para <span className="text-purple-400">Empresas</span>
            </h2>
            <p className="text-lg md:text-xl text-zinc-300 mb-6 max-w-4xl mx-auto leading-relaxed">
              Soluciones de automatización inteligente diseñadas para empresas que buscan 
              <strong className="text-blue-400"> ventaja competitiva real</strong> y resultados medibles.
            </p>
            <div className="bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-full px-6 py-3 inline-block">
              <span className="text-base md:text-lg text-emerald-400 font-bold">
                🛡️ Garantía de 6 meses en todos nuestros servicios de pago
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {mainServices.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onContactClick={() => setShowContactForm(true)}
              />
            ))}
          </div>
        </section>

        {/* CTA POST SERVICIOS */}
        <CTASection
          title="🚀 ¿Cuál es la solución perfecta para tu empresa?"
          description="Cada negocio es único. Descubre exactamente qué servicio de AI multiplicará tus resultados y te dará ventaja competitiva sostenible."
          buttonText="Descubre Tu Solución Ideal"
          buttonAction={() => setShowContactForm(true)}
          gradient="from-blue-500/20 via-purple-500/20 to-pink-500/20"
        />

        {/* SERVICIOS INDIVIDUALES */}
        <section id="servicios-individuales" className="mb-20 md:mb-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              Servicios <span className="text-emerald-400">Individuales</span>
            </h2>
            <p className="text-lg md:text-xl text-zinc-300 mb-6 max-w-4xl mx-auto leading-relaxed">
              Soluciones específicas y modulares. Perfectas para empresas que quieren empezar gradualmente con AI.
            </p>
            <div className="bg-gradient-to-r from-blue-500/20 to-emerald-500/20 rounded-full px-6 py-3 inline-block">
              <span className="text-base md:text-lg text-blue-400 font-bold">
                💰 Combina varios servicios y obtén descuentos especiales
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
            {individualServices.map((service, idx) => (
              <div key={idx} className={`relative bg-zinc-900/90 backdrop-blur rounded-3xl border-2 border-zinc-800 p-6 shadow-xl transition-all hover:scale-105 hover:border-blue-500 ${service.popular ? 'ring-2 ring-emerald-500/50' : ''}`}>
                {service.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white px-4 py-1 rounded-full text-xs font-bold shadow-lg">
                      ⭐ POPULAR
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <div className="text-xs text-purple-400 font-bold mb-2 uppercase tracking-wide">
                    Basado en: {service.baseService}
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-white mb-3 leading-tight">
                    {service.name}
                  </h3>
                  <div className="text-2xl md:text-3xl font-bold text-blue-400 mb-3">
                    {service.price}
                  </div>
                  <p className="text-zinc-300 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, featureIdx) => (
                    <li key={featureIdx} className="flex items-start text-zinc-200 text-sm">
                      <Check className="w-4 h-4 text-emerald-400 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button 
                  onClick={() => setShowContactForm(true)}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-3 px-4 rounded-xl shadow hover:scale-105 transition text-sm"
                >
                  Contratar Servicio
                </button>
              </div>
            ))}
          </div>

          <div className="text-center mt-16 bg-zinc-900/90 backdrop-blur p-6 md:p-8 rounded-3xl border-2 border-emerald-500 max-w-4xl mx-auto">
            <h3 className="text-xl md:text-2xl font-bold text-emerald-400 mb-4">
              ¿Necesitas una <span className="text-purple-400">Combinación Personalizada</span>?
            </h3>
            <p className="text-zinc-300 mb-6 text-sm md:text-base leading-relaxed">
              <strong>Descuentos por volumen:</strong> Combina 3 o más servicios y obtén hasta un 25% de descuento. 
              También ofrecemos planes de pago flexibles para empresas.
            </p>
            <button 
              onClick={() => setShowContactForm(true)}
              className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-bold py-3 px-6 rounded-2xl shadow hover:scale-105 transition"
            >
              Solicitar Presupuesto Personalizado
            </button>
          </div>
        </section>

        {/* CTA POST SERVICIOS INDIVIDUALES */}
        <CTASection
          title="💰 Combina servicios y maximiza tu ahorro"
          description="No gastes de más. Combina 3 o más servicios individuales y obtén hasta 25% de descuento + plan de pago personalizado."
          buttonText="Combina y Ahorra hasta 25%"
          buttonAction={() => setShowContactForm(true)}
          gradient="from-emerald-500/20 via-blue-500/20 to-purple-500/20"
        />

        {/* PAQUETES DESTACADOS */}
        <section id="paquetes" className="mb-20 md:mb-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              Paquetes <span className="text-purple-400">Destacados</span>
            </h2>
            <p className="text-lg md:text-xl text-zinc-300 mb-6 max-w-4xl mx-auto leading-relaxed">
              Soluciones integrales para transformar tu empresa con AI. Desde auditoría gratuita hasta implementación completa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
            {featuredPackages.map((plan, idx) => (
              <div key={idx} className={`relative bg-gradient-to-br ${plan.gradient} border-2 ${plan.borderColor} rounded-3xl p-1 shadow-xl transition-all hover:scale-105 ${plan.popular ? 'ring-4 ring-purple-500/50' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-purple-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                      🔥 MÁS POPULAR
                    </span>
                  </div>
                )}
                
                <div className="bg-black/90 p-6 md:p-8 rounded-3xl h-full flex flex-col">
                  <div className="text-center mb-6">
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
                      {plan.name}
                    </h3>
                    <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-3">
                      {plan.price}
                    </div>
                    <p className="text-zinc-300 text-sm leading-relaxed">
                      {plan.description}
                    </p>
                    {plan.savings && (
                      <p className="text-emerald-400 text-xs mt-3 font-bold">
                        {plan.savings}
                      </p>
                    )}
                  </div>

                  <ul className="flex-1 space-y-3 mb-8">
                    {plan.features.map((feature, featureIdx) => (
                      <li key={featureIdx} className="flex items-start">
                        <Check className="h-4 w-4 text-emerald-400 mr-3 mt-1 flex-shrink-0" />
                        <span className="text-sm text-white leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button 
                    onClick={() => setShowContactForm(true)}
                    className={`w-full ${plan.ctaColor} text-white font-bold py-3 px-4 md:px-6 rounded-xl shadow hover:scale-105 transition text-sm md:text-base`}
                  >
                    {plan.cta}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA POST PAQUETES */}
        <CTASection
          title="🎯 ¿Listo para transformar tu empresa?"
          description=""
          buttonText="Solicita Tu Auditoría Gratuita"
          buttonAction={() => setShowContactForm(true)}
          gradient="from-purple-500/20 via-pink-500/20 to-blue-500/20"
        />

        {/* FORMACIÓN PARA DESARROLLADORES */}
        <section id="desarrolladores" className="mb-20 md:mb-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              Formación AI para <span className="text-emerald-400">Desarrolladores</span>
            </h2>
            <p className="text-lg md:text-xl text-zinc-300 mb-6 max-w-4xl mx-auto leading-relaxed">
              Domina la Inteligencia Artificial desde tu stack tecnológico. Dos tracks especializados para que integres AI en tus proyectos.
            </p>
            <div className="bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-full px-6 py-3 inline-block">
              <span className="text-base md:text-lg text-emerald-400 font-bold">
                🚀 De Desarrollador a AI Engineer que cobra €80k+ anuales
              </span>
            </div>
          </div>

          {/* TRACKS DE FORMACIÓN */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-16">
            {developerTracks.map((track, idx) => (
              <div key={idx} className={`bg-gradient-to-br ${track.gradient} p-1 rounded-3xl shadow-xl hover:scale-105 transition-all`}>
                <div className="bg-black/90 p-6 md:p-8 rounded-3xl">
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
                    {track.title}
                  </h3>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2">
                    <span className="text-purple-400 font-bold text-sm">{track.level}</span>
                    <span className="text-blue-400 font-bold text-sm">{track.duration}</span>
                  </div>
                  <p className="text-zinc-200 mb-6 text-sm md:text-base leading-relaxed">
                    {track.description}
                  </p>
                  <ul className="text-zinc-200 space-y-3 text-sm">
                    {track.skills.map((skill, skillIdx) => (
                      <li key={skillIdx} className="flex items-start">
                        <span className="text-emerald-400 mr-3 text-base">✓</span>
                        <span className="leading-relaxed">{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* CTA DESARROLLADORES */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 p-6 md:p-8 rounded-3xl">
              <h3 className="text-2xl md:text-3xl font-bold text-black mb-4">
                ¿Listo para ser un AI Engineer?
              </h3>
              <p className="text-black mb-2 text-base md:text-lg max-w-2xl mx-auto font-semibold">
                ⏰ Próximamente: Nueva cohorte en preparación
              </p>
              <p className="text-black/80 mb-6 text-sm md:text-base max-w-2xl mx-auto">
                👥 Plazas limitadas: Solo 20 desarrolladores por cohorte para garantizar mentoría personalizada
              </p>
              <button 
                onClick={() => setShowDevForm(true)}
                className="px-6 md:px-8 py-3 rounded-2xl text-base md:text-lg font-bold text-white bg-black/80 hover:scale-105 transition-all shadow-lg"
              >
                Únete a la Lista de Espera
              </button>
            </div>
          </div>
        </section>

        {/* CTA FINAL */}
        <section data-audit-cta-zone className="text-center mb-16">
          <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-6 md:p-8 rounded-3xl">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
              ¿Listo para la Transformación IA?
            </h2>
            <p className="text-white/90 mb-6 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
              <strong>Automatiza procesos, incrementa ventas y reduce costos</strong> con soluciones de AI diseñadas específicamente para tu empresa. 
              <br className="hidden sm:block" />
              Garantía de 6 meses en todos nuestros servicios de pago.
            </p>
            <button 
              onClick={() => setShowContactForm(true)}
              className="bg-white text-purple-600 font-bold py-3 md:py-4 px-6 md:px-8 rounded-2xl text-base md:text-lg hover:scale-105 transition-all shadow-lg"
            >
              Empezar Transformación AI →
            </button>
          </div>
        </section>
        
       

        <Footer />
      </div>
      </main>

      {/* MODALES */}
      <AuditDialog open={showContactForm} onOpenChange={setShowContactForm} />

      {showDevForm && (
        <Dialog open={showDevForm} onOpenChange={() => setShowDevForm(false)}>
          <DialogContent
            hideCloseButton
            className="block w-[95vw] max-w-lg max-h-[95vh] overflow-y-auto bg-zinc-900 rounded-xl md:rounded-2xl border border-zinc-700 px-6 pt-14 pb-8"
          >
            <DialogTitle className="sr-only">Formulario de Contacto Desarrolladores</DialogTitle>
            <DialogClose asChild>
              <button
                className="absolute top-2 right-2 md:top-4 md:right-4 z-50 text-zinc-400 hover:text-white bg-black/80 rounded-full p-2 md:p-3 hover:bg-red-500 transition-all shadow-lg"
                title="Cerrar formulario"
              >
                <X className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            </DialogClose>
            <p className="text-center text-xl font-bold text-white mb-6">Lista de espera para desarrolladores</p>
            <DeveloperContactForm />
          </DialogContent>
        </Dialog>
      )}

      {showVideoModal && (
        <Dialog open={showVideoModal} onOpenChange={() => setShowVideoModal(false)}>
          <DialogContent
            hideCloseButton
            className="block w-full max-w-4xl aspect-video bg-transparent border-0 p-0 shadow-none"
          >
            <DialogTitle className="sr-only">Demo AI Empresarial</DialogTitle>
            <DialogClose asChild>
              <button className="absolute -top-12 right-0 text-white hover:text-red-400 transition-colors">
                <X className="w-8 h-8" />
              </button>
            </DialogClose>
            <iframe
              src="https://www.youtube.com/embed/luDoX9aeW58?autoplay=1"
              allow="autoplay; encrypted-media"
              allowFullScreen
              className="w-full h-full rounded-2xl"
              title="Demo AI Empresarial"
            />
          </DialogContent>
        </Dialog>
      )}

      {/* BANNER DE CONSENTIMIENTO DE COOKIES */}
      {consentLoaded && !cookieConsent && (
        <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-8 md:bottom-8 z-50 bg-zinc-900 rounded-xl border border-zinc-700 p-4 max-w-3xl mx-auto flex flex-col md:flex-row items-center gap-4 shadow-lg">
          <p className="text-zinc-300 text-sm flex-1">
            Usamos cookies para mejorar tu experiencia, analizar el tráfico y personalizar contenido. Más info en nuestra{' '}
            <a href="/cookie-policy" className="underline text-purple-400 hover:text-purple-600" target="_blank" rel="noopener noreferrer">
              Política de cookies
            </a>.
          </p>
          <div className="flex gap-2">
            <button
              onClick={acceptAll}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition"
            >
              Aceptar
            </button>
            <button
              onClick={rejectAll}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition"
            >
              Denegar
            </button>
            <button
              onClick={() => setShowPreferencesModal(true)}
              className="bg-zinc-700 hover:bg-zinc-600 text-white font-bold py-2 px-4 rounded-lg transition"
            >
              Ver preferencias
            </button>
          </div>
        </div>
      )}

      {/* MODAL DE PREFERENCIAS DE COOKIES */}
      {showPreferencesModal && (
        <Dialog open={showPreferencesModal} onOpenChange={() => setShowPreferencesModal(false)}>
          <DialogContent
            hideCloseButton
            className="bg-zinc-900 rounded-xl sm:rounded-xl border border-zinc-700 p-6 max-w-md w-full"
          >
            <div className="flex justify-between items-center mb-4">
              <DialogTitle asChild>
                <h3 className="text-xl font-bold text-white">Preferencias de Cookies</h3>
              </DialogTitle>
              <DialogClose asChild>
                <button
                  className="text-zinc-400 hover:text-white"
                  aria-label="Cerrar preferencias de cookies"
                >
                  ✕
                </button>
              </DialogClose>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">Funcional</h4>
                <p className="text-zinc-300 text-sm mb-2">
                  El almacenamiento o acceso técnico es estrictamente necesario para el propósito legítimo de permitir el uso de un servicio específico explícitamente solicitado por el abonado o usuario, o con el único propósito de llevar a cabo la transmisión de una comunicación a través de una red de comunicaciones electrónicas.
                </p>
                <p className="text-green-400 text-sm font-bold">Siempre activo</p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-white mb-2">Estadísticas</h4>
                <p className="text-zinc-300 text-sm mb-2">
                  El almacenamiento o acceso técnico que es utilizado exclusivamente con fines estadísticos.
                </p>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={statisticsCookies}
                    onChange={(e) => setStatisticsCookies(e.target.checked)}
                    className="mr-2"
                  />
                  <span className="text-zinc-300">Aceptar cookies de estadísticas</span>
                </label>
              </div>
            </div>

            <div className="flex gap-2 mt-6">
              <button
                onClick={() => savePreferences()}
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg transition flex-1"
              >
                Guardar preferencias
              </button>
              <button
                onClick={acceptAll}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition flex-1"
              >
                Aceptar todas
              </button>
              <button
                onClick={rejectAll}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition flex-1"
              >
                Rechazar todas
              </button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
