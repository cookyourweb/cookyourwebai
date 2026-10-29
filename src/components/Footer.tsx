import React, { useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import ClosingCta from "@/components/ClosingCta";
import ContactDialog from "@/components/ContactDialog";
import { COMPANY } from "@/lib/company";
import { EMPLEO_TECH } from "@/lib/empleo-tech";
import { RUTAS_PUBLICAS } from "@/lib/rutas-publicas";
import { mainServices } from "@/lib/servicios";

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neonblue";

export default function Footer() {
  const { pathname } = useLocation();
  const [companyContactOpen, setCompanyContactOpen] = useState(false);
  // The home ends with its own audit call to action; /baja and /agenteActivado get none.
  const showClosingCta = pathname !== "/" && RUTAS_PUBLICAS.includes(pathname);
  return (
    <>
    {showClosingCta && <ClosingCta />}
    <footer className="mt-24 pt-12 pb-8 border-t border-zinc-800">
      <div className="container mx-auto max-w-4xl flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-center md:text-left">
        <div>
          <h4 className="text-lg font-semibold mb-2 text-white">Contacto</h4>
          <p className="text-sm text-zinc-300">Teléfono: <a href={`tel:${COMPANY.phone}`} className="text-purple-400 hover:underline">{COMPANY.phoneDisplay}</a></p>
          <p className="text-sm text-zinc-300">Email: <a href={`mailto:${COMPANY.email}`} className="text-purple-400 hover:underline">{COMPANY.email}</a></p>
          <p className="text-sm text-zinc-300">
            LinkedIn:{" "}
            <a href={COMPANY.linkedinFounder} target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline">
              {COMPANY.legalName}
              <span className="sr-only"> en LinkedIn (se abre en una pestaña nueva)</span>
            </a>
          </p>
        </div>
        <nav aria-label="Servicios" className="text-center md:text-left">
          <h4 className="text-lg font-semibold mb-2 text-white">Servicios</h4>
          <ul>
            {mainServices.map((service) => (
              <li key={service.id}>
                <Link
                  to={service.path}
                  className={`inline-flex min-h-11 items-center text-sm text-zinc-300 hover:text-purple-400 hover:underline ${focusRing}`}
                >
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="text-center md:text-right text-xs text-zinc-400">
          <p>© {new Date().getFullYear()} CookYourWeb. Todos los derechos reservados.</p>
          <div className="mt-2 space-x-2">
            <a
              href="/politicadeprivacidad"
              className="underline hover:text-purple-400 cursor-pointer"
            >
              Política de Privacidad
            </a>
            <span>·</span>
            <a
              href="/cookie-policy"
              className="underline hover:text-purple-400 cursor-pointer"
            >
              Política de Cookies
            </a>
            <span>·</span>
            <a
              href="/avisolegal"
              className="underline hover:text-purple-400 cursor-pointer"
            >
              Aviso Legal
            </a>
            <span>·</span>
            <a
              href="/baja"
              className="underline hover:text-red-400 cursor-pointer"
            >
              Darme de baja
            </a>
          </div>
        </div>
      </div>
      <div className="container mx-auto max-w-4xl mt-6 flex flex-col items-center gap-2 px-4 sm:flex-row sm:justify-center sm:gap-4">
        <a
          href={EMPLEO_TECH.href}
          className={`inline-flex min-h-11 items-center text-sm text-purple-400 hover:underline ${focusRing}`}
        >
          {EMPLEO_TECH.label}
        </a>
        <button
          type="button"
          onClick={() => setCompanyContactOpen(true)}
          className={`inline-flex min-h-11 items-center justify-center rounded-xl border border-zinc-700 px-4 py-2 text-sm font-semibold text-zinc-100 hover:border-purple-400 hover:text-purple-300 ${focusRing}`}
        >
          ¿Eres empresa y buscas desarrolladores?
        </button>
      </div>
      <ContactDialog isOpen={companyContactOpen} onClose={() => setCompanyContactOpen(false)} />
      <p className="mt-4 text-center text-zinc-500 text-sm">Hecho con <span className="text-purple-400">❤</span> y mucha AI</p>
    </footer>
    </>
  );
}
