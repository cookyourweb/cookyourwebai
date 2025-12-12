import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Check, AlertCircle, Loader2 } from 'lucide-react';

export default function Unsubscribe() {
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    reason: '',
    confirmDelete: false,
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.confirmDelete) {
      setErrorMessage('Debes confirmar que deseas eliminar tus datos');
      return;
    }

    if (!formData.email) {
      setErrorMessage('El email es obligatorio');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      // TODO: Reemplazar con tu webhook de Make/n8n
      const webhookUrl = 'https://hook.eu2.make.com/TU_WEBHOOK_AQUI';

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          phone: formData.phone,
          reason: formData.reason,
          timestamp: new Date().toISOString(),
          source: 'web_form_baja',
        }),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ email: '', phone: '', reason: '', confirmDelete: false });
      } else {
        throw new Error('Error al procesar la solicitud');
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage('Hubo un error al procesar tu solicitud. Por favor, inténtalo de nuevo o escribe a veronica@usecookyourwebai.es');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <Header />
      <div className="container mx-auto px-4 py-16 max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">
          Baja de <span className="text-purple-400">Comunicaciones</span>
        </h1>

        {status === 'success' ? (
          <div className="bg-green-900/20 border border-green-500 rounded-lg p-8 text-center">
            <Check className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4 text-green-400">Solicitud recibida</h2>
            <p className="text-zinc-300 mb-4">
              Tu solicitud de baja ha sido recibida correctamente. Procesaremos tu petición en un plazo máximo de 48 horas.
            </p>
            <p className="text-zinc-400 text-sm">
              Recibirás un email de confirmación cuando tus datos hayan sido eliminados.
            </p>
            <a
              href="/"
              className="inline-block mt-6 px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
            >
              Volver al inicio
            </a>
          </div>
        ) : (
          <>
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-8 mb-8">
              <h2 className="text-xl font-semibold mb-4 text-white">Sentimos verte partir 😢</h2>
              <p className="text-zinc-300 mb-4">
                Si deseas dejar de recibir nuestras comunicaciones y eliminar tus datos personales de nuestra base de datos, completa el siguiente formulario.
              </p>
              <p className="text-zinc-400 text-sm">
                Procesaremos tu solicitud en un plazo máximo de 48 horas y te enviaremos un email de confirmación.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2 text-zinc-200">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-white"
                  placeholder="tu@email.com"
                />
                <p className="text-xs text-zinc-500 mt-1">
                  Introduce el email con el que te registraste
                </p>
              </div>

              {/* Teléfono */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-2 text-zinc-200">
                  Teléfono (opcional)
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-white"
                  placeholder="+34 600 000 000"
                />
                <p className="text-xs text-zinc-500 mt-1">
                  Si te diste de alta vía WhatsApp, incluye tu teléfono
                </p>
              </div>

              {/* Motivo */}
              <div>
                <label htmlFor="reason" className="block text-sm font-medium mb-2 text-zinc-200">
                  ¿Por qué te das de baja? (opcional)
                </label>
                <textarea
                  id="reason"
                  value={formData.reason}
                  onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-white resize-none"
                  placeholder="Tu opinión nos ayuda a mejorar..."
                />
              </div>

              {/* Confirmación */}
              <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-4">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.confirmDelete}
                    onChange={(e) => setFormData({ ...formData, confirmDelete: e.target.checked })}
                    className="mt-1 w-5 h-5 text-purple-600 bg-zinc-900 border-zinc-700 rounded focus:ring-purple-500"
                  />
                  <span className="text-sm text-zinc-300">
                    Confirmo que deseo eliminar todos mis datos personales de CookYourWeb y dejar de recibir comunicaciones.
                    Entiendo que esta acción es <strong className="text-white">irreversible</strong>.
                  </span>
                </label>
              </div>

              {/* Error Message */}
              {(status === 'error' || errorMessage) && (
                <div className="bg-red-900/20 border border-red-500 rounded-lg p-4 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-300">{errorMessage}</p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === 'loading' || !formData.confirmDelete}
                className="w-full py-4 px-6 bg-purple-600 hover:bg-purple-700 disabled:bg-zinc-700 disabled:cursor-not-allowed rounded-lg font-semibold text-white transition-colors flex items-center justify-center gap-2"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Procesando...
                  </>
                ) : (
                  'Solicitar baja'
                )}
              </button>

              <p className="text-xs text-center text-zinc-500">
                Si tienes problemas, contacta con nosotros en{' '}
                <a href="mailto:veronica@usecookyourwebai.es" className="text-purple-400 hover:underline">
                  veronica@usecookyourwebai.es
                </a>
              </p>
            </form>

            {/* Info adicional */}
            <div className="mt-12 bg-zinc-900/50 border border-zinc-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3 text-white">¿Qué datos se eliminarán?</h3>
              <ul className="space-y-2 text-sm text-zinc-300">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  Tu información de contacto (nombre, email, teléfono)
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  Historial de conversaciones en WhatsApp
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  Datos almacenados en nuestros sistemas (Airtable, formularios)
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  Dejarás de recibir emails y mensajes comerciales
                </li>
              </ul>

              <h3 className="text-lg font-semibold mb-3 mt-6 text-white">¿Qué datos NO se eliminarán?</h3>
              <ul className="space-y-2 text-sm text-zinc-400">
                <li className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                  Datos que debemos conservar por obligaciones legales (facturas, contratos)
                </li>
                <li className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                  Datos anonimizados para estadísticas internas
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}
