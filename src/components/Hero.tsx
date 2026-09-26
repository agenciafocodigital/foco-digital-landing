"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, BrainCircuit, CalendarCheck } from "lucide-react";

export default function Hero() {
  const [activeStep, setActiveStep] = useState(-1);
  const [revealed, setRevealed] = useState(-1);

  useEffect(() => {
    // Start animation sequence after initial text loads
    const startTimeout = setTimeout(() => {
      setActiveStep(0);
      setRevealed(0);
    }, 800);

    return () => clearTimeout(startTimeout);
  }, []);

  useEffect(() => {
    if (activeStep === -1) return;
    
    const interval = setInterval(() => {
      setActiveStep((prev) => {
        const next = (prev + 1) % 3;
        setRevealed((r) => Math.max(r, next));
        return next;
      });
    }, 1500); // Speed up the animation
    
    return () => clearInterval(interval);
  }, [activeStep]);

  const steps = [
    {
      icon: MessageCircle,
      title: "1. El cliente escribe",
      desc: '"Hola, ¿tienen lugar hoy?"',
      color: "text-white",
      bg: "bg-white/5",
      border: "border-azul-electrico/20",
      glow: "shadow-[0_0_20px_rgba(36,185,242,0.2)]",
      activeBorder: "border-azul-electrico/40",
      dot: "bg-white",
    },
    {
      icon: BrainCircuit,
      title: "2. La IA de Foco responde",
      desc: "Resuelve dudas y perfila al instante",
      color: "text-amarillo-foco",
      bg: "bg-amarillo-foco/10",
      border: "border-amarillo-foco/20",
      glow: "shadow-[0_0_25px_rgba(242,216,76,0.25)]",
      activeBorder: "border-amarillo-foco/50",
      dot: "bg-amarillo-foco",
    },
    {
      icon: CalendarCheck,
      title: "3. Cita agendada",
      desc: "Directo a tu calendario, sin fricción",
      color: "text-white",
      bg: "bg-azul-electrico/10",
      border: "border-azul-electrico/20",
      glow: "shadow-[0_0_25px_rgba(36,185,242,0.25)]",
      activeBorder: "border-azul-electrico/50",
      dot: "bg-azul-electrico",
    }
  ];

  return (
    <motion.section 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className="relative min-h-screen pt-32 pb-20 flex items-center overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        
        {/* Top Section: Text and Image */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-8 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center lg:text-left"
          >
            <div className="inline-block px-4 py-1.5 rounded-full border border-azul-electrico/30 bg-azul-electrico/10 backdrop-blur-md text-white text-base tracking-widest uppercase font-medium mb-8">
              Foco Digital · Automatización & IA
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-medium tracking-tighter leading-[1.1] mb-6 text-white">
              Automatiza. <br className="hidden sm:block" />
              <span className="text-amarillo-foco">Escala tu negocio.</span>
            </h1>
            <p className="text-base text-white mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
              Implementamos sistemas de Inteligencia Artificial que responden mensajes, califican prospectos y agendan citas 24/7. Tú dedícate a dar un servicio de excelencia.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <a
                href="#contacto"
                className="w-full sm:w-auto px-8 py-4 bg-amarillo-foco text-azul-noche hover:bg-[#F5E27A] rounded-full font-medium transition-all duration-300 shadow-[0_0_30px_rgba(242,216,76,0.25)] transform hover:-translate-y-1"
              >
                Solicitar Diagnóstico
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="relative lg:ml-10 h-full flex flex-col justify-center mt-8 lg:mt-0"
          >
            <div className="relative h-[400px] lg:h-[500px] w-full rounded-3xl overflow-hidden border border-azul-electrico/30 group">
              <div className="absolute inset-0 bg-azul-noche/20 mix-blend-multiply z-10 transition-opacity duration-500 group-hover:opacity-0"></div>
              <img 
                src="/spa1.jpg" 
                alt="Servicio de excelencia" 
                className="w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </motion.div>
        </div>

        {/* Bottom Section: Horizontal Animation Steps */}
        <div className="relative pt-12">
          {/* Background ambient glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-r from-azul-electrico/5 via-amarillo-foco/5 to-azul-electrico/5 blur-3xl -z-10 mix-blend-screen pointer-events-none"></div>
          
          <div className="grid md:grid-cols-3 gap-6 relative z-10">
            <AnimatePresence>
              {steps.map((step, index) => {
                if (index > revealed) return null;
                const isActive = index === activeStep;
                
                return (
                  <motion.div 
                    key={index}
                    className={`relative flex flex-col items-center text-center gap-4 p-6 rounded-2xl bg-azul-noche/90 backdrop-blur-xl border transition-all duration-700 overflow-hidden ${
                      isActive 
                        ? `${step.activeBorder} ${step.glow} scale-[1.02] -translate-y-1` 
                        : 'border-azul-electrico/10 scale-100 opacity-50 hover:opacity-80'
                    }`}
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: isActive ? 1.02 : 1 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
                    onClick={() => setActiveStep(index)}
                    style={{ cursor: 'pointer' }}
                  >
                    {/* Active highlight background */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none"
                        />
                      )}
                    </AnimatePresence>

                    <div className={`w-16 h-16 shrink-0 rounded-2xl flex items-center justify-center border transition-all duration-500 ${
                      isActive ? `${step.bg} ${step.color} ${step.activeBorder}` : 'bg-white/5 text-white border-azul-electrico/10'
                    } relative overflow-hidden`}>
                      <step.icon className={`w-8 h-8 relative z-10 transition-all duration-500 ${isActive ? 'scale-110' : 'scale-100'}`} />
                      
                      {isActive && (
                        <motion.div
                          className="absolute inset-0 bg-white/20"
                          initial={{ scale: 0, opacity: 1 }}
                          animate={{ scale: 2, opacity: 0 }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
                        />
                      )}
                    </div>
                    
                    <div className="flex-1 w-full">
                      <h3 className="font-medium mb-2 transition-colors duration-500 text-white text-lg">
                        {step.title}
                      </h3>
                      <p className="text-white text-base font-light">
                        {step.desc}
                      </p>
                    </div>

                    {/* Status indicator */}
                    <div className="absolute top-4 right-4">
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className={`w-2.5 h-2.5 rounded-full ${step.dot} shadow-[0_0_10px_currentColor]`}
                        />
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </motion.section>
  );
}
