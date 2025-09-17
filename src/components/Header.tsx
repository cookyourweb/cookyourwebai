import { Contact, MessageCircle } from "lucide-react";
import React, { useState } from "react";
import ContactDialog from "./ContactDialog";

const sections = [
  { label: "Automatización", anchor: "#automatizacion-empresarial", isService: true },
  { label: "Funnels AI", anchor: "#funnels-ia-avanzados", isService: true },
  { label: "Avatares AI", anchor: "#ia-influencer-avatares", isService: true },
  { label: "Servicios Individuales", anchor: "#servicios-individuales", isService: false },
  { label: "Paquetes", anchor: "#paquetes", isService: false },
  { label: "Asesoría AI Gratis", anchor: "#consultoria-transformacion-ia", isService: true }];

export default function Header() {
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);

  return (
    <header className="w-full py-4 flex items-center justify-between border-b border-zinc-800 bg-black/60 backdrop-blur sticky top-0 z-30">
      <div className="flex flex-col items-start gap-1 px-8">
        <a
          href="https://usecookyourwebai.es/home"
          target="_blank"
          rel="noopener noreferrer"
          className="font-playfair text-2xl text-neonblue tracking-widest brightness-125 select-none hover:text-neonblue/80 transition-colors"
        >
          cookYourWebAi
        </a>
        <span className="px-2 py-1 text-xs rounded-full bg-neonpink text-white font-semibold tracking-wide animate-pulse-neon shadow-md">
          Agencia IA
        </span>
      </div>
      <nav className="hidden md:flex gap-6 font-inter text-lg">
        {sections.map((section) => (
          <a
            key={section.label}
            href={section.anchor}
            className="relative px-2 py-1 group text-zinc-200 hover:text-neonviolet transition-colors"
          >
            <span>{section.label}</span>
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-neonviolet transition-all group-hover:w-full"></span>
          </a>
        ))}
      </nav>
      <div className="pr-8 flex items-center gap-4">
        <button
          onClick={() => setIsContactDialogOpen(true)}
          className="text-zinc-200 hover:text-green-400 transition-colors"
          title="Contactar por WhatsApp"
        >
          <MessageCircle className="w-6 h-6 stroke-2" />
        </button>
      </div>
      
      <ContactDialog 
        isOpen={isContactDialogOpen} 
        onClose={() => setIsContactDialogOpen(false)} 
      />
    </header>
  );
}
