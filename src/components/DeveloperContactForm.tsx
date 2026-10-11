import React from "react";
import { useEnviarLead } from "./useEnviarLead";

export default function DeveloperContactForm() {
  const { enviar, enviando, error } = useEnviarLead();

  return (
    <form
      className="flex flex-col gap-4 items-center w-full max-w-sm mx-auto"
      onSubmit={e => {
        e.preventDefault();
        const datos = new FormData(e.currentTarget);
        const campo = (nombre: string) => String(datos.get(nombre) ?? "");
        const telefono = campo("telefono").trim();
        enviar({
          formulario: "developer",
          nombre: campo("nombre"),
          email: campo("email"),
          ...(telefono && { telefono }),
          mensaje: [
            `Rol: ${campo("rol")}`,
            `Objetivo: ${campo("objetivo")}`,
            `Experiencia: ${campo("experiencia")}`,
            `Track: ${campo("track")}`,
            `Tecnologías: ${campo("tecnologias")}`,
            // Without this consent we never message them on WhatsApp, even with a phone number.
            `WhatsApp: ${datos.get("whatsapp_dev") ? "sí" : "no"}`,
          ].join(" · ")
        });
      }}
    >
      <label htmlFor="dev-nombre" className="sr-only">Tu nombre completo</label>
      <input
        id="dev-nombre"
        type="text"
        name="nombre"
        placeholder="Tu nombre completo"
        className="w-full px-4 py-2 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:ring-2 focus:ring-neongreen outline-none"
        required
      />
      <label htmlFor="dev-email" className="sr-only">Tu email</label>
      <input
        id="dev-email"
        type="email"
        name="email"
        placeholder="Tu email"
        className="w-full px-4 py-2 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:ring-2 focus:ring-neongreen outline-none"
        required
      />
      <label htmlFor="dev-experiencia" className="sr-only">Años de experiencia como dev</label>
      <select
        id="dev-experiencia"
        name="experiencia"
        className="w-full px-4 py-2 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:ring-2 focus:ring-neongreen outline-none"
        required
      >
        <option value="">Años de experiencia como dev</option>
        <option value="junior">1-2 años (Junior)</option>
        <option value="mid">3-5 años (Mid)</option>
        <option value="senior">5+ años (Senior)</option>
      </select>
      <label htmlFor="dev-track" className="sr-only">Track de interés</label>
      <select
        id="dev-track"
        name="track"
        className="w-full px-4 py-2 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:ring-2 focus:ring-neongreen outline-none"
        required
      >
        <option value="">Track de interés</option>
        <option value="frontend">Frontend: IA en el Cliente</option>
        <option value="backend">Backend: IA y Machine Learning</option>
        <option value="ambos">Ambos tracks</option>
      </select>
      <label htmlFor="dev-tecnologias" className="sr-only">¿Qué tecnologías dominas? (React, Python, Node.js, etc.)</label>
      <textarea
        id="dev-tecnologias"
        name="tecnologias"
        placeholder="¿Qué tecnologías dominas? (React, Python, Node.js, etc.)"
        className="w-full px-4 py-2 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:ring-2 focus:ring-neongreen outline-none"
        required
        rows={3}
      />
      <label htmlFor="dev-rol" className="sr-only">¿A qué te dedicas ahora? (rol y sector)</label>
      <input
        id="dev-rol"
        type="text"
        name="rol"
        placeholder="¿A qué te dedicas ahora? (rol y sector)"
        className="w-full px-4 py-2 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:ring-2 focus:ring-neongreen outline-none"
        required
      />
      <label htmlFor="dev-objetivo" className="sr-only">¿Qué te gustaría construir o aprender con IA?</label>
      <textarea
        id="dev-objetivo"
        name="objetivo"
        placeholder="¿Qué te gustaría construir o aprender con IA?"
        className="w-full px-4 py-2 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:ring-2 focus:ring-neongreen outline-none"
        required
        rows={3}
      />
      <label htmlFor="dev-telefono" className="sr-only">Teléfono (opcional)</label>
      <input
        id="dev-telefono"
        type="tel"
        name="telefono"
        autoComplete="tel"
        placeholder="Teléfono (opcional)"
        className="w-full px-4 py-2 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:ring-2 focus:ring-neongreen outline-none"
      />
      <div className="flex items-center space-x-2 w-full text-left">
        <input
          id="whatsapp_dev"
          name="whatsapp_dev"
          type="checkbox"
          className="accent-neongreen scale-125"
        />
        <label htmlFor="whatsapp_dev" className="text-sm text-zinc-400">
          Acepto que Verónica Serna Pérez (CookYourWeb) me avise por WhatsApp, al teléfono que he facilitado, solo para informarme de la apertura de la cohorte. Puedo retirar este consentimiento escribiendo «BAJA» al mismo número. (Opcional)
        </label>
      </div>
      <div className="flex items-center space-x-2 w-full text-left">
        <input
          id="privacidad_dev"
          name="privacidad_dev"
          type="checkbox"
          required
          className="accent-neongreen scale-125"
        />
        <label htmlFor="privacidad_dev" className="text-sm text-zinc-400">
          He leído y acepto la{" "}
          <a
            href="/politicadeprivacidad"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-neongreen hover:text-neonblue"
          >
            política de privacidad
          </a>
          . Recibirás información sobre nuestros programas de formación.
        </label>
      </div>
      <p className="w-full text-sm text-zinc-400 text-left">
        Al enviar este formulario aceptas recibir un email de aviso cuando se abra la formación.
      </p>
      {error && (
        <p role="alert" className="w-full text-sm text-red-400">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={enviando}
        className="mt-2 px-8 py-3 bg-gradient-to-r from-neongreen via-neonblue to-neonpink text-black font-bold rounded-2xl shadow hover:scale-105 transition disabled:opacity-60 disabled:hover:scale-100"
      >
        {enviando ? "Enviando…" : "Unirme a la lista de espera"}
      </button>
    </form>
  );
}
