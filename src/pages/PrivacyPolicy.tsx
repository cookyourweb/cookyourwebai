import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

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
            <p>CookYourWeb, titular Verónica Serna Pérez con NIF 52474139F, con domicilio en C/ Tejera 35 1B, 28210 Valdemorillo, Madrid, y correo electrónico de contacto veronica@cookyourwebai.es, es responsable del tratamiento de los datos personales recabados a través de sus formularios y canales de contacto.</p>
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
              <li>Los formularios de esta web (solicitud de auditoría, lista de espera para desarrolladores y contacto).</li>
              <li>La reserva de una llamada en nuestra agenda de Google Calendar.</li>
              <li>Las conversaciones que inicies con nosotros por WhatsApp o por correo electrónico.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Base jurídica del tratamiento</h2>
            <ul className="list-disc list-inside ml-4 mt-2">
              <li>Consentimiento (art. 6.1.a RGPD), al marcar la casilla de privacidad del formulario y, en su caso, las casillas opcionales, como la de avisos por WhatsApp.</li>
              <li>Aplicación de medidas precontractuales a petición tuya (art. 6.1.b RGPD): atender tu solicitud, enviarte la confirmación y el recordatorio de la llamada que hayas reservado.</li>
              <li>Interés legítimo (art. 6.1.f RGPD) para hacer el seguimiento de tu solicitud. Las comunicaciones comerciales por correo electrónico o medios equivalentes solo se enviarán si las has solicitado o has dado tu consentimiento (art. 21 LSSI).</li>
            </ul>
            <p className="mt-4">Los datos que el formulario marca como obligatorios son necesarios para atender tu solicitud; el resto, incluido el teléfono, es opcional. No tomamos decisiones automatizadas ni elaboramos perfiles con efectos jurídicos sobre ti (art. 22 RGPD).</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Destinatarios y encargados del tratamiento</h2>
            <p>No vendemos ni cedemos tus datos a terceros. Para prestar el servicio nos apoyamos en estos proveedores, que tratan los datos solo por cuenta de CookYourWeb y siguiendo sus instrucciones:</p>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
              <li><strong>Notion</strong>: base de datos donde guardamos las solicitudes que recibimos.</li>
              <li><strong>n8n</strong>, alojado en <strong>Render</strong>: automatización que recibe los formularios y los registra.</li>
              <li><strong>Brevo</strong>: envío de los correos de confirmación y recordatorio.</li>
              <li><strong>Google Calendar y Google Meet</strong>: reserva y realización de las llamadas.</li>
              <li><strong>WhatsApp</strong> (Meta): solo si nos escribes por ese canal o aceptas expresamente que te avisemos por él.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Transferencias internacionales</h2>
            <p>Algunos de estos proveedores (Notion, Render, Google y Meta) pueden tratar datos fuera del Espacio Económico Europeo, principalmente en Estados Unidos. En esos casos, la transferencia se ampara en la decisión de adecuación del Marco de Privacidad de Datos UE-EE. UU. (art. 45 RGPD), cuando el proveedor está adherido, o en cláusulas contractuales tipo aprobadas por la Comisión Europea (art. 46.2.c RGPD). Puedes solicitar una copia de las garantías escribiendo a veronica@cookyourwebai.es.</p>
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
              <li><strong>Derecho de oposición:</strong> Oponerte al tratamiento de tus datos basado en interés legítimo, incluido el envío de comunicaciones comerciales</li>
              <li><strong>Derecho de limitación:</strong> Solicitar que limitemos el tratamiento de tus datos</li>
              <li><strong>Derecho de portabilidad:</strong> Recibir tus datos en formato estructurado</li>
            </ul>
            <p className="mt-4">Además, puedes retirar tu consentimiento en cualquier momento, sin que ello afecte a la licitud del tratamiento anterior (art. 7.3 RGPD), escribiendo a veronica@cookyourwebai.es o desde la página de baja.</p>
            <p className="mt-4">
              Si consideras que no hemos tratado tus datos correctamente, puedes presentar una reclamación ante la Agencia Española de Protección de Datos en{" "}
              <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 underline">www.aepd.es</a>{" "}
              (art. 77 RGPD).
            </p>
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
                https://www.cookyourwebai.es/baja
              </a>
            </div>
            <div className="bg-zinc-800 rounded-lg p-4 mb-4">
              <h3 className="font-semibold text-white mb-2">2. Por email</h3>
              <p>Escribe a <a href="mailto:veronica@cookyourwebai.es" className="text-purple-400 hover:underline">veronica@cookyourwebai.es</a> con el asunto "Solicitud de baja"</p>
            </div>
            <div className="bg-zinc-800 rounded-lg p-4 mb-4">
              <h3 className="font-semibold text-white mb-2">3. Por WhatsApp</h3>
              <p>Envía un mensaje con la palabra "BAJA" al <a href="tel:+34688757782" className="text-purple-400 hover:underline">+34 688 75 77 82</a></p>
            </div>

            <h3 className="text-lg font-semibold text-white mt-6 mb-3">Plazo de procesamiento</h3>
            <p className="mb-4">
              Responderemos a tu solicitud en el plazo de <strong>un mes</strong>, ampliable dos meses más en casos complejos, en cuyo caso te avisaremos (art. 12.3 RGPD), y te confirmaremos por email cuando tus datos hayan sido eliminados.
            </p>

            <h3 className="text-lg font-semibold text-white mt-6 mb-3">¿Qué datos se eliminarán?</h3>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
              <li>Tu información de contacto (nombre, email, teléfono)</li>
              <li>Historial de conversaciones en WhatsApp</li>
              <li>Los datos guardados en nuestros sistemas (la base de datos de solicitudes en Notion)</li>
              <li>Comunicaciones comerciales (dejarás de recibir emails y mensajes)</li>
            </ul>

            <h3 className="text-lg font-semibold text-white mt-6 mb-3">¿Qué datos NO se eliminarán?</h3>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
              <li>Datos que debamos conservar por obligaciones legales o fiscales (facturas, contratos firmados)</li>
              <li>Datos anonimizados para estadísticas internas que no permitan identificarte</li>
            </ul>
          </section>

        </div>
      </main>
      <Footer />
    </div>
  );
}
