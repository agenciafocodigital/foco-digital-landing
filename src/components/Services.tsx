"use client";

import { motion } from "framer-motion";
import { ArrowRight, Bot, Target, Sparkles, CalendarCheck, CheckCircle2 } from "lucide-react";

export default function Services() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <motion.section 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className="py-24 bg-azul-noche relative overflow-hidden" 
      id="servicios"
    >
      {/* Background accents removed */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <div className="text-center mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-medium text-white mb-4">
            Sistemas que <span className="text-amarillo-foco">trabajan por ti</span>
          </h2>
          <p className="text-white text-base">
            Soluciones prácticas y sin jerga técnica para que tú te dediques exclusivamente a brindar bienestar.
          </p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 gap-8 w-full"
        >
          {/* Card 1: Visibilidad */}
          <motion.div 
            variants={cardVariants}
            className="group linear-card p-8 sm:p-10 flex flex-col h-full relative"
          >
            {/* Glowing border top */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-1.5xl"></div>
            
            <div className="relative z-10 flex-1">
              <div className="w-12 h-12 bg-azul-electrico/10 text-white rounded-xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 border border-azul-electrico/30 shadow-inner">
                <Target className="w-6 h-6" />
              </div>
              
              <h3 className="text-2xl font-medium text-white mb-3 tracking-tight">Visibilidad Digital</h3>
              <p className="text-white mb-8 min-h-[80px] font-light">
                Estrategia digital integral para posicionar tu centro y dejar de depender exclusivamente de los referidos.
              </p>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 text-base text-white">
                  <Sparkles className="w-4 h-4 text-amarillo-foco flex-shrink-0" />
                  <span>Optimización de perfiles sociales</span>
                </li>
                <li className="flex items-center gap-3 text-base text-white">
                  <Sparkles className="w-4 h-4 text-amarillo-foco flex-shrink-0" />
                  <span>Estrategia de captación de clientes</span>
                </li>
                <li className="flex items-center gap-3 text-base text-white">
                  <Sparkles className="w-4 h-4 text-amarillo-foco flex-shrink-0" />
                  <span>Posicionamiento local (SEO)</span>
                </li>
              </ul>
            </div>
            
            <div className="relative z-10 mt-auto pt-6 border-t border-[#24B9F2]/20">
              <div className="text-base text-white mb-4 tracking-wider font-medium">Inversión mensual base: <strong className="text-white text-base font-medium ml-1">$390 USD</strong></div>
              <a 
                href="#contacto"
                className="inline-flex items-center justify-between w-full py-3 px-5 bg-amarillo-foco text-azul-noche hover:bg-[#F5E27A] font-medium rounded-xl transition-all duration-300 transform group-hover:-translate-y-1 shadow-[0_0_20px_rgba(242,216,76,0.2)] hover:shadow-[0_0_30px_rgba(242,216,76,0.4)]"
              >
                <span>Solicitar diagnóstico</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>

          {/* Card 2: Visibilidad + Automatización */}
          <motion.div 
            variants={cardVariants}
            className="group linear-card p-8 sm:p-10 flex flex-col h-full shadow-2xl relative"
          >
            {/* Highlight glowing border top */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-azul-electrico to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>

            {/* Highlight Badge */}
            <div className="absolute top-0 right-8 bg-gradient-to-r from-azul-electrico to-[#1CA3D8] text-white text-[10px] font-medium px-4 py-1.5 rounded-b-lg shadow-[0_0_15px_rgba(36,185,242,0.5)] tracking-wider">
              MÁS POPULAR
            </div>

            <div className="absolute inset-0 bg-gradient-to-br from-azul-electrico/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-1.5xl"></div>
            
            <div className="relative z-10 flex-1">
              <div className="w-12 h-12 bg-azul-electrico/20 text-white rounded-xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 border border-azul-electrico/30 shadow-inner">
                <Bot className="w-6 h-6" />
              </div>
              
              <h3 className="text-2xl font-medium text-white mb-3 tracking-tight">Visibilidad + IA</h3>
              <p className="text-white mb-8 min-h-[80px] font-light">
                Estrategia completa más un Asistente de IA (Chatbot) que responde dudas y agenda citas automáticamente 24/7.
              </p>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 text-base text-white">
                  <CheckCircle2 className="w-4 h-4 text-amarillo-foco flex-shrink-0" />
                  <span>Todo lo de &quot;Visibilidad Digital&quot;</span>
                </li>
                <li className="flex items-center gap-3 text-base text-white">
                  <CalendarCheck className="w-4 h-4 text-amarillo-foco flex-shrink-0" />
                  <span>Agendamiento automático 24/7</span>
                </li>
                <li className="flex items-center gap-3 text-base text-white">
                  <Bot className="w-4 h-4 text-amarillo-foco flex-shrink-0" />
                  <span>Atención inmediata en WhatsApp</span>
                </li>
              </ul>
            </div>
            
            <div className="relative z-10 mt-auto pt-6 border-t border-[#24B9F2]/20">
              <div className="text-base text-white mb-4 tracking-wider font-medium">Inversión mensual base: <strong className="text-white text-base font-medium ml-1">$750 USD</strong></div>
              <a 
                href="#contacto"
                className="inline-flex items-center justify-between w-full py-3 px-5 bg-amarillo-foco text-azul-noche hover:bg-[#F5E27A] font-medium rounded-xl transition-all duration-300 transform group-hover:-translate-y-1 shadow-[0_0_20px_rgba(242,216,76,0.2)] hover:shadow-[0_0_30px_rgba(242,216,76,0.4)]"
              >
                <span>Solicitar diagnóstico</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </motion.section>
  );
}
