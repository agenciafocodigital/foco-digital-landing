import Link from "next/link";
import { ArrowUpRight, MessageCircle } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-azul-electrico/30 bg-azul-noche">
      <div className="landing-container grid gap-10 py-12 md:grid-cols-[1.2fr_0.8fr] md:items-end">
        <div>
          <p className="font-display text-xl font-bold text-amarillo-foco">Agencia Foco Digital</p>
          <p className="mt-4 max-w-md text-base leading-7 text-azul-electrico">
            Marketing y automatización clara para negocios de bienestar en México.
          </p>
        </div>
        <div className="md:justify-self-end">
          <a href="https://wa.me/525618765291" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center gap-2 rounded-xl border-2 border-azul-electrico px-4 py-2 text-base font-bold text-azul-electrico transition hover:border-amarillo-foco hover:text-amarillo-foco focus-visible:outline-amarillo-foco">
            <MessageCircle aria-hidden="true" size={18} />
            Hablemos por WhatsApp
            <ArrowUpRight aria-hidden="true" size={17} />
          </a>
          <nav aria-label="Enlaces legales" className="mt-5 flex flex-wrap gap-x-5 gap-y-3 text-base">
            <Link href="/aviso-de-privacidad" className="text-azul-electrico underline decoration-amarillo-foco underline-offset-4 transition hover:text-amarillo-foco">Aviso de Privacidad</Link>
            <Link href="/terminos-y-condiciones" className="text-azul-electrico underline decoration-amarillo-foco underline-offset-4 transition hover:text-amarillo-foco">Términos y Condiciones</Link>
            <Link href="/#contacto" className="text-azul-electrico underline decoration-amarillo-foco underline-offset-4 transition hover:text-amarillo-foco">Contacto</Link>
          </nav>
        </div>
      </div>
      <div className="border-t border-azul-electrico/30">
        <div className="landing-container py-5 text-sm text-azul-electrico/80">
          © {currentYear} Agencia Foco Digital. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
