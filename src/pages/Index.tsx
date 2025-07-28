import React, { useState, useEffect } from 'react';
import { Check, MessageCircle, X, Menu } from "lucide-react";

// Iconos originales del proyecto
const OpenAIColorIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"/>
  </svg>
);

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
    text: "Implementamos IA en nuestros procesos y aumentamos la eficiencia un 340%. El ROI fue inmediato y sostenible."
  },
  {
    name: "Carlos Mendoza - Director Comercial", 
    text: "Nuestro sistema de IA cualifica leads automáticamente y cierra ventas las 24 horas. Resultados increíbles."
  },
  {
    name: "Ana Ruiz - Directora Operaciones",
    text: "Los chatbots inteligentes resuelven el 85% de consultas automáticamente. Ahorramos tiempo y costos significativos."
  }
];

const developerTestimonials = [
  {
    name: "Diego López - Senior Developer",
    text: "Pasé de programador tradicional a AI Engineer en 4 meses. Ahora lidero proyectos de automatización en mi empresa."
  },
  {
    name: "Laura Jiménez - Frontend Lead",
    text: "Integro APIs de IA en aplicaciones complejas sin problemas. Mi valor profesional se multiplicó exponencialmente."
  },
  {
    name: "Roberto Silva - Tech Lead",
    text: "Desarrollo soluciones de machine learning en producción. La formación fue práctica y resultados inmediatos."
  }
];

const mainServices = [
  {
    id: "automatizacion-empresarial",
    title: "Automatización Empresarial AI",
    price: "€799",
    description: "Transforma tu empresa con AI que opera 24/7 optimizando procesos críticos",
    gradient: "from-blue-500 via-purple-500 to-pink-500",
    features: [
      "Chatbots inteligentes para atención al cliente 24/7",
      "Automatización completa de procesos administrativos",
      "Análisis predictivo de datos empresariales",
      "Integración con CRM, ERP y sistemas existentes",
      "Formación especializada del equipo incluida",
      "ROI visible desde la primera semana"
    ]
  },
  {
    id: "funnels-ia-avanzados",
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
    ]
  },
  {
    id: "ia-influencer-avatares",
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
    ]
  },
  {
    id: "consultoria-transformacion-ia",
    title: "Consultoría Transformación AI",
    price: "GRATIS",
    description: "Auditoría completa para identificar oportunidades, implementar soluciones y medir ROI real",
    gradient: "from-emerald-500 via-teal-500 to-cyan-500",
    features: [
      "Auditoría profunda de procesos automatizables",
      "Estrategia de implementación gradual y escalable",
      "Formación especializada de equipos en herramientas AI",
      "ROI garantizado en todas las implementaciones",
      "Consulta estratégica de 60 minutos incluida",
      "Documento ejecutivo con recomendaciones"
    ]
  }
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

// AI Chatbot Disruptive WhatsApp Form Component
const WhatsAppForm = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [step, setStep] = useState(1);
  const [selectedProfile, setSelectedProfile] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const profiles = [
    {
      id: 'repetitive',
      text: '🔄 Pierdo tiempo en tareas repetitivas',
      timesSaved: '15h/semana',
      roi: '€45.000',
      payback: '3 semanas'
    },
    {
      id: 'customer',
      text: '🤖 Quiero automatizar atención al cliente',
      timesSaved: '25h/semana', 
      roi: '€65.000',
      payback: '2 semanas'
    },
    {
      id: 'sales',
      text: '📈 Necesito más leads/ventas automáticas',
      timesSaved: '20h/semana',
      roi: '€80.000',
      payback: '4 semanas'
    },
    {
      id: 'developer',
      text: '👨‍💻 Quiero formarme como desarrollador IA',
      timesSaved: '0h/semana',
      roi: '€35.000',
      payback: 'Aumento salarial inmediato'
    }
  ];

  const selectedData = profiles.find(p => p.id === selectedProfile);

  const handleProfileSelect = (profileId: string) => {
    setSelectedProfile(profileId);
    setIsTyping(true);
    
    setTimeout(() => {
      setIsTyping(false);
      setShowResult(true);
      setStep(3);
    }, 2000);
  };

  const handleWhatsAppRedirect = () => {
    const profile = profiles.find(p => p.id === selectedProfile);
    
    let whatsappMessage = `🤖 ¡Hola! Vengo de vuestra web.

Vuestro asistente IA me ha cualificado como: ${profile?.text}

📊 Estimación personalizada:
• Tiempo ahorrado: ${profile?.timesSaved}
• ROI anual estimado: ${profile?.roi}
• Payback: ${profile?.payback}

¿Podemos hablar de mi proyecto específico?`;

    if (selectedProfile === 'developer') {
      whatsappMessage = `🤖 ¡Hola! Vengo de vuestra web.

Vuestro asistente IA me identificó como: ${profile?.text}

🚀 Quiero información sobre:
• Formación para desarrolladores IA
• Tracks disponibles (Frontend/Backend)
• Próximas cohortes
• Certificación y mentoring

¿Cuándo podemos hablar?`;
    }

    const whatsappUrl = `https://wa.me/34688757782?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-zinc-900 rounded-2xl p-6 max-w-lg w-full relative border border-zinc-700 animate-in slide-in-from-bottom duration-300">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
        
        {/* STEP 1: Bienvenida Disruptiva */}
        {step === 1 && (
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <span className="text-2xl">🤖</span>
            </div>
            
            <h3 className="text-xl font-bold text-white mb-2">
              ¿Formulario manual en 2024?
            </h3>
            <p className="text-purple-400 text-lg font-bold mb-4">
                              En casa de herrero, ¡cuchillo de AI!
            </p>
            
            <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl p-4 mb-6">
              <p className="text-zinc-200 text-sm leading-relaxed">
                <span className="text-blue-400 font-bold">Te contacto con una automatización</span> que demuestra 
                exactamente lo que podemos hacer por tu empresa.
              </p>
            </div>
            
            <button
              onClick={() => setStep(2)}
              className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-bold py-3 px-6 rounded-xl hover:scale-105 transition-all shadow-lg"
            >
              🚀 Comenzar Experiencia AI
            </button>
            
            <p className="text-zinc-400 text-xs mt-3">
              ⏱️ 30 segundos • Cualificación automática
            </p>
          </div>
        )}

        {/* STEP 2: Cualificación IA */}
        {step === 2 && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">🤖</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Asistente AI cookYourWeb</h3>
                <p className="text-emerald-400 text-sm">● En línea</p>
              </div>
            </div>
            
            <div className="bg-zinc-800/50 rounded-xl p-4 mb-6">
              <p className="text-zinc-200 text-sm leading-relaxed">
                ¡Hola! Antes de conectarte con WhatsApp, voy a hacer lo que haríamos con 
                <span className="text-blue-400 font-bold"> TUS clientes</span>: cualificarte automáticamente.
              </p>
            </div>
            
            <p className="text-white font-bold mb-4">¿Cuál describe mejor tu situación?</p>
            
            <div className="space-y-3">
              {profiles.map((profile) => (
                <button
                  key={profile.id}
                  onClick={() => handleProfileSelect(profile.id)}
                  className="w-full text-left p-4 bg-zinc-800 hover:bg-zinc-700 border border-zinc-600 hover:border-blue-500 rounded-xl transition-all group"
                >
                  <span className="text-zinc-200 group-hover:text-white transition-colors">
                    {profile.text}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* TYPING INDICATOR */}
        {isTyping && (
          <div className="text-center py-8">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-spin">
              <span className="text-xl">🤖</span>
            </div>
            <p className="text-blue-400 font-bold mb-2">Analizando tu perfil...</p>
            <p className="text-zinc-400 text-sm">Calculando ROI personalizado</p>
            
            <div className="flex justify-center space-x-1 mt-4">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
              <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
            </div>
          </div>
        )}

        {/* STEP 3: Resultado Personalizado */}
        {step === 3 && showResult && selectedData && (
          <div>
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">¡Análisis Completado!</h3>
            </div>
            
            <div className="bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-xl p-6 mb-6">
              <p className="text-white font-bold mb-4">Basándome en tu selección, podrías:</p>
              
              <div className="space-y-3 text-sm">
                {selectedProfile !== 'developer' ? (
                  <>
                    <div className="flex justify-between">
                      <span className="text-zinc-300">⏰ Tiempo ahorrado:</span>
                      <span className="text-emerald-400 font-bold">{selectedData.timesSaved}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-300">💰 ROI anual estimado:</span>
                      <span className="text-blue-400 font-bold">{selectedData.roi}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-300">⚡ Payback:</span>
                      <span className="text-purple-400 font-bold">{selectedData.payback}</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between">
                      <span className="text-zinc-300">📈 Aumento salarial:</span>
                      <span className="text-emerald-400 font-bold">{selectedData.roi}+</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-300">🎓 Formación:</span>
                      <span className="text-blue-400 font-bold">8-16 semanas</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-300">🚀 Resultados:</span>
                      <span className="text-purple-400 font-bold">Inmediatos</span>
                    </div>
                  </>
                )}
              </div>
            </div>
            
            <div className="bg-zinc-800/50 rounded-xl p-4 mb-6">
              <p className="text-zinc-200 text-sm leading-relaxed">
                <span className="text-emerald-400 font-bold">¿Te parece interesante?</span> Te conecto con nuestro 
                experto que llevará esta información personalizada.
              </p>
            </div>
            
            <button
              onClick={handleWhatsAppRedirect}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-bold py-4 px-6 rounded-xl hover:scale-105 transition-all shadow-lg mb-3"
            >
              <MessageCircle className="w-5 h-5 inline mr-2" />
              Conectar con Experto vía WhatsApp
            </button>
            
            <button
              onClick={() => { setStep(2); setShowResult(false); setSelectedProfile(''); }}
              className="w-full text-zinc-400 hover:text-white transition-colors text-sm"
            >
              ← Cambiar selección
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Header Component
const Header = () => {
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const sections = [
    { label: "Automatización", anchor: "#automatizacion-empresarial" },
    { label: "Funnels AI", anchor: "#funnels-ia-avanzados" },
    { label: "Avatares AI", anchor: "#ia-influencer-avatares" },
    { label: "Auditoría Gratis", anchor: "#consultoria-transformacion-ia" },
    { label: "Desarrolladores", anchor: "#desarrolladores" },
  ];

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-40 w-full transition-all duration-300 ${
        isScrolled 
          ? 'bg-black/95 backdrop-blur-md border-b border-zinc-800/50 py-3' 
          : 'bg-black/60 backdrop-blur py-4'
      }`}>
        <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
          {/* LOGO */}
          <div className="flex flex-col items-start gap-1">
            <span className="font-serif text-xl md:text-2xl text-blue-400 tracking-wider font-bold select-none hover:text-blue-300 transition-colors cursor-pointer">
              cookYourWebAI
            </span>
            <span className="px-3 py-1 text-xs rounded-full bg-purple-500 text-white font-semibold tracking-wide animate-pulse">
              Agencia AI
            </span>
          </div>
          
          {/* DESKTOP NAVIGATION */}
          <nav className="hidden lg:flex items-center gap-2">
            {sections.map((section, index) => (
              <a
                key={section.label}
                href={section.anchor}
                className="relative px-4 py-2 group text-zinc-300 hover:text-white transition-all duration-300 text-sm font-medium rounded-xl hover:bg-zinc-800/50"
              >
                <span className="relative z-10">{section.label}</span>
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-300 group-hover:w-3/4 rounded-full"></span>
                
                {/* Hover background effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
            ))}
          </nav>
          
          {/* RIGHT SIDE CONTROLS */}
          <div className="flex items-center gap-4">
            {/* WhatsApp Button */}
            <button
              onClick={() => setIsWhatsAppOpen(true)}
              className="relative p-3 text-zinc-300 hover:text-green-400 transition-all duration-300 rounded-xl hover:bg-green-500/10 group"
              title="Contactar por WhatsApp"
            >
              <MessageCircle className="w-5 h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform" />
              
              {/* Notification dot */}
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              
              {/* Tooltip */}
              <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-zinc-800 text-white text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                ¡Chatbot AI en vivo!
                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-zinc-800 rotate-45"></div>
              </div>
            </button>
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-3 text-zinc-300 hover:text-blue-400 transition-all duration-300 rounded-xl hover:bg-zinc-800/50"
            >
              <div className="relative">
                <Menu className="w-5 h-5" />
                {isMobileMenuOpen && (
                  <div className="absolute inset-0 bg-blue-500 rounded opacity-20"></div>
                )}
              </div>
            </button>
          </div>
        </div>
        
        {/* MOBILE MENU */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-black/95 backdrop-blur-md border-t border-zinc-800/50 animate-in slide-in-from-top duration-300">
            <nav className="container mx-auto px-4 py-6 space-y-1">
              {sections.map((section, index) => (
                <a
                  key={section.label}
                  href={section.anchor}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-3 px-4 text-zinc-300 hover:text-white hover:bg-zinc-800/50 rounded-xl transition-all duration-300 group"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{section.label}</span>
                    <div className="w-2 h-2 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                </a>
              ))}
              
              {/* Mobile CTA */}
              <div className="pt-4 mt-4 border-t border-zinc-800">
                <button
                  onClick={() => {
                    setIsWhatsAppOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-3 px-6 rounded-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  Chatbot AI en Vivo
                </button>
              </div>
            </nav>
          </div>
        )}
      </header>

      <WhatsAppForm isOpen={isWhatsAppOpen} onClose={() => setIsWhatsAppOpen(false)} />
    </>
  );
};

// Service Card Component
type MainService = {
  id: string;
  title: string;
  price: string;
  description: string;
  gradient: string;
  features: string[];
};

const ServiceCard = ({ service, onContactClick }: { service: MainService; onContactClick: () => void }) => (
  <div className={`relative group overflow-hidden rounded-3xl bg-gradient-to-br ${service.gradient} p-1 transition-all duration-300 hover:scale-105`}>
    <div className="bg-black/80 rounded-3xl p-6 md:p-8 h-full flex flex-col">
      <div className="mb-6">
        <h3 className="text-xl md:text-2xl font-bold text-white mb-3" id={service.id}>
          {service.title}
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

  return (
    <div className="relative min-h-screen w-full bg-black text-white font-sans">
      <Header />
      
      {/* HERO SECTION */}
      <section className="pt-24 md:pt-32 pb-16 md:pb-20">
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
          
          {/* VIDEO DEMO */}
          <div className="w-full flex items-center justify-center mb-12">
            <div 
              onClick={() => setShowVideoModal(true)}
              className="relative cursor-pointer group"
            >
              <img
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=450&fit=crop&crop=center"
                alt="Demo AI Empresarial"
                className="rounded-2xl shadow-2xl w-[300px] sm:w-[400px] md:w-[600px] border-4 border-purple-500 group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/40 rounded-2xl flex items-center justify-center group-hover:bg-black/20 transition-colors">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 md:w-8 md:h-8 text-purple-600 ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
              </div>
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                ▶ Ver Demo en Acción
              </div>
            </div>
          </div>
          
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
          
          {/* TESTIMONIALS */}
          <div className="max-w-5xl mx-auto w-full">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              {testimonials.map((testimonial, idx) => (
                <div key={idx} className="bg-zinc-900/80 backdrop-blur p-6 rounded-2xl border border-zinc-800 hover:scale-105 transition-transform">
                  <div className="flex items-start mb-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <span className="text-white font-bold text-sm">{testimonial.name.charAt(0)}</span>
                    </div>
                    <div>
                      <span className="block text-sm text-purple-400 font-bold">{testimonial.name}</span>
                    </div>
                  </div>
                  <p className="text-sm md:text-base text-zinc-200 leading-relaxed">{testimonial.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 md:px-8 pb-24">
        
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
                💡 85% de nuestros clientes recupera la inversión en las primeras 4 semanas
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
          description="Más de 150 empresas ya han transformado sus resultados con nuestros paquetes integrales. Es tu turno de multiplicar ventas con AI."
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

          {/* TESTIMONIOS DE DESARROLLADORES */}
          <div className="bg-zinc-900/90 backdrop-blur p-6 md:p-8 rounded-3xl border-2 border-emerald-500 mb-12">
            <h3 className="text-xl md:text-2xl font-bold text-emerald-400 mb-8 text-center">
              Lo que dicen nuestros <span className="text-purple-400">AI Engineers</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {developerTestimonials.map((testimonial, idx) => (
                <div key={idx} className="bg-gradient-to-br from-emerald-500/20 via-blue-500/10 to-purple-500/10 rounded-2xl p-5 border border-emerald-500/20">
                  <div className="flex items-start mb-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <span className="text-white font-bold text-xs">{testimonial.name.charAt(0)}</span>
                    </div>
                    <span className="text-emerald-400 font-bold text-sm">{testimonial.name}</span>
                  </div>
                  <p className="text-sm md:text-base text-zinc-200 leading-relaxed">{testimonial.text}</p>
                </div>
              ))}
            </div>
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
        <section className="text-center mb-16">
          <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-6 md:p-8 rounded-3xl">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
              ¿Listo para la Transformación IA?
            </h2>
            <p className="text-white/90 mb-6 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
              <strong>Automatiza procesos, incrementa ventas y reduce costos</strong> con soluciones de AI diseñadas específicamente para tu empresa. 
              <br className="hidden sm:block" />
              85% de nuestros clientes recupera la inversión en las primeras 4 semanas.
            </p>
            <button 
              onClick={() => setShowContactForm(true)}
              className="bg-white text-purple-600 font-bold py-3 md:py-4 px-6 md:px-8 rounded-2xl text-base md:text-lg hover:scale-105 transition-all shadow-lg"
            >
              Empezar Transformación AI →
            </button>
          </div>
        </section>
        
        <footer className="mt-24 pt-12 pb-8 text-center text-zinc-500 text-sm border-t border-zinc-800">
          <p>© {new Date().getFullYear()} cookYourWeb.es · Agencia de AI & Automatización Empresarial</p>
          <p className="mt-2">Hecho con <span className="text-purple-400">❤</span> y mucha AI</p>
        </footer>
      </main>

      {/* MODALES */}
      {showContactForm && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-2 md:p-4"
          onClick={() => setShowContactForm(false)}
        >
          <div 
            className="w-[98vw] h-[95vh] md:w-[90vw] md:h-[90vh] max-w-4xl bg-zinc-900 rounded-xl md:rounded-2xl relative border border-zinc-700"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowContactForm(false)}
              className="absolute top-2 right-2 md:top-4 md:right-4 z-50 text-zinc-400 hover:text-white bg-black/80 rounded-full p-2 md:p-3 hover:bg-red-500 transition-all shadow-lg"
              title="Cerrar formulario"
            >
              <X className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            <iframe
              src="https://tally.so/r/w77ZyP"
              className="w-full h-full rounded-xl md:rounded-2xl"
              title="Formulario de Contacto Empresarial"
            />
          </div>
        </div>
      )}

      {showDevForm && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-2 md:p-4"
          onClick={() => setShowDevForm(false)}
        >
          <div 
            className="w-[98vw] h-[95vh] md:w-[90vw] md:h-[90vh] max-w-4xl bg-zinc-900 rounded-xl md:rounded-2xl relative border border-zinc-700"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowDevForm(false)}
              className="absolute top-2 right-2 md:top-4 md:right-4 z-50 text-zinc-400 hover:text-white bg-black/80 rounded-full p-2 md:p-3 hover:bg-red-500 transition-all shadow-lg"
              title="Cerrar formulario"
            >
              <X className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            <iframe
              src="https://tally.so/r/n0YDZ0"
              className="w-full h-full rounded-xl md:rounded-2xl"
              title="Formulario de Contacto Desarrolladores"
            />
          </div>
        </div>
      )}

      {showVideoModal && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowVideoModal(false)}
        >
          <div 
            className="w-full max-w-4xl aspect-video relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowVideoModal(false)}
              className="absolute -top-12 right-0 text-white hover:text-red-400 transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
            <iframe
              src="https://www.youtube.com/embed/luDoX9aeW58?autoplay=1"
              allow="autoplay; encrypted-media"
              allowFullScreen
              className="w-full h-full rounded-2xl"
              title="Demo AI Empresarial"
            />
          </div>
        </div>
      )}
    </div>
  );
}