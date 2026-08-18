import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import { cargarGtmSiHayConsentimiento } from './lib/gtm'

cargarGtmSiHayConsentimiento();

createRoot(document.getElementById("root")!).render(<App />);
