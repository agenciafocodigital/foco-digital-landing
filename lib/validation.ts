import { z } from "zod";

const safeText = z
  .string()
  .trim()
  .min(2, "Escribe al menos 2 caracteres.")
  .max(100, "Usa máximo 100 caracteres.")
  .refine((value) => !/[<>]/.test(value), { message: "No uses símbolos de código." });

const safeMessage = z
  .string()
  .trim()
  .min(10, "Cuéntanos un poco más para poder orientarte.")
  .max(1000, "Usa máximo 1,000 caracteres.")
  .refine((value) => !/[<>]/.test(value), { message: "No uses símbolos de código." });

const email = z
  .string()
  .trim()
  .max(254, "Usa un correo electrónico válido.")
  .email("Escribe un correo electrónico válido.");

export const contactSchema = z
  .object({
    name: safeText,
    business: safeText,
    email,
    message: safeMessage,
    consent: z.literal(true, {
      errorMap: () => ({ message: "Necesitamos tu aceptación para continuar." })
    })
  })
  .strict();

export const lostAppointmentsSchema = z
  .number({ invalid_type_error: "Escribe un número entero de citas perdidas." })
  .int("Escribe un número entero de citas perdidas.")
  .min(0, "El número no puede ser negativo.")
  .max(5000, "Para este cálculo, escribe hasta 5,000 citas.");

export type ContactFormData = z.infer<typeof contactSchema>;
