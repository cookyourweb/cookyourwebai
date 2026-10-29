import { Menu, MessageCircle } from "lucide-react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { EMPLEO_TECH } from "@/lib/empleo-tech";
import ContactDialog from "./ContactDialog";
import { Sheet, SheetClose, SheetContent, SheetTitle } from "./ui/sheet";

/** Kept as the id of the mobile panel: tests and aria-controls point to it. */
const MOBILE_MENU_ID = "mobile-menu-home";

const sections = [
  { label: "Automatización", anchor: "automatizacion-empresarial" },
  { label: "Funnels AI", anchor: "funnels-ia-avanzados" },
  { label: "Avatares AI", anchor: "ia-influencer-avatares" },
  { label: "Servicios Individuales", anchor: "servicios-individuales" },
  { label: "Paquetes", anchor: "paquetes" },
  { label: "Auditoría Gratis", anchor: "consultoria-transformacion-ia" },
  { label: "Desarrolladores", anchor: "desarrolladores" },
];

// A separate site in the ecosystem, not a home section: kept apart from the anchors.
const empleoTech = EMPLEO_TECH;

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neonblue";

/**
 * The only header of the site, mounted once by Layout. On the home the section
 * links are in-page anchors; on any other page they go to `/#section`.
 */
export default function Header() {
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const isHomePage = pathname === "/";
  const links = [
    ...sections.map((section) => ({
      label: section.label,
      href: isHomePage ? `#${section.anchor}` : `/#${section.anchor}`,
    })),
    empleoTech,
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-800 bg-black/90 backdrop-blur">
      <div className="container mx-auto flex items-center justify-between gap-4 px-4 py-3 md:px-8">
        <div className="flex flex-col items-start gap-1">
          <a
            href="/"
            className={`font-playfair text-xl md:text-2xl text-neonblue tracking-widest brightness-125 hover:text-neonblue/80 transition-colors ${focusRing}`}
          >
            cookYourWebAI
          </a>
          <span className="px-2 py-0.5 text-xs rounded-full bg-accent text-accent-foreground font-semibold tracking-wide animate-pulse-neon shadow-md">
            Agencia AI
          </span>
        </div>

        <nav aria-label="Principal" className="hidden xl:flex items-center gap-1 font-inter text-sm">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`relative px-2.5 py-2 group text-zinc-200 hover:text-neonviolet transition-colors whitespace-nowrap ${focusRing}`}
            >
              <span>{link.label}</span>
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-neonviolet transition-all group-hover:w-full"></span>
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setIsContactDialogOpen(true)}
            className={`inline-flex h-11 w-11 items-center justify-center rounded-md text-zinc-200 hover:text-green-400 transition-colors ${focusRing}`}
            title="Contactar por WhatsApp"
            aria-label="Contactar por WhatsApp"
          >
            <MessageCircle className="w-6 h-6 stroke-2" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => setIsMenuOpen(true)}
            className={`xl:hidden inline-flex h-11 w-11 items-center justify-center rounded-md text-zinc-200 hover:text-neonviolet transition-colors ${focusRing}`}
            aria-label="Abrir menú de navegación"
            aria-expanded={isMenuOpen}
            aria-controls={MOBILE_MENU_ID}
          >
            <Menu className="w-6 h-6 stroke-2" aria-hidden="true" />
          </button>
        </div>
      </div>

      <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <SheetContent
          id={MOBILE_MENU_ID}
          side="right"
          className="w-[88%] overflow-y-auto border-zinc-800 bg-black text-zinc-200"
          aria-describedby={undefined}
        >
          <SheetTitle className="sr-only">Menú</SheetTitle>
          <nav aria-label="Principal" className="mt-8 flex flex-col font-inter text-lg">
            {links.map((link) => (
              <SheetClose asChild key={link.label}>
                <a
                  href={link.href}
                  className={`flex min-h-11 items-center px-2 py-2 text-zinc-200 hover:text-neonviolet transition-colors ${focusRing}`}
                >
                  {link.label}
                </a>
              </SheetClose>
            ))}
          </nav>
        </SheetContent>
      </Sheet>

      <ContactDialog isOpen={isContactDialogOpen} onClose={() => setIsContactDialogOpen(false)} />
    </header>
  );
}
