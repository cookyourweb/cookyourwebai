import { ShieldCheck } from "lucide-react";

import { GUARANTEE } from "@/lib/servicios";

/** The paid services' guarantee, never shown without its conditions. */
export default function GuaranteeNote({ className = "" }: { className?: string }) {
  return (
    <div data-guarantee className={`rounded-xl border border-green-700 bg-green-950/40 p-4 ${className}`}>
      <p className="flex items-start font-semibold text-white">
        <ShieldCheck className="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-green-400" aria-hidden="true" />
        <span>{GUARANTEE.text}</span>
      </p>
      <p className="mt-2 text-sm text-zinc-300">{GUARANTEE.conditions}</p>
    </div>
  );
}
