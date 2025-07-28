import React from "react";

interface SectionCardProps {
  id: string;
  title: string;
  description: string;
  gradient: string;
  children?: React.ReactNode;
}
export default function SectionCard({ id, title, description, gradient, children }: SectionCardProps) {
  return (
    <section
      id={id}
      className={`relative flex flex-col justify-between rounded-3xl border-2 border-zinc-800 overflow-hidden min-h-[330px] bg-gradient-to-br ${gradient} p-8 shadow-xl hover:scale-105 transition-transform group`}
    >
      <div>
        <h2 className="text-3xl font-playfair mb-3 text-zinc-100 drop-shadow">{title}</h2>
        <p className="text-lg font-inter text-zinc-300">{description}</p>
      </div>
      <div className="mt-6 flex-1">{children}</div>
    </section>
  );
}
