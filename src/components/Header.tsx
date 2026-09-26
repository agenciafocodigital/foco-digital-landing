"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#05111D]/80 backdrop-blur-md border-b border-[#24B9F2]/30 shadow-lg py-3"
          : "bg-transparent py-5 border-b border-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between max-w-7xl">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 rounded-full overflow-hidden border border-[#24B9F2]/50 shadow-[0_0_15px_rgba(36,185,242,0.3)] bg-[#05111D]">
            <Image
              src="/Foco_Digital_favicon_500.png"
              alt="Foco"
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
              priority
            />
          </div>
          <span className="text-base font-medium tracking-tight text-white group-hover:text-azul-electrico transition-colors">Foco Digital</span>
        </Link>
        <a
          href="https://wa.me/525618765291"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-[#F2D84C] hover:bg-[#F5E27A] text-[#05111D] px-5 py-2.5 rounded-full font-medium transition-all duration-300 shadow-[0_0_20px_rgba(242,216,76,0.3)] transform hover:-translate-y-0.5 text-base"
          aria-label="Hablemos por WhatsApp"
        >
          <MessageCircle className="w-4 h-4" />
          <span className="hidden sm:inline">Hablemos por WhatsApp</span>
          <span className="sm:hidden">WhatsApp</span>
        </a>
      </div>
    </motion.header>
  );
}
