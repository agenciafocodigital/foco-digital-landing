import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MessageCircle } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-azul-noche text-white">
      <div className="landing-container grid gap-10 py-12 md:grid-cols-[1.2fr_0.8fr] md:items-end">
        <div>
          <Image
            src="/images/foco-digital-logo.png"
            alt="Foco Digital Agencia"
            width={82}
            height={82}
            className="h-16 w-16 object-contain"
          />
          <p className="mt-4 max-w-md text-sm leading-6 text-white/70">
            Marketing y automatización clara para negocios de bienestar en México.
          </p>
        </div>

        <div className="md:justify-self-end">
          <a
            href="https://wa.me/525618765291"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-azul-electrico/60 px-4 py-2 text-sm font-bold text-white transition hover:border-amarillo-foco hover:bg-azul-profundo focus-visible:outline-amarillo-foco"
          >
            <MessageCircle aria-hidden="true" size={17} />
            Hablemos por WhatsApp
            <ArrowUpRight aria-hidden="true" size={16} />
          </a>
          <nav aria-label="Enlaces legales" className="mt-5 flex flex-wrap gap-x-5 gap-y-3 text-sm">
            <Link href="/aviso-de-privacidad" className="text-white/75 underline decoration-azul-electrico underline-offset-4 transition hover:text-amarillo-foco">
              Aviso de Privacidad
            </Link>
            <Link href="/terminos-y-condiciones" className="text-white/75 underline decoration-azul-electrico underline-offset-4 transition hover:text-amarillo-foco">
              Términos y Condiciones
            </Link>
            <Link href="/#contacto" className="text-white/75 underline decoration-azul-electrico underline-offset-4 transition hover:text-amarillo-foco">
              Contacto
            </Link>
          </nav>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="landing-container py-5 text-xs text-white/55">
          © {currentYear} Foco Digital. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
