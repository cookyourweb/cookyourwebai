import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet, useLocation } from "react-router-dom";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Header from "@/components/Header";
import StickyAuditCta from "@/components/StickyAuditCta";
import { AuditProvider } from "@/components/audit-context";
import { RUTAS_PUBLICAS } from "@/lib/rutas-publicas";

const queryClient = new QueryClient();

/** Shell shared by every route: providers, skip link, the single site header, toasters and the sticky audit bar. */
export default function Layout() {
  const { pathname } = useLocation();
  // The sticky audit bar lives on the public content pages only.
  const hasStickyCta = RUTAS_PUBLICAS.includes(pathname);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuditProvider>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        >
          Saltar al contenido principal
        </a>
        <Header />
        <Toaster />
        <Sonner />
        <div data-page-body className={hasStickyCta ? "bg-black pb-20 md:pb-0" : undefined}>
          <Outlet />
        </div>
        {hasStickyCta && <StickyAuditCta />}
        </AuditProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
