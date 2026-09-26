import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Aviso de Privacidad | Agencia Foco Digital",
  description: "Aviso de privacidad de Agencia Foco Digital para el cumplimiento de la LFPDPPP.",
};

export default function AvisoPrivacidad() {
  return (
    <>
      <Header />
      <main className="pt-32 pb-20 bg-blanco-calido text-azul-noche min-h-screen">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-3xl sm:text-4xl font-medium mb-8">Aviso de Privacidad</h1>
          
          <div className="prose prose-lg text-gray-700 space-y-6">
            <p>
              En cumplimiento a la <strong>Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP)</strong>, 
              <strong> Agencia Foco Digital</strong>, con portal de internet www.focodigital.mx, es el responsable del uso y protección 
              de sus datos personales, y al respecto le informamos lo siguiente:
            </p>

            <h3 className="text-xl font-medium text-azul-noche mt-8">¿Para qué fines utilizaremos sus datos personales?</h3>
            <p>
              Los datos personales que recabamos de usted, los utilizaremos para las siguientes finalidades que son necesarias para el servicio que solicita:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Proveer los servicios de marketing digital y automatización solicitados.</li>
              <li>Contacto vía WhatsApp o correo electrónico para agendar diagnósticos gratuitos.</li>
              <li>Envío de propuestas comerciales y presupuestos de servicios.</li>
              <li>Facturación y cobranza por los servicios prestados.</li>
            </ul>

            <h3 className="text-xl font-medium text-azul-noche mt-8">¿Qué datos personales utilizaremos para estos fines?</h3>
            <p>
              Para llevar a cabo las finalidades descritas en el presente aviso de privacidad, utilizaremos los siguientes datos personales:
              Nombre, Nombre del negocio o empresa, Número de teléfono (WhatsApp), Correo electrónico. No recabamos datos personales sensibles.
            </p>

            <h3 className="text-xl font-medium text-azul-noche mt-8">¿Cómo puede acceder, rectificar o cancelar sus datos personales, u oponerse a su uso?</h3>
            <p>
              Usted tiene derecho a conocer qué datos personales tenemos de usted, para qué los utilizamos y las condiciones del uso que les damos (Acceso). 
              Asimismo, es su derecho solicitar la corrección de su información personal en caso de que esté desactualizada, sea inexacta o incompleta (Rectificación); 
              que la eliminemos de nuestros registros o bases de datos cuando considere que la misma no está siendo utilizada adecuadamente (Cancelación); 
              así como oponerse al uso de sus datos personales para fines específicos (Oposición). Estos derechos se conocen como derechos ARCO.
            </p>
            <p>
              Para el ejercicio de cualquiera de los derechos ARCO, usted deberá presentar la solicitud respectiva enviando un correo electrónico a <strong>hola@focodigital.mx</strong>.
            </p>

            <h3 className="text-xl font-medium text-azul-noche mt-8">Cambios al aviso de privacidad</h3>
            <p>
              El presente aviso de privacidad puede sufrir modificaciones, cambios o actualizaciones derivadas de nuevos requerimientos legales; de nuestras 
              propias necesidades por los productos o servicios que ofrecemos; de nuestras prácticas de privacidad; de cambios en nuestro modelo de negocio, o por otras causas.
              Nos comprometemos a mantenerlo informado sobre los cambios que pueda sufrir el presente aviso de privacidad, a través de nuestra página web.
            </p>

            <p className="mt-8 text-sm text-gray-500">
              Última actualización: {new Date().toLocaleDateString('es-MX')}
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
