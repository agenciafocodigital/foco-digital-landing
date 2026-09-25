import { z } from "zod";

const safeText = z
  .string()
  .trim()
  .min(2, "Escribe al menos 2 caracteres.")
  .max(100, "Usa máximo 100 caracteres.")
  .refine((value) => !/[<>]/.test(value), {
    message: "No uses símbolos de código."
  });

const whatsapp = z
  .string()
  .trim()
  .min(10, "Escribe un número de WhatsApp válido.")
  .max(20, "Escribe un número de WhatsApp válido.")
  .regex(/^[0-9+\-()\s]+$/, "Usa únicamente números y símbolos telefónicos.")
  .refine((value) => {
    const digits = value.replace(/\D/g, "");
    return digits.length >= 10 && digits.length <= 15;
  }, "Escribe un número de WhatsApp válido.");

export const contactSchema = z
  .object({
    name: safeText,
    business: safeText,
    whatsapp,
    consent: z.literal(true, {
      errorMap: () => ({
        message: "Necesitamos tu aceptación para continuar."
      })
    })
  })
  .strict();

export const lostAppointmentsSchema = z
  .number({
    invalid_type_error: "Escribe un número entero de citas perdidas."
  })
  .int("Escribe un número entero de citas perdidas.")
  .min(0, "El número no puede ser negativo.")
  .max(5000, "Para este cálculo, escribe hasta 5,000 citas.");

export type ContactFormData = z.infer<typeof contactSchema>;
