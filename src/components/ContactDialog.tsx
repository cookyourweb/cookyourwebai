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

  const handleWhatsAppRedirect = async () => {
    // Registrar el lead; si falla, el redirect a WhatsApp sigue adelante.
    await sendLead({
      formulario: "contacto",
      nombre: formData.name,
      email: formData.email,
      telefono: formData.phone
    });

    // Mensaje para WhatsApp
    const whatsappMessage = `Hola! Soy ${formData.name}.\n\nEste mensaje activa un funnel inteligente.\nMi email es: ${formData.email}\nMi número: ${formData.phone}\n\nEstoy listo para descubrir cómo la IA puede transformar mi negocio o mis proyectos.`;

    const whatsappUrl = COMPANY.whatsappUrl(whatsappMessage);
    window.open(whatsappUrl, "_blank");

    onClose();

    setFormData({
      name: "",
      email: "",
      phone: ""
    });
    setPrivacyAccepted(false);
  };

  const isFormValid =
    formData.name.trim() && formData.email.trim() && formData.phone.trim() && privacyAccepted;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-zinc-900 border-zinc-800">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white flex items-center gap-2">
            <MessageCircle className="w-6 h-6 text-green-400" />
            Contactar por WhatsApp
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
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
                placeholder="Tu número de teléfono"
                value={formData.phone}
                onChange={handleInputChange}
                className="pl-10 bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-400"
              />
            </div>
          </div>

          <div className="flex items-start gap-2 text-left">
            <input
              id="whatsapp-privacidad"
              name="privacidad"
              type="checkbox"
              checked={privacyAccepted}
              onChange={(e) => setPrivacyAccepted(e.target.checked)}
              className="mt-1 h-4 w-4 shrink-0 accent-green-600"
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
              </a>
              . Solo usaremos tus datos para responderte por WhatsApp y atender tu consulta.
            </label>
          </div>

          <Button
            onClick={handleWhatsAppRedirect}
            disabled={!isFormValid}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Enviar por WhatsApp
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
