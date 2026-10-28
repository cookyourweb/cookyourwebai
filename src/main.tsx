import { ViteReactSSG } from 'vite-react-ssg'
import { routes } from './routes'
// Fonts are bundled and served from our own domain, never from Google Fonts.
import "@fontsource/inter/400.css";
import "@fontsource/inter/700.css";
import "@fontsource/playfair-display/700.css";
import './index.css'

import { cargarGtmSiHayConsentimiento } from './lib/gtm'

// vite-react-ssg calls this at build time (to prerender each route) and in the
// browser (to hydrate it). GTM only makes sense, and only has consent, in the browser.
export const createRoot = ViteReactSSG({ routes }, ({ isClient }) => {
  if (isClient) cargarGtmSiHayConsentimiento()
})
