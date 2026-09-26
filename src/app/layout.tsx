import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Agencia Foco Digital | Marketing para Centros de Bienestar",
  description: "Ayudamos a spas y centros de bienestar en México a aumentar sus citas sin ahogarse en tecnología.",
  icons: {
    icon: "/Foco_Digital_favicon_500.png",
    apple: "/Foco_Digital_favicon_500.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-MX" className="h-full antialiased scroll-smooth">
      <body className="min-h-full flex flex-col font-sans bg-[#05111D] text-[#EDEDED] selection:bg-white/10 selection:text-white">
        {children}
      </body>
    </html>
  );
}
