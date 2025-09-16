import React from 'react';
import { X } from 'lucide-react';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: React.ReactNode;
}

export default function LegalModal({ isOpen, onClose, title, content }: LegalModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-4xl h-[90vh] bg-zinc-900 rounded-2xl relative border border-zinc-700 overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 text-zinc-400 hover:text-white bg-black/80 rounded-full p-3 hover:bg-red-500 transition-all shadow-lg"
          title={`Cerrar ${title.toLowerCase()}`}
        >
          <X className="w-6 h-6" />
        </button>

        <div className="h-full overflow-y-auto">
          <div className="p-6 md:p-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">
              {title}
            </h1>

            <div className="text-zinc-300 text-sm leading-relaxed space-y-6 max-w-3xl mx-auto">
              {content}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
