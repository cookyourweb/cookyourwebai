import React from 'react';
import { COMPANY } from "@/lib/company";

export default function LegalSection() {
  return (
    <footer className="bg-black text-white py-8 px-4 mt-12">
      <div className="container mx-auto max-w-4xl flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <div className="text-center md:text-left">
          <h4 className="text-lg font-semibold mb-2">Contacto</h4>
          <p className="text-sm">Teléfono: <a href={`tel:${COMPANY.phone}`} className="text-purple-400 hover:underline">{COMPANY.phoneDisplay}</a></p>
          <p className="text-sm">Email: <a href={`mailto:${COMPANY.email}`} className="text-purple-400 hover:underline">{COMPANY.email}</a></p>
        </div>
        <div className="text-center md:text-right text-xs text-zinc-400">
          <p>© {new Date().getFullYear()} CookYourWeb. Todos los derechos reservados.</p>
          <p>Política de Privacidad | Aviso Legal | Cookies</p>
        </div>
      </div>
    </footer>
  );
}
