
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

  const handleWhatsAppRedirect = () => {
    const whatsappMessage = `Hola! Soy ${formData.name}.\n\nEmail: ${formData.email}\n\nMensaje: ${formData.message}\n\nMe gustaría conocer más sobre sus servicios de IA.`;
    const whatsappUrl = `https://wa.me/34688757782?text=${encodeURIComponent(whatsappMessage)}`;
    
    window.open(whatsappUrl, '_blank');
    onClose();
    
    // Reset form
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
            Completa tus datos para contactarnos directamente por WhatsApp
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
