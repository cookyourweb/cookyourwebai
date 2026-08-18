const GTM_ID = "GTM-P9J6QN6T";

/**
 * Google Tag Manager solo puede cargarse con consentimiento previo del usuario.
 * Las cookies de estadistica no estan exentas: la AEPD exige que el usuario
 * acepte ANTES de que se coloquen. Por eso GTM no esta en index.html.
 */

let cargado = false;

export function hayConsentimientoEstadistica(): boolean {
  return localStorage.getItem("statisticsCookies") === "true";
}

export function cargarGtm(): void {
  if (cargado || !hayConsentimientoEstadistica()) return;
  cargado = true;

  const w = window as unknown as { dataLayer?: unknown[] };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
  document.head.appendChild(script);
}

/** Se llama al arrancar: carga GTM si el usuario ya habia aceptado antes. */
export function cargarGtmSiHayConsentimiento(): void {
  cargarGtm();
}
