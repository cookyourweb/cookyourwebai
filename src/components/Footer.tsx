import React from 'react';
import { useLocation } from "react-router-dom";
import ClosingCta from "@/components/ClosingCta";
import { COMPANY } from "@/lib/company";
import { RUTAS_PUBLICAS } from "@/lib/rutas-publicas";

export default function Footer() {
  const { pathname } = useLocation();
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
        </div>
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
      <p className="mt-4 text-center text-zinc-500 text-sm">Hecho con <span className="text-purple-400">❤</span> y mucha AI</p>
    </footer>
    </>
  );
}
