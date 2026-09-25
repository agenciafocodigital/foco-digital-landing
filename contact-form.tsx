"use client";

import { CheckCircle2, MessageCircle, Send } from "lucide-react";
import { FormEvent, useState } from "react";
import { contactSchema } from "@/lib/validation";

type FormValues = {
  name: string;
  business: string;
  whatsapp: string;
  consent: boolean;
};

type FieldName = keyof FormValues;
type FormErrors = Partial<Record<FieldName, string>>;

const initialValues: FormValues = {
  name: "",
  business: "",
  whatsapp: "",
  consent: false
};

export function ContactForm() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submissionState, setSubmissionState] = useState<"idle" | "ready" | "blocked">("idle");

  function updateField<K extends FieldName>(field: K, value: FormValues[K]) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setSubmissionState("idle");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const parsed = contactSchema.safeParse(values);

    if (!parsed.success) {
      const nextErrors: FormErrors = {};
      parsed.error.issues.forEach((issue) => {
        const field = issue.path[0] as FieldName;
        if (field && !nextErrors[field]) {
          nextErrors[field] = issue.message;
        }
      });
      setErrors(nextErrors);
      setSubmissionState("idle");
      return;
    }

    setErrors({});

    const message = [
      "Hola, quiero solicitar un diagnóstico para mi negocio.",
      "Nombre: " + parsed.data.name,
      "Negocio: " + parsed.data.business,
      "Mi WhatsApp: " + parsed.data.whatsapp
    ].join("\n");
    const whatsappUrl = "https://wa.me/525618765291?text=" + encodeURIComponent(message);
    const openedWindow = window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    setSubmissionState(openedWindow ? "ready" : "blocked");
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="rounded-3xl bg-blanco-calido p-5 shadow-soft sm:p-7">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="label">
            Nombre
          </label>
          <input
            id="contact-name"
            name="name"
            autoComplete="name"
            value={values.name}
            onChange={(event) => updateField("name", event.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
            className="input-field mt-2 min-h-12"
            placeholder="Tu nombre"
          />
          {errors.name && (
            <p id="contact-name-error" role="alert" className="field-error">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="contact-business" className="label">
            Negocio
          </label>
          <input
            id="contact-business"
            name="business"
            autoComplete="organization"
            value={values.business}
            onChange={(event) => updateField("business", event.target.value)}
            aria-invalid={Boolean(errors.business)}
            aria-describedby={errors.business ? "contact-business-error" : undefined}
            className="input-field mt-2 min-h-12"
            placeholder="Ej. Spa Aurora"
          />
          {errors.business && (
            <p id="contact-business-error" role="alert" className="field-error">
              {errors.business}
            </p>
          )}
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="contact-whatsapp" className="label">
          WhatsApp
        </label>
        <input
          id="contact-whatsapp"
          name="whatsapp"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          value={values.whatsapp}
          onChange={(event) => updateField("whatsapp", event.target.value)}
          aria-invalid={Boolean(errors.whatsapp)}
          aria-describedby={errors.whatsapp ? "contact-whatsapp-error" : undefined}
          className="input-field mt-2 min-h-12"
          placeholder="Ej. 55 1234 5678"
        />
        {errors.whatsapp && (
          <p id="contact-whatsapp-error" role="alert" className="field-error">
            {errors.whatsapp}
          </p>
        )}
      </div>

      <div className="mt-5">
        <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-transparent p-1 text-sm leading-5 text-slate-700 transition hover:border-azul-profundo/20">
          <input
            id="contact-consent"
            name="consent"
            type="checkbox"
            checked={values.consent}
            onChange={(event) => updateField("consent", event.target.checked)}
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={errors.consent ? "contact-consent-error" : undefined}
            className="mt-0.5 h-5 w-5 rounded border-slate-400 text-azul-profundo focus:ring-amarillo-foco"
          />
          <span>
            Acepto el{" "}
            <a href="/aviso-de-privacidad" className="font-bold text-azul-profundo underline decoration-azul-electrico underline-offset-4">
              Aviso de Privacidad
            </a>{" "}
            y los{" "}
            <a href="/terminos-y-condiciones" className="font-bold text-azul-profundo underline decoration-azul-electrico underline-offset-4">
              Términos de Servicio
            </a>
            .
          </span>
        </label>
        {errors.consent && (
          <p id="contact-consent-error" role="alert" className="field-error">
            {errors.consent}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-amarillo-foco px-5 py-3 text-sm font-extrabold text-azul-noche transition hover:-translate-y-0.5 hover:bg-[#ffda63] focus-visible:outline-azul-profundo"
      >
        <Send aria-hidden="true" size={18} />
        Solicitar mi diagnóstico
      </button>

      <p className="mt-3 flex items-start gap-2 text-xs leading-5 text-slate-500">
        <MessageCircle aria-hidden="true" size={15} className="mt-0.5 shrink-0 text-azul-profundo" />
        Al enviar, abrirás WhatsApp con un mensaje prellenado. Esta página no almacena tus datos.
      </p>

      {submissionState === "ready" && (
        <p role="status" className="mt-4 flex items-center gap-2 rounded-xl bg-emerald-50 p-3 text-sm font-semibold text-emerald-800">
          <CheckCircle2 aria-hidden="true" size={18} />
          Tu mensaje está listo en WhatsApp. Solo falta enviarlo.
        </p>
      )}
      {submissionState === "blocked" && (
        <p role="status" className="mt-4 rounded-xl bg-amber-50 p-3 text-sm font-semibold text-amber-900">
          No se pudo abrir una nueva pestaña. Usa el botón de WhatsApp del encabezado para continuar.
        </p>
      )}
    </form>
  );
}
