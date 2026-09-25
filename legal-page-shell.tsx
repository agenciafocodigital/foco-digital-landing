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
      <header className="border-b border-white/10 bg-azul-noche">
        <div className="landing-container flex min-h-[76px] items-center justify-between gap-4 py-2">
          <Link href="/" aria-label="Foco Digital, volver al inicio">
            <Image
              src="/images/foco-digital-logo.png"
              alt="Foco Digital Agencia"
              width={76}
              height={76}
              priority
              className="h-16 w-16 object-contain"
            />
          </Link>
          <Link
            href="/"
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/25 px-4 py-2 text-sm font-bold text-white transition hover:border-amarillo-foco hover:text-amarillo-foco focus-visible:outline-amarillo-foco"
          >
            <ArrowLeft aria-hidden="true" size={17} />
            Volver al inicio
          </Link>
        </div>
      </header>
      <main id="contenido-principal" className="bg-blanco-calido py-12 sm:py-16">
        <article className="landing-container legal-copy max-w-4xl">
          <p className="section-kicker text-azul-profundo">Foco Digital</p>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-azul-noche sm:text-5xl">{title}</h1>
          {children}
        </article>
      </main>
      <Footer />
    </>
  );
}
