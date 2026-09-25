import Image from "next/image";
import {
  ArrowRight,
  CalendarCheck2,
  Check,
  CircleDollarSign,
  ClipboardCheck,
  MessageCircle,
  ShieldCheck,
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
  name: "Foco Digital",
  description:
    "Agencia de marketing digital y automatización para spas y centros de bienestar en México.",
  areaServed: {
    "@type": "Country",
    name: "México"
  },
  serviceType: [
    "Estrategia de marketing digital",
    "Automatización de atención y citas",
    "Landing pages para negocios de bienestar"
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
  description: string;
  price: string;
  delivery: string;
  details: string[];
  featured?: boolean;
};

function ServiceCard({
  icon: Icon,
  title,
  description,
  price,
  delivery,
  details,
  featured = false
}: ServiceCardProps) {
  return (
    <article
      className={
        featured
          ? "service-card relative border-azul-electrico bg-azul-noche text-white"
          : "service-card relative border-slate-200 bg-white text-azul-noche"
      }
    >
      {featured && (
        <span className="absolute -top-3 left-6 rounded-full bg-amarillo-foco px-3 py-1 text-xs font-extrabold text-azul-noche">
          Con automatización
        </span>
      )}
      <span
        className={
          featured
            ? "inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-azul-electrico text-azul-noche"
            : "inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-azul-profundo text-amarillo-foco"
        }
      >
        <Icon aria-hidden="true" size={24} strokeWidth={2.25} />
      </span>
      <h3 className="mt-5 text-2xl font-bold">{title}</h3>
      <p className={featured ? "mt-3 leading-7 text-white/75" : "mt-3 leading-7 text-slate-600"}>
        {description}
      </p>
      <p className={featured ? "mt-6 text-3xl font-extrabold text-amarillo-foco" : "mt-6 text-3xl font-extrabold text-azul-profundo"}>
        {price}
      </p>
      <p className={featured ? "mt-1 text-sm text-white/65" : "mt-1 text-sm text-slate-500"}>{delivery}</p>

      <ul className="mt-6 space-y-3">
        {details.map((detail) => (
          <li key={detail} className="flex gap-3 text-sm leading-6">
            <Check
              aria-hidden="true"
              size={18}
              className={featured ? "mt-1 shrink-0 text-amarillo-foco" : "mt-1 shrink-0 text-azul-electrico"}
              strokeWidth={3}
            />
            <span className={featured ? "text-white/85" : "text-slate-700"}>{detail}</span>
          </li>
        ))}
      </ul>

      <a
        href="#contacto"
        className={
          featured
            ? "mt-8 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-amarillo-foco px-4 py-3 text-sm font-bold text-azul-noche transition hover:-translate-y-0.5 hover:bg-[#ffda63] focus-visible:outline-white"
            : "mt-8 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border-2 border-azul-profundo px-4 py-3 text-sm font-bold text-azul-profundo transition hover:-translate-y-0.5 hover:bg-azul-profundo hover:text-white focus-visible:outline-azul-electrico"
        }
      >
        Solicitar diagnóstico
        <ArrowRight aria-hidden="true" size={17} />
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
        <section id="inicio" aria-labelledby="hero-title" className="relative overflow-hidden bg-azul-noche py-12 sm:py-16 lg:py-20">
          <div aria-hidden="true" className="hero-glow hero-glow-one" />
          <div aria-hidden="true" className="hero-glow hero-glow-two" />
          <div aria-hidden="true" className="soft-grid absolute inset-0 opacity-30" />

          <div className="landing-container relative grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
            <div className="max-w-2xl">
              <p className="section-kicker text-amarillo-foco">Marketing claro para negocios de bienestar</p>
              <h1 id="hero-title" className="mt-4 text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
                Haz visible lo que hace único a tu negocio.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-white/80 sm:text-xl">
                Ayudamos a spas y centros de bienestar en México a aumentar sus citas sin ahogarse en tecnología.
              </p>
              <LostAppointmentsCalculator />
            </div>

            <div className="relative mx-auto w-full max-w-md lg:max-w-none">
              <div aria-hidden="true" className="absolute -inset-5 rounded-[2.5rem] bg-azul-electrico/15 blur-3xl" />
              <div className="photo-frame relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/20 shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=82"
                  alt="Espacio de spa luminoso y ordenado listo para recibir clientes"
                  fill
                  priority
                  sizes="(max-width: 1023px) 90vw, 42vw"
                  className="object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-azul-noche/85 via-azul-noche/20 to-transparent p-6">
                  <p className="max-w-xs text-sm font-semibold leading-6 text-white">
                    Más claridad para tu agenda. Más tiempo para la atención que solo tú puedes dar.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="como-ayudamos" aria-labelledby="solution-title" className="bg-blanco-calido py-16 sm:py-20 lg:py-24">
          <div className="landing-container grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div className="relative order-2 lg:order-1">
              <div aria-hidden="true" className="absolute -bottom-5 -left-5 h-32 w-32 rounded-full bg-amarillo-foco/35 blur-2xl" />
              <div className="photo-frame relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-soft">
                <Image
                  src="https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=1100&q=82"
                  alt="Terapeuta preparando una camilla en un espacio de bienestar con luz natural"
                  fill
                  sizes="(max-width: 1023px) 90vw, 38vw"
                  className="object-cover"
                />
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <p className="section-kicker text-azul-profundo">No se trata de hacer más, sino de perder menos</p>
              <h2 id="solution-title" className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-azul-noche sm:text-4xl">
                Que la tecnología no te quite tiempo: que te lo devuelva.
              </h2>
              <p className="mt-6 text-lg leading-8 text-slate-600">
                Cuando el boca a boca es la única fuente de clientes y los mensajes de WhatsApp se quedan sin respuesta,
                las citas se pierden antes de empezar.
              </p>
              <p className="mt-4 text-lg leading-8 text-slate-700">
                Nos encargamos de la tecnología para que tú te dediques a tus clientes. Implementamos sistemas que
                responden, agendan y venden por ti.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {[
                  {
                    icon: MessageCircle,
                    title: "Responder",
                    text: "Dudas frecuentes atendidas con tu propia voz."
                  },
                  {
                    icon: CalendarCheck2,
                    title: "Agendar",
                    text: "Un camino simple hacia una cita confirmada."
                  },
                  {
                    icon: ClipboardCheck,
                    title: "Dar seguimiento",
                    text: "Menos conversaciones que se quedan a medias."
                  }
                ].map(({ icon: Icon, title, text }) => (
                  <div key={title} className="rounded-2xl border border-azul-profundo/10 bg-white p-4">
                    <Icon aria-hidden="true" size={22} className="text-azul-electrico" strokeWidth={2.4} />
                    <h3 className="mt-3 font-bold text-azul-noche">{title}</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-600">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="servicios" aria-labelledby="services-title" className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-24">
          <div aria-hidden="true" className="absolute right-0 top-0 h-80 w-80 rounded-full bg-azul-electrico/10 blur-3xl" />
          <div className="landing-container relative">
            <div className="mx-auto max-w-2xl text-center">
              <p className="section-kicker justify-center text-azul-profundo">Servicios pensados para empezar con claridad</p>
              <h2 id="services-title" className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-azul-noche sm:text-4xl">
                Elige el apoyo que necesita tu negocio hoy.
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-600">
                Un diagnóstico honesto, un plan aterrizado y acompañamiento sin palabras rebuscadas.
              </p>
            </div>

            <div className="mx-auto mt-12 grid max-w-5xl gap-6 lg:grid-cols-2">
              <ServiceCard
                icon={Sparkles}
                title="Visibilidad"
                description="Estrategia digital para dejar de depender de referidos y mostrar con claridad el valor de tu servicio."
                price="$390 USD"
                delivery="Piloto de pago único · 7 a 10 días hábiles"
                details={[
                  "Diagnóstico, mensaje de valor y canales prioritarios.",
                  "Plan de 30 días con acciones e indicadores claros.",
                  "Una base ordenada para atraer consultas con intención."
                ]}
              />
              <ServiceCard
                icon={CircleDollarSign}
                title="Visibilidad + Automatización"
                description="Estrategia más un asistente de IA que responde dudas aprobadas y ayuda a agendar citas, incluso fuera de horario."
                price="$750 USD"
                delivery="Piloto de pago único · Hasta 21 días"
                featured
                details={[
                  "Landing, perfil optimizado y contenido inicial para un servicio.",
                  "Asistente para preguntas aprobadas y una agenda de cita inicial.",
                  "Pruebas, guía de uso y siete días de ajustes."
                ]}
              />
            </div>

            <p className="mx-auto mt-6 max-w-4xl text-center text-sm leading-6 text-slate-500">
              Los precios piloto son una referencia y el alcance final se confirma en el diagnóstico. No se prometen
              resultados comerciales específicos.
            </p>
          </div>
        </section>

        <section aria-labelledby="process-title" className="bg-azul-profundo py-16 text-white sm:py-20">
          <div className="landing-container">
            <div className="max-w-2xl">
              <p className="section-kicker text-amarillo-foco">Un proceso que puedes entender</p>
              <h2 id="process-title" className="mt-4 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
                Primero claridad, después herramientas.
              </h2>
            </div>

            <ol className="mt-10 grid gap-5 md:grid-cols-3">
              {[
                {
                  number: "01",
                  title: "Escuchamos tu agenda",
                  text: "Entendemos qué servicio quieres mover y en qué punto se enfrían las consultas."
                },
                {
                  number: "02",
                  title: "Ordenamos el camino",
                  text: "Traducimos tu propuesta a pasos simples para atraer, responder y agendar."
                },
                {
                  number: "03",
                  title: "Probamos contigo",
                  text: "Medimos lo importante y ajustamos sin dejarte solo frente a una plataforma."
                }
              ].map((step) => (
                <li key={step.number} className="rounded-3xl border border-white/15 bg-white/5 p-6">
                  <span className="text-sm font-extrabold tracking-[0.16em] text-amarillo-foco">{step.number}</span>
                  <h3 className="mt-5 text-xl font-bold">{step.title}</h3>
                  <p className="mt-3 leading-7 text-white/70">{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="contacto" aria-labelledby="contact-title" className="bg-blanco-calido py-16 sm:py-20 lg:py-24">
          <div className="landing-container grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <div className="lg:pt-8">
              <p className="section-kicker text-azul-profundo">Tu siguiente paso puede ser sencillo</p>
              <h2 id="contact-title" className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-azul-noche sm:text-4xl">
                Hablemos de las citas que quieres recuperar.
              </h2>
              <p className="mt-6 text-lg leading-8 text-slate-600">
                Cuéntanos un poco de tu negocio y prepararemos una conversación clara, sin presión ni jerga técnica.
              </p>
              <div className="mt-8 rounded-2xl border border-azul-profundo/10 bg-white p-5">
                <div className="flex gap-3">
                  <ShieldCheck aria-hidden="true" size={24} className="shrink-0 text-azul-electrico" strokeWidth={2.3} />
                  <p className="text-sm leading-6 text-slate-600">
                    La información del formulario se valida antes de abrir WhatsApp y no se almacena en este sitio.
                  </p>
                </div>
              </div>
            </div>
            <ContactForm />
          </div>
        </section>
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(professionalServiceSchema).replace(/</g, "\\u003c")
        }}
      />
    </>
  );
}
