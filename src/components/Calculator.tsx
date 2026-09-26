"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TrendingDown, ArrowRight, Activity, Users, DollarSign } from "lucide-react";

export default function Calculator() {
  const [lostAppointments, setLostAppointments] = useState<number>(15);
  const [ticketAverage] = useState<number>(600);
  const [annualLoss, setAnnualLoss] = useState<number>(0);
  const [monthlyLoss, setMonthlyLoss] = useState<number>(0);

  useEffect(() => {
    const monthly = lostAppointments * ticketAverage;
    setMonthlyLoss(monthly);
    setAnnualLoss(monthly * 12);
  }, [lostAppointments, ticketAverage]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className="w-full max-w-7xl mx-auto"
    >
      <div className="relative rounded-3xl overflow-hidden bg-[#05111D]/80 backdrop-blur-2xl border border-[#24B9F2]/30 shadow-[0_0_50px_rgba(36,185,242,0.15)] group">
        {/* Animated Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-[1px] bg-gradient-to-r from-transparent via-[#24B9F2] to-transparent opacity-50"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-[#24B9F2]/5 via-transparent to-transparent opacity-50 pointer-events-none"></div>

        <div className="grid lg:grid-cols-2">
          {/* Interactive Input Section */}
          <div className="p-8 sm:p-12 border-b lg:border-b-0 lg:border-r border-azul-electrico relative z-10 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-azul-electrico/10 border border-azul-electrico text-white text-base font-medium tracking-wide uppercase mb-8 w-fit">
              <Activity className="w-4 h-4 text-amarillo-foco" /> Diagnóstico Financiero
            </div>
            
            <h3 className="text-2xl sm:text-3xl font-medium text-white mb-4 tracking-tight leading-snug">
              ¿Cuántos prospectos de WhatsApp se quedan en <span className="text-amarillo-foco">"visto"</span> al mes?
            </h3>
            
            <p className="text-white font-light mb-10 text-base">
              Desliza para calcular tu fuga de ingresos basada en un ticket promedio de $600 MXN.
            </p>

            <div className="space-y-8">
              <div>
                <div className="flex justify-between items-end mb-4">
                  <label className="text-base font-medium text-white uppercase tracking-wider flex items-center gap-2">
                    <Users className="w-4 h-4 text-amarillo-foco" /> Prospectos perdidos
                  </label>
                  <motion.div 
                    key={lostAppointments}
                    initial={{ scale: 1.1, color: "#24B9F2" }}
                    animate={{ scale: 1, color: "#ffffff" }}
                    className="text-4xl font-medium tracking-tighter"
                  >
                    {lostAppointments}
                  </motion.div>
                </div>
                
                <div className="relative pt-4 pb-2">
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={lostAppointments}
                    onChange={(e) => setLostAppointments(parseInt(e.target.value))}
                    className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#24B9F2] hover:accent-[#F2D84C] transition-all focus:outline-none focus:ring-2 focus:ring-[#24B9F2]/50 focus:ring-offset-2 focus:ring-offset-[#05111D]"
                  />
                  <div className="flex justify-between text-base text-white mt-3 font-medium">
                    <span>1</span>
                    <span>100+</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="p-8 sm:p-12 bg-azul-noche relative z-10 flex flex-col justify-center overflow-hidden">
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="mb-8">
                <div className="flex items-center gap-2 text-white mb-2 font-medium tracking-wide text-base uppercase">
                  <TrendingDown className="w-4 h-4 text-amarillo-foco" /> Pérdida Mensual Estimada
                </div>
                <div className="text-5xl sm:text-6xl font-medium text-white tracking-tighter">
                  <span className="text-white mr-1">$</span>
                  {monthlyLoss.toLocaleString("es-MX")}
                  <span className="text-2xl text-white ml-2 font-light">MXN</span>
                </div>
              </div>

              <div className="mb-10 p-6 rounded-2xl bg-white/5 border border-azul-electrico backdrop-blur-sm">
                <div className="flex items-center gap-2 text-white mb-1 font-medium text-base">
                  <DollarSign className="w-4 h-4 text-amarillo-foco" /> Impacto Anual
                </div>
                <div className="text-2xl font-medium text-amarillo-foco tracking-tight">
                  ${annualLoss.toLocaleString("es-MX")} MXN que dejas en la mesa
                </div>
              </div>

              <div className="mt-auto">
                <a
                  href="#contacto"
                  className="group relative flex items-center justify-center w-full py-4 px-8 bg-amarillo-foco text-azul-noche font-medium text-base rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(242,216,76,0.3)] overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Detener esta pérdida ahora <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-700 ease-in-out"></div>
                </a>
                <p className="text-center text-base text-white mt-4 font-light">
                  Nuestra IA de Foco Digital recupera hasta el 80% de estas conversiones respondiendo en &lt;1 segundo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
