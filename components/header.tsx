"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, MessageCircle, X } from "lucide-react";
import { useState } from "react";

const navigation = [
  { href: "#calculadora", label: "Calculadora" },
  { href: "#como-ayudamos", label: "Cómo ayudamos" },
  { href: "#servicios", label: "Servicios" },
  { href: "#contacto", label: "Contacto" }
];

function BrandLockup() {
  return (
    <>
      <span className="brand-icon" aria-hidden="true">
        <Image src="/images/foco-digital-logo.png" alt="" fill sizes="48px" priority className="brand-icon-image" />
      </span>
      <span className="font-display text-base font-bold tracking-tight text-amarillo-foco sm:text-lg">Agencia Foco Digital</span>
    </>
  );
}

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-azul-electrico/30 bg-azul-noche/95 backdrop-blur">
      <div className="landing-container flex min-h-[72px] items-center justify-between gap-3 py-2">
        <Link href="#inicio" aria-label="Agencia Foco Digital, volver al inicio" className="group flex shrink-0 items-center gap-3" onClick={closeMenu}>
          <BrandLockup />
        </Link>
        <nav aria-label="Navegación principal" className="hidden items-center gap-6 lg:flex">
          {navigation.map((item) => (
            <a key={item.href} href={item.href} className="text-base font-semibold text-azul-electrico transition hover:text-amarillo-foco focus-visible:text-amarillo-foco">
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a href="https://wa.me/525618765291" target="_blank" rel="noopener noreferrer" aria-label="Hablemos por WhatsApp, abre una nueva pestaña" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-azul-electrico px-3.5 py-2 text-sm font-bold text-azul-noche transition hover:-translate-y-0.5 hover:bg-amarillo-foco focus-visible:outline-amarillo-foco sm:px-5">
            <MessageCircle aria-hidden="true" size={18} strokeWidth={2.3} />
            <span className="hidden sm:inline">Hablemos por WhatsApp</span>
            <span className="sm:hidden">WhatsApp</span>
          </a>
          <button type="button" aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"} aria-expanded={isMenuOpen} aria-controls="mobile-navigation" onClick={() => setIsMenuOpen((open) => !open)} className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-azul-electrico text-azul-electrico transition hover:border-amarillo-foco hover:text-amarillo-foco focus-visible:outline-amarillo-foco lg:hidden">
            {isMenuOpen ? <X aria-hidden="true" size={22} /> : <Menu aria-hidden="true" size={22} />}
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <nav id="mobile-navigation" aria-label="Navegación móvil" className="border-t border-azul-electrico/30 bg-azul-noche px-5 pb-5 pt-3 lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1">
            {navigation.map((item) => (
              <a key={item.href} href={item.href} onClick={closeMenu} className="rounded-xl px-4 py-3 text-base font-semibold text-azul-electrico transition hover:bg-azul-electrico hover:text-azul-noche focus-visible:outline-amarillo-foco">
                {item.label}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
