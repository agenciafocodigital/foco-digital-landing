import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Términos y Condiciones | Agencia Foco Digital",
  description: "Términos y Condiciones de los servicios de Agencia Foco Digital.",
};

export default function TerminosCondiciones() {
  return (
    <>
      <Header />
      <main className="pt-32 pb-20 bg-blanco-calido text-azul-noche min-h-screen">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-3xl sm:text-4xl font-medium mb-8">Términos y Condiciones</h1>
          
          <div className="prose prose-lg text-gray-700 space-y-6">
            <p>
              Bienvenido a Agencia Foco Digital. Al acceder y utilizar nuestros servicios, usted acepta estar sujeto a los siguientes términos y condiciones.
            </p>

            <h3 className="text-xl font-medium text-azul-noche mt-8">1. Servicios Ofrecidos</h3>
            <p>
              Foco Digital es una agencia especializada en marketing digital y soluciones de inteligencia artificial, enfocada en negocios del sector de bienestar. 
              Nuestros servicios incluyen consultoría, estrategias de visibilidad digital (SEO/Ads), desarrollo de chatbots (IA) y automatización de procesos.
              Los detalles específicos, alcances y tarifas de cada servicio serán acordados mediante una propuesta comercial formal enviada a cada cliente.
            </p>

            <h3 className="text-xl font-medium text-azul-noche mt-8">2. Obligaciones del Cliente</h3>
            <p>
              El cliente se compromete a proporcionar información veraz y oportuna para el desarrollo de los proyectos. El retraso en la entrega de materiales,
              accesos o información por parte del cliente eximirá a Foco Digital de la responsabilidad por retrasos en los tiempos de entrega acordados.
            </p>

            <h3 className="text-xl font-medium text-azul-noche mt-8">3. Pagos y Cancelaciones</h3>
            <p>
              Los esquemas de pago y fechas de facturación serán establecidos en la propuesta aprobada. Por regla general, los servicios mensuales o &quot;piloto&quot;
              se facturan de manera anticipada. Las cancelaciones deberán notificarse con al menos 15 días de anticipación al próximo ciclo de facturación.
              No se realizarán reembolsos por servicios ya prestados o meses en curso.
            </p>

            <h3 className="text-xl font-medium text-azul-noche mt-8">4. Propiedad Intelectual</h3>
            <p>
              Todo material publicitario, copy, diseños o flujos de chatbot generados por Foco Digital, una vez liquidados en su totalidad, pertenecerán al cliente.
              Sin embargo, Foco Digital se reserva el derecho de utilizar los resultados como casos de éxito en su portafolio (salvo acuerdo de confidencialidad en contrario).
            </p>

            <h3 className="text-xl font-medium text-azul-noche mt-8">5. Exención de Responsabilidad</h3>
            <p>
              Aunque Foco Digital emplea las mejores prácticas de la industria para aumentar la captación de clientes de nuestros clientes, no garantizamos un 
              número exacto de ventas o conversiones, ya que dichos resultados dependen también de factores externos, calidad del servicio y dinámicas del mercado.
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
