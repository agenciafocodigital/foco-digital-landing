"use client";

import { CheckCircle2, Send } from "lucide-react";
import { FormEvent, useState } from "react";
import { contactSchema } from "@/lib/validation";

type FormValues = {
  name: string;
  business: string;
  email: string;
  message: string;
  consent: boolean;
};

type FieldName = keyof FormValues;
type FormErrors = Partial<Record<FieldName, string>>;

const initialValues: FormValues = { name: "", business: "", email: "", message: "", consent: false };

export function ContactForm() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submissionState, setSubmissionState] = useState<"idle" | "submitting" | "success" | "error">("idle");

  function updateField<K extends FieldName>(field: K, value: FormValues[K]) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setSubmissionState("idle");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const parsed = contactSchema.safeParse(values);

    if (!parsed.success) {
      const nextErrors: FormErrors = {};
      parsed.error.issues.forEach((issue) => {
        const field = issue.path[0] as FieldName;
        if (field && !nextErrors[field]) nextErrors[field] = issue.message;
      });
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    setSubmissionState("submitting");

    const formData = new URLSearchParams();
    formData.append("form-name", "contacto");
    formData.append("subject", "Nueva solicitud desde Foco Digital");
    formData.append("bot-field", "");
    formData.append("name", parsed.data.name);
    formData.append("business", parsed.data.business);
    formData.append("email", parsed.data.email);
    formData.append("message", parsed.data.message);
    formData.append("consent", "true");

    try {
      const response = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formData.toString()
      });

      if (!response.ok) throw new Error("Form submission failed");

      setSubmissionState("success");
      setValues(initialValues);
    } catch {
      setSubmissionState("error");
    }
  }

  return (
    <form
      name="contacto"
      method="POST"
      onSubmit={handleSubmit}
      noValidate
      className="rounded-3xl border border-azul-electrico/55 bg-azul-noche p-5 shadow-soft sm:p-7"
    >
      <input type="hidden" name="form-name" value="contacto" />
      <input type="hidden" name="subject" value="Nueva solicitud desde Foco Digital" />
      <p className="netlify-honeypot" aria-hidden="true">
        <label>
          No llenes este campo <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="label">Nombre</label>
          <input id="contact-name" name="name" autoComplete="name" value={values.name} onChange={(event) => updateField("name", event.target.value)} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "contact-name-error" : undefined} className="input-field mt-2 min-h-12" placeholder="Tu nombre" />
          {errors.name && <p id="contact-name-error" role="alert" className="field-error">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="contact-business" className="label">Negocio</label>
          <input id="contact-business" name="business" autoComplete="organization" value={values.business} onChange={(event) => updateField("business", event.target.value)} aria-invalid={Boolean(errors.business)} aria-describedby={errors.business ? "contact-business-error" : undefined} className="input-field mt-2 min-h-12" placeholder="Ej. Spa Aurora" />
          {errors.business && <p id="contact-business-error" role="alert" className="field-error">{errors.business}</p>}
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="contact-email" className="label">Correo electrónico</label>
        <input id="contact-email" name="email" type="email" autoComplete="email" value={values.email} onChange={(event) => updateField("email", event.target.value)} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "contact-email-error" : undefined} className="input-field mt-2 min-h-12" placeholder="nombre@tudominio.com" />
        {errors.email && <p id="contact-email-error" role="alert" className="field-error">{errors.email}</p>}
      </div>

      <div className="mt-5">
        <label htmlFor="contact-message" className="label">¿Qué te gustaría mejorar primero?</label>
        <textarea id="contact-message" name="message" value={values.message} onChange={(event) => updateField("message", event.target.value)} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "contact-message-error" : undefined} className="input-field mt-2 min-h-32 resize-y" placeholder="Cuéntanos qué servicio ofreces y dónde se te está yendo más tiempo." />
        {errors.message && <p id="contact-message-error" role="alert" className="field-error">{errors.message}</p>}
      </div>

      <div className="mt-5">
        <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-azul-electrico/35 p-3 text-base leading-6 text-azul-electrico transition hover:border-amarillo-foco">
          <input id="contact-consent" name="consent" type="checkbox" checked={values.consent} onChange={(event) => updateField("consent", event.target.checked)} aria-invalid={Boolean(errors.consent)} aria-describedby={errors.consent ? "contact-consent-error" : undefined} className="mt-0.5 h-5 w-5 shrink-0 rounded border-azul-electrico bg-azul-noche accent-amarillo-foco" />
          <span>
            Acepto el <a href="/aviso-de-privacidad" className="font-bold text-amarillo-foco underline decoration-azul-electrico underline-offset-4">Aviso de Privacidad</a> y los <a href="/terminos-y-condiciones" className="font-bold text-amarillo-foco underline decoration-azul-electrico underline-offset-4">Términos de Servicio</a>.
          </span>
        </label>
        {errors.consent && <p id="contact-consent-error" role="alert" className="field-error">{errors.consent}</p>}
      </div>

      <button type="submit" disabled={submissionState === "submitting"} className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-amarillo-foco px-5 py-3 text-base font-bold text-azul-noche transition hover:-translate-y-0.5 hover:bg-azul-electrico disabled:cursor-wait disabled:opacity-75 focus-visible:outline-azul-electrico">
        <Send aria-hidden="true" size={19} />
        {submissionState === "submitting" ? "Enviando solicitud" : "Quiero que me contacten por correo"}
      </button>
      <p className="mt-4 text-sm leading-6 text-azul-electrico/85">Tu solicitud se envía directamente a Foco Digital. Usaremos tu correo solo para responderte.</p>
      {submissionState === "success" && <p role="status" className="mt-5 flex items-center gap-2 rounded-xl border border-amarillo-foco bg-azul-noche p-4 text-base font-semibold text-amarillo-foco"><CheckCircle2 aria-hidden="true" size={20} />Gracias. Recibimos tu solicitud y te responderemos por correo.</p>}
      {submissionState === "error" && <p role="status" className="field-error mt-5 rounded-xl border border-amarillo-foco p-4">No pudimos enviar el formulario. Intenta de nuevo en unos minutos o usa el botón de WhatsApp.</p>}
    </form>
  );
}
