"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, MessageCircle, X } from "lucide-react";
import { useState } from "react";

const navigation = [
  { href: "#como-ayudamos", label: "Cómo ayudamos" },
  { href: "#servicios", label: "Servicios" },
  { href: "#contacto", label: "Contacto" }
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-azul-noche/95 backdrop-blur">
      <div className="landing-container flex min-h-[72px] items-center justify-between gap-3 py-2">
        <Link
          href="#inicio"
          aria-label="Foco Digital, volver al inicio"
          className="group flex shrink-0 items-center"
          onClick={closeMenu}
        >
          <Image
            src="/images/foco-digital-logo.png"
            alt="Foco Digital Agencia"
            width={76}
            height={76}
            priority
            className="h-[58px] w-[58px] object-contain transition-transform duration-300 group-hover:scale-105 sm:h-16 sm:w-16"
          />
        </Link>

        <nav aria-label="Navegación principal" className="hidden items-center gap-7 lg:flex">
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-semibold text-white/85 transition hover:text-amarillo-foco focus-visible:text-amarillo-foco"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="https://wa.me/525618765291"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Hablemos por WhatsApp, abre una nueva pestaña"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-azul-electrico px-3.5 py-2 text-xs font-bold text-azul-noche transition hover:-translate-y-0.5 hover:bg-[#67d1f7] focus-visible:outline-amarillo-foco sm:px-5 sm:text-sm"
          >
            <MessageCircle aria-hidden="true" size={18} strokeWidth={2.4} />
            <span className="hidden sm:inline">Hablemos por WhatsApp</span>
            <span className="sm:hidden">WhatsApp</span>
          </a>

          <button
            type="button"
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsMenuOpen((open) => !open)}
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-white/20 text-white transition hover:border-amarillo-foco hover:text-amarillo-foco focus-visible:outline-amarillo-foco lg:hidden"
          >
            {isMenuOpen ? <X aria-hidden="true" size={22} /> : <Menu aria-hidden="true" size={22} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Navegación móvil"
          className="border-t border-white/10 bg-azul-noche px-5 pb-5 pt-3 lg:hidden"
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-1">
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className="rounded-xl px-4 py-3 text-base font-semibold text-white transition hover:bg-azul-profundo hover:text-amarillo-foco focus-visible:outline-amarillo-foco"
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
