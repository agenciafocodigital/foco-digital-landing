import Image from "next/image";
import {
  ArrowRight,
  CalendarCheck2,
  Check,
  ClipboardCheck,
  MessageCircle,
  SearchCheck,
  Sparkles
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { LostAppointmentsCalculator } from "@/components/lost-appointments-calculator";

const professionalServiceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Agencia Foco Digital",
  description:
    "Estrategia de marketing digital y automatización de atención para spas, terapeutas y centros de bienestar en México.",
  areaServed: { "@type": "Country", name: "México" },
  serviceType: [
    "Estrategia de marketing digital",
    "Visibilidad para negocios de bienestar",
    "Automatización de información y reservas"
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+52-56-1876-5291",
    contactType: "ventas",
    availableLanguage: "Spanish"
  },
  sameAs: ["https://wa.me/525618765291"]
};

type ServiceCardProps = {
  icon: LucideIcon;
  title: string;
  problem: string;
  result: string;
  price: string;
  delivery: string;
  details: string[];
  note: string;
  featured?: boolean;
};

function NetlifyFormRegistration() {
  return (
    <form name="contacto" method="POST" data-netlify="true" data-netlify-honeypot="bot-field" hidden>
      <input type="hidden" name="form-name" value="contacto" />
      <input type="hidden" name="subject" value="Nueva solicitud desde Foco Digital" />
      <input name="bot-field" />
      <input name="name" />
      <input name="business" />
      <input name="email" />
      <textarea name="message" />
      <input name="consent" />
    </form>
  );
}

function ServiceCard({
  icon: Icon,
  title,
  problem,
  result,
  price,
  delivery,
  details,
  note,
  featured = false
}: ServiceCardProps) {
  return (
    <article className={`service-card relative ${featured ? "border-amarillo-foco" : "border-azul-electrico/55"}`}>
      {featured && (
        <span className="absolute -top-3 left-6 rounded-full bg-amarillo-foco px-3 py-1 text-sm font-bold text-azul-noche">
          Para convertir consultas en citas
        </span>
      )}
      <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-azul-electrico bg-azul-noche text-amarillo-foco">
        <Icon aria-hidden="true" size={24} strokeWidth={2.15} />
      </span>
      <h3 className="mt-5 text-2xl font-bold leading-tight text-amarillo-foco">{title}</h3>
      <p className="mt-4 text-base leading-7 text-azul-electrico">
        <span className="font-bold text-amarillo-foco">El punto de partida: </span>
        {problem}
      </p>
      <p className="mt-4 text-base leading-7 text-azul-electrico">
        <span className="font-bold text-amarillo-foco">Lo que recibes: </span>
        {result}
      </p>
      <p className="mt-7 text-3xl font-bold tracking-tight text-amarillo-foco">{price}</p>
      <p className="mt-1 text-base font-semibold leading-6 text-azul-electrico">{delivery}</p>

      <ul className="mt-7 space-y-4">
        {details.map((detail) => (
          <li key={detail} className="flex gap-3 text-base leading-7 text-azul-electrico">
            <Check aria-hidden="true" size={19} className="mt-1 shrink-0 text-amarillo-foco" strokeWidth={2.75} />
            <span>{detail}</span>
          </li>
        ))}
      </ul>
      <p className="mt-6 border-t border-azul-electrico/35 pt-5 text-sm leading-6 text-azul-electrico/80">{note}</p>
      <a
        href="#contacto"
        className="mt-8 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border-2 border-azul-electrico bg-azul-noche px-4 py-3 text-base font-bold text-azul-electrico transition hover:-translate-y-0.5 hover:border-amarillo-foco hover:text-amarillo-foco focus-visible:outline-amarillo-foco"
      >
        Quiero saber cuál me conviene
        <ArrowRight aria-hidden="true" size={18} />
      </a>
    </article>
  );
}

export default function HomePage() {
  return (
    <>
      <a href="#contenido-principal" className="skip-link">
        Saltar al contenido
      </a>
      <Header />
      <main id="contenido-principal">
        <NetlifyFormRegistration />

        <section id="inicio" aria-labelledby="hero-title" className="relative overflow-hidden bg-azul-noche py-16 sm:py-20 lg:py-24">
          <div aria-hidden="true" className="hero-glow hero-glow-one" />
          <div aria-hidden="true" className="hero-glow hero-glow-two" />
          <div className="landing-container relative max-w-4xl">
            <p className="section-kicker text-amarillo-foco">Estrategia clara para negocios de bienestar</p>
            <h1 id="hero-title" className="mt-5 max-w-3xl text-4xl font-bold leading-[1.12] tracking-tight text-amarillo-foco sm:text-5xl">
              Haz visible lo que hace único a tu negocio.
            </h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-azul-electrico sm:text-xl">
              Foco Digital ayuda a spas, terapeutas y centros holísticos en México a explicar el valor de sus servicios,
              atraer consultas con intención de reservar y darles seguimiento sin que la tecnología se convierta en otra
              tarea de tu día.
            </p>
            <div className="mt-9 grid max-w-3xl gap-4 sm:grid-cols-3">
              {[
                "Tu servicio explicado con claridad para quien aún no te conoce.",
                "Una ruta sencilla desde la primera duda hasta una cita confirmada.",
                "Herramientas que se adaptan a tu operación, no al revés."
              ].map((benefit) => (
                <p key={benefit} className="rounded-2xl border border-azul-electrico/40 bg-azul-noche/80 p-5 text-base leading-7 text-azul-electrico">
                  {benefit}
                </p>
              ))}
            </div>
          </div>
        </section>

        <section id="calculadora" aria-labelledby="calculator-section-title" className="bg-azul-noche py-16 sm:py-20 lg:py-24">
          <div className="landing-container grid items-start gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <div className="lg:pt-8">
              <p className="section-kicker text-azul-electrico">Un dato para decidir con más claridad</p>
              <h2 id="calculator-section-title" className="mt-5 text-3xl font-bold leading-tight tracking-tight text-amarillo-foco sm:text-4xl">
                Cada mensaje sin seguimiento puede ser una cita que no vuelve a aparecer.
              </h2>
              <p className="mt-6 text-lg leading-8 text-azul-electrico">
                No se trata de responder a toda hora ni de cambiar tu forma de atender. Se trata de entender cuánto vale
                organizar las dudas, recordatorios y siguientes pasos para que una persona interesada no se quede a medias.
              </p>
              <a
                href="https://wa.me/525618765291"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-xl border-2 border-azul-electrico px-5 py-3 text-base font-bold text-azul-electrico transition hover:-translate-y-0.5 hover:border-amarillo-foco hover:text-amarillo-foco focus-visible:outline-amarillo-foco"
              >
                <MessageCircle aria-hidden="true" size={20} />
                Quiero hablar de mis citas
              </a>
            </div>
            <LostAppointmentsCalculator />
          </div>
        </section>

        <section id="como-ayudamos" aria-labelledby="solution-title" className="bg-azul-noche py-16 sm:py-20 lg:py-24">
          <div className="landing-container grid items-center gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">
            <div className="photo-frame relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-azul-electrico/45">
              <Image
                src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1200&q=85"
                alt="Sesión de masaje en un espacio de bienestar sereno"
                fill
                sizes="(max-width: 1023px) 90vw, 40vw"
                className="object-cover"
              />
            </div>
            <div>
              <p className="section-kicker text-amarillo-foco">Más consultas no deben significar más caos</p>
              <h2 id="solution-title" className="mt-5 text-3xl font-bold leading-tight tracking-tight text-amarillo-foco sm:text-4xl">
                Tu atención es personal. El camino para llegar a ella también puede serlo.
              </h2>
              <p className="mt-6 text-lg leading-8 text-azul-electrico">
                Cuando dependes solo de recomendaciones, publicaciones aisladas o mensajes que se responden cuando hay
                un espacio, quien busca un masaje, terapia o sesión holística no siempre entiende qué ofreces ni cómo
                reservar. La consulta se enfría y la agenda sigue irregular.
              </p>
              <p className="mt-5 text-lg leading-8 text-azul-electrico">
                Organizamos una presencia que genera confianza y un proceso de atención que conserva tu criterio. Tú
                apruebas la información; nosotros configuramos una forma clara de responder, orientar y confirmar.
              </p>
              <div className="mt-9 grid gap-4 sm:grid-cols-3">
                {[
                  { icon: SearchCheck, title: "Que te encuentren", text: "Un mensaje que explica a quién ayudas y por qué elegirte." },
                  { icon: MessageCircle, title: "Que te entiendan", text: "Respuestas claras a las dudas que más frenan una reserva." },
                  { icon: CalendarCheck2, title: "Que puedan avanzar", text: "Un siguiente paso simple para pedir o confirmar una cita." }
                ].map(({ icon: Icon, title, text }) => (
                  <article key={title} className="rounded-2xl border border-azul-electrico/40 bg-azul-noche p-5">
                    <Icon aria-hidden="true" size={24} className="text-amarillo-foco" strokeWidth={2.15} />
                    <h3 className="mt-4 text-lg font-bold text-amarillo-foco">{title}</h3>
                    <p className="mt-2 text-base leading-7 text-azul-electrico">{text}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="servicios" aria-labelledby="services-title" className="relative overflow-hidden bg-azul-noche py-16 sm:py-20 lg:py-24">
          <div aria-hidden="true" className="absolute right-0 top-20 h-72 w-72 rounded-full bg-azul-electrico/10 blur-3xl" />
          <div className="landing-container relative">
            <div className="max-w-3xl">
              <p className="section-kicker text-azul-electrico">Dos formas de empezar, según lo que hoy necesitas resolver</p>
              <h2 id="services-title" className="mt-5 text-3xl font-bold leading-tight tracking-tight text-amarillo-foco sm:text-4xl">
                Una ruta clara para atraer atención o para convertirla en citas.
              </h2>
              <p className="mt-6 text-lg leading-8 text-azul-electrico">
                Antes de sumar publicaciones, anuncios o herramientas, definimos qué obstáculo tiene hoy tu negocio.
                Así inviertes en lo que realmente ayuda a que una persona pase de interesarse a reservar.
              </p>
            </div>

            <div className="mx-auto mt-12 grid max-w-6xl gap-7 lg:grid-cols-2">
              <ServiceCard
                icon={ClipboardCheck}
                title="Visibilidad"
                problem="Tu negocio vive de recomendaciones o publicaciones que no explican con claridad qué haces, para quién es tu servicio y cómo pedir una cita."
                result="Una estrategia escrita y aterrizada para que sepas qué comunicar, en qué canales concentrarte y cómo medir si llegan más consultas digitales."
                price="USD 390"
                delivery="Pago único · 7 a 10 días hábiles"
                details={[
                  "Diagnóstico de tu presencia digital actual y de los puntos que pueden estar frenando consultas.",
                  "Mensaje de valor para explicar con palabras sencillas el beneficio de tu servicio principal.",
                  "Canales prioritarios y un plan de acción de 30 días que respeta el tiempo real de tu operación.",
                  "Indicadores simples para distinguir consultas, citas digitales y los siguientes ajustes."
                ]}
                note="Incluye la estrategia y herramientas para ejecutarla. No incluye diseño web, pauta ni ejecución mensual."
              />
              <ServiceCard
                icon={Sparkles}
                title="Visibilidad + Automatización"
                problem="Las personas preguntan por horarios, precios o beneficios, pero las respuestas tardan o no terminan en una reserva. El seguimiento depende de que tengas tiempo libre."
                result="Una presencia inicial publicada y un sistema probado para informar sobre un servicio principal y acompañar el camino hacia una cita confirmada."
                price="USD 750"
                delivery="Pago único · Hasta 21 días"
                featured
                details={[
                  "Diagnóstico y plan táctico esencial para un servicio que quieras mover primero.",
                  "Perfil optimizado, cuatro publicaciones sencillas y sitio de una página para presentar tu propuesta.",
                  "Asistente con respuestas que tú apruebas, agenda para un tipo de cita y confirmación inicial.",
                  "Pruebas, guía breve de uso y siete días de ajustes después de la entrega."
                ]}
                note="Incluye dominio por 12 meses, hospedaje y primer mes de IA. La continuidad del asistente es opcional: USD 79/mes desde el segundo mes."
              />
            </div>
            <p className="mx-auto mt-7 max-w-5xl text-center text-base leading-7 text-azul-electrico/85">
              La meta de trabajo puede ser aumentar las citas de nuevos clientes de canales digitales; se acuerda contra
              una línea base en el diagnóstico. Es una guía para medir, no una promesa de resultados garantizados.
            </p>
          </div>
        </section>

        <section aria-labelledby="process-title" className="bg-azul-noche py-16 sm:py-20">
          <div className="landing-container grid items-center gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16">
            <div>
              <p className="section-kicker text-amarillo-foco">Sin cambios bruscos en tu operación</p>
              <h2 id="process-title" className="mt-5 text-3xl font-bold leading-tight tracking-tight text-amarillo-foco sm:text-4xl">
                Trabajamos por etapas para que siempre sepas qué sigue.
              </h2>
              <ol className="mt-9 grid gap-4">
                {[
                  { number: "01", title: "Entendemos tu agenda", text: "Revisamos el servicio que quieres impulsar, las dudas habituales y en qué punto se enfrían tus consultas." },
                  { number: "02", title: "Ordenamos el camino", text: "Definimos el mensaje, las respuestas y los pasos que una persona necesita para sentirse lista para reservar." },
                  { number: "03", title: "Probamos y ajustamos", text: "Medimos lo útil, corregimos lo necesario y te dejamos una base que puedes comprender y conservar." }
                ].map((step) => (
                  <li key={step.number} className="flex gap-5 rounded-2xl border border-azul-electrico/40 bg-azul-noche p-5">
                    <span className="text-xl font-bold text-amarillo-foco">{step.number}</span>
                    <div>
                      <h3 className="text-xl font-bold text-amarillo-foco">{step.title}</h3>
                      <p className="mt-2 text-base leading-7 text-azul-electrico">{step.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <div className="photo-frame relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-azul-electrico/45">
              <Image
                src="https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=1200&q=85"
                alt="Terapeuta preparando una sesión de bienestar en una camilla"
                fill
                sizes="(max-width: 1023px) 90vw, 40vw"
                className="object-cover"
              />
            </div>
          </div>
        </section>

        <section id="contacto" aria-labelledby="contact-title" className="bg-azul-noche py-16 sm:py-20 lg:py-24">
          <div className="landing-container grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
            <div className="lg:pt-8">
              <p className="section-kicker text-azul-electrico">Cuéntanos qué quieres ordenar primero</p>
              <h2 id="contact-title" className="mt-5 text-3xl font-bold leading-tight tracking-tight text-amarillo-foco sm:text-4xl">
                Empecemos por el punto que hoy te quita más tiempo.
              </h2>
              <p className="mt-6 text-lg leading-8 text-azul-electrico">
                Completa el formulario y te responderemos por correo para entender tu servicio, tu agenda y el tipo de
                atención que quieres mejorar. Sin presión, sin palabras rebuscadas y sin pedirte que cambies todo de golpe.
              </p>
              <a
                href="https://wa.me/525618765291"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-xl bg-amarillo-foco px-5 py-3 text-base font-bold text-azul-noche transition hover:-translate-y-0.5 hover:bg-azul-electrico focus-visible:outline-azul-electrico"
              >
                <MessageCircle aria-hidden="true" size={20} />
                Prefiero hablar por WhatsApp
              </a>
            </div>
            <ContactForm />
          </div>
        </section>
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceSchema).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
