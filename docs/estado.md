# Estado del proyecto · léelo al empezar cada sesión

Actualizado: 29-oct-2026 (tras publicar #19). Producción = `main`.
Este fichero manda sobre la memoria, los resúmenes y los informes (ver `CLAUDE.md` §5).
**El repositorio es público:** aquí no van datos personales ni de clientes.

---

## 0. Tarea en curso

**SEO de www.cookyourwebai.es**, siguiendo la «Guía SEO para mis webs»
(fases 1, 2, 3, 4, 5 y 6) y el modelo técnico de Reformas Maestras.

- **Hecho:**
  - PR #8, publicada: Google Tag Manager solo con consentimiento. Comprobado en producción con un navegador limpio.
  - PR #9, publicada el 27-oct: base técnica. Incluye title, description y canonical por ruta, robots.txt y sitemap generados, imagen social de 1200×630, la copia estática de las etiquetas para los bots sin JS y una fuente única para los datos de contacto y el dominio. Comprobado en producción: robots.txt, sitemap.xml y la imagen responden 200, y tras ejecutar JS cada página tiene una sola canonical y la correcta.
  - PR #10 y #11, publicadas el 27-oct: `CLAUDE.md` y este `estado.md`; `cookyourweb.es` y `www.cookyourweb.es` redirigen con 308 a `https://www.cookyourwebai.es`, conservando la ruta e incluida la raíz (comprobado con curl); el HTML estático ya no lleva canonical ni `og:url`; timeout de los tests a 15 s.
  - Sitemap enviado en Search Console el 27-oct: «Se ha enviado correctamente».
  - PR #12, publicada el 28-oct: JSON-LD. Grafo de la home (`WebSite`, `ProfessionalService`, `Person` sin `jobTitle`, 4 `Service`) y `BreadcrumbList` en las tres páginas legales, con la miga visible generada desde los mismos datos (`breadcrumbTrail` en `src/lib/seo.ts`). Validado: validator.schema.org con 0 errores y 0 avisos, y en la prueba de resultados enriquecidos de Google `/avisolegal` da «1 elemento válido» (28-oct). Los `url` de los `Service` apuntan a anclajes de la home hasta que la PR H los sustituya. Sus nombres siguen los textos visibles de `src/lib/servicios.ts`, que usan «AI».
  - PR #13, publicada el 28-oct: prerender con `vite-react-ssg@0.8.9`. Cada página pública llega con su HTML completo, una URL inexistente da 404 y `/x/` redirige a `/x`. La CI verifica el HTML generado en cada build (`scripts/verificar-prerender.mjs`). **Comprobado en producción con `curl`, sin JS:** las cuatro públicas dan 200 con `<h1>`, title, canonical y JSON-LD en el HTML; `/baja` y la 404 tienen noindex; `/no-existe` da 404; `/avisolegal/` da 308; los ficheros estáticos y el dominio viejo siguen bien. Formulario de auditoría enviado en producción: lleva a «¡Gracias!» y crea una sola fila «PRUEBA Claude prerender» en Notion (borrarla). Antes, en la vista previa: sin avisos de hidratación y GTM solo tras «Aceptar».
  - PR #14, publicada el 28-oct: consentimiento de cookies. «Guardar preferencias» con la casilla desmarcada guardaba `statisticsCookies=true` y cargaba GTM (el clic pasaba el evento como argumento), y «Rechazar todas» tras marcar la casilla también guardaba `true` (leía el estado anterior). El primer nivel ya tenía «Denegar»: el hallazgo anterior era erróneo. **Comprobado en producción con un navegador limpio:** al guardar con la casilla desmarcada queda `statisticsCookies=false` y no se pide `gtm.js`.
  - PR #15, publicada el 28-oct (PR E): los 7 logos de tecnologías de la home (Devicon, MIT) se sirven desde `public/logos/`. **Comprobado en producción con un navegador limpio:** cargan los 7 desde `/logos/`, no hay ninguna petición a jsDelivr y la home solo pide recursos a `www.cookyourwebai.es`.
  - PR #16, publicada el 28-oct (PR F, primera parte): casilla de privacidad obligatoria en el diálogo de contacto por WhatsApp (`ContactDialog`) y arreglos de móvil revisados por los agentes Accessibility Auditor y Frontend Developer. **Comprobado en producción** en `/avisolegal` a 360×340 con emulación móvil (con `fetch` y `window.open` simulados, sin enviar nada): el diálogo cabe con 16 px de margen y se desplaza; sin la casilla no se envía nada; con la casilla, WhatsApp se abre en el mismo clic y el lead sale con `keepalive`; autocompletado `name`/`email`/`tel`; sin scroll horizontal.
  - PR #17, publicada el 28-oct: botón «Cerrar» con nombre accesible en el asistente de WhatsApp de la home y test que impide abrir diálogos sin acción del usuario. **Comprobado en producción:** tras 10 s sin interactuar no hay ningún diálogo abierto; el botón de cierre tiene `aria-label="Cerrar"` y, tras cerrarlo, no reaparece.
  - PR #18, publicada el 28-oct (PR F, segunda parte): una sola cabecera (`components/Header.tsx`, montada en `Layout`) en todas las páginas, hecha por el agente UI Designer; el botón de WhatsApp abre el formulario de contacto en todas partes y se retira el asistente de la home. **Comprobado en producción** en `/` y `/avisolegal`: a 375×740 hay una sola cabecera, el logo enlaza a `/`, el menú móvil abre (`aria-expanded=true`), lista los anclajes (`/#…` fuera de la home) y se cierra con Escape, y el botón de WhatsApp abre el formulario con casilla de privacidad; a 1280×800 se ve la navegación de escritorio y existen los 7 destinos de los anclajes; sin scroll horizontal.
  - PR #19, publicada el 28-oct (PR F, última parte): botón fijo «Auditoría AI gratuita» en móvil y bloque de cierre antes del pie, hechos por el agente UI Designer. **Comprobado en producción:** en `/avisolegal` a 375×740 el botón aparece, abre el formulario de auditoría con casilla de privacidad, se oculta con el formulario abierto y mientras el bloque de cierre está a la vista; en `/` se oculta con el banner de cookies y aparece tras responder; a 1280×800 no se muestra; `/baja` y `/agenteActivado` no tienen bloque de cierre; sin scroll horizontal. **Con esto la PR F queda terminada.**
- **En curso:** ninguna.
- **Descartado tras comprobarlo (28-oct):** el aviso de que el `WhatsAppForm` de la home «se abre solo y reaparece» era un falso positivo. El agente UX Architect no lo reprodujo en móvil ni en escritorio (espera de 15 s, scroll, cierre con X, Escape y clic fuera); solo se abre con un clic. Probablemente se confundió con el banner de cookies. Ahora un test impide que la home abra un diálogo sin acción del usuario, y el botón de cierre de ese diálogo tiene nombre accesible («Cerrar»).
- **Pendiente de la responsable:** pedir a Search Console que inspeccione `/` y `/avisolegal` (Inspección de URL → Probar URL publicada) para que vea el HTML nuevo.
- **Siguiente:**
  1. PR G · IndexNow y `llms.txt`.
  2. PR H · Fichas de proyecto por cliente y una página por servicio.
  3. PR I · Fichas y perfiles (LinkedIn, Instagram, WhatsApp Business) y `sameAs`.
- **Hecho cuando:** todo lo anterior está publicado y comprobado en producción, el sitemap está enviado en Search Console y Bing, y no queda ningún punto de la fase 6 sin cumplir.

## 1. Documentos

- Plan del SEO: fuera del repo (`~/.claude/plans/streamed-napping-whisper.md`).
- Auditoría SEO del 26-oct-2026: fuera del repo (`~/cookyourweb/seo/`).
- Guía SEO: «Guía SEO para mis webs» (PDF de la responsable, fuera del repo).

## 2. Producción

- Dominio principal: `https://www.cookyourwebai.es`. `cookyourwebai.es` redirige con 308 a `www`.
- Vercel despliega `main`; la CI de GitHub corre los tests y el build en cada push y en cada PR.
- Search Console: verificada la propiedad de prefijo de URL `https://www.cookyourwebai.es/`, con un fichero HTML en `public/`.

## 3. Decisiones

- Marca en los títulos, el schema y el pie: **CookYourWebAI**.
- En títulos y descripciones se escribe **«IA»**, no «AI». El resto de los textos de la web no se tocan por esto.
- Sin ciudad ni dirección en los títulos, las descripciones y el schema. Es un negocio online: schema `ProfessionalService` sin `address`.
- La búsqueda principal es «servicio + para quién» (por ejemplo, «agencia de IA y automatización para empresas»), no «servicio + ciudad».
- Canonical con `www` y sin barra final, salvo la home (`https://www.cookyourwebai.es/`).
- `robots.txt` no bloquea `/agenteActivado`, para que Google pueda leer su noindex.
- Las páginas con noindex no emiten canonical ni `og:url`.
- Google Tag Manager se carga solo con el consentimiento de estadística (`src/lib/gtm.ts`).
- Las fuentes y los recursos visibles se sirven desde el propio dominio, nunca desde Google Fonts ni CDN de terceros.
- Prerender con `vite-react-ssg`. Si en la prueba no encaja, se hace un prerender propio después del build; no se migra de framework.

- El botón de WhatsApp de la cabecera terminará abriendo un **agente de texto con IA dentro de la web**: conversa con la persona, responde sus dudas y al final pide sus datos para contactarla (decidido el 28-oct). Es una tarea propia, distinta de la PR F; hay que diseñarla (proveedor de IA, coste, privacidad) antes de construirla.

- Mientras no exista el agente de texto, el botón de WhatsApp de la cabecera abre en todas las páginas el formulario de contacto (`ContactDialog`: guarda el lead en Notion vía n8n, con casilla de privacidad, y abre WhatsApp). Se retira el asistente de la home (`WhatsAppForm`) y sus cifras de ROI no confirmadas (decidido el 28-oct).

- Captación (fase 6): botón fijo «Auditoría AI gratuita» en móvil y bloque de cierre («Auditoría AI gratuita» / «Cuéntanos tu caso con un breve formulario y te contactamos.» / «Solicitar auditoría»), textos aprobados el 28-oct. Ambos abren el formulario de auditoría existente. `/baja` y `/agenteActivado` no llevan captación: «baja es baja».

### Descartado
- Migrar a Next.js o a Astro para el SEO: es excesivo para 7 rutas.
- Bloquear `/agenteActivado` en robots.txt (se decidió el 27-oct): impide leer su noindex.
