import React from "react";

export default function DeveloperContactForm() {
  return (
    <form
      className="flex flex-col gap-4 items-center w-full max-w-sm mx-auto"
      onSubmit={e => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        if (!form.privacidad_dev.checked) {
          alert("Debes aceptar la política de privacidad.");
          return;
        }
        alert("¡Gracias por tu interés! Te contactaremos pronto para programar tu entrevista técnica gratuita.");
        form.reset();
      }}
    >
      <input
        type="text"
        name="nombre"
        placeholder="Tu nombre completo"
        className="w-full px-4 py-2 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:ring-2 focus:ring-neongreen outline-none"
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Tu email"
        className="w-full px-4 py-2 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:ring-2 focus:ring-neongreen outline-none"
        required
      />
      <select
        name="experiencia"
        className="w-full px-4 py-2 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:ring-2 focus:ring-neongreen outline-none"
        required
      >
        <option value="">Años de experiencia como dev</option>
        <option value="junior">1-2 años (Junior)</option>
        <option value="mid">3-5 años (Mid)</option>
        <option value="senior">5+ años (Senior)</option>
      </select>
      <select
        name="track"
        className="w-full px-4 py-2 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:ring-2 focus:ring-neongreen outline-none"
        required
      >
        <option value="">Track de interés</option>
        <option value="frontend">Frontend: IA en el Cliente</option>
        <option value="backend">Backend: IA y Machine Learning</option>
        <option value="ambos">Ambos tracks</option>
      </select>
      <textarea
        name="tecnologias"
        placeholder="¿Qué tecnologías dominas? (React, Python, Node.js, etc.)"
        className="w-full px-4 py-2 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:ring-2 focus:ring-neongreen outline-none"
        required
        rows={3}
      />
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
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-neongreen hover:text-neonblue"
          >
            política de privacidad
          </a>
          . Recibirás información sobre nuestros programas de formación.
        </label>
      </div>
      <button
        type="submit"
        className="mt-2 px-8 py-3 bg-gradient-to-r from-neongreen via-neonblue to-neonpink text-black font-bold rounded-2xl shadow hover:scale-105 transition"
      >
        Solicitar Entrevista Técnica
      </button>
    </form>
  );
}
