import type { Metadata } from "next";
import { LegalPageShell } from "@/components/legal-page-shell";

export const metadata: Metadata = {
  title: "Términos y Condiciones | Foco Digital",
  description: "Términos y condiciones de uso del sitio de Foco Digital."
};

export default function TermsAndConditionsPage() {
  return (
    <LegalPageShell title="Términos y Condiciones">
      <p className="legal-updated">Última actualización: 25 de septiembre de 2026.</p>

      <section aria-labelledby="terms-scope">
        <h2 id="terms-scope">1. Alcance del sitio</h2>
        <p>
          Este sitio es informativo y tiene el propósito de presentar los servicios de Foco Digital para negocios de
          bienestar en México. El uso del formulario envía una solicitud de contacto; no crea por sí mismo una relación
          contractual ni implica una aceptación de servicios.
        </p>
      </section>

      <section aria-labelledby="terms-diagnosis">
        <h2 id="terms-diagnosis">2. Diagnóstico y propuestas</h2>
        <p>
          Solicitar un diagnóstico no obliga a contratar ningún servicio. Cualquier alcance, precio, calendario,
          entregable, continuidad o condición comercial será confirmado por escrito en una propuesta o acuerdo
          específico antes de iniciar trabajos.
        </p>
      </section>

      <section aria-labelledby="terms-prices">
        <h2 id="terms-prices">3. Precios de referencia</h2>
        <p>
          Los precios piloto mostrados en el sitio son referencias informativas: Visibilidad desde $390 USD y
          Visibilidad + Automatización desde $750 USD. Están sujetos a la complejidad, los objetivos y el alcance
          acordado para cada negocio, por lo que no constituyen una oferta vinculante.
        </p>
      </section>

      <section aria-labelledby="terms-results">
        <h2 id="terms-results">4. Resultados y calculadora</h2>
        <p>
          Las estimaciones de la calculadora usan un ticket promedio de $600 MXN y tienen un fin educativo. No son una
          proyección, promesa o garantía de ventas, citas, ingresos o resultados comerciales. Los resultados reales
          dependen de factores propios de cada negocio, su servicio, atención y mercado.
        </p>
      </section>

      <section aria-labelledby="terms-intellectual-property">
        <h2 id="terms-intellectual-property">5. Propiedad intelectual</h2>
        <p>
          La identidad, textos, diseño, logotipo y demás contenidos del sitio pertenecen a Foco Digital o se usan con
          la autorización correspondiente. No puedes reproducir, distribuir, modificar o explotar estos contenidos sin
          autorización previa por escrito, salvo el uso personal y no comercial del sitio.
        </p>
      </section>

      <section aria-labelledby="terms-acceptable-use">
        <h2 id="terms-acceptable-use">6. Uso aceptable</h2>
        <p>
          Te comprometes a utilizar este sitio de manera lícita y respetuosa. Queda prohibido intentar alterar su
          funcionamiento, introducir código malicioso, recopilar datos de otros usuarios, suplantar identidades o usar
          los formularios para fines ajenos a una solicitud legítima de información.
        </p>
      </section>

      <section aria-labelledby="terms-liability">
        <h2 id="terms-liability">7. Enlaces externos y limitación de responsabilidad</h2>
        <p>
          El sitio puede dirigir a WhatsApp u otros servicios de terceros. Su disponibilidad y políticas dependen de
          dichos proveedores. Foco Digital hará esfuerzos razonables para mantener la información del sitio
          actualizada, pero no garantiza que esté libre de interrupciones o errores.
        </p>
      </section>

      <section aria-labelledby="terms-changes">
        <h2 id="terms-changes">8. Cambios y ley aplicable</h2>
        <p>
          Foco Digital puede modificar estos términos en cualquier momento. La versión actualizada se publicará en
          esta página. Estos términos se interpretarán conforme a las leyes aplicables de México, sin perjuicio de los
          derechos que puedan corresponder a las personas usuarias.
        </p>
      </section>

      <p className="legal-note">
        Este texto es una base informativa para el sitio. Se recomienda revisión legal antes de su publicación final.
      </p>
    </LegalPageShell>
  );
}
