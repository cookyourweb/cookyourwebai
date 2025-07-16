import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, User, Mail, MessageSquare } from "lucide-react";

interface ContactDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactDialog({ isOpen, onClose }: ContactDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleWhatsAppRedirect = async () => {
    const webhookUrl = "https://hook.eu2.make.com/0bx5m15241a6roo7r8n2hwxp5tr046lm";

    // Enviar los datos al webhook de Make
    await fetch(`${webhookUrl}?source=web&canal=whatsapp&accion=form_contacto_modal`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        nombre: formData.name,
        email: formData.email,
        mensaje: formData.message
      })
    });

    // Mensaje personalizado para WhatsApp
    const whatsappMessage = `Hola, soy ${formData.name}.\n\nEstoy interesado en soluciones con IA para mi negocio o mis proyectos como dev.\n\n⚡️Con este mensaje, activarás un funnel creado en tiempo real a partir de lo que necesitas: texto, video, imagen, voz o automatización.\n\n🚀 Mi flujo tomará el camino preparado para ti, con el objetivo de darte la mejor respuesta en el menor tiempo posible.\n\nEstoy listo para ver cómo puede ayudarme la inteligencia artificial.`;

    const whatsappUrl = `https://wa.me/34688757782?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, "_blank");

    onClose();

    // Resetear formulario
    setFormData({
      name: "",
      email: "",
      message: ""
    });
  };

  const isFormValid = formData.name.trim() && formData.email.trim() && formData.message.trim();

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
            Completa tus datos para activar tu funnel personalizado por WhatsApp.
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
              <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-zinc-400" />
              <Textarea
                name="message"
                placeholder="¿En qué podemos ayudarte?"
                value={formData.message}
                onChange={handleInputChange}
                className="pl-10 pt-3 bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-400 min-h-[80px]"
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
