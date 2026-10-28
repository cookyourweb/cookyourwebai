import type { RouteRecord } from "vite-react-ssg";

import Layout from "./components/Layout";
import Index from "./pages/Index";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import CookiePolicy from "./pages/CookiePolicy";
import LegalNotice from "./pages/LegalNotice";
import Unsubscribe from "./pages/Unsubscribe";
import AgenteActivado from "./pages/AgenteActivado";
import NotFound from "./pages/NotFound";

/**
 * The route table, shared by the browser entry (main.tsx) and the build-time
 * prerender. Every path except "*" is rendered to its own HTML file.
 */
export const routes: RouteRecord[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Index /> },
      { path: "politicadeprivacidad", element: <PrivacyPolicy /> },
      { path: "cookie-policy", element: <CookiePolicy /> },
      { path: "avisolegal", element: <LegalNotice /> },
      { path: "baja", element: <Unsubscribe /> },
      { path: "agenteActivado", element: <AgenteActivado /> },
      // Prerendered as dist/404.html, which Vercel serves with a real 404 status.
      { path: "404", element: <NotFound /> },
      // ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE
      { path: "*", element: <NotFound /> },
    ],
  },
];
