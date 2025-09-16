import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">
          Política de <span className="text-purple-400">Privacidad</span>
        </h1>

        <div className="text-zinc-300 text-sm leading-relaxed space-y-6">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Responsable del Tratamiento</h2>
            <p>CookYourWeb, con domicilio en [añadir dirección legal] y correo electrónico de contacto veronica@usecookyourwebai.es, es responsable del tratamiento de los datos personales recabados a través de sus formularios y canales de contacto.</p>
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
            <p>Puedes ejercer los derechos de acceso, rectificación, supresión, oposición, limitación y portabilidad escribiendo a veronica@usecookyourwebai.es.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Información específica sobre UseCookYourWebAI</h2>
            <p>UseCookYourWebAI es un producto propiedad de CookYourWeb. Los datos recogidos a través de su página o sus formularios (en Tally o WhatsApp) son tratados exclusivamente por CookYourWeb bajo los mismos principios establecidos en esta política.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
