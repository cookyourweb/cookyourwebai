import { useAudit } from "@/components/audit-context";

const HEADING_ID = "closing-cta-heading";

/**
 * Short band before the footer: one heading, one line, one button to the free
 * audit. An h2 because every page it lands on already has its h1.
 */
export default function ClosingCta() {
  const { openAudit } = useAudit();
  return (
    <section
      aria-labelledby={HEADING_ID}
      data-audit-cta-zone
      className="container mx-auto mt-16 max-w-4xl px-4"
    >
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 px-6 py-8 text-center">
      <h2 id={HEADING_ID} className="text-2xl font-bold text-white mb-2">
        Auditoría AI gratuita
      </h2>
      <p className="text-zinc-300 mb-6">Cuéntanos tu caso con un breve formulario y te contactamos.</p>
      <button
        type="button"
        onClick={openAudit}
        className="inline-flex min-h-11 items-center justify-center rounded-xl bg-purple-700 px-6 py-2 font-bold text-white hover:bg-purple-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neonblue"
      >
        Solicitar auditoría
      </button>
      </div>
    </section>
  );
}
