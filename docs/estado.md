# Estado del proyecto · léelo al empezar cada sesión

Actualizado: 27-oct-2026. Producción = `main`.
Este fichero manda sobre la memoria, los resúmenes y los informes (ver `CLAUDE.md` §5).
**El repositorio es público:** aquí no van datos personales ni de clientes.

---

## 0. Tarea en curso

**SEO de www.cookyourwebai.es**, siguiendo la «Guía SEO para mis webs»
(fases 1, 2, 3, 4, 5 y 6) y el modelo técnico de Reformas Maestras.

- **Hecho:**
  - PR #8, publicada: Google Tag Manager solo con consentimiento. Comprobado en producción con un navegador limpio.
  - PR #9, publicada el 27-oct: base técnica. Incluye title, description y canonical por ruta, robots.txt y sitemap generados, imagen social de 1200×630, la copia estática de las etiquetas para los bots sin JS y una fuente única para los datos de contacto y el dominio. Comprobado en producción: robots.txt, sitemap.xml y la imagen responden 200, y tras ejecutar JS cada página tiene una sola canonical y la correcta.
- **En curso (esta rama):**
  - este `CLAUDE.md` y este `estado.md`;
  - redirección de `cookyourweb.es` y `www.cookyourweb.es` al dominio principal. Hoy los dos sirven la misma web con un 200, lo que crea contenido duplicado.
  - quitar la canonical y el `og:url` de la copia estática de `index.html`: en producción, el HTML crudo de las páginas legales llevaba una canonical a la home;
  - timeout de los tests a 15 s: la suite completa en paralelo en una máquina lenta daba timeouts falsos.
- **Pendiente de la responsable:** enviar el sitemap en Search Console (Sitemaps → `sitemap.xml`).
- **Siguiente:**
  1. PR C · JSON-LD: `WebSite`, `ProfessionalService` con `@id` fijo, `Person` y `Service`.
  2. PR D · Prerender con `vite-react-ssg@0.8.9` (la última versión que admite Vite 5): HTML real por ruta y un 404 de verdad.
  3. PR E · Iconos de jsDelivr alojados en el propio dominio.
  4. PR F · Cabecera única, CTA fija en móvil, bloque de cierre en cada página y casilla de privacidad en el diálogo de contacto.
  5. PR G · IndexNow y `llms.txt`.
  6. PR H · Fichas de proyecto por cliente y una página por servicio.
  7. PR I · Fichas y perfiles (LinkedIn, Instagram, WhatsApp Business) y `sameAs`.
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
