import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
import { Footer } from "@/components/footer";

type LegalPageShellProps = {
  title: string;
  children: ReactNode;
};

export function LegalPageShell({ title, children }: LegalPageShellProps) {
  return (
    <>
      <header className="border-b border-azul-electrico/30 bg-azul-noche">
        <div className="landing-container flex min-h-[76px] items-center justify-between gap-4 py-2">
          <Link href="/" aria-label="Agencia Foco Digital, volver al inicio" className="flex items-center gap-3">
            <span className="brand-icon" aria-hidden="true">
              <Image src="/images/foco-digital-logo.png" alt="" fill sizes="48px" priority className="brand-icon-image" />
            </span>
            <span className="font-display text-lg font-bold text-amarillo-foco">Agencia Foco Digital</span>
          </Link>
          <Link
            href="/"
            className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-azul-electrico px-4 py-2 text-base font-bold text-azul-electrico transition hover:border-amarillo-foco hover:text-amarillo-foco focus-visible:outline-amarillo-foco"
          >
            <ArrowLeft aria-hidden="true" size={17} />
            Volver al inicio
          </Link>
        </div>
      </header>
      <main id="contenido-principal" className="bg-azul-noche py-12 sm:py-16">
        <article className="landing-container legal-copy max-w-4xl">
          <p className="section-kicker text-azul-electrico">Foco Digital</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-amarillo-foco sm:text-4xl">{title}</h1>
          {children}
        </article>
      </main>
      <Footer />
    </>
  );
}
