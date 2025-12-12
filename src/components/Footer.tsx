import React from 'react';

export default function Footer() {
  return (
    <footer className="mt-24 pt-12 pb-8 border-t border-zinc-800">
      <div className="container mx-auto max-w-4xl flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-center md:text-left">
        <div>
          <h4 className="text-lg font-semibold mb-2 text-white">Contacto</h4>
          <p className="text-sm text-zinc-300">Teléfono: <a href="tel:+34688757782" className="text-purple-400 hover:underline">34 688 75 77 82</a></p>
          <p className="text-sm text-zinc-300">Email: <a href="mailto:veronica@usecookyourwebai.es" className="text-purple-400 hover:underline">veronica@usecookyourwebai.es</a></p>
        </div>
        <div className="text-center md:text-right text-xs text-zinc-400">
          <p>© {new Date().getFullYear()} CookYourWeb. Todos los derechos reservados.</p>
          <div className="mt-2 space-x-4">
            <a
              href="/politicadeprivacidad"
              className="underline hover:text-purple-400 cursor-pointer"
            >
              Política de Privacidad
            </a>
            <a
              href="/cookie-policy"
              className="underline hover:text-purple-400 cursor-pointer"
            >
              Política de Cookies
            </a>
            <a
              href="/avisolegal"
              className="underline hover:text-purple-400 cursor-pointer"
            >
              Aviso Legal
            </a>
          </div>
        </div>
      </div>
      <p className="mt-4 text-center text-zinc-500 text-sm">Hecho con <span className="text-purple-400">❤</span> y mucha AI</p>
    </footer>
  );
}
