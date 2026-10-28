# Estado del proyecto · léelo al empezar cada sesión

Actualizado: 28-oct-2026 (PR D en borrador, #13). Producción = `main`.
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
- **En curso (rama `seo/prerender`, PR #13 en borrador):** PR D · Prerender con `vite-react-ssg@0.8.9` (la última versión que admite Vite 5). Aprobada por la responsable el 28-oct.
  - **Hecho cuando:** (1) el build genera un HTML por ruta pública con su `<h1>`, `<title>`, canonical y JSON-LD ya escritos; (2) una URL inexistente responde 404 y no 200; (3) los formularios, el banner de cookies y GTM con consentimiento siguen funcionando, con los tests en verde; (4) la CI comprueba (1) después de cada build, porque el build no se hace en local; (5) comprobado en producción con `curl`, sin JS.
  - **Plan B:** si `vite-react-ssg` no encaja, un prerender propio después del build. No se migra de framework.
  - **Hecho en local (28-oct), 184 tests en verde, `tsc` y ESLint limpios; el build NO se ha ejecutado en local:**
    - Rutas en `src/routes.tsx` bajo un `Layout` común (`src/components/Layout.tsx`); `src/App.tsx` queda solo para los tests; `src/main.tsx` exporta `createRoot` con `ViteReactSSG`.
    - Código de render a prueba de SSR: el banner de cookies lee `localStorage` tras montar (no se pinta hasta saberlo) y `gtm.ts` tolera no tener `localStorage`; GTM solo se arranca en el navegador.
    - `react-helmet-async` fijado a 1.3.0 (la que usa `vite-react-ssg`) para que haya una sola copia; `Seo.tsx` usa `Head` de `vite-react-ssg`.
    - `dirStyle: "nested"` (`/avisolegal` sirve `avisolegal/index.html`; sin `cleanUrls`, que redirigiría el fichero de verificación de Google). `/404` se prerenderiza y `scripts/prerender-404.mjs` lo mueve a `dist/404.html`.
    - `vercel.json`: fuera el rewrite global (soft 404); el bloque de redirección del dominio antiguo queda igual.
    - Decidido: se quita de `index.html` el respaldo estático de la cabecera (title, description, Open Graph, Twitter). Con el prerender, los bots de enlaces ya reciben las etiquetas reales de cada ruta, y mantenerlo las duplicaría en todas las páginas (el prerender inserta las suyas al principio del `<head>` sin quitar las del plantilla).
    - `scripts/verificar-prerender.mjs` (`npm run verify:prerender`, paso nuevo en `.github/workflows/tests.yml` tras el build): comprueba en `dist/` un único `<h1>`, `<title>` y description esperados (leídos como texto de `seo.ts`), canonical solo en las indexables, robots en las noindex, JSON-LD válido en las indexables y que existe `dist/404.html`.
  - **Tras la revisión (28-oct):** la CI de la PR #13 pasa con el build real (7 páginas generadas y `verify:prerender` en verde). El verificador comprueba además `lang="es"`, h1 con texto, og:title, og:image y twitter:card una vez, og:url igual a la canonical solo en las indexables, y el JSON-LD por tipo (`WebSite` y `ProfessionalService` en la home, `BreadcrumbList` de 2 elementos en las legales, nada en las noindex). Hay un test de hidratación de la 404 servida en una URL cualquiera, y `vercel.json` lleva `"trailingSlash": false`.
  - **Comprobado en la vista previa de Vercel (28-oct)**, con el navegador de la responsable y `fetch` desde la propia página (la vista previa pide login de Vercel):
    1. ✅ `/`, `/politicadeprivacidad`, `/cookie-policy` y `/avisolegal` responden 200, y cada una trae en el HTML su `<h1>`, su title, su canonical, `lang="es"` y su JSON-LD.
    2. ✅ `/baja` y `/agenteActivado?formulario=business` responden 200, con su robots noindex y sin canonical.
    3. ✅ `/avisolegal/` redirige a `/avisolegal`.
    4. ✅ `/no-existe` y `/no/existe/aun` responden 404 con la página 404 y noindex.
    5. ✅ `/robots.txt`, `/sitemap.xml`, `/google7d656d4d04069df9.html`, `/favicon.ico` y `/og-cookyourwebai.png` responden 200.
    6. ✅ Consola sin avisos de hidratación; tras hidratar hay una sola etiqueta de cada tipo; la navegación entre rutas funciona; GTM no carga sin consentimiento y sí carga tras pulsar «Aceptar».
    7. ✅ Formulario de auditoría: en la vista previa, n8n rechaza el origen (no está entre los autorizados), así que no se guarda nada y la web muestra «No hemos podido registrar tu solicitud» sin fingir éxito. El envío con éxito se comprueba en producción.
  - **Pendiente tras publicar en producción:** repetir 1 a 5 con `curl`, enviar un formulario de prueba (fila «PRUEBA» en Notion y aviso por email) y pedir a Search Console que inspeccione `/` y `/avisolegal`.
  - **Hallazgo aparte (no es de esta PR):** el primer nivel del banner de cookies solo ofrece «Aceptar» y «Ver preferencias», sin «Rechazar». La AEPD exige que rechazar sea igual de fácil que aceptar, y la política de cookies habla de «Rechazar todas». Revisarlo en otra PR.
- **Siguiente:**
  1. PR E · Iconos de jsDelivr alojados en el propio dominio.
  2. PR F · Cabecera única, CTA fija en móvil, bloque de cierre en cada página y casilla de privacidad en el diálogo de contacto.
  3. PR G · IndexNow y `llms.txt`.
  4. PR H · Fichas de proyecto por cliente y una página por servicio.
  5. PR I · Fichas y perfiles (LinkedIn, Instagram, WhatsApp Business) y `sameAs`.
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

### Descartado
- Migrar a Next.js o a Astro para el SEO: es excesivo para 7 rutas.
- Bloquear `/agenteActivado` en robots.txt (se decidió el 27-oct): impide leer su noindex.
