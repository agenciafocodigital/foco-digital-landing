import type { Metadata } from "next";
import { LegalPageShell } from "@/components/legal-page-shell";

export const metadata: Metadata = {
  title: "Aviso de Privacidad | Foco Digital",
  description: "Aviso de Privacidad de Foco Digital."
};

export default function PrivacyNoticePage() {
  return (
    <LegalPageShell title="Aviso de Privacidad">
      <p className="legal-updated">Última actualización: 25 de septiembre de 2026.</p>

      <section aria-labelledby="privacy-responsible">
        <h2 id="privacy-responsible">1. Responsable del tratamiento</h2>
        <p>
          Foco Digital es responsable del tratamiento de los datos personales recabados a través de este sitio. Para
          asuntos de privacidad puedes escribir a{" "}
          <a href="mailto:foco.digital.contacto@gmail.com">foco.digital.contacto@gmail.com</a>
          .
        </p>
        <p>
          Antes de publicar definitivamente este sitio, Foco Digital deberá completar aquí su domicilio y un canal de
          contacto específico para privacidad, conforme a la Ley Federal de Protección de Datos Personales en Posesión
          de los Particulares (LFPDPPP).
        </p>
      </section>

      <section aria-labelledby="privacy-data">
        <h2 id="privacy-data">2. Datos personales que podemos recabar</h2>
        <p>
          Cuando solicitas información, podemos recabar tu nombre, el nombre de tu negocio, tu correo electrónico y la
          información que decidas compartir en el mensaje. No solicitamos datos personales sensibles mediante este sitio.
        </p>
      </section>

      <section aria-labelledby="privacy-purposes">
        <h2 id="privacy-purposes">3. Finalidades del tratamiento</h2>
        <p>Usaremos tus datos personales para las siguientes finalidades primarias:</p>
        <ul>
          <li>Contactarte para atender tu solicitud de diagnóstico.</li>
          <li>Comprender de forma general las necesidades de tu negocio.</li>
          <li>Preparar y compartir una propuesta de servicios, cuando la solicites.</li>
          <li>Dar seguimiento a una conversación iniciada por ti.</li>
        </ul>
        <p>
          Foco Digital no usa los datos recabados en este formulario para finalidades secundarias. Si en el futuro
          desea utilizarlos para comunicaciones comerciales, solicitará tu consentimiento cuando corresponda.
        </p>
      </section>

      <section aria-labelledby="privacy-transfers">
        <h2 id="privacy-transfers">4. Transferencias y conservación</h2>
        <p>
          El formulario usa la infraestructura de Netlify Forms para recibir y notificar solicitudes a Foco Digital.
          Fuera de ese proveedor técnico, Foco Digital no realiza transferencias de datos personales para fines distintos
          a los descritos en este aviso, salvo obligación legal aplicable. Los datos se conservarán solo durante el tiempo
          necesario para cumplir las finalidades informadas y las obligaciones legales aplicables.
        </p>
      </section>

      <section aria-labelledby="privacy-rights">
        <h2 id="privacy-rights">5. Derechos ARCO y revocación</h2>
        <p>
          Puedes solicitar el acceso, rectificación, cancelación u oposición al tratamiento de tus datos personales,
          así como revocar tu consentimiento o limitar su uso y divulgación. Envía tu solicitud por correo e incluye
          tu nombre, un medio de contacto, una descripción clara de la petición y, cuando corresponda, los datos que
          deseas corregir.
        </p>
        <p>
          Foco Digital podrá pedir información razonable para confirmar tu identidad antes de atender la solicitud.
          Recibirás una respuesta dentro de los plazos previstos por la LFPDPPP.
        </p>
      </section>

      <section aria-labelledby="privacy-cookies">
        <h2 id="privacy-cookies">6. Cookies y tecnologías similares</h2>
        <p>
          El sitio puede utilizar tecnologías estrictamente necesarias para su funcionamiento. Si se incorporan
          herramientas de analítica, publicidad, píxeles o cookies no esenciales, este aviso y el mecanismo de
          consentimiento deberán actualizarse antes de activar dichas herramientas.
        </p>
      </section>

      <section aria-labelledby="privacy-changes">
        <h2 id="privacy-changes">7. Cambios al aviso</h2>
        <p>
          Foco Digital podrá actualizar este aviso para reflejar cambios operativos, legales o de sus prácticas de
          privacidad. La versión vigente estará disponible en esta misma página con su fecha de actualización.
        </p>
      </section>

      <p className="legal-note">
        Este texto es una base informativa para el sitio. Se recomienda revisión legal antes de su publicación final.
      </p>
    </LegalPageShell>
  );
}
