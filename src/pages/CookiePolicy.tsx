import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function CookiePolicy() {
  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <Header />
      <div className="container mx-auto px-4 pt-8 pb-16 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">
          Política de <span className="text-purple-400">Cookies</span>
        </h1>

        <div className="text-zinc-300 text-sm leading-relaxed space-y-6">
          <p>Esta política de cookies fue actualizada por última vez el 10 de septiembre de 2025 y se aplica a los ciudadanos y residentes legales permanentes del Espacio Económico Europeo.</p>

          <h2 className="text-2xl font-bold text-white mb-4">1. Introducción</h2>
          <p>Nuestra web, https://www.cookyourwebai.es (en adelante: «la web») utiliza cookies y otras tecnologías relacionadas (para mayor comodidad, todas las tecnologías se denominan «cookies»). Las cookies también son colocadas por terceros a los que hemos contratado. En el siguiente documento te informamos sobre el uso de cookies en nuestra web.</p>

          <h2 className="text-2xl font-bold text-white mb-4">2. ¿Qué son las cookies?</h2>
          <p>Una cookie es un pequeño archivo que se envía junto con las páginas de esta web y que tu navegador almacena en el disco duro de su ordenador u otro dispositivo. La información almacenada puede ser devuelta a nuestros servidores o a los servidores de terceros apropiados durante una visita posterior.</p>

          <h2 className="text-2xl font-bold text-white mb-4">3. ¿Qué son los scripts?</h2>
          <p>Un script es un fragmento de código de programa que se utiliza para hacer que nuestra web funcione correctamente y de forma interactiva. Este código se ejecuta en nuestro servidor o en tu dispositivo.</p>

          <h2 className="text-2xl font-bold text-white mb-4">4. ¿Qué es una baliza web?</h2>
          <p>Una baliza web (o una etiqueta de píxel) es una pequeña e invisible pieza de texto o imagen en una web que se utiliza para monitorear el tráfico en una web. Para ello, se almacenan varios datos sobre usted mediante estas balizas web.</p>

          <h2 className="text-2xl font-bold text-white mb-4">5. Cookies</h2>
          <p><strong>5.1 Cookies técnicas o funcionales</strong></p>
          <p>Aseguran que la web funcione correctamente y que tu respuesta al aviso de cookies siga recordándose. En esta web son dos, y no son cookies: se guardan en el almacenamiento local de tu navegador. <strong>cookieConsent</strong> recuerda si ya has respondido al aviso, y <strong>statisticsCookies</strong> recuerda si aceptaste las de estadística. Ninguna de las dos te identifica ni se envía a ningún servidor, y por eso se colocan sin tu consentimiento.</p>

          <p><strong>5.2 Cookies de estadísticas</strong></p>
          <p>Utilizamos cookies estadísticas para optimizar la experiencia de la web para nuestros usuarios. Con estas cookies estadísticas obtenemos información sobre el uso de nuestra web. Te pedimos tu permiso para colocar cookies de estadísticas.</p>

          <h2 className="text-2xl font-bold text-white mb-4">6. Cookies usadas</h2>
          <p>
            Google Tag Manager y, a través de él, Google Analytics. Categoría: estadística.<br/>
            <strong>No se cargan hasta que aceptas.</strong> Mientras no lo hagas, el código de Google no se descarga y no se coloca ninguna cookie suya. Si aceptas, Google coloca sus propias cookies de medición.<br/>
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">7. Consentimiento</h2>
          <p>Cuando visitas la web por primera vez se muestra un aviso con una explicación sobre las cookies. Puedes marcar la casilla «Aceptar cookies de estadísticas» y pulsar «Guardar preferencias», o usar directamente «Aceptar todas» o «Rechazar todas». Hasta que no aceptas las de estadística no se carga ninguna herramienta de medición: el código de Google no se descarga siquiera. Si las rechazas, la web funciona exactamente igual, porque ninguna parte de ella depende de esas cookies.</p>

          <p><strong>7.1 Gestiona tus ajustes de consentimiento</strong></p>
          <p>Puedes gestionar tus preferencias de cookies en cualquier momento desde el banner de cookies que aparece en la página principal, donde podrás aceptar, denegar o personalizar las cookies que se utilizan en este sitio web.</p>

          <h2 className="text-2xl font-bold text-white mb-4">8. Activación/desactivación y borrado de cookies</h2>
          <p>Puedes utilizar tu navegador de Internet para eliminar las cookies de forma automática o manual. También puedes especificar que ciertas cookies no pueden ser colocadas. Otra opción es cambiar los ajustes de tu navegador de Internet para que recibas un mensaje cada vez que se coloca una cookie. Para obtener más información sobre estas opciones, consulta las instrucciones de la sección «Ayuda» de tu navegador.</p>
          <p>En esta web no hace falta: funciona correctamente con todas las cookies desactivadas, porque ninguna parte de ella depende de las de estadística. Si borras el almacenamiento de tu navegador, se te volverá a preguntar por el consentimiento en la siguiente visita, y hasta que respondas no se cargará ninguna herramienta de medición.</p>

          <h2 className="text-2xl font-bold text-white mb-4">9. Tus derechos con respecto a los datos personales</h2>
          <p>Tienes los siguientes derechos con respecto a tus datos personales:</p>
          <ul className="list-disc list-inside ml-4">
            <li>Tiene derecho a saber por qué se necesitan tus datos personales, qué sucederá con ellos y durante cuánto tiempo se conservarán.</li>
            <li>Derecho de acceso: tienes derecho a acceder a tus datos personales que conocemos.</li>
            <li>Derecho de rectificación: tienes derecho a completar, rectificar, borrar o bloquear tus datos personales cuando lo desees.</li>
            <li>Si nos das tu consentimiento para procesar tus datos, tienes derecho a revocar dicho consentimiento y a que se eliminen tus datos personales.</li>
            <li>Derecho de cesión de tus datos: tienes derecho a solicitar todos tus datos personales al responsable del tratamiento y a transferirlos íntegramente a otro responsable del tratamiento.</li>
            <li>Derecho de oposición: puedes oponerte al tratamiento de tus datos. Nosotros cumplimos con esto, a menos que existan motivos justificados para el procesamiento.</li>
          </ul>
          <p>Para ejercer estos derechos, por favor, contacta con nosotros. Por favor, consulta los detalles de contacto en la parte inferior de esta política de cookies. Si tienes alguna queja sobre cómo gestionamos tus datos, nos gustaría que nos la hicieras saber, pero también tienes derecho a enviar una queja a la autoridad supervisora (la autoridad de protección de datos).</p>

          <h2 className="text-2xl font-bold text-white mb-4">10. Datos de contacto</h2>
          <p>Para preguntas y/o comentarios sobre nuestra política de cookies y esta declaración, por favor, contacta con nosotros usando los siguientes datos de contacto:</p>
          <p>CookYourWeb - Verónica Serna Pérez<br/>
          NIF: 52474139F<br/>
          Dirección: C/ Tejera 35 1B, 28210 Valdemorillo, Madrid<br/>
          Web: https://www.cookyourwebai.es<br/>
          Correo electrónico: <a href='mailto:veronica@cookyourwebai.es'>veronica@cookyourwebai.es</a><br/>
          Teléfono: +34 688 75 77 82</p>
          <p>Esta política de cookies se sincronizó con cookiedatabase.org el 28 de diciembre de 2024.<br/>Última revisión del contenido: 18 de agosto de 2026, al cambiar la web para que Google Tag Manager solo se cargue con consentimiento previo.</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
