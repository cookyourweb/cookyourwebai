import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <Header />
      <div className="container mx-auto px-4 pt-8 pb-16 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">
          Política de <span className="text-purple-400">Privacidad</span>
        </h1>

        <div className="text-zinc-300 text-sm leading-relaxed space-y-6">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Responsable del Tratamiento</h2>
            <p>CookYourWeb, titular Verónica Serna Pérez con NIF 52474139F, con domicilio en C/ Tejera 35 1B, 28210 Valdemorillo, Madrid, y correo electrónico de contacto veronica@usecookyourwebai.es, es responsable del tratamiento de los datos personales recabados a través de sus formularios y canales de contacto.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Finalidad del tratamiento</h2>
            <p>Los datos que nos facilites voluntariamente serán tratados con la finalidad de:</p>
            <ul className="list-disc list-inside ml-4 mt-2">
              <li>Atender tus solicitudes de información.</li>
              <li>Contactarte para enviarte detalles sobre nuestros servicios, productos o formaciones relacionadas con inteligencia artificial y automatización.</li>
              <li>Gestionar comunicaciones comerciales a través de medios como WhatsApp o correo electrónico.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Origen de los datos y medios utilizados</h2>
            <p>Recogemos tus datos únicamente cuando tú los facilitas a través de:</p>
            <ul className="list-disc list-inside ml-4 mt-2">
              <li>Formularios alojados en Tally.so</li>
              <li>Conversaciones por WhatsApp, gestionadas mediante un sistema automatizado conectado con Make o n8n.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Base jurídica del tratamiento</h2>
            <ul className="list-disc list-inside ml-4 mt-2">
              <li>Consentimiento del interesado (art. 6.1.a RGPD), otorgado de forma clara mediante los formularios.</li>
              <li>Interés legítimo en el envío de comunicaciones relacionadas con nuestros servicios (art. 6.1.f RGPD), siempre que hayas mostrado interés previo.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Destinatarios</h2>
            <p>No compartimos tus datos con terceros no autorizados. Las herramientas utilizadas cumplen con el RGPD.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Conservación de los datos</h2>
            <p>Tus datos se conservarán mientras mantengamos una relación activa contigo o hasta que solicites su supresión.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Derechos del interesado</h2>
            <p className="mb-4">Puedes ejercer los siguientes derechos en cualquier momento:</p>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-2">
              <li><strong>Derecho de acceso:</strong> Solicitar información sobre qué datos tuyos estamos tratando</li>
              <li><strong>Derecho de rectificación:</strong> Corregir datos incorrectos o incompletos</li>
              <li><strong>Derecho de supresión:</strong> Solicitar la eliminación de tus datos personales</li>
              <li><strong>Derecho de oposición:</strong> Oponerte al tratamiento de tus datos para fines de marketing</li>
              <li><strong>Derecho de limitación:</strong> Solicitar que limitemos el tratamiento de tus datos</li>
              <li><strong>Derecho de portabilidad:</strong> Recibir tus datos en formato estructurado</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Cómo ejercer tu derecho de supresión (darse de baja)</h2>
            <p className="mb-4">
              Tienes derecho a solicitar la eliminación de tus datos personales en cualquier momento. Puedes hacerlo de las siguientes formas:
            </p>
            <div className="bg-zinc-800 rounded-lg p-4 mb-4">
              <h3 className="font-semibold text-white mb-2">1. Formulario web (recomendado)</h3>
              <p className="mb-2">Visita nuestra página de baja y completa el formulario:</p>
              <a
                href="/baja"
                className="text-purple-400 hover:text-purple-300 underline font-semibold"
              >
                https://cookyourweb.es/baja
              </a>
            </div>
            <div className="bg-zinc-800 rounded-lg p-4 mb-4">
              <h3 className="font-semibold text-white mb-2">2. Por email</h3>
              <p>Escribe a <a href="mailto:veronica@usecookyourwebai.es" className="text-purple-400 hover:underline">veronica@usecookyourwebai.es</a> con el asunto "Solicitud de baja"</p>
            </div>
            <div className="bg-zinc-800 rounded-lg p-4 mb-4">
              <h3 className="font-semibold text-white mb-2">3. Por WhatsApp</h3>
              <p>Envía un mensaje con la palabra "BAJA" al <a href="tel:+34688757782" className="text-purple-400 hover:underline">+34 688 75 77 82</a></p>
            </div>

            <h3 className="text-lg font-semibold text-white mt-6 mb-3">Plazo de procesamiento</h3>
            <p className="mb-4">
              Procesaremos tu solicitud en un plazo máximo de <strong>30 días naturales</strong> (según Art. 12.3 RGPD) y te confirmaremos por email cuando tus datos hayan sido eliminados.
            </p>

            <h3 className="text-lg font-semibold text-white mt-6 mb-3">¿Qué datos se eliminarán?</h3>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
              <li>Tu información de contacto (nombre, email, teléfono)</li>
              <li>Historial de conversaciones en WhatsApp</li>
              <li>Datos almacenados en nuestros sistemas (Airtable, formularios)</li>
              <li>Comunicaciones comerciales (dejarás de recibir emails y mensajes)</li>
            </ul>

            <h3 className="text-lg font-semibold text-white mt-6 mb-3">¿Qué datos NO se eliminarán?</h3>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
              <li>Datos que debamos conservar por obligaciones legales o fiscales (facturas, contratos firmados)</li>
              <li>Datos anonimizados para estadísticas internas que no permitan identificarte</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Información específica sobre UseCookYourWebAI</h2>
            <p>UseCookYourWebAI es un producto propiedad de CookYourWeb. Los datos recogidos a través de su página o sus formularios (en Tally o WhatsApp) son tratados exclusivamente por CookYourWeb bajo los mismos principios establecidos en esta política.</p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}
