import type { Metadata, Viewport } from "next";
import { Figtree, Lexend } from "next/font/google";
import { Encabezado } from "@/components/encabezado";
import { Pie } from "@/components/pie";
import { obtenerCatalogo } from "@/lib/catalogo";
import { CATALOGO_VACIO } from "@/lib/catalogo-base";
import { sitioUrl } from "@/lib/sitio";
import "./globals.css";

const lexend = Lexend({
  variable: "--fuente-lexend",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});
const figtree = Figtree({
  variable: "--fuente-figtree",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(sitioUrl()),
  title: {
    default: "LaraMed · Equipos médicos y servicio técnico en Bolivia",
    template: "%s · LaraMed",
  },
  description:
    "Importadores de equipos e insumos médicos desde 2021: ventilación, anestesia, monitoreo, infusión y diagnóstico, con instalación, capacitación y servicio técnico propio. La Paz, El Alto y Cochabamba.",
  openGraph: { siteName: "LaraMed", locale: "es_BO", type: "website" },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = { themeColor: "#065694" };

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Si el ERP no responde, el encabezado y el pie igual se ven (con los datos de siempre).
  const { empresa } = await obtenerCatalogo().catch(() => CATALOGO_VACIO);
  return (
    <html lang="es" className={`${lexend.variable} ${figtree.variable}`}>
      <body className="font-sans antialiased">
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2"
        >
          Ir al contenido
        </a>
        <Encabezado whatsapp={empresa.whatsapp} />
        <main id="contenido">{children}</main>
        <Pie empresa={empresa} />
      </body>
    </html>
  );
}
