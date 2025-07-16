
import { useState } from "react";
import { Search } from "lucide-react";

const articles = [
  { title: "Cómo crear tu web gratis con IA", section: "IA" },
  { title: "Las mejores herramientas de marketing gratuitas", section: "Marketing" },
  { title: "Landing moderna en React", section: "Front" },
  { title: "APIs backend sin complicaciones", section: "Back" },
  { title: "DevOps para principiantes", section: "DevOps" },
  { title: "Contacta conmigo", section: "Contacto" },
];

export default function ArticleSearch() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");

  const results = articles.filter(
    (a) =>
      a.title.toLowerCase().includes(q.toLowerCase()) ||
      a.section.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed top-6 right-16 z-40 flex gap-2 items-center bg-zinc-900/80 border border-neonpink rounded-2xl px-4 py-2 text-white shadow-xl hover:bg-zinc-800 hover:scale-105 transition-all"
      >
        <Search className="w-5 h-5 text-neonblue" />{" "}
        <span className="uppercase text-xs">Buscar artículos</span>
        <kbd className="ml-2 bg-zinc-700 px-2 py-0.5 rounded text-xs font-mono text-neonblue">Ctrl+K</kbd>
      </button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="mt-24 w-full max-w-xl bg-zinc-900 p-6 rounded-xl shadow-xl border-2 border-neonviolet">
            <div className="flex items-center gap-3 mb-4">
              <Search className="w-6 h-6 text-neonviolet" />
              <input
                autoFocus
                type="search"
                value={q}
                onChange={e => setQ(e.target.value)}
                placeholder="¿Qué quieres aprender hoy?"
                className="flex-1 bg-transparent outline-none text-xl placeholder:text-zinc-400 text-white"
                onKeyDown={e => {
                  if (e.key === "Escape") setOpen(false);
                }}
              />
              <button
                onClick={() => setOpen(false)}
                className="ml-2 px-2 py-1 text-xs rounded bg-neonpink text-white font-medium hover:brightness-125 transition"
                aria-label="Cerrar"
              >
                Cerrar
              </button>
            </div>
            <ul>
              {results.length ? (
                results.map(a => (
                  <li
                    key={a.title}
                    className="p-3 rounded-lg hover:bg-neonviolet/20 cursor-pointer transition-all font-inter"
                  >
                    <span className="font-semibold text-neonviolet">{a.title}</span>
                    <span className="ml-2 text-xs bg-zinc-800 px-2 py-0.5 rounded text-neonblue">{a.section}</span>
                  </li>
                ))
              ) : (
                <li className="text-zinc-400 px-3 py-2">No hay resultados.</li>
              )}
            </ul>
            <div className="mt-4 text-right text-xs text-zinc-400 font-mono">
              Pulsa <kbd className="bg-zinc-700 px-2 py-0.5 rounded text-neonpink">Escape</kbd> para cerrar.
            </div>
          </div>
        </div>
      )}
      {/* Ctrl+K para abrir */}
      <script dangerouslySetInnerHTML={{
        __html: `
        document.addEventListener('keydown', function(e){
          if ((e.ctrlKey || e.metaKey) && e.key==='k') {
            e.preventDefault();
            document.querySelector('[data-search-trigger]')?.click();
          }
        });
      `}} />
    </>
  );
}
