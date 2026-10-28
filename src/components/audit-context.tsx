import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

import AuditDialog from "@/components/AuditDialog";

interface AuditContextValue {
  /** Opens the free-audit form (the same BusinessContactForm the home uses). */
  openAudit: () => void;
  /** True while the audit dialog is open. */
  auditOpen: boolean;
  /** The home reports here whether its cookie banner is on screen, so the sticky bar can stay out of its way. */
  cookieBannerVisible: boolean;
  setCookieBannerVisible: (visible: boolean) => void;
}

const noop = () => {};

const AuditContext = createContext<AuditContextValue>({
  openAudit: noop,
  auditOpen: false,
  cookieBannerVisible: false,
  setCookieBannerVisible: noop,
});

/** Shares one audit dialog and the cookie-banner flag across the whole site shell. */
export function AuditProvider({ children }: { children: ReactNode }) {
  const [auditOpen, setAuditOpen] = useState(false);
  const [cookieBannerVisible, setCookieBannerVisible] = useState(false);
  const openAudit = useCallback(() => setAuditOpen(true), []);

  const value = useMemo(
    () => ({ openAudit, auditOpen, cookieBannerVisible, setCookieBannerVisible }),
    [openAudit, auditOpen, cookieBannerVisible],
  );

  return (
    <AuditContext.Provider value={value}>
      {children}
      <AuditDialog open={auditOpen} onOpenChange={setAuditOpen} />
    </AuditContext.Provider>
  );
}

export const useAudit = () => useContext(AuditContext);
