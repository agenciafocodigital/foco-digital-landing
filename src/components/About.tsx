"use client";

import { motion } from "framer-motion";
import { MessageSquareOff, Clock, CheckCircle2 } from "lucide-react";
import Image from "next/image";

export default function About() {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className="py-24 text-white relative overflow-hidden" 
      id="nosotros"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Fricción / Problema */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-medium mb-6 tracking-tight">
              ¿Sigues dependiendo solo del <span className="text-amarillo-foco">&quot;boca a boca&quot;</span>?
            </h2>
            <p className="text-base text-white mb-8 leading-relaxed font-light">
              El sector del bienestar exige tu atención al 100%. Mientras estás en sesión con un cliente, los mensajes de WhatsApp se acumulan. Un mensaje sin responder en los primeros 5 minutos, a menudo significa una <strong className="text-amarillo-foco font-medium">cita perdida</strong>.
            </p>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-12 h-12 bg-azul-electrico/10 border border-azul-electrico/30 rounded-xl flex items-center justify-center text-white shadow-inner">
                    <MessageSquareOff className="w-6 h-6" />
                  </div>
                </div>
                <div>
                  <h4 className="text-xl font-medium mb-2 tracking-tight">Mensajes sin responder</h4>
                  <p className="text-white font-light text-base">Clientes potenciales que buscan información y al no recibir respuesta inmediata, acuden a la competencia.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-12 h-12 bg-azul-electrico/10 border border-azul-electrico/30 rounded-xl flex items-center justify-center text-white shadow-inner">
                    <Clock className="w-6 h-6" />
                  </div>
                </div>
                <div>
                  <h4 className="text-xl font-medium mb-2 tracking-tight">Falta de tiempo</h4>
                  <p className="text-white font-light text-base">Intentar ser terapeuta, administrador y community manager al mismo tiempo te deja exhausto.</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Solución Foco Digital */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            {/* Visual element placeholder (Terapeutas reales trabajando) */}
            <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-none border border-azul-electrico/30 group">
              <div className="absolute inset-0 bg-azul-noche/20 mix-blend-multiply z-10 transition-opacity duration-500 group-hover:opacity-0"></div>
              {/* This image would be a real spa/therapist image, we use an unsplash placeholder */}
              <Image 
                src="/spa2.jpg" 
                alt="Terapeuta atendiendo a un cliente en un spa de lujo" 
                fill
                className="object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </motion.section>
  );
}
