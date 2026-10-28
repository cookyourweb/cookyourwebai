import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { MessageCircle, User, Mail, Phone } from "lucide-react";
import { sendLead } from "@/lib/leadsWebhook";
import { COMPANY } from "@/lib/company";

interface ContactDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactDialog({ isOpen, onClose }: ContactDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: ""
  });
  const [privacyAccepted, setPrivacyAccepted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const isFormValid = Boolean(
    formData.name.trim() && formData.email.trim() && formData.phone.trim() && privacyAccepted
  );

  // WhatsApp opens synchronously inside the click: iOS Safari blocks window.open
  // once the handler has awaited the network. The lead is sent without waiting
  // (fetch keepalive), and a webhook failure never blocks the conversation.
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isFormValid) return;

    const whatsappMessage = `Hola! Soy ${formData.name}.\n\nEste mensaje activa un funnel inteligente.\nMi email es: ${formData.email}\nMi número: ${formData.phone}\n\nEstoy listo para descubrir cómo la IA puede transformar mi negocio o mis proyectos.`;
    window.open(COMPANY.whatsappUrl(whatsappMessage), "_blank");

    void sendLead({
      formulario: "contacto",
      nombre: formData.name,
      email: formData.email,
      telefono: formData.phone
    });

    onClose();
    setFormData({ name: "", email: "", phone: "" });
    setPrivacyAccepted(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[calc(100%-2rem)] rounded-lg sm:max-w-md max-h-[100dvh] overflow-y-auto bg-zinc-900 border-zinc-800">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white flex items-center gap-2">
            <MessageCircle className="w-6 h-6 text-green-400" />
            Contactar por WhatsApp
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} noValidate className="space-y-4 py-4">
          <p className="text-zinc-300 text-sm">
            Deja tus datos para que el sistema active un funnel personalizado por WhatsApp.
          </p>

          <div className="space-y-4">
            <div className="relative">
              <label htmlFor="whatsapp-name" className="sr-only">Tu nombre</label>
              <User className="absolute left-3 top-3 w-4 h-4 text-zinc-400" />
              <Input
                id="whatsapp-name"
                name="name"
                autoComplete="name"
                autoCapitalize="words"
                enterKeyHint="next"
                placeholder="Tu nombre"
                value={formData.name}
                onChange={handleInputChange}
                className="pl-10 bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-400"
              />
            </div>

            <div className="relative">
              <label htmlFor="whatsapp-email" className="sr-only">Tu email</label>
              <Mail className="absolute left-3 top-3 w-4 h-4 text-zinc-400" />
              <Input
                id="whatsapp-email"
                name="email"
                type="email"
                autoComplete="email"
                enterKeyHint="next"
                placeholder="Tu email"
                value={formData.email}
                onChange={handleInputChange}
                className="pl-10 bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-400"
              />
            </div>

            <div className="relative">
              <label htmlFor="whatsapp-phone" className="sr-only">Tu número de teléfono</label>
              <Phone className="absolute left-3 top-3 w-4 h-4 text-zinc-400" />
              <Input
                id="whatsapp-phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                placeholder="Tu número de teléfono"
                value={formData.phone}
                onChange={handleInputChange}
                className="pl-10 bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-400"
              />
            </div>
          </div>

          <div className="flex items-start gap-2 py-1 text-left">
            <input
              id="whatsapp-privacidad"
              name="privacidad"
              type="checkbox"
              checked={privacyAccepted}
              onChange={(e) => setPrivacyAccepted(e.target.checked)}
              className="mt-0.5 h-5 w-5 shrink-0 accent-green-600"
            />
            <label htmlFor="whatsapp-privacidad" className="text-sm text-zinc-400">
              He leído y acepto la{" "}
              <a
                href="/politicadeprivacidad"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-green-400 hover:text-green-300"
              >
                política de privacidad
                <span className="sr-only"> (se abre en una pestaña nueva)</span>
              </a>
              . Solo usaremos tus datos para responderte por WhatsApp y atender tu consulta.
            </label>
          </div>

          <Button
            type="submit"
            aria-disabled={!isFormValid}
            aria-describedby="whatsapp-hint"
            className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-2 px-4 rounded-lg transition-colors aria-disabled:opacity-50 aria-disabled:cursor-not-allowed"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Enviar por WhatsApp
          </Button>
          <p id="whatsapp-hint" className="text-xs text-zinc-400">
            Rellena tus datos y acepta la política de privacidad para continuar.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}
