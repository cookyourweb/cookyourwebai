import { Check } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { useSearchParams } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";

// Google Calendar booking page (hello.cookyourweb), 15-minute calls.
const RESERVA_AUDITORIA = "https://calendar.app.google/Ft4YYTzBZocpox1r5";

// Landing page of the forms that replace Tally, reached after submitting them.
export default function AgenteActivado() {
  const [params] = useSearchParams();
  // Only business leads book a call: the developer waiting list has no cohort yet.
  const ofrecerLlamada = params.get("formulario") === "business";

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <Helmet>
        <title>¡Gracias! | cookYourWebAI</title>
        {/* Confirmation page: nothing worth indexing */}
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <Header />
      <main id="main-content" tabIndex={-1} className="container mx-auto px-4 pt-16 pb-16 max-w-2xl">
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-8 text-center">
          <Check className="w-16 h-16 text-green-500 mx-auto mb-4" aria-hidden="true" />
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            ¡<span className="text-purple-400">Gracias</span>!
          </h1>
          <p className="text-xl text-zinc-200 mb-4">
            Tu formulario se ha recogido correctamente.
          </p>
          <p className="text-zinc-300">
            Nos pondremos en contacto contigo muy pronto.
          </p>
          {ofrecerLlamada && (
            <div className="mt-8 border-t border-zinc-800 pt-8">
              <p className="text-zinc-200 mb-4">
                ¿Quieres adelantarte? Elige ya un hueco para tu auditoría.
              </p>
              <a
                href={RESERVA_AUDITORIA}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition-colors"
              >
                Agenda tu llamada
                <span className="sr-only"> (se abre en una pestaña nueva)</span>
              </a>
            </div>
          )}
          <a
            href="/"
            className={`inline-block mt-8 px-6 py-3 rounded-lg transition-colors ${
              ofrecerLlamada
                ? "text-zinc-300 underline hover:text-white"
                : "bg-purple-600 hover:bg-purple-700"
            }`}
          >
            Volver al inicio
          </a>
        </div>
      </main>
      <Footer />
    </div>
  );
}
