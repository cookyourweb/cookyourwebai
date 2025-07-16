import React from "react";

export default function BusinessContactForm() {
  return (
    <form
      className="flex flex-col gap-4 items-center w-full max-w-sm mx-auto"
      onSubmit={e => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        if (!form.privacidad.checked) {
          alert("Debes aceptar la política de privacidad.");
          return;
        }
        alert("¡Gracias por tu interés! Nos pondremos en contacto pronto para programar tu auditoría gratuita.");
        form.reset();
      }}
    >
      <input
        type="text"
        name="nombre"
        placeholder="Nombre y cargo"
        className="w-full px-4 py-2 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:ring-2 focus:ring-neonblue outline-none"
        required
      />
      <input
        type="text"
        name="empresa"
        placeholder="Nombre de tu empresa"
        className="w-full px-4 py-2 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:ring-2 focus:ring-neonblue outline-none"
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email corporativo"
        className="w-full px-4 py-2 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:ring-2 focus:ring-neonblue outline-none"
        required
      />
      <textarea
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
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-neonpink hover:text-neonblue"
          >
            política de privacidad
          </a>
          . Tus datos se tratarán bajo la normativa GDPR (UE) y LOPD. Solo contactaremos contigo para resolver tu consulta empresarial.
        </label>
      </div>
      <button
        type="submit"
        className="mt-2 px-8 py-3 bg-gradient-to-r from-neonblue via-neonpink to-neonviolet text-black font-bold rounded-2xl shadow hover:scale-105 transition"
      >
        Solicitar Auditoría IA Gratuita
      </button>
    </form>
  );
}
