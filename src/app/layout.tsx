import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from '@/components/Layout/Header'
import Footer from '@/components/Layout/Footer'
import Whatsapp from '@/components/Layout/Whatsapp'
//hola
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Laramed S.R.L: Líder en Importación de Equipos Médicos en Bolivia",
  description: "Laramed S.R.L es una empresa importadora y distribuidora de equipo e insumo medico, nos enfocamos en las areas de: EMERGENCIAS, QUIROFANO, TERAPIA INTENSIVA y HERMODIALISIS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        <main>
          {children}
        </main>
        <Whatsapp />
        <Footer />
      </body>
    </html>
  );
}
