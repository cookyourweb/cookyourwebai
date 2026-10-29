import { Check } from "lucide-react";

import { useAudit } from "@/components/audit-context";
import Footer from "@/components/Footer";
import GuaranteeNote from "@/components/GuaranteeNote";
import LegalBreadcrumb from "@/components/LegalBreadcrumb";
import Seo from "@/components/Seo";
import { servicePageKey } from "@/lib/seo";
import type { mainServices } from "@/lib/servicios";

type Service = (typeof mainServices)[number];

/**
 * The page of one service. Everything it shows comes from lib/servicios.ts
 * (the same text as the home card); its head and structured data come from
 * lib/seo.ts through <Seo>.
 */
export default function ServicePage({ service }: { service: Service }) {
  const { openAudit } = useAudit();
  const page = servicePageKey(service);

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <Seo page={page} />
      <main id="main-content" tabIndex={-1} className="container mx-auto px-4 pt-8 pb-16 max-w-4xl">
        <LegalBreadcrumb page={page} />
        <h1 className="text-3xl md:text-5xl font-bold mb-4 break-words">{service.title}</h1>
        <p className="text-lg md:text-xl text-zinc-200 leading-relaxed mb-6">{service.description}</p>
        <p className="text-3xl md:text-4xl font-bold text-blue-400 mb-8">{service.price}</p>
        <ul className="space-y-3 text-white text-base md:text-lg mb-10">
          {service.features.map((feature) => (
            <li key={feature} className="flex items-start">
              <Check className="mr-3 mt-1 h-5 w-5 flex-shrink-0 text-green-400" aria-hidden="true" />
              <span className="leading-relaxed">{feature}</span>
            </li>
          ))}
        </ul>
        {service.guarantee && <GuaranteeNote className="mb-10" />}
        <div data-service-cta data-audit-cta-zone>
          <button
            type="button"
            onClick={openAudit}
            className="inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-purple-700 px-6 py-2 font-bold text-white hover:bg-purple-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neonblue sm:w-auto"
          >
            Solicitar auditoría
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
