import { createRoot } from 'react-dom/client'
import App from './App.tsx'
// Fonts are bundled and served from our own domain, never from Google Fonts.
import "@fontsource/inter/400.css";
import "@fontsource/inter/700.css";
import "@fontsource/playfair-display/700.css";
import './index.css'

import { cargarGtmSiHayConsentimiento } from './lib/gtm'

cargarGtmSiHayConsentimiento();

createRoot(document.getElementById("root")!).render(<App />);
