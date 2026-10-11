import React from "react";
import { useEnviarLead } from "./useEnviarLead";

export default function BusinessContactForm() {
  const { enviar, enviando, error } = useEnviarLead();

  return (
    <form
      className="flex flex-col gap-4 items-center w-full max-w-sm mx-auto"
      onSubmit={e => {
        e.preventDefault();
        const datos = new FormData(e.currentTarget);
        const campo = (nombre: string) => String(datos.get(nombre) ?? "");
        enviar({
          formulario: "business",
          nombre: campo("nombre"),
          email: campo("email"),
          mensaje: `Empresa: ${campo("empresa")} · Objetivo: ${campo("objetivo")}`
        });
      }}
    >
      <label htmlFor="business-nombre" className="sr-only">Nombre y cargo</label>
      <input
        id="business-nombre"
        type="text"
        name="nombre"
        placeholder="Nombre y cargo"
        className="w-full px-4 py-2 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:ring-2 focus:ring-neonblue outline-none"
        required
      />
      <label htmlFor="business-empresa" className="sr-only">Nombre de tu empresa</label>
      <input
        id="business-empresa"
        type="text"
        name="empresa"
        placeholder="Nombre de tu empresa"
        className="w-full px-4 py-2 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:ring-2 focus:ring-neonblue outline-none"
        required
      />
      <label htmlFor="business-email" className="sr-only">Email corporativo</label>
      <input
        id="business-email"
        type="email"
        name="email"
        placeholder="Email corporativo"
        className="w-full px-4 py-2 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:ring-2 focus:ring-neonblue outline-none"
        required
      />
      <label htmlFor="business-objetivo" className="sr-only">¿Qué procesos te gustaría automatizar con IA?</label>
      <textarea
        id="business-objetivo"
        name="objetivo"
        placeholder="¿Qué procesos te gustaría automatizar con IA?"
        className="w-full px-4 py-2 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:ring-2 focus:ring-neonblue outline-none"
        required
        rows={3}
      />
      <div className="flex items-center space-x-2 w-full text-left">
        <input
          id="privacidad"
          name="privacidad"
          type="checkbox"
          required
          className="accent-neonpink scale-125"
        />
        <label htmlFor="privacidad" className="text-sm text-zinc-400">
          He leído y acepto la{" "}
          <a
            href="/politicadeprivacidad"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-neonpink hover:text-neonblue"
          >
            política de privacidad
          </a>
          . Tus datos se tratarán bajo la normativa GDPR (UE) y LOPD. Solo contactaremos contigo para resolver tu consulta empresarial.
        </label>
      </div>
      {error && (
        <p role="alert" className="w-full text-sm text-red-400">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={enviando}
        className="mt-2 px-8 py-3 bg-gradient-to-r from-neonblue via-neonpink to-neonviolet text-black font-bold rounded-2xl shadow hover:scale-105 transition disabled:opacity-60 disabled:hover:scale-100"
      >
        {enviando ? "Enviando…" : "Solicitar Auditoría IA Gratuita"}
      </button>
    </form>
  );
}
