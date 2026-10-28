import { X } from "lucide-react";

import BusinessContactForm from "@/components/BusinessContactForm";
import { Dialog, DialogClose, DialogContent, DialogTitle } from "@/components/ui/dialog";

interface AuditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/** The free-audit dialog: the business contact form in a modal. Shared by the home and the site shell. */
export default function AuditDialog({ open, onOpenChange }: AuditDialogProps) {
  if (!open) return null;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        hideCloseButton
        className="block w-[95vw] max-w-lg max-h-[95vh] overflow-y-auto bg-zinc-900 rounded-xl md:rounded-2xl border border-zinc-700 px-6 pt-14 pb-8"
      >
        <DialogTitle className="sr-only">Formulario de Contacto Empresarial</DialogTitle>
        <DialogClose asChild>
          <button
            className="absolute top-2 right-2 md:top-4 md:right-4 z-50 text-zinc-400 hover:text-white bg-black/80 rounded-full p-2 md:p-3 hover:bg-red-500 transition-all shadow-lg"
            title="Cerrar formulario"
          >
            <X className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </DialogClose>
        <p className="text-center text-xl font-bold text-white mb-6">Auditoría AI gratuita</p>
        <BusinessContactForm />
      </DialogContent>
    </Dialog>
  );
}
