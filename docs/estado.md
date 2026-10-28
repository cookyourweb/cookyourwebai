# Estado del proyecto · léelo al empezar cada sesión

Actualizado: 28-oct-2026 (tras publicar #13). Producción = `main`.
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
- **En curso:** ninguna.
- **Pendiente de la responsable:** pedir a Search Console que inspeccione `/` y `/avisolegal` (Inspección de URL → Probar URL publicada) para que vea el HTML nuevo.
- **Hallazgo aparte, no resuelto:** el primer nivel del banner de cookies solo ofrece «Aceptar» y «Ver preferencias», sin «Rechazar». La AEPD exige que rechazar sea igual de fácil que aceptar, y la política de cookies habla de «Rechazar todas». Hay que arreglarlo antes de seguir con el SEO: es una cuestión legal.
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
