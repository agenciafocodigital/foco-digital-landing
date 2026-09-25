"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Calculator, LoaderCircle } from "lucide-react";
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
  const [message, setMessage] = useState("Analizando impacto en el sector bienestar...");
  const [monthlyLoss, setMonthlyLoss] = useState<number | null>(null);
  const timers = useRef<number[]>([]);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    return () => {
      timers.current.forEach((timer) => window.clearTimeout(timer));
    };
  }, []);

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
    setMessage("Analizando impacto en el sector bienestar...");
    setProgress(12);

    timers.current.push(
      window.setTimeout(() => {
        setMessage("Calculando ingresos retenidos...");
        setProgress(62);
      }, 1000)
    );

    timers.current.push(
      window.setTimeout(() => {
        setProgress(100);
        setMonthlyLoss(parsedValue.data * 600);
        setState("result");
      }, 2000)
    );
  }

  const resultAnimation = reducedMotion
    ? { opacity: 1 }
    : { opacity: 1, y: 0, transition: { duration: 0.35 } };

  return (
    <section
      aria-labelledby="calculator-title"
      className="relative mt-8 overflow-hidden rounded-3xl border border-azul-electrico/35 bg-white p-5 text-azul-noche shadow-glow sm:p-6"
    >
      <div aria-hidden="true" className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-amarillo-foco/20 blur-2xl" />
      <div className="relative">
        <div className="mb-4 flex items-center gap-2">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-amarillo-foco text-azul-noche">
            <Calculator aria-hidden="true" size={19} strokeWidth={2.5} />
          </span>
          <p className="text-sm font-bold uppercase tracking-[0.13em] text-azul-profundo">
            Diagnóstico rápido
          </p>
        </div>

        <h2 id="calculator-title" className="text-xl font-bold leading-tight sm:text-2xl">
          Calcula el costo de las citas que se pierden
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Una cifra clara para decidir qué seguimiento necesita tu negocio.
        </p>

        <form onSubmit={handleSubmit} noValidate className="mt-5">
          <label htmlFor="lost-appointments" className="label">
            ¿Cuántas citas agendadas te cancelan o no se concretan al mes?
          </label>
          <div className="mt-2 flex flex-col gap-3 sm:flex-row">
            <input
              id="lost-appointments"
              name="lostAppointments"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              autoComplete="off"
              value={appointments}
              onChange={(event) => handleValueChange(event.target.value)}
              aria-label="Número de citas canceladas o no concretadas al mes"
              aria-invalid={Boolean(error)}
              aria-describedby={error ? "lost-appointments-error" : "lost-appointments-help"}
              placeholder="Ej. 12"
              className="input-field min-h-12 flex-1"
            />
            <button
              type="submit"
              disabled={state === "analyzing"}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-azul-noche px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-azul-profundo disabled:cursor-wait disabled:opacity-75 focus-visible:outline-azul-electrico"
            >
              {state === "analyzing" ? (
                <>
                  <LoaderCircle aria-hidden="true" size={18} className="animate-spin" />
                  Calculando
                </>
              ) : (
                "Calcular"
              )}
            </button>
          </div>
          <p id="lost-appointments-help" className="mt-2 text-xs leading-5 text-slate-500">
            Solo usamos este dato para mostrarte la estimación; no se guarda.
          </p>
          {error && (
            <p id="lost-appointments-error" role="alert" className="field-error">
              {error}
            </p>
          )}
        </form>

        <AnimatePresence mode="wait">
          {state === "analyzing" && (
            <motion.div
              key="loading"
              initial={reducedMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reducedMotion ? undefined : { opacity: 0 }}
              aria-live="polite"
              className="mt-5 rounded-2xl bg-blanco-calido p-4"
            >
              <div className="flex items-center gap-2 text-sm font-semibold text-azul-profundo">
                <LoaderCircle aria-hidden="true" size={18} className="animate-spin text-azul-electrico" />
                <span>{message}</span>
              </div>
              <div
                className="mt-3 h-2 overflow-hidden rounded-full bg-azul-profundo/15"
                role="progressbar"
                aria-label="Progreso del cálculo"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={progress}
              >
                <motion.div
                  className="h-full rounded-full bg-azul-electrico"
                  initial={false}
                  animate={{ width: progress + "%" }}
                  transition={reducedMotion ? { duration: 0 } : { duration: 0.45, ease: "easeOut" }}
                />
              </div>
            </motion.div>
          )}

          {state === "result" && monthlyLoss !== null && (
            <motion.div
              key="result"
              initial={reducedMotion ? false : { opacity: 0, y: 10 }}
              animate={resultAnimation}
              className="mt-5 rounded-2xl border border-rojo-perdida/20 bg-[#fff7f6] p-4"
              aria-live="polite"
            >
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-rojo-perdida">
                Estimación mensual
              </p>
              <p className="mt-1 text-3xl font-extrabold tracking-tight text-rojo-perdida sm:text-4xl">
                {moneyFormatter.format(monthlyLoss)}
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                Estás perdiendo aproximadamente {moneyFormatter.format(monthlyLoss)} cada mes por falta de
                seguimiento automatizado.
              </p>
              <p className="mt-3 text-xs leading-5 text-slate-500">
                Cálculo basado en un ticket promedio de $600 MXN en el sector bienestar en México. Fórmula:
                (tus citas perdidas) x $600.
              </p>
              <a
                href="#contacto"
                className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-xl bg-amarillo-foco px-4 py-2.5 text-sm font-bold text-azul-noche transition hover:-translate-y-0.5 hover:bg-[#ffda63] focus-visible:outline-azul-profundo"
              >
                Recuperar estas ventas ahora
                <ArrowRight aria-hidden="true" size={17} />
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
