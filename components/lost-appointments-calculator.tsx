"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Calculator, LoaderCircle, MessageCircle } from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";
import { lostAppointmentsSchema } from "@/lib/validation";

type CalculatorState = "idle" | "analyzing" | "result";

const moneyFormatter = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
  maximumFractionDigits: 0
});

export function LostAppointmentsCalculator() {
  const [appointments, setAppointments] = useState("");
  const [state, setState] = useState<CalculatorState>("idle");
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("Analizando el costo de las consultas sin seguimiento...");
  const [monthlyLoss, setMonthlyLoss] = useState<number | null>(null);
  const timers = useRef<number[]>([]);
  const reducedMotion = useReducedMotion();

  useEffect(() => () => timers.current.forEach((timer) => window.clearTimeout(timer)), []);

  function clearTimers() {
    timers.current.forEach((timer) => window.clearTimeout(timer));
    timers.current = [];
  }

  function handleValueChange(value: string) {
    setAppointments(value);
    setError("");
    if (state === "result") {
      setState("idle");
      setMonthlyLoss(null);
      setProgress(0);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    clearTimers();
    const normalizedValue = appointments.trim();

    if (!/^\d+$/.test(normalizedValue)) {
      setError("Escribe un número entero de citas perdidas.");
      setState("idle");
      return;
    }

    const parsedValue = lostAppointmentsSchema.safeParse(Number(normalizedValue));
    if (!parsedValue.success) {
      setError(parsedValue.error.issues[0]?.message ?? "Revisa el número de citas.");
      setState("idle");
      return;
    }

    setError("");
    setState("analyzing");
    setMonthlyLoss(null);
    setMessage("Analizando el costo de las consultas sin seguimiento...");
    setProgress(12);
    timers.current.push(window.setTimeout(() => {
      setMessage("Calculando ingresos que podrías proteger...");
      setProgress(62);
    }, 1000));
    timers.current.push(window.setTimeout(() => {
      setProgress(100);
      setMonthlyLoss(parsedValue.data * 600);
      setState("result");
    }, 2000));
  }

  return (
    <section aria-labelledby="calculator-title" className="relative overflow-hidden rounded-3xl border border-azul-electrico/60 bg-azul-noche p-6 shadow-glow sm:p-8">
      <div aria-hidden="true" className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-amarillo-foco/20 blur-2xl" />
      <div className="relative">
        <div className="mb-5 flex items-center gap-3">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-amarillo-foco text-azul-noche">
            <Calculator aria-hidden="true" size={22} strokeWidth={2.3} />
          </span>
          <p className="text-base font-bold uppercase tracking-[0.1em] text-azul-electrico">Diagnóstico rápido</p>
        </div>
        <h2 id="calculator-title" className="text-2xl font-bold leading-tight text-amarillo-foco sm:text-3xl">
          Calcula el valor de las citas que se quedan a medias
        </h2>
        <p className="mt-4 text-base leading-7 text-azul-electrico">
          Toma menos de un minuto. La cifra no es una promesa: es un punto de partida para decidir si vale la pena ordenar tu seguimiento.
        </p>

        <form onSubmit={handleSubmit} noValidate className="mt-6">
          <label htmlFor="lost-appointments" className="label">
            ¿Cuántas citas agendadas se cancelan o no se concretan al mes?
          </label>
          <div className="mt-3 flex flex-col gap-3 sm:flex-row">
            <input id="lost-appointments" name="lostAppointments" type="text" inputMode="numeric" pattern="[0-9]*" autoComplete="off" value={appointments} onChange={(event) => handleValueChange(event.target.value)} aria-label="Número de citas canceladas o no concretadas al mes" aria-invalid={Boolean(error)} aria-describedby={error ? "lost-appointments-error" : "lost-appointments-help"} placeholder="Ej. 12" className="input-field min-h-12 flex-1" />
            <button type="submit" disabled={state === "analyzing"} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-amarillo-foco px-5 py-3 text-base font-bold text-azul-noche transition hover:-translate-y-0.5 hover:bg-azul-electrico disabled:cursor-wait disabled:opacity-75 focus-visible:outline-azul-electrico">
              {state === "analyzing" ? <><LoaderCircle aria-hidden="true" size={18} className="animate-spin" />Calculando</> : "Hacer el cálculo"}
            </button>
          </div>
          <p id="lost-appointments-help" className="mt-3 text-sm leading-6 text-azul-electrico/80">
            Este dato no se guarda; solo sirve para mostrarte la estimación.
          </p>
          {error && <p id="lost-appointments-error" role="alert" className="field-error">{error}</p>}
        </form>

        <AnimatePresence mode="wait">
          {state === "analyzing" && (
            <motion.div key="loading" initial={reducedMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={reducedMotion ? undefined : { opacity: 0 }} aria-live="polite" className="mt-6 rounded-2xl border border-azul-electrico/40 bg-azul-noche p-5">
              <div className="flex items-center gap-2 text-base font-semibold text-azul-electrico">
                <LoaderCircle aria-hidden="true" size={19} className="animate-spin text-amarillo-foco" />
                <span>{message}</span>
              </div>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-azul-electrico/25" role="progressbar" aria-label="Progreso del cálculo" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}>
                <motion.div className="h-full rounded-full bg-amarillo-foco" initial={false} animate={{ width: progress + "%" }} transition={reducedMotion ? { duration: 0 } : { duration: 0.45, ease: "easeOut" }} />
              </div>
            </motion.div>
          )}
          {state === "result" && monthlyLoss !== null && (
            <motion.div key="result" initial={reducedMotion ? false : { opacity: 0, y: 10 }} animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, transition: { duration: 0.35 } }} className="mt-6 rounded-2xl border border-amarillo-foco bg-azul-noche p-5" aria-live="polite">
              <p className="text-sm font-bold uppercase tracking-[0.1em] text-azul-electrico">Estimación mensual</p>
              <p className="mt-2 text-4xl font-bold tracking-tight text-amarillo-foco">{moneyFormatter.format(monthlyLoss)}</p>
              <p className="mt-3 text-base leading-7 text-azul-electrico">Ese es el valor aproximado que puede escaparse cuando una consulta no recibe un siguiente paso claro.</p>
              <p className="mt-4 text-sm leading-6 text-azul-electrico/80">Cálculo basado en un ticket promedio de $600 MXN en el sector bienestar en México. Fórmula: tus citas perdidas × $600.</p>
              <a href="https://wa.me/525618765291" target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex min-h-12 items-center gap-2 rounded-xl bg-amarillo-foco px-4 py-3 text-base font-bold text-azul-noche transition hover:-translate-y-0.5 hover:bg-azul-electrico focus-visible:outline-azul-electrico">
                <MessageCircle aria-hidden="true" size={19} />
                Quiero recuperar estas oportunidades
                <ArrowRight aria-hidden="true" size={18} />
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
