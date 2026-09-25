import type { Metadata, Viewport } from "next";
import "./globals.css";

function getMetadataBase() {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (!configuredUrl) {
    return undefined;
  }

  try {
    return new URL(configuredUrl);
  } catch {
    return undefined;
  }
}

const metadataBase = getMetadataBase();

export const metadata: Metadata = {
  metadataBase,
  title: "Agencia Foco Digital | Marketing para Centros de Bienestar",
  description:
    "Foco Digital ayuda a spas y centros de bienestar en México a atraer más citas con marketing claro y automatización sin complicaciones.",
  applicationName: "Foco Digital",
  keywords: [
    "marketing para spas",
    "marketing bienestar México",
    "automatización de citas",
    "agencia marketing digital bienestar",
    "asistente IA para spas"
  ],
  robots: {
    index: true,
    follow: true
  },
  openGraph: {
    type: "website",
    locale: "es_MX",
    title: "Agencia Foco Digital | Marketing para Centros de Bienestar",
    description:
      "Marketing claro y automatización para que los negocios de bienestar recuperen tiempo y citas."
  },
  alternates: metadataBase
    ? {
        canonical: "/"
      }
    : undefined
};

export const viewport: Viewport = {
  themeColor: "#081F35",
  colorScheme: "light"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-MX">
      <body>{children}</body>
    </html>
  );
}
