"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Send, CheckCircle } from "lucide-react";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(2, "El nombre es muy corto"),
  business: z.string().min(2, "El nombre del negocio es requerido"),
  whatsapp: z.string().regex(/^\d{10,}$/, "Ingresa un WhatsApp válido (solo números, ej. 5512345678)"),
  acceptedTerms: z.boolean().refine((val) => val === true, "Debes aceptar los términos y el aviso de privacidad"),
});

export default function Footer() {
  const [formData, setFormData] = useState({
    name: "",
    business: "",
    whatsapp: "",
    acceptedTerms: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});
    
    try {
      formSchema.parse(formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsSuccess(true);
      
      // In a real scenario you would send data to your backend here
      // const res = await fetch("/api/contact", { method: "POST", ... })
      
    } catch (error: unknown) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        (error as any).errors.forEach((err: z.ZodIssue) => {
          if (err.path[0]) {
            fieldErrors[err.path[0].toString()] = err.message;
          }
        });
        setErrors(fieldErrors);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="pt-20 text-white relative" id="contacto">
      {/* Subtle top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="linear-card p-8 sm:p-12 lg:p-16 mb-16 relative overflow-hidden mx-auto -mt-32 border-[#24B9F2]/30">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-azul-electrico/20 rounded-full mix-blend-screen filter blur-3xl translate-x-1/2 -translate-y-1/2"></div>
          
          <div className="grid lg:grid-cols-2 gap-12 relative z-10">
            <div>
              <h2 className="text-3xl sm:text-4xl font-medium text-white mb-4 tracking-tight">
                Da el primer paso hacia la tranquilidad
              </h2>
              <p className="text-white mb-8 max-w-md font-light">
                Agenda un diagnóstico gratuito y descubre cómo podemos implementar un sistema que trabaje por ti.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-white">
                  <CheckCircle className="w-5 h-5 text-amarillo-foco drop-shadow-[0_0_10px_rgba(242,216,76,0.5)]" />
                  <span className="font-light">Análisis de tu situación actual</span>
                </div>
                <div className="flex items-center gap-3 text-white">
                  <CheckCircle className="w-5 h-5 text-amarillo-foco drop-shadow-[0_0_10px_rgba(242,216,76,0.5)]" />
                  <span className="font-light">Propuesta de estrategia digital</span>
                </div>
                <div className="flex items-center gap-3 text-white">
                  <CheckCircle className="w-5 h-5 text-amarillo-foco drop-shadow-[0_0_10px_rgba(242,216,76,0.5)]" />
                  <span className="font-light">Sin compromisos ni jerga técnica</span>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-md border border-[#24B9F2]/30 rounded-2xl p-6 sm:p-8 shadow-[0_0_20px_rgba(36,185,242,0.1)]">
              {isSuccess ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-azul-electrico/20 text-white rounded-full flex items-center justify-center mx-auto mb-4 border border-[#24B9F2]/30 shadow-[0_0_30px_rgba(36,185,242,0.2)]">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-medium text-white mb-2 tracking-tight">¡Solicitud Enviada!</h3>
                  <p className="text-white font-light">
                    Nos pondremos en contacto contigo por WhatsApp a la brevedad.
                  </p>
                  <button 
                    onClick={() => { setIsSuccess(false); setFormData({name: "", business: "", whatsapp: "", acceptedTerms: false})}}
                    className="mt-6 text-amarillo-foco hover:text-white transition-colors text-sm font-medium"
                  >
                    Enviar otro mensaje
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-base font-medium text-white mb-1">Nombre Completo</label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      className={`w-full px-4 py-3 bg-white/5 border ${errors.name ? 'border-red-500/50' : 'border-[#24B9F2]/30'} rounded-xl text-white focus:outline-none focus:ring-1 focus:ring-azul-electrico focus:border-azul-electrico transition-all font-light`}
                      placeholder="Tu nombre"
                    />
                    {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="business" className="block text-base font-medium text-white mb-1">Nombre del Negocio (Spa / Centro)</label>
                    <input
                      type="text"
                      id="business"
                      value={formData.business}
                      onChange={e => setFormData({...formData, business: e.target.value})}
                      className={`w-full px-4 py-3 bg-white/5 border ${errors.business ? 'border-red-500/50' : 'border-[#24B9F2]/30'} rounded-xl text-white focus:outline-none focus:ring-1 focus:ring-azul-electrico focus:border-azul-electrico transition-all font-light`}
                      placeholder="Ej. Spa Serenidad"
                    />
                    {errors.business && <p className="text-red-400 text-xs mt-1">{errors.business}</p>}
                  </div>

                  <div>
                    <label htmlFor="whatsapp" className="block text-base font-medium text-white mb-1">WhatsApp de Contacto</label>
                    <input
                      type="tel"
                      id="whatsapp"
                      value={formData.whatsapp}
                      onChange={e => setFormData({...formData, whatsapp: e.target.value})}
                      className={`w-full px-4 py-3 bg-white/5 border ${errors.whatsapp ? 'border-red-500/50' : 'border-[#24B9F2]/30'} rounded-xl text-white focus:outline-none focus:ring-1 focus:ring-azul-electrico focus:border-azul-electrico transition-all font-light`}
                      placeholder="Solo números"
                    />
                    {errors.whatsapp && <p className="text-red-400 text-xs mt-1">{errors.whatsapp}</p>}
                  </div>

                  <div className="pt-2">
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <div className="relative flex items-center justify-center mt-1">
                        <input
                           type="checkbox"
                           checked={formData.acceptedTerms}
                           onChange={e => setFormData({...formData, acceptedTerms: e.target.checked})}
                           className="peer appearance-none w-5 h-5 border border-[#24B9F2]/50 bg-white/5 rounded cursor-pointer checked:bg-[#24B9F2] checked:border-[#24B9F2] transition-all"
                        />
                        <CheckCircle className="absolute w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" />
                      </div>
                      <span className="text-base text-white transition-colors leading-tight font-light">
                        Acepto el <Link href="/aviso-de-privacidad" className="text-white hover:text-amarillo-foco transition-colors">Aviso de Privacidad</Link> y <Link href="/terminos-y-condiciones" className="text-white hover:text-amarillo-foco transition-colors">Términos de Servicio</Link>
                      </span>
                    </label>
                    {errors.acceptedTerms && <p className="text-red-400 text-xs mt-1 ml-8">{errors.acceptedTerms}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-4 py-3.5 px-6 bg-amarillo-foco hover:bg-[#F5E27A] text-azul-noche font-medium rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 shadow-[0_0_20px_rgba(242,216,76,0.2)] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <span className="animate-pulse">Enviando...</span>
                    ) : (
                      <>
                        <span>Solicitar Diagnóstico</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Real Footer bottom */}
        <div className="pb-8 text-center text-base text-white font-light">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mb-6">
            <Link href="/" className="flex items-center gap-3 opacity-50 hover:opacity-100 transition-all">
              <div className="relative w-8 h-8 rounded-full overflow-hidden border border-[#24B9F2]/50 bg-[#05111D]">
                <Image src="/Foco_Digital_favicon_500.png" alt="Foco" fill className="object-cover" />
              </div>
              <span className="text-base font-medium tracking-tight text-white">Foco Digital</span>
            </Link>
            <div className="hidden sm:block w-px h-6 bg-white/10"></div>
            <a href="https://wa.me/525618765291" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">WhatsApp: +52 56 1876 5291</a>
            <a href="mailto:hola@focodigital.mx" className="hover:text-white transition-colors">hola@focodigital.mx</a>
          </div>
          <div className="border-t border-[#24B9F2]/20 pt-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
            <p>&copy; {new Date().getFullYear()} Agencia Foco Digital. Todos los derechos reservados.</p>
            <div className="flex gap-4">
              <Link href="/aviso-de-privacidad" className="hover:text-white transition-colors">Aviso de Privacidad</Link>
              <Link href="/terminos-y-condiciones" className="hover:text-white transition-colors">Términos</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
