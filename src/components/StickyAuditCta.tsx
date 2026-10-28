import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { useAudit } from "@/components/audit-context";

/**
 * Mobile-only bar fixed to the bottom, with a button to the free audit.
 * It steps aside while the cookie banner, the audit dialog or another
 * call-to-action block of the page (`data-audit-cta-zone`) is on screen.
 * Nothing here touches `window` during render, so it prerenders safely.
 */
export default function StickyAuditCta() {
  const { openAudit, auditOpen, cookieBannerVisible } = useAudit();
  const { pathname } = useLocation();
  const [zoneOnScreen, setZoneOnScreen] = useState(false);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const visible = new Set<Element>();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) visible.add(entry.target);
        else visible.delete(entry.target);
      }
      setZoneOnScreen(visible.size > 0);
    });
    document.querySelectorAll("[data-audit-cta-zone]").forEach((zone) => observer.observe(zone));
    return () => {
      observer.disconnect();
      setZoneOnScreen(false);
    };
  }, [pathname]);

  if (auditOpen || cookieBannerVisible || zoneOnScreen) return null;

  return (
    <div
      data-sticky-audit-cta
      className="fixed inset-x-0 bottom-0 z-30 border-t border-zinc-800 bg-black/95 px-4 py-3 md:hidden"
    >
      <button
        type="button"
        onClick={openAudit}
        className="flex min-h-11 w-full items-center justify-center rounded-xl bg-purple-700 px-4 py-2 font-bold text-white hover:bg-purple-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neonblue"
      >
        Auditoría AI gratuita
      </button>
    </div>
  );
}
