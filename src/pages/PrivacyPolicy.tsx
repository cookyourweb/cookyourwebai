import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Wording reviewed by the legal advisor on 11 Oct 2026. Keep it in sync with
// what the site really does before changing any provider or form.
export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <Header />
      <main id="main-content" tabIndex={-1} className="container mx-auto px-4 pt-8 pb-16 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">
          Política de <span className="text-purple-400">Privacidad</span>
        </h1>

        <div className="text-zinc-300 text-sm leading-relaxed space-y-6">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Responsable del Tratamiento</h2>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li><strong>Titular:</strong> Verónica Serna Pérez (CookYourWeb)</li>
              <li><strong>NIF:</strong> 52474139F</li>
              <li><strong>Domicilio:</strong> C/ Tejera 35 1B, 28210 Valdemorillo, Madrid</li>
              <li><strong>Correo electrónico:</strong> veronica@cookyourwebai.es</li>
              <li><strong>Sitio web:</strong> https://www.cookyourwebai.es</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Finalidad del tratamiento</h2>
            <p>Los datos personales facilitados voluntariamente serán tratados con las siguientes finalidades:</p>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
              <li>Atender tus consultas y solicitudes de información recibidas a través de la web o correo electrónico.</li>
              <li>Gestionar las reservas y la realización de reuniones o llamadas solicitadas en nuestra agenda.</li>
              <li>Enviarte notificaciones de confirmación, recordatorios y seguimiento relacionados con tus solicitudes.</li>
              <li>Gestionar tu inscripción en listas de espera e informarte sobre la apertura de cohorte o lanzamientos de formaciones en IA y automatización.</li>
              <li>Enviarte comunicaciones comerciales y avisos (vía correo electrónico o WhatsApp) previa obtención de tu consentimiento explícito.</li>
            </ul>
            <p className="mt-4">No tomamos decisiones automatizadas ni elaboramos perfiles con efectos jurídicos sobre ti (art. 22 RGPD).</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Origen de los datos y bases jurídicas</h2>
            <p>Los datos se recogen directamente cuando nos los facilitas a través de:</p>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
              <li><strong>Formularios web (contacto, auditoría, lista de espera):</strong> tratados bajo tu consentimiento (art. 6.1.a RGPD) y la aplicación de medidas precontractuales a tu petición (art. 6.1.b RGPD).</li>
              <li><strong>Reserva de llamada (Google Calendar):</strong> tratados para la ejecución de medidas precontractuales (art. 6.1.b RGPD).</li>
              <li><strong>Comunicaciones directas (email / WhatsApp):</strong> tratados sobre la base de tu consentimiento expreso y el interés legítimo para contestar tus consultas (art. 6.1.f RGPD y art. 21.2 LSSI).</li>
            </ul>
            <p className="mt-4">Los campos obligatorios de cada formulario son necesarios para atender la solicitud. El teléfono es un campo opcional salvo para el servicio de avisos por WhatsApp.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Destinatarios y encargados del tratamiento</h2>
            <p>No vendemos ni cedemos tus datos a terceros. Para prestar los servicios nos apoyamos en proveedores tecnológicos que actúan como encargados del tratamiento bajo nuestras instrucciones:</p>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
              <li><strong>Notion Labs, Inc.:</strong> base de datos donde se registran las solicitudes.</li>
              <li><strong>Render Services, Inc.:</strong> servidor para el alojamiento del motor de automatización (n8n).</li>
              <li><strong>Sendinblue SAS (Brevo):</strong> servicio para el envío de correos transaccionales y recordatorios (ubicado en la UE).</li>
              <li><strong>Google LLC:</strong> gestión de agenda y videoconferencias (Google Calendar / Google Meet).</li>
              <li><strong>Meta Platforms, Inc. (WhatsApp):</strong> canal opcional de mensajería previa aceptación explícita.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Transferencias internacionales de datos</h2>
            <p>Algunos de nuestros proveedores (Notion, Render, Google y Meta) están ubicados en Estados Unidos. Todas las transferencias internacionales de datos a estos proveedores cuentan con garantías adecuadas al estar adheridos y certificados bajo el Marco de Privacidad de Datos UE-EE. UU. (Data Privacy Framework - DPF), de conformidad con la decisión de adecuación de la Comisión Europea (art. 45 RGPD).</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Plazo de conservación de los datos</h2>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li><strong>Contactos y solicitudes sin relación contractual:</strong> se conservarán durante un plazo máximo de 12 meses desde la última interacción, tras el cual serán eliminados.</li>
              <li><strong>Listas de correo y avisos (WhatsApp / email):</strong> se conservarán hasta que retires tu consentimiento o solicites la baja.</li>
              <li><strong>Clientes:</strong> los datos se conservarán mientras dure la relación contractual y, posteriormente, durante los plazos legalmente exigidos por la normativa fiscal y mercantil.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Derechos del interesado</h2>
            <p>Puedes ejercitar en cualquier momento tus derechos de acceso, rectificación, supresión, oposición, limitación del tratamiento y portabilidad enviando un correo a veronica@cookyourwebai.es.</p>
            <p className="mt-4">Asimismo, puedes retirar tu consentimiento en cualquier momento sin que ello afecte a la licitud del tratamiento previo.</p>
            <p className="mt-4">
              Si consideras que tus derechos no han sido atendidos adecuadamente, tienes derecho a presentar una reclamación ante la Agencia Española de Protección de Datos (AEPD) en{" "}
              <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 underline">www.aepd.es</a>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Cómo solicitar la baja o supresión de datos</h2>
            <p>Puedes tramitar la baja o eliminación de tus datos por cualquiera de estas vías:</p>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
              <li>
                <strong>Formulario web:</strong>{" "}
                <a href="/baja" className="text-purple-400 hover:text-purple-300 underline">https://www.cookyourwebai.es/baja</a>
              </li>
              <li><strong>Email:</strong> escribiendo a veronica@cookyourwebai.es con el asunto "Solicitud de baja".</li>
              <li><strong>WhatsApp:</strong> enviando un mensaje con la palabra "BAJA" al +34 688 75 77 82.</li>
            </ul>
            <p className="mt-4">Responderemos a las solicitudes en un plazo máximo de un mes (art. 12.3 RGPD). La supresión incluirá la eliminación de tus datos de contacto e historial en Notion, Brevo y WhatsApp, manteniendo únicamente bloqueada la información exigida por obligaciones legales o fiscales.</p>
          </section>

          <p className="text-zinc-500 text-xs">Última actualización: 11 de octubre de 2026.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
