import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { MessageCircle, User, Mail, Phone } from "lucide-react";

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleWhatsAppRedirect = async () => {
    const webhookUrl = "https://hook.eu2.make.com/0bx5m15241a6roo7r8n2hwxp5tr046lm";

    // Enviar datos al webhook
    await fetch(`${webhookUrl}?source=web&canal=whatsapp&accion=nuevo_lead_desde_web`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        nombre: formData.name,
        email: formData.email,
        telefono: formData.phone,
        origen: "web"
      })
    });

    // Mensaje para WhatsApp
    const whatsappMessage = `Hola! Soy ${formData.name}.\n\nEste mensaje activa un funnel inteligente.\nMi email es: ${formData.email}\nMi número: ${formData.phone}\n\nEstoy listo para descubrir cómo la IA puede transformar mi negocio o mis proyectos.`;

    const whatsappUrl = `https://wa.me/34688757782?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, "_blank");

    onClose();

    setFormData({
      name: "",
      email: "",
      phone: ""
    });
  };

  const isFormValid = formData.name.trim() && formData.email.trim() && formData.phone.trim();

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
              <User className="absolute left-3 top-3 w-4 h-4 text-zinc-400" />
              <Input
                name="name"
                placeholder="Tu nombre"
                value={formData.name}
                onChange={handleInputChange}
                className="pl-10 bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-400"
              />
            </div>

            <div className="relative">
              <Mail className="absolute left-3 top-3 w-4 h-4 text-zinc-400" />
              <Input
                name="email"
                type="email"
                placeholder="Tu email"
                value={formData.email}
                onChange={handleInputChange}
                className="pl-10 bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-400"
              />
            </div>

            <div className="relative">
              <Phone className="absolute left-3 top-3 w-4 h-4 text-zinc-400" />
              <Input
                name="phone"
                type="tel"
                placeholder="Tu número de teléfono"
                value={formData.phone}
                onChange={handleInputChange}
                className="pl-10 bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-400"
              />
            </div>
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
